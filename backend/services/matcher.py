import re

STOPWORDS = {
    "and", "or", "for", "with", "the", "a", "an",
    "to", "of", "in", "on", "is", "are", "looking",
    "developer", "engineer", "experience", "required",
    "must", "have", "knowledge"
}


def missing_keywords(resume, job_description):

    resume_words = set(
        re.findall(r"\b[a-zA-Z+#.]+\b", resume.lower())
    )

    jd_words = set(
        re.findall(r"\b[a-zA-Z+#.]+\b", job_description.lower())
    )

    keywords = {
        word
        for word in jd_words
        if len(word) > 2 and word not in STOPWORDS
    }

    return sorted(list(keywords - resume_words))