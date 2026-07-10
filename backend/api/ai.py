from fastapi import APIRouter
from pydantic import BaseModel

from services.ai import review_resume

router = APIRouter()


class ResumeReviewRequest(BaseModel):
    resume: str


@router.post("/ai-review")
async def ai_review(data: ResumeReviewRequest):

    review = review_resume(data.resume)

    return {
        "review": review
    }