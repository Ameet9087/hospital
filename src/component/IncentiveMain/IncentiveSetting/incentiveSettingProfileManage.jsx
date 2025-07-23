import React, { useState } from "react";
import "../IncentiveSetting/incentiveSettingProfileManage.css";
import IncentiveSettingPMAddNP from "./incentiveSettingPMAddNP"; // Import the popup component

const IncentiveSettingProfileManage = () => {
  // State to keep track of active status for each profile
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Dr. AT", description: "XYZ", isActive: true },
    { id: 2, name: "Dr. Raju", description: "DrAB", isActive: true },
    { id: 3, name: "ABC", description: "AT", isActive: true },
  ]);

  // State to manage the visibility of the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle the active status of a profile
  const toggleActiveStatus = (id) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === id ? { ...profile, isActive: !profile.isActive } : profile
      )
    );
  };

  // Function to handle opening the popup
  const handleAddProfileClick = () => {
    setIsPopupOpen(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="incentiveSettingProfileManage-container">
      <div className="incentiveSettingProfileManage-header">
        <button
          className="incentiveSettingProfileManage-add-profile-button"
          onClick={handleAddProfileClick} // Open popup on click
        >
          + Add New Profile
        </button>
      </div>
      <div className="incentiveSettingProfileManage-controls">
          <div className="incentiveSettingProfileManage-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>

    </div>
     </div>
      <div className="incentiveSettingProfileManage-search-Showing">
        <div className="incentiveSettingProfileManage-search-container">
          <input
            type="text"
            className="incentiveSettingProfileManage-search-input"
            placeholder="Search"
          />
          <i className="fa fa-search search-icon"></i>
        </div>

        <div className="incentiveSettingProfileManage-Showing">
          <span>Showing {profiles.length} / {profiles.length} results</span>
          <button className="incentiveSettingProfileManage-print-button" onClick={""}><i className="fa-solid fa-file-excel"></i> Export</button>
          <button className="incentiveSettingProfileManage-print-button" onClick={""}><i class="fa-solid fa-print"></i> Print</button>
        
        </div>
      </div>
      <div className="incentiveSettingProfileManage-profile-table-N-pagination">
        <table className="incentiveSettingProfileManage-profile-table">
          <thead>
            <tr>
              <th>Profile Name</th>
              <th>Description</th>
              <th>IsActive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.description}</td>
                <td>{profile.isActive ? "true" : "false"}</td>
                <td>
                  {profile.isActive && (
                    <>
                      <button className="incentiveSettingProfileManage-action-button iSPM-rename-button">
                        Rename
                      </button>
                      <button className="incentiveSettingProfileManage-action-button iSPM-edit-items-button">
                        Edit Items Percentage
                      </button>
                    </>
                  )}
                  <button
                    className="incentiveSettingProfileManage-action-button iSPM-deactivate-button"
                    onClick={() => toggleActiveStatus(profile.id)}
                  >
                    {profile.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="incentiveSettingProfileManage-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>

      {/* Conditionally render the popup */}
      {isPopupOpen && (
        <div className="incentiveSettingProfileManage-popup-overlay">
          <div className="incentiveSettingProfileManage-popup-content">
            <IncentiveSettingPMAddNP />
            <button className="incentiveSettingProfileManage-close-popup-button" onClick={handleClosePopup}>
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncentiveSettingProfileManage;
