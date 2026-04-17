from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent.agent import run_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract")
async def extract(data: dict):
    text = data.get("text", "")
    result = run_agent(text)
    return result["data"]   # important