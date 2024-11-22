// src/components/Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav className="reports-tabs-nav">
            <NavLink to="/medicalrecord/mroutpatientlist" className="reports-nav-link">MR Outpatient List</NavLink>
            <NavLink to="/medicalrecord/mrinpatientlist" className="reports-nav-link">MR Inpatient List</NavLink>
            <NavLink to="/medicalrecord/birthlist" className="reports-nav-link">Birth List</NavLink>
            <NavLink to="/medicalrecord/deathlist" className="reports-nav-link">Death List</NavLink>
            <NavLink to="/medicalrecord/reports" className="reports-nav-link">Reports</NavLink>
           
            <NavLink to="/medicalrecord/emergencypatientlist" className="reports-nav-link">Emergency Patient List</NavLink>
          
        </nav>


    );
}

export default Navigation;