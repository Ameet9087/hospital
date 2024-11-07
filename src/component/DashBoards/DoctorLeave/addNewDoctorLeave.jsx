 /* Ajhar Tamboli addNewDoctorLeave.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorLeave.css"

const AddNewDoctorLeave = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorLeave-container"> */}
      <div className="addNewDoctorLeave-header">
        <h3>Add New Doctor Leave</h3>
        {/* <button className="addNewDoctorLeave-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorLeave-form">
        <div className="addNewDoctorLeave-form-row">

          <div className="addNewDoctorLeave-form-group-1row">
          <div className="addNewDoctorLeave-form-group">
            <label>Leave Id<span>*</span></label>
            <input type="text" placeholder="Leave Id" />
          </div>
          <div className="addNewDoctorLeave-form-group">
            <label>Doctor ID<span>*</span></label>
            <input type="text" placeholder="Doctor Id" />
          </div>
          </div>
          
          <div className="addNewDoctorLeave-form-group-1row">
          <div className="addNewDoctorLeave-form-group">
            <label>Start Date</label>
            <input type="text" placeholder="Start Date" />
          </div>
          <div className="addNewDoctorLeave-form-group">
            <label>End Date<span>*</span></label>
            <input type="text"  placeholder='End Date'/>

          </div>
          </div>
          <div className="addNewDoctorLeave-form-group-1row">
          <div className="addNewDoctorLeave-form-group">
            <label>Approved By</label>
            <input type="text" placeholder="Approved By" />
          </div>
          <div className="addNewDoctorLeave-form-group">
            <label>Status<span>*</span></label>
            <input type="text"  placeholder='Status'/>

          </div>
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorLeave-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorLeave-form-actions">
        <button className="addNewDoctorLeave-add-btn">Add </button>
        {/* <button className="addNewDoctorLeave-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorLeave;
