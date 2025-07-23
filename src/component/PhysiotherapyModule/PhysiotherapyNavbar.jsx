/* Mohini_PhysiotherapyModule_PhysiotherapyNavbar_30/sep/24 */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import './PhysiotherapyNavbar.css'; // Import your CSS file

const PhysiotherapyNavbar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="physiotherapy-navbar">
     
      <Link 
        to="/physiotherapy/sessionform" 
        className={`physiotherapy-navbar-button ${location.pathname === '/physiotherapy/sessionform' ? 'active' : ''}`}
      >
        Session Form
      </Link>
      <Link 
        to="/physiotherapy/sessionlist" 
        className={`physiotherapy-navbar-button ${location.pathname === '/physiotherapy/sessionlist' ? 'active' : ''}`}
      >
        Session List
      </Link>
    </div>
  );
};

export default PhysiotherapyNavbar;
/* Mohini_PhysiotherapyModule_PhysiotherapyNavbar_30/sep/24 */
