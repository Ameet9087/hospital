// /* // neha-utilities-navbar-19-9-24*/
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './utilitiesmain.css';

const UtilitiesNavbar = ({ handleNavigation }) => {
  const location = useLocation();
  return (
    <header className="utlt-header">
      <nav className="utlt-nav-links">
        <Link
          to="/utilites/schemerefundlist"
          className={`utlt-header-button ${location.pathname === '/utilities/schemerefundlist' ? 'active' : ''}`}
        >
          Scheme Refund List
        </Link>
        <Link
          to="/utilites/changevisitscheme"
          className={`utlt-header-button ${location.pathname === '/utilities/changevisitscheme' ? 'active' : ''}`}
        >
          Change Visit Scheme
        </Link>
        <Link
          to="/utilites/changebillingcounter"
          className={`utlt-header-button ${location.pathname === '/utilities/changebillingcounter' ? 'active' : ''}`}
        >
          Change Billing Counter
        </Link>
        <Link
          to="/utilites/organizationdeposit"
          className={`utlt-header-button ${location.pathname === '/utilities/organizationdeposit' ? 'active' : ''}`}
        >
          Organization Deposit
        </Link>
      </nav>
    </header>
  );
};

export default UtilitiesNavbar;
