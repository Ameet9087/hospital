import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ambulanceNavbar.css';

const AmbulanceNavbar = () => {
  const location = useLocation(); // Get the current route location

  return (
    <nav className="ambulance-navbar">
      <ul>
      <li>
          <Link 
            to="/transport/ambulance/emergency-request" 
            className={`ambulance-header-button ${location.pathname === '/emergency-request' ? 'active' : ''}`}
          >
            Emergency Request
          </Link>
        </li>
        <li>
          <Link 
            to="/transport/ambulance/ambulance-list" 
            className={`ambulance-header-button ${location.pathname === '/ambulance-list' ? 'active' : ''}`}
          >
            Ambulance List
          </Link>
        </li>
        {/* <li>
          <Link 
            to="/transport/ambulance/dispatch" 
            className={`ambulance-header-button ${location.pathname === '/dispatch' ? 'active' : ''}`}
          >
            Dispatch Ambulance
          </Link>
        </li> */}
        <li>
          <Link 
            to="/transport/ambulance/gps-map" 
            className={`ambulance-header-button ${location.pathname === '/gps-map' ? 'active' : ''}`}
          >
            GPS Tracking
          </Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default AmbulanceNavbar;
