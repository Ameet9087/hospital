/* Ajhar Tamboli radiologyNav.css 19-09-24 */

import React from "react";
import { NavLink } from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import "./RadiologyNavBar.css";
// import './hospitalNav.css';

const RadiologyNavBar = () => {
  return (
    <nav className="radiologyNav-bar">
      <ul>
        <li>
          <NavLink to="/radiology/listrequests">List Requests</NavLink>
        </li>
        <li>
          <NavLink to="/radiology/listreports">List Reports</NavLink>
        </li>
        <li>
          <NavLink to="/radiology/editdoctors">Edit Doctors</NavLink>
        </li>
        <li>
          <NavLink to="/radiology/opdbilling">OPD Billing</NavLink>
        </li>
        {/* <li><NavLink to="/rDLWardBilling">Ward Billing</NavLink></li> */}
      </ul>
    </nav>
  );
};

export default RadiologyNavBar;
