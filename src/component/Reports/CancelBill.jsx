import React, { useState,useRef } from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const CancelBill = () => {
  const [showReport, setShowReport] = useState(false); // State to control report visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Function to handle print action
  const handlePrint = () => {
    window.print(); // Opens the browser's print dialog
  };

  // Function to handle export action (currently a placeholder)
  const handleExport = () => {
    console.log('Export function not yet implemented');
    // Implement export logic here
  };

  // Function to toggle popup visibility
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to handle date range selection from the popup
  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    setIsPopupOpen(false); // Close the popup after selection
  };

  // Function to handle search action
  const handleSearch = (query) => {
    console.log(`Searching for: ${query}`);
  };

  // Sample data for reports
  const reportsData = [
    {
      date: "12-Jun-2024",
      monthId: "JUN",
      type: "CardSales",
      receiptNo: "BL8",
      billingType: "Outpatient",
      visitType: "New",
      hospitalNo: "2406003717",
      patientName: "Terry McDonald",
      department: "X-RAY",
      item: "USG Chest",
      price: 1000,
      qty: 1,
      subTotal: 1000,
      discount: 0,
      netTotal: 1000,
      user: "Mr. admin admin",
      performer: "Dr. Smith",
      prescriber: "Dr. John",
      remarks: "USG Chest Exam",
      referenceReceiptNo: "NA",
      scheme: "General",
      isInsurance: "NO",
      billEntryDate: "2024-06-12T22:00:00Z",
      cancelledDate: "2024-06-09T01:00:00Z",
      cancelledBy: "Mr. admin admin",
      cancelRemarks: "sdf",
    },
    {
      date: "08-Jun-2024",
      monthId: "JUN",
      type: "CashSales",
      receiptNo: "BL9",
      billingType: "Outpatient",
      visitType: "Follow-up",
      hospitalNo: "2406003699",
      patientName: "Birhanu Hailemichael",
      department: "Biochemistry",
      item: "FASTING BLOOD SUGAR",
      price: 600,
      qty: 1,
      subTotal: 600,
      discount: 0,
      netTotal: 600,
      user: "Ms. Jane Doe",
      performer: "Dr. Alex",
      prescriber: "Dr. King",
      remarks: "Fasting Blood Sugar Test",
      referenceReceiptNo: "NA",
      scheme: "General",
      isInsurance: "NO",
      billEntryDate: "2024-06-08T12:00:00Z",
      cancelledDate: "2024-06-09T01:00:00Z",
      cancelledBy: "Mr. admin admin",
      cancelRemarks: "ttdtfggh",
    },
  ];

  // Function to show the report
  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Total items bill Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" />
            <label>To:</label>
            <input type="date" />
            <button className="user-collection-report-fav-btn">☆</button>
            <button className="user-collection-report-fav-btn" onClick={handlePopupToggle}>-</button>
            <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>

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
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="user-collection-page-results-info">
              Showing {reportsData.length}/2 results
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
               "Patient Name",
              "Hospital No",
              "Service Department",
              "Item Name",
              "Qty",
              "Total Amt",
              "Bill Entry Date",
              "Entered By",
              "Cancelled Date",
              "Cancelled By",
              "Cancel Remarks"
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
                      <td>{row.patientName}</td>
                      <td>{row.hospitalNo}</td>
                      <td>{row.department}</td>
                      <td>{row.item}</td>
                      <td>{row.qty}</td>
                      <td>{row.netTotal}</td>
                      <td>{new Date(row.billEntryDate).toLocaleDateString()}</td>
                      <td>{row.user}</td>
                      <td>{new Date(row.cancelledDate).toLocaleDateString()}</td>
                      <td>{row.cancelledBy}</td>
                      <td>{row.cancelRemarks}</td>
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

export default CancelBill;
