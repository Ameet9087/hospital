// src/components/Navigation.js
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();
  return (
    <nav className="nursing-actions-container">
      <NavLink
        className={`nursing-action-button ${
          location.pathname === "/nursing/nursingdashboard" ? "selected" : ""
        }`}
        to="/nursing/nursingdashboard"
      >
        Nursing Dashboard
      </NavLink>

      <NavLink
        className={`nursing-action-button ${
          location.pathname === "/nursing/outpatient" ? "selected" : ""
        }`}
        to="/nursing/outpatient"
      >
        Outpatient
      </NavLink>

      {/* <NavLink to="/nursing/Inpatient">
        {" "}
        <button
          className={`nursing-action-button ${
            selectedButton === "In Patient" ? "selected" : ""
          }`}
          onClick={() => handleButtonClick("In Patient")}
        >
          {" "}
          In Patient
        </button>
      </NavLink> */}

      {/* <NavLink to="/Nephrology"> <button
                className={`nursing-action-button ${selectedButton === 'Nephrology' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('Nephrology')}
                > Nephrology</button>
            </NavLink> */}

      {/* <NavLink to="/RequisitionList">
        {" "}
        <button
          className={`nursing-action-button ${
            selectedButton === "RequisitionList" ? "selected" : ""
          }`}
          onClick={() => handleButtonClick("RequisitionList")}
        >
          {" "}
          Requisition List
        </button>
      </NavLink>

      <NavLink to="/DischargeSummary">
        {" "}
        <button
          className={`nursing-action-button ${
            selectedButton === "Discharge Summary" ? "selected" : ""
          }`}
          onClick={() => handleButtonClick("Discharge Summary")}
        >
          {" "}
          Discharge Summary
        </button>
      </NavLink>

      <NavLink to="/AdhenseSafetyPrecaution">
        {" "}
        <button
          className={`nursing-action-button ${
            selectedButton === "Adherence Safety Precaution" ? "selected" : ""
          }`}
          onClick={() => handleButtonClick("Adherence Safety Precaution")}
        >
          {" "}
          Adherence Safety Precaution
        </button>
      </NavLink> */}
    </nav>
  );
}

export default Navigation;
