# server/agent/tools.py
from typing import Dict
import os
from dotenv import load_dotenv
from groq import Groq
import json


# Load env before initializing client
load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# LOG TOOL
def log_interaction_tool(data: Dict):
    return {"tool": "log_interaction", "data": data}


# EDIT TOOL
def edit_interaction_tool(data: Dict):
    return {"tool": "edit_interaction", "data": data}


# SUMMARIZE (LLM)
def summarize_tool(text: str):
    prompt = f"Summarize this interaction in 1-2 lines:\n{text}"

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    summary = response.choices[0].message.content.strip()

    return {"tool": "summarize", "data": {"topics": summary}}


# SENTIMENT (LLM)
def sentiment_tool(text: str):
    prompt = f"""
    Analyze sentiment of this interaction.

    Return ONLY one word:
    Positive / Neutral / Negative

    Text: {text}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    sentiment = response.choices[0].message.content.strip()

    return {"tool": "sentiment", "data": {"sentiment": sentiment}}


# FOLLOW-UP (LLM)
def followup_tool(text: str):
    prompt = f"""
    Suggest a professional follow-up action based on this interaction:

    Text: {text}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
    )

    # ✅ YOU MUST DEFINE 'raw' HERE
    raw = response.choices[0].message.content.strip()

    # Now you can safely check it for markdown
    if "```" in raw:
        raw = raw.replace("```json", "").replace("```", "").strip()

    return {"tool": "followup", "followUp": raw}


# TOOL MAP
TOOLS = {
    "log_interaction": log_interaction_tool,
    "edit_interaction": edit_interaction_tool,
    "summarize": summarize_tool,
    "sentiment": sentiment_tool,
    "followup": followup_tool,
}