 /* Dhanashree_NavBar_19/09 */

import React, { useState } from 'react';
import './Emergency.css';
import { FaHome } from 'react-icons/fa';
import { NavLink, Routes, Route } from 'react-router-dom'; 
import Dashboard from '../Emergency/EmergencyDashboard';
import PatientList from '../Emergency/Patient';
import TriagedPatients from '../Emergency/TriagedPatients';
import FinalizedPatients from '../Emergency/FinalizedPatients';
import WardOccupancy from '../Emergency/BedInfo';
import EmergencyCodeResponseForm from './EmergencyCodeResponse/EmergencyCodeResponseForm';
import ResponseLogForm from './EmergencyCodeResponse/ResponseLogForm';
import IncidentSummaryForm from './EmergencyCodeResponse/IncidentSummaryForm';
import EmergencyDrillReportForm from './EmergencyCodeResponse/EmergencyDrillReportForm';


const NavBar = () => {
    return (
        <div>
            <NavMenu />
            <Routes>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/newPatients" element={<PatientList />} />
                <Route path="/triagedPatients" element={<TriagedPatients />} />
                <Route path="/finalizedPatients" element={<FinalizedPatients />} />
                <Route path="/bedinformation" element={<WardOccupancy />} />
                <Route path="/emergencycoderesponse" element={<EmergencyCodeResponseForm/>}/>
                <Route path="/responselog" element={<ResponseLogForm/>}/>
                <Route path="/incidentsummary" element={<IncidentSummaryForm/>}/>
                <Route path="/emergencydrillreport" element={<EmergencyDrillReportForm/>}/>
            </Routes>
        </div>
    );
};

const NavMenu = () => {
    return (
        <nav className="EmergencyNavBar-nav-menu">
            <NavLink 
                to="/emergency/home" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                <FaHome />
            </NavLink>
            <NavLink 
                to="/emergency/newpatients" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                New Patients
            </NavLink>
            <NavLink 
                to="/emergency/triagedpatients" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                Triaged Patients
            </NavLink>
            <NavLink 
                to="/emergency/finalizedpatients" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                Finalized Patients
            </NavLink>
            <NavLink 
                to="/emergency/bedinformation" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                Bed Information
            </NavLink>

            <NavLink 
                to="/emergency/emergencycoderesponse" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                 Emergency Code Response
            </NavLink>

            <NavLink 
                to="/emergency/responselog" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                  Response Log
            </NavLink>

            <NavLink 
                to="/emergency/incidentsummary" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                  Incident Summary
            </NavLink>

            <NavLink 
                to="/emergency/emergencydrillreport" 
                className="EmergencyNavBar-button"
                activeClassName="EmergencyNavBar-active"
            >
                   Emergency Drill Report
            </NavLink>

        </nav>
    );
};

export default NavBar;

 /* Dhanashree_NavBar_19/09 */
