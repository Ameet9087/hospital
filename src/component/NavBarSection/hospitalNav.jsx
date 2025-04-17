import React from "react";
import { NavLink } from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import "./hospitalNav.css";

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        {/* <li>
          <NavLink to="notification">Notification</NavLink>
        </li> */}
        {/* <li>
          <NavLink to="opdbilling">OPD Billing</NavLink>
        </li> */}
        {/* <li>
          <NavLink to="Home">
            <i className="fa-solid fa-house-chimney"></i>
          </NavLink>
        </li> */}
        <li>
          <NavLink to="samplecollection">Sample Collection</NavLink>
        </li>
        <li>
          <NavLink to="uncollectsample">Uncollect Sample</NavLink>
        </li>
        <li>
          <NavLink to="rejectsample">Reject Sample</NavLink>
        </li>
        <li>
          <NavLink to="samplerecieve">Sample Recieving</NavLink>
        </li>
        <li>
          <NavLink to="addresults">Add Results</NavLink>
        </li>
        <li>
          <NavLink to="pendingreports">Pending Reports</NavLink>
        </li>
        <li>
          <NavLink to="finalreports">Final Reports</NavLink>
        </li>
        <li>
          <NavLink to="rejectedreports">Rejected Reports</NavLink>
        </li>
        <li>
          <NavLink to="settings">Settings</NavLink>
        </li>
        {/* <li>
          <NavLink to="/ward-billing">Ward Billing</NavLink>
        </li> */}
        {/* <li><NavLink to="/external-labs">External Labs</NavLink></li> */}
        {/* <li><NavLink to="/report-dispatch">Report Dispatch</NavLink></li> */}
        {/* <li><NavLink to="/lis">LIS</NavLink></li> */}
        {/* <li><NavLink to="/lis">Active lab:op-lab</NavLink></li> */}
        {/* <button className="activeLab-btn">Active lab:op-lab</button> */}
      </ul>
    </nav>
  );
};

export default NavigationBar;
