import React from 'react';
import './ConsumableStockLedger.css';

const ConsumableStockLedger = () => {
  return (
    <div className="suppp-container">
      
      <div className="suppp-content">
        <h2 className="suppp-title">
          <i className="suppp-icon">&#128202;</i> Consumable Stock Ledger
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
          <div className="suppp-item-select">
            <label>Item Name <span className="suppp-required">*</span></label>
            <select className="suppp-select">
              <option>Select ItemNam</option>
            </select>
          </div>
          <button className="suppp-button">Show Report</button>
        </div>
      </div>
    </div>
  );
};

export default ConsumableStockLedger;