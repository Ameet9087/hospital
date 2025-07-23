/* Mohini_Verification Model_PatientInsuranceForm_14/10/24 */
import React, { useState } from 'react';
import './EmployeeVerification.css';

const EmpIdentityVerificationForm = () => {
  const [formData, setFormData] = useState({
    idType: '',
    employeePhoto: null,
    dateOfIssue: '',
    expiryDate: '',
    placeOfIssue: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, employeePhoto: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <form className="employee-verification-form" onSubmit={handleSubmit}>
      <div className="employee-verification-form-container">
        <div className="employee-verification-left">
          <div className="employee-verification-form-group">
            <label>ID Type:</label>
            <input
              type="text"
              name="idType"
              className="employee-verification-input"
              value={formData.idType}
              onChange={handleChange}
              required
            />
          </div>

         

          <div className="employee-verification-form-group">
            <label>Date of Issue:</label>
            <input
              type="date"
              name="dateOfIssue"
              className="employee-verification-input"
              value={formData.dateOfIssue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Expiry Date:</label>
            <input
              type="date"
              name="expiryDate"
              className="employee-verification-input"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Place of Issue:</label>
            <input
              type="text"
              name="placeOfIssue"
              className="employee-verification-input"
              value={formData.placeOfIssue}
              onChange={handleChange}
              required
            />
          </div>
          <div className="employee-verification-form-group">
            <label>Employee Photo:</label>
            <input
              type="file"
              name="employeePhoto"
              className="employee-verification-input"
              onChange={handlePhotoChange}
              required
            />
          </div>
          <button type="submit" className="employee-verification-submit">
          Submit
        </button>
        </div>

        
      </div>
    </form>
  );
};

export default EmpIdentityVerificationForm;
/* Mohini_Verification Model_PatientInsuranceForm_14/10/24 */
