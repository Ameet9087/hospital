import React, { useState } from 'react';
import './PatientOutPatientRegistrationForm.css';

const ConsentLegalOutpatientForms = () => {
  const [formData, setFormData] = useState({
    consentForTreatment: false,
    consentForVaccination: false,
    consentForProcedures: false,
    guardianName: '',
    guardianSignature: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="patient-outpatient-register-form-container">
      <h2 className="patient-outpatient-register-form-title">Consent and Legal Outpatient Forms</h2>
      <form className="patient-outpatient-register-form">
        <div className="patient-outpatient-register-form-left">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="consentForTreatment" className="patient-outpatient-register-form-label">
              Consent for Treatment
            </label>
            <input
              type="checkbox"
              id="consentForTreatment"
              name="consentForTreatment"
              checked={formData.consentForTreatment}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="consentForVaccination" className="patient-outpatient-register-form-label">
              Consent for Vaccination
            </label>
            <input
              type="checkbox"
              id="consentForVaccination"
              name="consentForVaccination"
              checked={formData.consentForVaccination}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="consentForProcedures" className="patient-outpatient-register-form-label">
              Consent for Procedures
            </label>
            <input
              type="checkbox"
              id="consentForProcedures"
              name="consentForProcedures"
              checked={formData.consentForProcedures}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>

        <div className="patient-outpatient-register-form-right">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="guardianName" className="patient-outpatient-register-form-label">
              Guardian's Name
            </label>
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
            <label htmlFor="guardianSignature" className="patient-outpatient-register-form-label">
              Guardian's Signature
            </label>
            <input
              type="text"
              id="guardianSignature"
              name="guardianSignature"
              value={formData.guardianSignature}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="date" className="patient-outpatient-register-form-label">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConsentLegalOutpatientForms;
