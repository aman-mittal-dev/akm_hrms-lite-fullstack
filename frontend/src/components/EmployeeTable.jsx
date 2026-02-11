import { deleteEmployee } from "../services/employeeService";

const EmployeeTable = ({ employees = [], onDeleteSuccess }) => {
  if (!Array.isArray(employees) || employees.length === 0) {
    return <p>No employees found.</p>;
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      onDeleteSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to delete employee");
    }
  };

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Employee ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.employee_id}</td>
            <td>{emp.full_name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>
              <button
                onClick={() => handleDelete(emp.id)}
                style={{ color: "red" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
