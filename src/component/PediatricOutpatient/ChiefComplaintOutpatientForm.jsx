import React, { useState,useEffect } from 'react';
import './PatientOutPatientRegistrationForm.css';

const ChiefComplaintOutpatientForm = ({sendChiefComplaint,chiefComplaint}) => {
  const [formData, setFormData] = useState({
    chiefComplaintId: '',
    description: '',
    duration: '',
    onset: '',
    severity: '',
    associatedSymptoms: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData({
      chiefComplaintId: chiefComplaint?.chiefComplaintId || "",
      description: chiefComplaint?.description || "",
      duration: chiefComplaint?.duration || "",
      onset: chiefComplaint?.onset || "",
      severity: chiefComplaint?.severity || "",
      associatedSymptoms: chiefComplaint?.associatedSymptoms || "",
     
    });
  }, [chiefComplaint]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendChiefComplaint(formData);
    console.log(formData);
    alert("Chief Complaint Saved Successfully ")
   
  };


  return (
    <div className="patient-outpatient-register-form-container">
      <h2 className="patient-outpatient-register-form-title">Chief Complaint Form</h2>
      <form className="patient-outpatient-register-form"  onSubmit={handleSubmit}>
        <div className="patient-outpatient-register-form-left">
          {/* <div className="patient-outpatient-register-form-group">
            <label htmlFor="chiefComplaintId" className="patient-outpatient-register-form-label">Chief Complaint ID</label>
            <input
              type="text"
              id="chiefComplaintId"
              name="chiefComplaintId"
              value={formData.chiefComplaintId}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div> */}

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="description" className="patient-outpatient-register-form-label">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="duration" className="patient-outpatient-register-form-label">Duration</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>

        <div className="patient-outpatient-register-form-right">
          <div className="patient-outpatient-register-form-group">
            <label htmlFor="onset" className="patient-outpatient-register-form-label">Onset</label>
            <input
              type="text"
              id="onset"
              name="onset"
              value={formData.onset}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="severity" className="patient-outpatient-register-form-label">Severity</label>
            <input
              type="text"
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>

          <div className="patient-outpatient-register-form-group">
            <label htmlFor="associatedSymptoms" className="patient-outpatient-register-form-label">Associated Symptoms</label>
            <input
              type="text"
              id="associatedSymptoms"
              name="associatedSymptoms"
              value={formData.associatedSymptoms}
              onChange={handleInputChange}
              className="patient-outpatient-register-form-input"
            />
          </div>
        </div>
        <div className="patient-outpatient-register-form-group">
          <button type="submit" className="register-button">Add Chief Complaint</button>
        </div>
      </form>
    </div>
  );
};

export default ChiefComplaintOutpatientForm;
