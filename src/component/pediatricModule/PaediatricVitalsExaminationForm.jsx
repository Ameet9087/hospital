/* Mohini_PaediatricVitalsExaminationForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PaediatricVitalsExaminationForm.css'; // Ensure correct CSS file is linked

const PaediatricVitalsExaminationForm = () => {
  const [formData, setFormData] = useState({
    temperature: '',
    heartRate: '',
    respiratoryRate: '',
    bloodPressure: '',
    oxygenSaturation: '',
    weight: '',
    height: '',
    headCircumference: '',
    generalAppearance: '',
    cardiovascularExam: '',
    respiratoryExam: '',
    abdomenExam: '',
    neurologicalExam: '',
    skinExam: '',
    developmentalMilestones: '',
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
      <h2 className="immunization-record-form-title">Paediatric Vitals Examination Form</h2>
      <form onSubmit={handleSubmit} className="immunization-record-form">
        <div className="immunization-record-form-left">
          <div className="immunization-record-form-group">
            <label htmlFor="temperature" className="immunization-record-form-label">
              Temperature<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="heartRate" className="immunization-record-form-label">
              Heart Rate<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="respiratoryRate" className="immunization-record-form-label">
              Respiratory Rate<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="respiratoryRate"
              name="respiratoryRate"
              value={formData.respiratoryRate}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="bloodPressure" className="immunization-record-form-label">
              Blood Pressure<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="bloodPressure"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="oxygenSaturation" className="immunization-record-form-label">
              Oxygen Saturation<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="oxygenSaturation"
              name="oxygenSaturation"
              value={formData.oxygenSaturation}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>
        </div>

        <div className="immunization-record-form-right">
          <div className="immunization-record-form-group">
            <label htmlFor="weight" className="immunization-record-form-label">
              Weight<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="height" className="immunization-record-form-label">
              Height<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="headCircumference" className="immunization-record-form-label">
              Head Circumference:
            </label>
            <input
              type="text"
              id="headCircumference"
              name="headCircumference"
              value={formData.headCircumference}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="generalAppearance" className="immunization-record-form-label">
              General Appearance:
            </label>
            <input
              type="text"
              id="generalAppearance"
              name="generalAppearance"
              value={formData.generalAppearance}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="cardiovascularExam" className="immunization-record-form-label">
              Cardiovascular Exam:
            </label>
            <input
              type="text"
              id="cardiovascularExam"
              name="cardiovascularExam"
              value={formData.cardiovascularExam}
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
                  temperature: '',
                  heartRate: '',
                  respiratoryRate: '',
                  bloodPressure: '',
                  oxygenSaturation: '',
                  weight: '',
                  height: '',
                  headCircumference: '',
                  generalAppearance: '',
                  cardiovascularExam: '',
                  respiratoryExam: '',
                  abdomenExam: '',
                  neurologicalExam: '',
                  skinExam: '',
                  developmentalMilestones: '',
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

export default PaediatricVitalsExaminationForm;
/* Mohini_PaediatricVitalsExaminationForm_WholePage_3/oct/24 */
