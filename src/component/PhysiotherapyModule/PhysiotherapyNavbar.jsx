/* Mohini_PhysiotherapyModule_PhysiotherapyNavbar_30/sep/24 */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import './PhysiotherapyNavbar.css'; // Import your CSS file

const PhysiotherapyNavbar = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="physiotherapy-navbar">
     
      <Link 
        to="/physiotherapy-session-form" 
        className={`physiotherapy-navbar-button ${location.pathname === '/physiotherapy-session-form' ? 'active' : ''}`}
      >
        Session Form
      </Link>
      <Link 
        to="/physiotherapy-session-list" 
        className={`physiotherapy-navbar-button ${location.pathname === '/physiotherapy-session-list' ? 'active' : ''}`}
      >
        Session List
      </Link>
    </div>
  );
};

export default PhysiotherapyNavbar;
/* Mohini_PhysiotherapyModule_PhysiotherapyNavbar_30/sep/24 */
