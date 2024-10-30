import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import './radiationtherapy.css';
import { Routes, Route } from 'react-router-dom';
import Patienttreatmentplan from './PatientTreatmentPlan/patienttreatmetplan';
import Dasagetracking from './DosageTracking/dasagetracking';
import Equipmentusagelogs from './EquipmentUsageLogs/equipmentusagelogs';
import Radiationsafetycompliance from './RadiationSafetyCompliance/radiationsafetycompliance';
import Radiationappointemt from './Appointemt_&_Schedulling/radiationappointemt';

const RadiationtherapyHeader = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="radiationtherapy-header">
      <NavLink 
        to="/patienttherapyplan" 
        className={`radiationtherapy-header-button ${location.pathname === '/patienttherapyplan' ? 'active' : ''}`}
      >
        Patient Therapy Plan
      </NavLink>
      <NavLink 
        to="/dosagetracking" 
        className={`radiationtherapy-header-button ${location.pathname === '/dosagetracking' ? 'active' : ''}`}
      >
        Dosage Tracking
      </NavLink>
      <NavLink 
        to="/equipmentusagelogs" 
        className={`radiationtherapy-header-button ${location.pathname === '/equipmentusagelogs' ? 'active' : ''}`}
      >
        Equipment Usage Logs
      </NavLink>
      <NavLink 
        to="/radiationsafetycompliance" 
        className={`radiationtherapy-header-button ${location.pathname === '/radiationsafetycompliance' ? 'active' : ''}`}
      >
        Radiation Safety Compliance
      </NavLink>
      <NavLink 
        to="/appointmentandschedulling" 
        className={`radiationtherapy-header-button ${location.pathname === '/appointmentandschedulling' ? 'active' : ''}`}
      >
        Appointment And Schedulling
      </NavLink>


      <div>
      <Routes>
          <Route path="/patienttherapyplan" element={<Patienttreatmentplan />} />
          <Route path="/dosagetracking" element={<Dasagetracking />} />
          <Route path="/equipmentusagelogs" element={<Equipmentusagelogs />} />
          <Route path="/radiationsafetycompliance" element={<Radiationsafetycompliance />} />
          <Route path="/appointmentandschedulling" element={<Radiationappointemt />} />
        </Routes>
      </div>
    </div>
  );
};

export default RadiationtherapyHeader;
