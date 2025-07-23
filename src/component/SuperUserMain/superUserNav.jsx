import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { RiTeamFill } from "react-icons/ri";
import "./superUserNav.css";

const SuperUserNavBar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogOut = () => {
    console.log("hellloooooo");
    // navigate("/dispenCouter");
  };

  return (
    <nav className="superUserNav-Navigation-bar">
      <ul>
        <div className="superUserNav-Navbttn-N-act">
          {/* <li>
            <NavLink to="/superuser/revenuemanagement">Revenue Management</NavLink>
          </li> */}
          <li>
            <NavLink to="/superuser/usermanagement">User Management</NavLink>
          </li>
          <li>
            <NavLink to="/superuser/tower">Tower</NavLink>
          </li>
          {/* <li>
            <NavLink to="/superuser/billingdiscountapproval">Billing Discount Approval </NavLink>
          </li>
          <li>
            <NavLink to="/superuser/messagebroadcast">Message Broadcast</NavLink>
          </li>
          <li>
            <NavLink to="/superuser/facilityservices">Facility Services</NavLink>
          </li>
          <li>
            <NavLink to="/superuser/administration">Administration</NavLink>
          </li>
          <li>
            <NavLink to="/superuser/vendorandsupplymanagement">Vendor and Supply Management</NavLink>
          </li>
          <li>
            <NavLink to="/superuser/controlalldepartment">Control All Department</NavLink>
          </li> */}
          {/* <li>
            <NavLink
              to="/patientmgnt"

            // Note: activeClassName is used for react-router-dom v5. For v6, consider using 'isActive'
            >
              Patient Management
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/patientmgnt"

              activeClassName="active" // Note: activeClassName is used for react-router-dom v5. For v6, consider using 'isActive'
            >
              Patient Management
            </NavLink>

          </li>
          <li>
            <NavLink to="/" >User Account Management</NavLink>

          </li>

          <li>
            <NavLink to="/rolemgnt" >Role Management</NavLink>
          </li> */}
        </div>
      </ul>
    </nav>
  );
};

export default SuperUserNavBar;
