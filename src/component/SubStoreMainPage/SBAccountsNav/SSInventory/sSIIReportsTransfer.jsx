 /* Ajhar Tamboli sSIIReportsTransfer.jsx 19-09-24 */


import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIIReportsTransfer.css";
import { useReactToPrint } from 'react-to-print';

function SSIIReportsTransfer() {
  const printRef = useRef();
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };

  const closePopups = () => {
    setShowCreateRequisition(false);
    setShowViewRequisition(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Transfer Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleViewClick = () => {
    setShowViewRequisition(true);
  };

  // Function to handle exporting the table to an Excel file
  const handleExportToExcel = () => {
    // Get the table data
    const tableData = [
      [' Date', 'Department Name', 'Item Name', 'Transfer Qty', 'Remarks', 'Transfer By'],
      
    ];

    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, 'Requisition_Report.xlsx');
  };

  return (
    <div className="sSIIReportsTransfer-active-imaging-request">
      <>
        <header className='sSIIReportsTransfer-header'>
          <div className="sSIIReportsTransfer-status-filters">
            <h4><i class="fa-solid fa-star-of-life"></i>Transfer Report</h4>
          </div>
        </header>
        <div className="sSIIReportsTransfer-controls">

        <div className="sSIIReportsTransfer-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
</div>

     
          <div className="sSIIReportsTransfer-filter">
          
            <button className='sSIIReportsTransfer-print-btn'>Show Report</button>
          </div>
        </div>
        <div className="sSIIReportsTransfer-search-N-results">
          <div className="sSIIReportsTransfer-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSIIReportsTransfer-results-info">
            Showing 2 / 2 results
            <button className='sSIIReportsTransfer-print-btn' onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSIIReportsTransfer-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
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
                <tr>
                 
                </tr>
                <tr>
                
                </tr>
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
              <tr>
                
              </tr>
              <tr>
                
              </tr>
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
