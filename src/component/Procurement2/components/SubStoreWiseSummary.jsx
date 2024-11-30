import React from 'react';
import './SubStoreWiseSummary.css';

const SubstoreWiseSummary = () => {
  return (
    <div className="suppp-container">
      
      <div className="suppp-content">
        <h2 className="suppp-title">
          <span className="suppp-icon">✱</span> Substore Wise Stock Summary Report
        </h2>
        <div className="suppp-filters">
          <select className="suppp-select">
            <option>2024</option>
          </select>
          <div className="suppp-date-range">
            <label>From:</label>
            <input type="date" value="2024-08-23" className="suppp-date-input" />
          </div>
          <div className="suppp-date-range">
            <label>To:</label>
            <input type="date" value="2024-08-23" className="suppp-date-input" />
          </div>
          <button className="suppp-star-btn">☆</button>
          <div className="suppp-substore">
            <label>SubStore:</label>
            <select className="suppp-select">
              <option>All Store</option>
            </select>
          </div>
          <button className="suppp-show-report-btn">Show Report</button>
        </div>
        <div className="suppp-search-bar">
          <input type="text" placeholder="Search" className="suppp-search-input" />
          <div className="suppp-actions">
            <span className="suppp-results">Showing 0 / 0 results</span>
            <button className="suppp-export-btn">Export</button>
            <button className="suppp-print-btn">Print</button>
          </div>
        </div>
        <div className="suppp-table-container">
          <table className="suppp-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Sub Category Name</th>
                <th>Item Name</th>
                <th>Unit</th>
                <th>Opening Quantity</th>
                <th>Opening Value</th>
                <th>Dispatch Qty</th>
                <th>Dispatched Value </th>
                <th>Consumed Qty</th>
                <th>Consumed Value</th>
                <th>Closing Stock</th>
                <th>Closing Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="12" className="suppp-no-rows">No Rows To Show</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="suppp-pagination">
          <span>0 to 0 of 0</span>
          <button className="suppp-page-btn">First</button>
          <button className="suppp-page-btn">Previous</button>
          <span>Page 0 of 0</span>
          <button className="suppp-page-btn">Next</button>
          <button className="suppp-page-btn">Last</button>
        </div>
        <div className="suppp-summary">
          <h3>Summary</h3>
          <div className="suppp-summary-grid">
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Opening Value</span>
              <span className="suppp-summary-value">0</span>
            </div>
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Opening Quantity</span>
              <span className="suppp-summary-value">0</span>
            </div>
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Dispatch Value</span>
              <span className="suppp-summary-value">0</span>
            </div>
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Dispatch Quantity(Consumables)</span>
              <span className="suppp-summary-value">0</span>
            </div>
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Consumption Value</span>
              <span className="suppp-summary-value">0</span>
            </div>
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Consumption Quantity</span>
              <span className="suppp-summary-value">0</span>
            </div>
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Closing Value</span>
              <span className="suppp-summary-value">0</span>
            </div>
            <div className="suppp-summary-item">
              <span className="suppp-summary-label">Closing Quantity</span>
              <span className="suppp-summary-value">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstoreWiseSummary;
