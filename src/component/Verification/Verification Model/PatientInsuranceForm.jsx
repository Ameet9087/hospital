/* Mohini_Verification Model_PatientInsuranceForm_14/10/24 */
import React, { useState } from 'react';
import './EmployeeVerification.css';

const PatientInsuranceForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    effectiveDate: '',
    expirationDate: '',
    planType: '',
    coverageType: '',
    coPay: '',
    deductible: '',
    coverageDetails: '',
    preAuthRequirements: '',
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
            <label>Patient ID:</label>
            <input
              type="text"
              name="patientId"
              className="employee-verification-input"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              className="employee-verification-input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              className="employee-verification-input"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Gender:</label>
            <select name="gender" className="employee-verification-select" value={formData.gender} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="employee-verification-form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              className="employee-verification-input"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="employee-verification-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Insurance Provider:</label>
            <input
              type="text"
              name="insuranceProvider"
              className="employee-verification-input"
              value={formData.insuranceProvider}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Policy Number:</label>
            <input
              type="text"
              name="policyNumber"
              className="employee-verification-input"
              value={formData.policyNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Group Number:</label>
            <input
              type="text"
              name="groupNumber"
              className="employee-verification-input"
              value={formData.groupNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Effective Date:</label>
            <input
              type="date"
              name="effectiveDate"
              className="employee-verification-input"
              value={formData.effectiveDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Expiration Date:</label>
            <input
              type="date"
              name="expirationDate"
              className="employee-verification-input"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Plan Type:</label>
            <input
              type="text"
              name="planType"
              className="employee-verification-input"
              value={formData.planType}
              onChange={handleChange}
              required
            />
          </div>

         

          </div>

          <div className="employee-verification-right">
          <div className="employee-verification-form-group">
            <label>Coverage Type:</label>
            <input
              type="text"
              name="coverageType"
              className="employee-verification-input"
              value={formData.coverageType}
              onChange={handleChange}
              required
            />
          </div>
             
          <div className="employee-verification-form-group">
            <label>Co-Pay:</label>
            <input
              type="text"
              name="coPay"
              className="employee-verification-input"
              value={formData.coPay}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Deductible:</label>
            <input
              type="text"
              name="deductible"
              className="employee-verification-input"
              value={formData.deductible}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Coverage Details:</label>
            <textarea
              name="coverageDetails"
              className="employee-verification-textarea"
              value={formData.coverageDetails}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Pre-Auth Requirements:</label>
            <textarea
              name="preAuthRequirements"
              className="employee-verification-textarea"
              value={formData.preAuthRequirements}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="employee-verification-submit">Submit</button>

         </div>

       
      </div>
    </form>
  );
};

export default PatientInsuranceForm;
/* Mohini_Verification Model_PatientInsuranceForm_14/10/24 */
