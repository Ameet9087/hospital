import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import "./DoctorDashBoard.css";
import PatientRecord from "./OutPatient";
import InPatient from "../DashBoards/InPatient";
import Records from "../DashBoards/PatientsRecord";

const DrDashboard = () => {
  const location = useLocation(); // Get the current path

  return (
    <div className="doctor-dashboard-container">
      {/* Navbar */}
      <div className="doctor-dashboard-button-group">
        <Link to="/doctor/outpatient">
          <button
            className={`dashboard-button ${
              location.pathname === "/doctor/outpatient" ? "active" : ""
            }`}
          >
            Out Patient
          </button>
        </Link>
        <Link to="/doctor/in-patientdepartment">
          <button
            className={`dashboard-button ${
              location.pathname === "/doctor/in-patientdepartment"
                ? "active"
                : ""
            }`}
          >
            In Patient Department
          </button>
        </Link>
        <Link to="/doctor/patientrecord">
          <button
            className={`dashboard-button ${
              location.pathname === "/doctor/patientrecord" ? "active" : ""
            }`}
          >
            Patient Record
          </button>
        </Link>
      </div>

      {/* Content Rendering */}
      <div className="dashboard-content">
        <Routes>
          <Route path="/outpatient" element={<PatientRecord />} />
          <Route path="/inpatientdepartment" element={<InPatient />} />
          <Route path="/patientrecord" element={<Records />} />
        </Routes>
      </div>
    </div>
  );
};

export default DrDashboard;
