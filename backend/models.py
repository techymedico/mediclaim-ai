# Plain Python models for Flask backend
# No pydantic, no validation (as per deployment guide)

class AnalysisResponse(dict):
    """
    Simple dict-based response object.
    Used only for structure reference.
    """
    pass
