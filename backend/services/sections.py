import re


SECTION_PATTERNS = {
    "education": [
        r"education",
        r"academic"
    ],

    "experience": [
        r"experience",
        r"work experience",
        r"internship"
    ],

    "projects": [
        r"projects",
        r"project"
    ],

    "skills": [
        r"technical skills",
        r"skills"
    ],

    "certifications": [
        r"certifications",
        r"certificates"
    ]
}


def extract_sections(text):

    lower = text.lower()

    sections = {}

    for section, keywords in SECTION_PATTERNS.items():

        sections[section] = ""

        for keyword in keywords:

            match = re.search(keyword, lower)

            if match:

                start = match.start()

                sections[section] = text[start:start+800]

                break

    return sections