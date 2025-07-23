import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './OphthaNavbar.css';

const OphthaNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="Ophtha-navbar">
      <div className="Ophtha-nav-links">
        <button
          className={isActive('/internal') ? 'active' : ''}
          onClick={() => navigate('/ortho-inpatient')}
        >
          Inpatient
        </button>
        <button
          className={isActive('/stock') ? 'active' : ''}
          onClick={() => navigate('/ortho-outpatient')}
        >
          Outpatient
        </button>
      </div>
    </nav>
  );
};

export default OphthaNavbar;
