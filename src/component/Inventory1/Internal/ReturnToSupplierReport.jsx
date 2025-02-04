import React from 'react';
import './PurchaseOrderReport.css';

const ReturnToSupplierReport = () => {
  return (
    <div className="purchase-order-report">
      <h2 className="purchase-order-report-title">🛒 Return To Supplier Report</h2>
      <div className="purchase-order-filters">
        <div className="purchase-order-date-range">
          <label>From: <input type="date" /></label>
          <label>To: <input type="date" /></label>
        </div>
        
      </div>
      <div className="purchase-order-vendor-item-filters">
          <label>Vendor Name: <input type="text" placeholder="Select Vendor Name" /></label>
          <label>Item Name: <input type="text" placeholder="Select Item Name" /></label>
          <label>Batch Number: <input type="text" placeholder="Select Batch Number" /></label>

        </div>
        <div className="purchase-order-additional-filters">
          <label>Good Receipt Number: <input type="text" placeholder="Enter Item Code" /></label>
          <label>Credit Note Number: <input type="text" placeholder="Enter Sub-Category" /></label>
          <button className="purchase-order-report-btn">Load</button>

        </div>
      
      <div className="purchase-order-search-bar">
        <input type="text" placeholder="Search" />
        <button className="purchase-order-search-icon">&#128269;</button>
      </div>
      <div className="purchase-order-pagination">
          <span>Showing 0 / 0 results</span>
          <button className="purchase-order-export-btn">Export</button>
          <button className="purchase-order-print-btn">Print</button>
        </div>
        <div className='purchase-order-ta'>
      <div className="purchase-order-table-container">
        <table className="purchase-order-report-table">
          <thead>
            <tr>
              <th> S.N</th>
              <th>Vendor Name</th>
              <th>Item Code</th>
              <th>Return Date</th>
              <th>Item Name</th>
              <th>Batch Number</th>
              <th>Goods Receipt Number</th>
              <th>Return Quantity</th>
              <th>Rate</th>
              <th>Discount</th>
              <th>VAT</th>
              <th>Total Amount</th>
              <th>Credit Note Number</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="16" className="purchase-order-no-rows">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
        
      </div>

      {/* <div className="purchase-order-pagination-controls">
        <button className="purchase-order-first-page">First</button>
        <button className="purchase-order-previous-page">Previous</button>
        <span>Page 0 of 0</span>
        <button className="purchase-order-next-page">Next</button>
        <button className="purchase-order-last-page">Last</button>
      </div> */}
      </div>
    </div>
  );
};

export default ReturnToSupplierReport;
