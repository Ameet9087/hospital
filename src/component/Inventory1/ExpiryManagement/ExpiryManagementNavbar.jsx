  /* Mohini_ExpiryManagement_Navbar_7/10/2024*/
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ExpiryManagementNavbar.css';

const ExpiryManagementNavbar = () => {
  const location = useLocation(); // Get the current route location

  return (
    <nav className="expiry-management-navbar">
      <ul className="expiry-management-navbar-list">
        <li className="expiry-management-navbar-item">
          <Link 
            to="/drug-registration" 
            className={`expiry-management-navbar-link ${location.pathname === '/drug-registration' ? 'active' : ''}`}
          >
            Drug Registration
          </Link>
        </li>
        {/* <li className="expiry-management-navbar-item">
          <Link 
            to="/drug-inventory" 
            className={`expiry-management-navbar-link ${location.pathname === '/drug-inventory' ? 'active' : ''}`}
          >
            Drug Inventory
          </Link>
        </li> */}
        <li className="expiry-management-navbar-item">
          <Link 
            to="/expiry-notification" 
            className={`expiry-management-navbar-link ${location.pathname === '/expiry-notification' ? 'active' : ''}`}
          >
            Expiry Notification
          </Link>
        </li>
        {/* <li className="expiry-management-navbar-item">
          <Link 
            to="/expiry-report" 
            className={`expiry-management-navbar-link ${location.pathname === '/expiry-report' ? 'active' : ''}`}
          >
            Expiry Report
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default ExpiryManagementNavbar;
  /* Mohini_ExpiryManagement_Navbar_7/10/2024*/