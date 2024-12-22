import React, { useState, useEffect, useRef } from "react";
import "./Patient.css";
import EmergencyPatientRegistration from "../Emergency/Registration";
import { useReactToPrint } from "react-to-print";
import { startResizing } from "../TableHeadingResizing/resizableColumns";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [showRegistration, setShowRegistration] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [triagedPatients, setTriagedPatients] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://192.168.0.118:8081/api/emergency-patients");
        if (!response.ok) {
          throw new Error("Failed to fetch patients data.");
        }
        const data = await response.json();
        // Assign unique IDs to patients if IDs are missing
        const enrichedData = data.map((patient, index) => ({
          ...patient,
          id: patient.id || `temp-id-${index}`,
        }));
        setPatients(enrichedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleNewRegistrationClick = () => {
    setShowRegistration(true);
  };

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  // Filter patients by name and case type
  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.middleName} ${patient.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" ||
      (patient.caseType && patient.caseType.toLowerCase() === filter.toLowerCase());
    return matchesName && matchesFilter;
  });

  const handleApprovePatient = (patient) => {
    if (!patient.id) {
      console.error("Patient ID is missing. Cannot move to triaged patients.");
      return;
    }

    // Add the patient to triagedPatients
    setTriagedPatients((prev) => [...prev, patient]);

    // Remove the patient from the main patient list
    setPatients((prev) => prev.filter((p) => p.id !== patient.id));
  };

  if (showRegistration) {
    return <EmergencyPatientRegistration />;
  }

  return (
    <div className="patient-list">
      <div className="search-container">
        <div className="filter-container">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All">All</option>
            <option value="General">General</option>
            <option value="Accident">Accident</option>
            <option value="Dog Bite">Dog Bite</option>
            <option value="Snake Bite">Snake Bite</option>
            <option value="Animal Bite">Animal Bite</option>
            <option value="Emergency Labour">Emergency Labour</option>
            <option value="Medico-Legal">Medico-Legal</option>
          </select>
        </div>
        <button className="new-registration-btn" onClick={handleNewRegistrationClick}>
          + New Registration
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-icon">🔍</button>
      </div>

      {loading && <p>Loading patients...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <div className="results-info">
            <span>
              Showing {filteredPatients.length} / {patients.length} results
            </span>
            <button className="Emergency-print-btn" onClick={handlePrint}>
              Print
            </button>
          </div>

          {/* Container for horizontal scrolling */}
          <div className="table-container">
            <table ref={tableRef}>
              <thead>
                <tr>
                  {["ID", "Name", "Age", "Gender", "Case Type", "Actions"].map(
                    (header, index) => (
                      <th
                        key={index}
                        style={{ width: columnWidths[index] }}
                        className="resizable-th"
                      >
                        <div className="header-content">
                          <span>{header}</span>
                          <div
                            className="resizer"
                            onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                          ></div>
                        </div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.caseType}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleApprovePatient(patient)}
                        disabled={!patient.id} // Disable the button if the patient ID is missing
                      >
                        Triaged Patients
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientList;
