import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';

import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const DepositBalance = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };

  const handleSearch = (query) => {
    console.log(`Searching for: ${query}`);
  };

  const reportsData = [
    {
      hospitalNumber: '231 1000003',
      patientName: 'Titus Kipsang',
      ageSex: '32 Y/M',
      contactNo: '20202020',
      totalDeposit: 10000,
      totalDeductions: 1200,
      totalRefunds: 0,
      balance: 10000,
    },
    {
      hospitalNumber: '231 1000005',
      patientName: 'Mary Mwihaki',
      ageSex: '30 Y/M',
      contactNo: '1478523698',
      totalDeposit: 2000,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 2000,
    },
    {
      hospitalNumber: '2402000021',
      patientName: 'Jane Mercy',
      ageSex: '23 Y/F',
      contactNo: '0720000125',
      totalDeposit: 12400,
      totalDeductions: 1200,
      totalRefunds: 0,
      balance: 11200,
    },
    {
      hospitalNumber: '2402000023',
      patientName: 'Joseph Waitara',
      ageSex: '40 Y/F',
      contactNo: '0767656589',
      totalDeposit: 3000,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 3000,
    },
    {
      hospitalNumber: '2406003696',
      patientName: 'Cecillia Kimani',
      ageSex: '56 Y/F',
      contactNo: '0712018207',
      totalDeposit: 500,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 500,
    },
    {
      hospitalNumber: '2406003703',
      patientName: 'Stocazzo Coidenti',
      ageSex: '32 Y/F',
      contactNo: '0663666544',
      totalDeposit: 150000,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 150000,
    },
    {
      hospitalNumber: '2406003720',
      patientName: 'Yvette Kenaan',
      ageSex: '32 Y/M',
      contactNo: '0892638689',
      totalDeposit: 50000,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 50000,
    },
    {
      hospitalNumber: '2407003799',
      patientName: 'ANGEL VARGAS MONTERO',
      ageSex: '40 Y/M',
      contactNo: '0926641813',
      totalDeposit: 2722,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 2722,
    },
    {
      hospitalNumber: '2408003825',
      patientName: 'Datta Badhe',
      ageSex: '40 Y/M',
      contactNo: '1221312412',
      totalDeposit: 10000,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 10000,
    },
    {
      hospitalNumber: '2408003830',
      patientName: 'SsA',
      ageSex: 'N/A',
      contactNo: 'N/A',
      totalDeposit: 26,
      totalDeductions: 0,
      totalRefunds: 0,
      balance: 26,
    },
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Deposit Balance Report</h3>
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
          <div className="user-collection-report-user-filter">
            <label htmlFor="user-checkbox">Is Insurance:</label>
            <input type="checkbox" id="user-checkbox" />
          </div>
        </div>
      </div>
      <div className='user-collection-repor-advance-filter'>
        <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        <button className="user-collection-report-show-btn">Advance Filter</button>
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
            <div className="table-scroll-container">
            <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
             "Hospital No",
              "Patient Name",
              "Age/Sex",
              "Contact No",
              "Total Deposit",
              "Total Deductions",
              "Total Refunds",
              "Balance"
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
                      <td>{row.hospitalNumber}</td>
                      <td>{row.patientName}</td>
                      <td>{row.ageSex}</td>
                      <td>{row.contactNo}</td>
                      <td>{row.totalDeposit}</td>
                      <td>{row.totalDeductions}</td>
                      <td>{row.totalRefunds}</td>
                      <td>{row.balance}</td>
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
        </>
      )}
    </div>
  );
};

export default DepositBalance;
