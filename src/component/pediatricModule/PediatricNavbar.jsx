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
            to="/pediatric/inpatient/patient-history-form"
            className={`pediatric-nav-button ${location.pathname === '/patient-history-form' ? 'active' : ''}`}
          >
            Patient History Form
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric/inpatient/admission-form"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/admission-form' ? 'active' : ''}`}
          >
             Admission Form
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric/inpatient/paediatric-vitals-examination-Form"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/paediatric-vitals-examination-Form' ? 'active' : ''}`}
          >
           Paediatric VitalsExamination Form
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric/inpatient/paediatric-treatment-plan-form"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/paediatric-treatment-plan-form' ? 'active' : ''}`}
          >
            Paediatric TreatmentPlan Form
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric/inpatient/nursing-care-plan-form"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/nursing-care-plan-form' ? 'active' : ''}`}
          >
            Nursing CarePlanForm
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric/inpatient/paediatric-progress-notes-form"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/paediatric-progress-notes-form' ? 'active' : ''}`}
          >
            Paediatric ProgressNotes Form
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric/inpatient/discharge"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/discharge' ? 'active' : ''}`}
          >
            Discharge Summary
          </Link>
        </li>
        <li>
          <Link
            to="/pediatric/inpatient/pediatric-immunization-form"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/pediatric-immunization-form' ? 'active' : ''}`}
          >
          Pediatric Immunization Form
          </Link>
        </li>
       
        <li>
          <Link
            to="/pediatric/inpatient/nutrition"
            className={`pediatric-nav-button ${location.pathname === '/pediatric/inpatient/nutrition' ? 'active' : ''}`}
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
