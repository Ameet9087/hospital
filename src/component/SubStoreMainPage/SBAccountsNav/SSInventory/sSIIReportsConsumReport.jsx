/* Ajhar Tamboli sSIIReportsConsumReport.jsx 19-09-24 */

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIIReportsConsumReport.css";
import { useReactToPrint } from "react-to-print";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

function SSIIReportsConsumReport() {
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

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "ConsumeReport"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "ConsumeReport.xlsx"); // Downloads the Excel file
  };

  return (
    <div className="sSIIReportsConsumReport-active-imaging-request">
      <>
        <header className="sSIIReportsConsumReport-header">
          <div className="sSIIReportsConsumReport-status-filters">
            <h4>
              <i class="fa-solid fa-star-of-life"></i> Consumption Report
            </h4>
          </div>
        </header>
        <div className="sSIIReportsConsumReport-controls">
          <div className="sSIIReportsConsumReport-date-range">
            <FloatingInput
              label={"From Date"}
              type="date"
              defaultValue="2024-08-09"
            />
            <FloatingInput
              label={"To Date"}
              type="date"
              defaultValue="2024-08-16"
            />

            <button className="sSIIReportsConsumReport-star-button">☆</button>
            <button className="sSIIReportsConsumReport-more-btn">-</button>
            <button className="sSIIReportsConsumReport-ok-button">OK</button>
          </div>

          <div className="sSIIReportsConsumReport-filter">
            <FloatingSelect
              label={"SubCategory"}
              options={[
                { value: "", label: "ALL" },
                { value: "Some Sub Category", label: "Some Sub Category" },
                { value: "Tissue", label: "Tissue" },
                { value: "Cotton", label: "Cotton" },
                { value: "Soap", label: "Soap" },
              ]}
            />

            <button className="sSIIReportsConsumReport-print-btn">
              Show Report
            </button>
          </div>
        </div>

        <div className="sSIIReportsConsumReport-filterBySubCategory-N-internalConsumption">
          <div className="sSIIReportsConsumReport-filterBySubCategory">
            <FloatingSelect
              label={"Filter By SubCategory"}
              options={[
                { value: "", label: "ALL" },
                { value: "Some Sub Category", label: "Some Sub Category" },
                { value: "Tissue", label: "Tissue" },
                { value: "Cotton", label: "Cotton" },
                { value: "Soap", label: "Soap" },
              ]}
            />
          </div>
          <div className="sSIIReportsConsumReport-internalConsumption">
            <input type="checkbox" />
            <label htmlFor=""> Internal Consumption</label>
            <input type="checkbox" />
            <label htmlFor=""> Patient Consumption</label>
          </div>
        </div>

        <div className="sSIIReportsConsumReport-search-N-results">
          <div className="sSIIReportsConsumReport-search-bar">
            <FloatingInput
              label={"Search"}
              type="search"
              className="search-box"
            />
          </div>
          <div className="sSIIReportsConsumReport-results-info">
            Showing 2 / 2 results
            <button
              className="sSIIReportsConsumReport-print-btn"
              onClick={handleExport}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button
              className="sSIIReportsConsumReport-print-btn"
              onClick={printList}
            >
              <i class="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <div ref={tableRef}>
            <h2>Consumption Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table ref={tableRef}>
              <thead>
                <tr>
                  <th> Date</th>
                  <th>Item Name</th>
                  <th>Sub CategoryName</th>
                  <th> Quantity</th>
                  <th>Unit</th>
                  <th>CP Per Unit</th>
                  <th>Total Consumed Value</th>
                  <th>Consumption Type</th>
                  <th>User</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30-Aug-2024</td>
                  <td>tissue</td>
                  <td>tissue</td>
                  <td>5</td>
                  <td>Piece</td>
                  <td>150</td>
                  <td>750</td>
                  <td>Self</td>
                  <td>admin</td>
                  <td></td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="sSIIReportsConsumReport-table-N-paginat">
          <table>
            <thead>
              <tr>
                <th> Date</th>
                <th>Item Name</th>
                <th>Sub CategoryName</th>
                <th> Quantity</th>
                <th>Unit</th>
                <th>CP Per Unit</th>
                <th>Total Consumed Value</th>
                <th>Consumption Type</th>
                <th>User</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>30-Aug-2024</td>
                <td>tissue</td>
                <td>tissue</td>
                <td>5</td>
                <td>Piece</td>
                <td>150</td>
                <td>750</td>
                <td>Self</td>
                <td>admin</td>
                <td></td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
          {/* <div className="sSIIReportsConsumReport-pagination">
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

export default SSIIReportsConsumReport;
