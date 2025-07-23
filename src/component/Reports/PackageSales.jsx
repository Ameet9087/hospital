import React, { useState } from 'react';
import './UserCollectionReport.css';

const PackageSales = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log(`Selected date range: ${range}`);
    // Add logic to handle date range selection
    setIsPopupOpen(false); // Close the popup after selection
  };

  const handleShowReport = () => {
    console.log('Show Report clicked');
    // Add logic to display the report
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Package Sales Details Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" />
            <label>To:</label>
            <input type="date" />
            <button className="user-collection-report-fav-btn">☆</button>
            <button className="user-collection-report-fav-btn" onClick={handlePopupToggle}>
              {isPopupOpen ? '-' : '+'}
            </button>

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

          <div className="user-collection-report-advance-filter">
            <button className="user-collection-report-show-btn" onClick={handleShowReport}>
              Show Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageSales;
