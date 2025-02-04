import React, { useState, useEffect } from "react";
import "./clinicalAssesment.css";
import ClinicalBookAdmission from "./ClinicalBookAdmission";
import { API_BASE_URL } from "../../api/api";

function ClinicalAssessment() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  // const [isClinicalBooking, setIsClinicalBooking] = useState(false);
  const [activeTab, setActiveTab] = useState("Lab");

  useEffect(() => {
    // Fetch all patients on component mount
    fetch(`${API_BASE_URL}/patients/getAllPatients`)
      .then((response) => response.json())
      .then((data) => setPatients(data))
      .catch((error) => console.error("Error fetching patients:", error));
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) => {
        const nameMatch = patient.firstName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const idMatch = patient.patientId?.toString().includes(searchTerm);
        return nameMatch || idMatch;
      })
    );
  }, [searchTerm, patients]);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(""); // Clear search input after selecting a patient
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  // const handleBookAdmission = () => {
  //   setIsClinicalBooking(true);
  // };

  const handleClose = () => {
    setIsClinicalBooking(false);
  };

  return (
    <div className="ClinicalAssessment">
      <div className="ClinicalAssessment-patientInfo">
        <label>
          Select Patient :
          <input
            className="ClinicalAssessment-searchInput"
            type="text"
            placeholder="Search By Hospital No/Patient Name"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </label>
        {searchTerm && filteredPatients.length > 0 && (
          <div className="ClinicalAssessment-patientList">
            {filteredPatients.map((patient) => (
              <div
                key={patient.patientId}
                className={`ClinicalAssessment-patientItem ${
                  selectedPatient?.patientId === patient.patientId
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleSelectPatient(patient)}
              >
                {patient?.firstName} (ID: {patient.patientId})
              </div>
            ))}
          </div>
        )}
        <div className="ClinicalAssessment-patientDetails">
          <p>
            Patient Name: {selectedPatient?.firstName || ""}{" "}
            {selectedPatient?.middleName || ""}{" "}
            {selectedPatient?.lastName || ""}
          </p>
          <p>
            Age/Sex: {selectedPatient?.age || ""} /
            {selectedPatient?.gender || ""}
          </p>
          <p>
            Address: {selectedPatient?.addresses?.street1},
            {selectedPatient?.addresses?.street2 } ,
            {selectedPatient?.addresses?.city },
            {selectedPatient?.addresses?.zipCode } ,
            {selectedPatient?.addresses?.county }
          </p>
          <p>Hospital No: {selectedPatient?.hospitalNo || ""}</p>
          <p>Contact No: {selectedPatient?.phoneNumber || ""}</p>
        </div>
      </div>

      <div className="ClinicalAssessment-mainsection">
        <div className="ClinicalAssesment-tablesection">
          <div className="ClinicalAssessment-investigation">
            <h2>Investigation</h2>
            <div className="ClinicalAssessment-tabs">
              <button
                className={`ClinicalAssessment-tab ${
                  activeTab === "Lab" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Lab")}
              >
                Lab
              </button>
              <button
                className={`ClinicalAssessment-tab ${
                  activeTab === "Imaging" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Imaging")}
              >
                Imaging
              </button>
              <button
                className={`ClinicalAssessment-tab ${
                  activeTab === "Requested" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Requested")}
              >
                Requested
              </button>
            </div>
            <table className="ClinicalAssessment-table">
              <thead>
                <tr>
                  <th>Investigation Name</th>
                  {activeTab === "Requested" && <th>Type</th>}
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>{/* Add table rows here */}</tbody>
            </table>
          </div>

          <div className="ClinicalAssessment-medication">
            <h2>Medication</h2>
            <table className="ClinicalAssessment-table">
              <thead>
                <tr>
                  <th>Generic Name</th>
                  <th>Brand</th>
                  <th>Frequency</th>
                  <th>Dose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>{/* Add table rows here */}</tbody>
            </table>
          </div>

          <div className="ClinicalAssessment-followUp">
            <label>Follow Up Date:</label>
            <input type="date" defaultValue="2024-08-19" />
          </div>

          <div className="ClinicalAssessment-actions">
            <button
              disabled={!selectedPatient}
              className="ClinicalAssessment-button ClinicalAssessment-bookAdmission"
            >
              Book Admission
            </button>
          </div>
        </div>
      </div>
      {/* {isClinicalBooking && (
        <ClinicalBookAdmission
          selectedPatient={selectedPatient}
          onclose={handleClose}
        />
      )} */}
    </div>
  );
}

export default ClinicalAssessment;
