from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
from agent.agent import run_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Updated: Added currentState to receive the frontend form data
class AgentRequest(BaseModel):
    text: str
    currentState: Dict[str, Any] = {} # Defaults to empty dict if not provided

@app.get("/")
def root():
    return {"message": "API is working"}

@app.post("/extract")
async def extract(request: AgentRequest):
    # ✅ Inject the current frontend state into the prompt so the LLM has context
    context_injected_prompt = f"""
    Current Form State: {request.currentState}
    
    User Request: {request.text}
    """
    
    # ✅ Pass the combined prompt to your LangGraph agent
    result = run_agent(context_injected_prompt)
    
    return result