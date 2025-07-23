import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';

const DoctorWiseIncomeSummary = () => {
  const [showReport, setShowReport] = useState(false);


  
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
      date: "12-Jun-2024",
      monthId: "JUN",
      type: "CardSales",
      receiptNo: "BL8", // Assuming receipt numbers
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
      performer: "Dr. Smith", // Assuming performer details
      prescriber: "Dr. John", // Assuming prescriber details
      remarks: "USG Chest Exam",
      referenceReceiptNo: "NA",
      scheme: "General",
      isInsurance: "NO",
      billEntryDate: "2024-06-12T22:00:00Z", // ISO format
      cancelledDate: "2024-06-09T01:00:00Z", // ISO format
      cancelledBy: "Mr. admin admin",
      cancelRemarks: "sdf",
    },
    {
      date: "08-Jun-2024",
      monthId: "JUN",
      type: "CashSales",
      receiptNo: "BL9", // Assuming receipt numbers
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
      user: "Ms. Jane Doe", // Assuming user details
      performer: "Dr. Alex", // Assuming performer details
      prescriber: "Dr. King", // Assuming prescriber details
      remarks: "Fasting Blood Sugar Test",
      referenceReceiptNo: "NA",
      scheme: "General",
      isInsurance: "NO",
      billEntryDate: "2024-06-08T12:00:00Z", // ISO format
      cancelledDate: "M.. 2024-06-09T01:00:00Z", // ISO format
      cancelledBy: "Mr. admin admin",
      cancelRemarks: "ttdtfggh",
    },
  ];
  

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ DOCTORWISE INCOME SUMMARY (OP + IP) REPORT</h3>
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
    <div className='user-collection-repor-advance-filter'>
    <label for="Doctor" className='DoctorNameClass'>Doctor Name:</label>

<select name="Doctor" id="Doctor">
<option>----Select-----</option>
<option >Dr. Shrinivas Shelar</option>
<option >Dr. Arnav Pawar</option>
<option >Dr. Aarya Desai</option>
<option >Dr. Meera Sawant</option>
</select>
      <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
  
     
    </div>

          {/* <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button> */}
          <div className="user-collection-report-user-filter">
          {/* <label htmlFor="user-checkbox">IsInsurance  :</label>
  <input type="checkbox" id="user-checkbox" /> */}
  {/* <button className="user-collection-report-show-btn" >Advance Filter</button> */}

</div>

        </div>
      </div>
     
      

      
      
     
   
 
         

    </div>
  );
};

export default DoctorWiseIncomeSummary;
