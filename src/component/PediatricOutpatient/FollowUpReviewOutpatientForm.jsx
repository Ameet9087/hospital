import React, { useState } from 'react';
import './PatientOutPatientRegistrationForm.css';

const FollowUpReviewOutpatientForm = ({ sendFollowupdata, followup }) => {
  const [formData, setFormData] = useState({
    followUpDate: '',
    improvement: '',
    newSymptoms: '',
    revisedDiagnosis: '',
    revisedTreatment: '',
    nextFollowUpDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Call the sendFollowupdata function with the formData
    sendFollowupdata(formData);
    console.log('Form Data:', formData); // Optional: log the data to the console
    alert("Follow Up data added successfully")
  };

  return (
    <div className="patient-outpatient-register-form-container">
      <h2 className="patient-outpatient-register-form-title">Follow-up Review Form</h2>
      <form className="patient-outpatient-register-form" onSubmit={handleSubmit}>
        <div className="patient-outpatient-register-form-left">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="followUpDate" className="patient-outpatient-register-form-label">Follow-up Date</label>
            <input
              type="date"
              id="followUpDate"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="improvement" className="patient-outpatient-register-form-label">Improvement</label>
            <input
              type="text"
              id="improvement"
              name="improvement"
              value={formData.improvement}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="newSymptoms" className="patient-outpatient-register-form-label">New Symptoms</label>
            <input
              type="text"
              id="newSymptoms"
              name="newSymptoms"
              value={formData.newSymptoms}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>

        <div className="patient-outpatient-register-form-right">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="revisedDiagnosis" className="patient-outpatient-register-form-label">Revised Diagnosis</label>
            <input
              type="text"
              id="revisedDiagnosis"
              name="revisedDiagnosis"
              value={formData.revisedDiagnosis}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="revisedTreatment" className="patient-outpatient-register-form-label">Revised Treatment</label>
            <input
              type="text"
              id="revisedTreatment"
              name="revisedTreatment"
              value={formData.revisedTreatment}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="nextFollowUpDate" className="patient-outpatient-register-form-label">Next Follow-up Date</label>
            <input
              type="date"
              id="nextFollowUpDate"
              name="nextFollowUpDate"
              value={formData.nextFollowUpDate}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>

        {/* Add Button to submit form data */}
        <button type="submit" className="patient-outpatient-register-form-submit-btn">
          Add Follow-up Data
        </button>
      </form>
    </div>
  );
};

export default FollowUpReviewOutpatientForm;
