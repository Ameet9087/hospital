import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";  // Import useNavigate
import "./MasterPrescription.css";
import SymptomsCategory from "./SymptomCategories"

const Navigation = () => {
  const navigate = useNavigate();  // Initialize useNavigate

  const handleNavigation = (path) => {
    navigate(path);  // Navigate to the path when the item is clicked
  };

  return (
    <>
    <div className="navigation-container">
      <div className="navigation-sidebar">
        <div className="navigation-sidebar-header"></div>
        <ul className="navigation-sidebar-nav">
          <li onClick={() => handleNavigation("/settings/prescription/symptoms-category")}>
            Symptoms Category
          </li>
          {/* <li onClick={() => handleNavigation("/symptoms")}>Symptoms</li>
          <li onClick={() => handleNavigation("/diseases")}>Diseases</li>
          <li onClick={() => handleNavigation("/medication")}>Medication</li> */}
        </ul>
      </div>
    </div>
      <Routes>
        <Route path="/symptoms-category" element={<SymptomsCategory />} />
      </Routes>
    </>

  );
};

export default Navigation;

