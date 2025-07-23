import React, { useState } from "react";
import "../IncentiveSetting/insentiveSettingsEISEditTDSBtn.css"
const InsentiveSettingsEISEditTDSBtn = () => {
  const [tdsPercent, setTdsPercent] = useState(10); // State to manage the TDS percent value

  // Handler to update TDS percent
  const handleTdsChange = (e) => {
    setTdsPercent(e.target.value);
  };

  // Handler for the update button click
  const handleUpdateClick = () => {
    alert(`TDS Percent updated to: ${tdsPercent}`);
    // Implement the actual update logic here
  };

  return (
    <div className="insentiveSettingsEISEditTDSBtn-popup">
      <div className="insentiveSettingsEISEditTDSBtn-header">
        Edit TDS Percent For: Dr. Ajhar Tamboli
        {/* <button className="insentiveSettingsEISEditTDSBtn-close-button">×</button> */}
      </div>
      <div className="insentiveSettingsEISEditTDSBtn-content">
        <label className="insentiveSettingsEISEditTDSBtn-label">TDS Percent :</label>
        <input
          type="number"
          value={tdsPercent}
          onChange={handleTdsChange}
          className="insentiveSettingsEISEditTDSBtn-input"
        />
      </div>
      <div className="insentiveSettingsEISEditTDSBtn-footer">
        <button className="insentiveSettingsEISEditTDSBtn-update-button" onClick={handleUpdateClick}>
          <i className="fa fa-save"></i> Update TDS
        </button>
      </div>
    </div>
  );
};

export default InsentiveSettingsEISEditTDSBtn;
