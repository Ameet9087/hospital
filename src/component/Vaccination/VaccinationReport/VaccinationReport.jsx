import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import "./VaccinationReport.css";
import VaccinationAppointment from "./vaccinationAppointments/VaccinationAppointment";
import VaccinationsReports from "./vaccineReport/VaccinationsReports";

function vaccinationReports() {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRefs = useRef([]);

  const handleNavLinkClick = (index) => {
    const navItem = navRefs.current[index];
    const left = navItem.offsetLeft;
    const width = navItem.offsetWidth;

    setUnderlineStyle({
      left: `${left}px`,
      width: `${width}px`,
      transition: "left 0.3s ease, width 0.3s ease", // Adding transition for animation
    });
  };

  useEffect(() => {
    // Initialize underline position on the first render
    handleNavLinkClick(0);
  }, []);

  return (
    <main className="vaccinationReports-main">
      <nav className="vaccinationReports-sub-nav">
        <ul>
          <li ref={(el) => (navRefs.current[0] = el)}>
            <NavLink
              to="IntegratedReport"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(0)}
            >
              Vaccination Report
            </NavLink>
          </li>
          {/* <li ref={(el) => (navRefs.current[1] = el)}>
            <NavLink
              to="AppointmentDetailsReport"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(1)}
            >
              Appointments
            </NavLink>
          </li> */}
        </ul>
        <div className="underline" style={underlineStyle}></div>
      </nav>

      <Routes>
        <Route path="IntegratedReport" element={<VaccinationsReports />} />
        <Route
          path="AppointmentDetailsReport"
          element={<VaccinationAppointment />}
        />
        <Route path="Reports/*" element={<VaccinationsReports />} />
      </Routes>
    </main>
  );
}

export default vaccinationReports;
