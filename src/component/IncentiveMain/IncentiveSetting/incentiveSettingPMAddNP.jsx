import React, { useState } from 'react';
import "../IncentiveSetting/incentiveSettingPMAddNP.css"
const IncentiveSettingPMAddNP = () => {
  const [priceCategory, setPriceCategory] = useState('');
  const [profileName, setProfileName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ priceCategory, profileName, description });
  };

  return (
    <div className="incentiveSettingPMAddNP-form">
      <h4>Add New INCENTIVE Profile</h4>
      <form onSubmit={handleSubmit}>
          <div className="incentiveSettingPMAddNP-form-group-sub">
        <div className="incentiveSettingPMAddNP-form-group">
          <label htmlFor="priceCategory">PriceCategory:</label>
          <select
            id="priceCategory"
            value={priceCategory}
            onChange={(e) => setPriceCategory(e.target.value)}
          >
            <option value="">--select PriceCategory--</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="incentiveSettingPMAddNP-form-group">
          <label htmlFor="profileName">Profile Name:</label>
          <div className="incentiveSettingPMAddNP-search-input">
            <input
              type="text"
              id="profileName"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter Profile Name"
            />
            {/* <button type="button" className="search-button">🔍</button> */}
          </div>
        </div>
        <div className="incentiveSettingPMAddNP-form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="incentiveSettingPMAddNP-save-button"><i class="fa-regular fa-floppy-disk"></i> Save</button>
        </div>
      </form>
    </div>
  );
};

export default IncentiveSettingPMAddNP;