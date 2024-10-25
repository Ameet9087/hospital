import React from 'react';
import Addnewbook from './addnewbook';
import Schedulinglist from './schedulinglist';
import { NavLink, Routes, Route } from 'react-router-dom'; // Use NavLink for active class support
import './Sugeryscheduling.css'; // Import the CSS file for styling

function Sugeryscheduling() {
  return (
    <div>
      <header>
        <nav className="oprationtheator-schedullist-navbar">
          <NavLink to="/addnewpatient" className="oprationtheator-schedullist-nav-link" activeClassName="active">
            <li>Add New Book</li>
          </NavLink>
          <NavLink to="/schedullist" className="oprationtheator-schedullist-nav-link" activeClassName="active">
            <li>Schedule List</li>
          </NavLink>
        </nav>
      </header>
      <div>
        <Routes>
          <Route path="/addnewpatient" element={<Addnewbook />} />
          <Route path="/schedullist" element={<Schedulinglist />} />
        </Routes>
      </div>
    </div>
  );
}

export default Sugeryscheduling;
