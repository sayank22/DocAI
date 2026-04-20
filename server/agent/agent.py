# server/agent/agent.py
import os
import json
from typing import TypedDict
from dotenv import load_dotenv
import datetime

# Load env
load_dotenv(".env.local")

from groq import Groq
from langgraph.graph import StateGraph
from agent.tools import TOOLS

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ---------------- STATE ----------------
class AgentState(TypedDict):
    input: str
    parsed: dict
    tool: str
    output: dict


# ---------------- CLEAN PARSED DATA ----------------
def clean_parsed_data(parsed: dict):
    cleaned = {}

    for key, value in parsed.items():
        if value and value not in ["", "Not mentioned", "None", "null"]:
            cleaned[key] = value

    return cleaned


# ---------------- STEP 1: EXTRACT ----------------
def extract_node(state: AgentState):
    text = state.get("input", "")

    current_date = datetime.datetime.now().strftime("%Y-%m-%d")

    prompt = f"""
Extract structured CRM data. Today's date is {current_date}.

STRICT RULES:
- Return ONLY valid JSON
- No markdown, no explanation
- Do NOT include fields that are not mentioned
- Do NOT return empty strings
- Keep values concise and clean (no long paragraphs)

FORMAT RULES:
- Date must be YYYY-MM-DD
- Time must be HH:MM (24-hour)
- Interaction Type must be one of:
  Meeting, Phone Call, Report Show
- Sentiment must be one of:
  Positive, Neutral, Negative

CONVERSIONS:
- "today" → {current_date}
- Convert time to 24-hour format

FOLLOW-UP RULE:
- Keep followUp short (exact next step only)
- Do NOT generate suggestions

IMPORTANT:
- Do NOT generate "suggestedFollowUps"

Text: {text}

{{
  "hcpName": "",
  "date": "",
  "time": "",
  "interactionType": "",
  "attendees": "",
  "topics": "",
  "materialsShared": "",
  "samples": "",
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

    # ✅ Clean markdown
    if "```" in raw:
        raw = raw.replace("```json", "").replace("```", "").strip()

    # ✅ Extract JSON safely
    start = raw.find("{")
    end = raw.rfind("}") + 1

    if start != -1 and end != -1:
        raw = raw[start:end]

    try:
        parsed = json.loads(raw)

        if not isinstance(parsed, dict):
            parsed = {}

        parsed = clean_parsed_data(parsed)

    except Exception as e:
        print("JSON parse error:", e)
        parsed = {}

    state["parsed"] = parsed
    return state


# ---------------- STEP 2: DECIDE TOOL ----------------
def decide_tool_node(state: AgentState):
    text = state.get("input", "")

    prompt = f"""
Decide which tool to use.

Rules:
- New interaction → log_interaction
- Correction/update → edit_interaction
- Summary request → summarize
- Sentiment/analysis → analyze_interaction
- Follow-up suggestions → followup

Return ONLY one word:

log_interaction | edit_interaction | summarize | analyze_interaction | followup

Text: {text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    tool_name = response.choices[0].message.content.strip().lower()

    allowed = [
        "log_interaction",
        "edit_interaction",
        "summarize",
        "analyze_interaction",
        "followup",
    ]

    if tool_name not in allowed:
        tool_name = "analyze_interaction"  # safer fallback

    state["tool"] = tool_name
    return state


# ---------------- STEP 3: TOOL EXECUTION ----------------
def tool_node(state: AgentState):
    tool_name = state.get("tool", "log_interaction")
    parsed = state.get("parsed", {})
    text = state.get("input", "")

    tool_fn = TOOLS.get(tool_name, TOOLS["log_interaction"])

    # EDIT → only changed fields
    if tool_name == "edit_interaction":
        result = {
            "tool": "edit_interaction",
            "data": parsed
        }

    # TEXT BASED TOOLS
    elif tool_name in ["summarize", "analyze_interaction", "followup"]:
        result = tool_fn(text)

    # NORMAL LOG
    else:
        result = tool_fn(parsed)

    state["output"] = result
    return state


# ---------------- GRAPH ----------------
builder = StateGraph(AgentState)

builder.add_node("extract", extract_node)
builder.add_node("decide_tool", decide_tool_node)
builder.add_node("tool", tool_node)

builder.set_entry_point("extract")

builder.add_edge("extract", "decide_tool")
builder.add_edge("decide_tool", "tool")

graph = builder.compile()


# ---------------- RUNNER ----------------
def run_agent(text: str):
    result = graph.invoke({"input": text})
    print("FINAL RESULT:", result)
    return result["output"]