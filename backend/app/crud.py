from sqlalchemy.orm import Session
from . import models, schemas

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
