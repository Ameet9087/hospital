/* Mohini_DischargeSummaryForm_WholePage_3/oct/24 */
import React, { useState } from 'react';
import './PaediatricVitalsExaminationForm.css'; 

const DischargeSummaryForm = () => {
  const [formData, setFormData] = useState({
    dischargeDate: '',
    finalDiagnosis: '',
    treatmentGiven: '',
    medications: '',
    followUpInstructions: '',
    dietaryInstructions: '',
    doctorNotes: '',
    parentAcknowledgement: false,
    dischargeDiagnosis: '',
    hospitalStaySummary: '',
    dischargeCondition: '',
    followUpAppointments: '',
    homeCareInstructions: '',
    referralToOutpatient: '',
    instructionsGiven: '',
    guardianSignature: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="immunization-record-form-container">
      <h2 className="immunization-record-form-title">Discharge Summary Form</h2>
      <form onSubmit={handleSubmit} className="immunization-record-form">
        <div className="immunization-record-form-left">
          <div className="immunization-record-form-group">
            <label htmlFor="dischargeDate" className="immunization-record-form-label">
              Discharge Date<span className="mandatory"> *</span>:
            </label>
            <input
              type="date"
              id="dischargeDate"
              name="dischargeDate"
              value={formData.dischargeDate}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="finalDiagnosis" className="immunization-record-form-label">
              Final Diagnosis<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="finalDiagnosis"
              name="finalDiagnosis"
              value={formData.finalDiagnosis}
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
            <label htmlFor="medications" className="immunization-record-form-label">
              Medications<span className="mandatory"> *</span>:
            </label>
            <input
              type="text"
              id="medications"
              name="medications"
              value={formData.medications}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          {/* New Fields Start Here */}
          <div className="immunization-record-form-group">
            <label htmlFor="dischargeDiagnosis" className="immunization-record-form-label">
              Discharge Diagnosis:
            </label>
            <input
              type="text"
              id="dischargeDiagnosis"
              name="dischargeDiagnosis"
              value={formData.dischargeDiagnosis}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="hospitalStaySummary" className="immunization-record-form-label">
              Summary of Hospital Stay:
            </label>
            <textarea
              id="hospitalStaySummary"
              name="hospitalStaySummary"
              value={formData.hospitalStaySummary}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            ></textarea>
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="dischargeCondition" className="immunization-record-form-label">
              Discharge Condition:
            </label>
            <input
              type="text"
              id="dischargeCondition"
              name="dischargeCondition"
              value={formData.dischargeCondition}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="followUpAppointments" className="immunization-record-form-label">
              Follow-Up Appointments:
            </label>
            <input
              type="text"
              id="followUpAppointments"
              name="followUpAppointments"
              value={formData.followUpAppointments}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="homeCareInstructions" className="immunization-record-form-label">
              Home Care Instructions:
            </label>
            <textarea
              id="homeCareInstructions"
              name="homeCareInstructions"
              value={formData.homeCareInstructions}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            ></textarea>
          </div>

          

         

        
          {/* New Fields End Here */}
        </div>

        <div className="immunization-record-form-right">
        <div className="immunization-record-form-group">
            <label htmlFor="referralToOutpatient" className="immunization-record-form-label">
              Referral to Outpatient Services (if needed):
            </label>
            <input
              type="text"
              id="referralToOutpatient"
              name="referralToOutpatient"
              value={formData.referralToOutpatient}
              onChange={handleInputChange}
              className="immunization-record-form-input"
            />
          </div>
        <div className="immunization-record-form-group">
            <label htmlFor="guardianSignature" className="immunization-record-form-label">
              Signature of Parent/Guardian:
            </label>
            <input
              type="text"
              id="guardianSignature"
              name="guardianSignature"
              value={formData.guardianSignature}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>
          <div className="immunization-record-form-group">
            <label htmlFor="followUpInstructions" className="immunization-record-form-label">
              Follow-Up Instructions:
            </label>
            <input
              type="text"
              id="followUpInstructions"
              name="followUpInstructions"
              value={formData.followUpInstructions}
              onChange={handleInputChange}
              className="immunization-record-form-input"
              required
            />
          </div>

          <div className="immunization-record-form-group">
            <label htmlFor="dietaryInstructions" className="immunization-record-form-label">
              Dietary Instructions:
            </label>
            <input
              type="text"
              id="dietaryInstructions"
              name="dietaryInstructions"
              value={formData.dietaryInstructions}
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
            <label htmlFor="parentAcknowledgement" className="immunization-record-form-label">
              Parent Acknowledgement:
            </label>
            <input
              type="checkbox"
              id="parentAcknowledgement"
              name="parentAcknowledgement"
              checked={formData.parentAcknowledgement}
              onChange={handleInputChange}
              className="immunization-record-form-input-checkbox"
            />
          </div>
          <div className="immunization-record-form-group">
            <label htmlFor="instructionsGiven" className="immunization-record-form-label">
              Discharge Instructions Given and Understood:
            </label>
            <input
              type="checkbox"
              id="instructionsGiven"
              name="instructionsGiven"
              checked={formData.instructionsGiven}
              onChange={handleInputChange}
              className="immunization-record-form-input-checkbox"
              required
            />
          </div>
        </div>

        <button type="submit" className="immunization-record-form-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DischargeSummaryForm;
/* Mohini_DischargeSummaryForm_WholePage_3/oct/24 */