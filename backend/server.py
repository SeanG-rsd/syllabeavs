from fastapi import FastAPI, Request, File, UploadFile, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from openai import OpenAI
from docx import Document
from PyPDF2 import PdfReader
from io import BytesIO
import os
from dotenv import load_dotenv
import io
import logging
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from firebase_admin import firestore, db as realtimedb
from firebase_admin import credentials, initialize_app, auth
import json
from datetime import datetime, timezone
import tiktoken

load_dotenv()
api_key = os.getenv("API_KEY")

cred_path = os.getenv("FIREBASE_CREDENTIAL_PATH")
cred = credentials.Certificate(cred_path)
initialize_app(cred)

db = firestore.client()
app = FastAPI()

client = OpenAI(api_key=api_key)

syllabusQuery = """
Look through the provided syllabus and extract all assignments, projects, tests, activities, readings, and quizzes.

### TEMPORAL ANCHOR
- This is a 10-week course for Winter 2026.
- Week 1, Monday is 01/05/2026.
- Week 1, Sunday is 01/11/2026.
- For relative dates (e.g., "Tuesday of Week 3"), calculate the exact date based on these anchors.

### DATA REQUIREMENTS
For each task, provide:
1. task: The specific name of the assignment/reading.
2. status: Always set to "Not Started".
3. class: Use exactly "[CLASS_NAME_VAR]" (Do not infer).
4. difficulty: Integer 1-5 (1: <15m, 3: ~1hr, 5: >3hrs/Exams).
5. dueDate: String in mm/dd/yyyy format.

### OUTPUT RULES
- Return ONLY valid JSON. 
- No markdown backticks, no introductory text, no "Column headers."
- Structure must match the "Syllabus JSON" schema exactly.

Syllabus JSON Schema:
{
  "class": string,
  "assignments": [
    {
      "task": string,
      "status": "Not Started",
      "class": string,
      "difficulty": number,
      "dueDate": "mm/dd/yyyy"
    }
  ]
}
"""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://syllabeavs.study"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8000/oauth2callback"

MAX_TOKENS = 10000 
MODEL_NAME = "gpt-4o-mini"

async def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
       # raise HTTP(status_code=401, detail="Missing auth token")
       print("Missing auth token")
    try:
        id_token = auth_header.split("Bearer ")[1]
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception:
        return None

@app.get("/oauth2callback")
async def oauth2callback(request: Request):
    code = request.query_params.get("code")
    return RedirectResponse(url=f"http://localhost:3000/success?code={code}")

@app.post("/store_google_tokens")
async def setup_calendar(request: Request):
    body = await request.json()
    uid = body.get("uid")
    code = body.get("code")

    if not uid or not code:
        raise HTTPException(status_code=400, detail="Missing uid or code")

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=["https://www.googleapis.com/auth/tasks"],
        redirect_uri="http://localhost:8000/oauth2callback"
    )

    flow.fetch_token(code=code)
    creds = flow.credentials

    db.collection("users").document(uid).set({
        "calendar_tokens": {
            "access_token": creds.token,
            "refresh_token": creds.refresh_token,
            "expiry": creds.expiry.isoformat(),
            "calendarConnected": True
        }
    }, merge=True)

    return { "status": "success" }

@app.post("/add_events")
async def add_all_to_calendar(request: Request, user_data: dict = Depends(verify_token)):
    if (user_data != None):
        user_uid = user_data["uid"]

        doc_ref = db.collection("users").document(user_uid)
        doc = doc_ref.get()
        tokens = doc.to_dict()["calendar_tokens"]

        creds = Credentials(
            tokens["access_token"],
            refresh_token=tokens["refresh_token"],
            token_uri="https://oauth2.googleapis.com/token",
            client_id=GOOGLE_CLIENT_ID,
            client_secret=GOOGLE_CLIENT_SECRET,
        )

        service = build("tasks", "v1", credentials=creds)

        syllabus = await request.json()

        for assignment in syllabus["assignments"]:

            dt = datetime.strptime(assignment["dueDate"], "%m/%d/%Y")

            dt = dt.replace(hour=23, minute=59, second=0, tzinfo=timezone.utc)

            google_due = dt.isoformat().replace('+00:00', 'Z')
            task = {
                'title': assignment["task"],
                'due': google_due,
                'notes': f"Difficulty: {assignment["difficulty"]}"
            }

            service.tasks().insert(tasklist='@default', body=task).execute()
        
        user_id = user_data["uid"]
        db.collection("users").document(user_id).collection("syllabi").document(syllabus["class"]).set({"assignments": syllabus["assignments"], "addedToCalendar": True})

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/generate")
async def receive_string(request: Request):
    logging.debug(f"Received file:")
    body = await request.body()
    text = body.decode()
    return {"message": f"Test: {text}"}

@app.get("/syllabi")
async def get_syllabi(request: Request, user_data: dict = Depends(verify_token)):
    if (user_data != None):
        user_id = user_data["uid"]
        syllabi = db.collection("users").document(user_id).collection("syllabi").stream()

        data = []
        for document_snapshot in syllabi:
            doc_data = document_snapshot.to_dict()
            doc_data["className"] = document_snapshot.id
            data.append(doc_data)

        return {"syllabi": data}

    return {}

@app.post("/delete")
async def delete_syllabus(request: Request, user_data: dict = Depends(verify_token)):
    if (user_data != None):
        user_id = user_data["uid"]
        data = await request.json()
        className = data["class"]
        db.collection("users").document(user_id).collection("syllabi").document(className).delete()
        print('deleted: ', className)

@app.post("/update")
async def update_syllabi(request: Request, user_data: dict = Depends(verify_token)):
    if (user_data != None):
        user_id = user_data["uid"]
        data = await request.json()
        current_class = data["currentClass"]
        assignments = data["assignments"]
        db.collection("users").document(user_id).collection("syllabi").document(current_class).set({"assignments": assignments})

def count_tokens(text: str, model: str) -> int:
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

@app.post("/input")
async def recieve_syllabus(request: Request, file: UploadFile, user_data: dict = Depends(verify_token)):
    name = request.headers.get("ClassName")
    contents = await file.read()
    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(contents)
    elif filename.endswith(".docx"):
        text = extract_text_from_docx(contents)
    elif filename.endswith(".txt"):
        text = extract_text_from_txt(contents)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    if (len(text) > 30000):
        raise HTTPException(status_code=400, detail="File content is too large. Try removing uneccesary pages.")
    
    num_tokens = count_tokens(text, MODEL_NAME)
    print(num_tokens)

    if num_tokens > MAX_TOKENS:
        raise HTTPException(
            status_code=400, 
            detail=f"Syllabus is too long. Try removing uneccesary pages."
        )
    
    syll = parse_syllabus(text, name)
    print(syll)
    
    parsed = json.loads(syll)

    for x in parsed["assignments"]:
        x["class"] = name
   
    if (user_data != None):
        user_id = user_data["uid"]
        db.collection("users").document(user_id).collection("syllabi").document(name).set({"assignments": parsed["assignments"], "addedToCalendar": False})

    return {"message": json.dumps(parsed["assignments"])}

def extract_text_from_docx(contents: bytes) -> str:
    doc = Document(BytesIO(contents))
    return "\n".join(p.text for p in doc.paragraphs)

def extract_text_from_txt(contents: bytes) -> str:
    return contents.decode('utf-8')

def extract_text_from_pdf(contents: bytes) -> str:
    reader = PdfReader(BytesIO(contents))
    return "\n".join(page.extract_text() for page in reader.pages)

def parse_syllabus(text, className):
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {
                "role": "user",
                "content": f"This is the class name: {className}"
            },
            {
                "role":"system",
                "content": syllabusQuery
            },
            {
                "role":"user",
                "content": text
            }
        ],
    )
    
    raw = response.choices[0].message.content.strip()
    fixed_json = raw.replace("'", '"')

    return fixed_json

