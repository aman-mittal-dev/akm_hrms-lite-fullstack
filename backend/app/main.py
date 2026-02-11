from fastapi import FastAPI, status, Request
from fastapi.responses import JSONResponse
from . import models
from .database import Base, engine
from .routers import employees, attendance
from .routers.utils.response import success_response
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="HRMS Lite API")

Base.metadata.create_all(bind=engine)

app.include_router(employees.router)
app.include_router(attendance.router)

@app.get("/")
def root():
    return success_response(
        message="HRMS Lite Backend is running",
        status_code=status.HTTP_200_OK
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "status": 500,
            "message": "Internal Server Error",
            "data": None
        }
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",          # local dev
        "https://akmhrmsfrontend.netlify.app",  # netlify prod
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)