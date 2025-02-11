import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const TotalRevenueCom = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Sample data including dates and revenue
  const reportsData = [
    { date: '09.Feb-2024', revenue: 2400 },
    { date: '16.Feb-2024', revenue: 4000 },
    { date: '19.Feb-2024', revenue: 600 },
    { date: '16.Apr-2024', revenue: 600 },
    { date: '12.May-2024', revenue: 1800 },
    { date: '10.Jun-2024', revenue: 4200 },
    { date: '11.Jun-2024', revenue: 1000 },
    { date: '18.Jun-2024', revenue: 3000 },
    { date: '19.Jun-2024', revenue: 16500 },
    { date: '20.Jun-2024', revenue: 1000 },
    { date: '27.Jun-2024', revenue: 2800 },
    { date: '01.Jul-2024', revenue: 11000 },
    { date: '11.Jul-2024', revenue: 1000 },
    { date: '24.Jul-2024', revenue: 3600 },
    { date: '01.Aug-2024', revenue: 1500 },
    { date: '27.Aug-2024', revenue: 300 },
    { date: '28.Aug-2024', revenue: 1700 },
    { date: '29.Aug-2024', revenue: 1200 },
    { date: '30.Aug-2024', revenue: 500 },
    { date: '31.Aug-2024', revenue: 600 }
  ];

  // Calculate Total VAT (13%) and Total Discount (assuming a discount rate, e.g., 10%)
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
          <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
               "Date",
              "Total Revenue",
              "Total VAT (13%)",
              "Total Discount (10%)"
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
                    <td>{row.revenue.toFixed(2)}</td>
                    <td>{calculateTotalVAT(row.revenue).toFixed(2)}</td>
                    <td>{calculateTotalDiscount(row.revenue).toFixed(2)}</td>
                  </tr>
                ))}
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

export default TotalRevenueCom;
