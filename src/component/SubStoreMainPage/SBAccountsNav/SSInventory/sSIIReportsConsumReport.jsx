 /* Ajhar Tamboli sSIIReportsConsumReport.jsx 19-09-24 */


import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIIReportsConsumReport.css";
import { useReactToPrint } from 'react-to-print';

function SSIIReportsConsumReport() {
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
    documentTitle: 'Consumption Report',
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
      [' Date', 'Item Name', 'Sub CategoryName', 'Quantity', 'Unit', 'CP Per Unit', 'Total Consumed Value', 'Dispatched Qty', 'User'],
      ['30-Aug-2024', 'tissue', 'tissue', '5', 'Piece', '150', '750', 'Self', 'admin'],
    ];
    
    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Convert the workbook to an Excel file and trigger the download
    XLSX.writeFile(workbook, 'Consumption_Report.xlsx');
  };

  return (
    <div className="sSIIReportsConsumReport-active-imaging-request">
      <>
        <header className='sSIIReportsConsumReport-header'>
          <div className="sSIIReportsConsumReport-status-filters">
            <h4><i class="fa-solid fa-star-of-life"></i> Consumption Report</h4>
          </div>
        </header>
        <div className="sSIIReportsConsumReport-controls">
        <div className="sSIIReportsConsumReport-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
       </div>

          <div className="sSIIReportsConsumReport-filter">
            <label>SubCategory</label>
            <select>
              <option value="">ALL</option>
              <option value="">Some Sub Category</option>
              <option value="">Tissue</option>
              <option value="">Cotton</option>
              <option value="">Soap</option>
            </select>
            <button className='sSIIReportsConsumReport-print-btn'>Show Report</button>
          </div>
        </div>

        <div className="sSIIReportsConsumReport-filterBySubCategory-N-internalConsumption">
        <div className="sSIIReportsConsumReport-filterBySubCategory">

        <label>Filter By SubCategory:</label>
            <select>
              <option value="">ALL</option>
              <option value="">Some Sub Category</option>
              <option value="">Tissue</option>
              <option value="">Cotton</option>
              <option value="">Soap</option>
            </select>
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
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSIIReportsConsumReport-results-info">
            Showing 2 / 2 results
            <button className='sSIIReportsConsumReport-print-btn' onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSIIReportsConsumReport-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <h2>Consumption Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
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
                <tr>
                 
                </tr>
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
              <tr>
               
              </tr>
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
