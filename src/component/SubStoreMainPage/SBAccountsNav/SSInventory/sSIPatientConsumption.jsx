/* Ajhar Tamboli sSIPatientConsumption.jsx 19-09-24 */

import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIPatientConsumption.css";
import { useReactToPrint } from "react-to-print";
import SSIPatientConsumNewPCbtn from "./sSIPatientConsumNewPCbtn";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { useFilter } from "../../../ShortCuts/useFilter";
function SSIPatientConsumption() {
  const printRef = useRef();
  const { store } = useParams();
 

  const [patientConsumptions, setPatientConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const [showNewPatientConsumption, setShowNewPatientConsumption] =
    useState(false); // State to control New Patient Consumption
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
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

  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  // Function to handle exporting the table to an Excel file
  const handleExportToExcel = () => {
    // Get the table data
    const tableData = [

      ['Patient Name', 'Consumption Date', 'Entered By', 'Remarks'],

    ];


    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, "PatientConsumption_Report.xlsx");
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

            <button className="sSIPatientConsumption-new-patient-button"
              onClick={handleNewPatientConsumptionClick} // Handle button click
            >+ New Patient Consumption</button>
          </div>
        </header>

        <div className="sSIPatientConsumption-controls">
          <div className="sSIPatientConsumption-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
 
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16"value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />


            </label>
            {/* <button className="sSIPatientConsumption-star-button">☆</button>
    <button className="sSIPatientConsumption-more-btn">-</button>
      <button className="sSIPatientConsumption-ok-button">OK</button> */}
          </div>
        </div>
        <div className="sSIPatientConsumption-search-N-results">
          <div className="sSIPatientConsumption-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />

          
          </div>
          <div className="sSIPatientConsumption-results-info">
          Showing {patientConsumptions.length} / {patientConsumptions.length} results
            <button
              className="sSIPatientConsumption-print-btn"
              onClick={handleExportToExcel}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button
              className="sSIPatientConsumption-print-btn"
              onClick={handlePrint}
            >
              <i class="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <div ref={printRef}>
            <h2>Patient Consumption Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Consumption Date</th>
                  <th>Entered By</th>
                  <th>Remarks</th>
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

                    <td><button className="action-button">Action</button></td>
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
        <SSIPatientConsumNewPCbtn /> /
      </CustomModal>
    </div>
  );
}

export default SSIPatientConsumption;
