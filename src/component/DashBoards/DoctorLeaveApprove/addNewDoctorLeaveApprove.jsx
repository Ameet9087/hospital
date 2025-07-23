 /* Ajhar Tamboli addNewDoctorLeaveApprove.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorLeaveApprove.css"

const AddNewDoctorLeaveApprove = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorLeaveApprove-container"> */}
      <div className="addNewDoctorLeaveApprove-header">
        <h3>Add New Doctor LeaveApprove</h3>
        {/* <button className="addNewDoctorLeaveApprove-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorLeaveApprove-form">
        <div className="addNewDoctorLeaveApprove-form-row">

          <div className="addNewDoctorLeaveApprove-form-group-1row">
          <div className="addNewDoctorLeaveApprove-form-group">
            <label>LeaveApprove Id<span>*</span></label>
            <input type="text" placeholder="LeaveApprove Id" />
          </div>
          <div className="addNewDoctorLeaveApprove-form-group">
            <label>Doctor ID<span>*</span></label>
            <input type="text" placeholder="Doctor Id" />
          </div>
          </div>
          
          <div className="addNewDoctorLeaveApprove-form-group-1row">
          <div className="addNewDoctorLeaveApprove-form-group">
            <label>Start Date</label>
            <input type="text" placeholder="Start Date" />
          </div>
          <div className="addNewDoctorLeaveApprove-form-group">
            <label>End Date<span>*</span></label>
            <input type="text"  placeholder='End Date'/>

          </div>
          </div>
          <div className="addNewDoctorLeaveApprove-form-group-1row">
          <div className="addNewDoctorLeaveApprove-form-group">
            <label>Approved By</label>
            <input type="text" placeholder="Approved By" />
          </div>
          <div className="addNewDoctorLeaveApprove-form-group">
            <label>Status<span>*</span></label>
            <input type="text"  placeholder='Status'/>

          </div>
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorLeaveApprove-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorLeaveApprove-form-actions">
        <button className="addNewDoctorLeaveApprove-add-btn">Add </button>
        {/* <button className="addNewDoctorLeaveApprove-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorLeaveApprove;
