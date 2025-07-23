import React from 'react';
import './PatientRecordPending.css';

const ConsultNotes = () => {
  return (
    <div className="consult-notes">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button className="search-button">🔍</button>
      </div>
      <div className="results-info">
        <span>Showing 2 / 2 results</span>
        <button className="print-button">Print</button>
      </div>
      <table className="notes-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>CreatedOn</th>
            <th>Note Type</th>
            <th>Template Type</th>
            <th>Written By</th>
            <th>Status</th>
            <th>Provider Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>S Suresh</td>
            <td>2024-08-13 16:40</td>
            <td>Consult Note</td>
            <td>Consult Note</td>
            <td>Mr. admin a...</td>
            <td><span className="status pending">Pending</span></td>
            <td>Mrs. BRENDA MWANIA W...</td>
            <td><button className="show-details-button">Show Details</button></td>
          </tr>
          <tr>
            <td>S Suresh</td>
            <td>2024-08-12 15:49</td>
            <td>Consult Note</td>
            <td>Consult Note</td>
            <td>Mr. admin a...</td>
            <td><span className="status pending">Pending</span></td>
            <td>Mrs. BRENDA MWANIA W...</td>
            <td><button className="show-details-button">Show Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ConsultNotes;
