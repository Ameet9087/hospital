import React from "react";
import "./PurchaseItem.css";

const UniquePurchaseReport = () => {
  return (
    <div className="unique-container">
      <div className="unique-header">
        <h3>Purchase Items Report</h3>
        <div className="unique-date-range">
          <select>
            <option value="2024">2024</option>
          </select>
          <input type="date" defaultValue="2024-08-20" />
          <input type="date" defaultValue="2024-08-20" />
          <button className="unique-star-button">⭐</button>
        </div>
        <div className="unique-search">
          <input type="text" placeholder="Select Item Name" />
          <button className="unique-load-button">Load</button>
        </div>
        <div className="unique-checkboxes">
          <label>
            <input type="checkbox" /> Consumables
          </label>
          <label>
            <input type="checkbox" /> Capital Goods
          </label>
        </div>
      </div>
      <table className="unique-table">
        <thead>
          <tr>
            <th>Gr Date</th>
            <th>Gr No</th>
            <th>Vendor Name</th>
            <th>Bill No.</th>
            <th>SubCategory Name</th>
            <th>Item Type</th>
            <th>Item Name</th>
            <th>Spec/Brand</th>
            <th>Total Qty</th>
            <th>Item Rate</th>
            <th>SubTotal</th>
            <th>Discount</th>
            <th>VAT Amt</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="14" className="unique-no-rows">
              No Rows To Show
            </td>
          </tr>
        </tbody>
      </table>
      <div className="unique-pagination">
        <span>0 to 0 of 0</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 0 of 0</span>
        <button>Next</button>
        <button>Last</button>
      </div>
      <div className="unique-summary">
        <span>Total Qty</span>
        <span>Sub Total</span>
        <span>Discount</span>
        <span>VAT</span>
        <span>Total Amount</span>
      </div>
      <button className="unique-print-button">Print</button>
    </div>
  );
};

export default UniquePurchaseReport;
