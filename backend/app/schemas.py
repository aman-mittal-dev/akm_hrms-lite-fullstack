from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List

# --------------------
# Employee Schemas
# --------------------

class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        # orm_mode = True # Old 
        from_attributes = True # New, for SQLAlchemy 2.0 compatibility



# --------------------
# Attendance Schemas
# --------------------

class AttendanceBase(BaseModel):
    date: date
    status: str


class AttendanceCreate(AttendanceBase):
    employee_id: int


class AttendanceResponse(AttendanceBase):
    id: int
    employee_id: int

    class Config:
        # orm_mode = True # Old 
        from_attributes = True # New, for SQLAlchemy 2.0 compatibility
