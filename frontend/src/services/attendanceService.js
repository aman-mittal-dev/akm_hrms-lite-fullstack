import api from "./api";

export const markAttendance = async (payload) => {
  const res = await api.post("/attendance/", payload);
  return res.data;
};

export const getAttendanceByEmployee = async (employeeId) => {
  const res = await api.get(`/attendance/${employeeId}`);
  return res.data?.data || [];
};
