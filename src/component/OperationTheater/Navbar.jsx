import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="ot_setting-header">
      <nav className="ot_setting-nav-links">
        <Link to="/oprationtheater/bookinglist" className={`ot_setting-header-button ${location.pathname === '/' ? 'active' : ''}`}>
          Booking List
        </Link>
        <Link to="/oprationtheater/setting" className={`ot_setting-header-button ${location.pathname === '/setting' ? 'active' : ''}`}>
          Setting
        </Link>
        <Link to="/oprationtheater/surgeryScheduling" className={`ot_setting-header-button ${location.pathname === '/surgeryScheduling' ? 'active' : ''}`}>
          Surgery Scheduling
        </Link>
        <Link to="/oprationtheater/otresourcemanagement" className={`ot_setting-header-button ${location.pathname === '/otresourcemanagement' ? 'active' : ''}`}>
          OT Resource Management
        </Link>
        <Link to="/oprationtheater/surgicaltrack" className={`ot_setting-header-button ${location.pathname === '/surgicaltrack' ? 'active' : ''}`}>
          Surgical Instrument Tracking
        </Link>
        <Link to="/oprationtheater/anesthesiarecordmgnt" className={`ot_setting-header-button ${location.pathname === '/anesthesiarecordmgnt' ? 'active' : ''}`}>
          Anesthesia Record Management
        </Link>
        <Link to="/oprationtheater/postsurgerycare" className={`ot_setting-header-button ${location.pathname === '/postsurgerycare' ? 'active' : ''}`}>
          Post Surgery Care
        </Link>
        <Link to="/oprationtheater/otnursenotes" className={`ot_setting-header-button ${location.pathname === '/otnursenotes' ? 'active' : ''}`}>
          OT Nurse Notes
        </Link>
        {/* <Link to="/ottvsetup" className={`ot_setting-header-button ${location.pathname === '/ottvsetup' ? 'active' : ''}`}>
          OT TV Display Setup
        </Link> */}
        <Link to="/oprationtheater/operationnotes" className={`ot_setting-header-button ${location.pathname === '/operationnotes' ? 'active' : ''}`}>
          Operation Notes
        </Link>
        <Link to="/oprationtheater/postopinstruction" className={`ot_setting-header-button ${location.pathname === '/postopinstruction' ? 'active' : ''}`}>
          Post Op Instruction
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
