import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
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
  const handleSearch = (query) => {
    // Filter reportsData based on the query
    console.log(`Searching for: ${query}`);
  };
  
  const reportsData = [
    
      {
        date: "24-Nov-2023",
        monthId: "NOV",
        type: "CardSales",
        receiptNo: "BL1",
        billingType: "Outpatient",
        visitType: "New",
        hospitalNo: "2311000001",
        patientName: "Janet Wambui",
        department: "General",
        item: "Consultation",
        price: 500,
        qty: 1,
        subTotal: 500,
        discount: 0,
        netTotal: 500,
        user: "Mr. admin admin",
        performer: "Dr. Smith",
        prescriber: "Dr. John",
        remarks: "General Checkup",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "25-Nov-2023",
        monthId: "NOV",
        type: "CashSales",
        receiptNo: "BL2",
        billingType: "Inpatient",
        visitType: "Follow-up",
        hospitalNo: "2311000002",
        patientName: "John Doe",
        department: "Lab",
        item: "Blood Test",
        price: 700,
        qty: 1,
        subTotal: 700,
        discount: 50,
        netTotal: 650,
        user: "Ms. Jane Doe",
        performer: "Dr. Alex",
        prescriber: "Dr. King",
        remarks: "Routine Lab",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "26-Nov-2023",
        monthId: "NOV",
        type: "CardSales",
        receiptNo: "BL3",
        billingType: "Outpatient",
        visitType: "New",
        hospitalNo: "2311000003",
        patientName: "Mary Smith",
        department: "Consultation",
        item: "Checkup",
        price: 400,
        qty: 1,
        subTotal: 400,
        discount: 0,
        netTotal: 400,
        user: "Dr. Alex King",
        performer: "Dr. Alex King",
        prescriber: "Dr. Alex King",
        remarks: "Initial Consultation",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "27-Nov-2023",
        monthId: "NOV",
        type: "OnlineSales",
        receiptNo: "BL4",
        billingType: "Outpatient",
        visitType: "Emergency",
        hospitalNo: "2311000004",
        patientName: "James Brown",
        department: "Surgery",
        item: "Minor Surgery",
        price: 800,
        qty: 1,
        subTotal: 800,
        discount: 100,
        netTotal: 700,
        user: "Mr. admin admin",
        performer: "Dr. Emily",
        prescriber: "Dr. John",
        remarks: "Emergency Surgery",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "28-Nov-2023",
        monthId: "NOV",
        type: "CashSales",
        receiptNo: "BL5",
        billingType: "Inpatient",
        visitType: "Follow-up",
        hospitalNo: "2311000005",
        patientName: "Linda Johnson",
        department: "Radiology",
        item: "X-Ray",
        price: 600,
        qty: 1,
        subTotal: 600,
        discount: 0,
        netTotal: 600,
        user: "Ms. Jane Doe",
        performer: "Dr. David",
        prescriber: "Dr. Emma",
        remarks: "Chest X-Ray",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "29-Nov-2023",
        monthId: "NOV",
        type: "CardSales",
        receiptNo: "BL6",
        billingType: "Outpatient",
        visitType: "New",
        hospitalNo: "2311000006",
        patientName: "Robert Williams",
        department: "Pharmacy",
        item: "Medication",
        price: 550,
        qty: 1,
        subTotal: 550,
        discount: 50,
        netTotal: 500,
        user: "Dr. Alex King",
        performer: "Pharmacist",
        prescriber: "Dr. John",
        remarks: "Medication Dispensed",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "30-Nov-2023",
        monthId: "NOV",
        type: "OnlineSales",
        receiptNo: "BL7",
        billingType: "Outpatient",
        visitType: "New",
        hospitalNo: "2311000007",
        patientName: "Patricia Davis",
        department: "Lab",
        item: "Blood Test",
        price: 750,
        qty: 1,
        subTotal: 750,
        discount: 100,
        netTotal: 650,
        user: "Mr. admin admin",
        performer: "Lab Technician",
        prescriber: "Dr. Alex",
        remarks: "Routine Blood Test",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "01-Dec-2023",
        monthId: "DEC",
        type: "CashSales",
        receiptNo: "BL8",
        billingType: "Inpatient",
        visitType: "Emergency",
        hospitalNo: "2311000008",
        patientName: "Michael Miller",
        department: "General",
        item: "Consultation",
        price: 900,
        qty: 1,
        subTotal: 900,
        discount: 0,
        netTotal: 900,
        user: "Ms. Jane Doe",
        performer: "Dr. Smith",
        prescriber: "Dr. John",
        remarks: "Emergency Consultation",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "02-Dec-2023",
        monthId: "DEC",
        type: "CardSales",
        receiptNo: "BL9",
        billingType: "Outpatient",
        visitType: "New",
        hospitalNo: "2311000009",
        patientName: "Barbara Wilson",
        department: "Consultation",
        item: "Checkup",
        price: 850,
        qty: 1,
        subTotal: 850,
        discount: 50,
        netTotal: 800,
        user: "Dr. Alex King",
        performer: "Dr. Alex King",
        prescriber: "Dr. Alex King",
        remarks: "Follow-up Checkup",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      },
      {
        date: "03-Dec-2023",
        monthId: "DEC",
        type: "OnlineSales",
        receiptNo: "BL10",
        billingType: "Inpatient",
        visitType: "Emergency",
        hospitalNo: "2311000010",
        patientName: "Richard Moore",
        department: "Surgery",
        item: "Major Surgery",
        price: 1000,
        qty: 1,
        subTotal: 1000,
        discount: 100,
        netTotal: 900,
        user: "Mr. admin admin",
        performer: "Dr. Thomas",
        prescriber: "Dr. Emma",
        remarks: "Major Surgery",
        referenceReceiptNo: "NA",
        scheme: "General",
        isInsurance: "NO",
      }
  
    
  
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Total items bill Report</h3>
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
          {/* <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button> */}
          <div className="user-collection-report-user-filter">
          <label htmlFor="user-checkbox">IsInsurance  :</label>
  <input type="checkbox" id="user-checkbox" />
  {/* <button className="user-collection-report-show-btn" >Advance Filter</button> */}

</div>

        </div>
      </div>
      <div className='user-collection-repor-advance-filter'>
      
        <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
       
       
        <button className="user-collection-report-show-btn" >Advance Filter</button>

       
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
                "Date",
                "MonthID",
                "Receipt No",
                "BillingType",
                "VisitType",
                "Hospital No",
                "Patient Name",
                "Department",
                "Item",
                "Price",
                "Qty",
                "SubTotal",
                "Discount",
                "Total",
                "User Name",
                "Performer",
                "Prescriber",
                "Remark",
                "ReferenceReceiptNo",
                "Scheme",
                "IsInsurance"
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
        <td>{row.receiptNo}</td>
        <td>{row.billingType}</td>
        <td>{row.visitType}</td>
        <td>{row.hospitalNo}</td>
        <td>{row.patientName}</td>
        <td>{row.department}</td>
        <td>{row.item}</td>
        <td>{row.price}</td>
        <td>{row.qty}</td>
        <td>{row.subTotal}</td>
        <td>{row.discount}</td>
        <td>{row.netTotal}</td>
        <td>{row.user}</td>
        <td>{row.performer}</td>
        <td>{row.prescriber}</td>
        <td>{row.remarks}</td>
        <td>{row.referenceReceiptNo || 'NA'}</td> {/* Adding ReferenceReceiptNo */}
        <td>{row.scheme || 'General'}</td>        {/* Adding Scheme */}
        <td>{row.isInsurance ? 'YES' : 'NO'}</td> {/* Adding IsInsurance */}
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
          <div className='net-cash-collection-header'>
          <h4 className="user-collection-report-net-collection">Summary</h4>
          <div className="user-collection-report-summary">
 
  <table className="user-collection-report-summary-table">
  <tbody>
    <tr>
      <td>1</td>
      <td>Cash Sales</td>
      <td>562,700.00</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Credit Sales</td>
      <td>57,200.00</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Gross Sales (A+B)</td>
      <td>619,900.00</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Cash Discount</td>
      <td>3,145.00</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Credit Discount</td>
      <td>11,360.00</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Total Discount (D+E)</td>
      <td>14,505.00</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Return Cash Sales</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Return Credit Sales</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Total Sales Return (G+H)</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Return Cash Discount</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Return Credit Discount</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Total Return Discount (J+K)</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>13</td>
      <td>Net Sales (C-F-I+L)</td>
      <td>605,395.00</td>
    </tr>
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
