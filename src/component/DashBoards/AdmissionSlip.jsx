import React, { useState } from 'react';
import './AdmissionSlip.css';

const AdmissionSlip = () => {
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [department, setDepartment] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [admissionTime, setAdmissionTime] = useState('');
  const [admittingDoctor, setAdmittingDoctor] = useState('');
  const [consultant, setConsultant] = useState('');
  const [caseType, setCaseType] = useState('');
  const [surgeryDate, setSurgeryDate] = useState('');
  const [surgeon, setSurgeon] = useState('');
  const [surgicalProcedure, setSurgicalProcedure] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [reasonForAdmission, setReasonForAdmission] = useState('');
  const [emergencyAdmission, setEmergencyAdmission] = useState(false);

  const handleCancel = () => {
    setPatientId('');
    setPatientName('');
    setAge('');
    setDepartment('');
    setAdmissionDate('');
    setAdmissionTime('');
    setAdmittingDoctor('');
    setConsultant('');
    setCaseType('');
    setSurgeryDate('');
    setSurgeon('');
    setSurgicalProcedure('');
    setPhoneNo('');
    setReasonForAdmission('');
    setEmergencyAdmission(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      patientId,
      patientName,
      age,
      department,
      admissionDate,
      admissionTime,
      admittingDoctor,
      consultant,
      caseType,
      surgeryDate,
      surgeon,
      surgicalProcedure,
      phoneNo,
      reasonForAdmission,
      emergencyAdmission,
    };
    console.log('Form submitted:', formData);
  };

  return (
    <div className="AdmissionSlip-container">
      <h3>Admission Slip</h3>

      <form onSubmit={handleSubmit}>
        
        <div className="AdmissionSlip-content">
          <div className="AdmissionSlip-left">
            <div className="AdmissionSlip-group">
              <label htmlFor="patientId">Patient ID :</label>
              <input
                type="text"
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="patientName">Patient Name :</label>
              <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="age">Age :</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="department">Department :</label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="admissionDate">Admission Date :</label>
              <input
                type="date"
                id="admissionDate"
                value={admissionDate}
                onChange={(e) => setAdmissionDate(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="admissionTime">Admission Time :</label>
              <input
                type="time"
                id="admissionTime"
                value={admissionTime}
                onChange={(e) => setAdmissionTime(e.target.value)}
                required
              />
            </div>
           

            <div className="AdmissionSlip-group">
              <label htmlFor="admittingDoctor">Admitting Doctor :</label>
              <input
                type="text"
                id="admittingDoctor"
                value={admittingDoctor}
                onChange={(e) => setAdmittingDoctor(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="consultant">Consultant :</label>
              <input
                type="text"
                id="consultant"
                value={consultant}
                onChange={(e) => setConsultant(e.target.value)}
                required
              />
            </div>
            </div>

        <div className="AdmissionSlip-group-right"> 
          
            <div className="AdmissionSlip-group">
              <label htmlFor="caseType">Case Type :</label>
              <select
                id="caseType"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                required
              >
                <option value="">Select Case Type</option>
                <option value="Surgical">Surgical</option>
                <option value="Medical">Medical</option>
              </select>
            </div>

            {caseType === 'Surgical' && (
              <>
                <div className="AdmissionSlip-group">
                  <label htmlFor="surgeryDate">Surgery Date :</label>
                  <input
                    type="date"
                    id="surgeryDate"
                    value={surgeryDate}
                    onChange={(e) => setSurgeryDate(e.target.value)}
                    required
                  />
                </div>

                <div className="AdmissionSlip-group">
                  <label htmlFor="surgeon">Surgeon :</label>
                  <input
                    type="text"
                    id="surgeon"
                    value={surgeon}
                    onChange={(e) => setSurgeon(e.target.value)}
                    required
                  />
                </div>

                <div className="AdmissionSlip-group">
                  <label htmlFor="surgicalProcedure">Surgical  Procedure :</label>
                  <input
                    type="text"
                    id="surgicalProcedure"
                    value={surgicalProcedure}
                    onChange={(e) => setSurgicalProcedure(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="AdmissionSlip-group">
              <label htmlFor="phoneNo">Phone No. :</label>
              <input
                type="tel"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="reasonForAdmission">Reason for Admission :</label>
              <textarea
                id="reasonForAdmission"
                value={reasonForAdmission}
                onChange={(e) => setReasonForAdmission(e.target.value)}
                required
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="emergencyAdmission">Is It an Emergency Admission? :</label>
              <input
                type="checkbox"
                id="emergencyAdmission"
                className="AdmissionSlip-group-checkbox"
                checked={emergencyAdmission}
                onChange={() => setEmergencyAdmission(!emergencyAdmission)}
              />
            </div>
          </div>
        </div>

        <div className="AdmissionSlip-group-buttons">
          <button type="button" onClick={handleCancel} className="AdmissionSlip-cancel-btn">
            Cancel
          </button>
          <button type="submit" className="AdmissionSlip-submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionSlip;
