from typing import Dict

def log_interaction_tool(data: Dict):
    return {"tool": "log_interaction", "data": data}

def edit_interaction_tool(data: Dict):
    return {"tool": "edit_interaction", "data": data}

def summarize_tool(text: str):
    return {"tool": "summarize", "summary": text[:100]}

def sentiment_tool(text: str):
    return {"tool": "sentiment", "sentiment": "Positive"}

def followup_tool(text: str):
    return {"tool": "followup", "followUp": "Schedule follow-up meeting"}

TOOLS = {
    "log_interaction": log_interaction_tool,
    "edit_interaction": edit_interaction_tool,
    "summarize": summarize_tool,
    "sentiment": sentiment_tool,
    "followup": followup_tool,
}