import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import "./assetLocationsMasterPopUp.css";
import { API_BASE_URL } from "../../../../api/api";

const AssetLocationsMasterPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    subLocation: "",
    locationType: "",
    underLocation: "",
    mainLocation: "",
    areaSq: "",
    status: "Active",
    floor: false, // Initial value for floor checkbox
    room: false,  // Initial value for room checkbox
  });

  const [locationMasters, setLocationMasters] = useState({
    locationList: [],
  }); // State for location masters (underLocation and mainLocation)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create the payload to match the provided JSON structure
    const payload = {
      subLocation: formData.subLocation,
      locationType: formData.locationType,
      areaSq: parseFloat(formData.area), // Ensure area is a number
  
   
      underLocation: {
        id: parseInt(formData.underLocation), // Convert ID to a number
      },
      mainLocation: {
        id: parseInt(formData.mainLocation), // Convert ID to a number
      },
      status: formData.status,
      room: formData.room ? "Na" : "Na", // Always "Na"
      floor: formData.floor ? "NA" : "NA", // Always "NA"
    };
  
    console.log("Payload:", payload); // Log the payload for debugging
  
    try {
      const response = await axios.post(`${API_BASE_URL}/asset-location`, payload);
      console.log("Asset Location Created:", response.data);
      alert("Asset Location created successfully");
  
      // Reset form data
      setFormData({
        subLocation: "",
        locationType: "",
        underLocation: "",
        mainLocation: "",
        area: "",
        status: "Active",
        floor: false,
        room: false,
      });
  
      // Optionally, you can invoke a callback to refresh the parent component data
      if (onClose) onClose();
    } catch (error) {
      console.error("Error creating asset location:", error.response || error);
      alert(`Failed to create asset location: ${error.response ? error.response.data.message : error.message}`);
    }
  };
  
  // Fetch location masters (Under Location and Main Location)
  const fetchLocationMasters = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/location-masters`);
      // Assuming response.data contains both underLocation and mainLocation as the same list
      setLocationMasters({
        locationList: response.data || [], // List of location data
      });
    } catch (error) {
      console.error("Error fetching location masters:", error);
    }
  };

  // Fetch location data when the component mounts
  useEffect(() => {
    fetchLocationMasters();
  }, []);

  return (
    <div className="assetLocationsMasterPopUp-container">
      <div className="assetLocationsMasterPopUp-header">
        <h4>Asset Locations Master</h4>
      </div>

      <div className="assetLocationsMasterPopUp-form">
        <div className="assetLocationsMasterPopUp-form-row">
          <div className="assetLocationsMasterPopUp-form-group-1row">
            <div className="assetLocationsMasterPopUp-form-group">
              <label htmlFor="subLocation">Sub Location:</label>
              <input
                type="text"
                id="subLocation"
                name="subLocation"
                value={formData.subLocation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="assetLocationsMasterPopUp-form-group">
              <label htmlFor="locationType">Location Type:</label>
              <select
                id="locationType"
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Location">Location</option>
                <option value="Building">Sub Location</option>
           
              </select>
            </div>
          </div>

          <div className="assetLocationsMasterPopUp-form-group-1row">
            {/* Under Location Dropdown */}
            <div className="assetLocationsMasterPopUp-form-group">
              <label htmlFor="underLocation">Under Location:</label>
              <div className="assetlocation-input-wrapper">
                <select
                  id="underLocation"
                  name="underLocation"
                  value={formData.underLocation}
                  onChange={handleChange}
                >
                  <option value="">Select Under Location</option>
                  {locationMasters.locationList.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main Location Dropdown */}
            <div className="assetLocationsMasterPopUp-form-group">
              <label htmlFor="mainLocation">Main Location:</label>
              <div className="assetlocation-input-wrapper">
                <select
                  id="mainLocation"
                  name="mainLocation"
                  value={formData.mainLocation}
                  onChange={handleChange}
                >
                  <option value="">Select Main Location</option>
                  {locationMasters.locationList.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="assetLocationsMasterPopUp-form-group">
              <label htmlFor="area">Area in Sq Feet:</label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="assetLocationsMasterPopUp-form-group-1row">
            <div className="assetLocationsMasterPopUp-form-group">
              <label>Status:</label>
              <div className="assetLocationsMasterPopUp-form-group-options">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={handleChange}
                  />
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === "Inactive"}
                    onChange={handleChange}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>

          {/* Floor and Room Checkboxes */}
          <div className="assetLocationsMasterPopUp-form-group-1row">
            <div className="assetLocationsMasterPopUp-form-group">
              <label>Options:</label>
              <div className="assetLocationsMasterPopUp-form-group-options">
                <label>
                  <input
                    type="checkbox"
                    name="floor"
                    checked={formData.floor}
                    onChange={handleChange}
                  />
                  Floor
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="room"
                    checked={formData.room}
                    onChange={handleChange}
                  />
                  Room
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="assetLocationsMasterPopUp-form-actions">
        <button
          className="assetLocationsMasterPopUp-add-btn"
          onClick={handleSubmit}
        >
          Add
        </button>
        {/* <button className="assetLocationsMasterPopUp-close-btn" onClick={onClose}>
          Close
        </button> */}
      </div>
    </div>
  );
};

export default AssetLocationsMasterPopUp;
