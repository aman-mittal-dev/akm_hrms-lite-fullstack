from fastapi import FastAPI

app = FastAPI(title="HRMS Lite API")

@app.get("/")
def root():
    return {"message": "HRMS Lite Backend is running"}
