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
import InPatient from "./InPatient";
import Records from "./PatientsRecord";
import DoctorMainPage from "./OpDoctorMainPage";
import IpDoctorMainPage from "./IpDoctorMainPage";

const DrDashboard = () => {
  const location = useLocation();

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
        <Link to="/doctor/inpatientdepartment">
          <button
            className={`dashboard-button ${
              location.pathname === "/doctor/inpatientdepartment"
                ? "active"
                : ""
            }`}
          >
            In Patient Department
          </button>
        </Link>
        {/* <Link to="/doctor/patientrecord">
          <button
            className={`dashboard-button ${
              location.pathname === "/doctor/patientrecord" ? "active" : ""
            }`}
          >
            Patient Record
          </button>
        </Link> */}
      </div>

      {/* Content Rendering */}
      <div className="dashboard-content">
        <Routes>
          <Route path="/outpatient" element={<DoctorMainPage />} />
          <Route path="/inpatientdepartment" element={<IpDoctorMainPage />} />
          {/* <Route path="/patientrecord" element={<Records />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default DrDashboard;
