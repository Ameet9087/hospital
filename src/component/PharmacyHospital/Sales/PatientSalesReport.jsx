/* Mohini_PatientSalesReport_WholePage_14/sep/2024 */
import React, { useState } from 'react';
import './PatientSalesReport.css';

function PatientSalesReport() {
  const [fromDate, setFromDate] = useState('23-08-2024');
  const [toDate, setToDate] = useState('23-08-2024');
  const [patientName, setPatientName] = useState('');
  const [store, setStore] = useState('All');
  const [counter, setCounter] = useState('All');
  const [user, setUser] = useState('All');

  return (
    <div className="patient-sales-report-container">
      <h2> ⚛ Patient-wise Sales Detail Report</h2>
      <div className="patient-sales-report-report-controls">
        <div className="patient-sales-report-date-range">
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
          {/* <button className="patient-sales-report-star-btn">⭐</button>
          <button className="patient-sales-report-minus-btn">-</button> */}
        </div>
        
        <div className="patient-sales-report-filters">
          <label>
            Patient Name *:
            <input 
              type="text" 
              placeholder="-- Search Patient --"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </label>
          <label>
            Select Store:
            <select value={store} onChange={(e) => setStore(e.target.value)}>
              <option value="All">All</option>
            </select>
          </label>
        </div>
        <div className="patient-sales-report-filters">
          <label>
            Counter:
            <select value={counter} onChange={(e) => setCounter(e.target.value)}>
              <option value="All">All</option>
            </select>
          </label>
          <label>
            User:
            <input 
              type="text" 
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>
        </div>
        <button className="patient-sales-report-show-report-btn">Show Report</button>
        <select className="patient-sales-report-more-columns">
          <option>Select More Column</option>
        </select>
      </div>

      <div className="patient-sales-report-summary">
        <h3 className='patient-summary-report'>Summary</h3>
        <div className="patient-sales-report-summary-content">
          <div>
            <span>Total Sales Value</span>
            <span className="patient-sales-report-value">0</span>
          </div>
          <div>
            <span>Total Sales Refund</span>
            <span className="patient-sales-report-value">0</span>
          </div>
          <div>
            <span>Total Net Sales</span>
            <span className="patient-sales-report-value">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientSalesReport;
/* Mohini_PatientSalesReport_WholePage_14/sep/2024 */
