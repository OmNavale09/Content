from prompts.instagram import INSTAGRAM_PROMPT
from prompts.linkedin import LINKEDIN_PROMPT
from prompts.twitter import TWITTER_PROMPT
from prompts.youtube import YOUTUBE_PROMPT

import os

from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage,
)

load_dotenv()


# ============================================================
# Pydantic Output Schemas
# ============================================================

class Summary(BaseModel):
    topic: str
    keyPoints: List[str]
    insights: List[str]
    tone: str
    context: str
    audience: str


class Settings(BaseModel):
    tone: str
    audience: str
    language: str
    length: str


class PlatformContent(BaseModel):
    platform: str
    type: str
    content: str


class RepurposeResponse(BaseModel):
    text: str
    summary: Summary
    settings: Settings
    platforms: List[PlatformContent]


# ============================================================
# Gemini Model
# ============================================================

model = ChatGoogleGenerativeAI(
    model="gemini-3.1-flash-lite",
    google_api_key=os.getenv("GEMINI_API_KEY"),
)


# Force Gemini to return the Pydantic structure
structured_model = model.with_structured_output(
    RepurposeResponse
)


# ============================================================
# System Prompt
# ============================================================

SYSTEM_PROMPT = f"""
You are an AI Content Repurposing Assistant.

Your job is to understand the user's original content
and transform it into high-quality platform-specific content.

The user may provide:

- Text
- Images
- Videos
- Previous conversation messages

You must understand the provided content before generating
the output.

Identify:

- Main topic
- Key points
- Important insights
- Writing tone
- Context
- Target audience


============================================================
GLOBAL RULES
============================================================

1. Do not invent facts that are not present in the source.

2. Preserve the original meaning.

3. Adapt content to the target platform.

4. Follow the user's requested tone.

5. Follow the user's requested audience.

6. Follow the requested language.

7. Follow the requested content length.

8. Make the generated content natural and engaging.

9. Avoid unnecessary repetition.

10. Use previous conversation context when modifying
    previously generated content.

11. Analyze actual image content when an image is provided.

12. Follow the structured output schema exactly.

PLATFORM SELECTION RULES:

1. If the user explicitly requests a platform:
   generate ONLY that platform.

2. If the user explicitly requests multiple platforms:
   generate ONLY those requested platforms.

3. If the user provides content but does not specify
   a platform, generate ALL supported platforms:

   - LinkedIn
   - Twitter/X
   - Instagram
   - YouTube

4. Never return an empty platforms array when the user
   provides meaningful content.

5. The platforms array must contain at least one item
   for every content-repurposing request.
============================================================
PLATFORM-SPECIFIC INSTRUCTIONS
============================================================

{INSTAGRAM_PROMPT}

{LINKEDIN_PROMPT}

{TWITTER_PROMPT}

{YOUTUBE_PROMPT}

"""


# ============================================================
# Build Conversation
# ============================================================

def build_conversation(messages):
    """
    Convert MongoDB messages into LangChain messages.

    Supports:
        - Text
        - Images
        - Videos as URL context
    """

    conversation = []

    for message in messages:

        role = message.get("role", "user")

        text = message.get("text", "")

        images = message.get("images", [])

        videos = message.get("videos", [])


        # ----------------------------------------------------
        # USER MESSAGE
        # ----------------------------------------------------

        if role == "user":

            content = []

            # Text
            if text:
                content.append(
                    {
                        "type": "text",
                        "text": text,
                    }
                )


            # Images
            for image in images:

                url = image.get("url")

                if url:

                    content.append(
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": url
                            },
                        }
                    )


            # Videos
            #
            # For now we provide the URL as context.
            # Native video input can be added separately.
            for video in videos:

                url = video.get("url")

                if url:

                    content.append(
                        {
                            "type": "text",
                            "text": f"""
The user uploaded a video available at:

{url}

Use this video URL as the source reference.
""",
                        }
                    )


            conversation.append(
                HumanMessage(
                    content=content
                )
            )


        # ----------------------------------------------------
        # ASSISTANT MESSAGE
        # ----------------------------------------------------

        elif role == "assistant":

            conversation.append(
                AIMessage(
                    content=text or ""
                )
            )


    return conversation


# ============================================================
# Main Repurposer
# ============================================================

async def repurpose(messages, settings=None):
    """
    Main AI content repurposing function.

    Parameters
    ----------
    messages:
        Conversation messages received from Node.js.

    settings:
        Global content settings.

    Returns
    -------
    dict:
        Structured RepurposeResponse.
    """

    settings = settings or {}


    # --------------------------------------------------------
    # Build conversation
    # --------------------------------------------------------

    conversation = build_conversation(messages)


    # --------------------------------------------------------
    # Global Settings
    # --------------------------------------------------------

    tone = settings.get(
        "tone",
        "Professional"
    )

    audience = settings.get(
        "audience",
        "General Audience"
    )

    language = settings.get(
        "language",
        "English"
    )

    length = settings.get(
        "length",
        "Medium"
    )


    settings_text = f"""
Global Content Settings:

Tone:
{tone}

Target Audience:
{audience}

Language:
{language}

Content Length:
{length}
"""


    # --------------------------------------------------------
    # Final Instruction
    # --------------------------------------------------------

    prompt = f"""
Analyze the conversation and the content provided by
the user.

{settings_text}


Generate content based on the user's latest request.

Available platform types:


LinkedIn:
- post
- article


Twitter/X:
- tweet
- thread


Instagram:
- feed
- reel
- story


YouTube:
- title
- description
- shorts


Blog:
- article
- outline


Email:
- newsletter


Only generate platform content that is relevant to
the user's request and the provided source content.

If the user asks for a specific platform, focus on that
platform.

If the user asks to repurpose the content generally,
generate appropriate content for the relevant platforms.

If the user asks to modify previously generated content,
use the previous assistant response and conversation
history as context.

Follow the structured output schema exactly.
"""


    # Add final instruction to the conversation

    conversation.append(
        HumanMessage(
            content=prompt
        )
    )


    # --------------------------------------------------------
    # Call Gemini
    # --------------------------------------------------------

    response = await structured_model.ainvoke(
        [
            SystemMessage(
                content=SYSTEM_PROMPT
            ),
            *conversation,
        ]
    )


    # --------------------------------------------------------
    # Convert Pydantic → Dictionary
    # --------------------------------------------------------

    return response.model_dump()