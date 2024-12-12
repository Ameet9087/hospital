import React, { useState } from "react";
import "./SummaryPurchase.css";

const PurchaseSummaryReport = () => {
  const [fromDate, setFromDate] = useState("14-08-2024");
  const [toDate, setToDate] = useState("21-08-2024");
  const [vendorName, setVendorName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="PurchaseSummaryReport-container PurchaseSummaryReport">
      <h1 className="PurchaseSummaryReport-header PurchaseSummaryReport">
        📊 Purchase Summary Report
      </h1>

      <div className="PurchaseSummaryReport-date-container PurchaseSummaryReport">
        <label>From:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="PurchaseSummaryReport-input PurchaseSummaryReport"
        />
        <label>To:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="PurchaseSummaryReport-input PurchaseSummaryReport"
        />
        <span>☆</span>
        <span>-</span>
        <label>Vendor:</label>
        <input
          type="text"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          placeholder="Vendor Name"
          className="PurchaseSummaryReport-input PurchaseSummaryReport"
        />
        <button className="PurchaseSummaryReport-button PurchaseSummaryReport-load-button PurchaseSummaryReport">
          🔍 Load
        </button>
      </div>

      <div className="PurchaseSummaryReport-search-container PurchaseSummaryReport">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="PurchaseSummaryReport-input PurchaseSummaryReport"
        />
        <span>Showing 0 / 0 results</span>
        <button className="PurchaseSummaryReport-button PurchaseSummaryReport">
          Export
        </button>
        <button className="PurchaseSummaryReport-button PurchaseSummaryReport">
          Print
        </button>
      </div>

      <table className="PurchaseSummaryReport-table PurchaseSummaryReport">
        <thead>
          <tr>
            <th>G...</th>
            <th>GR...</th>
            <th>Ven...</th>
            <th>Vendor Na...</th>
            <th>Vendor ...</th>
            <th>Bill No</th>
            <th>SubTotal</th>
            <th>Discount</th>
            <th>VAT</th>
            <th>Other ...</th>
            <th>Total A...</th>
            <th>Pay ...</th>
            <th>Remarks</th>
            <th>A...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan="14"
              className="PurchaseSummaryReport-no-rows PurchaseSummaryReport"
            >
              No Rows To Show
            </td>
          </tr>
        </tbody>
      </table>

      <div className="PurchaseSummaryReport-pagination PurchaseSummaryReport">
        <span>0 to 0 of 0</span>
        <button className="PurchaseSummaryReport-pagination-button PurchaseSummaryReport">
          First
        </button>
        <button className="PurchaseSummaryReport-pagination-button PurchaseSummaryReport">
          Previous
        </button>
        <span>Page 0 of 0</span>
        <button className="PurchaseSummaryReport-pagination-button PurchaseSummaryReport">
          Next
        </button>
        <button className="PurchaseSummaryReport-pagination-button PurchaseSummaryReport">
          Last
        </button>
      </div>

      <div className="PurchaseSummaryReport-summary PurchaseSummaryReport">
        <h2 className="PurchaseSummaryReport-summary-header PurchaseSummaryReport">
          Purchase Summary
        </h2>
        <table className="PurchaseSummaryReport-summary-table PurchaseSummaryReport">
          <thead>
            <tr>
              <th>Sub Total</th>
              <th>Discount</th>
              <th>VAT</th>
              <th>Other Charges</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>{/* Add summary data rows here */}</tbody>
        </table>
      </div>

      <button className="PurchaseSummaryReport-button PurchaseSummaryReport-print-button PurchaseSummaryReport">
        🖨 Print
      </button>
    </div>
  );
};

export default PurchaseSummaryReport;
