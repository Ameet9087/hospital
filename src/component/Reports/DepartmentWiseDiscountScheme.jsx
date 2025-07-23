import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const DepartmentWiseDiscountScheme = () => {
  const [showReport, setShowReport] = useState(false);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  
  const handlePrint = () => {
    window.print(); // Simple print functionality using the browser's print dialog
  };

  // Function to handle export (placeholder function)
  const handleExport = () => {
    console.log('Export function not yet implemented');
    // Implement your export logic here
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };
  const reportsData = [
  
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Department Wise Discount Scheme Report</h3>
        <div className="user-collection-report-filters">
        <div className="user-collection-report-date-filter">
      <label>From:</label>
      <input type="date" />
      <label>To:</label>
      <input type="date" />
      <button className="user-collection-report-fav-btn">☆</button>
      <button className="user-collection-report-fav-btn" onClick={handlePopupToggle}>-</button>

      {isPopupOpen && (
        <div className="user-collection-popup">
          <ul className="user-collection-popup-list">
            <li onClick={() => handleDateRangeSelection('Today')}>Today</li>
            <li onClick={() => handleDateRangeSelection('Last 1 Week')}>Last 1 Week</li>
            <li onClick={() => handleDateRangeSelection('Last 1 Month')}>Last 1 Month</li>
            <li onClick={() => handleDateRangeSelection('Last 3 Months')}>Last 3 Months</li>
          </ul>
        </div>
      )}
    </div>
          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>
      </div>
      <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>Service Department:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>Scheme Name:</label>
          <input type="text" placeholder="Enter User Name" />
        </div>
      </div>
      <div className="user-collection-report-counter-filter">
          <label>Select Payment Mode:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>

      {showReport && (
        <>
        <div className="user-collection-report-controls">
      {/* Search Input */}
      <input
        type="text"
        className="user-collection-report-search"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)} // Ensure the handleSearch function is defined
      />
      
      {/* Print and Export Buttons */}
      <div className="user-collection-page-results-info">
          Showing 334/334 results
        </div>

      <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
      <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
     
    </div>
<div className='user-collection-report-tab'>
  

<table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
          "Service Department",
          "Scheme Name",
          "Total Quantity",
          "Total Invoice Amount",
          "Total Discount",
          "Net Refund",
          "Hospital Collection",
          "Payment Mode",
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
              {reportsData.map((row, index) => (
                <tr key={index}>
                  <td>{row.serviceDepartment}</td>
        <td>{row.schemeName}</td>
        <td>{row.totalQuantity}</td>
        <td>{row.totalInvoiceAmount}</td>
        <td>{row.totalDiscount}</td>
        <td>{row.netRefund}</td>
        <td>{row.hospitalCollection}</td>
        <td>{row.paymentMode}</td>
        <td>{row.action}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
          <tr>
            <td colSpan="19" className="user-name-no-row">No Rows To Show</td>
          </tr>
        </tbody>

          </table>
          <div className="user-collection-report-page-no">
  <Button className="user-collection-report-pagination-btn">First</Button>
  <Button className="user-collection-report-pagination-btn">Previous</Button>
  <span>Page 1 of 4</span>
  <Button className="user-collection-report-pagination-btn">Next</Button>
  <Button className="user-collection-report-pagination-btn">Last</Button>
</div>
</div>
          <div className='net-cash-collection-header'>
          <h4 className="user-collection-report-net-collection">Summary
          </h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
    <tbody>
      <tr><td>Total Invoice Amount</td><td>0</td></tr>
      <tr><td>Total Discount</td><td>0</td></tr>
      <tr><td>Net refund</td><td>0</td></tr>
      <tr><td>Hos ital Collection (A-(B+C))</td><td>0</td></tr>
      
    </tbody>
  </table>
  {/* Uncomment and use this button if needed */}
  <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
  </div>
          </div>

        </>
      )}
    </div>
  );
};

export default DepartmentWiseDiscountScheme;
