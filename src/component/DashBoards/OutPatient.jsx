import React, { useState, useEffect, useRef } from "react";
import "./OutPatient.css";
import OpdList from "../DashBoards/Opd";
import OutPatientFav from "../DashBoards/OutPatientFav";
import OutPatientFollowUp from "../DashBoards/OutPatientFollowUp";
import TableComponent from "../DashBoards/NewPatientsMyFavourite";
import NewPatientFollowUpList from "../DashBoards/NewPatientFollowUpList";
import PatientDashboard from "../DashBoards/PatientDashboard"; // Import the PatientDashboard component
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { useFilter } from "../ShortCuts/useFilter";

const OutPatient = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [view, setView] = useState("newPatient");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [isPatientOPEN, setIsPatientOPEN] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered data
  const [selectedDate, setSelectedDate] = useState(""); // State for the selected date
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useFilter(patients, searchTerm);

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView !== "favorite") setShowFavorites(false);
    if (newView !== "followUp") setShowFollowUp(false);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const toggleFollowUp = () => {
    setShowFollowUp(!showFollowUp);
  };

  const handlePatientClick = (patient) => {
    setIsPatientOPEN(!isPatientOPEN);
    setSelectedPatient(patient);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointments/today`);
        setPatients(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, []);

  if (isPatientOPEN) {
    return (
      <PatientDashboard
        isPatientOPEN={isPatientOPEN}
        setIsPatientOPEN={setIsPatientOPEN}
        patient={selectedPatient}
      />
    );
  }

  return (
    <div className="OutPatient-out-patient">
      <div className="OutPatient-sub-nav">
        <button
          className={view === "newPatient" ? "OutPatient-active" : ""}
          onClick={() => handleViewChange("newPatient")}
        >
          New Patient
        </button>
        <button
          className={view === "opdRecord" ? "OutPatient-active" : ""}
          onClick={() => handleViewChange("opdRecord")}
        >
          OPD Record
        </button>
      </div>

      {view === "newPatient" && (
        <div>
          <div className="OutPatient-actions">
            <div className="OutPatient-actions-subDiv">
              <button className="OutPatient-follow-up" onClick={toggleFollowUp}>
                Follow Up List
              </button>
            </div>
            <label className="OutPatient-doctor-wise">
              <input type="checkbox" /> Show Doctor Wise Patient List
            </label>
          </div>

          <div className="OutPatient-filters">
            {/* <div className="OutPatient-date-picker">
              <label>Date:</label>
              <input
                className="OutPatient-input"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <select className="OutPatient-input">
              <option>Today</option>
              <option>Last Week</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <div className="OutPatient-search">
              <input
                className="OutPatient-input"
                type="text"
                placeholder="Search"
              />
              <button className="OutPatient-input">🔍</button>
            </div> */}

            <input
              type="text"
              placeholder="Search by substore name"
              className="manage-substore-search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <table className="patientList-table" ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Uhid",
                  "Name",
                  "Age/Sex",
                  "VisitType",
                  "Performer Name",
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
              {filteredItems.length > 0 ? (
                filteredItems?.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.outPatient?.uhid}</td>
                    <td>{`${patient.firstName} ${patient.lastName}`}</td>
                    <td>
                      {patient.age}/{patient.sex}
                    </td>
                    <td>{patient.typeOfAppointment}</td>
                    <td>{`${patient?.addDoctor?.salutation} ${patient?.addDoctor?.doctorName}`}</td>
                    <td>
                      <button
                        className="OutPatient-action-button"
                        onClick={() => handlePatientClick(patient.outPatient)}
                      >
                        👤
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="OutPatient-no-data">
                    No Rows To Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {view === "opdRecord" && <OpdList />}
      {showFavorites && <TableComponent />}
      {showFollowUp && <NewPatientFollowUpList />}
    </div>
  );
};

export default OutPatient;
