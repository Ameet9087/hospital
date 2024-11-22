import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./cssd.css";
import Sterilization from "./Sterilization/Sterilization";
import CssdReports from "./CssdReports/Reports";

function Cssd() {
  return (
    <div className="cssd-component">
      <header className="cssd-component-header">
        <nav className="cssd-component-header-nav">
          <ul>
            <li>
              <NavLink
                to="/cssd/sterilization"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Sterilization
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cssd/reports"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="cssd-component-content">
        <Routes>
          <Route path="/sterilization/*" element={<Sterilization />} />
          <Route path="/reports/*" element={<CssdReports />} />
          <Route path="/sterilization/PendingItem" element={<Sterilization />} />
        </Routes>
      </div>
    </div>
  );
}

export default Cssd;
