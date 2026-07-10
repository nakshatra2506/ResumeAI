import fitz  # PyMuPDF


def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF resume.
    """

    document = fitz.open(pdf_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text
