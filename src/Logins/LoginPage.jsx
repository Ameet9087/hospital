import React, { useState } from 'react';
import './LoginPage.css';
import { FaUserMd, FaUserCog, FaUserTie, FaUserInjured } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation from react-router-dom

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate to redirect after successful login
  const location = useLocation(); // Get the location object
  const loginType = location.state?.loginType || 'Doctor'; // Get login type from state or default to 'Doctor'

  // Determine the icon and text based on the login type
  const getLoginDetails = () => {
    switch (loginType) {
      case 'Admin':
        return { icon: <FaUserCog style={{ marginRight: '8px', fontSize: '70px' }} />, title: 'Employee Login' };
      case 'Vendor':
        return { icon: <FaUserTie style={{ marginRight: '8px', fontSize: '70px' }} />, title: 'Vendor Login' };
      case 'Patient':
        return { icon: <FaUserInjured style={{ marginRight: '8px', fontSize: '70px' }} />, title: 'Patient Login' };
      default:
        return { icon: <FaUserMd style={{ marginRight: '8px', fontSize: '70px' }} />, title: 'Doctor Login' };
    }
  };

  const { icon, title } = getLoginDetails(); // Get icon and title based on login type

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make an API request with the entered credentials
      const response = await fetch('http://192.168.1.40:1415/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const data = await response.json(); // Convert the response to JSON

      if (response.ok) {
        // If the login is successful, redirect to the next page
        navigate('/'); // Replace with the path to your next page
      } else {
        // If login fails, set the error message
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-slogan-container">
        <div className="loginpage_advicecontainer">
          <h2 className="login-slogan-container-h2">Expert advice from top doctors</h2>
          <ul className="login-slogan-container-ul">
            <li className="login-slogan-container-li">Expert advice from top doctors.</li>
            <li className="login-slogan-container-li">Available 24/7 on any device.</li>
            <li className="login-slogan-container-li">Private questions answered within 24 hrs.</li>
          </ul>
        </div>
      </div>
      <div className="login-box">
        <div className="login_middlecontainer">
          <span className="login-toggle-option">
            {icon} {/* Use dynamic icon based on login type */}
          </span>
          <h2 className="login-box-h2">{title}</h2> {/* Use dynamic title based on login type */}
          <form className="login-box-form" onSubmit={handleSubmit}>
            <input
              className="login-box-input"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="login-box-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign in</button>
          </form>
          {error && <p className="error-message">{error}</p>} {/* Display error messages */}
          <p>
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
