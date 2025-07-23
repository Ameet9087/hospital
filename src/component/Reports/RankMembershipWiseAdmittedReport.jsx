import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';

const RankMembershipWiseAdmittedReport = () => {
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
        <h3 className="user-collection-report-title">⚛ Total Revenue From Lab Report</h3>
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

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)} // Ensure the handleSearch function is defined
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
                  <th>Admitted Date</th>
                  <th>Hospital No</th>
                  <th>IP Number</th>
                  <th>Rank</th>
                  <th>Scheme</th>
                  <th>Patient Name</th>
                  <th>Age/Sex</th>
                  <th>Address</th>
                  <th>Phone No</th>
                  <th>Admitting Dept</th>
                  <th>Bed Feature</th>                  
                  <th>Bed Code</th>
                </tr>
              </thead>
              <tbody>
                {reportsData && reportsData.length > 0 ? (
                  reportsData.map((row, index) => (
                    <tr key={index}>
                      {/* Render your data cells here */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="user-name-no-row">No Rows To Show</td>
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

export default RankMembershipWiseAdmittedReport;
