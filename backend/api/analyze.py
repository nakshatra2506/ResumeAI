from fastapi import APIRouter
from pydantic import BaseModel

from services.embeddings import calculate_similarity
from services.matcher import missing_keywords

router = APIRouter()


class AnalyzeRequest(BaseModel):
    resume: str
    job_description: str


@router.post("/analyze")

async def analyze(data: AnalyzeRequest):

    similarity = calculate_similarity(
        data.resume,
        data.job_description
    )

    missing = missing_keywords(
        data.resume,
        data.job_description
    )

    return {

        "match_score": similarity,

        "missing_keywords": missing

    }