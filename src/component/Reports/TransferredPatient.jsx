import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const TransferredPatient = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    console.log('Export function not yet implemented');
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    setIsPopupOpen(false);
  };

  const reportsData = [
    {
      date: '31-Aug-2024',
      totalPatientsTransferred: 1,
      totalTransferred: 1,
      orthoSurgeryWard: 1,
      medicineGynoWard: 0,
      preOperationWard: 0,
      icuPostOpWard: 0,
      emergencyWard: 0,
    },
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛  Transferred Patients Report</h3>
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
              onChange={(e) => console.log(e.target.value)} // Implement handleSearch if needed
            />
            <div className="user-collection-page-results-info">
              Showing {reportsData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>

          <div className="user-collection-report-tab">

          <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Date",
                "Total Patient Transferred",
                "Total Transferred",
                "OrthoSurgery Ward",
                "MedicineGyno Ward",
                "Pre-Operation Ward",
                "ICU & POST-OP Ward",
                "Emergency Ward"
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
                    <td>{row.totalPatientsTransferred}</td>
                    <td>{row.totalTransferred}</td>
                    <td>{row.orthoSurgeryWard}</td>
                    <td>{row.medicineGynoWard}</td>
                    <td>{row.preOperationWard}</td>
                    <td>{row.icuPostOpWard}</td>
                    <td>{row.emergencyWard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              <span>Page 1 of 1</span>
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default TransferredPatient;
