/* Mohini_PediatricNavbar_WholePage_3/oct/24 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PediatricNavbar.css';

const PediatricNavbar = () => {
  const location = useLocation(); // Get the current route location

  return (
    <nav className="pediatric-navbar">
      <ul>
        {/* <li>
          <Link
            to="/registration-form"
            className={`pediatric-nav-button ${location.pathname === '/registration-form' ? 'active' : ''}`}
          >
            Patient Registration
          </Link>
        </li> */}
        <li>
          <Link
            to="/patient-history-form"
            className={`pediatric-nav-button ${location.pathname === '/patient-history-form' ? 'active' : ''}`}
          >
            Patient History Form
          </Link>
        </li>
        <li>
          <Link
            to="/admission-form"
            className={`pediatric-nav-button ${location.pathname === '/admission-form' ? 'active' : ''}`}
          >
             Admission Form
          </Link>
        </li>
        <li>
          <Link
            to="/paediatric-vitals-examination-Form"
            className={`pediatric-nav-button ${location.pathname === '/paediatric-vitals-examination-Form' ? 'active' : ''}`}
          >
           Paediatric VitalsExamination Form
          </Link>
        </li>
        <li>
          <Link
            to="/paediatric-treatment-plan-form"
            className={`pediatric-nav-button ${location.pathname === '/paediatric-treatment-plan-form' ? 'active' : ''}`}
          >
            Paediatric TreatmentPlan Form
          </Link>
        </li>
        <li>
          <Link
            to="/nursing-care-plan-form"
            className={`pediatric-nav-button ${location.pathname === '/nursing-care-plan-form' ? 'active' : ''}`}
          >
            Nursing CarePlanForm
          </Link>
        </li>
        <li>
          <Link
            to="/paediatric-progress-notes-form"
            className={`pediatric-nav-button ${location.pathname === '/paediatric-progress-notes-form' ? 'active' : ''}`}
          >
            Paediatric ProgressNotes Form
          </Link>
        </li>
        <li>
          <Link
            to="/discharge"
            className={`pediatric-nav-button ${location.pathname === '/discharge' ? 'active' : ''}`}
          >
            Discharge Summary
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric-immunization-form"
            className={`pediatric-nav-button ${location.pathname === '/pediatric-immunization-form' ? 'active' : ''}`}
          >
          Pediatric Immunization Form
          </Link>
        </li>
       
        <li>
          <Link
            to="/nutrition"
            className={`pediatric-nav-button ${location.pathname === '/nutrition' ? 'active' : ''}`}
          >
            Nutrition Form
          </Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default PediatricNavbar;
/* Mohini_PediatricNavbar_WholePage_3/oct/24 */
