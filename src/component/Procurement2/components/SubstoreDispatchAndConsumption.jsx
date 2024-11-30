import React, { useState } from "react";
import "./SubstoreDispatchAndConsumption.css";

const SubstoreDispatchAndConsumptionReport = () => {
  const [fromDate, setFromDate] = useState("22-08-2024");
  const [toDate, setToDate] = useState("22-08-2024");
  const [subStore, setSubStore] = useState("All Store");
  const [subCategory, setSubCategory] = useState("All SubCategory");
  const [item, setItem] = useState("All Item");

  const handleShowReport = () => {
    // Logic to generate report
  };

  return (
    <div className="SubstoreDispatchAndConsumptionReport-container">
      <h1>Substore Dispatch And Consumption Report</h1>
      <div className="SubstoreDispatchAndConsumptionReport-options">
        <div className="SubstoreDispatchAndConsumptionReport-date-range">
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
        <div className="SubstoreDispatchAndConsumptionReport-substore-selection">
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
        <div className="SubstoreDispatchAndConsumptionReport-subcategory-selection">
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
        <div className="SubstoreDispatchAndConsumptionReport-item-selection">
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
          className="SubstoreDispatchAndConsumptionReport-show-report-btn"
          onClick={handleShowReport}
        >
          Show Report
        </button>
      </div>
      <div className="SubstoreDispatchAndConsumptionReport-table">
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
      <div className="SubstoreDispatchAndConsumptionReport-pagination">
        <button className="SubstoreDispatchAndConsumptionReport-pagination-btn">
          First
        </button>
        <button className="SubstoreDispatchAndConsumptionReport-pagination-btn">
          Previous
        </button>
        <span>Page 0 of 0</span>
        <button className="SubstoreDispatchAndConsumptionReport-pagination-btn">
          Next
        </button>
        <button className="SubstoreDispatchAndConsumptionReport-pagination-btn">
          Last
        </button>
      </div>
      <div className="SubstoreDispatchAndConsumptionReport-actions">
        <button className="SubstoreDispatchAndConsumptionReport-export-btn">
          Export
        </button>
        <button className="SubstoreDispatchAndConsumptionReport-print-btn">
          Print
        </button>
      </div>
    </div>
  );
};

export default SubstoreDispatchAndConsumptionReport;
