

import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import "../NavBarSection/navExternalLabs.css"

function NavExternalLabs() {
  const [fromDate, setFromDate] = useState('2024-08-12');
  const [toDate, setToDate] = useState('2024-08-12');
  const tableRef = useRef(null);
  
  const handleExport = () => {
   

    // Get the table element
    const table = document.querySelector('.labExternalLab-test-table');
    
    // Convert the table to a worksheet
    const workbook = XLSX.utils.table_to_book(table, {sheet: "Sheet1"});
    
    // Generate an Excel file and trigger a download
    XLSX.writeFile(workbook, 'ExternalLabTestList.xlsx');
  };
  const handlePrint = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text('External Lab Test List', 14, 15);

    // Add date range and current date/time
    doc.setFontSize(12);
    doc.text(`From: ${fromDate}`, 14, 25);
    doc.text(`To: ${toDate}`, 14, 32);
    const currentDate = new Date().toLocaleString();
    doc.text(`Generated on: ${currentDate}`, 14, 39);

    // Add table
    doc.autoTable({ 
      html: '.labExternalLab-test-table',
      startY: 45,
    });

    // Open PDF in new tab
    window.open(doc.output('bloburl'), '_blank');
  };


  return (
    <div className="labExternalLab-test-list">
      <h5>External Lab Test List</h5>
      <div className="labExternalLab-filters">
        
        
        <div className="labExternalLab-controls">
        {/* Your date range and button controls */}
          <div className="labExternalLab-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
            <button className="labExternalLab-star-button">☆</button>
            <button className="labExternalLab-ok-button">OK</button>
          </div>
      </div>
        <div className="labExternalLab-hospital-no">
          <label>Hospital No:</label>
          <input type="text" placeholder="Enter Hospital Number..." />
        </div>
        <div className="labExternalLab-patient-name">
          <label>Patient Name:</label>
          <input type="text" placeholder="Enter Patient Name" />
        </div>
      </div>
      <div className='labExternalLab-second-header'>
        <div className="labExternalLab-search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="labExternalLab-vendor-select">
          <label>Vendor:</label>
          <select>
            <option>Shadon</option>
          </select>
        </div>
        <div className="labExternalLab-lab-tests">
          <label>Lab Tests:</label>
        </div>
        <div className="labExternalLab-lab-status">
          <label>External Lab Status:</label>
          <select>
            <option>Sample Collected</option>
            <option>Sample Dispatched</option>
            <option>Report Received</option>
          </select>
        </div>
      </div>
      <div className="labExternalLab-action-buttons">
        <button className="labExternalLab-load-btn"><i className="fa-solid fa-rotate"></i> Load</button>
        <button className="labExternalLab-print-btn" onClick={handlePrint}>Print <i className="fa-solid fa-print"></i></button>
        <button className="labExternalLab-export-btn" onClick={handleExport}>Export <i className="fa-regular fa-file-excel"></i></button>
      </div>
      <table className="labExternalLab-test-table" ref={tableRef}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Patient Name</th>
            <th>Hospital No.</th>
            <th>Test Name</th>
            <th>Vendor Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows would be populated here */}
        </tbody>
      </table>
      <div className="labExternalLab-pagination">
        <button>« Previous</button>
        <button>Next »</button>
      </div>
    </div>
  );
}

export default NavExternalLabs;
