import os

from fastapi import APIRouter, UploadFile, File
from services.job_match import calculate_job_match
from services.parser import extract_text_from_pdf
from services.extractor import (
    extract_name,
    extract_email,
    extract_phone
)
from services.nlp import extract_skills
from services.sections import extract_sections
from services.ats import calculate_ats


resume_data = {}
router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-resume")

async def upload_resume(file: UploadFile = File(...)):

    # Save uploaded file
    file_location = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())

    # Extract resume text
    extracted_text = extract_text_from_pdf(file_location)

    # Extract sections
    sections = extract_sections(extracted_text)

    # Extract skills
    skills = extract_skills(extracted_text)
    resume_data["skills"] = skills
    job_match = {
    "match_score": 0,
    "matched_skills": [],
    "missing_skills": []
}

    # Calculate ATS
    ats = calculate_ats(
        extracted_text,
        skills,
        sections
    )

    # Return structured response
    return {
    "candidate": {
        "name": extract_name(extracted_text),
        "email": extract_email(extracted_text),
        "phone": extract_phone(extracted_text)
    },
    "resume_text": extracted_text,
    "skills": skills,
    "ats": ats,
    "sections": sections,
    "job_match": job_match
}