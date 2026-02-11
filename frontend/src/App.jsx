// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Employees from "./pages/Employees";
// import Attendance from "./pages/Attendance";

// function App() {
//   return (
//     <BrowserRouter>
//       <nav style={{ marginBottom: "20px" }}>
//         <Link to="/">Employees</Link> |{" "}
//         <Link to="/attendance">Attendance</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Employees />} />
//         <Route path="/attendance" element={<Attendance />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        {/* Navigation Buttons */}
        <div style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
          <NavLink to="/" className="nav-btn">
            Employees
          </NavLink>
          <NavLink to="/attendance" className="nav-btn">
            Attendance
          </NavLink>
        </div>

        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
