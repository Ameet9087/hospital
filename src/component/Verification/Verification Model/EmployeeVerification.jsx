/* Mohini_Verification Model_EmployeeInsuranceVerificationForm_14/10/24 */
import React, { useState } from 'react';
import './EmployeeVerification.css';

const EmployeeVerification = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    employeeId: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    email: '',
    address: '',
    nationality: '',
    certificateName: '',
    institutionName: '',
    graduationYear: '',
    licenseNumber: '',
    issuingAuthority: '',
    expirationDate: '',
    employmentCertificate: '',
    referenceLetters: '',
    positionHeld: '',
    employmentDates: '',
    medicalReport: '',
    vaccinationRecords: '',
    backgroundCheck: '',
    insuranceCard: '',
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
          <h2>Personal Details</h2>
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
            <label>Employee ID:</label>
            <input
              type="text"
              name="employeeId"
              className="employee-verification-input"
              value={formData.employeeId}
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
            <select
              name="gender"
              className="employee-verification-select"
              value={formData.gender}
              onChange={handleChange}
              required
            >
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
              name="phoneNumber"
              className="employee-verification-input"
              value={formData.phoneNumber}
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
            <label>Address:</label>
            <textarea
              name="address"
              className="employee-verification-textarea"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Nationality:</label>
            <input
              type="text"
              name="nationality"
              className="employee-verification-input"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="employee-verification-right">
          <h2>Qualification Verification Form
          </h2>
          <div className="employee-verification-form-group">
            <label>Certificate Name:</label>
            <input
              type="text"
              name="certificateName"
              className="employee-verification-input"
              value={formData.certificateName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Institution Name:</label>
            <input
              type="text"
              name="institutionName"
              className="employee-verification-input"
              value={formData.institutionName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Graduation Year:</label>
            <input
              type="number"
              name="graduationYear"
              className="employee-verification-input"
              value={formData.graduationYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>License Number:</label>
            <input
              type="text"
              name="licenseNumber"
              className="employee-verification-input"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Issuing Authority:</label>
            <input
              type="text"
              name="issuingAuthority"
              className="employee-verification-input"
              value={formData.issuingAuthority}
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
          <h2> Employment Records Verification Form
          </h2>
          <div className="employee-verification-form-group">
            <label>Employment Certificate:</label>
            <input
              type="text"
              name="employmentCertificate"
              className="employee-verification-input"
              value={formData.employmentCertificate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Reference Letters:</label>
            <input
              type="text"
              name="referenceLetters"
              className="employee-verification-input"
              value={formData.referenceLetters}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Position Held:</label>
            <input
              type="text"
              name="positionHeld"
              className="employee-verification-input"
              value={formData.positionHeld}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Employment Dates:</label>
            <input
              type="text"
              name="employmentDates"
              className="employee-verification-input"
              value={formData.employmentDates}
              onChange={handleChange}
              required
            />
          </div>
    <h2>Medical and Compliance Documents Form</h2>
          <div className="employee-verification-form-group">
            <label>Medical Report:</label>
            <input
              type="text"
              name="medicalReport"
              className="employee-verification-input"
              value={formData.medicalReport}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Vaccination Records:</label>
            <input
              type="text"
              name="vaccinationRecords"
              className="employee-verification-input"
              value={formData.vaccinationRecords}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Background Check:</label>
            <input
              type="text"
              name="backgroundCheck"
              className="employee-verification-input"
              value={formData.backgroundCheck}
              onChange={handleChange}
              required
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Insurance Card:</label>
            <input
              type="text"
              name="insuranceCard"
              className="employee-verification-input"
              value={formData.insuranceCard}
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

export default EmployeeVerification;
/* Mohini_Verification Model_EmployeeInsuranceVerificationForm_14/10/24 */
