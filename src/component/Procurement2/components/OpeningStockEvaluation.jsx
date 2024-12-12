import React from "react";
import "./OpeningStockEvaluation.css";

const OpeningStockValuation = () => {
  return (
    <div className="OpeningStockValuation-container">
      <div className="OpeningStockValuation-content">
        <h2 className="OpeningStockValuation-title">
          <span className="OpeningStockValuation-icon">✱</span> Opening Stock
          Valuation Report
        </h2>
        <div className="OpeningStockValuation-filters">
          <div className="OpeningStockValuation-date-range">
            <label>Opening On Date:</label>
            <input
              type="date"
              value="2024-08-23"
              className="OpeningStockValuation-date-input"
            />
          </div>
          <select className="OpeningStockValuation-select">
            <option>Select StoreName</option>
          </select>
          <button className="OpeningStockValuation-show-report-btn">
            Show Report
          </button>
        </div>
        <div className="OpeningStockValuation-search-bar">
          <input
            type="text"
            placeholder="Search"
            className="OpeningStockValuation-search-input"
          />
          <div className="OpeningStockValuation-actions">
            <span className="OpeningStockValuation-results">
              Showing 0 / 0 results
            </span>
            <button className="OpeningStockValuation-export-btn">Export</button>
            <button className="OpeningStockValuation-print-btn">Print</button>
          </div>
        </div>
        <table className="OpeningStockValuation-table">
          <thead>
            <tr>
              <th>Inventory/SubStore.</th>
              <th>Purchase Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2" className="OpeningStockValuation-no-rows">
                No Rows To Show
              </td>
            </tr>
          </tbody>
        </table>
        <div className="OpeningStockValuation-pagination">
          <span>0 to 0 of 0</span>
          <button className="OpeningStockValuation-page-btn">First</button>
          <button className="OpeningStockValuation-page-btn">Previous</button>
          <span>Page 0 of 0</span>
          <button className="OpeningStockValuation-page-btn">Next</button>
          <button className="OpeningStockValuation-page-btn">Last</button>
        </div>
      </div>
    </div>
  );
};

export default OpeningStockValuation;
