import React from "react";
import "./PurchaseReportOrder.css"; // Updated CSS file name to match the component

const Pur = () => {
  return (
    <div className="PurchaseReport-order">
      <h2>🛒 Purchase Order Report</h2>
      <div className="PurchaseReport-order-filters">
        <div className="PurchaseReport-order-date-range">
          <label>From:</label>
          <input type="date" defaultValue="2024-07-11" />
          <label>To:</label>
          <input type="date" defaultValue="2024-07-29" />
        
        </div>
        <div className="PurchaseReport-order-vendor-item-filters">
          <div>
            <label>Vendor Name:</label>
            <select>
              <option>Select Vendor Name</option>
            </select>
          </div>
          <div>
            <label>Item Name:</label>
            <select>
              <option>Select Item Name</option>
            </select>
          </div>
          <div>
            <label>Item Code:</label>
            <input type="text" placeholder="Enter Item Code" />
          </div>
        </div>
        <div className="PurchaseReport-order-item-subcategory-filters">
         
          <div>
            <label>Sub-Category:</label>
            <input type="text" placeholder="Enter Sub-Category" />
          </div>
     
        <div >
          <input type="radio" id="all" name="itemType" defaultChecked />
          <label htmlFor="all">All</label>
          <input type="radio" id="consumables" name="itemType" />
          <label htmlFor="consumables">Consumables</label>
          <input type="radio" id="capitalGoods" name="itemType" />
          <label htmlFor="capitalGoods">Capital Goods</label>
        </div>
        <div className="purchase-re-btn">
        <button className="PurchaseReport-order-report-button">
          🔍 Report
        </button>
        </div>
        </div>
       
        <div className="PurchaseReport-order-search-bar">
          <input type="text" placeholder="Search" />
        
        </div>
      
      
      </div>
      <div className="PurchaseReport-order-results">
        <div className="PurchaseReport-order-results-header">
          <span>Showing 0 / 0 results</span>
          <button className="PurchaseReport-order-export-button">
            ⤓ Export
          </button>
          <button className="PurchaseReport-order-print-button">Print</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>PO Number</th>
              <th>PO Date</th>
              <th>Vendor Name</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Quantity</th>
              <th>Standard Rate</th>
              <th>VAT</th>
              <th>Total Amount</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="12">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
      
      </div>
    </div>
  );
};

export default Pur;
