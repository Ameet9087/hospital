import React from 'react';
import './HomePage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

// Import React Icons from FontAwesome
import { FaUserCog, FaUserTie, FaUserMd, FaUserInjured } from 'react-icons/fa';

const LoginHomePage = () => {
  const navigate = useNavigate();

  // Function to handle navigation with login type
  const handleLoginNavigation = (loginType) => {
    navigate('/Dr_Login', { state: { loginType } }); // Pass the login type to the DrLogin page
  };

  return (
    <div className="login-page">
      {/* Logo Section */}
      <div className="logo-container">
        <h1 className="logo">Hospital Management & Information System</h1> {/* Replace with your styled logo */}
      </div>

      {/* Header Section */}
      <div className="login-header">
        <h2>Login as</h2>
      </div>

      {/* Login Options Section */}
      <div className="login-options">
        <div className="login-option">
          <button className="login-button admin" onClick={() => handleLoginNavigation('Admin')}>
            <FaUserCog className="button-icon" /> {/* React Icon for Admin */}
            <span className="button-label">Employee</span>
          </button>
        </div>
        <div className="login-option">
          <button className="login-button receptionist" onClick={() => handleLoginNavigation('Vendor')}>
            <FaUserTie className="button-icon" /> {/* React Icon for Receptionist */}
            <span className="button-label">Vendor</span>
          </button>
        </div>
        <div className="login-option">
          <button className="login-button doctor" onClick={() => handleLoginNavigation('Doctor')}>
            <FaUserMd className="button-icon" /> {/* React Icon for Doctor */}
            <span className="button-label">Doctor</span>
          </button>
        </div>
        <div className="login-option">
          <button className="login-button doctor" onClick={() => handleLoginNavigation('Patient')}>
            <FaUserInjured className="button-icon" /> {/* React Icon for Patient */}
            <span className="button-label">Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginHomePage;
