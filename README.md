# 🚀 ResumeAI – AI Resume Screening & ATS Optimization Platform

## 📌 Overview

ResumeAI is an AI-powered web application that analyzes resumes, evaluates ATS compatibility, and matches resumes against job descriptions using NLP and semantic similarity. The platform extracts skills, calculates ATS scores, identifies missing skills, generates AI-powered feedback, and tailors resumes to better align with specific job descriptions.

---

## ✨ Features

- 📄 Resume PDF Upload
- 📊 ATS Score Analysis
- 🧠 Skill Extraction
- 💼 Resume vs Job Description Matching
- 📈 Resume Match Score
- ✅ Matching Skills Detection
- ❌ Missing Skills Identification
- 🤖 AI Resume Feedback
- ✨ AI Resume Tailoring
- 📥 PDF Report Generation
- 📊 Interactive Dashboard

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- Recharts
- jsPDF

### Backend
- FastAPI
- Python
- Uvicorn

### AI & Machine Learning
- Google Gemini API
- Sentence Transformers
- spaCy
- Scikit-learn
- NumPy

### PDF Processing
- PyMuPDF

---

## 🤖 AI Models Used

- **Google Gemini 1.5 Flash** – Generates resume feedback and tailored resume content.
- **Sentence Transformers** – Creates embeddings for semantic similarity.
- **Cosine Similarity** – Calculates Resume–Job Description Match Score.
- **spaCy NLP** – Extracts skills and parses resume text.

---

## 📁 Project Structure

```text
ResumeAI
│
├── backend
│   ├── api
│   ├── models
│   ├── services
│   ├── uploads
│   ├── requirements.txt
│   └── main.py
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/nakshatra2506/ResumeAI.git

cd ResumeAI
```

### Backend

```bash
cd backend

python -m venv venv
```

### Activate Virtual Environment

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Add Environment Variable

Create a `.env` file inside the backend folder.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

### Run Backend

```bash
uvicorn main:app --reload
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 📌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/upload-resume` | Upload and analyze resume |
| `/job-match` | Compare resume with job description |
| `/feedback` | Generate AI resume feedback |
| `/tailor-resume` | Tailor resume for a specific job |

---

## 🚀 Future Enhancements

- Cover Letter Generator
- Interview Question Generator
- Recruiter Dashboard
- User Authentication
- Resume History

---

## 👩‍💻 Author

**Sri Nakshatra Namburu**

B.Tech – Artificial Intelligence & Data Science

RMK Engineering College
