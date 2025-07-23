import React, { useState } from 'react';
import './UserCollectionReport.css';

const LabCultureDetails = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState(['Dr. Smith', 'Dr. Johnson', 'Dr. Williams']); // Example doctors list

  // Manage checkbox states
  const [checkboxStates, setCheckboxStates] = useState({
    all: true,
    samplePending: false,
    resultPending: false,
    resultAdded: true,
    reportFinalized: true,
  });

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxStates((prevStates) => {
      if (name === 'all') {
        // Set all checkboxes based on 'All' checkbox
        return {
          all: checked,
          samplePending: checked,
          resultPending: checked,
          resultAdded: checked,
          reportFinalized: checked,
        };
      } else {
        // Set individual checkboxes
        const newState = {
          ...prevStates,
          [name]: checked,
        };
        // If any checkbox is unchecked, uncheck 'All'
        const allChecked = Object.values(newState).every((value) => value);
        return {
          ...newState,
          all: allChecked,
        };
      }
    });
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Culture Test Details Report</h3>
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
        
          <button className="user-collection-report-show-btn" >Show Report</button>
        </div>
      </div>

      {/* Add table or other elements to display report data */}
    </div>
  );
};

export default LabCultureDetails;
