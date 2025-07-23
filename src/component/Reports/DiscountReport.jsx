import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import './UserCollectionReport.css';

const DiscountReport = () => {
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
    {
        receiptDate: "24-Nov-2023",
        receiptNo: "BL3",
        schemeName: "General",
        hospitalNo: "231 1000003",
        patientName: "Titus Kipsang",
        age: "33Y",
        gender: "Male",
        visitType: "outpatient",
        address: "Bomet central sub...",
        itemName: "USG Chest",
        price: 1000,
        discount: 100,
        total: 900,
        user: "Mr. ad",
        remarks: "NHIF CAP...",
        counter:"New-1"
      },
      {
        receiptDate: "29-Nov-2023",
        receiptNo: "BL15",
        schemeName: "General",
        hospitalNo: "231 1000005",
        patientName: "Mary Mwihaki",
        age: "41 Y",
        gender: "Female",
        visitType: "outpatient",
        address: "Belgut sub county",
        itemName: "FASTING BLOOD SUGAR",
        price: 900,
        discount: 200,
        total: 810,
        user: "Mr. ad",
        remarks: "NHIF CAP...",
        counter:"New-1"
      },
      {
        receiptDate: "29-Nov-2023",
        receiptNo: "BL16",
        schemeName: "General",
        hospitalNo: "231 1000005",
        patientName: "Mary Mwihaki",
        age: "41 Y",
        gender: "Female",
        visitType: "outpatient",
        address: "Belgut sub county",
        itemName: "USG Chest",
        price: 2000,
        discount: 200,
        total: 1800,
        user: "Mr. ad",
        remarks: "NHIF CAP...",
        counter:"New-1"
      },
      {
        receiptDate: "29-Nov-2023",
        receiptNo: "BL17",
        schemeName: "General",
        hospitalNo: "231 1000006",
        patientName: "William Chebor",
        age: "21Y",
        gender: "Male",
        visitType: "outpatient",
        address: "Baringo central su...",
        itemName: "FASTING BLOOD SUGAR",
        price: 900,
        discount: 450,
        total: 450,
        user: "Mr. ad",
        remarks: "NHIF CAP...",
        counter:"New-1"
      },
      {
        receiptDate: "29-Nov-2023",
        receiptNo: "BL18",
        schemeName: "General",
        hospitalNo: "231 1000006",
        patientName: "William Chebor",
        age: "41 Y",
        gender: "Male",
        visitType: "outpatient",
        address: "Baringo central su...",
        itemName: "USG Chest",
        price: 2000,
        discount: 270,
        total: 1800,
        user: "Mr. ad",
        remarks: "NHIF CAZ...",
        counter:"New-1"
      },
      {
        receiptDate: "30-Nov-2023",
        receiptNo: "BL22",
        schemeName: "NHIF CAPITATION",
        hospitalNo: "231 1000008",
        patientName: "John Kibet",
        age: "41 Y",
        gender: "Male",
        visitType: "inpatient",
        address: "Belgut sub county",
        itemName: "USG Chest",
        price: 2000,
        discount: 500,
        total: 1500,
        user: "Mr. ad",
        remarks: "NHIF CAP...",
        counter:"New-1"
      },
      {
        receiptDate: "30-Nov-2023",
        receiptNo: "BL23",
        schemeName: "General",
        hospitalNo: "231 1000008",
        patientName: "John Kibet",
        age: "21Y",
        gender: "Male",
        visitType: "outpatient",
        address: "Belgut sub county",
        itemName: "FASTING BLOOD SUGAR",
        price: 800,
        discount: 80,
        total: 720,
        user: "Mr. ad",
        remarks: "NHIF Gem...",
        counter:"New-1"
      },
      {
        receiptDate: "01-Dec-2023",
        receiptNo: "BL25",
        schemeName: "General",
        hospitalNo: "2312000010",
        patientName: "Sonia Chebii",
        age: "22M",
        gender: "Female",
        visitType: "inpatient",
        address: "Belgut sub county",
        itemName: "USG Chest",
        price: 33600,
        discount: 10080,
        total: 23520,
        user: "Mr. ad",
        remarks: "patient dj...",
        counter:"New-1"
      },
      {
        receiptDate: "01-Dec-2023",
        receiptNo: "BL26",
        schemeName: "General",
        hospitalNo: "231 1000008",
        patientName: "John Kibet",
        age: "32M",
        gender: "Male",
        visitType: "outpatient",
        address: "Belgut sub county",
        itemName: "FASTING BLOOD SUGAR",
        price: 1000,
        discount: 50,
        total: 950,
        user: "Mr. ad",
        remarks: "General",
        counter:"New-1"
      },
      {
        receiptDate: "12-May-2024",
        receiptNo: "BL30",
        schemeName: "NHIF CAPITATION",
        hospitalNo: "2406003728",
        patientName: "Sunny Matte",
        age: "41 Y",
        gender: "Male",
        visitType: "outpatient",
        address: "Mumbai, Andhra Pr...",
        itemName: "USG Chest",
        price: 1000,
        discount: 50,
        total: 950,
        user: "Mr. ad",
        remarks: "BRITAM",
        counter:"New-1"
      },
      {
        receiptDate: "13-Jun-2024",
        receiptNo: "BL78",
        schemeName: "General",
        hospitalNo: "2406003728",
        patientName: "Sunny Matte",
        age: "41 Y",
        gender: "Male",
        visitType: "outpatient",
        address: "Mumbai, Andhra Pr...",
        itemName: "FASTING BLOOD SUGAR",
        price: 500,
        discount: 25,
        total: 475,
        user: "Mr. ad",
        remarks: "General",
        counter:"New-1"
      },
      {
        receiptDate: "13-Jun-2024",
        receiptNo: "BL79",
        schemeName: "General",
        hospitalNo: "2406003788",
        patientName: "Cdsfssdfsdf Dsfsdffdsfs Dsfcsdfs",
        age: "21Y",
        gender: "Male",
        visitType: "outpatient",
        address: "cvxcvxcxczx, Awen...",
        itemName: "USG Chest",
        price: 1000,
        discount: 50,
        total: 950,
        user: "Mr. ad",
        remarks: "General",
        counter:"New-1"
      },
      {
        receiptDate: "27-Jun-2024",
        receiptNo: "BL179",
        schemeName: "General",
        hospitalNo: "2406003788",
        patientName: "Cdsfssdfsdf Dsfsdffdsfs Dsfcsdfs",
        age: "21Y",
        gender: "Male",
        visitType: "outpatient",
        address: "cvxcvxcxczx, Awen...",
        itemName: "FASTING BLOOD SUGAR",
        price: 1000,
        discount: 50,
        total: 950,
        user: "Mr. ad",
        remarks: "General",
        counter:"New-1"
      },
      {
        receiptDate: "27-Jun-2024",
        receiptNo: "BL180",
        schemeName: "General",
        hospitalNo: "2407003791",
        patientName: "Sajid Passa Shafin",
        age: "21Y",
        gender: "Male",
        visitType: "outpatient",
        address: "Juja sub county",
        itemName: "USG Chest",
        price: 1000,
        discount: 50,
        total: 950,
        user: "Mr. ad",
        remarks: "BRITAM",
        counter:"New-1"
      },
      {
        receiptDate: "30-Jul-2024",
        receiptNo: "BL213",
        schemeName: "General",
        hospitalNo: "2407003799",
        patientName: "ANGEL VARGAS MONTERO",
        age: "21Y",
        gender: "Male",
        visitType: "outpatient",
        address: "quinarayan, narvac...",
        itemName: "FASTING BLOOD SUGAR",
        price: 1000,
        discount: 50,
        total: 950,
        user: "Mr. ad",
        remarks: "General",
        counter:"New-1"
      }
 ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Discount Report </h3>
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
              Showing 16/16 results
            </div>

            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>

          <div className='user-collection-report-tab'>
          <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Receipt Date",
                "Receipt No",
                "Scheme Name",
                "Hospital No",
                "Patient Name",
                "Age",
                "Gender",
                "Visit Type",
                "Address",
                "Item Name",
                "Price",
                "Discount",
                "Total",
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
                    <td>{row.receiptDate}</td>
                    <td>{row.receiptNo}</td>
                    <td>{row.schemeName}</td>
                    <td>{row.hospitalNo}</td>
                    <td>{row.patientName}</td>
                    <td>{row.age}</td>
                    <td>{row.gender}</td>
                    <td>{row.visitType}</td>
                    <td>{row.address}</td>
                    <td>{row.itemName}</td>
                    <td>{row.price}</td>
                    <td>{row.discount}</td>
                    <td>{row.total}</td>
                    <td>{row.user}</td>
                    <td>{row.remarks}</td>
                    <td>{row.counter}</td>
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
            <h4 className="user-collection-report-net-collection">Summary</h4>
            <div className="user-collection-report-summary">
              <table className="user-collection-report-summary-table">
                <tbody>
                  <tr><td>Total Invoice Amount</td><td>50,000.00</td></tr>
                  <tr><td>Total Discount</td><td>13,360.00</td></tr>
                  <tr><td>Total Return Amount</td><td>36,640.00</td></tr>
                  <tr><td>Total Return Discount</td><td>0.00</td></tr>
                  <tr><td>Total</td><td>36,640.00</td></tr>
                </tbody>
              </table>
              <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DiscountReport;
