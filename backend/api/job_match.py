from fastapi import APIRouter
from pydantic import BaseModel

from services.job_match import calculate_job_match

router = APIRouter()


class MatchRequest(BaseModel):
    resume_skills: list[str]
    job_description: str


@router.post("/job-match")
async def job_match(data: MatchRequest):

    result = calculate_job_match(
        data.resume_skills,
        data.job_description
    )

    return result