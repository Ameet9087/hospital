/* Mohini_SettlementSummaryReport_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './InvoiceBilling.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const SettlementSummaryReport = () => {
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);
  
  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };


  return (
    <div className="invoice-billing-report-container">
      <h1 className="invoice-billing-report-title">⚛ Settlement Summary Report</h1>
      <div className="invoice-billing-note">*Note: Return Sales are not included in this report.</div>

      <div className="invoice-billing-filters-container">
       
          <label>From:</label>
          <input type="date" value="2024-08-23" />
      
        
      
          <label>To:</label>
          <input type="date" value="2024-08-23" />
       
          {/* <button className="invoice-billing-favorite-btn">★</button>
          <button className="invoice-billing-reset-btn">-</button> */}
      
      </div>
      <div className='sales-invoice-number'>
      <label>Select Dispensary:</label>
      <select>
    <option value="">Select Dispensary</option>
    
    {/* Add more options as needed */}
  </select>
  <button className="invoice-billing-show-report-button">Show Report</button>

      </div>
          
        
      
      <div className="invoice-billing-search-export-container">
        <div className="invoice-billing-search-bar">
          <input type="text" placeholder="Search" />
          <button className="invoice-billing-search-button"><i className="fa fa-search"></i></button>
        </div>
        
        <div className="invoice-billing-export-print-buttons">
        <div className="invoice-billing-pagination-info">Showing 0 / 0 results</div>

          <button className="invoice-billing-export-button"onClick={handleExport}>Export</button>
          <button className="invoice-billing-print-button"onClick={handlePrint}>Print</button>
        </div>
      </div>
      {/* <div className='sales-invoice-billing-tab'>  */}
        <div className='table-container'>
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "Hospital",
                 "Patient Name",
                 "Age/Sex",
                 "Contact",
                 "Receivable Amount",
                 "Cash Discount",
                 "Discount Return",
                 "Settlement Data",
                 "Action"
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
        <td colSpan="9" className="invoice-billing-no-rows">No Rows To Show</td>
      </tr>
    </tbody>
  </table>
</div>
      <div className="invoice-billing-pagination-container">
        
        {/* <div className="invoice-billing-pagination-buttons">
          <button className="invoice-billing-pagination-button">First</button>
          <button className="invoice-billing-pagination-button">Previous</button>
          <span>Page 0 of 0</span>
          <button className="invoice-billing-pagination-button">Next</button>
          <button className="invoice-billing-pagination-button">Last</button>
        </div> */}
      </div>
      {/* </div> */}

    </div>
  );
};

export default SettlementSummaryReport;
/* Mohini_SettlementSummaryReport_WholePage_14/sep/2024 */
