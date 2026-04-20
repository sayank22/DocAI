from typing import Dict, List
import os
from dotenv import load_dotenv
from groq import Groq
import json

# Load env
load_dotenv(".env.local")
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# ---------------- LOG TOOL ----------------
def log_interaction_tool(data: Dict):
    # 🔥 Add short AI suggestions for initial log
    return {
        "tool": "log_interaction",
        "data": {
            **data,
            "suggestedFollowUps": [
                "Schedule follow-up next week",
                "Share product brochure",
                "Check patient response"
            ]
        }
    }


# ---------------- EDIT TOOL ----------------
def edit_interaction_tool(data: Dict):
    return {"tool": "edit_interaction", "data": data}


# ---------------- SUMMARIZE ----------------
def summarize_tool(text: str):
    prompt = f"Summarize this interaction in 1-2 lines:\n{text}"

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    summary = response.choices[0].message.content.strip()

    return {
        "tool": "summarize",
        "data": {"topics": summary}
    }


# ---------------- ANALYZE (Sentiment + Outcome) ----------------
def analyze_interaction_tool(text: str):
    prompt = f"""
Analyze this interaction.

Return ONLY valid JSON:

{{
  "sentiment": "Positive | Neutral | Negative",
  "outcomes": "short summary",
  "insight": "1 short line describing overall interaction"
}}

Text: {text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.choices[0].message.content.strip()

    if "```" in raw:
        raw = raw.replace("```json", "").replace("```", "").strip()

    start = raw.find("{")
    end = raw.rfind("}") + 1

    if start != -1 and end != -1:
        raw = raw[start:end]

    try:
        parsed = json.loads(raw)
    except:
        parsed = {}

    return {
        "tool": "analyze_interaction",
        "data": parsed
    }


# ---------------- FOLLOW-UP (AI Suggestions) ----------------
def followup_tool(text: str):
    prompt = f"""
Suggest 2-3 professional follow-up actions.

Return ONLY JSON array of strings.

Example:
["Schedule follow-up meeting", "Send brochure", "Check patient response"]

Text: {text}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.choices[0].message.content.strip()

    if "```" in raw:
        raw = raw.replace("```json", "").replace("```", "").strip()

    # 🔥 Extract JSON safely
    start = raw.find("[")
    end = raw.rfind("]") + 1

    if start != -1 and end != -1:
        raw = raw[start:end]

    try:
        parsed = json.loads(raw)
        if not isinstance(parsed, list):
            parsed = []
    except:
        parsed = []

    return {
        "tool": "followup",
        "data": {
            "suggestedFollowUps": parsed
        }
    }


# ---------------- TOOL MAP ----------------
TOOLS = {
    "log_interaction": log_interaction_tool,
    "edit_interaction": edit_interaction_tool,
    "summarize": summarize_tool,
    "analyze_interaction": analyze_interaction_tool,
    "followup": followup_tool,
}