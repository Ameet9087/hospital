import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const PoliceCase = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dischargedOnly, setDischargedOnly] = useState(false); // State for the "Discharged Only" checkbox
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
    // Implement your search logic here to filter the reportsData
  };

  const reportsData = [
    {
      ipNumber: 'H2400009',
      patientName: 'Stocazzo Coidenti',
      hospitalNo: '2406003703',
      admittedOn: '2024-06-10',
      dischargedOn: 'N/A',
    },
  ];

  // Filter data based on dischargedOnly checkbox
  const filteredData = dischargedOnly
    ? reportsData.filter(data => data.dischargedOn !== 'N/A')
    : reportsData;

  const handleShowReport = () => {
    setShowReport(true);
  };

  const handleDischargedOnlyChange = (e) => {
    setDischargedOnly(e.target.checked);
    console.log('Discharged Only:', e.target.checked);
    // Implement the logic to filter data based on the discharged only status
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Police Case Report</h3>
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

      <div className='discharge-display-com'>
        <div className="user-collection-report-discharged-only">
          <input
            type="checkbox"
            id="dischargedOnly"
            checked={dischargedOnly}
            onChange={handleDischargedOnlyChange}
          />
          <label htmlFor="dischargedOnly">Discharged Only</label>
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
              Showing {filteredData.length}/1 results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
          </div>
          <div className='user-collection-report-tab'>
            
<table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "IP Number",
                "Patient Name",
                "Hospital No.",
                "Admitted On",
                "Discharged on"
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
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="user-name-no-row">No Rows To Show</td>
                  </tr>
                ) : (
                  filteredData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.ipNumber}</td>
                      <td>{row.patientName}</td>
                      <td>{row.hospitalNo}</td>
                      <td>{row.admittedOn}</td>
                      <td>{row.dischargedOn}</td>
                    </tr>
                  ))
                )}
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

export default PoliceCase;
