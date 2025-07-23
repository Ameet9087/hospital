 /* Ajhar Tamboli addNewDoctorAccountSettings.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorAccountSettings.css"

const AddNewDoctorAccountSettings = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorAccountSettings-container"> */}
      <div className="addNewDoctorAccountSettings-header">
        <h3>Add New Doctor Account Settings</h3>
        {/* <button className="addNewDoctorAccountSettings-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorAccountSettings-form">
        <div className="addNewDoctorAccountSettings-form-row">

          <div className="addNewDoctorAccountSettings-form-group-1row">
          <div className="addNewDoctorAccountSettings-form-group">
            <label>Doctor Id<span>*</span></label>
            <input type="text" placeholder="Doctor Id" />
          </div>
          <div className="addNewDoctorAccountSettings-form-group">
            <label>Allow Edit<span>*</span></label>
            <input type="text" placeholder="Allow Edit" />
          </div>
          </div>
          
          <div className="addNewDoctorAccountSettings-form-group-1row">
          <div className="addNewDoctorAccountSettings-form-group">
            <label>Allow Delete</label>
            <input type="text" placeholder="Allow Delete" />
          </div>
          <div className="addNewDoctorAccountSettings-form-group">
            <label>Locked By<span>*</span></label>
            <input type="text"  placeholder='Locked By'/>

          </div>
          </div>
          <div className="addNewDoctorAccountSettings-form-group-1row">
          <div className="addNewDoctorAccountSettings-form-group">
            <label>Locked Date</label>
            <input type="text" placeholder="Locked Date" />
          </div>
          <div className="addNewDoctorAccountSettings-form-group">
            <label>Status<span>*</span></label>
            <input type="text"  placeholder='Status'/>

          </div>
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorAccountSettings-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorAccountSettings-form-actions">
        <button className="addNewDoctorAccountSettings-add-btn">Add </button>
        {/* <button className="addNewDoctorAccountSettings-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorAccountSettings;
