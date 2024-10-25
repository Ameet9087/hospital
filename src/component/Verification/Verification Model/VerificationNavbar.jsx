/* Mohini_Verification Model_VerificationNavbar_14/10/24 */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './VerificationNavbar.css'; // Link to the CSS file

const VerificationNavbar = ({ onNavClick }) => {
  const [activeNav, setActiveNav] = useState(null);
  const [activeSubNav, setActiveSubNav] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Determine the active navigation and sub-navigation based on the current route
    if (location.pathname.includes('/employee-verification')) {
      setActiveNav('document-verification');
      setActiveSubNav('EmployeeVerification');
    } else if (location.pathname.includes('/patient-verification')) {
      setActiveNav('document-verification');
      setActiveSubNav('PatientVerification');
    } else if (location.pathname.includes('/employee-identity-verification')) {
      setActiveNav('identity-verification');
      setActiveSubNav('EmployeeIdentityVerification');
    } else if (location.pathname.includes('/patient-identity-verification')) {
      setActiveNav('identity-verification');
      setActiveSubNav('PatientIdentityVerification');
    } else if (location.pathname.includes('/employee-insurance-verification')) {
      setActiveNav('insurance');
      setActiveSubNav('EmployeeVerification');
    } else if (location.pathname.includes('/patient-insurance-verification')) {
      setActiveNav('insurance');
      setActiveSubNav('PatientVerification');
    }
  }, [location]);

  const handleNavClick = (navType) => {
    setActiveNav((prevNav) => (prevNav === navType ? null : navType));
    setActiveSubNav(null); // Reset sub-nav on nav change
  };

  const handleSubNavClick = (navItem) => {
    onNavClick(navItem);
    setActiveSubNav(navItem);
  };

  return (
    <>
      <header className="verification-header">
        <nav>
          <ul className="verification-header-form">
            <li
              className={`verification-nav-item ${
                activeNav === 'document-verification' ? 'active' : ''
              }`}
              onClick={() => handleNavClick('document-verification')}
            >
              Document & Employment Verification
            </li>
            <li
              className={`verification-nav-item ${
                activeNav === 'identity-verification' ? 'active' : ''
              }`}
              onClick={() => handleNavClick('identity-verification')}
            >
              Identity Verification
            </li>
            <li
              className={`verification-nav-item ${
                activeNav === 'insurance' ? 'active' : ''
              }`}
              onClick={() => handleNavClick('insurance')}
            >
              Insurance Verification
            </li>
          </ul>
        </nav>
      </header>

      {activeNav === 'document-verification' && (
        <div className="verification-sub-nav">
          <ul>
            <li
              className={`sub-nav-item ${
                activeSubNav === 'EmployeeVerification' ? 'active' : ''
              }`}
            >
              <Link
                to="/employee-verification"
                onClick={() => handleSubNavClick('EmployeeVerification')}
              >
                Employee Verification
              </Link>
            </li>
            <li
              className={`sub-nav-item ${
                activeSubNav === 'PatientVerification' ? 'active' : ''
              }`}
            >
              <Link
                to="/patient-verification"
                onClick={() => handleSubNavClick('PatientVerification')}
              >
                Patient Verification
              </Link>
            </li>
          </ul>
        </div>
      )}

      {activeNav === 'identity-verification' && (
        <div className="verification-sub-nav">
          <ul>
            <li
              className={`sub-nav-item ${
                activeSubNav === 'EmployeeIdentityVerification' ? 'active' : ''
              }`}
            >
              <Link
                to="/employee-identity-verification"
                onClick={() => handleSubNavClick('EmployeeIdentityVerification')}
              >
                Employee Identity Verification
              </Link>
            </li>
            <li
              className={`sub-nav-item ${
                activeSubNav === 'PatientIdentityVerification' ? 'active' : ''
              }`}
            >
              <Link
                to="/patient-identity-verification"
                onClick={() => handleSubNavClick('PatientIdentityVerification')}
              >
                Patient Identity Verification
              </Link>
            </li>
          </ul>
        </div>
      )}

      {activeNav === 'insurance' && (
        <div className="verification-sub-nav">
          <ul>
            <li
              className={`sub-nav-item ${
                activeSubNav === 'EmployeeVerification' ? 'active' : ''
              }`}
            >
              <Link
                to="/employee-insurance-verification"
                onClick={() => handleSubNavClick('EmployeeVerification')}
              >
                Employee Insurance Verification
              </Link>
            </li>
            <li
              className={`sub-nav-item ${
                activeSubNav === 'PatientVerification' ? 'active' : ''
              }`}
            >
              <Link
                to="/patient-insurance-verification"
                onClick={() => handleSubNavClick('PatientVerification')}
              >
                Patient Insurance Verification
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default VerificationNavbar;
/* Mohini_Verification Model_VerificationNavbar_14/10/24 */
