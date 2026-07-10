import spacy
from spacy.matcher import PhraseMatcher

nlp = spacy.load("en_core_web_sm")

matcher = PhraseMatcher(nlp.vocab, attr="LOWER")

COMMON_SKILLS = [
    "Python",
    "Java",
    "SQL",
    "Machine Learning",
    "Deep Learning",
    "FastAPI",
    "Flask",
    "Django",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "NumPy",
    "Pandas",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Azure",
    "Power BI",
    "Tableau",
    "Linux"
]

patterns = [nlp.make_doc(skill) for skill in COMMON_SKILLS]

matcher.add("SKILLS", patterns)


def extract_skills(text):

    doc = nlp(text)

    matches = matcher(doc)

    skills = set()

    for _, start, end in matches:

        skills.add(doc[start:end].text)

    return sorted(skills)