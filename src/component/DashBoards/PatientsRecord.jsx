import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
import "./PatientsRecords.css";
import PatientDashboard from "./PatientDashboard";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import { useFilter } from "../ShortCuts/useFilter";

const PatientRecord = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientRecordAction, setShowPatientRecordAction] = useState(false);
  const [filterFavourites, setFilterFavourites] = useState(false);
  const [filterPending, setFilterPending] = useState(false);
  const [isPatientOpen, setIsPatientOPEN] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const componentRef = useRef();
  const [patients, setPatients] = useState([]);
  const filteredItems = useFilter(patients, searchTerm);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ip-admissions`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  // Filtered patients based on favourite and pending filters
  const filteredPatients = patients
    .filter((patient) => (filterFavourites ? patient.isFavourite : true))
    .filter((patient) => (filterPending ? patient.isPending : true));

  const handlePendingListClick = () => {
    setFilterPending(!filterPending);
    setFilterFavourites(false); // Reset favourites filter if needed
  };

  const handleFavouritesClick = () => {
    setFilterFavourites(!filterFavourites);
    setFilterPending(false); // Reset pending filter if needed
  };

  const handlePatientClick = (patient) => {
    setIsPatientOPEN(!isPatientOpen);
    setSelectedPatient(patient); // Set the selected patient to open the dashboard
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  if (isPatientOpen) {
    return (
      <PatientDashboard
        setIsPatientOPEN={setIsPatientOPEN}
        patient={selectedPatient}
      />
    );
  }
  return (
    <div className="patient-record">
      {/* <div className="patient-record-date-range">
        <div className="patient-date-ranges">
          <label>From:</label>
          <input type="date" value="2024-08-11" />
          <label>To:</label>
          <input type="date" value="2024-08-18" />
        </div>
      </div> */}

      <div className="patient-record-search-bar">
        <div className="patient-record-sub-div">
          <input
            type="text"
            placeholder="Search by substore name"
            className="manage-substore-search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {/* <div className="patient-record-department-filter">
          <label>Department Filter :</label>
          <select className="patient-record-select">
            <option>ALL</option>
          </select>
        </div> */}
        <div>
          <span className="patient-record-results">
            Showing {filteredPatients.length} / {patients.length} results
          </span>
          {/* <ReactToPrint
              trigger={() => (
                <button className="patient-record-print">Print</button>
              )}
              content={() => componentRef.current}
            /> */}
        </div>
      </div>

      {/* The content to be printed */}
      <div ref={componentRef} className="table-container">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Uhid",
                "Name",
                "Age/Sex",
                "Admission Status",
                "Admitted On",
                "Ward-Bed",
                "Dept",
                "Provider Name",
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
            {filteredItems?.map((patient, index) => (
              <tr key={index}>
                <td>{patient.patient.uhid}</td>
                <td>{`${patient.patient.firstName} ${patient.patient.lastName}`}</td>
                <td>
                  {patient.patient.age} {patient.patient.ageUnit}/
                  {patient.patient.gender}
                </td>
                <td>{patient.admissionStatus}</td>
                <td>{patient.admissionDate}</td>
                <td>{patient.roomDetails?.bedDTO?.bedNo}</td>
                <td>{patient.roomDetails?.roomTypeDTO?.wardName}</td>
                <td>
                  {
                    patient.admissionUnderDoctorDetail.consultantDoctor
                      ?.salutation
                  }{" "}
                  {
                    patient?.admissionUnderDoctorDetail.consultantDoctor
                      ?.doctorName
                  }
                </td>
                <td>
                  <button
                    className="in-patient-button"
                    onClick={() => handlePatientClick(patient)}
                  >
                    👤
                  </button>
                  <button className="in-patient-button">🔔</button>
                  <button className="in-patient-button">🖼</button>
                  <button
                    className="in-patient-button"
                    onClick={() => handleOrdersClick(patient)}
                  >
                    📄
                  </button>
                  <button className="in-patient-button">♥</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="pagination">
        <span>1 to {filteredPatients.length} of {filteredPatients.length}</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 1 of 1</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}

      {/* {showPatientRecordAction && (
        <div className="patient-record-action-modal">
          <PatientDashboard patient={selectedPatient} />
          <button onClick={handleClosePatientRecordAction}>Close</button>
        </div>
      )} */}
    </div>
  );
};

export default PatientRecord;
