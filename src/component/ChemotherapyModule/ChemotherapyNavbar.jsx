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
            to="/surgery-management" 
            className={`chemotherapy-navbar-button ${location.pathname === '/surgery-management' ? 'active' : ''}`}
          >
            Surgery Management
          </Link>
        </li>
        <li>
          <Link 
            to="/chemotherapy-scheduling" 
            className={`chemotherapy-navbar-button ${location.pathname === '/chemotherapy-scheduling' ? 'active' : ''}`}
          >
            Chemotherapy Scheduling
          </Link>
        </li>
        <li>
          <Link 
            to="/radiation-therapy" 
            className={`chemotherapy-navbar-button ${location.pathname === '/radiation-therapy' ? 'active' : ''}`}
          >
            Radiation Therapy
          </Link>
        </li>
        <li>
          <Link 
            to="/cancer-diagnosis" 
            className={`chemotherapy-navbar-button ${location.pathname === '/cancer-diagnosis' ? 'active' : ''}`}
          >
            Cancer Diagnosis
          </Link>
        </li>
        <li>
          <Link 
            to="/patient-survival-tracking" 
            className={`chemotherapy-navbar-button ${location.pathname === '/patient-survival-tracking' ? 'active' : ''}`}
          >
           Patient Survival Tracking
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ChemotherapyNavbar;
