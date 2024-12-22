// neha-OT-OT-navbar-14-9-24
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './otmain.css';

const Navbar = ({ handleNavigation }) => {

  const location = useLocation();

  return (
    <header className="ot_setting-header">
      <nav className="ot_setting-nav-links">

        <Link
          to="/operationtheater/bookinglist"
          className={`ot_setting-header-button ${location.pathname === '/operationtheater/bookinglist' ? 'active' : ''}`}

        >
          Booing List
        </Link>
        <Link
          to="/operationtheater/setting"
          className={`ot_setting-header-button ${location.pathname === '/operationtheater/setting' ? 'active' : ''}`}

        >
          Setting
        </Link>

        <Link to="/operationtheater/surgeryscheduling"   className={`ot_setting-header-button ${location.pathname === '/operationtheater/surgeryscheduling' ? 'active' : ''}`}>Surgery Scheduling</Link>


        <Link to='/operationtheater/otresourcemanagement'   className={`ot_setting-header-button ${location.pathname === '/operationtheater/otresourcemanagement' ? 'active' : ''}`}>OT Resource Management</Link>


        <Link to="/operationtheater/surgicalinstrumenttracking"   className={`ot_setting-header-button ${location.pathname === '/operationtheater/surgicalinstrumenttracking' ? 'active' : ''}`}>Surgical Instrument Tracking</Link>


        <Link to="/operationtheater/anesthesiarecordmanagement"   className={`ot_setting-header-button ${location.pathname === '/operationtheater/anesthesiarecordmanagement' ? 'active' : ''}`}>Anesthesia Record Management</Link>


        <Link to="/operationtheater/postsurgerycare"   className={`ot_setting-header-button ${location.pathname === '/operationtheater/postsurgerycare' ? 'active' : ''}`}>Post Surgery Care</Link>
    
      </nav>
    </header>
  );
};

export default Navbar;
