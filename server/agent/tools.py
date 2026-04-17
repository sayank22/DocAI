from typing import Dict

def log_interaction_tool(data: Dict):
    return {
        "tool": "log_interaction",
        "data": data
    }

def edit_interaction_tool(data: Dict):
    return {
        "tool": "edit_interaction",
        "data": data
    }

def summarize_tool(text: str):
    return {"summary": text[:100]}

def sentiment_tool(text: str):
    return {"sentiment": "Positive"}  # can improve later

def followup_tool(text: str):
    return {"followUp": "Schedule follow-up meeting"}