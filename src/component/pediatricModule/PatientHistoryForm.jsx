/* Mohini_PatientHistoryForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PediatricPatientRegistrationForm.css'; // Import the CSS for styling

const PatientHistoryForm = () => {
  const [formData, setFormData] = useState({
    chronicIllnesses: '',
    previousHospitalizations: '',
    immunizationHistory: '',
    growthDevelopmentHistory: '',
    familyHistory: '',
    gestationAgeAtBirth: '',
    birthWeight: '',
    deliveryType: '',
    birthComplications: '',
    neonatalICUAdmission: '',
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
    <div className="pediatric-patient-registration-form-container">
      <h2 className="pediatric-patient-registration-form-title">Paediatric Medical History Form</h2>
      <form onSubmit={handleSubmit} className="pediatric-patient-registration-form">
        <div className="pediatric-patient-registration-form-left">
          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="chronicIllnesses" className="pediatric-patient-registration-form-label">
              History of Chronic Illnesses:
            </label>
            <textarea
              id="chronicIllnesses"
              name="chronicIllnesses"
              value={formData.chronicIllnesses}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="previousHospitalizations" className="pediatric-patient-registration-form-label">
              Previous Hospitalizations/Surgeries <span className="mandatory"> *</span>:
            </label>
            <textarea
              id="previousHospitalizations"
              name="previousHospitalizations"
              value={formData.previousHospitalizations}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="immunizationHistory" className="pediatric-patient-registration-form-label">
              Immunization History:
            </label>
            <textarea
              id="immunizationHistory"
              name="immunizationHistory"
              value={formData.immunizationHistory}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="growthDevelopmentHistory" className="pediatric-patient-registration-form-label">
              Growth and Development History<span className="mandatory"> *</span>:
            </label>
            <textarea
              id="growthDevelopmentHistory"
              name="growthDevelopmentHistory"
              value={formData.growthDevelopmentHistory}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="familyHistory" className="pediatric-patient-registration-form-label">
              Family History<span className="mandatory"> *</span>:
            </label>
            <textarea
              id="familyHistory"
              name="familyHistory"
              value={formData.familyHistory}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>
        </div>

        <div className="pediatric-patient-registration-form-right">
          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="gestationAgeAtBirth" className="pediatric-patient-registration-form-label">
              Gestation Age at Birth<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="gestationAgeAtBirth"
              name="gestationAgeAtBirth"
              value={formData.gestationAgeAtBirth}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="birthWeight" className="pediatric-patient-registration-form-label">
              Birth Weight<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="birthWeight"
              name="birthWeight"
              value={formData.birthWeight}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="deliveryType" className="pediatric-patient-registration-form-label">
              Type of Delivery<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="deliveryType"
              name="deliveryType"
              value={formData.deliveryType}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="birthComplications" className="pediatric-patient-registration-form-label">
              Complications During Birth:
            </label>
            <input
              type="text"
              id="birthComplications"
              name="birthComplications"
              value={formData.birthComplications}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-form-group">
            <label htmlFor="neonatalICUAdmission" className="pediatric-patient-registration-form-label">
              Neonatal ICU Admission:
            </label>
            <input
              type="text"
              id="neonatalICUAdmission"
              name="neonatalICUAdmission"
              value={formData.neonatalICUAdmission}
              onChange={handleInputChange}
              className="pediatric-patient-registration-form-input"
            />
          </div>

          <div className="pediatric-patient-registration-button">
            <button type="submit" className="pediatric-patient-registration-form-submit-btn">Submit</button>
            <button type="button" className="pediatric-patient-registration-form-submit-btn" onClick={() => setFormData({})}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientHistoryForm;
/* Mohini_PatientHistoryForm_WholePage_3/oct/24 */
