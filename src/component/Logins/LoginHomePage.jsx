import React from "react";
import "./HomePage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

// Import React Icons from FontAwesome
import { FaUserCog, FaUserTie, FaUserMd, FaUserInjured } from "react-icons/fa";

const LoginHomePage = () => {
  const navigate = useNavigate();

  // Function to handle navigation with login type
  const handleLoginNavigation = (loginType) => {
    navigate("/home/login", { state: { loginType } }); // Ensure this navigation works correctly
  };

  return (
    <div className="login-page">
      <div className="login-page-frame1"></div>
      <div className="login-page-frame2"></div>
      <div className="login-page-frame3"></div>
      <div className="login-page-frame4"></div>
      <div className="logo-container">
        <h1 className="logo">Hospital Management & Information System</h1>
      </div>

      {/* Header Section */}
      <div className="login-header">
        <h2>Login as</h2>
      </div>

      {/* Login Options Section */}
      <div className="login-options">
        <div className="login-option">
          <button
            className="login-button admin"
            onClick={() => handleLoginNavigation("Admin")}
          >
            <FaUserCog className="button-icon" />
            <span className="button-label">Employee</span>
          </button>
        </div>
        <div className="login-option">
          <button
            className="login-button receptionist"
            onClick={() => handleLoginNavigation("Super User")}
          >
            <FaUserTie className="button-icon" />
            <span className="button-label">Super User</span>
          </button>
        </div>
        <div className="login-option">
          <button
            className="login-button doctor"
            onClick={() => handleLoginNavigation("Doctor")}
          >
            <FaUserMd className="button-icon" />
            <span className="button-label">Doctor</span>
          </button>
        </div>
        <div className="login-option">
          <button
            className="login-button doctor"
            onClick={() => handleLoginNavigation("Patient")}
          >
            <FaUserInjured className="button-icon" />
            <span className="button-label">Patient</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginHomePage;
