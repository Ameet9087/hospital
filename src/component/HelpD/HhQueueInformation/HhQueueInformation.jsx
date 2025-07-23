import React, { useState, useEffect } from "react";
import "../HhQueueInformation/hhQueueInformation.css";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";

function HHQueueInformation() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [queueData, setQueueData] = useState(null);


  // Fetch doctors when a department is selected (by departmentId)
  useEffect(() => {
    const fetchDoctors = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/doctors`
          );
          console.log(response);
          
          setDoctors(response.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
    };
    fetchDoctors();
  }, []);

  const handleProceed = async () => {
    if (selectedDoctorId) {
      try {
        const response = await fetch(`
          ${API_BASE_URL}/patient-queues/summary?employeeId=${selectedDoctorId}
          `);
        const data = await response.json();
        setQueueData(data);
      } catch (error) {
        console.error("Error fetching queue data:", error);
      }
    } else {
      alert("Please select both a department and a doctor.");
    }
  };

  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;
    const doctorName = e.target.options[e.target.selectedIndex].text;
    setSelectedDoctorId(doctorId);
    setSelectedDoctorName(doctorName);
    setQueueData(null);
  };

  return (
    <div className="queueInformation">
      <header className="queueInformation-header">
        <div className="queueInformation-doctor-select">
          <div>
            <span>Doctor:</span>
            <select
              value={selectedDoctorId}
              onChange={handleDoctorChange}
            >
              <option value="" disabled>
                --select--
              </option>
              {doctors?.map((doc) => (
                <option key={doc.doctorId} value={doc.doctorId}>
                  {doc.doctorName}
                </option>
              ))}
            </select>
          </div>
          <button
            className="queueInformation-proceed-btn"
            onClick={handleProceed}
          >
            Proceed
          </button>
        </div>
      </header>

      <main>
        <div className="queueInformation-main-div">
          <div className="queueInformation-banner">
            <div className="queueInformation-logo">
              <img src="path-to-logo.png" alt="HIMS" />
              <span>HIMS </span>
            </div>
            <div className="queueInformation-title">Queue Management</div>
          </div>

          <div className="queueInformation-tbl-div">
            <table className="queueInformation-table">
              <thead>
                <tr className="queueInformation-tr">
                  <th>Doctor Name</th>
                  <th>Current Serving</th>
                  <th>Next Patients</th>
                  <th>Upcoming Patients</th>
                </tr>
              </thead>
              <tbody>
                {queueData != null && queueData ? (
                  <>
                    <tr>
                      <td>{selectedDoctorName}</td>
                      <td>
                        {queueData.currentServing?.queueNumber} |{" "}
                        {queueData.currentServing?.name}
                      </td>
                      <td>
                        {queueData.nextPatient
                          ? queueData.nextPatient.queueNumber +
                            " | " +
                            queueData.nextPatient.name
                          : "N/A"}
                      </td>
                      <td>
                        {queueData.upcomingPatients.length > 0
                          ? queueData.upcomingPatients.map((patient, index) => (
                              <div key={index}>{patient.queueNumber}</div>
                            ))
                          : "N/A"}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="4">No data available. Please proceed.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="queueInformation-footer">
        <div className="queueInformation-notice">Notice</div>
        <marquee>• □</marquee>
      </footer>
    </div>
  );
}

export default HHQueueInformation;
