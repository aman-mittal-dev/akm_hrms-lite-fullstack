import { useEffect, useState } from "react";
import { getEmployees } from "../services/employeeService";
import {
  markAttendance,
  getAttendanceByEmployee,
} from "../services/attendanceService";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load employees", err);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await markAttendance({
        employee_id: employeeId,
        date,
        status,
      });

      setMessage("Attendance marked successfully");

      const data = await getAttendanceByEmployee(employeeId);
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to mark attendance");
    }
  };

  const handleEmployeeChange = async (id) => {
    setEmployeeId(id);
    if (!id) {
      setRecords([]);
      return;
    }

    try {
      const data = await getAttendanceByEmployee(id);
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setRecords([]);
    }
  };

  return (
    <div className="app-container">
      <h2>Attendance Management</h2>

      {/* Form Section */}
      <div className="section">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
            <select
              value={employeeId}
              onChange={(e) => handleEmployeeChange(e.target.value)}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <button type="submit">Mark Attendance</button>
          </div>
        </form>

        {message && <p>{message}</p>}
      </div>

      {/* Records Section */}
      <div className="section">
        {Array.isArray(records) && records.length > 0 && (
          <>
            <h3>Attendance Records</h3>

            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id}>
                    <td>{rec.date}</td>
                    <td>{rec.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Attendance;
