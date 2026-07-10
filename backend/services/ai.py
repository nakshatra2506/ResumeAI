import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def review_resume(resume_text: str):

    prompt = f"""
You are an expert resume reviewer.

Analyze the following resume.

Give your response in this format.

Overall Score:
Strengths:
Weaknesses:
Suggestions:

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    return response.text