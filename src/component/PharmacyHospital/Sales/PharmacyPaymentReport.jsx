/* Mohini_PharmacyPaymentReport_WholePage_14/sep/2024 */
import React, { useState } from 'react';
import './PharmacyPaymentReport.css';

function PharmacyPaymentReport() {
  const [fromDate, setFromDate] = useState('23-08-2024');
  const [toDate, setToDate] = useState('23-08-2024');
  const [paymentMode, setPaymentMode] = useState('All');
  const [type, setType] = useState('All');
  const [user, setUser] = useState('');
  const [dispensary, setDispensary] = useState('');

  return (
    <div className="pharmacy-payment-report-container">
      <h2> ⚛ Pharmacy PaymentMode Wise Report</h2>
      <div className="pharmacy-payment-report-controls">
        <div className="pharmacy-payment-date-range">
          <label>
            From:
            <input 
              type="date" 
              value={fromDate} 
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input 
              type="date" 
              value={toDate} 
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          {/* <button className="pharmacy-payment-star-btn">⭐</button>
          <button className="pharmacy-payment-minus-btn">-</button> */}
        </div>
        <button className="pharmacy-payment-show-report-btn">Show Report</button>
      </div>
      <div className="pharmacy-payment-filters">
        <div className="pharmacy-payment-filter-group">
          <label>PaymentMode:</label>
          <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
            <option value="All">All</option>
          </select>
        </div>
        <div className="pharmacy-payment-filter-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="All">All</option>
          </select>
        </div>
        <div className="pharmacy-payment-filter-group">
          <label>User:</label>
          <input 
            type="text" 
            placeholder="Enter User Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="pharmacy-payment-filter-group">
          <label>Dispensary:</label>
          <input 
            type="text" 
            placeholder="Enter Dispensary Name"
            value={dispensary}
            onChange={(e) => setDispensary(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default PharmacyPaymentReport;
/* Mohini_PharmacyPaymentReport_WholePage_14/sep/2024 */
