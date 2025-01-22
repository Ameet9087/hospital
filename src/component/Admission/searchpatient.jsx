import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchpatient.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import IpAdmission from "./IpAdmission";

const SearchPatient = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const [admitted, setAdmitted] = useState([]);

  const [admittedPatientsMap, setAdmittedPatientsMap] = useState({}); // To store admission status

  // Fetch data from the new API
  useEffect(() => {
    fetch(`${API_BASE_URL}/patient-register/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Patients:", data); // Log the fetched data
        setPatients(data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);

        // alert(`Error fetching patient data: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/ip-admissions/admitted`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAdmitted(data);
        mapAdmittedPatients(data);
      })
      .catch((error) => console.error("failed to fetch"));
  }, [showModal]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAdmit = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const mapAdmittedPatients = (admittedPatients) => {
    const admittedMap = {};
    admittedPatients.forEach((admittedPatient) => {
      admittedMap[admittedPatient.patient.patient?.uhid] = true;
    });
    console.log(admittedMap);

    setAdmittedPatientsMap(admittedMap);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="search-patient-container">
      {showModal ? (
        <>
          <IpAdmission patientData={selectedPatient} onClose={handleClose} />
        </>
      ) : (
        <>
          <h5>Search Patient</h5>
          <div>
            <input
              type="text"
              placeholder="Search by patient name..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="table-container">
            <table className="patient-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "SN",
                    "Name",
                    "Age",
                    "Gender",
                    "Phone",
                    "Address",
                    "Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      style={{ width: columnWidths[index] }}
                      className="rd-resizable-th"
                    >
                      <div className="rd-header-content">
                        <span>{header}</span>
                        <div
                          className="rd-resizer"
                          onMouseDown={startResizing(
                            tableRef,
                            setColumnWidths
                          )(index)}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {patients
                  ?.filter((patient) => {
                    const searchLowerCase = searchTerm.toLowerCase();
                    const firstNameMatch = patient.firstName
                      ?.toLowerCase()
                      .includes(searchLowerCase);
                    const lastNameMatch = patient.lastName
                      ?.toLowerCase()
                      .includes(searchLowerCase);
                    const patientIdMatch = patient.inPatientId == searchTerm;

                    return firstNameMatch || lastNameMatch || patientIdMatch;
                  })
                  .map((patient, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {`${patient.firstName} ${
                          patient.middleName ? patient.middleName + " " : ""
                        }${patient.lastName}`}
                      </td>
                      <td>
                        {patient.age} {patient.ageUnit} / {patient.gender}
                      </td>
                      <td>{patient.gender}</td>
                      <td>{patient.mobileNumber}</td>
                      <td>{patient.address}</td>
                      <td>
                        {admittedPatientsMap[patient?.uhid] ? (
                          <span className="Addmitted-btn">Admitted</span> // Display if admitted
                        ) : (
                          <button
                            className="Addmit-btn"
                            onClick={() => handleAdmit(patient)}
                          >
                            Admit
                          </button>
                        )}
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

export default SearchPatient;
