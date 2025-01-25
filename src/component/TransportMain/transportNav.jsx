/* Ajhar Tamboli transportNavBar.jsx 25-09-24 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { RiTeamFill } from "react-icons/ri";
import "./transportNav.css";

const TransportNavBar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogOut = () => {
    console.log("hellloooooo");
    // navigate("/dispenCouter");
  };

  return (
    <nav className="transportNavBar-Navigation-bar">
      <ul>
        <div className="disPrescription-Navbttn-N-act">
          {/* NavLink with active class */}
          <li>
            <NavLink 
              to="/transport/patienttransport" 
              className={({ isActive }) => 
                isActive ? "transportNavBar-active-tab" : ""}
            >
              Patient Transport
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/transport/ambulance" 
              className={({ isActive }) => 
                isActive ? "transportNavBar-active-tab" : ""}
            >
              Ambulance
            </NavLink>
          </li>
          {/* <li>
            <NavLink 
              to="/transport/stafftransport" 
              className={({ isActive }) => 
                isActive ? "transportNavBar-active-tab" : ""}
            >
              Staff Transport
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink 
              to="/transport/transportrequest" 
              className={({ isActive }) => 
                isActive ? "transportNavBar-active-tab" : ""}
            >
              Transport Request
            </NavLink>
          </li> */}
          <li>
            <NavLink 
              to="/transport/vehiclemaintenance" 
              className={({ isActive }) => 
                isActive ? "transportNavBar-active-tab" : ""}
            >
            Add Vehicle and Maintenance
            </NavLink>
          </li>
          {/* <li>
            <NavLink 
              to="/transport/emergencytransport" 
              className={({ isActive }) => 
                isActive ? "transportNavBar-active-tab" : ""}
            >
              Emergency Transport
            </NavLink>
          </li> */}
        </div>

        {/* Logout button */}
        <div className="transportNavBar-Activebtn-N-LogOut">
          <button className="transportNavBar-LogOut" onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default TransportNavBar;
