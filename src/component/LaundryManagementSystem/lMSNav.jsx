import React from "react";
import { NavLink } from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import "./lMSNav.css";

const LMSNavBar = () => {
  return (
    <nav className="lMSNav-bar">
      <ul>
        <li>
          <NavLink to="/laundry/master">Master</NavLink>
        </li>

        <li>
          <NavLink to="/laundry/transaction">Transaction</NavLink>
        </li>
        {/* <li>
          <NavLink to="/settings">Reports</NavLink>
        </li> */}


      </ul>
    </nav>
  );
};

export default LMSNavBar;