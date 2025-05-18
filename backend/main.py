from fastapi import FastAPI, Request, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import PyPDF2
import os
from dotenv import load_dotenv
import io
import logging
from firebase_admin import firestore, db as realtimedb
from firebase_admin import credentials, initialize_app, auth
import json

load_dotenv()
api_key = os.getenv("API_KEY")

cred_path = os.getenv("FIREBASE_CREDENTIAL_PATH")
cred = credentials.Certificate(cred_path)
initialize_app(cred)

db = firestore.client()
app = FastAPI()

client = OpenAI(api_key=api_key)

syllabusQuery = """
Look through the given syllabus and find out all the assignments, projects, tests, in-class activies, studios, textbook or document readings, recitations, and quizzes for the college course.
For each of these pieces, find out the the name of the task, the status of the task, a simplified name for the class, how difficult the task will be on a scale from 1-5
(1 being tasks that take less than 15 minutes to do and 5 being tests or something that takes more than 3 hours), and the due date in the format (mm/dd/yy). 
Put each individual task in its own line. Include only the columns headers and the information, nothing else, not even quotation marks.
All tasks can be given 1 of 4 statuses, "Not Started", "In Progress", "Blocked", or "Completed". For this course all tasks will be assigned "Not Started".
For reference, Monday of Week 1 is 3/31/25 and Sunday of Week 1 is 4/6/25. The course lasts for 10 weeks, make sure to include every week's assignments
Do not output any information except for the JSON formatted file. Output into the given JSON format below:

Assignment JSON:
{
    "task": string,
    "status": string ("Not Started", "In Progress", or "Completed"),
    "class": string,
    "difficulty": int (1-5),
    "dueDate": string (mm/dd/yyyy)
}


Syllabus JSON:
{
"class" : string
"assignments" : [
        Assignment JSON,
        Assignment JSON,
        ...
    ]
}

NO QUOTATION MARKS
"""

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/generate")
async def receive_string(request: Request):
    logging.debug(f"Received file:")
    body = await request.body()
    text = body.decode()
    return {"message": f"Test: {text}"}

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


        print("barrier")
        print(json.dumps(data, indent=4))
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

@app.post("/input")
async def recieve_syllabus(request: Request, file: UploadFile, user_data: dict = Depends(verify_token)):
    name = request.headers.get("ClassName")
    contents = await file.read()
    text = extract_text_from_pdf(contents)
    parsed = json.loads(parse_syllabus(text))
   
    if (user_data != None):
        user_id = user_data["uid"]
        db.collection("users").document(user_id).collection("syllabi").document(name).set({"assignments": parsed["assignments"]})

    return {"message": json.dumps(parsed["assignments"])}

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
                "role":"system",
                "content": syllabusQuery
            },
            {
                "role":"user",
                "content": text
            }
        ],
    )
    return response.choices[0].message.content

