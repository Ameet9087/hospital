/* Ajhar Tamboli sSIIReportsReqTC.jsx 19-09-24 */

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx"; // Import the xlsx library
import "../SSInventory/sSIIReportsReqTC.css";
import { useReactToPrint } from "react-to-print";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
function SSIIReportsReqTC() {
  const printRef = useRef();
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
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

  // Function to handle exporting the table to an Excel file
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "ReportReq"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "ReportReq.xlsx"); // Downloads the Excel file
  };

  return (
    <div className="sSIIReportsReqTC-active-imaging-request">
      <>
        <header className="sSIIReportsReqTC-header">
          <div className="sSIIReportsReqTC-status-filters">
            <h4>
              <i class="fa-solid fa-star-of-life"></i> Requisition and Dispatch
              Report
            </h4>
          </div>
        </header>
        <div className="sSIIReportsReqTC-controls">
          <div className="sSIIReportsReqTC-date-range">
            <FloatingInput
              label="From Date"
              type="date"
              defaultValue="2024-08-09"
            />
            <FloatingInput label="To Date" 
            type="date"  
            defaultValue="2024-08-16"
            />
          </div>

          <div className="sSIIReportsReqTC-filter">
            
            <FloatingSelect
              label="SubCategory"
              value=""
              onChange={(e) => console.log(e.target.value)}
              options={[
                { value: "", label: "ALL" },
                { value: "Some Sub Category", label: "Some Sub Category" },
                { value: "Tissue", label: "Tissue" },
                { value: "Cotton", label: "Cotton" },
                { value: "Soap", label: "Soap" },
              ]}
            />

            <button className="sSIIReportsReqTC-print-btn">Show Report</button>
          </div>
        </div>
        <div className="sSIIReportsReqTC-search-N-results">
          <div className="sSIIReportsReqTC-search-bar">
            <FloatingInput 
            label={"Search"} 
            type="search" 
            />
          </div>
          <div className="sSIIReportsReqTC-results-info">
            Showing 2 / 2 results
            <button
              className="sSIIReportsReqTC-print-btn"
              onClick={handleExport}
            >
              <i className="fa-regular fa-file-excel" ></i> Export
            </button>
            <button className="sSIIReportsReqTC-print-btn" onClick={printList}>
              <i class="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <div ref={tableRef}>
            <h2>Requisition and Dispatch Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "Requisition Date",
                    "Dispatch Date",
                    "Item Name",
                    "Sub Category Name",
                    "Request Qty",
                    "Received Qty",
                    "Pending Qty",
                    "Dispatched Qty",
                    "Remarks",
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
                <tr>
                  <td>2024-06-04</td>
                  <td></td>
                  <td>Soap</td>
                  <td>Soap</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2024-06-04</td>
                  <td></td>
                  <td>Soap</td>
                  <td>Soap</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="sSIIReportsReqTC-table-N-paginat">
          <table>
            <thead>
              <tr>
                <th>Requisition Date</th>
                <th>Dispatch Date</th>
                <th>Item Name</th>
                <th>Sub CategoryName</th>
                <th>Request Qty</th>
                <th>Received Qty</th>
                <th>Pending Qty</th>
                <th>Dispatched Qty</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-06-04</td>
                <td></td>
                <td>Soap</td>
                <td>Soap</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2024-06-04</td>
                <td></td>
                <td>Soap</td>
                <td>Soap</td>
                <td>1</td>
                <td>0</td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          {/* <div className="sSIIReportsReqTC-pagination">
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

export default SSIIReportsReqTC;
