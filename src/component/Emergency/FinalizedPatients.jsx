import React from "react";
import { useLocation } from "react-router-dom";
import "./FinalizedPatients.css";

const FinalizedPatients = () => {
  const location = useLocation();
  const { patients = [] } = location.state || {};

  return (
    <div className="finalized-patients">
      <h2>Finalized Patients</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Case Type</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{`${patient.firstName} ${patient.lastName}`}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.caseType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalizedPatients;