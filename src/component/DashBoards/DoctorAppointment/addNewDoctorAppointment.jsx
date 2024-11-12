 /* Ajhar Tamboli addNewDoctorAppointment.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorAppointment.css"

const AddNewDoctorAppointment = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorAppointment-container"> */}
      <div className="addNewDoctorAppointment-header">
        <h3>Add New Doctor Appointment</h3>
        {/* <button className="addNewDoctorAppointment-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorAppointment-form">
        <div className="addNewDoctorAppointment-form-row">

          <div className="addNewDoctorAppointment-form-group-1row">
          <div className="addNewDoctorAppointment-form-group">
            <label>Appointment Id<span>*</span></label>
            <input type="text" placeholder="Appointment Id" />
          </div>
          <div className="addNewDoctorAppointment-form-group">
            <label>Doctor ID<span>*</span></label>
            <input type="text" placeholder="Doctor Id" />
          </div>
          </div>
          
          <div className="addNewDoctorAppointment-form-group-1row">
          <div className="addNewDoctorAppointment-form-group">
            <label>Patient Id</label>
            <input type="text" placeholder="Patient Id" />
          </div>
          <div className="addNewDoctorAppointment-form-group">
            <label>Patient Name<span>*</span></label>
            <input type="text"  placeholder='Patient Name'/>

          </div>
          </div>
          <div className="addNewDoctorAppointment-form-group-1row">
          <div className="addNewDoctorAppointment-form-group">
            <label>Appointment Given Date</label>
            <input type="text" placeholder="Appointment Given Date" />
          </div>
          <div className="addNewDoctorAppointment-form-group">
            <label>Status<span>*</span></label>
            <input type="text"  placeholder='Status'/>

          </div>
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorAppointment-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorAppointment-form-actions">
        <button className="addNewDoctorAppointment-add-btn">Add </button>
        {/* <button className="addNewDoctorAppointment-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorAppointment;
