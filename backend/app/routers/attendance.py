from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from ..database import get_db
from .. import crud, schemas
from .utils.response import success_response, error_response

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)

@router.post("/")
def mark_attendance(
    attendance: schemas.AttendanceCreate,
    db: Session = Depends(get_db)
):
    record, error = crud.mark_attendance(
        db,
        employee_id=attendance.employee_id,
        attendance_date=attendance.date,
        status=attendance.status
    )

    if error == "EMPLOYEE_NOT_FOUND":
        return error_response(
            message="Employee not found",
            status_code=status.HTTP_404_NOT_FOUND
        )

    if error == "DUPLICATE":
        return error_response(
            message="Attendance already marked for this date",
            status_code=status.HTTP_400_BAD_REQUEST
        )

    return success_response(
        message="Attendance marked successfully",
        data=record,
        status_code=status.HTTP_201_CREATED
    )


@router.get("/{employee_id}")
def view_attendance(employee_id: int, db: Session = Depends(get_db)):
    records = crud.get_attendance_by_employee(db, employee_id)

    return success_response(
        message="Attendance records fetched successfully",
        data=records,
        status_code=status.HTTP_200_OK
    )
