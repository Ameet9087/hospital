import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const DepositeTransaction = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Sample data for reports
  const reportsData = [
    {
      depositDate: '09.Feb-2024',
      receiptNo: 'DRI',
      hospitalNo: '2402000021',
      patientName: 'Jane Mercy',
      contactNo: '0720000125',
      ageSex: '8 YIF',
      depositReceived: 1200,
      depositDeducted: 0,
      depositReturned: 1200,
      userName: 'Mr. admin',
      counter: 'OPD-Counter',
    },
    {
      depositDate: '10.Feb-2024',
      receiptNo: 'DR2',
      hospitalNo: '2402000021',
      patientName: 'Jane Mercy',
      contactNo: '0720000125',
      ageSex: '8 YIF',
      depositReceived: 0,
      depositDeducted: 0,
      depositReturned: 0,
      userName: 'Mr. admin',
      counter: 'New-I',
    },
    {
      depositDate: 'IO.Feb-2024',
      receiptNo: 'DR3',
      hospitalNo: '2402000021',
      patientName: 'Jane Mercy',
      contactNo: '0720000125',
      ageSex: '8 YIF',
      depositReceived: 1200,
      depositDeducted: 0,
      depositReturned: 1200,
      userName: 'Mr. admin',
      counter: 'New-I',
    },
    {
      depositDate: '1 1 -Jul-2024',
      receiptNo: 'DR20',
      hospitalNo: '2407003791',
      patientName: 'Sajid Passa Shafin',
      contactNo: '22222',
      ageSex: '22 Y/M',
      depositReceived: 1000,
      depositDeducted: 0,
      depositReturned: 0,
      userName: 'Mr. admin',
      counter: 'New-2',
    },
    {
      depositDate: '1 1 -Jul-2024',
      receiptNo: 'DR21',
      hospitalNo: '2407003791',
      patientName: 'Sajid Passa Shafin',
      contactNo: '22222',
      ageSex: '22 Y/M',
      depositReceived: 1000,
      depositDeducted: 0,
      depositReturned: 0,
      userName: 'Mr. admin',
      counter: 'New-2',
    },
    {
      depositDate: '1 1.Jul.2024',
      receiptNo: 'DRU',
      hospitalNo: '2406003783',
      patientName: 'Monicah Juma',
      contactNo: '0764565656',
      ageSex: '34',
      depositReceived: 0,
      depositDeducted: 0,
      depositReturned: 0,
      userName: 'Mr. admin',
      counter: 'New-I',
    },
  ];

  // Sample data for dropdown filters
  const doctors = ['Dr. Smith', 'Dr. Jones', 'Dr. Brown'];
  const departments = ['Cardiology', 'Neurology', 'Orthopedics'];

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

  const handleSearch = (query) => {
    console.log(`Searching for: ${query}`);
  };

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
          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>
        <div className="patient-census-collection-dep">
          <div className="user-collection-report-doctor-filter">
            <label>Doctor:</label>
            <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option value="">Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
          <div className="user-collection-report-department-filter">
            <label>Department:</label>
            <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>{department}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="user-collection-repor-advance-filter">
        {/* <button className="user-collection-report-show-btn">Advance Filter</button> */}
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            {/* Search Input */}
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            
            {/* Print and Export Buttons */}
            <div className="user-collection-page-results-info">
              Showing 334/334 results
            </div>

            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className="user-collection-report-tab">
            <div className="table-scroll-container">
            <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
              "Deposit No",
              "Receipt No",
              "Hospital No",
              "Patient Name",
              "Age/Sex",
              "Contact No",
              "Deposit Received",
              "Deposit Deducted",
              "Deposit Returned",
              "User Name",
              "Counter"
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
                      <td>{row.depositDate}</td>
                      <td>{row.receiptNo}</td>
                      <td>{row.hospitalNo}</td>
                      <td>{row.patientName}</td>
                      <td>{row.ageSex}</td>
                      <td>{row.contactNo}</td>
                      <td>{row.depositReceived}</td>
                      <td>{row.depositDeducted}</td>
                      <td>{row.depositReturned}</td>
                      <td>{row.userName}</td>
                      <td>{row.counter}</td>
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
  <tr><td>Total Deposit Received</td><td>232,122.00</td></tr>
  <tr><td>Total Deposit Deducted</td><td>3,400.00</td></tr>
  <tr><td>Total Deposit Returned</td><td>14,300.00</td></tr>
  <tr><td>Total Balance (A-(B+C))</td><td>214,422.00</td></tr>
</tbody>

  </table>
  {/* Uncomment and use this button if needed */}
  {/* <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button> */}
  </div>
          </div>

        </>
      )}
    </div>
  );
};

export default DepositeTransaction;
