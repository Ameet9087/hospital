import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const TestStatusDetailsReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
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

  const reportsData = [
    {
        hospitalNo: '2407003796',
        membership: '27WFema1e',
        rank: '1',
        patientName: 'Sample Sdf Gh',
        ageSex: '34Y/Female',
        requestedOn: '2024-07-26T15:01:34.883',
        testName: 'Sugar Fasting',
        runNo: '1/4',
        wardName: 'OPD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Dr. pooja W',
        testStatus: 'Sample Collected',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2407003796',
        membership: '27WFema1e',
        rank: '2',
        patientName: 'Sample Sdf Gh',
        ageSex: '34Y/Female',
        requestedOn: '2024-07-23T17:07:07.993',
        testName: 'BRUCELLA',
        runNo: '2/4',
        wardName: 'OPD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. CHRISTINE MUTOKA',
        prescriber: 'Dr. pooja',
        testStatus: 'Sample Not Collected',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003702',
        membership: '34Y/Male',
        rank: '3',
        patientName: 'Philip Juma',
        ageSex: '34Y/Male',
        requestedOn: '2024-07-01T10:34:11.111',
        testName: 'KIDNEY FUNCTION TESTS',
        runNo: '17/3',
        wardName: 'MALE WARD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Mr. COLLIN...',
        testStatus: 'Result Added',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003783',
        membership: '34Y/Female',
        rank: '4',
        patientName: 'Monicah Juma',
        ageSex: '34Y/Female',
        requestedOn: '2024-06-26T10:11:34.11',
        testName: 'MP SMEAR',
        runNo: '17/3',
        wardName: 'MATERNITY WARD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Dr. Emman...',
        testStatus: 'Sample Not Collected',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003783',
        membership: '25Y/Female',
        rank: '5',
        patientName: 'Test Patient',
        ageSex: '25Y/Female',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'COVID 19 AG',
        runNo: '15/3',
        wardName: 'MATERNITY WARD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Dr. Emman..',
        testStatus: 'Sample Not Collected',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003789',
        membership: '25Y/Male',
        rank: '6',
        patientName: 'Test Patient',
        ageSex: '25Y/Male',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'FASTING BLOOD SUGAR',
        runNo: '14/3',
        wardName: 'OPD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Mr. KEPHA',
        testStatus: 'Result Added',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003789',
        membership: '25Y/Male',
        rank: '7',
        patientName: 'Test Patient',
        ageSex: '25Y/Male',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'HIGH VAGINAL SWAB',
        runNo: '13/3',
        wardName: 'ICU',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Mr. KEPHA',
        testStatus: 'Sample Collected',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003789',
        membership: '25Y/Female',
        rank: '8',
        patientName: 'Monicah Juma',
        ageSex: '25Y/Female',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'MP SMEAR',
        runNo: '12/3',
        wardName: 'ICU',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'SELF',
        testStatus: 'Sample Collected',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003783',
        membership: '34Y/Female',
        rank: '9',
        patientName: 'Monicah Juma',
        ageSex: '34Y/Female',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'RBS (SUPPORT GROUP)',
        runNo: '10/3',
        wardName: 'MATERNITY WARD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Dr. VICTOR',
        testStatus: 'Report Generated',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003788',
        membership: '3M/Male',
        rank: '10',
        patientName: 'Cdsfssdfsdf Dsfsdffdsfs Dsfc...',
        ageSex: '3M/Male',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'COVID 19 AG',
        runNo: '10/3',
        wardName: 'OPD',
        billStatus: 'Provisional',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Mr. KEPHA',
        testStatus: 'Report Generated',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003788',
        membership: '30Y/Female',
        rank: '11',
        patientName: 'Cdsfssdfsdf Dsfsdffdsfs Dsfc...',
        ageSex: '30Y/Female',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'URIC ACID',
        runNo: '10/3',
        wardName: 'OPD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Mrs. BEATRICE',
        testStatus: 'Report Generated',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003782',
        membership: '20Y/Male',
        rank: '12',
        patientName: 'John Kibet',
        ageSex: '20Y/Male',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'Sugar Fasting',
        runNo: '1/4',
        wardName: 'OPD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'SELF',
        testStatus: 'Result Added',
        billCancelledBy: '',
        billCancelledOn: ''
      },
      {
        hospitalNo: '2406003780',
        membership: '20Y/Female',
        rank: '13',
        patientName: 'Mercy Kosgei',
        ageSex: '20Y/Female',
        requestedOn: '2024-06-19T17:12:40.283',
        testName: 'RBS (SUPPORT GROUP)',
        runNo: '1/4',
        wardName: 'OPD',
        billStatus: 'Paid',
        sampleCollectedBy: 'Mr. admin admin',
        prescriber: 'Mrs. BERTH...',
        testStatus: 'Result Added',
        billCancelledBy: '',
        billCancelledOn: ''
      }
  ];

  const handleShowReport = () => {
    setShowReport(true);
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

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Patient Wise Lab Test Status</h3>
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
          <div className='order-status-filter'>
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
                /> Report-Finalized
              </label>
            </div>
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
               "Hospital No",
                "Membership",
                "Rank",
                "Patient Name",
                "Age/Sex",
                "Requested On",
                "Test Name",
                "Run No",
                "Ward Name",
                "Bill Status",
                "Sample Collected By",
                "Prescriber",
                "Test Status",
                "Bill Cancelled By",
                "Bill Cancelled On"

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
              <td>{row.membership}</td>
              <td>{row.rank}</td>
              <td>{row.patientName}</td>
              <td>{row.ageSex}</td>
              <td>{row.requestedOn}</td>
              <td>{row.testName}</td>
              <td>{row.runNo}</td>
              <td>{row.wardName}</td>
              <td>{row.billStatus}</td>
              <td>{row.sampleCollectedBy}</td>
              <td>{row.prescriber}</td>
              <td>{row.testStatus}</td>
              <td>{row.billCancelledBy}</td>
              <td>{row.billCancelledOn}</td>
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

export default TestStatusDetailsReport;
