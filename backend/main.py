from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.services.gemini_service import GeminiService
from backend.services.package_matcher import PackageMatcher
from backend.models import AnalysisResponse
import uvicorn
import os
import shutil

import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Medical Insurance Intelligence API")

# Production-ready CORS configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Services
# Assuming CSVs are in backend/data/
gemini_service = None
package_matcher = None

@app.on_event("startup")
async def startup_event():
    global gemini_service, package_matcher
    gemini_service = GeminiService()
    
    csv_files = [
        "backend/data/package_list_1.csv",
        "backend/data/package_list_2.csv"
    ]
    # Check if files exist
    valid_files = [f for f in csv_files if os.path.exists(f)]
    if not valid_files:
        print("WARNING: Package CSV files not found!")
    
    package_matcher = PackageMatcher(valid_files)

@app.get("/health")
async def health_check():
    """Health check endpoint for deployment monitoring"""
    return {"status": "healthy", "service": "MediClaim AI API"}


@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_discharge_summary(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in ["application/pdf", "image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF, JPG, PNG supported.")
    
    # Read file content
    content = await file.read()
    
    # Step 1: Extract Keywords using Gemini
    print("Step 1: Extracting keywords...")
    keywords = gemini_service.extract_keywords(content, file.content_type)
    print(f"Keywords: {keywords}")
    
    # Step 2: Search for Candidates
    print("Step 2: Searching Database...")
    candidates = package_matcher.search(keywords, limit=30)
    print(f"Found {len(candidates)} candidates")
    
    # Step 3: Final Analysis
    print("Step 3: Reasoning...")
    result = gemini_service.analyze(content, file.content_type, candidates)
    
    return result

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
