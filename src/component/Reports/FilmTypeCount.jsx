import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';

const FilmTypeCount = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
    setIsPopupOpen(false); // Close the popup after selection
  };

  const handleShowReport = () => {
    setShowReport(true); // Show the report when button is clicked
  };

  const handleSearch = (searchTerm) => {
    console.log('Search term:', searchTerm);
    // Implement your search logic here
  };

  // Placeholder reports data
  const reportsData = [
    { filmType: "C.T.SCAN(14*7)", quantityUsed: 3 },
    { filmType: "X-Ray(10*12)", quantityUsed: 2 },
    { filmType: "X-Ray(14*17)", quantityUsed: 0 },
    { filmType: "X-Ray(8*10).", quantityUsed: 1 },

    
  ];

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Film Type Count Report</h3>
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
          <div className="user-collection-report-counter-filter">
            <label>Counter:</label>
            <select>
              <option value="All">All</option>
              {/* Add more options as needed */}
            </select>
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
              onChange={(e) => handleSearch(e.target.value)}
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
                  <th>Film Type</th>
                  <th>Film Quantity Used</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.filmType}</td>
                    <td>{row.quantityUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              {/* Add pagination functionality */}
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilmTypeCount;
