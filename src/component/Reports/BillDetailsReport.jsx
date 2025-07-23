import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

import './UserCollectionReport.css';

const BillDetailsReport = () => {
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
 
  
  ];

  const handleShowReport = () => {
    setShowReport(true);
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title"> ⚛ Bill Detail Report</h3>
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
    <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>Billing Type:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>Service Department:</label>
 <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>        </div>
      </div>

        </div>
      </div>
      <div className='user-collection-repor-advance-filter'>
      
      <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>Item Name:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>Rank:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>        </div>
      </div>

      <div className='user-collection-report-counter'>
        <div className="user-collection-report-counter-filter">
          <label>MembershipType:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="user-collection-report-user-filter">
          <label>User:</label>
          <select>
            <option value="All">All</option>
            {/* Add more options as needed */}
          </select>        </div>
      </div>

      
        <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
       
       
        {/* <button className="user-collection-report-show-btn" >Advance Filter</button> */}

       
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
      
      {/* Print and Export Buttons */}
      <div className="user-collection-page-results-info">
          Showing 334/334 results
        </div>

      <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
      <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
     
    </div>
<div className='user-collection-report-tab'>
<div className="table-scroll-container">
<table className="user-collection-report-table">
  <thead>
    <tr>
      <th>Date</th>
    
      <th>Receipt No</th>
      <th>BillingType</th>
      <th>VisitType</th>
      <th>Hospital No</th>
      <th>Patient Name</th>
      <th>Department</th>
      <th>Item</th>
      <th>Rank</th>
      <th>Membership</th>
      <th>Price</th>
      <th>SubTotal</th>
      <th>Discount</th>
      <th>Total</th>
      <th>User Name</th>
      <th>Performer</th>
      <th>Prescriber</th>
      <th>Remarks</th>
      <th>ReferenceReceiptNo?</th>
    </tr>
  </thead>
  <tbody>
    {reportsData.map((row, index) => (
      <tr key={index}>
       <td>{row.date}</td>
                      <td>{row.receiptNo}</td>
                      <td>{row.billingType}</td>
                      <td>{row.visitType}</td>
                      <td>{row.hospitalNo}</td>
                      <td>{row.patientName}</td>
                      <td>{row.department}</td>
                      <td>{row.item}</td>
                      <td>{row.rank}</td>
                      <td>{row.membership}</td>
                      <td>{row.price}</td>
                      <td>{row.subTotal}</td>
                      <td>{row.discount}</td>
                      <td>{row.total}</td>
                      <td>{row.userName}</td>
                      <td>{row.performer}</td>
                      <td>{row.prescriber}</td>
                      <td>{row.remarks}</td>
                      <td>{row.referenceReceiptNo || 'NA'}</td>
      </tr>
    ))}
  </tbody>
  <tbody>
          <tr>
            <td colSpan="19" className="user-name-no-row">No Rows To Show</td>
          </tr>
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

export default BillDetailsReport;
