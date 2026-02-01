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
        You are an expert medical coder and insurance specialist for PMJAY/MAA schemes.
        Your task is to analyze the attached hospital discharge summary and recommend appropriate insurance packages.

        CRITICAL RULES:
        1. You MUST ONLY select packages from the CANDIDATE LIST provided below.
        2. DO NOT invent or hallucinate package names or codes.
        3. Use EXACT package_code and package_name values from the candidate list.
        4. If no suitable package exists in the list, set package_code to "NO_MATCH" and explain why.

        ==== CANDIDATE PACKAGE LIST (SELECT ONLY FROM THIS LIST) ====
        {candidates_text}
        ==== END OF CANDIDATE LIST ====

        INSTRUCTIONS:
        1. Extract all clinical details (diagnoses, procedures, surgery type, etc.) from the document.
        2. Review ONLY the candidate packages listed above.
        3. Select ALL applicable packages - there may be MULTIPLE packages for one case if multiple procedures were performed.
        4. The primary_package should be the MAIN procedure package.
        5. Additional applicable packages should go in add_on_packages with proper justification.
        6. For each package, copy the EXACT package_code and PACKAGE NAME from the candidate list.

        Output must be in strict JSON format matching this schema:
        {{
            "clinical_extraction": {{
                "diagnoses": [], 
                "procedures": [], 
                "complications": [],
                "surgery_type": "", 
                "anesthesia": "", 
                "admission_type": "", 
                "remarks": ""
            }},
            "normalized_medical_concepts": {{
                "primary_conditions": [], 
                "definitive_procedures": [], 
                "supporting_procedures": []
            }},
            "package_recommendation": {{
                "primary_package": {{ 
                    "package_code": "<EXACT CODE FROM LIST>", 
                    "package_name": "<EXACT NAME FROM LIST>", 
                    "reason": "<justification>" 
                }},
                "add_on_packages": [ 
                    {{ 
                        "package_code": "<EXACT CODE FROM LIST>", 
                        "package_name": "<EXACT NAME FROM LIST>", 
                        "reason": "<justification>" 
                    }} 
                ],
                "rejected_packages": [ 
                    {{ 
                        "package_code": "<code from list>", 
                        "reason": "<why not applicable>" 
                    }} 
                ],
                "total_applicable_packages": 0
            }},
            "insurance_justification": {{
                "summary": "", 
                "confidence_score": 0.0,
                "risk_flags": [], 
                "required_documents": []
            }}
        }}

        IMPORTANT: The package_code and package_name MUST be copied EXACTLY from the candidate list above.
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
