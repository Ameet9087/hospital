import React, { useState ,useRef} from 'react';
import { Button } from 'react-bootstrap';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const ItemSummaryReport = () => {
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
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };

  const reportsData = [
    { department: 'Admission Fees', itemName: 'Admission Fees', quantity: 2, discountAmount: 10, totalAmount: 1000 },
    { department: 'Bed Charge', itemName: 'Bed Charge', quantity: 163, discountAmount: 39780, totalAmount: 22820 },
    { department: 'Biochemistry', itemName: 'Biochemistry', quantity: 2, discountAmount: 20, totalAmount: 2400 },
    { department: 'Biochemistry', itemName: 'Biochemistry', quantity: 14, discountAmount: 80, totalAmount: 15000 },
    { department: 'Biochemistry', itemName: 'Biochemistry', quantity: 17, discountAmount: 20, totalAmount: 17000 },
    { department: 'Biochemistry', itemName: 'Biochemistry', quantity: 5, discountAmount: 20, totalAmount: 100 },
    { department: 'CLINICALS', itemName: 'CLINICALS', quantity: 5, discountAmount: 70, totalAmount: 2300 },
    { department: 'CT SCAN', itemName: 'CT SCAN', quantity: 10, discountAmount: 50, totalAmount: 2300 },
    { department: 'CT SCAN', itemName: 'CT-SCAN', quantity: 4, discountAmount: 50, totalAmount: 7000 },
    { department: 'Hematology', itemName: 'Hematology', quantity: 12, discountAmount: 10, totalAmount: 500 },
    { department: 'Microbiolog', itemName: 'Microbiolog', quantity: 2, discountAmount: 40, totalAmount: 5000 },
    { department: 'MRI', itemName: 'MRI', quantity: 4, discountAmount: 10, totalAmount: 132000 },
    { department: 'MRI', itemName: 'MRI', quantity: 127, discountAmount: 40, totalAmount: 1500 },
    { department: 'OPD', itemName: 'OPD', quantity: 38, discountAmount: 60, totalAmount: 60000 },
    { department: 'Consultation', itemName: 'Consultation', quantity: 2, discountAmount: 150, totalAmount: 125350 },
    { department: 'Dispensing Fee', itemName: 'Dispensing Fee', quantity: 4, discountAmount: 0, totalAmount: 28350 },
  ];

  const calculationSummary = {
    totalQuantity: 512000,
    grossTotal: 819900.00,
    totalDiscount: 11380.00,
    netTotal: 805395.00
  };

  const handleSearch = (searchTerm) => {
    console.log('Search Term:', searchTerm);
    // Implement search logic here
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛Item Summary Report</h3>
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
                "Department",
                "Item Name",
                "Quantity",
                "Discount Amount",
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
                {reportsData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.department}</td>
                    <td>{data.itemName}</td>
                    <td>{data.quantity}</td>
                    <td>{data.discountAmount}</td>
                    <td>{data.totalAmount}</td>
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
          <div className='net-cash-collection-header'>
            <h4 className="user-collection-report-net-collection">⚛ Calculation Summary</h4>
            <div className="user-collection-report-summary">
              <table className="user-collection-report-summary-table">
                <tbody>
                  <tr><td>Total Quantity</td><td>{calculationSummary.totalQuantity}</td></tr>
                  <tr><td>Gross Total</td><td>{calculationSummary.grossTotal.toFixed(2)}</td></tr>
                  <tr><td>Total Discount</td><td>{calculationSummary.totalDiscount.toFixed(2)}</td></tr>
                  <tr><td>Net Total</td><td>{calculationSummary.netTotal.toFixed(2)}</td></tr>
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

export default ItemSummaryReport;
