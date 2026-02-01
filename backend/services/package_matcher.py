import csv
from typing import List, Dict

class PackageMatcher:
    def __init__(self, file_paths: List[str]):
        self.file_paths = file_paths
        self.data = self._load_data()

    def _load_data(self) -> List[Dict]:
        all_rows = []
        for path in self.file_paths:
            try:
                with open(path, 'r', encoding='utf-8', errors='replace') as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        # Normalize keys if needed or just keep raw
                        row['_source'] = path
                        all_rows.append(row)
            except Exception as e:
                print(f"Error loading {path}: {e}")
        return all_rows

    def search(self, keywords: List[str], limit: int = 50) -> List[Dict]:
        """
        Search for packages containing *any* of the keywords.
        Returns unique packages based on PACKAGE CODE.
        """
        matches = []
        seen_codes = set()
        
        # Simple keyword search (case-insensitive)
        # For a production app, we would use a vector DB or fuzzy search
        lowered_keywords = [k.lower() for k in keywords if k]
        
        if not lowered_keywords:
            return []

        for row in self.data:
            # Create a searchable string from relevant fields
            content = (
                str(row.get('PACKAGE NAME', '')) + " " + 
                str(row.get('Procedure', '')) + " " + 
                str(row.get('SPECIALITY', ''))
            ).lower()
            
            score = 0
            path_match = False
            
            for kw in lowered_keywords:
                if kw in content:
                    score += 1
                    path_match = True
            
            if path_match:
                code = row.get('PACKAGE CODE')
                if code and code not in seen_codes:
                    seen_codes.add(code)
                    matches.append(row)
                    
            if len(matches) >= limit:
                break
                
        return matches

# Singleton instance or factory can be used in main.py
