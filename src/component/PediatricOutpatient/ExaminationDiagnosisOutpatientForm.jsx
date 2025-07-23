import React, { useState,useEffect } from 'react';
import './PatientOutPatientRegistrationForm.css';

const ExaminationDiagnosisOutpatientForm = ({sendExamination,examination}) => {
  const [formData, setFormData] = useState({
    generalAppearance: '',
    skin: '',
    heent: '',
    chest: '',
    cardio: '',
    abdomen: '',
    neurological: '',
    development: '',
    provisionalDiagnosis: '',
    differentialDiagnosis: '',
  });

  useEffect(() => {
    setFormData({
      generalAppearance: examination?.generalAppearance || "",
      skin: examination?.skin || "",
      heent: examination?.heent || "",
      chest: examination?.chest || "",
      cardio: examination?.cardio || "",
      abdomen: examination?.abdomen || "",
      neurological: examination?.neurological || "",
      development: examination?.development || "",
      provisionalDiagnosis: examination?.provisionalDiagnosis || "",
      differentialDiagnosis: examination?.differentialDiagnosis || "",
      
    });
  }, [examination]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendExamination(formData)
    alert("Examination Saved Successfully ")
   
  };

  return (
    <div className="patient-outpatient-register-form-container">
      <h2 className="patient-outpatient-register-form-title">Examination & Diagnosis Form</h2>
      <form className="patient-outpatient-register-form"  onSubmit={handleSubmit} >
        <div className="patient-outpatient-register-form-left">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="generalAppearance" className="patient-outpatient-register-form-label">General Appearance</label>
            <input
              type="text"
              id="generalAppearance"
              name="generalAppearance"
              value={formData.generalAppearance}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="skin" className="patient-outpatient-register-form-label">Skin</label>
            <input
              type="text"
              id="skin"
              name="skin"
              value={formData.skin}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="heent" className="patient-outpatient-register-form-label">HEENT (Head, Eyes, Ears, Nose, Throat)</label>
            <input
              type="text"
              id="heent"
              name="heent"
              value={formData.heent}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="chest" className="patient-outpatient-register-form-label">Chest</label>
            <input
              type="text"
              id="chest"
              name="chest"
              value={formData.chest}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="cardio" className="patient-outpatient-register-form-label">Cardio</label>
            <input
              type="text"
              id="cardio"
              name="cardio"
              value={formData.cardio}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>

        <div className="patient-outpatient-register-form-right">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="abdomen" className="patient-outpatient-register-form-label">Abdomen</label>
            <input
              type="text"
              id="abdomen"
              name="abdomen"
              value={formData.abdomen}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="neurological" className="patient-outpatient-register-form-label">Neurological</label>
            <input
              type="text"
              id="neurological"
              name="neurological"
              value={formData.neurological}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="development" className="patient-outpatient-register-form-label">Development</label>
            <input
              type="text"
              id="development"
              name="development"
              value={formData.development}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="provisionalDiagnosis" className="patient-outpatient-register-form-label">Provisional Diagnosis</label>
            <input
              type="text"
              id="provisionalDiagnosis"
              name="provisionalDiagnosis"
              value={formData.provisionalDiagnosis}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="differentialDiagnosis" className="patient-outpatient-register-form-label">Differential Diagnosis</label>
            <input
              type="text"
              id="differentialDiagnosis"
              name="differentialDiagnosis"
              value={formData.differentialDiagnosis}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>
        <div className="patient-outpatient-register-form-group">
          <button type="submit" className="register-button">Add Examination</button>
        </div>
      </form>
    </div>
  );
};

export default ExaminationDiagnosisOutpatientForm;
