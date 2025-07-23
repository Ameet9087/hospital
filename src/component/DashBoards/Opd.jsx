import React, { useRef, useState, useEffect } from "react";
import "./Opd.css";
import PatientDashboard from "./PatientDashboard";
import OpdRecordMyFavourites from "../DashBoards/OpdRecordMyFavourite";
import OpdRecordFollowUpList from "../DashBoards/OpdRecordFollowUpList";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import axios from "axios";
import { useFilter } from "../ShortCuts/useFilter";

const OpdList = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [patients, setPatients] = useState([]); // Define patients state
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [view, setView] = useState("patients"); // New state to manage view
  const [isPatientOPEN, setIsPatientOPEN] = useState(false); // Define isPatientOPEN state

  const filteredItems = useFilter(patients, searchTerm);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsPatientOPEN(true); // Open the patient dashboard
  };

  const handleFavouritesClick = () => {
    setView("favourites");
  };

  const handleFollowUpClick = () => {
    setView("followUp");
  };

  const fetchPatientData = async () => {
    console.log("dsfghjkjhgfdsfghnmgfds");
    try {
      const response = await axios.get(`${API_BASE_URL}/out-patient`);
      setPatients(response.data);
      console.log(response);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchPatientData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const printTable = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      "<style>table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid black; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(
      document.querySelector(".patientList-table").innerHTML
    ); // Correct class name
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="opd-patient-list">
      {selectedPatient ? (
        <PatientDashboard
          isPatientOPEN={isPatientOPEN}
          setIsPatientOPEN={setIsPatientOPEN}
          patient={selectedPatient}
        />
      ) : (
        <>
          {view === "patients" && (
            <>
              <div className="opd-filters">
                <div className="opd-search-bar">
                  <input
                    type="text"
                    placeholder="Search by substore name"
                    className="manage-substore-search-input"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <span className="opd-results">
                  Showing {patients.length} / {patients.length} results
                </span>
                {/* <button className="opd-print" onClick={printTable}>
                  Print
                </button> */}
              </div>

              <table className="patientList-table" ref={tableRef}>
                <thead>
                  <tr>
                    {["Uhid", "Name", "Age/Sex", "VisitType", "Actions"].map(
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
                              onMouseDown={startResizing(
                                tableRef,
                                setColumnWidths
                              )(index)}
                            ></div>
                          </div>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.length > 0 ? (
                    filteredItems?.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.uhid}</td>
                        <td>{`${patient.firstName} ${patient.lastName}`}</td>
                        <td>
                          {patient.age} {patient.ageUnit}/{patient.gender}
                        </td>
                        <td>{patient.isOpd}</td>
                        <td>
                          <button
                            className="OutPatient-action-button"
                            onClick={() => handlePatientClick(patient)} // Open the PatientDashboard when clicked
                          >
                            👤
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="OutPatient-no-data">
                        No Rows To Show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OpdList;
