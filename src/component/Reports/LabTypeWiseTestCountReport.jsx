import React, { useState, useEffect,useRef } from 'react';
import './UserCollectionReport.css';

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const LabTypeWiseTestCountReport = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState(['Dr. Smith', 'Dr. Johnson', 'Dr. Williams']); // Example doctors list
  const [showReport, setShowReport] = useState(false); // State to toggle report display
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Manage checkbox states
  const [checkboxStates, setCheckboxStates] = useState({
    all: true,
    samplePending: false,
    resultPending: false,
    resultAdded: true,
    reportFinalized: true,
  });

  // Sample reports data, replace this with your actual data fetching logic
  const [reportsData, setReportsData] = useState([]);

  useEffect(() => {
    // Example of loading data, replace with your actual data fetch logic
    const fetchData = async () => {
      // Fetch data from API or define it statically
      const sampleData = [
        { categoryName: 'Serology', lastTestName: 'BRUCELLA', opLabTestCount: '1', erLabTestCountNo: '1', total: '1' },
        { categoryName: 'Serology', lastTestName: 'COVID 19 AG', opLabTestCount: '8', erLabTestCountNo: '1', total: '2' },
        { categoryName: 'Biochemistry', lastTestName: 'FASTING BLOOD SUGAR', opLabTestCount: '2', erLabTestCountNo: '1', total: '9' },
        { categoryName: 'Microbiology', lastTestName: 'HIGH VAGINAL SWAB', opLabTestCount: '2', erLabTestCountNo: '0', total: '2' },
        { categoryName: 'Biochemistry', lastTestName: 'KIDNEY FCJNTION TESTS', opLabTestCount: '10', erLabTestCountNo: '0', total: '2' },
        { categoryName: 'Biochemistry', lastTestName: 'LFT', opLabTestCount: '2', erLabTestCountNo: '0', total: '10' },
        { categoryName: 'Hematology', lastTestName: 'MP SMEAR', opLabTestCount: '4', erLabTestCountNo: '0', total: '2' },
        { categoryName: 'Biochemistry', lastTestName: 'RBS(SUPPORT GROUP)', opLabTestCount: '4', erLabTestCountNo: '0', total: '4' },
        { categoryName: 'Biochemistry', lastTestName: 'Sugar Fasting', opLabTestCount: '7', erLabTestCountNo: '0', total: '7' },
        { categoryName: 'Biochemistry', lastTestName: 'URIC ACID', opLabTestCount: '3', erLabTestCountNo: '0', total: '3' },
        { categoryName: 'Biochemistry', lastTestName: 'URIC ACID', opLabTestCount: '3', erLabTestCountNo: '0', total: '3' },
      ];
      setReportsData(sampleData);
    };

    fetchData();
  }, []);

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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxStates((prevStates) => {
      if (name === 'all') {
        // Set all checkboxes based on 'All' checkbox
        return {
          all: checked,
          samplePending: checked,
          resultPending: checked,
          resultAdded: checked,
          reportFinalized: checked,
        };
      } else {
        // Set individual checkboxes
        const newState = {
          ...prevStates,
          [name]: checked,
        };
        // If any checkbox is unchecked, uncheck 'All'
        const allChecked = Object.values(newState).every((value) => value);
        return {
          ...newState,
          all: allChecked,
        };
      }
    });
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ LabTypeWise Total Test Count Report</h3>
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
          <div className="user-collection-report-doctor-filter">
            <label>Enter Category Name :</label>
            <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
              <option value="">Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="order-status-filter">
          <div className="order-status-checkboxes">
            <label>
              <input
                type="checkbox"
                name="all"
                checked={checkboxStates.all}
                onChange={handleCheckboxChange}
              /> All
            </label>
            <label>
              <input
                type="checkbox"
                name="samplePending"
                checked={checkboxStates.samplePending}
                onChange={handleCheckboxChange}
              /> Sample Pending
            </label>
            <label>
              <input
                type="checkbox"
                name="resultPending"
                checked={checkboxStates.resultPending}
                onChange={handleCheckboxChange}
              /> Result Pending
            </label>
            <label>
              <input
                type="checkbox"
                name="resultAdded"
                checked={checkboxStates.resultAdded}
                onChange={handleCheckboxChange}
              /> Result Added
            </label>
            <label>
              <input
                type="checkbox"
                name="reportFinalized"
                checked={checkboxStates.reportFinalized}
                onChange={handleCheckboxChange}
              /> Report Finalized
            </label>
            <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
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
              onChange={(e) => console.log(e.target.value)} // Implement search logic here if needed
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
                "Category Name",
                "Last Test Name",
                "Op-LabTest Count",
                "ER-LabTest Count No",
                "Total"
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
                    <td>{row.categoryName}</td>
                    <td>{row.lastTestName}</td>
                    <td>{row.opLabTestCount}</td>
                    <td>{row.erLabTestCountNo}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="user-collection-report-pagination">
              <button className="user-collection-report-pagination-btn">First</button>
              <button className="user-collection-report-pagination-btn">Previous</button>
              <span>Page 1 of 4</span>
              <button className="user-collection-report-pagination-btn">Next</button>
              <button className="user-collection-report-pagination-btn">Last</button>
            </div>
          </div>
        </>
      )}
       <div className='net-cash-collection-header'>
          <h4 className="user-collection-report-net-collection">Summary</h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
    <tbody>
      <tr><td>Total Test Count (op-lab):</td><td>43</td></tr>
      <tr><td>DisTotal Test Count (op-lab):count</td><td>3</td></tr>
      <tr><td>Grand Total:</td><td>46</td></tr>
      
    </tbody>
  </table>
  {/* Uncomment and use this button if needed */}
  <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
  </div>
          </div>
    </div>
  );
};

export default LabTypeWiseTestCountReport;
