import React from 'react';
import "../IncentiveSetting/insentiveSettingsEISEditBtn.css"

function InsentiveSettingsEISEditBtn() {
  return (
    <div className="insentiveSettingsEISEditBtn-container">
      <header className="insentiveSettingsEISEditBtn-header">
        <span>Employee INCENTIVE setup for:</span> <strong className="insentiveSettingsEISEditBtn-doctor-name">Dr. Ajhar Tamboli</strong>
        <span className="insentiveSettingsEISEditBtn-tds-info">TDS : 5 %</span>
      </header>
      <div className="insentiveSettingsEISEditBtn-form">
          <label htmlFor="">PriceCategory: </label>
        <select className="insentiveSettingsEISEditBtn-price-category">
          <option value="">--select PriceCategory--</option>
          {/* Add more options here */}
        </select>
        <div className="insentiveSettingsEISEditBtn-form-row">
          <input type="text" placeholder="Enter Department" className="insentiveSettingsEISEditBtn-input-field" />
          <input type="text" placeholder="Enter Item Name" className="insentiveSettingsEISEditBtn-input-field" />
          <input type="number" className="insentiveSettingsEISEditBtn-input-field" value="0" readOnly />
          <input type="number" className="insentiveSettingsEISEditBtn-input-field" value="0" readOnly />
          <input type="number" className="insentiveSettingsEISEditBtn-input-field" value="0" readOnly />
          <input type="number" className="insentiveSettingsEISEditBtn-input-field" value="0" readOnly />
          <button className="insentiveSettingsEISEditBtn-save-btn"> <i class="fa-regular fa-floppy-disk"></i> Save</button>
          <button className="insentiveSettingsEISEditBtn-discard-btn">Discard</button>
        </div>
      </div>

      <div className="insentiveSettingsEISEditBtn-incentive-settings">
        <h4>Incentive Percentage Setting</h4>
        <div className="insentiveSettingsEISEditBtn-search-pagination">
        <div className="insentiveSettingsEISEditBtn-search-bar">
          <input type="text" placeholder="Search" className="insentiveSettingsEISEditBtn-search-input" />
        </div>
        <div className="insentiveSettingsEISEditBtn-pagination-info">
         <span> Showing 0 / 0 results</span>
          <button className="insentiveSettingsEISEditBtn-print-btn"><i className="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
        <table className="insentiveSettingsEISEditBtn-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>ItemName</th>
              <th>PriceCategory</th>
              <th>Performer %</th>
              <th>Prescriber %</th>
              <th>Referral %</th>
              <th>Group</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="insentiveSettingsEISEditBtn-no-rows">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsentiveSettingsEISEditBtn;
