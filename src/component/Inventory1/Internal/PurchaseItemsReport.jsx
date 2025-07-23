import React from 'react';
import './PurchaseOrderReport.css';

const PurchaseItemsReport = () => {
  return (
    <div className="purchase-order-report">
      <h2 className="purchase-order-report-title">🛒 Purchase Items Report</h2>
      <div className="purchase-order-filters">
        <div className="purchase-order-date-range">
          <label>From: <input type="date" /></label>
          <label>To: <input type="date" /></label>
        </div>
        <div className="purchase-order-vendor-item-filters">
          <input type="text" placeholder="Select Item Name" />
        </div>
        
        
        <button className="purchase-order-report-btn">Report</button>
      </div>

      <div className="purchase-order-search-bar">
        <input type="text" placeholder="Search" />
        {/* <button className="purchase-order-search-icon">&#128269;</button> */}
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
              <th>Gr No</th>
              <th>Gr Date</th>
              <th>Vendor Name</th>
              <th>Bill No</th>
              <th>SubCategory Name</th>
              <th>Item Name</th>
              <th>Spec/Batch</th>
              <th>Total Qty</th>
              <th>Item Rate </th>
              <th>SubTotal </th>
              <th>DiscountAmt</th>
              <th>VAT Amt</th>
              <th>Total Amt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="14" className="purchase-order-no-rows">No Rows To Show</td>
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

export default PurchaseItemsReport;
