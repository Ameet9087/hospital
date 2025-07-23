import React from 'react';
import './CapitalStockLedger.css';

const CapitalStockLedger = () => {
  return (
    <div className="capii-suppp-container">
      
      <div className="capii-suppp-content">
        <h2 className="capii-suppp-title">
          <i className="capii-suppp-icon">&#128202;</i> Capital Stock Ledger
        </h2>
        <div className="capii-suppp-filters">
          <select className="capii-suppp-select">
            <option>2024</option>
          </select>
          <div className="capii-suppp-date-range">
            <label>From:</label>
            <input type="date" value="2024-08-23" className="capii-suppp-date-input" />
          </div>
          <div className="capii-suppp-date-range">
            <label>To:</label>
            <input type="date" value="2024-08-23" className="capii-suppp-date-input" />
          </div>
          <div className="capii-suppp-item-select">
            <label>Item Name <span className="capii-suppp-required">*</span></label>
            <select className="capii-suppp-select">
              <option>Select ItemNam</option>
            </select>
          </div>
          <button className="capii-suppp-button">Show Report</button>
        </div>
      </div>
    </div>
  );
};

export default CapitalStockLedger;
