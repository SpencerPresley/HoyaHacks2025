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
    pdf_paths = get_pdf_paths()
    for pdf_path in pdf_paths:
        loader = PyMuPDFLoader(pdf_path)
        loaded_docs.append(loader.load())
    return loaded_docs

if __name__ == "__main__":
    docs = load_pdfs()
    for doc in docs:
        print(f"Page Contents:\n\n{doc.page_content}\n\n")
        print(f"Metadata:\n\n{doc.metadata}\n\n")
        print("\n\n")