/* Mohini_PaediatricAdmissionForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PediatricPatientRegistrationForm.css'; // Import the CSS for styling

const PaediatricAdmissionForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    guardianNames: '',
    contactNumbers: '',
    address: '',
    emergencyContact: '',
    insuranceInfo: '',
    admissionDate: '',
    hospitalNumber: '',
    ipNumber: '',
    admittingDoctor: '',
    wardRoom: '',
    bedNumber: '',
    admissionReason: '',
    admissionType: '',
    allergies: [],
    specialNeeds: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="pediatric-patient-registration-form-container">
      <h2 className="pediatric-patient-registration-form-title">Paediatric Admission Form</h2>
      <form onSubmit={handleSubmit} className="pediatric-patient-registration-form">
        <div className="pediatric-patient-registration-form-left">
          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="patientId" className="pediatric-patient-registration-form-label">Patient ID<span className="mandatory"> *</span>:</label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
              required
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="firstName" className="pediatric-patient-registration-form-label">First Name<span className="mandatory"> *</span>:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
              required
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="lastName" className="pediatric-patient-registration-form-label">Last Name<span className="mandatory"> *</span>:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
              required
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="dateOfBirth" className="pediatric-patient-registration-form-label">Date of Birth<span className="mandatory"> *</span>:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
              required
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="gender" className="pediatric-patient-registration-form-label">Gender<span className="mandatory"> *</span>:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="bloodGroup" className="pediatric-patient-registration-form-label">Blood Group:</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="guardianNames" className="pediatric-patient-registration-form-label">Guardian Name(s):</label>
            <input
              type="text"
              id="guardianNames"
              name="guardianNames"
              value={formData.guardianNames}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="contactNumbers" className="pediatric-patient-registration-form-label">Contact Number(s):</label>
            <input
              type="text"
              id="contactNumbers"
              name="contactNumbers"
              value={formData.contactNumbers}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="address" className="pediatric-patient-registration-form-label">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="emergencyContact" className="pediatric-patient-registration-form-label">Emergency Contact Information:</label>
            <textarea
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="insuranceInfo" className="pediatric-patient-registration-form-label">Insurance Information (if applicable):</label>
            <textarea
              id="insuranceInfo"
              name="insuranceInfo"
              value={formData.insuranceInfo}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>
        </div>

        <div className="pediatric-patient-registration-form-right">
          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="admissionDate" className="pediatric-patient-registration-form-label">Admission Date and Time<span className="mandatory"> *</span>:</label>
            <input
              type="datetime-local"
              id="admissionDate"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
              required
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="hospitalNumber" className="pediatric-patient-registration-form-label">Hospital Number (HN):</label>
            <input
              type="text"
              id="hospitalNumber"
              name="hospitalNumber"
              value={formData.hospitalNumber}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="ipNumber" className="pediatric-patient-registration-form-label">IP (Inpatient) Number:</label>
            <input
              type="text"
              id="ipNumber"
              name="ipNumber"
              value={formData.ipNumber}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="admittingDoctor" className="pediatric-patient-registration-form-label">Admitting Doctor:</label>
            <input
              type="text"
              id="admittingDoctor"
              name="admittingDoctor"
              value={formData.admittingDoctor}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="wardRoom" className="pediatric-patient-registration-form-label">Ward/Room Assigned:</label>
            <input
              type="text"
              id="wardRoom"
              name="wardRoom"
              value={formData.wardRoom}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="bedNumber" className="pediatric-patient-registration-form-label">Bed Number:</label>
            <input
              type="text"
              id="bedNumber"
              name="bedNumber"
              value={formData.bedNumber}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="admissionReason" className="pediatric-patient-registration-form-label">Reason for Admission:</label>
            <textarea
              id="admissionReason"
              name="admissionReason"
              value={formData.admissionReason}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="admissionType" className="pediatric-patient-registration-form-label">Type of Admission:</label>
            <select
              id="admissionType"
              name="admissionType"
              value={formData.admissionType}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            >
              <option value="">Select</option>
              <option value="emergency">Emergency</option>
              <option value="elective">Elective</option>
            </select>
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="allergies" className="pediatric-patient-registration-form-label">Known Allergies:</label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="specialNeeds" className="pediatric-patient-registration-form-label">Special Needs/Notes:</label>
            <textarea
              id="specialNeeds"
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>
          <div className="pediatric-patient-registration-form-submit">
          <button type="submit" className="pediatric-patient-registration-form-submit-btn">Submit</button>
        </div>
        </div>

        
      </form>
    </div>
  );
};

export default PaediatricAdmissionForm;
/* Mohini_PaediatricAdmissionForm_WholePage_3/oct/24 */