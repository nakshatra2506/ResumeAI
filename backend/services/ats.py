def calculate_ats(resume_text, skills, sections):

    technical_score = min(len(skills) * 5, 100)

    experience_score = 100 if sections["experience"] else 30

    project_score = 100 if sections["projects"] else 40

    education_score = 100 if sections["education"] else 50

    format_score = 80

    overall = (
        technical_score * 0.30 +
        experience_score * 0.20 +
        project_score * 0.20 +
        education_score * 0.20 +
        format_score * 0.10
    )

    return {

        "overall_score": round(overall),

        "technical_score": technical_score,

        "experience_score": experience_score,

        "project_score": project_score,

        "education_score": education_score,

        "format_score": format_score
    }