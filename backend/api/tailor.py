from fastapi import APIRouter
from pydantic import BaseModel

from services.ai_tailor import tailor_resume

router = APIRouter()


class TailorRequest(BaseModel):
    resume: str
    job_description: str


@router.post("/tailor-resume")
async def tailor(data: TailorRequest):

    tailored_resume = tailor_resume(
        data.resume,
        data.job_description
    )

    return {
        "tailored_resume": tailored_resume
    }