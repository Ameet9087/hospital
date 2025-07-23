import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../api/api";
import "./helpDeskWardPatientDetails.css";

function HelpDeskWardPatientDetails({ id, wardName, setIsWardSelected }) {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const patientData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/admissions/ward-data/${id}`
        );
        if (response && response.data) {
          const filteredPatients = response.data.filter(
            (patient) =>
              patient.patientId != null &&
              patient.patientFirstName != null &&
              patient.patientLastName != null
          );

          setPatients(filteredPatients);
        }
      } catch (err) {
        console.log(err);
      }
    };
    patientData();
  }, [id]);

  const handleBackClick = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div className="ward-container">
      <div className="ward-header">
        <button
          className="back-button"
          onClick={() => setIsWardSelected(false)}
        >
          ←
        </button>
        <h2>Total Patient: {patients?.length}</h2>
        <h2>{wardName}</h2>
        <span className="ward-date">{new Date().toLocaleString()}</span>
      </div>

      <table className="ward-table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Admitted Date</th>
            <th>Patient Name</th>
            <th>Age / Sex</th>
            <th>Bed Detail</th>
            <th>Admitting Doctor</th>
            <th>Care Of Person</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.id} className={index % 2 === 1 ? "gray-row" : ""}>
              <td>{patient.patientId}</td>
              <td>{patient.admissionDate}</td>
              <td>
                {patient.patientFirstName} {patient.patientLastName}
              </td>
              <td>{`${patient.patientAge} ${patient.patientAgeUnit} / ${patient.patientGender}`}</td>
              <td>Bed #{patient.bedNumber}</td>
              <td>
                {patient.doctorSalutationName} {patient.doctorFirstName}{" "}
                {patient.doctorLastName}
              </td>
              <td>{patient.careOfPerson}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HelpDeskWardPatientDetails;
