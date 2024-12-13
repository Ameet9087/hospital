import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectConsultant.css';
import image from './Image/Dr.Neha.png';

const SelectConsultant = () => {
  const navigate = useNavigate();

  const handleGoClick = () => {
    navigate('/nursing/login-nursing');
  };

  return (
    <div className="select-consultant-container">
      <div className="select-consultant-content">
        {/* Left Side: Image */}
        <div className="select-consultant-left">
          <img
            src={image}
            alt="Doctor Icon"
            className="select-consultant-doctor-icon"
          />
        </div>

        {/* Right Side: Text/Form */}
        <div className="select-consultant-right">
          <h2 className="select-consultant-title">Select Consultant</h2>
          <form className="select-consultant-form">
            <div className="select-consultant-form-row">
              <label className="select-consultant-form-label" htmlFor="doctor">
                Doctor
              </label>
              <select className="select-consultant-form-select" id="doctor">
                <option>Surya</option>
                <option>Dr. Smith</option>
                <option>Dr. John</option>
              </select>
            </div>

            <div className="select-consultant-form-row">
              <label className="select-consultant-form-label" htmlFor="cubicle">
                Cubicle
              </label>
              <select className="select-consultant-form-select" id="cubicle">
                <option>Room 01</option>
                <option>Room 02</option>
                <option>Room 03</option>
              </select>
            </div>

            <div className="select-consultant-form-buttons">
              <button
                type="button"
                className="select-consultant-btn select-consultant-go-btn"
                onClick={handleGoClick}
              >
                Go
              </button>
              <button type="button" className="select-consultant-btn select-consultant-cancel-btn">
                Cancel
              </button>
              <button type="button" className="select-consultant-btn select-consultant-testing-btn">
                Testing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectConsultant;
