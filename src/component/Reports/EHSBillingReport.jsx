import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';

const EHSBillingReport = () => {
  const [showReport, setShowReport] = useState(false);


  
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
  const handleSearch = (query) => {
    // Filter reportsData based on the query
    console.log(`Searching for: ${query}`);
  };
  
  const reportsData = [
 
  
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ EHS bill Report</h3>
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
    <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>Billing Type:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>Service Department:</label>
 <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>        </div>
      </div>

        </div>
      </div>
      <div className='user-collection-repor-advance-filter'>
      
      <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>Item Name:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>Rank:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>        </div>
      </div>

      <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>MembershipType:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>User:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>        </div>
      </div>

      
        <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
       
       
        {/* <button className="user-collection-report-show-btn" >Advance Filter</button> */}

       
      </div>

      {showReport && (
        <>
      
   

        </>
      )}
    </div>
  );
};

export default EHSBillingReport;
