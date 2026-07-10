import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_resume_feedback(resume_text: str, job_description: str):

    prompt = f"""
You are a professional ATS Resume Reviewer.

Analyze the resume against the given job description.

==========================
RESUME
==========================

{resume_text}

==========================
JOB DESCRIPTION
==========================

{job_description}

Give your answer in this exact format:

# Overall Score(in percentage)

# Strengths

- 3 Bullet points

# Weaknesses

- 3 Bullet points

# Missing Skills

- 5 Bullet points

# ATS Improvement Suggestions

- 5 Bullet points

# Resume Rewrite Tips

- 2 Bullet points

Keep every bullet under one sentence.

Do NOT explain.

Do NOT write long paragraphs.

Keep the entire answer under 180 words.
"""

    response = model.generate_content(prompt)

    return response.text