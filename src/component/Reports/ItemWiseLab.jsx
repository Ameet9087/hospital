import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const ItemWiseLab = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const reportsData = [
    { department: 'Biochemistry', testName: 'FASTING BLOOD SUGAR', unit: 23, totalAmount: 23000 },
    { department: 'Biochemistry', testName: 'Sugar Fasting', unit: 15, totalAmount: 9000 },
    { department: 'Biochemistry', testName: 'KIDNEY FUNCTION TESTS', unit: 11, totalAmount: 7700 },
    { department: 'Biochemistry', testName: 'HIGH VAGINAL SWAB', unit: 8, totalAmount: 24000 },
    { department: 'Biochemistry', testName: 'RBS (SUPPORT GROUP)', unit: 7, totalAmount: 3500 },
    { department: 'Microbiology', testName: 'URIC ACID', unit: 6, totalAmount: 1800 },
    { department: 'Biochemistry', testName: 'COVID 19 AG', unit: 6, totalAmount: 3000 },
    { department: 'Biochemistry', testName: 'BRUCELLA', unit: 5, totalAmount: 15000 },
    { department: 'Biochemistry', testName: 'MP SMEAR', unit: 5, totalAmount: 1500 },
    { department: 'Serology', testName: 'CREATININE', unit: 3, totalAmount: 6000 },
    { department: 'Serology', testName: 'PREGNANCY TEST', unit: 3, totalAmount: 2400 },
    { department: 'Hematology', testName: 'UNKNOWN', unit: 2, totalAmount: 1000 },
    { department: 'Biochemistry', testName: 'UNKNOWN', unit: 2, totalAmount: 100 },
  ];

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

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredData = reportsData.filter((row) =>
    row.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Total Item Wise Lab Report</h3>
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
          <button className="user-collection-report-show-btn" onClick={() => setShowReport(true)}>Show Report</button>
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
              Showing {filteredData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className='user-collection-report-tab'>
          <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
           "Service Department",
          "Test Name",
          "Unit",
          "Total Amount"
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
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.department}</td>
                    <td>{row.testName}</td>
                    <td>{row.unit}</td>
                    <td>{row.totalAmount.toFixed(2)}</td>
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
        </>
      )}
    </div>
  );
};

export default ItemWiseLab;
