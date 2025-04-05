from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend (localhost:3000) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# @app.get("/")
# def root():
#     return {"message": "Hello from FastAPI!"}

@app.post("/")
async def root(message: str):
    print(message)
    # You can now save it, parse it, send to OpenAI, etc.
    return {"message": message}