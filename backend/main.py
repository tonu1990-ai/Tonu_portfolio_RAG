

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llm import generate_rag_answer

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow our React frontend to communicate with FastAPI

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"]
)


# Existing GET endpoint
@app.get("/health")
def health_check():
    return {"status": "ok"}


# Define the structure of an incoming question
class ChatRequest(BaseModel):
    question: str


# New POST endpoint
@app.post("/chat-test")
def chat_test(request: ChatRequest):

    user_question = request.question

    return {
        "answer": f"This is a test response. You asked: {user_question}"
    }


# Real RAG chatbot endpoint
@app.post("/chat")
def chat(request: ChatRequest):

    # Extract the visitor's question
    question = request.question.strip()

    # Basic input validation
    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty."
        )

    if len(question) > 500:
        raise HTTPException(
            status_code=400,
            detail="Question must be 500 characters or fewer."
        )

    # Call our existing RAG pipeline
    result = generate_rag_answer(question)

    # Return answer and retrieved sources
    return result

