import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import './UserCollectionReport.css';

const DialysisPatientDetails = () => {
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
    {
        date: '12-Feb-2024',
        hospitalNo: '2402000022',
        hospitalDialysisNo: '2',
        patientName: 'James Ngugi Thiongo',
        ageSex: '34Y/M',
        prescriberName: 'admin admin',
      },
      {
        date: '25-Jun-2024',
        hospitalNo: '2406003788',
        hospitalDialysisNo: '3',
        patientName: 'Cdsfssdfsdf Dsfsdffdsfs Dsfcsdfs',
        ageSex: '3M/M',
        prescriberName: 'admin admin',
      },
      {
        date: '08-Jul-2024',
        hospitalNo: '2407003790',
        hospitalDialysisNo: '4',
        patientName: 'Stephen Kariuki',
        ageSex: '45Y/M',
        prescriberName: 'admin admin',
      },
      {
        date: '30-Jul-2024',
        hospitalNo: '2407003800',
        hospitalDialysisNo: '', // Assuming no dialysis number for this entry
        patientName: 'NORALINE SHIT PACQUIO',
        ageSex: '30Y/F',
        prescriberName: 'admin admin',
      },
];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Dialysis Patient Report</h3>
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
          <label>Counter:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>User:</label>
          <input type="text" placeholder="Enter User Name" />
        </div>
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
          Showing 4/4 results
        </div>

      <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
      <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
     
    </div>
<div className='user-collection-report-tab'>
  
<table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
             "Date",
            "Hospital No",
            "HospitalDialysis",
            "Patient Name",
            "Age/Sex",
            "Prescriber Name"
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
                  <td>{row.date}</td>
              <td>{row.hospitalNo}</td>
              <td>{row.hospitalDialysisNo}</td>
              <td>{row.patientName}</td>
              <td>{row.ageSex}</td>
              <td>{row.prescriberName}</td>
                </tr>
              ))}
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
          <h4 className="user-collection-report-net-collection">Net Cash Collection: (791,952.24)</h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
    <tbody>
      <tr><td>Gross Total Sales</td><td>819,900.00</td></tr>
      <tr><td>Discount</td><td>14,505.00</td></tr>
      <tr><td>Return SubTotal</td><td>0.00</td></tr>
      <tr><td>Return Discount</td><td>0.00</td></tr>  
      <tr><td>Return Amount</td><td>0.00</td></tr>
      <tr><td>Net Sales</td><td>805,395.00</td></tr>
      <tr><td>Less Credit Amount</td><td>5,840.00</td></tr>
      <tr><td>Add Deposit Received</td><td>259,147.00</td></tr>
      <tr><td>Less Deposit Refund</td><td>28,725.00</td></tr>
      <tr><td>Add Collection From Receivables</td><td>1,975.24</td></tr>
      <tr><td>Less Cash Discount</td><td>0.00</td></tr>
      <tr><td>Other Payments Given</td><td>0.00</td></tr>
      <tr><td>Total Collection</td><td>791,952.24</td></tr>
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

export default DialysisPatientDetails;
