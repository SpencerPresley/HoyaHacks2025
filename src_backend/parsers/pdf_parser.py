import os
from pathlib import Path
from langchain_community.document_loaders import PyMuPDFLoader

THIS_DIR = Path(__file__).parent
PARENT_DIR = THIS_DIR.parent
RESUMES_DIR = PARENT_DIR / "resumes"

def get_pdf_paths():
    return RESUMES_DIR.glob("*.pdf")

def load_pdfs():
    loaded_docs = []
    loader = PyMuPDFLoader()
    pdf_paths = get_pdf_paths()
    for pdf_path in pdf_paths:
        loaded_docs.append(loader.load(pdf_path))
    return loaded_docs
