import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ChemotherapyNavbar.css';

const ChemotherapyNavbar = () => {
  const location = useLocation(); // Get the current route location

  return (
    <nav className="chemotherapy-navbar">
      <ul>
        <li>
          <Link 
            to="/chemotherapy/surgerymanagement" 
            className={`chemotherapy-navbar-button ${location.pathname === '/chemotherapy/surgerymanagement' ? 'active' : ''}`}
          >
            Surgery Management
          </Link>
        </li>
        <li>
          <Link 
            to="/chemotherapy/chemotherapyscheduling" 
            className={`chemotherapy-navbar-button ${location.pathname === '/chemotherapy/chemotherapyscheduling' ? 'active' : ''}`}
          >
            Chemotherapy Scheduling
          </Link>
        </li>
        <li>
          <Link 
            to="/chemotherapy/radiationtherapy" 
            className={`chemotherapy-navbar-button ${location.pathname === '/chemotherapy/radiationtherapy' ? 'active' : ''}`}
          >
            Radiation Therapy
          </Link>
        </li>
        <li>
          <Link 
            to="/chemotherapy/cancerdiagnosis" 
            className={`chemotherapy-navbar-button ${location.pathname === '/chemotherapy/cancerdiagnosis' ? 'active' : ''}`}
          >
            Cancer Diagnosis
          </Link>
        </li>
        <li>
          <Link 
            to="/chemotherapy/patientsurvivaltracking" 
            className={`chemotherapy-navbar-button ${location.pathname === '/chemotherapy/patientsurvivaltracking' ? 'active' : ''}`}
          >
           Patient Survival Tracking
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ChemotherapyNavbar;
