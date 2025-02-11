import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const RegistrationReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [filteredReportsData, setFilteredReportsData] = useState([]);
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
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };

  const handleSearch = (query) => {
    // Filter reportsData based on the query
    console.log(`Searching for: ${query}`);
  };

  // Sample reportsData, replace with actual data
  const reportsData = [
    {
      registeredDate: '1-Aug-2024',
      patientName: 'Test 1',
      dateOfBirth: '01-Aug-1991',
      age: '33Y',
      gender: 'Male',
      phoneNumber: '234567890',
      country: 'Kenya',
      address: 'sodo',
      schemeName: 'Astra',
      bloodGroup: 'AB positive',
      email: 'yaredgetu@...',
      insuranceNo: '1234',
    },
    {
      registeredDate: '1-Aug-2024',
      patientName: 'Yared Getu Kusa',
      dateOfBirth: '31-Jul-2002',
      age: '22Y',
      gender: 'Male',
      phoneNumber: '92322323',
      country: 'Ethiopia',
      address: '23A, 2nd Street',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'saravanans@...',
      insuranceNo: '5678',
    },
    {
      registeredDate: '1-Jul-2024',
      patientName: 'Saravanan Fgg s',
      dateOfBirth: '01-Jul-2024',
      age: '16Y',
      gender: 'Male',
      phoneNumber: '9086543245',
      country: 'India',
      address: '453',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'loicntwaliO@...',
      insuranceNo: '9101',
    },
    {
      registeredDate: '6-Jul-2024',
      patientName: 'Mathayo Mihangwa M...',
      dateOfBirth: '26-Jul-2008',
      age: '35Y',
      gender: 'Male',
      phoneNumber: '0768634033',
      country: 'Kenya',
      address: '906-10400',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'ASDASDA@...',
      insuranceNo: '1121',
    },
    {
      registeredDate: '10-Jul-2024',
      patientName: 'Asdasd Asdasdas',
      dateOfBirth: '20-Jul-1989',
      age: '27Y',
      gender: 'Male',
      phoneNumber: '0930976026',
      country: 'Rwanda',
      address: 'dfsdf fgfgd',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'mitaliaggar@...',
      insuranceNo: '1314',
    },
    {
      registeredDate: '18-Jul-2024',
      patientName: 'John Munye',
      dateOfBirth: '18-Jul-1997',
      age: '29Y',
      gender: 'Male',
      phoneNumber: '0788000000',
      country: 'United States',
      address: 'cvxcvxcxczx',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '1516',
    },
    {
      registeredDate: '14-Jul-2024',
      patientName: 'Post As Malone',
      dateOfBirth: '07-Apr-1995',
      age: '22Y',
      gender: 'Male',
      phoneNumber: '54564354',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '1718',
    },
    {
      registeredDate: '1-Jul-2024',
      patientName: 'Sajid Passa Shafin',
      dateOfBirth: '10-Jul-2002',
      age: '45Y',
      gender: 'Male',
      phoneNumber: '22222',
      country: 'India',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '1920',
    },
    {
      registeredDate: '8-Jul-2024',
      patientName: 'Stephen Kariuki',
      dateOfBirth: '08-Jul-1979',
      age: '25Y',
      gender: 'Male',
      phoneNumber: '0705720712',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '2122',
    },
    {
      registeredDate: '7-Jun-2024',
      patientName: 'Test Patient',
      dateOfBirth: '27-Jun-1999',
      age: '3M',
      gender: 'Male',
      phoneNumber: '123456789',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '2324',
    },
    {
      registeredDate: '5-Jun-2024',
      patientName: 'Cdsfssdfsdf Dsfsdffds...',
      dateOfBirth: '25-Mar-2024',
      age: '15M',
      gender: 'Male',
      phoneNumber: '232344',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '2526',
    },
    {
      registeredDate: '1-Jun-2024',
      patientName: 'Isaac John',
      dateOfBirth: '19-Jun-1984',
      age: '29Y',
      gender: 'Male',
      phoneNumber: '0765656565',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '2728',
    },
    {
      registeredDate: '1-Jun-2024',
      patientName: 'James Gathanju',
      dateOfBirth: '19-Jun-2009',
      age: '12M',
      gender: 'Male',
      phoneNumber: '0765343434',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '2930',
    },
    {
      registeredDate: '18-Jun-2024',
      patientName: 'Brian Okumu',
      dateOfBirth: '19-Jun-1995',
      age: '16Y',
      gender: 'Male',
      phoneNumber: '0878564545',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '3132',
    },
    {
      registeredDate: '18-Jun-2024',
      patientName: 'James Omondi',
      dateOfBirth: '18-Jun-2012',
      age: '34Y',
      gender: 'Male',
      phoneNumber: '0784536718',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '3334',
    },
    {
      registeredDate: '18-Jun-2024',
      patientName: 'Joseph Gathanga',
      dateOfBirth: '18-Jun-2008',
      age: '23Y',
      gender: 'Male',
      phoneNumber: '0735634231',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '3536',
    },
    {
      registeredDate: '18-Jun-2024',
      patientName: 'Joseph Wambui',
      dateOfBirth: '18-Jun-1990',
      age: '23Y',
      gender: 'Male',
      phoneNumber: '0745634536',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '3738',
    },
    {
      registeredDate: '18-Jun-2024',
      patientName: 'Kevin Gichango',
      dateOfBirth: '18-Jun-2001',
      age: '67Y',
      gender: 'Male',
      phoneNumber: '0785963452',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '3940',
    },
    {
      registeredDate: '18-Jun-2024',
      patientName: 'Kevin Nguthiru',
      dateOfBirth: '18-Jun-2001',
      age: '67Y',
      gender: 'Male',
      phoneNumber: '0784563428',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '4142',
    },
    {
      registeredDate: '18-Jun-2024',
      patientName: 'Kevin Nguthiru',
      dateOfBirth: '18-Jun-1957',
      age: '67Y',
      gender: 'Male',
      phoneNumber: '0743763872',
      country: 'Kenya',
      address: 'Address example',
      schemeName: 'General',
      bloodGroup: 'AB positive',
      email: 'example@domain.com',
      insuranceNo: '4344',
    },  ];

  const handleShowReport = () => {
    setShowReport(true);
    setFilteredReportsData(reportsData); // Show all data initially or apply any filters if needed
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Patient Registration Report</h3>
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
        <div className="user-collection-report-gender-filter">
          <label>Gender:</label>
          <div className="gender-options">
            <label>
              <input type="checkbox" value="Male" />
              Male
            </label>
            <label>
              <input type="checkbox" value="Female" />
              Female
            </label>
            <label>
              <input type="checkbox" value="All" />
              All
            </label>
          </div>
        </div>

        <div className="user-collection-report-counter-filter">
          <label>Select User:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      {showReport && (
        <>
          {filteredReportsData.length > 0 ? (
            <>
              <div className="user-collection-report-controls">
                <input
                  type="text"
                  className="user-collection-report-search"
                  placeholder="Search..."
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="user-collection-page-results-info">
                  Showing {filteredReportsData.length}/{filteredReportsData.length} results
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
               "Registered Date",
                "Patient Name",
                "Date of Birth",
                "Age",
                "Gender",
                "Phone Number",
                "Country",
                "Address",
                "Scheme Name",
                "Blood Group",
                "Email",
                "Insurance No"
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
                      {filteredReportsData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.registeredDate}</td>
                          <td>{row.patientName}</td>
                          <td>{row.dateOfBirth}</td>
                          <td>{row.age}</td>
                          <td>{row.gender}</td>
                          <td>{row.phoneNumber}</td>
                          <td>{row.country}</td>
                          <td>{row.address}</td>
                          <td>{row.schemeName}</td>
                          <td>{row.bloodGroup}</td>
                          <td>{row.email}</td>
                          <td>{row.insuranceNo}</td>
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
          ) : (
            <div className="user-name-no-row">No Rows To Show</div>
          )}
        </>
      )}
    </div>
  );
};

export default RegistrationReport;
