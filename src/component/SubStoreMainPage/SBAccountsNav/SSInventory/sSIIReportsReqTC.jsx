/* Ajhar Tamboli sSIIReportsReqTC.jsx 19-09-24 */


import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIIReportsReqTC.css";
import { useReactToPrint } from 'react-to-print';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
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

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   documentTitle: 'Requisition_Report',
  //   pageStyle: `
  //     @page {
  //       size: A4;
  //       margin: 20mm;
  //     }
  //   `,
  // });
  // Function to trigger print
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
  const handleViewClick = () => {
    setShowViewRequisition(true);
  };

  // Function to handle exporting the table to an Excel file
  const handleExportToExcel = () => {
    // Get the table data
    const tableData = [
      ['Requisition Date', 'Dispatch Date', 'Item Name', 'Sub CategoryName', 'Request Qty', 'Received Qty', 'Pending Qty', 'Dispatched Qty', 'Remarks'],
      ['2024-06-04', '', 'Soap', 'Soap', '1', '0', '1', '', ''],
      ['2024-06-04', '', 'Soap', 'Soap', '1', '0', '1', '', ''],
    ];

    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, 'Requisition_Report.xlsx');
  };

  return (
    <div className="sSIIReportsReqTC-active-imaging-request">
      <>
        <header className='sSIIReportsReqTC-header'>
          <div className="sSIIReportsReqTC-status-filters">
            <h4><i class="fa-solid fa-star-of-life"></i> Requisition and Dispatch Report</h4>
          </div>
        </header>
        <div className="sSIIReportsReqTC-controls">
          <div className="sSIIReportsReqTC-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
            {/* <button className="sSIIReportsReqTC-star-button">☆</button>
          <button className="sSIIReportsReqTC-more-btn">-</button>
            <button className="sSIIReportsReqTC-ok-button">OK</button> */}
          </div>

          <div className="sSIIReportsReqTC-filter">
            <label>SubCategory</label>
            <select>
              <option value="">ALL</option>
              <option value="">Some Sub Category</option>
              <option value="">Tissue</option>
              <option value="">Cotton</option>
              <option value="">Soap</option>
            </select>
            <button className='sSIIReportsReqTC-print-btn'>Show Report</button>
          </div>
        </div>
        <div className="sSIIReportsReqTC-search-N-results">
          <div className="sSIIReportsReqTC-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSIIReportsReqTC-results-info">
            Showing 2 / 2 results
            <button className='sSIIReportsReqTC-print-btn' onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSIIReportsReqTC-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
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
                    "Remarks"
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
                          onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
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
