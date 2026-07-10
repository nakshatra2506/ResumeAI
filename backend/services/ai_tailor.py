import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")


def tailor_resume(resume_text: str, job_description: str):

    prompt = f"""
You are an expert ATS Resume Writer.

Your job is to rewrite the user's resume so it matches the Job Description while remaining truthful.

Rules:
- Do NOT invent fake experience.
- Do NOT invent fake projects.
- Do NOT invent fake skills.
- Improve wording and ATS keywords.
- Make the resume professional.
- Use clean markdown.

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY the rewritten resume.
"""

    response = model.generate_content(prompt)

    return response.text