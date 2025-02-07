import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const IncomeSegragation = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
const [columnWidths, setColumnWidths] = useState({});
const tableRef = useRef(null);

  // Sample data for reports
  const reportsData = [
    {
        department: 'Department 1',
        admissionFees: 4000,
        bedCharge: 2300,
        biochemistry: 69200,
        clinicals: 500,
        ctScan: 6600,
        ctScan2: 154000,
        hematology: 4000,
        microbiology: 1500,
        mri: 134000,
        opd: 169600,
        serology: 9500,
        xRay: 23000,
        cashDiscount: 270,
        creditSales: 32600,
        creditDiscount: 9780,
        grossSales: 4000,
        totalDiscount: 10050,
        returnCashSales: 0,
        returnCashDiscount: 0,
        returnCreditSales: 0,
        returnCreditDiscount: 0,
        totalSalesReturn: 0,
        totalReturnDiscount: 0,
        netSales: 4000,
      },
      {
        department: 'Department 2',
        admissionFees: 2300,
        bedCharge: 3000,
        biochemistry: 75600,
        clinicals: 600,
        ctScan: 5000,
        ctScan2: 134000,
        hematology: 3000,
        microbiology: 2000,
        mri: 140000,
        opd: 150000,
        serology: 10000,
        xRay: 25000,
        cashDiscount: 2675,
        creditSales: 6400,
        creditDiscount: 350,
        grossSales: 34900,
        totalDiscount: 3255,
        returnCashSales: 0,
        returnCashDiscount: 0,
        returnCreditSales: 0,
        returnCreditDiscount: 0,
        totalSalesReturn: 0,
        totalReturnDiscount: 0,
        netSales: 24850,
      },
      {
        department: 'Department 3',
        admissionFees: 69200,
        bedCharge: 500,
        biochemistry: 6600,
        clinicals: 154000,
        ctScan: 4000,
        ctScan2: 1500,
        hematology: 134000,
        microbiology: 169600,
        mri: 9500,
        opd: 23000,
        serology: 0,
        xRay: 0,
        cashDiscount: 2675,
        creditSales: 15200,
        creditDiscount: 580,
        grossSales: 75600,
        totalDiscount: 3255,
        returnCashSales: 0,
        returnCashDiscount: 0,
        returnCreditSales: 0,
        returnCreditDiscount: 0,
        totalSalesReturn: 0,
        totalReturnDiscount: 0,
        netSales: 75150,
      },
      {
        department: 'Department 4',
        admissionFees: 500,
        bedCharge: 6600,
        biochemistry: 154000,
        clinicals: 4000,
        ctScan: 1500,
        ctScan2: 134000,
        hematology: 169600,
        microbiology: 9500,
        mri: 23000,
        opd: 0,
        serology: 0,
        xRay: 0,
        cashDiscount: 100,
        creditSales: 3000,
        creditDiscount: 650,
        grossSales: 500,
        totalDiscount: 750,
        returnCashSales: 0,
        returnCashDiscount: 0,
        returnCreditSales: 0,
        returnCreditDiscount: 0,
        totalSalesReturn: 0,
        totalReturnDiscount: 0,
        netSales: 500,
      },
    // Additional department data can be added here...
  ];

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Export functionality (placeholder)
  const handleExport = () => {
    console.log('Export function not yet implemented');
    // Implement export logic here
  };

  // Toggle popup visibility
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Handle date range selection
  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    // Implement date range filtering logic here
    setIsPopupOpen(false); // Close popup after selection
  };

  // Show report button handler
  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Income Segregation Report</h3>
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
          <label>Billing Type:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options if needed */}
          </select>
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
              // onChange={(e) => handleSearch(e.target.value)} // Ensure the handleSearch function is defined
            />
            <div className="user-collection-page-results-info">
              Showing 334/334 results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>

          <div className="user-collection-report-tab">
            <div className="income-segragation-tab">
            <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Department",
                "Cash Sales",
                "Cash Discount",
                "Credit Discount",
                "Gross Sales",
                "Total Discount",
                "Return Cash Sales",
                "Return Cash Discount",
                "Return Credit Sales",
                "Return Credit Discount",
                "Total Sales Return",
                "Total Return Discount",
                "Net Sales"
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
                      <td>{row.department}</td>
                      <td>{row.cashSales}</td>
                      <td>{row.cashDiscount}</td>
                      <td>{row.creditDiscount}</td>
                      <td>{row.grossSales}</td>
                      <td>{row.totalDiscount}</td>
                      <td>{row.returnCashSales}</td>
                      <td>{row.returnCashDiscount}</td>
                      <td>{row.returnCreditSales}</td>
                      <td>{row.returnCreditDiscount}</td>
                      <td>{row.totalSalesReturn}</td>
                      <td>{row.totalReturnDiscount}</td>
                      <td>{row.netSales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              <span>Page 1 of 4</span>
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div>
          </div>

          <div className='net-cash-collection-header'>
          <h4 className="user-collection-report-net-collection">Summary</h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
    <tbody>
      {/* Remove the existing rows and add the new rows */}
    <tr><td>Cash Sales</td><td>578,200.00</td></tr>
    <tr><td>Credit Sales</td><td>57,200.00</td></tr>
    <tr><td>Gross Sales (A+B)</td><td>635,400.00</td></tr>
    <tr><td>Cash Discount</td><td>3,145.00</td></tr>
    <tr><td>Credit Discount</td><td>11,360.00</td></tr>
    <tr><td>Total Discount (D+E)</td><td>14,505.00</td></tr>
    <tr><td>Return Cash Sales</td><td>0.00</td></tr>
    <tr><td>Return Credit Sales</td><td>0.00</td></tr>
    <tr><td>Total Sales Return (G+H)</td><td>0.00</td></tr>
    <tr><td>Return Cash Discount</td><td>0.00</td></tr>
    <tr><td>Return Credit Discount</td><td>0.00</td></tr>
    <tr><td>Total Return Discount (J+K)</td><td>0.00</td></tr>
    <tr><td>Net Sales (C-F-I+L)</td><td>620,895.00</td></tr>
    </tbody>
  </table>
  {/* Uncomment and use this button if needed */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IncomeSegragation;
