import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./ClinicalDocument.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

const ClinicalDocument = ({ patientId, outPatientId }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const [labRequests, setLabRequests] = useState([]);
  const [imagingRequisitions, setImagingRequisitions] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchLabRequests = () => {
      let endpoint = "";
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-opd-patient-id?opdPatientId=${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/lab-requests/by-in-patient-id?inPatientId=${patientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setLabRequests(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching lab requests:", error);
          });
      }
    };

    const fetchImagingRequisitions = () => {
      let endpoint = "";
      if (outPatientId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-opd-patient-id?opdPatientId=${outPatientId}`;
      } else if (patientId) {
        endpoint = `${API_BASE_URL}/imaging-requisitions/by-in-patient-id?inPatientId=${patientId}`;
      }
      if (endpoint) {
        axios
          .get(endpoint)
          .then((response) => {
            if (response.data.length > 0) {
              setImagingRequisitions(response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching imaging requisitions:", error);
          });
      }
    };

    fetchLabRequests();
    fetchImagingRequisitions();
  }, [outPatientId, patientId]);

  const showLabReportResult = (lab) => {
    // Implement the logic to show lab report result
    console.log("Showing lab report result for:", lab);
  };

  const showImagingReport = (imaging) => {
    // Implement the logic to show imaging report
    console.log("Showing imaging report for:", imaging);
  };

  return (
    <div className="cliDoc-container">
      <div className="Patient-Dashboard-outOutDiv">
        <h2>🧪 Labs</h2>
        {labRequests.length > 0 ? (
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
                {labRequests.map((lab, index) => (
                  <tr key={index}>
                    <td className="Patient-Dashboard-td">{lab.labTestName}</td>
                    <td className="Patient-Dashboard-td">
                      {lab.requisitionDate}
                    </td>
                    <td className="Patient-Dashboard-td">
                      {lab.status === "Completed" ? (
                        <button onClick={() => showLabReportResult(lab)}>
                          View
                        </button>
                      ) : (
                        lab.status
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Lab requests for this patient or visit.</p>
        )}
      </div>

      <div className="Patient-Dashboard-outOutDiv">
        <h2>🖼 Imaging</h2>
        {imagingRequisitions.length > 0 ? (
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
                {imagingRequisitions.map((imaging, index) => (
                  <tr key={index}>
                    <td className="Patient-Dashboard-td">
                      {imaging.imagingTypeDTO.imagingTypeName}
                    </td>
                    <td className="Patient-Dashboard-td">
                      {imaging.imagingItemDTO.imagingItemName}
                    </td>
                    <td className="Patient-Dashboard-td">
                      {imaging.requestedDate}
                    </td>
                    <td className="Patient-Dashboard-td">
                      {imaging.status === "Completed" ? (
                        <button onClick={() => showImagingReport(imaging)}>
                          View
                        </button>
                      ) : (
                        imaging.status
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Imaging requisitions for this patient or visit.</p>
        )}
      </div>
    </div>
  );
};

export default ClinicalDocument;
