import os
import json
from typing import TypedDict
from dotenv import load_dotenv
from groq import Groq
from langgraph.graph import StateGraph

from agent.tools import TOOLS

# 🔥 Load env
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ✅ Define state
class AgentState(TypedDict):
    input: str
    parsed: dict
    tool: str
    output: dict


# 🔥 STEP 1: Extract structured data
def extract_node(state: AgentState):
    text = state.get("input", "")

    prompt = f"""
    Extract structured CRM data.

    STRICT RULES:
    - Return ONLY valid JSON
    - No markdown
    - No explanation

    Text: {text}

    {{
      "hcpName": "",
      "interactionType": "",
      "topics": "",
      "sentiment": "",
      "followUp": ""
    }}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.choices[0].message.content.strip()

    # 🔥 Clean markdown if present
    if "```" in raw:
        raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(raw)
    except:
        parsed = {}

    state["parsed"] = parsed
    return state


# 🔥 STEP 2: Decide which tool to use
def decide_tool_node(state: AgentState):
    text = state.get("input", "")

    prompt = f"""
    Decide which tool to use.

    Options:
    - log_interaction
    - edit_interaction
    - summarize
    - sentiment
    - followup

    Return ONLY one word from above.

    Text: {text}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    tool_name = response.choices[0].message.content.strip().lower()

    allowed = ["log_interaction", "edit_interaction", "summarize", "sentiment", "followup"]

    if tool_name not in allowed:
        tool_name = "log_interaction"

    state["tool"] = tool_name
    return state


# 🔥 STEP 3: Execute tool
def tool_node(state: AgentState):
    tool_name = state.get("tool", "log_interaction")
    parsed = state.get("parsed", {})
    text = state.get("input", "")

    tool_fn = TOOLS.get(tool_name)

    if not tool_fn:
        tool_fn = TOOLS["log_interaction"]

    # Some tools use text, others use structured data
    if tool_name in ["summarize", "sentiment", "followup"]:
        result = tool_fn(text)
    else:
        result = tool_fn(parsed)

    state["output"] = result
    return state


# 🔗 Build LangGraph
builder = StateGraph(AgentState)

builder.add_node("extract", extract_node)
builder.add_node("decide_tool", decide_tool_node)
builder.add_node("tool", tool_node)

builder.set_entry_point("extract")

builder.add_edge("extract", "decide_tool")
builder.add_edge("decide_tool", "tool")

graph = builder.compile()


# 🚀 Agent runner
def run_agent(text: str):
    result = graph.invoke({"input": text})
    print("FINAL RESULT:", result)
    return result["output"]