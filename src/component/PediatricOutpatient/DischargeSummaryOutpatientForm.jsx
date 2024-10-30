import React, { useState,useEffect } from 'react';
import './PatientOutPatientRegistrationForm.css';

const DischargeSummaryOutpatientForm = () => {
  const [formData, setFormData] = useState({
    finalDiagnosis: '',
    summaryOfTreatment: '',
    homeCareInstructions: '',
    medicationsToContinue: '',
    followUpInstructions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="patient-outpatient-register-form-container">
      <h2 className="patient-outpatient-register-form-title">Discharge Summary Form</h2>
      <form className="patient-outpatient-register-form">
        <div className="patient-outpatient-register-form-left">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="finalDiagnosis" className="patient-outpatient-register-form-label">Final Diagnosis</label>
            <input
              type="text"
              id="finalDiagnosis"
              name="finalDiagnosis"
              value={formData.finalDiagnosis}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="summaryOfTreatment" className="patient-outpatient-register-form-label">Summary of Treatment</label>
            <input
              type="text"
              id="summaryOfTreatment"
              name="summaryOfTreatment"
              value={formData.summaryOfTreatment}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="homeCareInstructions" className="patient-outpatient-register-form-label">Home Care Instructions</label>
            <input
              type="text"
              id="homeCareInstructions"
              name="homeCareInstructions"
              value={formData.homeCareInstructions}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>

        <div className="patient-outpatient-register-form-right">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="medicationsToContinue" className="patient-outpatient-register-form-label">Medications to Continue</label>
            <input
              type="text"
              id="medicationsToContinue"
              name="medicationsToContinue"
              value={formData.medicationsToContinue}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="followUpInstructions" className="patient-outpatient-register-form-label">Follow-up Instructions</label>
            <input
              type="text"
              id="followUpInstructions"
              name="followUpInstructions"
              value={formData.followUpInstructions}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DischargeSummaryOutpatientForm;
