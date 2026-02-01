import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from services.gemini_service import GeminiService
from services.package_matcher import find_candidate_packages

load_dotenv()

app = Flask(__name__)

# CORS (as per .md)
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173"
).split(",")

CORS(app, resources={
    r"/api/*": {
        "origins": ALLOWED_ORIGINS,
        "methods": ["POST", "GET", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

gemini = GeminiService()

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route("/api/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    content = file.read()

    keywords = gemini.extract_keywords(content)
    candidates = find_candidate_packages(keywords)
    analysis = gemini.analyze(content, candidates)

    return jsonify(analysis)
