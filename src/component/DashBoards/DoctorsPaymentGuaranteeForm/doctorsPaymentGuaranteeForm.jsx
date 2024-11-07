import React from 'react';
import './doctorsPaymentGuaranteeForm.css';

const DoctorsPaymentGuaranteeForm = () => {
  return (
    <div className="doctorsPaymentGuaranteeForm-container">
      <div className="doctorsPaymentGuaranteeForm-header">
        <h2>Doctors Payment Guarantee Form</h2>
      </div>
      
      <form className="doctorsPaymentGuaranteeForm-payment-form">
        <div className="doctorsPaymentGuaranteeForm-row">
          <label>Payment Guarantee No:</label>
          <input type="text" />
        </div>

        <div className="doctorsPaymentGuaranteeForm-section">
          <h3>Patient Details</h3>
          
          <div className="doctorsPaymentGuaranteeForm-row">
            <label>IP No *</label>
            <div className="doctorsPaymentGuaranteeForm-input-with-icon">
              <input type="text" required />
              <span className="doctorsPaymentGuaranteeForm-search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>MR No</label>
            <input type="text" />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Name</label>
            <input type="text" />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Consultant Dr</label>
            <input type="text" />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Bed No</label>
            <input type="text" />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Address</label>
            <input type="text" />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Phone</label>
            <input type="tel" />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Mobile</label>
            <input type="tel" />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Payment Guarantee Doctor *</label>
            <div className="doctorsPaymentGuaranteeForm-input-with-icon">
              <input type="text" required />
              <span className="doctorsPaymentGuaranteeForm-search-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Payment Guarantee Amount *</label>
            <input type="number" required />
          </div>

          <div className="doctorsPaymentGuaranteeForm-row">
            <label>Remarks</label>
            <textarea></textarea>
          </div>
          <div className="doctorsPaymentGuaranteeForm-row">
            <button className="doctorsPaymentGuaranteeForm-button">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorsPaymentGuaranteeForm;