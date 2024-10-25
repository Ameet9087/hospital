import React from "react";

import { NavLink, useLocation } from "react-router-dom";
import './MaternityHeader.css';

const MaternityHeader = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className="maternity-header">

      <NavLink 
        to="/maternity-list" 
        className={`maternity-header-button ${location.pathname === '/maternity-list' ? 'active' : ''}`}
      >
        Maternity List
      </NavLink>
      <NavLink 
        to="/patient-form" 
        className={`maternity-header-button ${location.pathname === '/patient-form' ? 'active' : ''}`}
      >
        Payments

      </NavLink>
      <NavLink 
        to="/reports" 
        className={`maternity-header-button ${location.pathname.startsWith('/reports') ? 'active' : ''}`}
      >
        Reports

      </NavLink>

                        <NavLink to="/AntenatalCare" className={`maternity-header-button ${location.pathname.startsWith('/reports') ? 'active' : ''}`} activeClassName="active">Antenatal Care</NavLink>
                 
                  
                        <NavLink to="/PostnatalCare" className={`maternity-header-button ${location.pathname.startsWith('/reports') ? 'active' : ''}`} activeClassName="active">Postnatal Care</NavLink>
                    
                
                        <NavLink to="/Labourmgnt" className={`maternity-header-button ${location.pathname.startsWith('/reports') ? 'active' : ''}`} activeClassName="active">Labor Room Management</NavLink>
               
                   
                        <NavLink to="/BreastfeedingSupport" className={`maternity-header-button ${location.pathname.startsWith('/reports') ? 'active' : ''}`} activeClassName="active">Breastfeeding Support</NavLink>
               
                        <NavLink to="/FamilyPlanningService" className={`maternity-header-button ${location.pathname.startsWith('/reports') ? 'active' : ''}`} activeClassName="active">Family Planning Service</NavLink>
                  
    </div>
  );
};

export default MaternityHeader;
