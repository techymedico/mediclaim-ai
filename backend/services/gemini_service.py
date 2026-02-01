import os
import json
import google.generativeai as genai
from typing import List, Dict
from models import AnalysisResponse

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
             raise ValueError("GEMINI_API_KEY environment variable not set")

        genai.configure(api_key=api_key)
        # Using gemini-flash-latest which should map to the best available model for this key
        self.model = genai.GenerativeModel('gemini-flash-latest')

    def extract_keywords(self, file_content: bytes, mime_type: str) -> List[str]:
        prompt = """
        Analyze the attached medical discharge summary.
        Extract a list of 5-10 specific clinical keywords that would help find the appropriate insurance package in a database.
        Focus on:
        - Specific Procedure Names (e.g., 'Hepaticojejunostomy', 'Cholecystectomy')
        - Anatomical locations involved
        - Specific device/implant types if any

        Return ONLY a JSON array of strings. Example: ["Cholecystectomy", "Biliary Stricture", "Roux-en-Y"]
        """
        file_part = {"mime_type": mime_type, "data": file_content}
        try:
            response = self.model.generate_content([prompt, file_part])
            text = response.text.replace('```json', '').replace('```', '').strip()
            return json.loads(text)
        except Exception as e:
            print(f"Keyword extraction error: {e}")
            return []

    def analyze(self, file_content: bytes, mime_type: str, candidates: List[Dict]) -> AnalysisResponse:
        """
        Analyzes the discharge summary using Gemini Vision capabilities.
        """

        candidates_text = json.dumps(candidates, indent=2)

        prompt = f"""
        You are an expert medical coder and insurance specialist.
        Your task is to analyze the attached hospital discharge summary and recommend the most appropriate PMJAY/MAA insurance packages.

        Here is a list of POTENTIAL package candidates extracted from the master database based on keyword matching:
        {candidates_text}

        INSTRUCTIONS:
        1. Extract all clinical details (diagnoses, procedures, surgery type, etc.) from the image/pdf.
        2. Review the candidate list provided above.
        3. Select the ONE most appropriate PRIMARY package.
        4. Select any justified ADD-ON packages (rules: implied/bundled procedures cannot be add-ons).
        5. Provide a detailed justification.

        Output must be in strict JSON format matching this schema:
        {{
            "clinical_extraction": {{
                "diagnoses": [], "procedures": [], "complications": [],
                "surgery_type": "", "anesthesia": "", "admission_type": "", "remarks": ""
            }},
            "normalized_medical_concepts": {{
                "primary_conditions": [], "definitive_procedures": [], "supporting_procedures": []
            }},
            "package_recommendation": {{
                "primary_package": {{ "package_code": "", "package_name": "", "reason": "" }},
                "add_on_packages": [ {{ "package_code": "", "package_name": "", "reason": "" }} ],
                "rejected_packages": [ {{ "package_code": "", "reason": "" }} ]
            }},
            "insurance_justification": {{
                "summary": "", "confidence_score": 0.0,
                "risk_flags": [], "required_documents": []
            }}
        }}
        """

        file_part = {"mime_type": mime_type, "data": file_content}

        try:
            response = self.model.generate_content([prompt, file_part])

            # Cleanup markdown code blocks if present
            text = response.text.replace('```json', '').replace('```', '').strip()
            data = json.loads(text)
            return data
        except Exception as e:
            print(f"Error parsing Gemini response: {e}")
            if 'response' in locals():
                print(f"Raw response: {response.text}")
            raise e
