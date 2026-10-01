import os
from typing import List, Dict, Any, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.repurposer import repurpose


# ============================================================
# Environment
# ============================================================

load_dotenv()

if not os.getenv("GEMINI_API_KEY"):
    raise RuntimeError(
        "GEMINI_API_KEY is not set in the environment variables."
    )


# ============================================================
# FastAPI App
# ============================================================

app = FastAPI(
    title="AI Content Repurposer",
    description="Multimodal AI content repurposing service",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Request Schemas
# ============================================================

class Message(BaseModel):
    role: str = "user"
    text: str = ""
    images: List[Dict[str, Any]] = []
    videos: List[Dict[str, Any]] = []


class Settings(BaseModel):
    tone: str = "Professional"
    audience: str = "General Audience"
    language: str = "English"
    length: str = "Medium"


class RepurposeRequest(BaseModel):
    messages: List[Message]
    settings: Optional[Settings] = None


# ============================================================
# Health Check
# ============================================================

@app.get("/")
async def root():
    return {
        "status": "ok",
        "service": "AI Content Repurposer",
        "version": "1.0.0",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "gemini_configured": bool(
            os.getenv("GEMINI_API_KEY")
        ),
    }


# ============================================================
# Repurpose Endpoint
# ============================================================

@app.post("/repurpose")
async def repurpose_content(request: RepurposeRequest):
    try:
        # Convert Pydantic models into dictionaries
        messages = [
            message.model_dump()
            for message in request.messages
        ]

        settings = (
            request.settings.model_dump()
            if request.settings
            else {}
        )

        # Call the AI repurposer
        result = await repurpose(
            messages=messages,
            settings=settings,
        )

        return {
            "success": True,
            "data": result,
        }

    except Exception as e:
        print("Repurposing error:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Content repurposing failed: {str(e)}",
        )


# ============================================================
# Run Locally
# ============================================================

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))

    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=port,
        reload=True,
    )