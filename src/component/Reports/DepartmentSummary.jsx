import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';

const DepartmentSummary = () => {
    const [showReport, setShowReport] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
  
    // Sample data for doctors and departments
    const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams']; // Example doctor list
    const departments = ['Cardiology', 'Neurology', 'Orthopedics']; // Example department list
  
    // Handles the print functionality
    const handlePrint = () => {
      window.print(); // Simple print functionality using the browser's print dialog
    };
  
    // Placeholder function to handle export functionality
    const handleExport = () => {
      console.log('Export function not yet implemented');
      // Implement your export logic here
    };
  
    // Toggles the popup for date range selection
    const handlePopupToggle = () => {
      setIsPopupOpen(!isPopupOpen);
    };
  
    // Handles date range selection from the popup
    const handleDateRangeSelection = (range) => {
      console.log('Selected Range:', range);
      // Implement the logic to filter data based on the selected range
      setIsPopupOpen(false); // Close the popup after selection
    };
  
    // Handles the search functionality (placeholder)
    const handleSearch = (query) => {
      console.log(`Searching for: ${query}`);
      // Implement search logic based on the query
    };
  
    // Shows the report section when the button is clicked
    const handleShowReport = () => {
      setShowReport(true);
    };
  
  return (
    <div className="user-collection-report">
    <div className="user-collection-report-header">
      <h3 className="user-collection-report-title">⚛Patient Census Report</h3>
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
          <label>Billing Type:</label>
          <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
            <option value="">Select Billing</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor}>{doctor}</option>
            ))}
          </select>
        </div>
        <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>

        
      </div>
      

    </div>

  </div>
);
};
export default DepartmentSummary;
