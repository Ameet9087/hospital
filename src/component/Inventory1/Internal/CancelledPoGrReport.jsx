import React from 'react';
import './PurchaseOrderReport.css';

const CancelledPoGrReport = () => {
  return (
    <div className="purchase-order-report">
      <h2 className="purchase-order-report-title">❌ Cancelled PO and GR Report</h2>
      <div className="purchase-order-filters">
        <div className="purchase-order-date-range">
          <label>From: <input type="date" /></label>
          <label>To: <input type="date" /></label>
        </div>
        
       
        <div className="purchase-order-radio-buttons">
          <input type="checkbox" name="category" value="all" checked /> Cancelled GR
          <input type="checkbox" name="category" value="consumables" /> Cancelled PO
        </div>
        <button className="purchase-order-report-btn">Report</button>
      </div>

      
    </div>
  );
};

export default CancelledPoGrReport;
