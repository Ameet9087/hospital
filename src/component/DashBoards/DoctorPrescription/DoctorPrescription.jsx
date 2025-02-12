import { Route, Routes } from 'react-router-dom'
import React, { useState } from "react";
import { NavLink } from "react-router-dom";


import SymptomsList from './SymptomsList';




const DoctorPrescription = () => {
  return (
    <>
      <nav className="prescription-actions-container">
        <NavLink
          to="symptomsList" // Relative path (inside DoctorPrescription)
          className={({ isActive }) =>
            `prescription-action-button ${isActive ? "selected" : ""}`
          }
        >
          Symptoms Check List
        </NavLink>
      </nav>

      <Routes>
        <Route path="/symptomslist/*" element={<SymptomsList />} />


      </Routes>
    </>
  )
}

export default DoctorPrescription