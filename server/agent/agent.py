import os
import json
from typing import TypedDict
from dotenv import load_dotenv
from groq import Groq
from langgraph.graph import StateGraph

from agent.tools import log_interaction_tool

# 🔥 Load env
load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ✅ Define state
class AgentState(TypedDict):
    input: str
    parsed: dict
    output: dict


# 🔥 LLM Node
def extract_node(state: AgentState):
    text = state.get("input", "")
    print("STATE:", state)

    prompt = f"""
    Extract structured CRM data.

    STRICT RULES:
    - Return ONLY valid JSON
    - No markdown
    - No explanation
    - No ```json

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

    raw = response.choices[0].message.content
    clean = raw.strip()

    # 🔥 Remove markdown if present
    if "```" in clean:
        clean = clean.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(clean)
    except:
        parsed = {
            "hcpName": "",
            "interactionType": "",
            "topics": clean,
            "sentiment": "",
            "followUp": ""
        }

    state["parsed"] = parsed
    return state


# 🔧 Tool Node
def tool_node(state: AgentState):
    data = state.get("parsed", {})

    result = log_interaction_tool(data)

    state["output"] = result
    return state


# 🔗 Build LangGraph
builder = StateGraph(AgentState)

builder.add_node("extract", extract_node)
builder.add_node("tool", tool_node)

builder.set_entry_point("extract")
builder.add_edge("extract", "tool")

graph = builder.compile()


# 🚀 Agent runner
def run_agent(text: str):
    result = graph.invoke({"input": text})
    print("FINAL RESULT:", result)
    return result["output"]