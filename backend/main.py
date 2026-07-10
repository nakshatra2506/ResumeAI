from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.job_match import router as job_match_router
from api.tailor import router as tailor_router
from api.upload import router as upload_router
from api.job import router as job_router
from api.analyze import router as analyze_router
from api.ai import router as ai_router
from api.feedback import router as feedback_router

app = FastAPI(
    title="ResumeIQ AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(job_router)
app.include_router(analyze_router)
app.include_router(ai_router)
app.include_router(feedback_router)
app.include_router(job_match_router)
app.include_router(tailor_router)

@app.get("/")
def home():
    return {
        "message": "ResumeIQ AI Backend is Running 🚀"
    }