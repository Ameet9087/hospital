import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="inventory-navbar">
      <button
        className={`inventory-home-button ${isActive('/') ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        ⌂
      </button>
      <div className="inventory-nav-links">
        <button
          className={isActive('/internal') ? 'active' : ''}
          onClick={() => navigate('/internal')}
        >
          Internal
        </button>
        <button
          className={isActive('/stock') ? 'active' : ''}
          onClick={() => navigate('/stock')}
        >
          Stock
        </button>
        <button
          className={isActive('/reports') ? 'active' : ''}
          onClick={() => navigate('/reports')}
        >
          Reports
        </button>
        <button
          className={isActive('/return-to-vendor') ? 'active' : ''}
          onClick={() => navigate('/return-to-vendor')}
        >
          Return To Vendor
        </button>


        <button
          className={isActive('/drug-registration') ? 'active' : ''}
          onClick={() => navigate('/drug-registration')}
        >
          Drug Registration
        </button>
   
        <button
          className={isActive('/expiry-notification') ? 'active' : ''}
          onClick={() => navigate('/expiry-notification')}
        >
          Drug Registration
        </button>


      </div>
      <div className="inventory-active-inventory">
        Active Inventory: GENERAL-INVENTORY <span className="inventory-arrow">➔</span>
      </div>
    </nav>
  );
};

export default Navbar;
