import React, { useState } from 'react';
import '../IncentiveSetting/incentiveSettingPMRename.css';

const IncentiveSettingPMRename = () => {
  const [profileName, setProfileName] = useState('Dr. Ajhar');
  const [description, setDescription] = useState('AT');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ profileName, description });
  };

  return (
    <div className="update-profile-form">
      <h2>Update Profile Name</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profileName">
            Profile Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="profileName"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
};

export default IncentiveSettingPMRename;