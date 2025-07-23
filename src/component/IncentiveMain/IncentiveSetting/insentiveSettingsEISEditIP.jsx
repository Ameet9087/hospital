import React from 'react';
import "../IncentiveSetting/insentiveSettingsEISEditIP.css"

function InsentiveSettingsEISEditIP() {
  return (
    <div className="insentiveSettingsEISEditIP-container">
      <header className="insentiveSettingsEISEditIP-header">
        <span>Employee INCENTIVE setup for:</span> <strong className="insentiveSettingsEISEditIP-doctor-name">Dr. Ajhar Tamboli</strong>
        {/* <span className="insentiveSettingsEISEditIP-tds-info">TDS : 5 %</span> */}
      </header>
      <div className="insentiveSettingsEISEditIP-form">
          {/* <label htmlFor="">PriceCategory: </label>
        <select className="insentiveSettingsEISEditIP-price-category">
          <option value="">--select PriceCategory--</option> */}
          {/* Add more options here */}
        {/* </select> */}
        <div className="insentiveSettingsEISEditIP-form-row">
          <input type="text" placeholder="Enter Department" className="insentiveSettingsEISEditIP-input-field" />
          <input type="text" placeholder="Enter Item Name" className="insentiveSettingsEISEditIP-input-field" />
          <input type="number" className="insentiveSettingsEISEditIP-input-field" value="0" readOnly />
          <input type="number" className="insentiveSettingsEISEditIP-input-field" value="0" readOnly />
          <input type="number" className="insentiveSettingsEISEditIP-input-field" value="0" readOnly />
          <input type="number" className="insentiveSettingsEISEditIP-input-field" value="0" readOnly />
          <button className="insentiveSettingsEISEditIP-save-btn"> <i class="fa-regular fa-floppy-disk"></i> Save</button>
          <button className="insentiveSettingsEISEditIP-discard-btn">Discard</button>
        </div>
      </div>

      <div className="insentiveSettingsEISEditIP-incentive-settings">
        <h4>Incentive Percentage Setting</h4>
        <div className="insentiveSettingsEISEditIP-search-pagination">
        <div className="insentiveSettingsEISEditIP-search-bar">
          <input type="text" placeholder="Search" className="insentiveSettingsEISEditIP-search-input" />
        </div>
        <div className="insentiveSettingsEISEditIP-pagination-info">
         <span> Showing 0 / 0 results</span>
          <button className="insentiveSettingsEISEditIP-print-btn">Print</button>
        </div>
        </div>
        <table className="insentiveSettingsEISEditIP-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>ItemName</th>
              <th>PriceCategory</th>
              <th>Performer %</th>
              <th>Prescriber %</th>
              <th>Referral %</th>
              {/* <th>Group</th> */}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="insentiveSettingsEISEditIP-no-rows">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsentiveSettingsEISEditIP;
