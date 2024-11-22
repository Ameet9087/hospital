 /* Ajhar Tamboli addNewDoctorTakeover.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorTakeover.css"

const AddNewDoctorTakeover = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorTakeover-container"> */}
      <div className="addNewDoctorTakeover-header">
        <h3>Add New Doctor Takeover</h3>
        {/* <button className="addNewDoctorTakeover-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorTakeover-form">
        <div className="addNewDoctorTakeover-form-row">

          <div className="addNewDoctorTakeover-form-group-1row">
          <div className="addNewDoctorTakeover-form-group">
            <label>Room No<span>*</span></label>
            <input type="text" placeholder="Room No" />
          </div>
          <div className="addNewDoctorTakeover-form-group">
            <label>UHId<span>*</span></label>
            <input type="text" placeholder="UHId" />
          </div>
          </div>
          
          <div className="addNewDoctorTakeover-form-group-1row">
          <div className="addNewDoctorTakeover-form-group">
            <label>IP NO</label>
            <input type="text" placeholder="IP NO" />
          </div>
          <div className="addNewDoctorTakeover-form-group">
            <label>Patient Name<span>*</span></label>
            <input type="text"  placeholder='Patient Name'/>

          </div>
          </div>
          <div className="addNewDoctorTakeover-form-group-1row">
          <div className="addNewDoctorTakeover-form-group">
            <label>Age Sex</label>
            <input type="text" placeholder="Age Sex" />
          </div>
          <div className="addNewDoctorTakeover-form-group">
            <label>Doctor<span>*</span></label>
            <input type="text"  placeholder='Doctor'/>

          </div>
          </div>
          <div className="addNewDoctorTakeover-form-group-1row">
          <div className="addNewDoctorTakeover-form-group">
            <label>DOA</label>
            <input type="text" placeholder="DOA" />
          </div>
          <div className="addNewDoctorTakeover-form-group">
            <label>Panel<span>*</span></label>
            <input type="text"  placeholder='Panel'/>

          </div>
          </div>
          <div className="addNewDoctorTakeover-form-group-1row">
          <div className="addNewDoctorTakeover-form-group">
            <label>Diagnosis</label>
            <input type="text" placeholder="Diagnosis" />
          </div>
          <div className="addNewDoctorTakeover-form-group">
            <label>Illness Severity<span>*</span></label>
            <input type="text"  placeholder='Illness Severity'/>

          </div>
          </div>
          <div className="addNewDoctorTakeover-form-group-1row">
          <div className="addNewDoctorTakeover-form-group">
            <label>Any Major Complaint/Information/Pending Investigation</label>
            <input type="text" placeholder="Any Major Complaint/Information/Pending Investigation" />
          </div>
          <div className="addNewDoctorTakeover-form-group">
            <label>Takeover<span>*</span></label>
            <input type="text"  placeholder='Takeover'/>

          </div>
          </div>
          
          <div className="addNewDoctorTakeover-form-group-1row">
          <div className="addNewDoctorTakeover-form-group">
            <label>Status</label>
            <input type="text" placeholder="Status" />
          </div>
          
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorTakeover-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorTakeover-form-actions">
        <button className="addNewDoctorTakeover-add-btn">Add </button>
        {/* <button className="addNewDoctorTakeover-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorTakeover;
