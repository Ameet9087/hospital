import React, { useState } from "react";
import "./BloodTestingPopup.css";
import { API_BASE_URL } from "../../../api/api"; // Replace with your actual API URL

const BloodTestingPopup = ({ collectionId, onClose }) => {
  const [formData, setFormData] = useState({
    testType: "",
    result: "",
    remarks: "",
    testedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct payload with `basicInfoDTO`
    const payload = {
      ...formData,
      basicInfoDTO: {
        infoId: collectionId, // Set `infoId` from the `collectionId` prop
      },
    };

    try {
      // Make POST request to API
      const response = await fetch(`${API_BASE_URL}/blood-testing/add-test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send the data in required format
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Test saved successfully:", responseData);
        alert("Blood test saved successfully!");
        if (onClose) onClose(); // Close the popup after successful submission (if `onClose` provided)
      } else {
        console.error("Failed to save blood test:", response.statusText);
        alert("Failed to save blood test. Please try again.");
      }
    } catch (error) {
      console.error("Error saving blood test:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bloodtesting-popup-overlay">
      <div className="bloodtesting-popup">
        <h2>Save Blood Test</h2>
        <form onSubmit={handleSubmit}>
        <div className="bloodtesting-form-group">
            <label htmlFor="infoId">Basic Info ID:</label>
            <input
              type="number"
              id="infoId"
              name="infoId"
              value={collectionId}
              onChange={handleChange}
              placeholder="Enter basic info ID"
              required
            />
          </div>
          <div className="bloodtesting-form-group">
            <label htmlFor="testType">Test Type:</label>
            <input
              type="text"
              id="testType"
              name="testType"
              value={formData.testType}
              onChange={handleChange}
              placeholder="Enter test type (e.g., HIV)"
              required
            />
          </div>

          <div className="bloodtesting-form-group">
            <label htmlFor="result">Result:</label>
            <input
              type="text"
              id="result"
              name="result"
              value={formData.result}
              onChange={handleChange}
              placeholder="Enter result (e.g., Passed, Failed)"
              required
            />
          </div>

          <div className="bloodtesting-form-group">
            <label htmlFor="remarks">Remarks:</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Enter remarks"
              required
            />
          </div>

          <div className="bloodtesting-form-group">
            <label htmlFor="testedBy">Tested By:</label>
            <input
              type="text"
              id="testedBy"
              name="testedBy"
              value={formData.testedBy}
              onChange={handleChange}
              placeholder="Enter tester's name"
              required
            />
          </div>

          <div className="bloodtesting-form-actions">
            <button type="submit" className="bloodbankissue-submit-btn">
              Save
            </button>
            <button
              type="button"
              className="bloodbankissue-submit-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloodTestingPopup;
