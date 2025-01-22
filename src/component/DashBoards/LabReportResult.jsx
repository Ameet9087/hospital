import React, { useEffect, useState } from "react";
import "./LabReportResult.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const LabReportResult = ({ reportData, onClose }) => {
  console.log(reportData);

  const [labResult, setLabResult] = useState(null);
  useEffect(() => {
    const fetchLabResult = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/lab-result/by-labRequest?labRequestId=${reportData.labRequestId}`
        );
        if (response.status === 200) {
          setLabResult(response.data); // Assuming the response data has the lab result details
        }
      } catch (error) {
        console.error("Error fetching lab result:", error);
      }
    };

    fetchLabResult();
  }, [reportData.labRequestId]);

  const handlePrint = () => {
    // This can be extended for print functionality
    window.print();
  };

  const handleBackClick = () => {
    onClose();
  };

  return (
    <div className="doc-lab-page2Popup">
      <div className="doc-lab-page2-popup-content">
        <button className="doc-lab-page2-close-btn" onClick={handleBackClick}>
          &times;
        </button>
        <div className="doc-lab-page2">
          <div className="doc-lab-container2" id="printLabResult">
            <header>
              <div className="doc-lab-logo">
                <div className="doc-lab-circle">
                  <span className="doc-lab-plus">+</span>
                </div>
                <span className="doc-lab-text">Hims Health</span>
              </div>
              <div className="doc-lab-hospital">
                <span>Hims Health Hospital</span>
              </div>
            </header>
            <div className="doc-lab-patient-details">
              <div>
                <p>
                  Name:{" "}
                  {labResult?.labRequestDTO?.outPatientDTO?.patient
                    ?.firstName ||
                    labResult?.labRequestDTO?.patientDTO?.patient
                      .firstName}{" "}
                  {labResult?.labRequestDTO?.outPatientDTO?.patient?.lastName ||
                    labResult?.labRequestDTO?.patientDTO?.patient?.lastName}
                </p>
                <p>
                  Address:{" "}
                  {labResult?.labRequestDTO?.outPatientDTO?.patient?.address ||
                    labResult?.labRequestDTO?.patientDTO?.patient?.address}
                </p>
                {/* <p>
                  Prescriber Name:{" "}
                  {labResult?.labRequestDTO?.prescriber?.salutation +
                    labResult?.labRequestDTO?.prescriber?.firstName +
                    " " +
                    labResult?.labRequestDTO?.prescriber?.lastName}
                </p> */}
                <p>Lab No: {labResult?.labRequestDTO?.runNumber}</p>
              </div>
              <div>
                <p>
                  Patient No.:{" "}
                  {labResult?.labRequestDTO?.outPatientDTO?.outPatientId ||
                    labResult?.labRequestDTO?.patientDTO?.inPatientId}
                </p>
                <p>
                  Age/Sex:{" "}
                  {labResult?.labRequestDTO?.outPatientDTO?.patient?.age ||
                    labResult?.labRequestDTO?.patientDTO?.patient?.age}{" "}
                  {"Y / "}
                  {labResult?.labRequestDTO?.outPatientDTO?.patient?.gender ||
                    labResult?.labRequestDTO?.patientDTO?.patient.gender}
                </p>
                <p>
                  Collection Date:{" "}
                  {labResult?.labRequestDTO?.sampleCollectedDate}{" "}
                  {labResult?.labRequestDTO?.sampleCollectedTime}
                </p>
                <p>
                  Reporting Date: {labResult?.labResultCreatedDate}{" "}
                  {labResult?.labResultCreatedTime}
                </p>
              </div>
            </div>
            <div className="doc-lab-table-container">
              <table>
                <thead>
                  <tr>
                    <th colSpan="3">BIOCHEMISTRY REPORT</th>
                  </tr>
                  <tr>
                    <th>Tests</th>
                    <th>Findings</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {labResult?.componentsJson &&
                    JSON.parse(labResult.componentsJson).map((item) => (
                      <tr key={item.componentName}>
                        <td>{item.componentName}</td>
                        <td>{item.value}</td>
                        <td>{item.unit}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="doc-lab-comments">
              <p>Comments:</p>
              <textarea value={labResult?.comments} rows={5} disabled />
              <p className="ldoc-ab-disclaimer">
                This laboratory report must be integrated in conjunction with
                the clinical history of the patient by a clinician.
              </p>
            </div>
          </div>
          {/* <div className="doc-lab-update">
            <button onClick={handlePrint} className="doc-lab-print-button">
              Print
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LabReportResult;
