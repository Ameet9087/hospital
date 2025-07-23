/* prachi parab user interface changed  14/9 */

import React, { useState, useEffect, useRef } from "react";
import "./NursingMainComponent.css";
import OpdTriagePage from "./OpdTriagePage";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import VitalsPage from "../DashBoards/ClinicalVitals";
import axios from "axios";
import NursingPatientDashboard from "./NursingModule/WardNurseDashboard/NursingPatientDashboard";

const OutPatientComponent = () => {
  const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Discharged Patients");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [patients, setPatients] = useState([]);
  const [modalData, setModalData] = useState({});
  const [isPatientOPEN, setIsPatientOPEN] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isNursing, setIsNursing] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState();
  const [showClinic, setShowClinic] = useState(false);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const fetchFilteredPatients = async () => {
    try {
      const appointmentResponse = await axios.get(
        `${API_BASE_URL}/appointments/today`
      );
      const appointments = appointmentResponse.data;
      console.log("Appointments Data: ", appointments);

      const vitalsResponse = await axios.get(
        `${API_BASE_URL}/doc-vitals/getAll`
      );
      const allVitals = vitalsResponse.data;
      console.log("Vitals Data: ", allVitals);

      const today = new Date().toISOString().split("T")[0];

      const patientsWithoutTodaysVitals = appointments.filter((appointment) => {
        const outPatientId = appointment?.outPatientId;

        const hasTodayVitals = allVitals.some(
          (vital) =>
            vital.outPatientDTO?.outPatientId === outPatientId &&
            vital.addedOn === today
        );

        return !hasTodayVitals;
      });

      setPatients(patientsWithoutTodaysVitals);
      console.log("Patients Without Today's Vitals");
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const fetchAllPatient = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setPatients(data);
      } else {
        console.error("Failed to fetch patients:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleTabClick = async (tabName) => {
    setActiveTab(tabName);
    if (tabName === "Today") {
      await fetchFilteredPatients();
    } else if (tabName === "Past Days") {
      await fetchAllPatient();
    }
  };

  const openTriAgeModal = (data) => {
    setModalData(data); // Set the data to be passed to the modal
    setIsTriageModalOpen(true);
  };

  // Function to close the modal
  const closeTriAgeModal = () => {
    setIsTriageModalOpen(false);
    setShowClinic(false);
  };
  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsNursing(true);
    setIsPatientOPEN(!isPatientOPEN);
  };
  const handleClinic = (id) => {
    setShowClinic(true);
    setSelectedPatientId(id);
  };

  return (
    <>
      {!isPatientOPEN ? (
        <>
          {!showClinic ? (
            <div className="out-patient-container">
              <div className="opd-tabs">
                <a
                  href="#today"
                  className={`opd-tab-item ${
                    activeTab === "today" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Today")}
                >
                  Today
                </a>
                <a
                  href="#past-days"
                  className={`opd-tab-item ${
                    activeTab === "past-days" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("Past Days")}
                >
                  Past Days
                </a>
              </div>
              {activeTab === "Today" && (
                <>
                  <div className="search-and-filter">
                    <input
                      type="text"
                      className="nursing-search-input"
                      placeholder="Search by Hospital No/Patient Name/Department Name"
                    />

                    {/* <input
                      type="text"
                      className="department-input"
                      placeholder="Search by Department Name"
                      style={{ marginRight: "3%" }}
                    /> */}
                  </div>
                  <div className="nurse-action-buttons"></div>
                  <table className="patientList-table" ref={tableRef}>
                    <thead>
                      <tr>
                        {[
                          "SN",
                          "Date",
                          "Time",
                          "Patient Name",
                          "Age/Sex",
                          "Phone",
                          "Doctor",
                          "Visit Status",
                          "Action",
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
                      {patients?.map((patient, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{patient.appointmentDate}</td>
                          <td>{patient.appointmentTime}</td>
                          <td>{`${patient.patient?.firstName} ${
                            patient.patient?.middleName || ""
                          } ${patient.patient?.lastName}`}</td>
                          <td>{`${patient.patient?.age} ${patient.patient?.ageUnit} / ${patient.patient?.gender}`}</td>
                          <td>{patient.patient?.phoneNumber}</td>
                          <td>{`${patient.addDoctor?.salutation || ""} ${
                            patient.addDoctor?.doctorName
                          }`}</td>
                          {/* <td>{patient.scheme}</td> */}
                          <td>{patient.typeOfAppointment}</td>
                          <td>
                            <div className="Actions-actions">
                              <button
                                className="Actions-btn Actions-consumption"
                                onClick={() => openTriAgeModal(patient)}
                              >
                                Add Triage
                              </button>
                              <button
                                onClick={() => handlePatientClick(patient)}
                                className="Actions-btn Actions-wardRequest"
                              >
                                &#x1F5A5;
                              </button>
                              {/* <button className="Actions-btn Actions-transfer">
                                Clinical
                              </button> */}
                              {/* <button className="Actions-btn Actions-vitals">&#x21E7;</button> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {activeTab === "Past Days" && (
                <>
                  <div className="OutPatient_PastDays-tableContainer">
                    <div className="OutPatient_PastDays-Header"></div>
                    <table className="patientList-table" ref={tableRef}>
                      <thead>
                        <tr>
                          {[
                            "SN",
                            "Date ↓",
                            "Time",
                            "Patient Name",
                            "Age/Sex",
                            "Phone Number",
                            "Doctor Name",
                            "Appointment Type",
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
                        {patients?.map((patient, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{patient.appointmentDate}</td>
                            <td>{patient.appointmentTime}</td>
                            <td>{`${patient.patient?.firstName} ${
                              patient.patient?.middleName || ""
                            } ${patient.patient?.lastName}`}</td>
                            <td>{`${patient.patient?.age} ${patient.patient?.ageUnit} / ${patient.patient?.gender}`}</td>
                            <td>{patient.patient?.mobileNumber}</td>
                            <td>{`${patient.addDoctor?.salutation || ""} ${
                              patient.addDoctor?.doctorName
                            }`}</td>
                            {/* <td>{patient.scheme}</td> */}
                            <td>{patient.typeOfAppointment}</td>
                            <td>
                              <div className="Actions-actions">
                                <button
                                  className="Actions-btn Actions-consumption"
                                  onClick={() => openTriAgeModal(patient)}
                                >
                                  Add Triage
                                </button>
                                <button
                                  onClick={() => handlePatientClick(patient)}
                                  className="Actions-btn Actions-wardRequest"
                                >
                                  &#x1F5A5;
                                </button>
                                {/* <button className="Actions-btn Actions-transfer">
                                Clinical
                              </button> */}
                                {/* <button className="Actions-btn Actions-vitals">&#x21E7;</button> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* <div className="OutPatient_PastDays-pagination">
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="OutPatient_PastDays-pagination-info">
                {`Page ${currentPage} of ${totalPages}`}
              </span>
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button 
                className="OutPatient_PastDays-pagination-btn" 
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div> */}
                </>
              )}
              {showPopup && (
                <div className="popup">
                  <div className="popup-inner">
                    <h2>Triage Options</h2>
                    <button
                      className="close-btn"
                      onClick={() => setShowPopup(false)}
                    >
                      X
                    </button>
                    <div className="action-buttons">
                      <button className="popup-button">Vitals</button>
                      <button className="popup-button">Doctor Handover</button>
                      <button className="popup-button">Clinical Notes</button>
                      <button className="popup-button">Conclude</button>
                    </div>
                  </div>
                </div>
              )}
              {isTriageModalOpen && (
                <OpdTriagePage onClose={closeTriAgeModal} data={modalData} />
              )}
            </div>
          ) : (
            <VitalsPage
              newPatientVisitId={selectedPatientId}
              Type={true}
              onClose={closeTriAgeModal}
            />
          )}
        </>
      ) : (
        <>
          <NursingPatientDashboard
            isPatientOPEN={isPatientOPEN}
            setIsPatientOPEN={setIsPatientOPEN}
            patient={selectedPatient}
            type={isNursing}
          />
        </>
      )}
    </>
  );
};

export default OutPatientComponent;
