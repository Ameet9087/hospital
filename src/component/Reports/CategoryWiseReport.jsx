import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const CategoryWiseReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
const [columnWidths, setColumnWidths] = useState({});
const tableRef = useRef(null);

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
    { date: "2024/05/12", CT_SCAN: 3, MRI: 0, X_RAY: 0 },
    { date: "2024/06/10", CT_SCAN: 2, MRI: 0, X_RAY: 0 },
    { date: "2024/06/14", CT_SCAN: 0, MRI: 0, X_RAY: 0 },
    { date: "2024/06/19", CT_SCAN: 0, MRI: 2, X_RAY: 0 },
    { date: "2024/06/27", CT_SCAN: 0, MRI: 0, X_RAY: 0 },
    { date: "2024/07/10", CT_SCAN: 0, MRI: 0, X_RAY: 2 },
    { date: "2024/07/12", CT_SCAN: 0, MRI: 0, X_RAY: 2 },
    { date: "2024/07/13", CT_SCAN: 0, MRI: 0, X_RAY: 3 },
    { date: "2024/07/22", CT_SCAN: 0, MRI: 0, X_RAY: 2 },
    { date: "2024/07/26", CT_SCAN: 0, MRI: 0, X_RAY: 2 },
    { date: "2024/07/27", CT_SCAN: 0, MRI: 0, X_RAY: 2 },
    { date: "2024/07/30", CT_SCAN: 0, MRI: 0, X_RAY: 2 }
  ];

  // Process data to categorize quantities by type for each date
  const aggregatedData = reportsData.reduce((acc, { date, type, quantity }) => {
    if (!acc[date]) {
      acc[date] = { date, 'CT-SCAN': 0, MRI: 0, 'X-RAY': 0 };
    }
    acc[date][type] += quantity;
    return acc;
  }, {});

  const dataForTable = Object.values(aggregatedData);

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Category Wise Imaging Report</h3>
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
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="user-collection-page-results-info">
              Showing {dataForTable.length}/{dataForTable.length} results
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
              "CT-SCAN",
              "MRI",
              "X-RAY"
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
                {dataForTable.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row['CT-SCAN']}</td>
                    <td>{row.MRI}</td>
                    <td>{row['X-RAY']}</td>
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

export default CategoryWiseReport;
