// PatientSearch.js
import React, { useState } from 'react';
import './SSFClaim.css';

const SSFClaim = () => {
  const [fromDate, setFromDate] = useState('15-05-2024');
  const [toDate, setToDate] = useState('08-08-2024');
  const [searchTerm, setSearchTerm] = useState('');
  const [patientType, setPatientType] = useState('Outpatient');

  return (
    <div className="patient-search">
      <div className="search-container">
        <div className="date-range">
          <label>From:</label>
          <input 
            type="date" 
            value={fromDate} 
            onChange={(e) => setFromDate(e.target.value)} 
            className="date-input"
          />
          <label>To:</label>
          <input 
            type="date" 
            value={toDate} 
            onChange={(e) => setToDate(e.target.value)} 
            className="date-input"
          />
          <button className="star-btn">☆</button>
          <button className="minus-btn">-</button>
        </div>
        <button className="load-data-btn">↻ Load Data</button>
      </div>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-btn">🔍</button>
      </div>
      
      <div className="patient-type-selector">
        <label>Patient Type:</label>
        <select 
          value={patientType} 
          onChange={(e) => setPatientType(e.target.value)}
          className="patient-type-select"
        >
          <option value="Outpatient">Outpatient</option>
          <option value="Inpatient">Inpatient</option>
        </select>
      </div>
    </div>
  );
};

export default SSFClaim;