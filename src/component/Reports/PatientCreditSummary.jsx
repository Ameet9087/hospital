import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';

import './UserCollectionReport.css';

import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const PatientCreditSummary = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
  };

  const reportsData = [
    {
        date: '29-Nov-2023',
        patientName: 'Mary Mwihaki',
        hospitalNumber: '231 1000005',
        subtotal: 2000,
        discount: 200,
        creditAmount: 1800,
        invoiceNo: 16,
        creditOrg: 'NH IF CAPITA..',
        remarks: 'NAIF CAPITATION'
      },
      {
        date: '12-May-2024',
        patientName: 'John Kibet',
        hospitalNumber: '2311000008',
        subtotal: 33600,
        discount: 10080,
        creditAmount: 23520,
        invoiceNo: 30,
        creditOrg: 'NHIF CA PITA..',
        remarks: 'patient discharged'
      },
      {
        date: '01-Dec-2023',
        patientName: 'Raphael Kipruto',
        hospitalNumber: '2312000009',
        subtotal: 1000,
        discount: 80,
        creditAmount: 1000,
        invoiceNo: 24,
        creditOrg: 'NH IF General',
        remarks: 'General'
      },
      {
        date: '01-Dec-2023',
        patientName: 'Sonia Chebii',
        hospitalNumber: '2312000010',
        subtotal: 800,
        discount: 50,
        creditAmount: 720,
        invoiceNo: 26,
        creditOrg: 'NH IF General',
        remarks: 'NH IF General'
      },
      {
        date: '23-Dec-2023',
        patientName: 'Sonia Chebii',
        hospitalNumber: '2312000010',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 54,
        creditOrg: 'NH IF General',
        remarks: 'General'
      },
      {
        date: '12-Feb-2024',
        patientName: 'Peter Kariuki',
        hospitalNumber: '2312000017',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 9,
        creditOrg: 'NHIF CA PITA..',
        remarks: 'General'
      },
      {
        date: '12-Feb-2024',
        patientName: 'Peter Kariuki',
        hospitalNumber: '2312000017',
        subtotal: 1600,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 10,
        creditOrg: 'NH IF CAPITA..',
        remarks: 'TATA INS'
      },
      {
        date: '15-Dec-2023',
        patientName: 'Peter Kariuki',
        hospitalNumber: '2312000017',
        subtotal: 500,
        discount: 500,
        creditAmount: 500,
        invoiceNo: 42,
        creditOrg: 'BRITAM',
        remarks: 'General'
      },
      {
        date: '15-Dec-2023',
        patientName: 'Julius Karani',
        hospitalNumber: '2312000018',
        subtotal: 500,
        discount: 500,
        creditAmount: 500,
        invoiceNo: 24,
        creditOrg: 'BRITAM',
        remarks: 'General'
      },
      {
        date: '19-Mar-2024',
        patientName: 'Josephine Nekesa',
        hospitalNumber: '2402000026',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 27,
        creditOrg: 'NHIF CA PITA..',
        remarks: 'General'
      },
      {
        date: '18-Feb-2024',
        patientName: 'Josephine Nekesa',
        hospitalNumber: '2402000026',
        subtotal: 600,
        discount: 600,
        creditAmount: 600,
        invoiceNo: 19,
        creditOrg: 'NH IF CAPITA..',
        remarks: 'General'
      },
      {
        date: '18-Feb-2024',
        patientName: 'Jesse Mutahi',
        hospitalNumber: '2402000027',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 20,
        creditOrg: 'NHIF CA PITA..',
        remarks: 'General'
      },
      {
        date: '19-Feb-2024',
        patientName: 'Jesse Mutahi',
        hospitalNumber: '2402000027',
        subtotal: 1200,
        discount: 1200,
        creditAmount: 1000,
        invoiceNo: 21,
        creditOrg: 'NH IF CAPITA..',
        remarks: 'General'
      },
      {
        date: '23-May-2024',
        patientName: 'Joseph Stalin',
        hospitalNumber: '2402000028',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 33,
        creditOrg: 'NH IF CA PITA..',
        remarks: 'General'
      },
      {
        date: '08-Jun-2024',
        patientName: 'Julius Nyerere',
        hospitalNumber: '2405003693',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 36,
        creditOrg: 'MTIBA',
        remarks: 'General'
      },
      {
        date: '10-Jun-2024',
        patientName: 'Birhanu Hailemichael Ahmed',
        hospitalNumber: '2406003699',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 79,
        creditOrg: 'MADISON IN',
        remarks: 'General'
      },
      {
        date: '13-Jun-2024',
        patientName: 'Philip Juma',
        hospitalNumber: '2406003702',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 146,
        creditOrg: 'MADISON IN',
        remarks: 'General'
      },
      {
        date: '15-Jun-2024',
        patientName: 'Sunny Matte',
        hospitalNumber: '2406003728',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 214,
        creditOrg: 'MADISON IN',
        remarks: 'General'
      },
      {
        date: '20-Jul-2024',
        patientName: 'Brian Okumu',
        hospitalNumber: '2406003787',
        subtotal: 1000,
        discount: 950,
        creditAmount: 1000,
        invoiceNo: 1,
        creditOrg: 'NHIF CA PITA..',
        remarks: 'General'
      },
      {
        date: '21-Jul-2024',
        patientName: 'Asdasd Asdasdas',
        hospitalNumber: '2407003795',
        subtotal: 1000,
        discount: 1000,
        creditAmount: 1000,
        invoiceNo: 1,
        creditOrg: 'NH IF CA PITA..',
        remarks: 'General'
      }
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Patient Wise Credit Report On 30-08-2024</h3>
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
          <div className="user-collection-report-user-filter">
            <label htmlFor="user-checkbox">Is Insurance:</label>
            <input type="checkbox" id="user-checkbox" />
          </div>
        </div>
      </div>
      <div className='user-collection-repor-advance-filter'>
        <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        <button className="user-collection-report-show-btn">Advance Filter</button>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            {/* Search Input */}
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)} // Ensure the handleSearch function is defined
            />
            
            {/* Print and Export Buttons */}
            <div className="user-collection-page-results-info">
              Showing 334/334 results
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
               "Sr No",
                "Date",
                "Patient Name",
                "Hospital Number",
                "SubTotal",
                "DiscountAmt",
                "Credit Amount",
                "Invoice No",
                "Credit Organization",
                "Remarks"
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
                      <td>{index + 1}</td> {/* Added serial number */}
                      <td>{row.date}</td>
                      <td>{row.patientName}</td>
                      <td>{row.hospitalNumber}</td>
                      <td>{row.subtotal}</td>
                      <td>{row.discount}</td>
                      <td>{row.creditAmount}</td>
                      <td>{row.invoiceNo}</td>
                      <td>{row.creditOrg}</td>
                      <td>{row.remarks}</td>
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
      )}
    </div>
  );
};

export default PatientCreditSummary;
