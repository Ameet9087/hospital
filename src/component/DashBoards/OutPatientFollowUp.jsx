import React from 'react';
import './OutPatientFav.css';

const OutPatientFollowUp = () => {
  return (
    <div className="OutPatientFollowUp-patient-list">
      <div className="OutPatientFollowUp-search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
        <span className="OutPatientFollowUp-results">Showing 0 / 0 results</span>
        <button className="OutPatientFollowUp-print">Print</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Hospital No.</th>
            <th>Name</th>
            <th>Age/Sex</th>
            <th>VisitType</th>
            <th>Visit Date</th>
            <th>Performer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="no-data">
            <td colSpan="7">No Rows To Show</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OutPatientFollowUp;
