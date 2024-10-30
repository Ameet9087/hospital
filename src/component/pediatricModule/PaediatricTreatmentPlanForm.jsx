/* Mohini_PaediatricTreatmentPlanForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PaediatricVitalsExaminationForm.css'; // Ensure correct CSS file is linked

const PaediatricTreatmentPlanForm = () => {
  const [formData, setFormData] = useState({
    primaryDiagnosis: '',
    secondaryDiagnoses: '',
    icd10Codes: '',
    medications: '',
    ivFluids: '',
    nutritionPlan: '',
    therapies: '',
    specialInstructions: '',
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
      <h2 className="immunization-record-form-title">Paediatric Treatment Plan Form</h2>
      <form onSubmit={handleSubmit} className="immunization-record-form">
        <div className="immunization-record-form-left">
          <div className="immunization-record-form-group">
            <label htmlFor="primaryDiagnosis" className="immunization-record-form-label">
              Primary Diagnosis<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="primaryDiagnosis"
              name="primaryDiagnosis"
              value={formData.primaryDiagnosis}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="secondaryDiagnoses" className="immunization-record-form-label">
              Secondary Diagnoses:
            </label>
            <input
              type="text"
              id="secondaryDiagnoses"
              name="secondaryDiagnoses"
              value={formData.secondaryDiagnoses}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="icd10Codes" className="immunization-record-form-label">
              ICD-10 Codes:
            </label>
            <input
              type="text"
              id="icd10Codes"
              name="icd10Codes"
              value={formData.icd10Codes}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            />
          </div>
        </div>

        <div className="immunization-record-form-right">
          <div className="immunization-record-form-group">
            <label htmlFor="medications" className="immunization-record-form-label">
              Medications (name, dosage, route, frequency):
            </label>
            <textarea
              id="medications"
              name="medications"
              value={formData.medications}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            ></textarea>
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="ivFluids" className="immunization-record-form-label">
              IV Fluids (type, rate):
            </label>
            <input
              type="text"
              id="ivFluids"
              name="ivFluids"
              value={formData.ivFluids}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="nutritionPlan" className="immunization-record-form-label">
              Nutrition Plan (e.g., feeding, formula, TPN):
            </label>
            <input
              type="text"
              id="nutritionPlan"
              name="nutritionPlan"
              value={formData.nutritionPlan}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="therapies" className="immunization-record-form-label">
              Physiotherapy or Other Therapies:
            </label>
            <input
              type="text"
              id="therapies"
              name="therapies"
              value={formData.therapies}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="specialInstructions" className="immunization-record-form-label">
              Special Instructions (e.g., precautions, specific care guidelines):
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              className="immunization-record-form-input"
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
                  primaryDiagnosis: '',
                  secondaryDiagnoses: '',
                  icd10Codes: '',
                  medications: '',
                  ivFluids: '',
                  nutritionPlan: '',
                  therapies: '',
                  specialInstructions: '',
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

export default PaediatricTreatmentPlanForm;
/* Mohini_PaediatricTreatmentPlanForm_WholePage_3/oct/24 */
