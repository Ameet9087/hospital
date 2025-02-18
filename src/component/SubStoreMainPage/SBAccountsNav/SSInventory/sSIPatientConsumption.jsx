/* Ajhar Tamboli sSIPatientConsumption.jsx 19-09-24 */

import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIPatientConsumption.css";
import { useReactToPrint } from "react-to-print";
import SSIPatientConsumNewPCbtn from "./sSIPatientConsumNewPCbtn";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";

import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

function SSIPatientConsumption() {
  const printRef = useRef();
  const { store } = useParams();
  const [fromDate, setFromDate] = useState("2024-08-14");
  const [toDate, setToDate] = useState("2024-08-21");
  const [patientConsumptions, setPatientConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);

  const tableRef = useRef(null);
  const [showNewPatientConsumption, setShowNewPatientConsumption] =
    useState(false); // State to control New Patient Consumption

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };
  const handleNewPatientConsumptionClick = () => {
    setShowNewPatientConsumption(true); // Show the new patient consumption component
  };
  const handleBack = () => {
    setShowNewPatientConsumption(false); // Hide the new patient consumption component and go back to the main content
  };
  const closePopups = () => {
    setShowCreateRequisition(false);
    setShowViewRequisition(false);
    setShowNewPatientConsumption(false); // Hide the new patient consumption component
  };
  useEffect(() => {
    const fetchPatientConsumptions = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/patient-consumption/getAll`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredData = data.filter((item) => item.substoreId == store);

        // Fetch patient details and map the patient name
        const updatedData = await Promise.all(
          filteredData.map(async (consumption) => {
            const patientResponse = await fetch(
              `${API_BASE_URL}/inpatients/${consumption.patientId}`
            );
            if (patientResponse.ok) {
              const patientData = await patientResponse.json();
              return { ...consumption, patientName: patientData.firstName };
            }
            return { ...consumption, patientName: "Unknown" };
          })
        );

        setPatientConsumptions(updatedData);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientConsumptions();
  }, [store]);


  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
>>>>>>> ad3dbcade0310743b9fa5d27715a29a847b1a3fa
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };

  // Function to handle exporting the table to an Excel file
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "PatientConsumeReport"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "PatientConsumeReport.xlsx"); // Downloads the Excel file
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };


 const filterByDate = (data) => {
    if (!dateFrom || !dateTo) return data; // If no dates, return all data
    return data.filter((item) => {
      const consumptionDate = new Date(item.consumptionDate);
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      return consumptionDate >= startDate && consumptionDate <= endDate;
    });
  };

  const filteredConsumptions = useFilter(
    filterByDate(patientConsumptions),
    searchTerm
  );
  

  return (
    <div className="sSIPatientConsumption-active-imaging-request">
      <>
        <header className="sSIPatientConsumption-header">
          <div className="sSIPatientConsumption-status-filters">

            <button
              className="sSIPatientConsumption-new-patient-button"
              onClick={handleNewPatientConsumptionClick} // Handle button click
            >
              + New Patient Consumption
            </button>
          </div>
        </header>

        <div className="sSIPatientConsumption-controls">
          <div className="sSIPatientConsumption-date-range">

            <FloatingInput
              label="From Date"
              type="date"
              defaultValue="2024-08-09"
            />

            <FloatingInput
              label="To Date"
              type="date"
              defaultValue="2024-08-16"
            />
            {/* <button className="sSIPatientConsumption-star-button">☆</button>
    <button className="sSIPatientConsumption-more-btn">-</button>
      <button className="sSIPatientConsumption-ok-button">OK</button> */}
          </div>
        </div>
        <div className="sSIPatientConsumption-search-N-results">
          <div className="sSIPatientConsumption-search-bar">

            <FloatingInput label="Search" type="search" />
          </div>
          <div className="sSIPatientConsumption-results-info">
            Showing 2 / 2 results
            <button
              className="sSIPatientConsumption-print-btn"
              onClick={handleExport}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button
              className="sSIPatientConsumption-print-btn"

              onClick={printList}
            >
              <i class="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>

          <div ref={tableRef}>
            <h2>Patient Consumption Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Consumption Date</th>
                  <th>Entered By</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patientConsumptions.length > 0 ? (
                  patientConsumptions.map((consumption, index) => (
                    <tr key={index}>
                      <td>{consumption.patientName}</td>
                      <td>{consumption.consumptionDate}</td>
                      <td>{consumption.enteredBy}</td>
                      <td>{consumption.remark}</td>

                      <td>
                        <button className="action-button">Action</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Rows To Show</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Patient Name",
                  "Consumption Date",
                  "Entered By",
                  "Remarks",
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
              {filteredConsumptions.length > 0 ? (
                filteredConsumptions.map((consumption, index) => (

                  <tr key={index}>
                    <td>{consumption.patientName}</td>
                    <td>{consumption.consumptionDate}</td>
                    <td>{consumption.enteredBy}</td>
                    <td>{consumption.remark}</td>

                    <td>
                      <button className="action-button">Action</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Rows To Show</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="sSIPatientConsumption-pagination">
            <span>0 to 0 of 0</span>
            <button>First</button>
            <button>Previous</button>
            <span>Page 0 of 0</span>
            <button>Next</button>
            <button>Last</button>
          </div> */}
        </div>
      </>

      <CustomModal isOpen={showNewPatientConsumption} onClose={handleBack}>
        <SSIPatientConsumNewPCbtn />
      </CustomModal>
    </div>
  );
}

export default SSIPatientConsumption;
