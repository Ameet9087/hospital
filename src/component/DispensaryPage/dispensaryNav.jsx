import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { RiTeamFill } from "react-icons/ri";
import "../DispensaryPage/dispensaryNav.css";

const DispensaryNavBar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogOut = () => {
    console.log("hellloooooo")
    // Logic for logging out (if any) can be placed here
    // Then navigate to the DispenSales route
    navigate("/dispenCouter");
  };

  return (
    <nav className="dispensary-Navigation-bar">
      <ul>
        <div className='disPrescription-Navbttn-N-act'>
          <li><NavLink to="/dispensary/disPrescription">Prescription</NavLink></li>
          <li><NavLink to="/dispensary/dispenSales">Sale</NavLink></li>
          <li><NavLink to="/dispensary/salesStockDetails">Stock</NavLink></li>
          <li><NavLink to="/dispensary/dispenCouter">Counter</NavLink></li>
          <li><NavLink to="/dispensary/dispenReportList">Reports</NavLink></li>
          {/* <li><NavLink to="/dispenPatientConsump">Patient Consumption</NavLink></li> */}
          <li><NavLink to="/dispensary/dispenPatientConsumption">Patient Consumption</NavLink></li>
        </div>
        <div className='dispensary-Activebtn-N-LogOut'>
          <button className='activeDispensary-btn'>Active Dispensary: Main-Dispensary</button>
          <button className='dispensary-LogOut' onClick={handleLogOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </ul>
    </nav>
  );
}

export default DispensaryNavBar;
