import React, { useState, useEffect } from 'react';
import './PatientOutPatientRegistrationForm.css';
import axios from 'axios';

const PatientOutPatientRegistrationForm = ({ sendpatientdata, patientData }) => {
  const [formData, setFormData] = useState({
    patientID: '',
    firstName: '',
    lastName: '',
    gender: 'male',
    dob: '',
    guardianName: '',
    guardianRelationship: '',
    contactNumber: '',
    age: '', // Add age to formData
  });

  useEffect(() => {
    if (patientData) {
      setFormData({
        patientID: patientData?.patientID || '',
        firstName: patientData?.firstName || '',
        lastName: patientData?.lastName || '',
        gender: patientData?.gender || 'male',
        dob: patientData?.dob || '',
        guardianName: patientData?.guardianName || '',
        guardianRelationship: patientData?.guardianRelationship || '',
        contactNumber: patientData?.contactNumber || '',
        age: patientData?.dob ? calculateAge(patientData.dob) : '', // Calculate age if dob is present
      });
    }
  }, [patientData]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Calculate age if the dob is updated
    if (name === 'dob') {
      const age = calculateAge(value);
      setFormData((prevData) => ({
        ...prevData,
        age, // Update age in formData
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendpatientdata(formData);
    console.log(formData);
    alert("Basic Information Saved Successfully");
  };

  return (
    <div className="patient-outpatient-register-form-container">
      <h2 className="patient-outpatient-register-form-title">Patient Registration Form</h2>
      <form className="patient-outpatient-register-form" onSubmit={handleSubmit}>
        <div className="patient-outpatient-register-form-left">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="patientID" className="patient-outpatient-register-form-label">Patient ID</label>
            <input
              type="text"
              id="patientID"
              name="patientID"
              value={formData.patientID}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="firstName" className="patient-outpatient-register-form-label">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="lastName" className="patient-outpatient-register-form-label">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="dob" className="patient-outpatient-register-form-label">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="gender" className="patient-outpatient-register-form-label">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="patient-outpatient-register-form-right">
          <div className="patient-outpatient-register-form-group">
            <label className="patient-outpatient-register-form-label">Age</label>
            <input
              type="text"
              value={formData.age}
              readOnly
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="guardianName" className="patient-outpatient-register-form-label">Guardian Name</label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="guardianRelationship" className="patient-outpatient-register-form-label">Guardian Relationship</label>
            <input
              type="text"
              id="guardianRelationship"
              name="guardianRelationship"
              value={formData.guardianRelationship}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="contactNumber" className="patient-outpatient-register-form-label">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>
        <div className="patient-outpatient-register-form-group">
          <button type="submit" className="register-button">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PatientOutPatientRegistrationForm;
