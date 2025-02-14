import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SearchPatient.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import { FloatingInput } from "../../FloatingInputs";

function SearchPatient() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const patientsPerPage = 5;
  const navigate = useNavigate();
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch patients from the API when the component mounts
    axios
      .get(`${API_BASE_URL}/patient-register/all`)
      .then((response) => {
        setPatients(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the patient data!", error);
      });
  }, []);

  useEffect(() => {
    // Filter patients based on the search term and date range
    const filtered = patients.filter((patient) => {
      const patientName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();
      const matchesSearchTerm = patientName.includes(searchTerm.toLowerCase());

      const patientDate = new Date(patient.date);
      const isWithinDateRange =
        (!fromDate || patientDate >= new Date(fromDate)) &&
        (!toDate || patientDate <= new Date(toDate));

      return matchesSearchTerm && isWithinDateRange;
    });
    setFilteredPatients(filtered);
    setCurrentPage(1); // Reset to first page when search term or dates change
  }, [searchTerm, patients, fromDate, toDate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const startIndex = (currentPage - 1) * patientsPerPage;
  const endIndex = startIndex + patientsPerPage;
  const displayedPatients = filteredPatients.slice(startIndex, endIndex);

  const handlePrint = () => {
    window.print();
  };

  const handleEdit = (patient) => {
    navigate(`/patient/registerpatient#basic-info`, { state: { patient } });
  };

  return (
    <div className="search-patient">
      <div className="search-print-container">
        <div className="search-inputs">
          <div className="input-wrapper">
            <FloatingInput
              label={"Search"}
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <br></br>
          {/* <div className="date-filters">
            <label>
              From:
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </label>
            <label>
              To:
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </label>
          </div> */}
        </div>
        <div className="results-and-print">
          <span className="results-text">
            Showing {filteredPatients.length} / {patients.length} results
          </span>{" "}
          <button className="handle-print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
      </div>

      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Serial No",
              "UHID",
              "Patient Name",
              "Age/Sex",
              "Address",
              "Phone",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
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
          {filteredPatients.map((patient, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              <td>{patient.uhid}</td>
              <td>
                {patient.firstName} {patient.lastName}
              </td>
              <td>
                {patient.age} / {patient.gender}
              </td>
              <td>{patient.address}</td>
              <td>{patient.mobileNumber}</td>
              <td>
                <button
                  onClick={() => handleEdit(patient)}
                  className="action-btn edit"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchPatient;
