import React from "react";
import "./ReturnToSupplier.css";

function ReturnToSupplierReport() {
  return (
    <div className="Return-to-supplier-return-to-supplier-report supp">
      <h2 className="Return-to-supplier-report-title supp">
        Return To Supplier Report
      </h2>
      <div className="Return-to-supplier-date-range supp">
        <label>
          From: <input type="date" value="2024-08-14" />
        </label>
        <label>
          To: <input type="date" value="2024-08-21" />
        </label>
        <button className="Return-to-supplier-star-button supp">☆</button>
        <button className="Return-to-supplier-minus-button supp">-</button>
      </div>

      <div className="Return-to-supplier-filter-section supp">
        <div className="Return-to-supplier-filter-item supp">
          <label>Vendor Name*:</label>
          <select>
            <option>Select Vendor Name</option>
          </select>
        </div>
        <div className="Return-to-supplier-filter-item supp">
          <label>Item Name*:</label>
          <select>
            <option>Select Item Name</option>
          </select>
        </div>
        <div className="Return-to-supplier-filter-item supp">
          <label>Batch Number:</label>
          <input type="text" placeholder="Enter Batch No" />
        </div>
        <div className="Return-to-supplier-filter-item supp">
          <label>Good Receipt Number:</label>
          <input type="text" placeholder="Enter Good Receipt No" />
        </div>
        <div className="Return-to-supplier-filter-item supp">
          <label>Credit Note Number:</label>
          <input type="text" placeholder="Enter Credit Note No" />
        </div>
        <button className="Return-to-supplier-load-button supp">Load</button>
      </div>

      <div className="Return-to-supplier-search-bar supp">
        <input type="text" placeholder="Search" />
        <button className="Return-To-Supplier">🔍</button>
      </div>

      <div className="Return-to-supplier-results-info supp">
        <span>Showing 0 / 0 results</span>
        <button className="Return-to-supplier-export-button supp">
          Export
        </button>
        <button className="Return-to-supplier-print-button supp">Print</button>
      </div>

      <table className="Return-to-supplier-results-table supp">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Vendor Name</th>
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
            <td colSpan="13" className="Return-to-supplier-no-results supp">
              No Rows To Show
            </td>
          </tr>
        </tbody>
      </table>

      <div className="Return-to-supplier-pagination supp">
        <span>0 to 0 of 0</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 0 of 0</span>
        <button>Next</button>
        <button>Last</button>
      </div>
    </div>
  );
}

export default ReturnToSupplierReport;
