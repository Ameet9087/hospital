import React, { useState } from "react";
import axios from "axios";
import "./operationType.css";
import OTSearchPopUp from "./oTSearchPopUp";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";

const OperationType = () => {
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [formData, setFormData] = useState({
    operationTypeName: "",
    operationTypeCode: "",
    groupOperationType: "",
    description: "",
  });
  const [status, setStatus] = useState("Active"); // Default status
  const [message, setMessage] = useState("");

  // Function to handle opening the popup
  const openPopup = () => {
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      operationTypeDetails: formData.description, // Map description to operationTypeDetails
      operationTypeName: formData.operationTypeName,
      operationTypeCode: formData.operationTypeCode,
      groupOperationType: {
        id: parseInt(formData.groupOperationType), // Ensure groupOperationType is sent as an ID
      },
      status, // Include status in the payload
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/operation-types`,
        payload
      );
      setMessage("Data saved successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      setMessage("Error saving data!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="operation-type">
      {/* Header Section */}
      <div className="operationType-header">Operation Type</div>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <div className="operationType-form-section">
          <h3 className="operationType-form-title">Operation Type Details</h3>
          <div className="operationType-form-group">
            <label htmlFor="operationTypeName">Operation Type Name: *</label>
            <input
              type="text"
              id="operationTypeName"
              name="operationTypeName"
              value={formData.operationTypeName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="operationType-form-group">
            <label htmlFor="operationTypeCode">Operation Type Code: *</label>
            <input
              type="text"
              id="operationTypeCode"
              name="operationTypeCode"
              value={formData.operationTypeCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="operationType-form-group">
            <label htmlFor="groupOperationType">Group Operation Type ID: *</label>
            <i class="fa-solid fa-magnifying-glass" onClick={openPopup}></i>
            <input
              type="text"
              id="groupOperationType"
              name="groupOperationType"
              value={formData.groupOperationType}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="operationType-form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Status Section */}
        <div className="operationType-status-section">
          <label>Status:</label>
          <div className="operationType-status-options">
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={status === "Active"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={(e) => setStatus(e.target.value)}
              />
              Inactive
            </label>
          </div>
        </div>

        {/* Button Section */}
        <div className="operationType-button-section">
          <button type="submit">Save</button>
          <button type="button">Delete</button>
          <button type="button">Clear</button>
          <button type="button">Close</button>
          <button type="button" onClick={openPopup}>
            Search
          </button>
          <button type="button">Tracking</button>
          <button type="button">Print</button>
          <button type="button">Error Logs</button>
          <button type="button">Export</button>
          <button type="button">Import</button>
          <button type="button">Health</button>
          <button type="button">Version Comparison</button>
          <button type="button">SDC</button>
          <button type="button">Testing</button>
          <button type="button">Info</button>
        </div>
      </form>

      {message && <p>{message}</p>}

      {/* Popup Component */}
      {showPopup && (
        <CustomModal isOpen={openPopup} onClose={closePopup}>
          <OTSearchPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default OperationType;