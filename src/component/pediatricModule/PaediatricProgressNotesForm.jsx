/* Mohini_PaediatricProgressNotesForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PaediatricVitalsExaminationForm.css'; // Ensure correct CSS file is linked

const PaediatricProgressNotesForm = () => {
  const [formData, setFormData] = useState({
    emergencyDateTime: '',
    natureOfEmergency: '',
    symptoms: '',
    vitalSigns: '',
    treatmentGiven: '',
    doctorNotes: '',
    nextSteps: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="immunization-record-form-container">
      <h2 className="immunization-record-form-title">Pediatric Emergency Form</h2>
      <form onSubmit={handleSubmit} className="immunization-record-form">
        <div className="immunization-record-form-left">
          <div className="immunization-record-form-group">
            <label htmlFor="emergencyDateTime" className="immunization-record-form-label">
              Emergency Date & Time<span className="mandatory"> *</span>:
            </label>
            <input
              type="datetime-local"
              id="emergencyDateTime"
              name="emergencyDateTime"
              value={formData.emergencyDateTime}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="natureOfEmergency" className="immunization-record-form-label">
              Nature of Emergency:
            </label>
            <input
              type="text"
              id="natureOfEmergency"
              name="natureOfEmergency"
              value={formData.natureOfEmergency}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="symptoms" className="immunization-record-form-label">
              Symptoms<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>
        </div>

        <div className="immunization-record-form-right">
          <div className="immunization-record-form-group">
            <label htmlFor="vitalSigns" className="immunization-record-form-label">
              Vital Signs<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="vitalSigns"
              name="vitalSigns"
              value={formData.vitalSigns}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="treatmentGiven" className="immunization-record-form-label">
              Treatment Given<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="treatmentGiven"
              name="treatmentGiven"
              value={formData.treatmentGiven}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="doctorNotes" className="immunization-record-form-label">
              Doctor's Notes:
            </label>
            <textarea
              id="doctorNotes"
              name="doctorNotes"
              value={formData.doctorNotes}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            ></textarea>
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="nextSteps" className="immunization-record-form-label">
              Next Steps<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="nextSteps"
              name="nextSteps"
              value={formData.nextSteps}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-buttons">
            <button type="submit" className="immunization-record-form-submit-btn">
              Submit
            </button>
            <button
              type="button"
              className="immunization-record-form-submit-btn"
              onClick={() =>
                setFormData({
                  emergencyDateTime: '',
                  natureOfEmergency: '',
                  symptoms: '',
                  vitalSigns: '',
                  treatmentGiven: '',
                  doctorNotes: '',
                  nextSteps: '',
                })
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaediatricProgressNotesForm;
/* Mohini_PaediatricProgressNotesForm_WholePage_3/oct/24 */
