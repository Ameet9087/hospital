/* // neha-ADT-header-19/09/24 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css'; // Add your CSS styles here

const Navbar = ({ handleNavigation }) => {
  const location = useLocation(); // Access the current route

  return (
    <header className="admission-header">
      <div className="logo">
        <Link to="/"><i className="fa-solid fa-house-chimney" ></i></Link>
      </div>
      <nav className="nav-links">
        <Link
          to="/adt/searchpatient"
          className={`adt-header-button ${location.pathname === '/adt/searchpatient' ? 'active' : ''}`}

        >
          Search Patient
        </Link>
        <Link
          to="/adt/admittedpatients"
          className={`adt-header-button ${location.pathname === '/adt/admittedpatients' ? 'active' : ''}`}

        >
          Admitted Patients
        </Link>
        <Link
          to="/adt/dischargedpatients"
          className={`adt-header-button ${location.pathname === '/adt/dischargedpatients' ? 'active' : ''}`}

        >
          Discharged Patients
        </Link>
        <Link
          to="/adt/exchangebed"
          className={`adt-header-button ${location.pathname === '/adt/exchangebed' ? 'active' : ''}`}

        >
          Exchange Bed
        </Link>
        <Link
          to="/adt/cancelbedreservation"
          className={`adt-header-button ${location.pathname === '/adt/cancelbedreservation' ? 'active' : ''}`}

        >
          Cancel Bed Reservation
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
