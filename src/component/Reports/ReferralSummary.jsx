import React, { useState } from 'react';
import './UserCollectionReport.css';

const ReferralSummary = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(''); // State for selected doctor

  // Example data for doctors
  const doctors = ['Dr. John Doe', 'Dr. Jane Smith', 'Dr. Mark Brown']; // Replace with actual data

  // Toggle the date range popup
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handle date range selection
  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    setIsPopupOpen(false);
  };

  // Show the report
  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Prescriber Summary Report</h3>
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

          <div className="user-collection-repor-advance-filter">
            <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
          </div>

         
        </div>
        <div className="patient-census-collection-dep">
            <div className="user-collection-report-doctor-filter">
              <label>Select Prescriber:</label>
              <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                <option value="">Select Doctor Name</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>{doctor}</option>
                ))}
              </select>
            </div>

            <div className="user-collection-report-department-filter">
            <input type="radio" />
              <label>All</label>
            
            </div>
            <div className="user-collection-report-department-filter">
            <input type="radio" />
              <label>InternalOnly</label>
              
            </div>
            <div className="user-collection-report-department-filter">
            <input type="radio" />
              <label>ExternalOnly</label>
              
            </div>
          </div>
      </div>
    </div>
  );
};

export default ReferralSummary;
