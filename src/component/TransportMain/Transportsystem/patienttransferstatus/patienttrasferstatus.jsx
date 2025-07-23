import React, { useState, useEffect } from 'react';
import './patienttransferstatus.css';
import { API_BASE_URL } from '../../../api/api';

function Patienttrasferstatus() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transport-info`);
        const data = await response.json();
        setPatients(data);
        console.log("patients:", data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleStatusChange = (patient) => {
    setSelectedPatient(patient);
  };

  const handleConfirmTransport = async () => {
    if (!selectedPatient) return;

    const updateUrl = `${API_BASE_URL}/transport-info/${selectedPatient.transportInfoId}`;
    console.log('URL:', updateUrl);

    const payload = {
      transportStatus: 'Transported',
      ambulance: {
        ambulanceId: patients.ambulanceId
      },
    };
    console.log('Payload:', JSON.stringify(payload));
    console.log(JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedPatient = await response.json();
      console.log('Updated patient:', updatedPatient);

      setPatients(
        patients.map((patient) =>
          patient.transportInfoId === selectedPatient.transportInfoId
            ? { ...patient, transportStatus: 'Transported' }
            : patient
        )
      );
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert(`Error updating status: ${error.message}`);
    }
  };
  return (
    <div className="patient-transport-status-container" style={{ background: "#e3fffe" }}>
      <table className="patient-transport-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Transport Mode</th>
            <th>Ambulance Driver</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.transportInfoId}>
              <td>
                {`${patient.inPatient?.patient?.firstName || ''} 
                  ${patient.inPatient?.patient?.middleName || ''} 
                  ${patient.inPatient?.patient?.lastName || ''}`.trim()}
              </td>
              <td>{patient.modeOfTransport}</td>
              <td>{patient.modeOfTransport === 'Ambulance' ? patient.ambulance?.driver : 'N/A'}</td>
              <td>{patient.transportStatus}</td>
              <td>
                {patient.transportStatus === 'pending' ? (
                  <button
                    className="patienttransport-action-btn"
                    onClick={() => handleStatusChange(patient)}
                  >
                    Change Status
                  </button>
                ) : (
                  <span className="patienttransport-successful">Successful</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPatient && (
        <div className="patienttransport-modal">
          <div className="patienttransport-modal-content">
            <h3>Confirm Transport Status</h3>
            <p>
              Are you sure you want to mark {`${selectedPatient.inPatient?.patient?.firstName || ''} 
                  ${selectedPatient.inPatient?.patient?.middleName || ''} 
                  ${selectedPatient.inPatient?.patient?.lastName || ''}`.trim()} as "Transported"?
            </p>
            <button className="patienttransport-confirm-btn" onClick={handleConfirmTransport}>
              Yes
            </button>
            <button className="patienttransport-cancel-btn" onClick={() => setSelectedPatient(null)}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Patienttrasferstatus;
