/* Mohini_NursingCarePlanForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PaediatricVitalsExaminationForm.css'; // Ensure correct CSS file is linked

const NursingCarePlanForm = () => {
  const [formData, setFormData] = useState({
    observationOfVitals: '',
    administrationOfMedications: '',
    patientComfortPositioning: '',
    feedingSchedule: '',
    painManagement: '',
    monitoringForComplications: '',
    documentationOfNursingInterventions: '',
    feedingOutputChart: '',
    fluidBalanceChart: '',
    observationOfBehavioralChanges: '',
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
      <h2 className="immunization-record-form-title">Nursing Care Plan Form</h2>
      <form onSubmit={handleSubmit} className="immunization-record-form">
        <div className="immunization-record-form-left">
          <div className="immunization-record-form-group">
            <label htmlFor="observationOfVitals" className="immunization-record-form-label">
              Observation of Vitals:
            </label>
            <input
              type="text"
              id="observationOfVitals"
              name="observationOfVitals"
              value={formData.observationOfVitals}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="administrationOfMedications" className="immunization-record-form-label">
              Administration of Medications<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="administrationOfMedications"
              name="administrationOfMedications"
              value={formData.administrationOfMedications}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="patientComfortPositioning" className="immunization-record-form-label">
              Patient Comfort and Positioning<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="patientComfortPositioning"
              name="patientComfortPositioning"
              value={formData.patientComfortPositioning}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="feedingSchedule" className="immunization-record-form-label">
              Feeding Schedule<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="feedingSchedule"
              name="feedingSchedule"
              value={formData.feedingSchedule}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="painManagement" className="immunization-record-form-label">
              Pain Management<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="painManagement"
              name="painManagement"
              value={formData.painManagement}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="monitoringForComplications" className="immunization-record-form-label">
              Monitoring for Complications:
            </label>
            <input
              type="text"
              id="monitoringForComplications"
              name="monitoringForComplications"
              value={formData.monitoringForComplications}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="documentationOfNursingInterventions" className="immunization-record-form-label">
              Documentation of Nursing Interventions:
            </label>
            <textarea
              id="documentationOfNursingInterventions"
              name="documentationOfNursingInterventions"
              value={formData.documentationOfNursingInterventions}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            ></textarea>
          </div>
        </div>

        <div className="immunization-record-form-right">
          <div className="immunization-record-form-group">
            <label htmlFor="feedingOutputChart" className="immunization-record-form-label">
              Feeding and Output Chart:
            </label>
            <input
              type="text"
              id="feedingOutputChart"
              name="feedingOutputChart"
              value={formData.feedingOutputChart}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="fluidBalanceChart" className="immunization-record-form-label">
              Fluid Balance Chart:
            </label>
            <input
              type="text"
              id="fluidBalanceChart"
              name="fluidBalanceChart"
              value={formData.fluidBalanceChart}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="observationOfBehavioralChanges" className="immunization-record-form-label">
              Observation of Behavioral Changes:
            </label>
            <textarea
              id="observationOfBehavioralChanges"
              name="observationOfBehavioralChanges"
              value={formData.observationOfBehavioralChanges}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            ></textarea>
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
                  observationOfVitals: '',
                  administrationOfMedications: '',
                  patientComfortPositioning: '',
                  feedingSchedule: '',
                  painManagement: '',
                  monitoringForComplications: '',
                  documentationOfNursingInterventions: '',
                  feedingOutputChart: '',
                  fluidBalanceChart: '',
                  observationOfBehavioralChanges: '',
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

export default NursingCarePlanForm;
/* Mohini_NursingCarePlanForm_WholePage_3/oct/24 */