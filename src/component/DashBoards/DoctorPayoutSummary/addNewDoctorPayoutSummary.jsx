 /* Ajhar Tamboli addNewDoctorPayoutSummary.jsx 29-10-24 */

import React from 'react';
import "./addNewDoctorPayoutSummary.css"

const AddNewDoctorPayoutSummary = ({ onClose }) => {
  return (
    <>
    {/* <div className="addNewDoctorPayoutSummary-container"> */}
      <div className="addNewDoctorPayoutSummary-header">
        <h3>Add New Doctor Payout Summary</h3>
        {/* <button className="addNewDoctorPayoutSummary-close-btn"onClick={onClose}>x</button> */}
      </div>

      <div className="addNewDoctorPayoutSummary-form">
        <div className="addNewDoctorPayoutSummary-form-row">

          <div className="addNewDoctorPayoutSummary-form-group-1row">
          <div className="addNewDoctorPayoutSummary-form-group">
            <label>Payout Id<span>*</span></label>
            <input type="text" placeholder="Leave Id" />
          </div>
          <div className="addNewDoctorPayoutSummary-form-group">
            <label>Doctor ID<span>*</span></label>
            <input type="text" placeholder="Doctor Id" />
          </div>
          </div>
          
          <div className="addNewDoctorPayoutSummary-form-group-1row">
          <div className="addNewDoctorPayoutSummary-form-group">
            <label>Amount</label>
            <input type="text" placeholder="Amount" />
          </div>
          <div className="addNewDoctorPayoutSummary-form-group">
            <label>Date<span>*</span></label>
            <input type="text"  placeholder='Date'/>

          </div>
          </div>
          <div className="addNewDoctorPayoutSummary-form-group-1row">
          <div className="addNewDoctorPayoutSummary-form-group">
            <label>Status<span>*</span></label>
            <input type="text"  placeholder='Status'/>

          </div>
          </div>
           

         
         
        </div>
        {/* <div className='addNewDoctorPayoutSummary-AddNew'>
            <a href="#" className="add-new-specimen">Add New Specimen</a>
            </div> */}

      </div>



      <div className="addNewDoctorPayoutSummary-form-actions">
        <button className="addNewDoctorPayoutSummary-add-btn">Add </button>
        {/* <button className="addNewDoctorPayoutSummary-close-btn">Close</button> */}
      </div>
    {/* </div> */}
    </>
  );
};

export default AddNewDoctorPayoutSummary;
