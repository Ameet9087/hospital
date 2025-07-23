import React, { useState } from "react";
import "./IssuedItemList.css";

const IssuedItemListReport = () => {
  const [fromDate, setFromDate] = useState("22-08-2024");
  const [toDate, setToDate] = useState("22-08-2024");
  const [subCategory, setSubCategory] = useState("Select SubCategory");
  const [substoreName, setSubstoreName] = useState("Select Substore Name");
  const [employeeName, setEmployeeName] = useState("Select Employee");
  const [itemName, setItemName] = useState("Select ItemName");

  const handleLoadReport = () => {
    // Implement logic to fetch and display report data
  };

  return (
    <div className="IssuedItemListReport-issued-item-list-report">
      <h1>Issued Item List Report</h1>
      <div className="IssuedItemListReport-report-options">
        <div className="IssuedItemListReport-date-range">
          <label htmlFor="from-date">From:</label>
          <input
            type="text"
            id="from-date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label htmlFor="to-date">To:</label>
          <input
            type="text"
            id="to-date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="IssuedItemListReport-subcategory-selection">
          <label htmlFor="subcategory-select">SubCategory:</label>
          <select
            id="subcategory-select"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Select SubCategory">Select SubCategory</option>
            {/* Add more subcategory options as needed */}
          </select>
        </div>
        <div className="IssuedItemListReport-substore-selection">
          <label htmlFor="substore-select">Substore Name:</label>
          <select
            id="substore-select"
            value={substoreName}
            onChange={(e) => setSubstoreName(e.target.value)}
          >
            <option value="Select Substore Name">Select Substore Name</option>
            {/* Add more substore options as needed */}
          </select>
        </div>
        <div className="IssuedItemListReport-employee-selection">
          <label htmlFor="employee-select">Employee Name:</label>
          <select
            id="employee-select"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          >
            <option value="Select Employee">Select Employee</option>
            {/* Add more employee options as needed */}
          </select>
        </div>
        <div className="IssuedItemListReport-item-selection">
          <label htmlFor="item-select">Item Name:</label>
          <select
            id="item-select"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          >
            <option value="Select ItemName">Select ItemName</option>
            {/* Add more item options as needed */}
          </select>
        </div>
        <button
          className="IssuedItemListReport-load-report-btn"
          onClick={handleLoadReport}
        >
          Load
        </button>
      </div>
      <div className="IssuedItemListReport-report-table">
        <table>
          <thead>
            <tr>
              <th>Ref. No. (Dispatch)</th>
              <th>Issued Date</th>
              <th>SubCategory</th>
              <th>Item Name</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Sub Store</th>
              <th>Employee</th>
            </tr>
          </thead>
          <tbody>{/* Populate table rows with data */}</tbody>
        </table>
      </div>
      <div className="IssuedItemListReport-pagination">
        <button className="IssuedItemListReport-pagination-btn">First</button>
        <button className="IssuedItemListReport-pagination-btn">
          Previous
        </button>
        <span>Page 0 of 0</span>
        <button className="IssuedItemListReport-pagination-btn">Next</button>
        <button className="IssuedItemListReport-pagination-btn">Last</button>
      </div>
      <div className="IssuedItemListReport-report-actions">
        <button className="IssuedItemListReport-export-btn">Export</button>
        <button className="IssuedItemListReport-print-btn">Print</button>
      </div>
    </div>
  );
};

export default IssuedItemListReport;
