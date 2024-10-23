import React from "react";
import { NavLink } from "react-router-dom";
import './MaternityHeader.css';

const MaternityHeader = () => {
  return (
    <div className="maternity-header-module">
      <nav className="maternity-navbar">
        <ul>
          <li>
            <NavLink 
              to="/maternity-list" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Maternity List
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/patient-form" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Payments
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/reports" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/AntenatalCare" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Antenatal Care
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/PostnatalCare" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Postnatal Care
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/Labourmgnt" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Labor Room Management
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/BreastfeedingSupport" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Breastfeeding Support
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/FamilyPlanningService" 
              className={({ isActive }) => 
                isActive ? "maternity-header-button active" : "maternity-header-button"
              }
            >
              Family Planning Service
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MaternityHeader;
