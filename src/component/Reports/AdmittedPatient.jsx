import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const AdmittedPatient = () => {
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
      admittedDate: '2024-08-28 12:16',
      hospitalNo: '2408003835',
      ipNumber: 'H2400030',
      patientName: 'Jhon Cena',
      ageSex: '60Y',
      admittingDoc: 'Mrs. BRENDA M...',
      admittingDept: 'Operation Theatre',
      bedFeature: 'Electronic',
      bedCode: 'BW-3',
    },
    {
      admittedDate: '2024-08-27 17:38',
      hospitalNo: '2408003832',
      ipNumber: 'H2400028',
      patientName: 'Shubham Potawade',
      ageSex: '22Y',
      admittingDoc: 'Mrs. BRENDA M...',
      admittingDept: 'Operation Theatre',
      bedFeature: 'Electronic',
      bedCode: 'BW-3',
    },
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Total Admitted Patients Report</h3>
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
               "Admitted Date",
              "Hospital No",
              "IP Number",
              "Patient Name",
              "Age/Sex",
              "Admitting Doc",
              "Admitting Dept",
              "Bed Feature",
              "Bed Code"

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
                    <td>{row.admittedDate}</td>
                    <td>{row.hospitalNo}</td>
                    <td>{row.ipNumber}</td>
                    <td>{row.patientName}</td>
                    <td>{row.ageSex}</td>
                    <td>{row.admittingDoc}</td>
                    <td>{row.admittingDept}</td>
                    <td>{row.bedFeature}</td>
                    <td>{row.bedCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              <span>Page 1 of 1</span>
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div>
          </div>
         
        </>
      )}
    </div>
  );
};

export default AdmittedPatient;
