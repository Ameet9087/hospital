  /* Mohini_Endoscopy_18-10-24 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './EndoscopyNavbar.css'; 

const EndoscopyNavbar = () => {
  const location = useLocation(); 

  return (
    <nav className="endoscopy-navbar">
      <ul>
        <li>
          <Link 
            to="/procedure-scheduling" 
            className={`endoscopy-header-button ${location.pathname === '/procedure-scheduling' ? 'active' : ''}`}
          >
            Procedure Scheduling
          </Link>
        </li>
        <li>
          <Link 
            to="/endoscope-inventory" 
            className={`endoscopy-header-button ${location.pathname === '/endoscope-inventory' ? 'active' : ''}`}
          >
            Endoscope Inventory
          </Link>
        </li>
        {/* <li>
          <Link 
            to="/imaging-reports" 
            className={`endoscopy-header-button ${location.pathname === '/imaging-reports' ? 'active' : ''}`}
          >
            Imaging & Reports
          </Link>
        </li> */}
        <li>
          <Link 
            to="/sterilization-tracking" 
            className={`endoscopy-header-button ${location.pathname === '/sterilization-tracking' ? 'active' : ''}`}
          >
            Sterilization Tracking
          </Link>
        </li>
        <li>
          <Link 
            to="/post-procedure-doc" 
            className={`endoscopy-header-button ${location.pathname === '/post-procedure-doc' ? 'active' : ''}`}
          >
            Post-Procedure Documentation
          </Link>
        </li>
        {/* <li>
          <Link 
            to="/patient-search-report" 
            className={`endoscopy-header-button ${location.pathname === '/patient-search-report' ? 'active' : ''}`}
          >
            Patient Search Reports
          </Link>
        </li> */}
        <li>
          <Link 
            to="/patient-report-result" 
            className={`endoscopy-header-button ${location.pathname === '/patient-report-result' ? 'active' : ''}`}
          >
            Patient Reports 
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default EndoscopyNavbar;
  /* Mohini_Endoscopy_18-10-24 */