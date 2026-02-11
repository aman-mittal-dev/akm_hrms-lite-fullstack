from fastapi import status

def success_response(message: str, data=None, status_code=status.HTTP_200_OK):
    return {
        "data": data,
        "message": message,
        "status": status_code,
    }


def error_response(message: str, status_code):
    return {
        "data": None,
        "message": message,
        "status": status_code,
    }
