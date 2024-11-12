 /* Ajhar Tamboli addNewDoctorHandover.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorHandover.css"

const AddNewDoctorHandover = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorHandover-container"> */}
      <div className="addNewDoctorHandover-header">
        <h3>Add New Doctor Handover</h3>
        {/* <button className="addNewDoctorHandover-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorHandover-form">
        <div className="addNewDoctorHandover-form-row">

          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>Handover<span>*</span></label>
            <input type="text" placeholder="Handover" />
          </div>
          <div className="addNewDoctorHandover-form-group">
            <label>Room No<span>*</span></label>
            <input type="text" placeholder="Room No" />
          </div>
          </div>
          
          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>UHId</label>
            <input type="text" placeholder="UHId" />
          </div>
          <div className="addNewDoctorHandover-form-group">
            <label>IP NO<span>*</span></label>
            <input type="text"  placeholder='IP NO'/>

          </div>
          </div>
          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>Patient Name</label>
            <input type="text" placeholder="Patient Name" />
          </div>
          <div className="addNewDoctorHandover-form-group">
            <label>Age Sex<span>*</span></label>
            <input type="text"  placeholder='Age Sex'/>

          </div>
          </div>
          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>Doctor Id</label>
            <input type="text" placeholder="Doctor Id" />
          </div>
          <div className="addNewDoctorHandover-form-group">
            <label>DOA<span>*</span></label>
            <input type="text"  placeholder='DOA'/>

          </div>
          </div>
          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>Panel</label>
            <input type="text" placeholder="Panel" />
          </div>
          <div className="addNewDoctorHandover-form-group">
            <label>Diagnosis<span>*</span></label>
            <input type="text"  placeholder='Diagnosis'/>

          </div>
          </div>
          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>Illness Severity</label>
            <input type="text" placeholder="Illness Severity" />
          </div>
          <div className="addNewDoctorHandover-form-group">
            <label>Any Major Complaint/Information/Pending Investigation<span>*</span></label>
            <input type="text"  placeholder='Any Major Complaint/Information/Pending Investigation'/>

          </div>
          </div>
          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>Revision</label>
            <input type="text" placeholder="Revision" />
          </div>
          <div className="addNewDoctorHandover-form-group">
            <label>Exiting Duty<span>*</span></label>
            <input type="text"  placeholder='Exiting Duty'/>

          </div>
          </div>
          <div className="addNewDoctorHandover-form-group-1row">
          <div className="addNewDoctorHandover-form-group">
            <label>Status</label>
            <input type="text" placeholder="Status" />
          </div>
          
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorHandover-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorHandover-form-actions">
        <button className="addNewDoctorHandover-add-btn">Add </button>
        {/* <button className="addNewDoctorHandover-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorHandover;
