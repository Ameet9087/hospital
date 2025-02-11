/* Mohini_InsurancePatientReport_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import './InsurancePatientReport.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

function InsurancePatientReport() {
  const [fromDate, setFromDate] = useState('23-08-2024');
  const [toDate, setToDate] = useState('23-08-2024');
  const [nhif, setNhif] = useState('');
  const [claimCode, setClaimCode] = useState('');
  const [counter, setCounter] = useState('All');
  const [user, setUser] = useState('All');
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
    <div className="insurance-patient-report-container">
      <div className="insurance-patient-report-report-header">
        <h2>⚛ Insurance Patient (BIMA) Report</h2>
        <span className="insurance-patient-report-note">(*Note: Return Sales are not included in this report.)</span>
        
      </div>
      <div className="insurance-patient-report-date-range">
          <label>
            From:
            <input 
              type="date" 
              value={fromDate} 
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input 
              type="date" 
              value={toDate} 
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          {/* <button className="insurance-patient-report-star-btn">⭐</button>
          <button className="insurance-patient-report-minus-btn">-</button> */}
        </div>
      <div className="insurance-patient-report-filters">
        <label>
          NHIF:
          <input 
            type="text" 
            value={nhif} 
            onChange={(e) => setNhif(e.target.value)}
          />
        </label>
        <label>
          ClaimCode:
          <input 
            type="text" 
            value={claimCode} 
            onChange={(e) => setClaimCode(e.target.value)}
          />
        </label>
        <label>
          Counter:
          <select value={counter} onChange={(e) => setCounter(e.target.value)}>
            <option value="All">All</option>
          </select>
        </label>
        <label>
          User:
          <select value={user} onChange={(e) => setUser(e.target.value)}>
            <option value="All">All</option>
          </select>
        </label>
        <button className="insurance-patient-report-show-report-btn">Show Report</button>
      </div>
      <input 
          type="text" 
          placeholder="Search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <div className="insurance-patient-report-search-bar">
        
        <span >Showing 0 / 0 results</span>
        <button onClick={handleExport}>Export</button>
        <button onClick={handlePrint}>Print</button>
      </div>
<div className='table-container'>
<table  ref={tableRef}>
          <thead>
            <tr>
              {[
               "Date",
  "Bill No",
  "Hospital No",
  "Patient",
  "NHIF",
  "ClaimCode",
  "SubTotal",
  "Total",
  "User",
  "Counter"
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
            <td colSpan="10" className="insurance-patient-report-no-rows">No Rows To Show</td>
          </tr>
        </tbody>
      </table>

      {/* <div className="insurance-patient-report-pagination">
        <span>0 to 0 of 0</span>
        <button disabled>First</button>
        <button disabled>Previous</button>
        <span>Page 0 of 0</span>
        <button disabled>Next</button>
        <button disabled>Last</button>
      </div> */}
      </div>
      <div className="insurance-patient-report-summary">
        <h3>Summary</h3>
        <p>Total Insurance Sales Value: <span>0</span></p>
      </div>
    </div>
  );
}

export default InsurancePatientReport;
/* Mohini_InsurancePatientReport_WholePage_14/sep/2024 */

