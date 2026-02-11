from fastapi import FastAPI
from .database import Base, engine
from . import models
from .routers import employees

app = FastAPI(title="HRMS Lite API")

Base.metadata.create_all(bind=engine)

app.include_router(employees.router)

@app.get("/")
def root():
    return {"message": "HRMS Lite Backend is running"}
