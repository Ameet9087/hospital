/* Ajhar Tamboli sSIIReportsTransfer.jsx 19-09-24 */

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIIReportsTransfer.css";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

function SSIIReportsTransfer() {
  const printRef = useRef();
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const tableRef = useRef(null);
  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };

  const closePopups = () => {
    setShowCreateRequisition(false);
    setShowViewRequisition(false);
  };

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

  // Function to handle exporting the table to an Excel file
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "ReportTransfer"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "ReportTransfer.xlsx"); // Downloads the Excel file
  };

  return (
    <div className="sSIIReportsTransfer-active-imaging-request">
      <>
        <header className="sSIIReportsTransfer-header">
          <div className="sSIIReportsTransfer-status-filters">
            <h4>
              <i class="fa-solid fa-star-of-life"></i>Transfer Report
            </h4>
          </div>
        </header>
        <div className="sSIIReportsTransfer-controls">
          <div className="sSIIReportsTransfer-date-range">
            
            <FloatingInput
              label="From Date"
              type="date"
              defaultValue="2024-08-16"
            />
            <FloatingInput
              label="To Date"
              type="date"
             defaultValue="2024-08-09"
            />

            <button className="sSIIReportsTransfer-star-button">☆</button>
            <button className="sSIIReportsTransfer-more-btn">-</button>
            <button className="sSIIReportsTransfer-ok-button">OK</button>
          </div>

          <div className="sSIIReportsTransfer-filter">
            <button className="sSIIReportsTransfer-print-btn">
              Show Report
            </button>
          </div>
        </div>
        <div className="sSIIReportsTransfer-search-N-results">
          <div className="sSIIReportsTransfer-search-bar">
            
            <FloatingInput 
             label={"Search"}
              type="search"
            />
          </div>
          <div className="sSIIReportsTransfer-results-info">
            Showing 2 / 2 results
            <button
              className="sSIIReportsTransfer-print-btn"
              onClick={handleExport}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button
              className="sSIIReportsTransfer-print-btn"
              onClick={printList}
            >
              <i class="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <div ref={tableRef}>
            <h2>Transfer Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
                  <th> Date</th>
                  <th>Department Name</th>
                  <th>Item Name</th>
                  <th>Transfer Qty</th>
                  <th>Remarks</th>
                  <th>Transfer By</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="sSIIReportsTransfer-table-N-paginat">
          <table>
            <thead>
              <tr>
                <th> Date</th>
                <th>Department Name</th>
                <th>Item Name</th>
                <th>Transfer Qty</th>
                <th>Remarks</th>
                <th>Transfer By</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr></tr>
            </tbody>
          </table>
          {/* <div className="sSIIReportsTransfer-pagination">
            <span>0 to 0 of 0</span>
            <button>First</button>
            <button>Previous</button>
            <span>Page 0 of 0</span>
            <button>Next</button>
            <button>Last</button>
          </div> */}
        </div>
      </>
    </div>
  );
}

export default SSIIReportsTransfer;
