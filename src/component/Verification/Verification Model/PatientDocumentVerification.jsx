/* Mohini_Verification Model_PatientDocumentVerification_14/10/24 */
import React, { useState } from 'react';
import './EmployeeVerification.css';

const PatientDocumentVerification = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    patientID: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
   
    medicalRecords: '',
    medications: '',
    allergies: '',
    ongoingTreatments: '',
    primaryCarePhysician: '',
    insuranceProvider: '',
    policyNumber: '',
    coverageDetails: '',
    policyExpirationDate: '',
    authorizationLetters: '',
    informedConsent: '',
    surgicalConsent: '',
    dataPrivacyConsent: '',
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
            <label>Patient ID:</label>
            <input
              type="text"
              name="patientID"
              className="employee-verification-input"
              value={formData.patientID}
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
            <label>Phone:</label>
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
            <label>Emergency Contact:</label>
            <input
              type="text"
              name="emergencyContact"
              className="employee-verification-input"
              value={formData.emergencyContact}
              onChange={handleChange}
              required
            />
          </div>

         

         

        
        <h2>Medical History Verification Form
        </h2>

          <div className="employee-verification-form-group">
            <label>Medical Records:</label>
            <input
              type="text"
              name="medicalRecords"
              className="employee-verification-input"
              value={formData.medicalRecords}
              onChange={handleChange}
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Medications:</label>
            <input
              type="text"
              name="medications"
              className="employee-verification-input"
              value={formData.medications}
              onChange={handleChange}
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Allergies:</label>
            <input
              type="text"
              name="allergies"
              className="employee-verification-input"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>

         

         
          </div>
          <div className="employee-verification-right">
          <div className="employee-verification-form-group">
            <label>Ongoing Treatments:</label>
            <input
              type="text"
              name="ongoingTreatments"
              className="employee-verification-input"
              value={formData.ongoingTreatments}
              onChange={handleChange}
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Primary Care Physician:</label>
            <input
              type="text"
              name="primaryCarePhysician"
              className="employee-verification-input"
              value={formData.primaryCarePhysician}
              onChange={handleChange}
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
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Coverage Details:</label>
            <input
              type="text"
              name="coverageDetails"
              className="employee-verification-input"
              value={formData.coverageDetails}
              onChange={handleChange}
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Policy Expiration Date:</label>
            <input
              type="date"
              name="policyExpirationDate"
              className="employee-verification-input"
              value={formData.policyExpirationDate}
              onChange={handleChange}
            />
          </div>
           <h2>Consent Forms
           </h2>
          <div className="employee-verification-form-group">
            <label>Authorization Letters:</label>
            <input
              type="text"
              name="authorizationLetters"
              className="employee-verification-input"
              value={formData.authorizationLetters}
              onChange={handleChange}
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Informed Consent:</label>
            <input
              type="text"
              name="informedConsent"
              className="employee-verification-input"
              value={formData.informedConsent}
              onChange={handleChange}
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Surgical Consent:</label>
            <input
              type="text"
              name="surgicalConsent"
              className="employee-verification-input"
              value={formData.surgicalConsent}
              onChange={handleChange}
            />
          </div>

          <div className="employee-verification-form-group">
            <label>Data Privacy Consent:</label>
            <input
              type="text"
              name="dataPrivacyConsent"
              className="employee-verification-input"
              value={formData.dataPrivacyConsent}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="employee-verification-submit">Submit</button>

        </div>

      
      </div>
    </form>
  );
};

export default PatientDocumentVerification;
/* Mohini_Verification Model_PatientDocumentVerification_14/10/24 */
