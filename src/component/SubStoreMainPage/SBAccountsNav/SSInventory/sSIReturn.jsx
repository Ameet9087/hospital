/* Ajhar Tamboli sSIReturn.jsx 19-09-24 */

import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIReturn.css";
import { useReactToPrint } from "react-to-print";
import SSIRetunReturnItemBtn from "./sSIRetunReturnItemBtn";
import SSIPatientConsumNewPCbtn from "./sSIPatientConsumNewPCbtn";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";

import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { useFilter } from "../../../ShortCuts/useFilter";

function SSIReturn() {
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const [returns, setReturns] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [showNewPatientConsumption, setShowNewPatientConsumption] =
    useState(false); // State to control New Patient Consumption
  const tableRef = useRef(null);

  const handleNewPatientConsumptionClick = () => {
    setShowNewPatientConsumption(true); // Show the new patient consumption component
  };
  const handleBack = () => {
    setShowNewPatientConsumption(false); // Hide the new patient consumption component and go back to the main content
  };

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/substore-return-items`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setReturns(data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchReturns();
  }, []);


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

  const handleViewClick = () => {
    setShowViewRequisition(true);
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "SIReturn"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "SIReturn.xlsx"); // Downloads the Excel file
  };
  const filteredReturns = useFilter(returns,)

  return (
    <div className="sSIReturn-active-imaging-request">
      <>
        <header className="sSIReturn-header">
          <div className="sSIReturn-status-filters">

            <button
              className="sSIReturn-new-patient-button"
              onClick={handleNewPatientConsumptionClick} // Handle button click
            >
              Returns Item
            </button>
          </div>
          <div className="sSIReturn-filterBySubCategory">

            <FloatingSelect
              label="Select Inventory"
              options={[{ value: "", label: "GENERAL-INVENTORY" }]}
            />
          </div>
        </header>
        <div className="sSIReturn-controls">
          <div className="sSIReturn-date-range">
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

            <button className="sSIReturn-star-button">☆</button>
            <button className="sSIReturn-more-btn">-</button>
            <button className="sSIReturn-ok-button">OK</button>
          </div>
        </div>


        <div className="sSIReturn-search-N-results">
          <div className="sSIReturn-search-bar">

            <FloatingInput
              label={"text"}
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sSIReturn-results-info">
            Showing 2 / 2 results
            <button className="sSIReturn-print-btn" onClick={handleExport}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className="sSIReturn-print-btn" onClick={printList}>
              <i class="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <div ref={tableRef}>
            <h2>Retrun Item Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th> Store Name</th>
                  <th>Date</th>
                  <th>Returned By</th>
                  <th>Remarks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {returns.length > 0 ? (
                  returns.map((item, index) => (
                    <tr key={index}>
                      <td>{item.storeName}</td>
                      <td>{item.returnDate}</td>
                      <td>{item.returnedBy}</td>
                      <td>{item.remarks}</td>
                      <td>
                        <button className="action-button">Action</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-rows-message">
                      No Rows To Show
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="sSIReturn-table-N-paginat">
          <table>
            <thead>
              <tr>
                <th> Store Name</th>
                <th>Date</th>
                <th>Returned By</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReturns.length > 0 ? (
                filteredReturns.map((item, index) => (
                  <tr key={index}>
                    <td>{item.storeName}</td>
                    <td>{item.returnDate}</td>
                    <td>{item.returnedBy}</td>
                    <td>{item.remarks}</td>

                    <td>
                      <button className="action-button">Action</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-rows-message">
                    No Rows To Show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>

      <CustomModal isOpen={showNewPatientConsumption} onClose={handleBack}>
        <SSIRetunReturnItemBtn />
      </CustomModal>
    </div>
  );
}

export default SSIReturn;
