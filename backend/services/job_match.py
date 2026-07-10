import re

COMMON_SKILLS = [
    "python",
    "java",
    "sql",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "numpy",
    "pandas",
    "fastapi",
    "flask",
    "django",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "git",
    "github",
    "linux",
    "html",
    "css",
    "javascript",
    "react",
    "node.js",
    "mongodb",
    "mysql",
    "power bi",
    "tableau"
]


def extract_job_skills(job_description):

    jd = job_description.lower()

    skills = []

    for skill in COMMON_SKILLS:

        if re.search(r"\b" + re.escape(skill) + r"\b", jd):
            skills.append(skill)

    return sorted(list(set(skills)))


def calculate_job_match(resume_skills, job_description):

    job_skills = extract_job_skills(job_description)

    resume_lower = [s.lower() for s in resume_skills]

    matched = []

    missing = []

    for skill in job_skills:

        if skill in resume_lower:
            matched.append(skill)

        else:
            missing.append(skill)

    if len(job_skills) == 0:
        score = 0
    else:
        score = round((len(matched) / len(job_skills)) * 100)

    return {
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing
    }