from pydantic import BaseModel
from typing import List, Optional

class ClinicalExtraction(BaseModel):
    diagnoses: List[str]
    procedures: List[str]
    complications: List[str]
    surgery_type: str
    anesthesia: str
    admission_type: str
    remarks: str

class PackageItem(BaseModel):
    package_code: str
    package_name: str
    reason: str

class RejectedPackageItem(BaseModel):
    package_code: str
    reason: str

class PackageRecommendation(BaseModel):
    primary_package: PackageItem
    add_on_packages: List[PackageItem]
    rejected_packages: List[RejectedPackageItem]

class InsuranceJustification(BaseModel):
    summary: str
    confidence_score: float
    risk_flags: List[str]
    required_documents: List[str]

class AnalysisResponse(BaseModel):
    clinical_extraction: ClinicalExtraction
    package_recommendation: PackageRecommendation
    insurance_justification: InsuranceJustification
