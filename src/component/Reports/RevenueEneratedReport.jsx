import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const RevenueEneragedReport = () => {
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

  // Function to calculate VAT at 13%
  const calculateVAT = (amount) => (amount * 0.13).toFixed(2);

  // Placeholder reports data
  const reportsData = [
    { date: "12-May-2024", totalPrice: 1000, paidAmount: 1000 },
    { date: "10-Jun-2024", totalPrice: 46000, paidAmount: 46000 },
    { date: "1-Jun-2024", totalPrice: 14000, paidAmount: 14000 }, // Assumed date correction
    { date: "19-Jun-2024", totalPrice: 58000, paidAmount: 58000 },
    { date: "27-Jun-2024", totalPrice: 2000, paidAmount: 2000 },
    { date: "10-Jan-2024", totalPrice: 23000, paidAmount: 23000 }, // Assumed correction
    { date: "12-Jul-2024", totalPrice: 25000, paidAmount: 25000 },
    { date: "13-Jul-2024", totalPrice: 10000, paidAmount: 30000 }, // Assumed correction
    { date: "22-Jul-2024", totalPrice: 11000, paidAmount: 11000 }, // Assumed correction
    { date: "26-Jul-2024", totalPrice: 13000, paidAmount: 13000 },
    { date: "27-Jul-2024", totalPrice: 13000, paidAmount: 13000 },
    { date: "31-Jan-2024", totalPrice: 11000, paidAmount: 11000 }, // Assumed correction
  ];

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Revenue Generated Report</h3>
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
              Showing 334/334 results
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
            "Total Price",
            "Total Paid Amount",
            "Total VAT (13%)"
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
                {reportsData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.totalPrice.toLocaleString()}</td>
                    <td>{row.paidAmount.toLocaleString()}</td>
                    {/* Displaying the VAT for each row */}
                    <td>{calculateVAT(row.totalPrice)}</td>
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

export default RevenueEneragedReport;
