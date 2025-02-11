import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const DiscountSchemeReport = () => {
  const [showReport, setShowReport] = useState(false);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);



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
  const reportsData = [
    {
      schemeName: 'NHIF CAPITATION',
      cashAmount: 0,
      creditAmount: 23520,
      totalAmount: 23520,
      freeConsAmount: 10080,
      netRefundAmount: 23520,
      discountRefundAmount: 0,
      netAmount: 23520,
    },
    {
      schemeName: 'General',
      cashAmount: 462875,
      creditAmount: 13350,
      totalAmount: 476225,
      freeConsAmount: 1175,
      netRefundAmount: 476225,
      discountRefundAmount: 0,
      netAmount: 476225,
    },
    {
      schemeName: 'BRITAM',
      cashAmount: 375,
      creditAmount: 500,
      totalAmount: 875,
      freeConsAmount: 125,
      netRefundAmount: 375,
      discountRefundAmount: 0,
      netAmount: 375,
    },
    {
      schemeName: 'Astra',
      cashAmount: 0,
      creditAmount: 500,
      totalAmount: 500,
      freeConsAmount: 0,
      netRefundAmount: 500,
      discountRefundAmount: 0,
      netAmount: 500,
    },
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Discount Scheme Report</h3>
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
      <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>Counter:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>User:</label>
          <input type="text" placeholder="Enter User Name" />
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            {/* Search Input */}
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)} // Ensure the handleSearch function is defined
            />

            {/* Print and Export Buttons */}
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
                    "Scheme Name ",
                    "Cash Amount",
                    "Credit Amount",
                    "Total Amount",
                    "Free Cons Amount",
                    "Net Refund Amount",
                    "Discount Refund",
                    "NetAmount"
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
                    <td>{row.schemeName}</td>
                    <td>{row.cashAmount}</td>
                    <td>{row.creditAmount}</td>
                    <td>{row.totalAmount}</td>
                    <td>{row.freeConsAmount}</td>
                    <td>{row.netRefundAmount}</td>
                    <td>{row.discountRefundAmount}</td>
                    <td>{row.netAmount}</td>
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
          <div className='net-cash-collection-header'>
            <h4 className="user-collection-report-net-collection">Net Cash Collection: (791,952.24)</h4>
            <div className="user-collection-report-summary">

              <table className="user-collection-report-summary-table">
                <tbody>
                  <tr><td>Gross Total Sales</td><td>819,900.00</td></tr>
                  <tr><td>Discount</td><td>14,505.00</td></tr>
                  <tr><td>Return SubTotal</td><td>0.00</td></tr>
                  <tr><td>Return Discount</td><td>0.00</td></tr>
                  <tr><td>Return Amount</td><td>0.00</td></tr>
                  <tr><td>Net Sales</td><td>805,395.00</td></tr>
                  <tr><td>Less Credit Amount</td><td>5,840.00</td></tr>
                  <tr><td>Add Deposit Received</td><td>259,147.00</td></tr>
                  <tr><td>Less Deposit Refund</td><td>28,725.00</td></tr>
                  <tr><td>Add Collection From Receivables</td><td>1,975.24</td></tr>
                  <tr><td>Less Cash Discount</td><td>0.00</td></tr>
                  <tr><td>Other Payments Given</td><td>0.00</td></tr>
                  <tr><td>Total Collection</td><td>791,952.24</td></tr>
                </tbody>
              </table>
              {/* Uncomment and use this button if needed */}
              <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

export default DiscountSchemeReport;
