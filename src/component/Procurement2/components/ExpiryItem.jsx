import React, { useState } from "react";
import "./DetailStockLeadger.css";

const ExpiryItem = () => {
  const [fromDate, setFromDate] = useState("22-08-2024");
  const [toDate, setToDate] = useState("22-08-2024");
  const [subStore, setSubStore] = useState("All Store");
  const [subCategory, setSubCategory] = useState("All SubCategory");
  const [item, setItem] = useState("All Item");

  const handleShowReport = () => {
    // Implement logic to fetch and display report data
  };

  return (
    <div className="ExpiryItem-substore-dispatch-and-consumption-report">
      <h1>Expiry Item Report</h1>

      <div className="ExpiryItem-report-options">
        <div className="ExpiryItem-date-range">
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
        <div className="ExpiryItem-substore-selection">
          <label htmlFor="substore-select">SubStore:</label>
          <select
            id="substore-select"
            value={subStore}
            onChange={(e) => setSubStore(e.target.value)}
          >
            <option value="All Store">All Store</option>
          </select>
        </div>
        <div className="ExpiryItem-subcategory-selection">
          <label htmlFor="subcategory-select">SubCategory:</label>
          <select
            id="subcategory-select"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="All SubCategory">All SubCategory</option>
          </select>
        </div>
        <div className="ExpiryItem-item-selection">
          <label htmlFor="item-select">Item:</label>
          <select
            id="item-select"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          >
            <option value="All Item">All Item</option>
          </select>
        </div>
        <button
          className="ExpiryItem-show-report-btn"
          onClick={handleShowReport}
        >
          Show Report
        </button>
      </div>

      <div className="ExpiryItem-report-table">
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

      <div className="ExpiryItem-pagination">
        <button className="ExpiryItem-pagination-btn">First</button>
        <button className="ExpiryItem-pagination-btn">Previous</button>
        <span>Page 0 of 0</span>
        <button className="ExpiryItem-pagination-btn">Next</button>
        <button className="ExpiryItem-pagination-btn">Last</button>
      </div>
    </div>
  );
};

export default ExpiryItem;
