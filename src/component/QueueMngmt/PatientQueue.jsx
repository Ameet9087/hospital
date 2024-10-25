import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./PatientQueue.css";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";

const PatientQueue = () => {
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [doctors, setDoctors] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all"); // Default status is set to "All"
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [active, isActive] = useState(false);

  // Fetch all doctors
  useEffect(() => {
    fetch(`${API_BASE_URL}/employees/findAllDoctors`)
      .then((response) => response.json())
      .then((data) => {
        const formattedDoctors = data.map((item) => ({
          id: item.employeeId, // Employee ID
          name: `${item.salutation || ""} ${item.firstName || ""} ${
            item.middleName ? item.middleName + " " : ""
          }${item.lastName || ""}`,
        }));
        setDoctors(formattedDoctors);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  // Fetch queue data for selected doctor
  const handleLoadData = () => {
    if (selectedDoctor) {
      fetch(`${API_BASE_URL}/patient-queues/employee/${selectedDoctor}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setShowTable(true);
        })
        .catch((error) => console.error("Error fetching patient data:", error));
    } else {
      setShowTable(false);
    }
  };

  // Handle status change (completed, skipped, attend)
  const handleStatusChange = (patientData, newStatus) => {
    let endpoint = "";
    if (newStatus === "completed") {
      endpoint = `${API_BASE_URL}/patient-queues/patient/completed?patientQueueId=${patientData.patientQueueId}`;
    } else if (newStatus === "skipped") {
      endpoint = `${API_BASE_URL}/patient-queues/patient/quit?patientQueueId=${patientData.patientQueueId}`;
    } else if (newStatus === "attend") {
      endpoint = `${API_BASE_URL}/patient-queues/patient/attend?patientQueueId=${patientData.patientQueueId}`;
    }

    axios
      .put(endpoint)
      .then((response) => {
        console.log("API Response:", response.data); // Log response data to verify
        setData((prevData) =>
          prevData.map((item) => {
            if (item.patientQueueId === patientData.patientQueueId) {
              // return updated status, keep the rest intact
              return { ...item, status: newStatus };
            }
            return item; // No change for other items
          })
        );
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  // Filter patients based on the selected status
  const filteredPatients = data.filter((row) => {
    if (selectedStatus === "pending") {
      return row.status === "pending" || row.status === "services";
    } else if (selectedStatus === "completed") {
      return row.status === "completed";
    } else if (selectedStatus === "skipped") {
      return row.status === "quit";
    }
    return true; // Return all patients for "All"
  });
  const handleClick = () => {
    setIsActive(!isActive); // Toggle the active state
  };

  return (
    <div className="patient-queue-management-container">
      <div className="patient-queue-management-header">
        <header className="queue-management-header">
          <button
            className={`queue-management-header-button ${
              isActive ? "active" : ""
            }`}
            onClick={handleClick}
          >
            OPD
          </button>
        </header>
      </div>

      <div className="queue-management-content">
        <h2 className="queue-management-title">👤 Patient Queue List</h2>

        <div className="queue-management-form-container">
          <div className="queue-management-form-group">
            <label>Doctor :</label>
            <select
              className="queue-management-select-doctor"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="queue-status-filter">
            <label>
              <input
                type="radio"
                value="all"
                checked={selectedStatus === "all"}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                value="pending"
                checked={selectedStatus === "pending"}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                value="completed"
                checked={selectedStatus === "completed"}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              Completed
            </label>
            <label>
              <input
                type="radio"
                value="skipped"
                checked={selectedStatus === "skipped"}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              Skipped
            </label>
          </div>

          <button
            className="queue-management-load-data-button"
            onClick={handleLoadData}
          >
            Load Data
          </button>
        </div>

        {showTable && (
          <div className="queue-management-table-section">
            <h3 className="queue-management-tables-head">
              {selectedStatus} Patients
            </h3>
            <div className="table-container">
              <table className="patientList-table" ref={tableRef}>
                <thead>
                  <tr>
                    {[
                      "Date",
                      "Name",
                      "Phone",
                      "Age",
                      "Department",
                      "Doctor",
                      "Visit Type",
                      "Appt.Type",
                      "Queue.No",
                      "Status",
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
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="queue-management-no-data">
                        No Patients Found
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((row, index) => (
                      <tr key={index}>
                        <td>{row.date}</td>
                        <td>{row.name}</td>
                        <td>{row.phone}</td>
                        <td>{row.ageSex}</td>
                        <td>{row.department}</td>
                        <td>
                          {row.newPatientVisitDTO?.employeeDTO?.salutation +
                            " " +
                            row.newPatientVisitDTO?.employeeDTO?.firstName +
                            " " +
                            row.newPatientVisitDTO?.employeeDTO?.lastName}
                        </td>
                        <td>{row.visitType}</td>
                        <td>{row.appointmentType}</td>
                        <td>{row.queueNumber}</td>
                        <td>{row.status}</td>
                        <td>
                          {row.status === "pending" && (
                            <>
                              <button
                                className="que-attend-button"
                                onClick={() =>
                                  handleStatusChange(row, "attend")
                                }
                              >
                                Attend
                              </button>
                              <button
                                className="que-skipped-button"
                                onClick={() =>
                                  handleStatusChange(row, "skipped")
                                }
                              >
                                Skipped
                              </button>
                            </>
                          )}
                          {row.status === "serving" && (
                            <button
                              className="que-complete-button"
                              onClick={() =>
                                handleStatusChange(row, "completed")
                              }
                            >
                              Complete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientQueue;
