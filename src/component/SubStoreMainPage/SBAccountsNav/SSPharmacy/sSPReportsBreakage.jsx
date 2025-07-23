/* Ajhar Tamboli sSPReportsBreakage.jsx 19-09-24 */


import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSPharmacy/sSPReportsBreakage.css";
import { useReactToPrint } from 'react-to-print';

function SSPReportsBreakage() {
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
    documentTitle: 'Breakage Report',
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
      [ ' Date', 'Item Name','Quantity','MRP','Total Amount','Remark' ],
      
    ];
  

                  
    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, 'Breakage_Report.xlsx');
  };

  return (
    <div className="sSPReportsBreakage-active-imaging-request">
      <>
        <header className='sSPReportsBreakage-header'>
          <div className="sSPReportsBreakage-status-filters">
            <h4><i class="fa-solid fa-star-of-life"></i>Breakage Report </h4>
          </div>
        </header>
        <div className="sSPReportsBreakage-controls">
        <div className="sSPReportsBreakage-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>
      {/* <button className="sSPReportsBreakage-star-button">☆</button>
    <button className="sSPReportsBreakage-more-btn">-</button>
      <button className="sSPReportsBreakage-ok-button">OK</button> */}
    </div>

          <div className="sSPReportsBreakage-filter">
            {/* <label>SubCategory</label>
            <select>
              <option value="">ALL</option>
              <option value="">Some Sub Category</option>
              <option value="">Tissue</option>
              <option value="">Cotton</option>
              <option value="">Soap</option>
            </select> */}
            <button className='sSPReportsBreakage-print-btn'>Show Report</button>
          </div>
        </div>
        <div className="sSPReportsBreakage-search-N-results">
          <div className="sSPReportsBreakage-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSPReportsBreakage-results-info">
            Showing 2 / 2 results
            <button className='sSPReportsBreakage-print-btn' onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSPReportsBreakage-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <h2>Breakage Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <table>
              <thead>
                <tr>
               
              <th>  Date</th>
                  <th>Item Name</th>
                  <th> Quantity</th>
                  <th> MRP</th>
                  <th> Total Amount</th>
                  <th> Remark</th>
                  
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
        <div className="sSPReportsBreakage-table-N-paginat">
          <table>
            <thead>
              <tr>
              <th>  Date</th>
                  <th>Item Name</th>
                  <th> Quantity</th>
                  <th> MRP</th>
                  <th> Total Amount</th>
                  <th> Remark</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                
              </tr>
              <tr>
                
              </tr>
            </tbody>
          </table>
          {/* <div className="sSPReportsBreakage-pagination">
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

export default SSPReportsBreakage;
