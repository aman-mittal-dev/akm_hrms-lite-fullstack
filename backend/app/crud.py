from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date

def get_employees(db: Session):
    return db.query(models.Employee).all()


def create_employee(db: Session, employee: schemas.EmployeeCreate):
    existing = db.query(models.Employee).filter(
        (models.Employee.employee_id == employee.employee_id) |
        (models.Employee.email == employee.email)
    ).first()

    if existing:
        return None

    new_employee = models.Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


def delete_employee(db: Session, employee_id: int):
    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        return None

    db.delete(employee)
    db.commit()
    return employee

#######################################################################################

def mark_attendance(db: Session, employee_id: int, attendance_date: date, status: str):
    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id
    ).first()

    if not employee:
        return None, "EMPLOYEE_NOT_FOUND"

    existing = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == attendance_date
    ).first()

    if existing:
        return None, "DUPLICATE"

    record = models.Attendance(
        employee_id=employee_id,
        date=attendance_date,
        status=status
    )

    db.add(record)
    db.commit()
    db.refresh(record)
    return record, None


def get_attendance_by_employee(db: Session, employee_id: int):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).order_by(models.Attendance.date.desc()).all()
