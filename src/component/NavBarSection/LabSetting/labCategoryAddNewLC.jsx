import React, { useState } from "react";
import axios from "axios";
import "../LabSetting/labCategoryAddNewLC.css";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../FloatingInputs";

const LabCategoryAddNewLC = ({ onClose }) => {
  const [labTestCategoryName, setLabTestCategoryName] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isActive, setIsActive] = useState(true); // Assuming active status
  const [errorMessage, setErrorMessage] = useState("");
  const [createdOn, setCreatedOn] = useState(new Date().toISOString()); // Set created date

  // handle form submission
  const handleAddCategory = async () => {
    if (!labTestCategoryName) {
      toast.error("Category Name is required");
      return;
    }

    // Prepare API payload
    const payload = {
      labTestCategoryName, // Category name from state
      isDefault, // isDefault from state (true/false)
      isActive, // isActive (default true)
      createdOn, // current date/time
    };

    try {
      console.log(payload);
      
      const response = await axios.post(
        `${API_BASE_URL}/lab-test-categories/create-testCategory`,
        payload
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Category added successfully!");
        onClose(); // Close the modal after success
      }
    } catch (error) {
      toast.error("Failed to add category. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="labCategoryAddNewLC-container">
      <div className="labCategoryAddNewLC-header">
        <h3>Add Lab Category</h3>
        <button className="labCategoryAddNewLC-close-btn" onClick={onClose}>
          x
        </button>
      </div>

      <div className="labCategoryAddNewLC-form">
        <div className="labCategoryAddNewLC-form-group">
          <FloatingInput
          label={"Category Name"}
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
          onClick={handleAddCategory}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default LabCategoryAddNewLC;
