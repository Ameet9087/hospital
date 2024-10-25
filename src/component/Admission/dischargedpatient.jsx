/* // neha-ADT-discharge-19/09/24 */

import React, { useState, useEffect, useRef } from "react";
import "./dischargedpatient.css";

import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";
import AdmissionDischargePrint from "./AdmissionDischargePrint";

function DischargedPatient() {
  const [modalShow, setModalShow] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dischargeData, setDischargeData] = useState([]);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  const handleClose = () => setModalShow(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/discharge-summaries/fetchAll`
        );
        const data = await response.json();
        setDischargeData(data);
        console.log(data + "discharged");
      } catch (err) {
        console.error("Error fetching data:", err); // Debugging error
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handlePrintClick = (data) => {
    setPatients(data);
    setModalShow(true);
  };

  return (
    <>
      {!modalShow ? (
        <div className="discharge-container">
          <div className="date-utlt">
            <div className="dischage-patient">
              <div className="date-range">
                <label>From: </label>
                <input
                  className="date-range-input"
                  type="date"
                  value="2024-08-05"
                />
                <label> To: </label>
                <input
                  className="date-range-input"
                  type="date"
                  value="2024-08-12"
                />
              </div>
            </div>
          </div>
          <table className="patientList-table" ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Admitted On",
                  "Discharged On",
                  "IP Number",
                  "Name",
                  "Phone Number",
                  "Age/Sex",
                  "Bill Status",
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
              {dischargeData.length > 0 ? (
                dischargeData.map((discharge) => (
                  <tr key={discharge?.admissionDTO?.admissionId}>
                    <td>{discharge?.admissionDTO?.admissionDate}</td>
                    <td>{discharge?.dischargeDate}</td>
                    <td>{discharge?.admissionDTO?.admissionId}</td>
                    <td>{`${discharge?.admissionDTO?.patientDTO.firstName} ${discharge?.admissionDTO?.patientDTO.lastName}`}</td>
                    <td>{discharge?.admissionDTO?.patientDTO?.phoneNumber}</td>
                    <td>{discharge?.admissionDTO?.patientDTO?.age}</td>
                    <td>paid</td>
                    <td>
                      <button
                        className="Actions-btn Actions-consumption"
                        onClick={() => handlePrintClick(discharge)}
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No discharge data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <AdmissionDischargePrint data={patients} onClose={handleClose} />
        </>
      )}
    </>
  );
}

export default DischargedPatient;
