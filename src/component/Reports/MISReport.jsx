import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';

const MISReport = () => {
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
 
  

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Return Bill Report</h3>
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
    <div className='user-collection-repor-advance-filter'>
      
      <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
  
     
    </div>

          {/* <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button> */}
          <div className="user-collection-report-user-filter">
          {/* <label htmlFor="user-checkbox">IsInsurance  :</label>
  <input type="checkbox" id="user-checkbox" /> */}
  {/* <button className="user-collection-report-show-btn" >Advance Filter</button> */}

</div>

        </div>
      </div>
     
      

      
      
     
   
 
         

    </div>
  );
};

export default MISReport;
