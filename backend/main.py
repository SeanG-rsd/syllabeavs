from fastapi import FastAPI, Request, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import PyPDF2
import os
from dotenv import load_dotenv
import io
import logging

load_dotenv()
api_key = os.getenv("API_KEY")

app = FastAPI()

client = OpenAI(api_key=api_key)

syllabusQuery = """
Look through the given syllabus and find out all the assignments, projects, tests, in-class activies, studios, textbook or document readings, recitations, and quizzes for the college course.
For each of these pieces, find out the the name of the task, the status of the task, a simplified name for the class, how difficult the task will be on a scale from 1-5
(1 being tasks that take less than 15 minutes to do and 5 being tests or something that takes more than 3 hours), and the due date in the format (mm/dd/yy). 
Put each individual task in its own line. Include only the columns headers and the information, nothing else, not even quotation marks.
All tasks can be given 1 of 4 statuses, "Not Started", "In Progress", "Blocked", or "Completed". For this course all tasks will be assigned "Not Started".
For reference, Monday of Week 1 is 1/6/25 and Sunday of Week 1 is 1/12/25. Do not output any information except for the JSON formatted file. Output into the given JSON format below:

Assignment JSON:
{
    "task": string,
    "status": string ("Not Started", "In Progress", or "Completed"),
    "class": string,
    "difficulty": int (1-5),
    "due date": string (mm/dd/yyyy)
}

Syllabus JSON:
[
    Assignment JSON,
    Assignment JSON,
    ...
]

"""

# Allow React frontend (localhost:3000) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/generate")
async def receive_string(request: str):
    logging.debug(f"Received file:")
    body = await request.body()
    text = body.decode()
    return {"message": f"Test: {text}"}

@app.post("/input")
async def recieve_syllabus(file: UploadFile):
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    parsed = parse_syllabus(text)
    return {"message": {parsed}}

def extract_text_from_pdf(file):
    text = ""
    reader = PyPDF2.PdfReader(io.BytesIO(file))
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text
    return text

def parse_syllabus(text):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role":"developer",
                "content": syllabusQuery
            },
            {
                "role":"user",
                "content": text
            }
        ]
    )
    return response.choices[0].message.content

