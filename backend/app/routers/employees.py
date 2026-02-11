from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from .. import crud, schemas
from ..database import get_db
from .utils.response import success_response, error_response

router = APIRouter(prefix="/employees",tags=["Employees"])

@router.post("/")
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    result = crud.create_employee(db, employee)
    if not result:
        return error_response(
            message="Employee with same ID or email already exists",
            status_code=status.HTTP_400_BAD_REQUEST
        )

    return success_response(
        message="Employee created successfully",
        data=result,
        status_code=status.HTTP_201_CREATED
    )


@router.get("/")
def list_employees(db: Session = Depends(get_db)):
    employees = crud.get_employees(db)

    return success_response(
        message="Employees fetched successfully",
        data=employees,
        status_code=status.HTTP_200_OK
    )


@router.delete("/{employee_id}")
def remove_employee(employee_id: int, db: Session = Depends(get_db)):
    result = crud.delete_employee(db, employee_id)

    if not result:
        return error_response(
            message="Employee not found",
            status_code=status.HTTP_404_NOT_FOUND
        )

    return success_response(
        message="Employee deleted successfully",
        status_code=status.HTTP_200_OK
    )
