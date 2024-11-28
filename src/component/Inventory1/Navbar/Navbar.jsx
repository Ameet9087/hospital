import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="inventory-navbar">
      <NavLink
        to="/"
        className={({ isActive }) => `inventory-home-button ${isActive ? 'active' : ''}`}
      >
        ⌂
      </NavLink>
      <div className="inventory-nav-links">
        <NavLink
          to="/inventory/internal"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Internal
        </NavLink>
        <NavLink
          to="/inventory/stock"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Stock
        </NavLink>
        <NavLink
          to="/inventory/reports"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Reports
        </NavLink>
        <NavLink
          to="/inventory/returntovendor"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Return To Vendor
        </NavLink>
        <NavLink
          to="/inventory/drugregistration"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Drug Registration
        </NavLink>
        <NavLink
          to="/inventory/expirynotification"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Expiry Notification
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
