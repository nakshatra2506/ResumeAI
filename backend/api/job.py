from fastapi import APIRouter
from pydantic import BaseModel

from api.upload import resume_data

router = APIRouter()


class JobRequest(BaseModel):
    job_description: str


@router.post("/job-match")
def job_match(data: JobRequest):

    # Resume skills saved during upload
    resume_skills = resume_data.get("skills", [])

    # Convert Job Description to lowercase
    jd = data.job_description.lower()

    matched = []
    missing = []

    for skill in resume_skills:

        if skill.lower() in jd:
            matched.append(skill)

    common_skills = [
        "Python",
        "SQL",
        "Machine Learning",
        "FastAPI",
        "Flask",
        "Django",
        "Git",
        "GitHub",
        "Docker",
        "AWS",
        "Azure",
        "Power BI",
        "NumPy",
        "Pandas",
        "Scikit-learn",
        "TensorFlow",
        "PyTorch"
    ]

    for skill in common_skills:

        if skill.lower() in jd and skill not in matched:
            missing.append(skill)

    total = len(matched) + len(missing)

    if total == 0:
        match_score = 0
    else:
        match_score = round((len(matched) / total) * 100)

    return {
        "match_score": match_score,
        "matched_skills": matched,
        "missing_skills": missing
    }