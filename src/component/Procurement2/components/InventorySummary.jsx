import React, { useState } from 'react';
import './InventorySummary.css';

const InventorySummaryReport = () => {
  const [fromDate, setFromDate] = useState('22-08-2024');
  const [toDate, setToDate] = useState('22-08-2024');
  const [store, setStore] = useState('All');

  const handleLoadReport = () => {
    // Implement logic to fetch and display report data
  };

  return (
    <div className="InventorySummaryReport-container">
      <h1 className="InventorySummaryReport-title">Inventory Summary Report</h1>
      <div className="InventorySummaryReport-options">
        <div className="InventorySummaryReport-date-range">
          <label htmlFor="from-date">From:</label>
          <input
            type="text"
            id="from-date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="InventorySummaryReport-input"
          />
          <label htmlFor="to-date">To:</label>
          <input
            type="text"
            id="to-date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="InventorySummaryReport-input"
          />
        </div>
        <div className="InventorySummaryReport-store-selection">
          <label htmlFor="store-select">Store:</label>
          <select
            id="store-select"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            className="InventorySummaryReport-select"
          >
            <option value="All">All</option>
            {/* Add more store options as needed */}
          </select>
        </div>
        <button 
          className="InventorySummaryReport-load-btn"
          onClick={handleLoadReport}
        >
          Load
        </button>
      </div>
      <div className="InventorySummaryReport-summary">
        <table className="InventorySummaryReport-table">
          <tbody>
            <tr>
              <td className="InventorySummaryReport-label">Opening Value</td>
              <td className="InventorySummaryReport-value">0</td>
            </tr>
            <tr>
              <td className="InventorySummaryReport-label">Purchase Value</td>
              <td className="InventorySummaryReport-value">0</td>
            </tr>
            {/* Add more summary rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventorySummaryReport;
