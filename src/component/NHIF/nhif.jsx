import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import PatientList from './NHIFsubfiles/PatientList/PatientList';
import VisitList from './NHIFsubfiles/VisitList/VisitList';
import IPD_billing from './NHIFsubfiles/IPDBilling/IpD_Billing';
import Report from './NHIFsubfiles/report/report';
import './nhif.css';

const Nhif = () => {
  return (
    <>
      <header className="nhif-header">
        <nav>
          <ul className="nhif-header-nav">
            <NavLink
              to="/hi/patientlist"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <li>Patient List</li>
            </NavLink>
            <NavLink
              to="/hi/visitlist"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <li>Visit List</li>
            </NavLink>
            <NavLink
              to="/hi/ipdbilling"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <li>IPD Billing</li>
            </NavLink>
            <NavLink
              to="/hi/report"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <li>Report</li>
            </NavLink>
          </ul>
        </nav>
      </header>
      <div>
        <Routes>
          <Route path="/patientlist" element={<PatientList />} />
          <Route path="/visitlist" element={<VisitList />} />
          <Route path="/ipdbilling" element={<IPD_billing />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </>
  );
};

export default Nhif;
