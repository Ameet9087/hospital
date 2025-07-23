import React, { useState, useEffect } from "react";
import axios from "axios";
import "../LabSetting/labCategoryAddNewLC.css";
import { API_BASE_URL } from "../../api/api";

const LabCategoryUpdateNewLC = ({ labCategory, onClose }) => {
  const [labTestCategoryName, setLabTestCategoryName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [createdOn, setCreatedOn] = useState(new Date().toISOString());

  // Prepopulate the form when the component mounts or labCategory changes
  useEffect(() => {
    if (labCategory) {
      setLabTestCategoryName(labCategory.labTestCategoryName || "");
      setIsDefault(labCategory.isDefault || false);
      setIsActive(labCategory.isActive || true);
      setCreatedOn(labCategory.createdOn || new Date().toISOString());
    }
  }, [labCategory]);

  // Handle form submission for updating the category
  const handleUpdateCategory = async () => {
    if (!labTestCategoryName) {
      setErrorMessage("Category Name is required");
      return;
    }

    // Prepare API payload for updating the category
    const payload = {
      labTestCategoryName,
      isDefault,
      isActive,
      createdOn,
    };

    try {
      // Sending a PUT request to update the lab category
      const response = await axios.put(
        `${API_BASE_URL}/lab-test-categories/update/${labCategory.labTestCategoryId}`,
        payload
      );
      if (response.status === 200) {
        alert("Category updated successfully!");
        onClose(); // Close the modal after success
      }
    } catch (error) {
      setErrorMessage("Failed to update category. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="labCategoryAddNewLC-container">
      <div className="labCategoryAddNewLC-header">
        <h3>Update Lab Category</h3>
        <button className="labCategoryAddNewLC-close-btn" onClick={onClose}>
          x
        </button>
      </div>

      <div className="labCategoryAddNewLC-form">
        <div className="labCategoryAddNewLC-form-group">
          <label>
            Category Name: <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Category Name"
            value={labTestCategoryName}
            onChange={(e) => setLabTestCategoryName(e.target.value)}
          />
        </div>

        <div className="labCategoryAddNewLC-form-group">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
          />
          <label>Is Default?</label>
        </div>

        <div className="labCategoryAddNewLC-form-group">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          <label>Is Active?</label>
        </div>

        {errorMessage && (
          <div className="labCategoryAddNewLC-error">{errorMessage}</div>
        )}
      </div>

      <div className="labCategoryAddNewLC-form-actions">
        <button
          className="labCategoryAddNewLC-add-btn"
          onClick={handleUpdateCategory}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default LabCategoryUpdateNewLC;
