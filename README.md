# syllabeavs

Run locally in two terminals:

```powershell
cd frontend
npm run dev
```

```powershell
cd backend
.venv\Scripts\activate
pip install -r requirements.txt   # first time, or after requirements change
uvicorn server:app --reload
```

The frontend runs on <http://localhost:3000> and talks to the backend on <http://localhost:8000>
(see `frontend/app/api/config.ts`). Backend settings come from `backend/.env`.
