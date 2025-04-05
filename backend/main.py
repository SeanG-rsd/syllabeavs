from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import PyPDF2
import os
import io
import logging

app = FastAPI()

# Allow React frontend (localhost:3000) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def receive_string(request: Request):
    logging.debug(f"Received file:")
    body = await request.body()
    text = body.decode()
    return {"message": f"Test: {text}"}

@app.post("/input")
async def recieve_syllabus(file: UploadFile):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    return {"message": f"Text from the file: {text[:500]}"}

@app.post("/test")
async def recieve_syllabus(file: UploadFile):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    return {"message": f"Text from the file: {text[:500]}"}

def extract_text_from_pdf(file):
    text = ""
    reader = PyPDF2.PdfReader(io.BytesIO(file))
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text

