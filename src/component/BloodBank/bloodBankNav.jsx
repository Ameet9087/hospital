import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { RiTeamFill } from "react-icons/ri";
import "../BloodBank/bloodBankNav.css";

const BloodBankNavBar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogOut = () => {
    console.log("hellloooooo")
    // navigate("/dispenCouter");
  };

  return (
    <nav className="bloodBank-Navigation-bar">
      <ul>
        <div className='disPrescription-Navbttn-N-act'>
          <li><NavLink to="/bloodbank/blooddonationregistration">Blood Donation Registration</NavLink></li>
          <li><NavLink to="/bloodbank/bloodcollection">Blood Collection</NavLink></li>
          <li><NavLink to="/bloodbank/bloodtestingandscreening">Blood Testing and Screening</NavLink></li>
          <li><NavLink to="/bloodbank/bloodstorage">Blood Storage</NavLink></li>
          <li><NavLink to="/bloodbank/bloodrequest">Blood Request</NavLink></li>
          <li><NavLink to="/bloodbank/bloodissues">Blood Issues</NavLink></li>
          {/* <li><NavLink to="/">Inventory and Stock Management</NavLink></li> */}
          {/* <li><NavLink to="/bloodbank/reports">Reports</NavLink></li> */}
        </div>
        <div className='bloodBank-Activebtn-N-LogOut'>
          {/* <button className='activebloodBank-btn'>Active Blood Bank: Main-Blood Bank</button> */}
          {/* <button className='bloodBank-LogOut' onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button> */}
        </div>
      </ul>
    </nav>
  );
}

export default BloodBankNavBar;
