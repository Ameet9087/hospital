import React, { useState, useEffect } from 'react';
import './AdmissionSlip.css';
import axios from 'axios';
import { API_BASE_URL } from "../api/api";

const AdmissionSlip = ({ inPatientId, outPatientId }) => {

  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [mrNo, setMrNo] = useState('');
  const [department, setDepartment] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [admissionTime, setAdmissionTime] = useState('');
  const [admittingDoctor, setAdmittingDoctor] = useState('');
  const [consultant, setConsultant] = useState('');
  const [caseType, setCaseType] = useState('');
  const [surgeryDate, setSurgeryDate] = useState('');
  const [surgeon, setSurgeon] = useState('');
  const [surgericalProcedure, setSurgicalProcedure] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [reasonForAdmission, setReasonForAdmission] = useState('');
  const [patientType, setPatientType] = useState('');
  const [emergencyAdmission, setEmergencyAdmission] = useState(false);
  const [addmissionSlip, setaddmissionSlip] = useState([]);



  const handleCancel = () => {
    setPatientName('');
    setAge('');
    setPatientType('');
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
      mrNo,
      department,
      admissionDate,
      admissionTime,
      admittingDoctor,
      consultant,
      reasonForAdmission,
      emergencyAdmission: emergencyAdmission ? 'YES' : 'NO',
      surgeon,
      surgericalProcedure,
      patientType,
      ...(inPatientId
        ? { inPatient: { inPatientId } }
        : { outPatient: { outPatientId } }),
    };

    // Send data to the backend
    axios
      .post(`${API_BASE_URL}/admissionsSlip`, formData)
      .then((response) => {
        console.log('Admission Slip submitted successfully:', response.data);
        alert("Admission Slip submitted successfully");
      })
      .catch((error) => {
        console.error('Error submitting Admission Slip:', error);
        console.log(formData);

      });

  };

  useEffect(() => {
    fetchAddmissionSlip();
  }, []);

  const fetchAddmissionSlip = async () => {
    try {
      let endpoint = "";

      if (inPatientId) {
        endpoint = `${API_BASE_URL}/admissionsSlip/in-patient/${inPatientId}`;
      } else if (outPatientId) {
        endpoint = `${API_BASE_URL}/admissionsSlip/out-patient/${outPatientId}`;
      } else {
        console.error("No valid patient ID provided for Addmission Slip.");
        return;
      }

      const response = await axios.get(endpoint);
      setaddmissionSlip(response.data);
    } catch (error) {
      console.error("Error fetching Addmission Slip:", error);
    }
  };

  return (
    <div className="AdmissionSlip-container">
      <h3>Admission Slip</h3>

      <form onSubmit={handleSubmit}>
        <div className="AdmissionSlip-content">
          <div className="AdmissionSlip-left">
            {/* <div className="AdmissionSlip-group">
              <label htmlFor="patientId">Select Patient :</label>
              <select
                id="patientId"
                value={patientId}
                onChange={handlePatientChange}
                required
              >
                <option value="">Select Patient</option>
                {patients.map((patient) => (
                  <option key={patient.inPatientId} value={patient.inPatientId}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="AdmissionSlip-group">
              <label htmlFor="patientName">Patient Name :</label>
              <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="caseType">Patient Type :</label>
              <select
                id="caseType"
                value={patientType}
                onChange={(e) => setPatientType(e.target.value)}
                required
              >
                <option value="">Select Patient Type</option>
                <option value="InPatient">In Patient</option>
                <option value="OutPatient">Out Patient</option>
              </select>
            </div>

            <div className="AdmissionSlip-group">
              <label htmlFor="age">Age :</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                  <label htmlFor="surgericalProcedure">Surgical Procedure :</label>
                  <input
                    type="text"
                    id="surgericalProcedure"
                    value={surgericalProcedure}
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
          <button
            type="button"
            onClick={handleCancel}
            className="AdmissionSlip-cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="AdmissionSlip-submit-btn">
            Submit
          </button>
        </div>
      </form>
      
      <div className="ReferralConsultation-existing-referrals">
        <h4>Existing Addmission Slip:</h4>
        {addmissionSlip.length > 0 ? (
          <table className="ReferralConsultation-table">
            <thead>
              <tr>
                <th>SN </th>
                <th>Department </th>
                <th>Addmission Date</th>
                <th>Reason for Addmission</th>
                <th>Consultant</th>
              </tr>
            </thead>
            <tbody>
              {addmissionSlip.map((addSlip, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{addSlip.department}</td>
                  <td>{addSlip.admissionDate}</td>
                  <td>{addSlip.reasonForAdmission}</td>
                  <td>{addSlip.consultant}</td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No existing referrals found.</p>
        )}
      </div>
    </div>
  );
};

export default AdmissionSlip;
