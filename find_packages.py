import csv
import json
import sys

def search_csv(files, keywords, output_file):
    matches = []
    
    for file_path in files:
        print(f"Reading {file_path}...")
        try:
            with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    # Combine all values to search
                    content = " ".join([str(v) for v in row.values()]).lower()
                    
                    # Check if any keyword hits
                    hit = False
                    for kw in keywords:
                        if kw.lower() in content:
                            hit = True
                            row['SOURCE_FILE'] = file_path
                            row['MATCH_KEYWORD'] = kw
                            matches.append(row)
                            break
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    print(f"Found {len(matches)} matches.")
    
    with open(output_file, 'w') as f:
        json.dump(matches, f, indent=2)

if __name__ == "__main__":
    files = ["data/package_list_1.csv", "data/package_list_2.csv"]
    keywords = [
        "Hepatico", 
        "Roux", 
        "Cholecystectomy", 
        "Biliary", 
        "Robot",
        "Reconstruction",
        "Choledoch"
    ]
    search_csv(files, keywords, "candidates.json")
