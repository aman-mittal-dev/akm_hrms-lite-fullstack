import { useState } from "react";
import { addEmployee } from "../services/employeeService";

const AddEmployeeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await addEmployee(formData);
      setSuccess("Employee added successfully");
      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      onSuccess(); // refresh list
    } catch (err) {
      setError("Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add Employee</h3>

      <input
        name="employee_id"
        placeholder="Employee ID"
        value={formData.employee_id}
        onChange={handleChange}
        required
      />

      <input
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Employee"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
};

export default AddEmployeeForm;
