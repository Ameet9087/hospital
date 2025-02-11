import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const EditedPatientDetailReport = () => {
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
    {
        hospitalNo: "2408003805",
        patientOldName: "Eric Mafabi",
        patientNewName: "Sanika Shelar",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2024-08-01T19:06:30.537",
        editedDate: "2024-07-13T02:14:02.373",
      },
      {
        hospitalNo: "2407003792",
        patientOldName: "Aa As Sd",
        patientNewName: "Post As Malone",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2024-07-14T16:23:07.067",
        editedDate: "2024-06-10T17:29:35.593",
      },
      {
        hospitalNo: "2407003791",
        patientOldName: "Sd Sd Sd",
        patientNewName: "Sajid Passa Shafin",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2024-07-11T00:00:47.877",
        editedDate: "2024-06-10T17:28:57.093",
      },
      {
        hospitalNo: "2402003663",
        patientOldName: "",
        patientNewName: "EDWIN IRI-INGIJ IRUNGU",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-06-10T17:27:38.657",
      },
      {
        hospitalNo: "2402003664",
        patientOldName: "",
        patientNewName: "TRACY NJERI ME,AE NERI",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-06-10T17:24:00.407",
      },
      {
        hospitalNo: "2402003665",
        patientOldName: "",
        patientNewName: "ALICE WANJIRU IRU",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-06-10T15:50:08.183",
      },
      {
        hospitalNo: "2402003666",
        patientOldName: "",
        patientNewName: "EUNICE WANGARI KARIMA WANGARI",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-06-10T15:11:00.980",
      },
      {
        hospitalNo: "2402003667",
        patientOldName: "",
        patientNewName: "ANN NJERI NJERI",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-06-10T14:29:42.730",
      },
      {
        hospitalNo: "2402003668",
        patientOldName: "",
        patientNewName: "MARY WANGARI WANGARI",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-06-10T14:26:03.837",
      },
      {
        hospitalNo: "2402003669",
        patientOldName: "",
        patientNewName: "BRADEN ONYANGO OWINO ONYANGO",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-06-10T13:37:48.993",
      },
      {
        hospitalNo: "2402003670",
        patientOldName: "",
        patientNewName: "LIAN MWANGI MURIW MWANGI",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-05-23T13:52:01.353",
      },
      {
        hospitalNo: "2402003671",
        patientOldName: "",
        patientNewName: "STACEY NJOKI KIMORE NJOKI",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-05-23T13:51:44.404",
      },
      {
        hospitalNo: "2402003672",
        patientOldName: "",
        patientNewName: "ANNAH MWERU GITAU MWERU",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-05-23T13:51:34.080",
      },
      {
        hospitalNo: "2402003673",
        patientOldName: "",
        patientNewName: "ALICE JAVOGA",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "2024-05-23T13:51:03.100",
      },
      {
        hospitalNo: "2402003674",
        patientOldName: "",
        patientNewName: "ELIANA GITHEKA",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "Neyt",
      },
      {
        hospitalNo: "2402003675",
        patientOldName: "",
        patientNewName: "ZENAULA WANJIRU",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "Neyt",
      },
      {
        hospitalNo: "2402003676",
        patientOldName: "",
        patientNewName: "EASY MARY",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "Neyt",
      },
      {
        hospitalNo: "2402003677",
        patientOldName: "",
        patientNewName: "MIRIAm AKIRU",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "Neyt",
      },
      {
        hospitalNo: "2402003678",
        patientOldName: "",
        patientNewName: "SANDRA",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "Neyt",
      },
      {
        hospitalNo: "2402003679",
        patientOldName: "",
        patientNewName: "ANCENTJAMES",
        registeredBy: "admin",
        editedBy: "admin",
        registeredDate: "2023-01-11",
        editedDate: "Neyt",
      },
  ];

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Edited Patient Detail Report</h3>
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
                "Hospital No",
                "Patient Old Name",
                "Patient New Name",
                "Registered By",
                "Edit By",
                "Registered Date",
                "Edited Date"
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
                    <td>{row.hospitalNo}</td>
                    <td>{row.patientOldName}</td>
                    <td>{row.patientNewName}</td>
                    <td>{row.registeredBy}</td>
                    <td>{row.editedBy}</td>
                    <td>{row.registeredDate}</td>
                    <td>{row.editedDate}</td>
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
          <div className='net-cash-collection-header'>
          <h4 className="user-collection-report-net-collection">Summary</h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
    <tbody>
      <tr><td>Total Edited Patient Count </td><td>35</td></tr>
      
      
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

export default EditedPatientDetailReport;
