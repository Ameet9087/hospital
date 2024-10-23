import React from 'react';
import { NavLink } from 'react-router-dom';
import './ChemotherapyNavbar.css';

const ChemotherapyNavbar = () => {
  return (
    <div className='chemotherapy-navbar-module'>
      <nav className="chemotherapy-navbar">
      <ul>
        <li>
          <NavLink 
            to="/surgery-management" 
            className={({ isActive }) => 
              isActive ? "chemotherapy-navbar-button active" : "chemotherapy-navbar-button"
            }
          >
            Surgery Management
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/chemotherapy-scheduling" 
            className={({ isActive }) => 
              isActive ? "chemotherapy-navbar-button active" : "chemotherapy-navbar-button"
            }
          >
            Chemotherapy Scheduling
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/radiation-therapy" 
            className={({ isActive }) => 
              isActive ? "chemotherapy-navbar-button active" : "chemotherapy-navbar-button"
            }
          >
            Radiation Therapy
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cancer-diagnosis" 
            className={({ isActive }) => 
              isActive ? "chemotherapy-navbar-button active" : "chemotherapy-navbar-button"
            }
          >
            Cancer Diagnosis
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/patient-survival-tracking" 
            className={({ isActive }) => 
              isActive ? "chemotherapy-navbar-button active" : "chemotherapy-navbar-button"
            }
          >
           Patient Survival Tracking
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default ChemotherapyNavbar;
