# server/agent/agent.py
import os
import json
from typing import TypedDict
from dotenv import load_dotenv
import datetime

# Load env
load_dotenv()

from groq import Groq
from langgraph.graph import StateGraph
from agent.tools import TOOLS

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Define state
class AgentState(TypedDict):
    input: str
    parsed: dict
    tool: str
    output: dict


# 🔥 CLEAN FUNCTION (important for edit accuracy)
def clean_parsed_data(parsed: dict):
    cleaned = {}

    for key, value in parsed.items():
        if value and value not in ["", "Not mentioned", "None", "null"]:
            cleaned[key] = value

    return cleaned


# STEP 1: Extract structured data
def extract_node(state: AgentState):
    text = state.get("input", "")

    current_date = datetime.datetime.now().strftime("%d-%m-%Y")

    prompt = f"""
    Extract structured CRM data. Today's date is {current_date}.

    STRICT RULES:
    - Return ONLY valid JSON
    - No markdown
    - No explanation
    - Only include fields that are clearly mentioned

    Text: {text}

    {{
      "hcpName": "",
      "date": "",
      "interactionType": "",
      "attendees": "",
      "topics": "",
      "materialsShared": "",
      "sentiment": "",
      "outcomes": "",
      "followUp": ""
    }}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.choices[0].message.content.strip()

    # Clean markdown if present
    if "```" in raw:
        raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(raw)
        parsed = clean_parsed_data(parsed)  # 🔥 KEY LINE
    except:
        parsed = {}

    state["parsed"] = parsed
    return state


# STEP 2: Decide which tool to use (improved)
def decide_tool_node(state: AgentState):
    text = state.get("input", "")

    prompt = f"""
    Decide which tool to use.

    Rules:
    - If user is adding a new interaction → log_interaction
    - If user is correcting/updating → edit_interaction
    - If user asks summary → summarize
    - If user asks sentiment → sentiment
    - If user asks next steps → followup

    Return ONLY one word:

    log_interaction | edit_interaction | summarize | sentiment | followup

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


# STEP 3: Execute tool (fixed edit logic)
def tool_node(state: AgentState):
    tool_name = state.get("tool", "log_interaction")
    parsed = state.get("parsed", {})
    text = state.get("input", "")

    tool_fn = TOOLS.get(tool_name, TOOLS["log_interaction"])

    # EDIT → ONLY send changed fields
    if tool_name == "edit_interaction":
        result = {
            "tool": "edit_interaction",
            "data": parsed
        }

    # TEXT BASED TOOLS
    elif tool_name in ["summarize", "sentiment", "followup"]:
        result = tool_fn(text)

    # NORMAL LOG
    else:
        result = tool_fn(parsed)

    state["output"] = result
    return state


# Build LangGraph
builder = StateGraph(AgentState)

builder.add_node("extract", extract_node)
builder.add_node("decide_tool", decide_tool_node)
builder.add_node("tool", tool_node)

builder.set_entry_point("extract")

builder.add_edge("extract", "decide_tool")
builder.add_edge("decide_tool", "tool")

graph = builder.compile()


# Agent runner
def run_agent(text: str):
    result = graph.invoke({"input": text})
    print("FINAL RESULT:", result)
    return result["output"]