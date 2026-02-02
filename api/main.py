from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os

app = FastAPI(title="AXE API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@app.get("/")
def root():
    return {"status": "ok", "message": "AXE API running"}

@app.post("/v1/chat")
async def chat(request: ChatRequest):
    # TODO: Connect to Llama 70B via vLLM
    # For now, return mock response
    last_message = request.messages[-1].content
    
    return {
        "role": "assistant",
        "content": f"AXE received: {last_message}\n\n(Connect Llama 70B model here)"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
