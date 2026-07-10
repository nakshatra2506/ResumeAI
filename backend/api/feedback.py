from fastapi import APIRouter
from pydantic import BaseModel

from services.ai_feedback import generate_resume_feedback
from models.feedback import FeedbackResponse

router = APIRouter()


class FeedbackRequest(BaseModel):
    resume: str
    job_description: str


@router.post(
    "/feedback",
    response_model=FeedbackResponse
)
async def feedback(data: FeedbackRequest):

    feedback = generate_resume_feedback(
        data.resume,
        data.job_description
    )

    return FeedbackResponse(
        feedback=feedback
    )