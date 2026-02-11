import api from "./api";

export const getEmployees = async () => {
  const res = await api.get("/employees/");
  return res.data?.data || [];
};

export const deleteEmployee = async (id) => {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};

export const addEmployee = async (payload) => {
  const res = await api.post("/employees/", payload);
  return res.data;
};
