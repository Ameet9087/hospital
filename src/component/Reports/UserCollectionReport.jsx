import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
const UserCollectionReport = () => {
  const [showReport, setShowReport] = useState(false);
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };
  const reportsData = [
    { date: "24-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL1", hospitalNo: "2311000001", patientName: "Janet Wambui", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "24-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL2", hospitalNo: "2311000001", patientName: "Jaqueline Kagunda", subTotal: 1000, discount: 0, netTotal: 1000, cashCollected: 1000, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "25-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL3", hospitalNo: "2311000002", patientName: "Titus Kipsang", subTotal: 900, discount: 100, netTotal: 800, cashCollected: 800, user: "Mr. admin admin", remarks: "New-I", counter: "New-1" },
    { date: "25-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL4", hospitalNo: "2311000002", patientName: "Janet Wambui", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "NHIF CAPITATION-1", counter: "New-1" },
    { date: "25-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL5", hospitalNo: "2311000003", patientName: "Jaqueline Kagunda", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "25-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL6", hospitalNo: "2311000003", patientName: "Jaqueline Kagunda", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "25-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL7", hospitalNo: "2311000004", patientName: "Jaqueline Kagunda", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "25-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL8", hospitalNo: "2311000004", patientName: "Jaqueline Kagunda", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "25-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL9", hospitalNo: "2311000005", patientName: "Jane Boke", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "28-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL10", hospitalNo: "2311000005", patientName: "Jane Boke", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "28-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL11", hospitalNo: "2311000006", patientName: "Mary Mwihaki", subTotal: 900, discount: 0, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "New-I", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL12", hospitalNo: "2311000007", patientName: "William Chebor", subTotal: 2000, discount: 100, netTotal: 1900, cashCollected: 1900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL13", hospitalNo: "2311000007", patientName: "William Chebor", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "NHIF CAPITATION-1", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL14", hospitalNo: "2311000008", patientName: "Mary Mwihaki", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL15", hospitalNo: "2311000008", patientName: "Jane Boke", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL16", hospitalNo: "2311000009", patientName: "Josephine Mwania", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL17", hospitalNo: "2311000009", patientName: "Janet Wambui", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL18", hospitalNo: "2311000010", patientName: "Jaqueline Kagunda", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL19", hospitalNo: "2311000010", patientName: "Jane Boke", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CardSales", receiptNo: "BL20", hospitalNo: "2311000011", patientName: "Mary Mwihaki", subTotal: 500, discount: 0, netTotal: 500, cashCollected: 500, user: "Mr. admin admin", remarks: "General", counter: "New-1" },
    { date: "29-Nov-2023", monthId: "NOV", type: "CashSales", receiptNo: "BL21", hospitalNo: "2311000011", patientName: "William Chebor", subTotal: 1000, discount: 100, netTotal: 900, cashCollected: 900, user: "Mr. admin admin", remarks: "General", counter: "New-1" },  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ User Collection Report (Detailed)</h3>
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
        <div className="user-collection-report-counter-filter">
          <label>Counter:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>User:</label>
          <input type="text" placeholder="Enter User Name" />
        </div>
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

<table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
             "Date",
            "MonthID",
            "Type",
            "Receipt No",
            "Hospital No",
            "Patient Name",
            "Sub Total",
            "Discount",
            "Net Total",
            "Cash Collected",
            "User",
            "Remarks",
            "Counter"
            
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
                  <td>{row.monthId}</td>
                  <td>{row.type}</td>
                  <td>{row.receiptNo}</td>
                  <td>{row.hospitalNo}</td>
                  <td>{row.patientName}</td>
                  <td>{row.subTotal}</td>
                  <td>{row.discount}</td>
                  <td>{row.netTotal}</td>
                  <td>{row.cashCollected}</td>
                  <td>{row.user}</td>
                  <td>{row.remarks}</td>
                  <td>{row.counter}</td>
                </tr>
              ))}
            </tbody>
          

          </table>
          {/* <div className="user-collection-report-page-no">
              <Button className="user-collection-report-pagination-btn">First</Button>
              <Button className="user-collection-report-pagination-btn">Previous</Button>
              <span>Page 1 of 4</span>
              <Button className="user-collection-report-pagination-btn">Next</Button>
              <Button className="user-collection-report-pagination-btn">Last</Button>
            </div> */}
</div>
          <div className='net-cash-collection-header'>
          <h4 className="user-collection-report-net-collection">Net Cash Collection: (791,952.24)</h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
    <tbody>
      <tr><td>Gross Total Sales</td><td>819,900.00</td></tr>
      <tr><td>Discount</td><td>14,505.00</td></tr>
      <tr><td>Return SubTotal</td><td>0.00</td></tr>
      <tr><td>Return Discount</td><td>0.00</td></tr>  
      <tr><td>Return Amount</td><td>0.00</td></tr>
      <tr><td>Net Sales</td><td>805,395.00</td></tr>
      <tr><td>Less Credit Amount</td><td>5,840.00</td></tr>
      <tr><td>Add Deposit Received</td><td>259,147.00</td></tr>
      <tr><td>Less Deposit Refund</td><td>28,725.00</td></tr>
      <tr><td>Add Collection From Receivables</td><td>1,975.24</td></tr>
      <tr><td>Less Cash Discount</td><td>0.00</td></tr>
      <tr><td>Other Payments Given</td><td>0.00</td></tr>
      <tr><td>Total Collection</td><td>791,952.24</td></tr>
    </tbody>
  </table>
  {/* Uncomment and use this button if needed */}
  <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
  </div>
          </div>

        </>
      )}
    </div>
  );
};

export default UserCollectionReport;
