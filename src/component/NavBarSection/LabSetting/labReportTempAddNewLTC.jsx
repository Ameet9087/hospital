import React from 'react';
// import './AddLabTest.css';
import "../LabSetting/labReportTempAddNewLTC.css"
const LabReportTempAddNewLTC = ({ onClose }) => {
  return (
    <div className="labReportTempAddNewLTC-container">
      <div className="labReportTempAddNewLTC-header">
        <h3>Add Lab Report Template</h3>
        <button className="labReportTempAddNewLTC-close-btn"onClick={onClose}>x</button>
      </div>

      <div className="labReportTempAddNewLTC-form">
        <div className="labReportTempAddNewLTC-form-row">

          <div className="labReportTempAddNewLTC-form-group-1row">
          <div className="labReportTempAddNewLTC-form-group">
            <label>Report Template Name<span>*</span></label>
            <input type="text" placeholder="Report Template Name" />
          </div>
          <div className="labReportTempAddNewLTC-form-group">
            <label>Report Template Short Name<span>*</span></label>
            <input type="text" placeholder="Report Template Short Name" />
          </div>
          </div>
          
          <div className="labReportTempAddNewLTC-form-group-1row">
          <div className="labReportTempAddNewLTC-form-group">
            <label>Description</label>
            <input type="text" placeholder="Report Description" />
          </div>
          <div className="labReportTempAddNewLTC-form-group">
            <label>Report Template Type<span>*</span></label>
            <select>
              <option>Normal</option>
              {/* Add other options here */}
            </select>          </div>
          </div>
            <div className="labReportTempAddNewLTC-checkbox-N-form-group">
                <label>Column Settings:</label>
            
            <div className="labReportTempAddNewLTC-checkbox-row">
              <label><input type="checkbox" /> Select All</label>
              <label><input type="checkbox" /> Name</label>
              <label><input type="checkbox" /> Result</label>
              <label><input type="checkbox" /> Range</label>
              <label><input type="checkbox" /> Method</label>
              <label><input type="checkbox" /> Unit</label>
              <label><input type="checkbox" /> Remarks</label>
            </div>
    
            </div>
          <div className="labReportTempAddNewLTC-form-group-1row">
          {/* <div className="labReportTempAddNewLTC-form-group">
            <label>Lab Category<span>*</span></label>
            <select>
              <option>Select Lab Category</option>
            </select>
          </div> */}
          {/* <div className="labReportTempAddNewLTC-form-group">
            <label>Service Department<span>*</span></label>
            <input type="text" placeholder="Select Service Department Name" />
          </div> */}
            <div className="labReportTempAddNewLTC-form-group labReportTempAddNewLTC-full-width">
              <label>Header Text:</label>
<input type="text" />            </div>
          <div className="labReportTempAddNewLTC-form-group">
            <label>Is Default<span>*</span><input type="checkbox" /></label>
           
          </div>
          </div>
          <div className="labReportTempAddNewLTC-form-group-1row">
          {/* <div className="labReportTempAddNewLTC-form-group-sub"> */}
          <div className="labReportTempAddNewLTC-form-group">
            <label>Footer Text</label>
              <textarea></textarea>
          </div>
          
          <div className="labReportTempAddNewLTC-form-group">
            <label>Display Sequence</label>
            <input type="number" defaultValue="100" />
          </div>
          </div>
          {/* </div> */}
        </div>
        {/* <div className='labReportTempAddNewLTC-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="labReportTempAddNewLTC-form-actions">
        <button className="labReportTempAddNewLTC-add-btn">Add Template</button>
        {/* <button className="labReportTempAddNewLTC-close-btn">Close</button> */}
      </div>
    </div>
  );
};

export default LabReportTempAddNewLTC;
