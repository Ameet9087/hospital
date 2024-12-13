import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiTeamFill } from "react-icons/ri";
import "../HelpD/helpDeskNav.css"

const HelpDeskNav = () => {
  return (
    <nav className="helpDeskNav-bar">
      <ul>
        <li><NavLink to="/helpdesk/employeeinformation">Employee Information</NavLink></li>
        <li><NavLink to="/helpdesk/bedinformation">Bed Information</NavLink></li>
        <li><NavLink to="/helpdesk/wardinformation">Ward Information</NavLink></li>
        <li><NavLink to="/helpdesk/queueinformation">Queue Information</NavLink></li>
        </ul>
    </nav>
  );
}

export default HelpDeskNav;
