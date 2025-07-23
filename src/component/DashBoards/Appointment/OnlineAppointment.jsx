// AppointmentList.js
import React, { useState } from 'react';
import './OnlineAppointment.css';

const OnlineAppointment = () => {
  
  const [activeTab, setActiveTab] = useState('Initiated');
  

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Initiated':
        return <InitiatedAppointments />;
      case 'Completed':
        return <CompletedAppointments />;
      default:
        return null;
    }
  };

  return (
    <div className="appointment-list">
      <div className="tab-header">
        <div 
          className={`tab ${activeTab === 'Initiated' ? 'active' : ''}`}
          onClick={() => setActiveTab('Initiated')}
        >
          Initiated Appointment
        </div>
        <div 
          className={`tab ${activeTab === 'Completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('Completed')}
        >
          Completed Appointment
        </div>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

  
  

   const InitiatedAppointments = () => {
      const [fromDate, setFromDate] = useState('08-08-2024');
      const [toDate, setToDate] = useState('08-08-2024');
      const [paymentStatus, setPaymentStatus] = useState('All');
      const [department, setDepartment] = useState('');
      const [doctor, setDoctor] = useState('');
      const [searchTerm, setSearchTerm] = useState('');




      return (
      <>
      <div className="filters">
        <div className="date-range">
          <label>From:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>To:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button className="star-btn">☆</button>
          <button className="minus-btn">-</button>
        </div>
        <div className="filter-row">
          <div className="filter-item">
            <label>Payment Status:</label>
            <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
              <option value="All">All</option>
              {/* Add other options here */}
            </select>
          </div>
          <div className="filter-item">
            <label>Department:</label>
            <input type="text" placeholder="Department Name" value={department} onChange={(e) => setDepartment(e.target.value)} />
          </div>
          <div className="filter-item">
            <label>Doctor:</label>
            <input type="text" placeholder="Doctor's Name" value={doctor} onChange={(e) => setDoctor(e.target.value)} />
          </div>
        </div>
      </div>
      <button className="reload-btn">↻ Reload Data</button>
      <div className="search-bar">
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="search-btn">🔍</button>
      </div>
      <div className="results-actions">
        <span>Showing results</span>
        <button className="export-btn">Export</button>
        <button className="print-btn">Print</button>
      </div>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date/Time</th>
            <th>Patient Name</th>
            <th>Age/Gender</th>
            <th>Phone N...</th>
            <th>Address</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Payment St...</th>
            <th>Payment M...</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="11" className="loading">Loading...</td>
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <span>0 to 0 of 0</span>
        <button className="page-btn">First</button>
        <button className="page-btn">Previous</button>
        <span>Page 0 of 0</span>
        <button className="page-btn">Next</button>
        <button className="page-btn">Last</button>
      </div>
    
    </>
  );
};


const CompletedAppointments = () => {
      const [fromDate, setFromDate] = useState('08-08-2024');
      const [toDate, setToDate] = useState('08-08-2024');
      const [paymentStatus, setPaymentStatus] = useState('All');
      const [department, setDepartment] = useState('');
      const [doctor, setDoctor] = useState('');
      const [searchTerm, setSearchTerm] = useState('');




      return (
      <>
      <div className="filters">
        <div className="date-range">
          <label>From:</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>To:</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button className="star-btn">☆</button>
          <button className="minus-btn">-</button>
        </div>
        
      </div>
      <button className="reload-btn">↻ Reload Data</button>
      <div className="search-bar">
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="search-btn">🔍</button>
      </div>
      <div className="results-actions">
        <span>Showing results</span>
        <button className="export-btn">Export</button>
        <button className="print-btn">Print</button>
      </div>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date/Time</th>
            <th>Patient Name</th>
            <th>Age/Gender</th>
            <th>Phone N...</th>
            <th>Address</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Payment St...</th>
            <th>Payment M...</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="11" className="loading">Loading...</td>
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <span>0 to 0 of 0</span>
        <button className="page-btn">First</button>
        <button className="page-btn">Previous</button>
        <span>Page 0 of 0</span>
        <button className="page-btn">Next</button>
        <button className="page-btn">Last</button>
      </div>
    
    </>
  );
};

export default OnlineAppointment;