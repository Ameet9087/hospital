/* Mohini_Verification Model_PatientInsuranceForm_14/10/24 */
import React, { useState } from 'react';
import './EmployeeVerification.css';

const PatientIdentityVerificationForm = () => {
  const [formData, setFormData] = useState({
    governmentId: '',
    photoId: '',
    dateOfIssue: '',
    expiryDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            <label>Government-issued ID:</label>
            <input
              type="text"
              name="governmentId"
              className="employee-verification-input"
              value={formData.governmentId}
              onChange={handleChange}
              placeholder="e.g., Passport, Aadhar, National ID"
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Photo ID:</label>
            <input
              type="text"
              name="photoId"
              className="employee-verification-input"
              value={formData.photoId}
              onChange={handleChange}
              placeholder="Enter Photo ID details"
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

          <button type="submit" className="employee-verification-submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default PatientIdentityVerificationForm;
/* Mohini_Verification Model_PatientInsuranceForm_14/10/24 */
