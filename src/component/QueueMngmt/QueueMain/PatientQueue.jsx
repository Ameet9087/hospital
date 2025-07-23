import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientQueue.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
const PatientQueue = () => {
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/doctors`);
        const formattedDoctors = response.data.map((doctor) => ({
          id: doctor.doctorId,
          name: doctor.doctorName,
        }));
        setDoctors(formattedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        alert("Failed to load doctors. Please try again.");
      }
    };
    fetchAllDoctors();
  }, []);

  const handleLoadData = async () => {
    if (!selectedDoctor) {
      setShowTable(false);
      alert("Please select a doctor.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/patient-queues/employee/${selectedDoctor}`
      );
      setData(response.data);
      setShowTable(true);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert("Failed to load patient data. Please try again.");
    }
  };

  const handleStatusChange = async (patientData, newStatus) => {
    try {
      let url;
      switch (newStatus) {
        case "completed":
          url = `${API_BASE_URL}/patient-queues/patient/completed?patientQueueId=${patientData.patientQueueId}`;
          break;
        case "skipped":
          url = `${API_BASE_URL}/patient-queues/patient/quit?patientQueueId=${patientData.patientQueueId}`;
          break;
        case "attend":
          url = `${API_BASE_URL}/patient-queues/patient/attend?patientQueueId=${patientData.patientQueueId}`;
          break;
        default:
          alert("Invalid status");
          return;
      }
      const response = await axios.put(url);
      alert(response.data);

      // Update local state
      setData((prevData) =>
        prevData.map((row) =>
          row.patientQueueId === patientData.patientQueueId
            ? { ...row, status: newStatus }
            : row
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const filteredData = Array.isArray(data)
    ? data.filter(
        (row) => selectedStatus === "all" || row.status === selectedStatus
      )
    : [];

  return (
    <div className="patient-queue-management-container">
      <h2 className="queue-management-title">
        <span role="img" aria-label="user">
          👤
        </span>{" "}
        Patient Queue List
      </h2>
      <div className="queue-management-form-container">
        <div className="queue-management-form-group">

          <FloatingSelect
           label="Doctor"
            name="doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          
                        options={[
                          { value: "", label: "Select a state" },
                          ...(Array.isArray(doctors)?doctors.map((doctor)=>({
                            value:doctor.id,
                            label:doctor.name,
                          })):[])
                        ]}
                      />
        </div>
        <div className="queue-management-form-group status-group">
          <label>Status:</label>
          <div className="queue-management-status-options">
            {["all", "pending", "completed", "skipped"].map((status) => (
              <React.Fragment key={status}>
                <input
                  type="radio"
                  id={status}
                  name="status"
                  checked={selectedStatus === status}
                  onChange={() => setSelectedStatus(status)}
                />
                <label htmlFor={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </label>
              </React.Fragment>
            ))}
          </div>
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
          <div className="queue-management-results-info">
            Showing {filteredData.length} / {data.length} results
          </div>
          <div className="queue-management-table-wrapper">
            <table className="queue-managemnt-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Visit Type</th>
                  <th>Appt. Type</th>
                  <th>Queue No.</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="queue-management-no-data">
                      No Rows To Show
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.name}</td>
                      <td>{row.phone}</td>
                      <td>{row.ageSex}</td>
                      <td>{row.department}</td>
                      <td>{`${row.outPatientDTO?.addDoctorDTO?.salutation} ${row.outPatientDTO?.addDoctorDTO?.firstName} ${row.outPatientDTO?.addDoctorDTO?.lastName}`}</td>
                      <td>{row.visitType}</td>
                      <td>{row.appointmentType}</td>
                      <td>{row.queueNumber}</td>
                      <td>{row.status}</td>
                      <td>
                        <button
                          className="que-complete-button"
                          onClick={() => handleStatusChange(row, "completed")}
                          disabled={
                            row.status === "completed" ||
                            row.status === "skipped"
                          }
                        >
                          Complete
                        </button>
                        <button
                          className="que-skipped-button"
                          onClick={() => handleStatusChange(row, "skipped")}
                          disabled={
                            row.status === "completed" ||
                            row.status === "skipped"
                          }
                        >
                          Skipped
                        </button>
                        <button
                          className="que-attend-button"
                          onClick={() => handleStatusChange(row, "attend")}
                          disabled={
                            row.status === "completed" ||
                            row.status === "skipped"
                          }
                        >
                          Attend
                        </button>
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
  );
};

export default PatientQueue;
