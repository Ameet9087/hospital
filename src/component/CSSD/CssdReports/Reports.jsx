import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import "./cssdReport.css";
import IntegratedReport from "./IntegratedCssdReport/IntegratedReport";

function Reports() {
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
    <main className="cssdReports-main">
      <nav className="cssdReports-sub-nav">
        <ul>
          <li ref={(el) => (navRefs.current[0] = el)}>
            <NavLink
              to="IntegratedCSSD"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => handleNavLinkClick(0)}
            >
              Integrated CSSD Report
            </NavLink>
          </li>
        </ul>
        <div className="underline" style={underlineStyle}></div>
      </nav>

      <Routes>
        <Route path="IntegratedCSSD" element={<IntegratedReport />} />

        <Route path="*" element={<IntegratedReport />} />
      </Routes>
    </main>
  );
}

export default Reports;
