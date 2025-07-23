import React from 'react';
import "../IncentiveSetting/insentiveSettingsEISNewEI.css"
// import './EmployeeIncentiveSetup.css';

const InsentiveSettingsEISNewEI = () => {
  return (
    <div className="insentiveSettingsEISNewEI-container">
      <div className="insentiveSettingsEISNewEI-header">Employee INCENTIVE setup</div>

      <div className="insentiveSettingsEISNewEI-content">
        {/* First Row */}
        <div className="insentiveSettingsEISNewEI-form-row">
        <div className="insentiveSettingsEISNewEI-PriceCategory">

          <label className="insentiveSettingsEISNewEI-form-label">PriceCategory:</label>
          <select className="insentiveSettingsEISNewEI-form-select">
            <option>--select PriceCategory--</option>
            {/* Add more options as needed */}
          </select>
          </div>
          <div className="insentiveSettingsEISNewEI-EmployeeName">
          <label className="insentiveSettingsEISNewEI-form-label">Employee Name:</label>
          <input type="text" placeholder="Search Doctor Name" className="insentiveSettingsEISNewEI-form-input" />
          <button className="insentiveSettingsEISNewEI-search-button">🔍</button>
          <label className="insentiveSettingsEISNewEI-form-label">TDS %:</label>
          <input type="number" className="insentiveSettingsEISNewEI-form-input tds-input" value="0" />
          <button className="insentiveSettingsEISNewEI-save-button"><i class="fa-regular fa-floppy-disk"></i> Save</button>
          </div>
        </div>

        {/* Second Row */}
        <div className="insentiveSettingsEISNewEI-form-row">
          <div className="insentiveSettingsEISNewEI-checkbox-section">
            <label htmlFor="attach-profile">Attach Profile Item Mapping:</label>
            <input type="checkbox" id="attach-profile" />
          </div>
          <div className="insentiveSettingsEISNewEI-select-profile-section">
            <label className="insentiveSettingsEISNewEI-form-label">Select Profile:</label>
            <input type="text" placeholder="Search Profile" className="insentiveSettingsEISNewEI-form-input" />
          </div>
        </div>

        {/* Profile List */}
        <div className="insentiveSettingsEISNewEI-profile-list">
          <table className="insentiveSettingsEISNewEI-profile-table">
            <thead>
              <tr>
                <th>Profile Name</th>
                <th>Description</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="radio" name="profile" /> salman</td>
                <td>Dr. Ajhar</td>
                <td><button className="insentiveSettingsEISNewEI-preview-button">Preview</button></td>
              </tr>
              <tr>
                <td><input type="radio" name="profile" /> Dr. Raju</td>
                <td>DrAB</td>
                <td><button className="insentiveSettingsEISNewEI-preview-button">Preview</button></td>
              </tr>
              <tr>
                <td><input type="radio" name="profile" /> ABC</td>
                <td>AT</td>
                <td><button className="insentiveSettingsEISNewEI-preview-button">Preview</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="insentiveSettingsEISNewEI-action-buttons">
          <button className="insentiveSettingsEISNewEI-discard-button">Discard Profile</button>
          <button className="insentiveSettingsEISNewEI-ok-button">OK</button>
        </div>
      </div>
    </div>
  );
};

export default InsentiveSettingsEISNewEI;