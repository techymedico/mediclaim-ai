import google.generativeai as genai
import os

api_key = "AIzaSyAxL9PfgJEd7EI_FAvVStOIHPH0-o69kVk"

print(f"Checking key: {api_key[:10]}...")
genai.configure(api_key=api_key)

print("Listing models...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
except Exception as e:
    print(f"Error: {e}")
