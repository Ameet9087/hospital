// DetailStockLeadger.js
import React, { useState } from "react";
import "./DetailStockLeadger.css";

const DetailStockLeadger = () => {
  const [fromDate, setFromDate] = useState("22-08-2024");
  const [toDate, setToDate] = useState("22-08-2024");
  const [subStore, setSubStore] = useState("All Store");
  const [subCategory, setSubCategory] = useState("All SubCategory");
  const [item, setItem] = useState("All Item");

  const handleShowReport = () => {
    // Implement logic to fetch and display report data
  };

  return (
    <div className="DetailStockLeadger-container">
      <h1>Detail Stock Ledger</h1>
      <div className="DetailStockLeadger-report-options">
        <div className="DetailStockLeadger-date-range">
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
        <div className="DetailStockLeadger-substore-selection">
          <label htmlFor="substore-select">SubStore:</label>
          <select
            id="substore-select"
            value={subStore}
            onChange={(e) => setSubStore(e.target.value)}
          >
            <option value="All Store">All Store</option>
            {/* Add more substore options as needed */}
          </select>
        </div>
        <div className="DetailStockLeadger-subcategory-selection">
          <label htmlFor="subcategory-select">SubCategory:</label>
          <select
            id="subcategory-select"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="All SubCategory">All SubCategory</option>
            {/* Add more subcategory options as needed */}
          </select>
        </div>
        <div className="DetailStockLeadger-item-selection">
          <label htmlFor="item-select">Item:</label>
          <select
            id="item-select"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          >
            <option value="All Item">All Item</option>
            {/* Add more item options as needed */}
          </select>
        </div>
        <button
          className="DetailStockLeadger-show-report-btn"
          onClick={handleShowReport}
        >
          Show Report
        </button>
      </div>
      <div className="DetailStockLeadger-report-table">
        <table>
          <thead>
            <tr>
              <th>S.N</th>
              <th>Category Name</th>
              <th>Sub Category Name</th>
              <th>Item Name</th>
              <th>U...</th>
              <th>Dispatched...</th>
              <th>Consumed...</th>
              <th>CostPrice</th>
              <th>Dispatched...</th>
              <th>Consumed...</th>
              <th>TotalAmou...</th>
              <th>SubStore</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>{/* Populate table rows with data */}</tbody>
        </table>
      </div>
      <div className="DetailStockLeadger-pagination">
        <button className="DetailStockLeadger-pagination-btn">First</button>
        <button className="DetailStockLeadger-pagination-btn">Previous</button>
        <span>Page 0 of 0</span>
        <button className="DetailStockLeadger-pagination-btn">Next</button>
        <button className="DetailStockLeadger-pagination-btn">Last</button>
      </div>
      <div className="DetailStockLeadger-report-actions">
        <button className="DetailStockLeadger-export-btn">Export</button>
        <button className="DetailStockLeadger-print-btn">Print</button>
      </div>
    </div>
  );
};

export default DetailStockLeadger;
