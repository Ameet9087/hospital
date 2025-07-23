import React from 'react';
// import './AddLabTest.css';
import "../LabSetting/labMapGovMapNewGov.css"
const LabMapGovMapNewGov = ({ onClose }) => {
  return (
    <div className="labMapGovMapNewGov-container">
      <div className="labMapGovMapNewGov-header">
        <h3>Map Lab Components</h3>
        <button className="labMapGovMapNewGov-close-btn"onClick={onClose}>x</button>
      </div>

      <div className="labMapGovMapNewGov-form">

          <div className="labMapGovMapNewGov-form-group">
            <label>Gov LabReportItem Name :<span>*</span></label>
            <input type="text" placeholder="Enter Component Name" />
          </div>

          <div className="labMapGovMapNewGov-form-group">
            <label>Lab Test Name :<span>*</span></label>
            <input type="text" placeholder="Enter Component Name" />
          </div>
         
          
          
        
        </div>
          <div className="labMapGovMapNewGov-form-group">
            <label>Is Component Based:</label>
            <input type="checkbox"  />
          </div>
        <div className="labMapGovMapNewGov-form-actions">
        <button className="labMapGovMapNewGov-add-btn">Add </button>
        {/* <button className="labMapGovMapNewGov-close-btn">Close</button> */}
      </div>
    </div>
  );
};

export default LabMapGovMapNewGov;
