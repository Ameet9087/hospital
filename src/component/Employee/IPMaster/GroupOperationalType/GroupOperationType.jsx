import React, { useState } from "react";
import axios from "axios";
import "./groupOperationType.css";
import GOTSearchPopUp from "./GOTSearchPopUp";
import CustomModal from "../../../../CustomModel/CustomModal";

const GroupOperationType = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    groupOperationTypeDetails: "",
    groupOperationTypeName: "",
    groupOperationTypeCode: "",
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.0.117:8080/api/group-operation-types",
        { ...formData, status }
      );
      setMessage("Data saved successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      setMessage("Error saving data!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="group-operation-type">
      <div className="groupOperationType-header">Group Operation Type</div>

      <form onSubmit={handleSubmit}>
        <div className="groupOperationType-form-section">
          <h3 className="groupOperationType-form-title">
            Group Operation Type Details
          </h3>
          <div className="groupOperationType-form-group">
            <label htmlFor="groupOperationTypeName">
              Group Operation Type Name: *
            </label>
            <input
              type="text"
              id="groupOperationTypeName"
              name="groupOperationTypeName"
              value={formData.groupOperationTypeName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="groupOperationType-form-group">
            <label htmlFor="groupOperationTypeCode">
              Group Operation Type Code: *
            </label>
            <input
              type="text"
              id="groupOperationTypeCode"
              name="groupOperationTypeCode"
              value={formData.groupOperationTypeCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="groupOperationType-form-group">
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
        <div className="groupOperationType-status-section">
          <label>Status:</label>
          <div className="groupOperationType-status-options">
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

        <div className="groupOperationType-button-section">
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

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <GOTSearchPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default GroupOperationType;
