import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';

const DoctorsReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Example of how you might fetch or have data
  const reportsData = []; // Replace this with your actual data source or API call

  const VAT_RATE = 0.13;
  const DISCOUNT_RATE = 0.10;

  const calculateTotalVAT = (revenue) => revenue * VAT_RATE;
  const calculateTotalDiscount = (revenue) => revenue * DISCOUNT_RATE;

  const handlePrint = () => {
    window.print(); // Simple print functionality using the browser's print dialog
  };

  const handleExport = () => {
    console.log('Export function not yet implemented');
    // Implement your export logic here
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ DoctorWise Patient Report</h3>
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
          <div className="user-collection-report-doctor-filter">
            <label>Doctor Name:</label>
            <select>
              <option value="">Select Doctor Name</option>
              {/* Add options dynamically if needed */}
            </select>
            <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
          </div>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => console.log(e.target.value)} // Implement handleSearch function if needed
            />
            <div className="user-collection-page-results-info">
              Showing {reportsData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className='user-collection-report-tab'>
            <table className="user-collection-report-table">
              <thead>
                <tr>
                  <th>Appointment Date</th>
                  <th>Hospital No</th>
                  <th>Hospital Dialysis No</th>
                  <th>Patient Name</th>
                  <th>Age/Sex</th>
                  <th>Prescriber Name</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {reportsData && reportsData.length > 0 ? (
                  reportsData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.date}</td>
                      <td>{row.hospitalNo}</td>
                      <td>{row.hospitalDialysisNo}</td>
                      <td>{row.patientName}</td>
                      <td>{row.ageSex}</td>
                      <td>{row.prescriberName}</td>
                      <td>{/* Add any additional calculations or totals here */}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="user-name-no-row">No Rows To Show</td>
                  </tr>
                )}
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
        </>
      )}
    </div>
  );
};

export default DoctorsReport;
