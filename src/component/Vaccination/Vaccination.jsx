import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./vaccination.css";
import PatientList from "./PatientList/Patientlist";
import VaccinationReports from "./VaccinationReport/VaccinationReport";

function Vaccination() {
  return (
    <div className="vaccination-component">
      <header className="vaccination-component-header">
        <nav className="vaccination-component-header-nav">
          <ul>
            <li>
              <NavLink
                to="/vaccination/patientlist"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Patient List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vaccination/reports"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="vaccination-component-content">
        <Routes>
          <Route path="patientlist" element={<PatientList />} />
          <Route path="reports/*" element={<VaccinationReports />} />
          <Route path="vaccination/patientlist" element={<PatientList />} />
        </Routes>
      </div>
    </div>
  );
}

export default Vaccination;
