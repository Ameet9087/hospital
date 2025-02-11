import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const AdmissionAndDischargedList = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

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

  // New data added
  const reportsData = [
    {
      serialNo: 1,
      category: 'Brain Ward',
      count: 4,
      patientName: 'John Cena',
      hospitalNo: '2408003799',
      ipNumber: 'H2400030',
      admittedDate: '2024-08-27',
      dischargedDate: '2024-08-28',
      requestingDepartment: 'Orthopedic',
      admittingDoctor: 'Mrs. BRENDA MWANIA WANJIRI',
      ward: 'Brain Ward',
      bedFeature: 'Electronic',
      admissionStatus: 'discharged',
      dischargeTime: '2024-08-28T17:00',
    },
    {
      serialNo: 2,
      category: 'Brain Ward',
      count: 4,
      patientName: 'Shubham Potawade',
      hospitalNo: '2408003832',
      ipNumber: 'H2400028',
      admittedDate: '2024-08-27',
      dischargedDate: '2024-08-27',
      requestingDepartment: 'Cardiology',
      admittingDoctor: 'Mrs. BRENDA MWANIA WANJIRI',
      ward: 'Brain Ward',
      bedFeature: 'Electronic',
      admissionStatus: 'discharged',
      dischargeTime: '2024-08-27T18:18',
    },
    {
      serialNo: 3,
      category: 'ICIJ',
      count: 4,
      patientName: 'ANGEL VARGAS MONTE...',
      hospitalNo: '2407003799',
      ipNumber: 'H2400023',
      admittedDate: '2024-07-30',
      dischargedDate: '2024-08-28',
      requestingDepartment: 'Operation Theatre',
      admittingDoctor: 'Dr. VICTOR OCHIENG OKECH',
      ward: 'ICIJ',
      bedFeature: 'Bed 4',
      admissionStatus: 'discharged',
      dischargeTime: '2024-08-28T18:00',
    }
  ];

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
          <label>Search Patients:</label>
          <input type='text' placeholder='Search' className='Admitted-Patient-searchInput' />

          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>

        <div className='patient-census-collection-dep'>
          <div className="user-collection-report-doctor-filter">
            <label>Requesting Department:</label>
            <select>
              <option value="">Select Department</option>
            </select>
          </div>
          <div className="user-collection-report-department-filter">
            <label>Ward Name:</label>
            <select>
              <option value="">Select Ward Name</option>
            </select>
          </div>
          <div className="user-collection-report-department-filter">
            <label>Bed Feature:</label>
            <select>
              <option value="">Select Bed Feature</option>
            </select>
          </div>
          <div className="user-collection-report-department-filter">
            <label>Admission Status:</label>
            <select>
              <option value="">Select Admission Status</option>
            </select>
          </div>
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
                "S.N",
                "Category",
                "Count",
                "Patient Name",
                "Hospital No",
                "IP Number",
                "Admitted On",
                "Discharged On",
                "Requesting Department",
                "Admitting Doctor",
                "Ward",
                "Bed Feature",
                "Admission Status",
                "Discharge Time"
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
                    <td>{row.serialNo}</td>
                    <td>{row.category}</td>
                    <td>{row.count}</td>
                    <td>{row.patientName}</td>
                    <td>{row.hospitalNo}</td>
                    <td>{row.ipNumber}</td>
                    <td>{row.admittedDate}</td>
                    <td>{row.dischargedDate}</td>
                    <td>{row.requestingDepartment}</td>
                    <td>{row.admittingDoctor}</td>
                    <td>{row.ward}</td>
                    <td>{row.bedFeature}</td>
                    <td>{row.admissionStatus}</td>
                    <td>{row.dischargeTime}</td>
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
          <h4 className="user-collection-report-net-collection">Summary</h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
  <tbody>
  <tr><td>Total Admitted Patient Count:</td><td>1</td></tr> {/* Replace '33' with dynamic data if available */}
        <tr><td>Total Discharged Patient Count:</td><td>2</td></tr> {/* Replace '25' with dynamic data if available */}
        <tr><td>Gross Days of Admission:</td><td>33</td></tr> {/* Replace '200' with dynamic data if available */}
     
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

export default AdmissionAndDischargedList;
