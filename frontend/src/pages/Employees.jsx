import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeForm from "../components/AddEmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = () => {
    setLoading(true);
    setError("");

    getEmployees()
      .then((data) => {
        setEmployees(data);
      })
      .catch(() => {
        setError("Failed to load employees");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="app-container">
      {/* Add Employee Section */}
      <div className="section">
        <AddEmployeeForm onSuccess={fetchEmployees} />
      </div>

      {/* Employee Table Section */}
      <div className="section">
        <EmployeeTable
          employees={employees}
          onDeleteSuccess={fetchEmployees}
        />
      </div>
    </div>
  );
};

export default Employees;
