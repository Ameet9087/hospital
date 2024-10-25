import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiTeamFill } from "react-icons/ri";
import "../IncentiveMain/incentiveNavBar.css"

const IncentiveNavBar = () => {
  return (
    <nav className="incentiveNavBar-Navigation-bar">
      <ul>
        <div className='incentiveNavBar-Navbttn-N-act'>
        <li><NavLink to="incentiveTransaction">Transaction</NavLink></li>
        <li><NavLink to="/incentiveReport"> Reports</NavLink></li>
        <li><NavLink to="/insentiveSettings"> Setting</NavLink></li>

        <li><NavLink to="incentiveTransaction">Transaction</NavLink></li>


        </div>
        <div className='incentiveNavBar-Activebtn-N-LogOut'>
        <button className='activeincentiveNavBar-btn'>Active Incentive:Main-Incentive</button>
        <button className='incentiveNavBar-LogOut'><i className="fa-solid fa-right-from-bracket"></i>
        </button>
        </div>
      </ul>
    </nav>
  );
}

export default IncentiveNavBar;
