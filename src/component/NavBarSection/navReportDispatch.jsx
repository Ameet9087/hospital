import React from 'react';
import "../NavBarSection/navReportDispatch.css"

function NavReportDispatch() {
  return (
    <div className="labReportDispatch">
      <h5>Report Dispatch</h5>
      <div className="labReportDispatch-filters">
      <div className="labReportDispatch-Request">
          Request Date:
           </div>
       
        <div className="labReportDispatch-controls">
        {/* Your date range and button controls */}
          <div className="labReportDispatch-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
            <button className="labReportDispatch-star-button">☆</button>
          <button className="labReportDispatch-more-btn">-</button>
            <button className="labReportDispatch-ok-button">OK</button>
          </div>
      </div>
        <div className="labReportDispatch-category-select">
          <label>Category:</label>
          <select>
            <option>--Select Lab Category--</option>
            <option value="">Sellect All</option>
            <option value="">Search</option>
            <option value="">Biochemistry</option>
            <option value="">Hematology</option>
            <option value="">Microbiology</option>
            <option value="">Parasitology</option>
            <option value="">Serology</option>
            <option value="">Immunoassay</option>
            <option value="">DEFAULT</option>
            <option value="">HISTOCYTOLOGY</option>
            <option value="">OUT SOURCE</option>
            <option value="">MOLECULAR BIOCHEMISTRY</option>
            <option value="">PATHOLOGY</option>
            <option value="">TUMOR MARKER</option>
            <option value="">VIROLOGY</option>
            <option value="">Blood Transfusion</option>
          </select>
        </div>
        <button className="labReportDispatch-load-btn">Load <i className="fa-solid fa-rotate"></i></button>
      </div>
      <div className="labReportDispatch-search-bar">
      <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search by Hospital No. Or Patient Name" />
        {/* <button className="labReportDispatch-search-btn">🔍</button> */}
      </div>
      <table className="labReportDispatch-patient-table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Hospital No.</th>
            <th>Patient Name</th>
            <th>Age/Sex</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows would be populated here */}
        </tbody>
      </table>
      <div className="labReportDispatch-pagination">
        <button>« Previous</button>
        <button>Next »</button>
      </div>
    </div>
  );
}

export default NavReportDispatch
;