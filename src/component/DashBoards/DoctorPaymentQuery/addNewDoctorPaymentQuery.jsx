 /* Ajhar Tamboli addNewDoctorPaymentQuery.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorPaymentQuery.css"

const AddNewDoctorPaymentQuery = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorPaymentQuery-container"> */}
      <div className="addNewDoctorPaymentQuery-header">
        <h3>Add New Doctor PaymentQuery</h3>
        {/* <button className="addNewDoctorPaymentQuery-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorPaymentQuery-form">
        <div className="addNewDoctorPaymentQuery-form-row">

          <div className="addNewDoctorPaymentQuery-form-group-1row">
          <div className="addNewDoctorPaymentQuery-form-group">
            <label>Doctor Id<span>*</span></label>
            <input type="text" placeholder="Doctor Id" />
          </div>
          <div className="addNewDoctorPaymentQuery-form-group">
            <label>Allow Edit<span>*</span></label>
            <input type="text" placeholder="Allow Edit" />
          </div>
          </div>
          
          <div className="addNewDoctorPaymentQuery-form-group-1row">
          <div className="addNewDoctorPaymentQuery-form-group">
            <label>Allow Delete</label>
            <input type="text" placeholder="Allow Delete" />
          </div>
          <div className="addNewDoctorPaymentQuery-form-group">
            <label>Locked By<span>*</span></label>
            <input type="text"  placeholder='Locked By'/>

          </div>
          </div>
          <div className="addNewDoctorPaymentQuery-form-group-1row">
          <div className="addNewDoctorPaymentQuery-form-group">
            <label>Locked Date</label>
            <input type="text" placeholder="Locked Date" />
          </div>
          <div className="addNewDoctorPaymentQuery-form-group">
            <label>Status<span>*</span></label>
            <input type="text"  placeholder='Status'/>

          </div>
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorPaymentQuery-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorPaymentQuery-form-actions">
        <button className="addNewDoctorPaymentQuery-add-btn">Add </button>
        {/* <button className="addNewDoctorPaymentQuery-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorPaymentQuery;
