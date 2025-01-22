import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/api";
import "../DashBoards/InPatientAction.css";
import "./NursingPatientDashBoard.css";
import axios from "axios";
import { startResizing } from "../TableHeadingResizing/resizableColumns";

const Section = ({ title, handleAddClick, children }) => (
  <div className="Patient-Dashboard-firstBox">
    <div className="Patient-Dashboard-subNav">
      <div className="Patient-Dashboard-labAndImg">
        <span className="Patient-Dashboard-spanText">{title}</span>
      </div>
    </div>
    {children || (
      <div className="Patient-Dashboard-inputOne">No Records Found</div>
    )}
  </div>
);
const NursingPatientDashBoard = () => {
  const { id } = useParams();
  const [medications, setMedications] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [patient, setPatient] = useState([]);
  const [allergies, setAllergies] = useState(null);
  const [latestVitals, setLatestVitals] = useState(null);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [activeProblem, setActiveProblem] = useState([]);
  const [radiology, setRadiology] = useState([]);
  const [LabRequest, setLabRequest] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/new-patient-visits/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPatient(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    // Fetch medications data from the API
    const fetchMedications = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/medications`);
        const data = await response.json();
        console.log(data);

        setMedications(data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);
  useEffect(() => {
    const fetchVitals = () => {
      let endpoint = "";
      if (patient.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/vitals/get-by-opd-patient-id/${patient.newPatientVisitId}`;
      } else if (patient.admissionId) {
        endpoint = `${API_BASE_URL}/vitals/get-by-in-patient-id/${patient.admissionId}`;
      }

      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setLatestVitals(response.data[response.data.length - 1]);
              console.log(response.data[response.data.length - 1]);
            }
          })
          .catch((error) => {
            console.error("Error fetching vitals:", error);
          });
      }
    };

    fetchVitals();
  }, [patient.newPatientVisitId, patient.admissionId]);
  useEffect(() => {
    const fetchAllergies = () => {
      let endpoint = "";

      // Check if newPatientVisitId is present
      if (patient.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/allergies/by-newVisitPatientId/${patient.newPatientVisitId}`;
      } else if (patient.admissionId) {
        endpoint = `${API_BASE_URL}/allergies/by-patientId/${patient.admissionId}`;
      }

      // If an endpoint is determined, make the API call
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              console.log(response.data);

              setAllergies(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching allergies:", error);
          });
      }
    };

    fetchAllergies();
  }, [patient.newPatientVisitId, patient.admissionId]); // Dependencies to re-run useEffect when IDs change

  useEffect(() => {
    const fetchActiveProblems = () => {
      let endpoint = "";

      // Check if newPatientVisitId is present
      if (patient.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/active-problems/by-newVisitPatientId/${patient.newPatientVisitId}`;
      } else if (patient.admissionId) {
        endpoint = `${API_BASE_URL}/active-problems/by-patientId/${patient.admissionId}`;
      }

      // If an endpoint is determined, make the API call
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setActiveProblem(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching active problems:", error);
          });
      }
    };

    fetchActiveProblems();
  }, [patient.newPatientVisitId, patient.admissionId]);
  useEffect(() => {
    const fetchImagingRequisitions = () => {
      let endpoint = "";

      if (patient.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-opd-patient-id?opdPatientId=${patient.newPatientVisitId}`;
      } else if (patient.admissionId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-in-patient-id?inPatientId=${patient.admissionId}`;
      }

      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              console.log(response.data);
              setRadiology(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching imaging requisitions:", error);
          });
      }
    };

    fetchImagingRequisitions();
  }, [patient.newPatientVisitId, patient.admissionId]); // Dependencies to re-run useEffect when patient IDs change
  useEffect(() => {
    const fetchLabRequests = () => {
      let endpoint = "";

      // Check if newPatientVisitId or admissionId is present
      if (patient.newPatientVisitId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-opd-patient-id?opdPatientId=${patient.newPatientVisitId}`;
      } else if (patient.admissionId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-in-patient-id?inPatientId=${patient.admissionId}`;
      }

      // If an endpoint is determined, make the API call
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              console.log(response.data);
              setLabRequest(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching lab requests:", error);
          });
      }
    };

    fetchLabRequests();
  }, [patient.newPatientVisitId, patient.admissionId]); // Dependencies to track patient IDs
  useEffect(() => {
    if (
      patient &&
      (patient.patientId !== 0 || patient.newPatientVisitId !== 0)
    ) {
      const filtered = medications
        .filter(
          (medication) =>
            (patient.patientId &&
              medication.patientDTO.patientId === patient.patientId) ||
            (patient.newPatientVisitId &&
              medication.newPatientVisitDTO?.newPatientVisitId ===
                patient.newPatientVisitId)
        )
        .sort((a, b) => new Date(b.lastTaken) - new Date(a.lastTaken)); // Sort by recent date

      setFilteredMedications(filtered);
    }
  }, [medications, patient.patientId, patient.newPatientVisitId]);

  return (
    <div className="Nursing-Patient-Dashboard-main-section">
      <aside className="Patient-Dashboard-aside-section  Nursing-Patient-Dashboard-left-aside">
        <div className="Patient-Dashboard-outOutDiv">
          <div className="Patient-Dashboard-outDiv">
            <div className="Patient-Dashboard-divOne">
              <div className="Patient-Dashboard-logoOne"></div>
              <button className="Patient-Dashboard-btnIpd">
                {patient?.admissionId ? "IPD" : "OPD"}
              </button>
            </div>
            <span className="Patient-Dashboard-textName">{`${
              patient?.firstName || patient?.patientDTO?.firstName
            } ${patient?.lastName || patient?.patientDTO?.lastName}`}</span>
            <br></br>
            <span className="Patient-Dashboard-ageGen">{`${
              patient?.age || patient?.patientDTO?.age
            }/${patient?.gender || patient?.patientDTO?.gender}`}</span>
          </div>
          <hr></hr>
          <div className="Patient-Dashboard-divTwoDetails">
            <span className="Patient-Dashboard-detailHeading">
              Hospital No:
            </span>
            <span>{patient?.patientDTO?.hospitalNo}</span>
            <br></br>
            <div className="Patient-Dashboard-ward">
              <span className="Patient-Dashboard-detailHeading">Ward/Bed:</span>
              <span> Private Ward/09</span>
              <br></br>
            </div>
            <div className="Patient-Dashboard-attending">
              <span className="Patient-Dashboard-detailHeading">
                Attending:
              </span>
              <span>{`${
                patient?.employeeDTO?.salutation ||
                patient?.admittedDoctorDTO?.salutation
              } ${
                patient?.employeeDTO?.firstName ||
                patient?.admittedDoctorDTO?.firstName
              } ${
                patient?.employeeDTO?.lastName ||
                patient?.admittedDoctorDTO?.lastName
              }`}</span>
            </div>
          </div>
        </div>
        <div className="Patient-Dashboard-detailsBox">
          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("problems");
                  setPrevAction(...activeSection);
                }}
              >
                Problems
              </span>
            </div>
          </div>

          {/* <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Current Medications</span>
            </div>
          </div> */}

          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("encounte-rHistory");
                  setPrevAction(...activeSection);
                }}
              >
                Encounter History
              </span>
            </div>
          </div>

          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Orders</span>
            </div>
          </div>

          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("Clinical-Document");
                  setPrevAction(...activeSection);
                }}
              >
                Clinical Documents
              </span>
            </div>
          </div>

          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span
                className="Patient-Dashboard-textOne"
                onClick={() => {
                  setActiveSection("clinical");
                  setPrevAction(...activeSection);
                }}
              >
                Clinical
              </span>
            </div>
          </div>
          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Notes</span>
            </div>
          </div>
          <div className="Patient-Dashboard-boxOne">
            <div className="Patient-Dashboard-textAndLogo">
              <span className="Patient-Dashboard-textOne">Scanned images</span>
            </div>
          </div>
          {patient.admissionId && (
            <div className="Patient-Dashboard-boxOne">
              <div className="Patient-Dashboard-textAndLogo">
                <span
                  className="Patient-Dashboard-textOne"
                  onClick={() => {
                    setActiveSection("dischargeSummary");
                    setPrevAction(...activeSection);
                  }}
                >
                  Discharge Summary
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
      <main className="Patient-Dashboard-betweenSection">
        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="🧪 Labs"
            handleAddClick={() => {
              setActiveSection("actionRecord");
              setPrevAction(activeSection);
            }}
            children={
              <>
                {" "}
                {LabRequest.length > 0 ? (
                  <div className="Patient-Dashboard-inputSection">
                    <table
                      border="1"
                      cellPadding="10"
                      cellSpacing="0"
                      className="patient-table"
                    >
                      <thead>
                        <tr>
                          <th className="Patient-Dashboard-th">Test</th>
                          <th className="Patient-Dashboard-th">Date</th>
                          <th className="Patient-Dashboard-th">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {LabRequest.map((radiology, index) => (
                          <tr key={index}>
                            <td className="Patient-Dashboard-td">
                              {radiology.labTestName}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {radiology.requisitionDate}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {radiology.status === "Completed" ? (
                                <>
                                  <button
                                    onClick={() =>
                                      ShowlabReportResult(radiology)
                                    }
                                  >
                                    View
                                  </button>
                                </>
                              ) : (
                                radiology.status
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No Radiology order for this patient or visit.</p>
                )}
              </>
            }
          />
        </div>

        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="🖼 Imaging"
            handleAddClick={() => setActiveSection("actionRecord")}
            children={
              <>
                {" "}
                {radiology.length > 0 ? (
                  <div className="Patient-Dashboard-inputSection">
                    <table
                      border="1"
                      cellPadding="10"
                      cellSpacing="0"
                      className="patient-table"
                    >
                      <thead>
                        <tr>
                          <th className="Patient-Dashboard-th">Type</th>
                          <th className="Patient-Dashboard-th">Item</th>
                          <th className="Patient-Dashboard-th">Date</th>
                          <th className="Patient-Dashboard-th">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {radiology.map((radiology, index) => (
                          <tr key={index}>
                            <td className="Patient-Dashboard-td">
                              {radiology.imagingTypeDTO.imagingTypeName}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {radiology.imagingItemDTO.imagingItemName}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {radiology.requestedDate}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {radiology.status === "Completed" ? (
                                <>
                                  <button
                                    onClick={() => ShowImagingReport(radiology)}
                                  >
                                    View
                                  </button>
                                </>
                              ) : (
                                radiology.status
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No Radiology order for this patient or visit.</p>
                )}
              </>
            }
          />
        </div>

        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="⚠ Active Problems"
            handleAddClick={() => setActiveSection("problems")}
            children={
              <>
                {" "}
                {activeProblem.length > 0 ? (
                  <div className="Patient-Dashboard-inputSection">
                    <table
                      border="1"
                      cellPadding="10"
                      cellSpacing="0"
                      className="patient-table"
                    >
                      <thead>
                        <tr>
                          <th className="Patient-Dashboard-th">Problem</th>
                          <th className="Patient-Dashboard-th">Onset Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeProblem.map((active) => (
                          <tr key={active.activeId}>
                            <td className="Patient-Dashboard-td">
                              {active.searchProblem}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {active.onsetDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No medications found for this patient or visit.</p>
                )}
              </>
            }
          />
        </div>

        <div className="Patient-Dashboard-outOutDiv">
          <Section
            title="🧪 Medication"
            handleAddClick={() => {
              setPrevAction(activeSection);
              setActiveSection("actionRecord");
            }}
            children={
              <>
                {" "}
                {filteredMedications.length > 0 ? (
                  <div className="Patient-Dashboard-inputSection">
                    <table
                      border="1"
                      cellPadding="10"
                      cellSpacing="0"
                      className="patient-table"
                    >
                      <thead>
                        <tr>
                          <th className="Patient-Dashboard-th">
                            Medication Name
                          </th>
                          <th className="Patient-Dashboard-th">Frequency</th>
                          <th className="Patient-Dashboard-th">Last Taken</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMedications.map((medication) => (
                          <tr key={medication.medicationId}>
                            <td className="Patient-Dashboard-td">
                              {medication.medicationName}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {medication.frequency}
                            </td>
                            <td className="Patient-Dashboard-td">
                              {medication.lastTaken}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No medications found for this patient or visit.</p>
                )}
              </>
            }
          />
        </div>
      </main>
      <aside className="Patient-Dashboard-aside-section  Patient-Dashboard-right-aside">
        <div className="Patient-Dashboard-asideDivTwo">
          <div className="Patient-Dashboard-asideNav">
            <div className="Patient-Dashboard-navTextandBtn">
              <div className="Patient-Dashboard-navVitals">
                <span className="Patient-Dashboard-spanText">Last Vitals</span>
                {/* <div className="Patient-Dashboard-twoBtns"> */}
                {/* <button className="Patient-Dashboard-oneBtnNormal">Show Graph</button> */}
                <button
                  className="Patient-Dashboard-secBtnBlue"
                  onClick={() => setActiveSection("Vitals")}
                >
                  Add Vitals
                </button>
                {/* </div> */}
              </div>
              <div className="Patient-Dashboard-tableRecord">
                <table className="Patient-Dashboard-patient-table">
                  <tr>
                    <td className="Patient-Dashboard-td">Recoreded On</td>
                    <td className="Patient-Dashboard-td">
                      {new Date(latestVitals?.addedOn).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Height</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.height} cm
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Weight</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.weight}kg
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">BMI</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.bmi}
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Temprature</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.temperature} °C
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Pulse</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.pulse} bpm
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Blood Pressure</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.bpSystolic}/{latestVitals?.bpDiastolic}{" "}
                      mmHg
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Respiratory Rate</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.respiratoryRate} breaths/min
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">SpO2</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.spO2} %
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">O2 Deliver Method</td>
                    <td className="Patient-Dashboard-td">
                      {" "}
                      {latestVitals?.o2DeliveryPlan}
                    </td>
                  </tr>
                  <tr>
                    <td className="Patient-Dashboard-td">Pain Scale</td>
                    <td className="Patient-Dashboard-td">
                      {latestVitals?.painScale}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <Section
            title="🚫 Allergies"
            handleAddClick={() => setActiveSection("Allergies")}
            children={
              <>
                <table className="patientList-table" ref={tableRef}>
                  <thead>
                    <tr>
                      {["Recorded On", "Allergen", "Severity", "Reaction"].map(
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
                    {allergies && allergies.length > 0 ? (
                      allergies.map((allergy) => (
                        <tr key={allergy.allergiesId}>
                          <td>{allergy.recordedDate}</td>
                          <td>{allergy.typeOfAllergy}</td>
                          <td>{allergy.severity}</td>
                          <td>{allergy.reaction}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No allergies found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            }
          />
        </div>
      </aside>
    </div>
  );
};

export default NursingPatientDashBoard;
