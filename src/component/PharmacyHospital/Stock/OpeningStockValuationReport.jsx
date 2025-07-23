/* Mohini_OpeningStockValuationReport_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './PharmacyExpiryReport.css';
import * as XLSX from 'xlsx';

import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
const OpeningStockValuationReport = () => {
  const [fromDate, setFromDate] = useState('24-08-2024');
  const [toDate, setToDate] = useState('24-08-2024');
  const [genericName, setGenericName] = useState('');
  const [itemName, setItemName] = useState('');
  const [selectStore, setSelectStore] = useState('');
  const [nearlyExpired, setNearlyExpired] = useState(false);
  const [expired, setExpired] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
    <div className="pharmacy-expiry-report-container">
      <h1>⚛ Opening Stock Valuation Report</h1>
      
      <div className="pharmacy-expiry-report-date-range">
        <div>
          <label>From:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label>To:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
     
        <button className="pharmacy-expiry-report-show-report-btn">🔍 Show Report</button>

      </div>

      {/* <div className="pharmacy-expiry-report-filters">
        
        
       
        <button className="pharmacy-expiry-report-show-report-btn">🔍 Show Report</button>
      </div> */}

      {/* <div className="pharmacy-expiry-report-checkboxes">
        <label>
          <input type="checkbox" checked={nearlyExpired} onChange={(e) => setNearlyExpired(e.target.checked)} />
          Nearly Expired Item
        </label>
        <label>
          <input type="checkbox" checked={expired} onChange={(e) => setExpired(e.target.checked)} />
          Expired Item
        </label>
      </div> */}

      <div className="pharmacy-expiry-report-search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pharmacy-expiry-report-results-info">
        <span>Showing 0 / 0 results</span>
        <button className="pharmacy-expiry-report-export-btn"onClick={handleExport}>⬇ Export</button>
        <button className="pharmacy-expiry-report-print-btn"onClick={handlePrint}>Print</button>
      </div>
   <div className='table-container'>
   <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "Store",
                "Sales Value",
                "Purchase Value"
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
            <td colSpan="3" className="pharmacy-expiry-report-no-rows">No Rows To Show</td>
          </tr>
        </tbody>
      </table>

      {/* <div className="pharmacy-expiry-report-pagination">
        <span>0 to 0 of 0</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 0 of 0</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}
      </div>
      {/* <div className="pharmacy-expiry-report-summary">
        <h2>Summary</h2>
        <div>
          <span>Total Returned Amount</span>
         
        </div>
       
      </div> */}
    </div>
  );
};

export default OpeningStockValuationReport;
/* Mohini_OpeningStockValuationReport_WholePage_14/sep/2024 */
