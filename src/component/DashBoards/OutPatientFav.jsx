import React from 'react';
import './OutPatientFav.css';

const OutPatientFav = () => {
  return (
    <div className="out-patient-list">
      <div className="out-patient-search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
        <span className="out-patient-results">Showing 0 / 0 results</span>
        <button className="out-patient-print">Print</button>
      </div>

      <table className='out-patient-table'> 
        <thead>
          <tr>
            <th>Hospital No</th>
            <th>Name</th>
            <th>Age/Sex</th>
            <th>VisitType</th>
            <th>Visit Date</th>
            <th>Performer Na...</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="out-patient-no-data">
            <td  className="out-patient-col-span" colSpan="7">No Rows To Show</td>
          </tr>
        </tbody>
      </table>

      {/* <div className="pagination">
        <span>0 to 0 of 0</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 0 of 0</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}
    </div>
  );
};

export default OutPatientFav;