import React, { useState,useEffect } from 'react';
import './PatientOutPatientRegistrationForm.css';

const VitalSignsInpatientForm = ({sendVitalSigns,VitalSigns}) => {
  const [age, setAge] = useState('');
  const [formData, setFormData] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    headCircumference: '',
  });

  useEffect(() => {
    setFormData({
      temperature: VitalSigns?.temperature || "",
      heartRate: VitalSigns?.heartRate || "",
      bloodPressure: VitalSigns?.bloodPressure || "",
      respiratoryRate: VitalSigns?.respiratoryRate || "",
      weight: VitalSigns?.weight || "",
      height: VitalSigns?.height || "",
      headCircumference: VitalSigns?.headCircumference || "",
    });
  }, [VitalSigns]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    setAge(Math.abs(ageDate.getUTCFullYear() - 1970));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendVitalSigns(formData);
    console.log(formData);
    alert("Vitals Saved Successfully ")
   
  };
  return (
    <div className="patient-outpatient-register-form-container">
      <h2 className="patient-outpatient-register-form-title">Vital Signs Inpatient Form</h2>
      <form className="patient-outpatient-register-form"  onSubmit={handleSubmit} >
        <div className="patient-outpatient-register-form-left">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="temperature" className="patient-outpatient-register-form-label">Temperature (°C)</label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="heartRate" className="patient-outpatient-register-form-label">Heart Rate (bpm)</label>
            <input
              type="text"
              id="heartRate"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="bloodPressure" className="patient-outpatient-register-form-label">Blood Pressure (mmHg)</label>
            <input
              type="text"
              id="bloodPressure"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="respiratoryRate" className="patient-outpatient-register-form-label">Respiratory Rate (breaths/min)</label>
            <input
              type="text"
              id="respiratoryRate"
              name="respiratoryRate"
              value={formData.respiratoryRate}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>

        <div className="patient-outpatient-register-form-right">
          <div className="patient-outpatient-register-form-group">
            <label className="patient-outpatient-register-form-label">Weight (kg)</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label className="patient-outpatient-register-form-label">Height (cm)</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label className="patient-outpatient-register-form-label">Head Circumference (cm)</label>
            <input
              type="text"
              name="headCircumference"
              value={formData.headCircumference}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          {/* <div className="patient-outpatient-register-form-group">
            <label className="patient-outpatient-register-form-label">Age</label>
            <input
              type="text"
              value={age}
              readOnly
              className="patient-outpatient-register-form-input"
            />
          </div> */}
        </div>
        <div className="patient-outpatient-register-form-group">
          <button type="submit" className="register-button">Add Vitals</button>
        </div>
      </form>
    </div>
  );
};

export default VitalSignsInpatientForm;
