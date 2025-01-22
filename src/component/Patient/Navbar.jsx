import React from 'react';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

function Navbar() {
  const location = useLocation(); // Get the current location

  return (
    <div className="patient-actions-container">
      <Link to="/patient/home">
        <button
          className={`patient-action-button ${
            location.pathname === '/patient/home' ? 'active-btn' : ''
          }`}
        >
          <i className="fas fa-home"></i>
        </button>
      </Link>
      <Link to="/patient/searchpatient">
        <button
          className={`patient-action-button ${
            location.pathname === '/patient/searchpatient' ? 'active-btn' : ''
          }`}
        >
          Search Patient
        </button>
      </Link>
      <Link to="/patient/registerpatient">
        <button
          className={`patient-action-button ${
            location.pathname === '/patient/registerpatient' ? 'active-btn' : ''
          }`}
        >
          Register Patient
        </button>
      </Link>
      {/* <Link to="/patient/opd">
        <button
          className={`patient-action-button ${
            location.pathname === '/patient/opd' ? 'active-btn' : ''
          }`}
        >
          OPD
        </button>
      </Link> */}
    </div>
  );
}

export default Navbar;
