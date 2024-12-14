import React, { useState, useEffect } from 'react';
// import './nurseClearanceTable.css';
import NurseClearanceFormPopUp from './nurseclearencepopupform';

const NurseClearanceTable = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]); // State for storing data

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.124:8080/api/ip-admissions');
        const jsonData = await response.json();
        setData(jsonData); // Store the data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  const openPopup = (id) => {
    setSelectedPatientId(id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedPatientId(null);
    setShowPopup(false);
  };

  return (
    <div className="nurseClearanceTable">
      <h2>Nurse Clearance Table</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th> {/* Added Patient Name header */}
            <th>Medicines Returned</th>
            <th>Medicines Indented</th>
            <th>Room Inventory</th>
            <th>ID Band Removed</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.ipAdmmissionId}>
              <td>{row.ipAdmmissionId}</td>
              <td>{row.patient.firstName} {row.patient.middleName} {row.patient.lastName}</td> {/* Display Patient Name */}
              <td>{row.patientStatus}</td>
              <td>{row.financials.sourceOfAdmission}</td>
              <td>{row.admissionUnderDoctorDetail.diagnosis}</td>
              <td>{row.roomDetails.roomDTO.roomNumber}</td>
              <td>{row.financials.currentDiscountPolicy}</td>
              <td>
                <button className="discharge-nurseaction" onClick={() => openPopup(row)}>
                  Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPopup && <NurseClearanceFormPopUp patientId={selectedPatientId} onClose={closePopup} />
}
    </div>
  );
};

export default NurseClearanceTable;

