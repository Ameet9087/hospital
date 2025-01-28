import React, { useState } from "react";
import axios from "axios";
import "./ManageSubstore.css";
import { API_BASE_URL } from "../api/api";
const AddSubStore = ({ substore, onClose }) => {
  const [formData, setFormData] = useState({
    subStoreName: substore?.subStoreName || "",
    maxVerificationLevel: substore?.maxVerificationLevel || "",
    code: substore?.code || "",
    email: substore?.email || "",
    contactNo: substore?.contactNo || "",
    location: substore?.location || "",
    subStoreDescription: substore?.subStoreDescription || "",
    isActive: !substore?.isActive || "true",
    label: substore?.label || "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Perform real-time validation
    if (name === "maxVerificationLevel") {
      if (value < 0) {
        setErrors((prev) => ({
          ...prev,
          maxVerificationLevel:
            "Max Verification Level must be a positive number.",
        }));
      } else {
        setErrors((prev) => {
          const { maxVerificationLevel, ...rest } = prev;
          return rest;
        });
      }
    }

    if (name === "contactNo") {
      const phoneRegex = /^[0-9]{0,10}$/; // Only allow up to 10 digits
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          contactNo: "Contact number must be numeric and up to 10 digits.",
        }));
      } else {
        setErrors((prev) => {
          const { contactNo, ...rest } = prev;
          return rest;
        });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      if (substore) {
        await axios.put(
          `${API_BASE_URL}/substores/update/${substore.subStoreId}`,
          formData
        );
        alert("SubStore updated successfully!");
      } else {
        await axios.post(`${API_BASE_URL}/substores/create-substore`, formData);
        alert("SubStore added successfully!");
      }
      onClose();
    } catch (error) {
      console.error(
        "Error saving substore:",
        error.response?.data || error.message
      );
      alert("Failed to save substore. Please try again.");
    }
  };

  // Reset Button:
  <button
    type="button"
    className="update-substore-update-btn"
    onClick={() =>
      setFormData({
        subStoreName: "",
        maxVerificationLevel: "",
        code: "",
        email: "",
        contactNo: "",
        location: "",
        subStoreDescription: "",
        isActive: "true",
        label: "",
      })
    }
  >
    Reset
  </button>;

  return (
    <div className="update-substore-conatainer">
      <div>
        <h2>{substore ? "Update SubStore" : "Add SubStore"}</h2>
        {errors.contactNo && (
          <span className="error-message">{errors.contactNo}</span>
        )}

        {errors.maxVerificationLevel && (
          <span className="error-message">{errors.maxVerificationLevel}</span>
        )}
      </div>
      <form className="update-substore-form-container" onSubmit={handleSubmit}>
        <div className="update-substore-form-grid">
          <div className="update-substore-form-group">
            <label>
              SubStore Name<span className="required">*</span>:
            </label>
            <input
              type="text"
              name="subStoreName"
              value={formData.subStoreName}
              onChange={handleInputChange}
              className="update-substore-input-field"
              required
            />
          </div>
          <div className="update-substore-form-group">
            <label>Code :</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="update-substore-input-field"
              readOnly={!!substore}
            />
          </div>
          <div className="update-substore-form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="update-substore-input-field"
            />
          </div>
        </div>
        <div className="update-substore-form-grid">
          <div className="update-substore-form-group">
            <label>Contact No :</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              className="update-substore-input-field"
            />
          </div>
          <div className="update-substore-form-group">
            <label>Location :</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="update-substore-input-field"
            />
          </div>
          <div className="update-substore-form-group">
            <label>Label :</label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
              className="update-substore-input-field"
            />
          </div>
        </div>
        <div className="update-substore-form-grid">
          <div className="update-substore-form-group">
            <label>Max Verification Lavel :</label>
            <input
              type="number"
              name="maxVerificationLevel"
              value={formData.maxVerificationLevel}
              onChange={handleInputChange}
              className="update-substore-input-field"
            />
          </div>
          <div className="update-substore-form-group">
            <label>SubStore Description :</label>
            <textarea
              name="subStoreDescription"
              value={formData.subStoreDescription}
              onChange={handleInputChange}
              className="update-substore-textarea-field"
            ></textarea>
          </div>
        </div>
        <div className="update-substore-form-button-group">
          <button type="submit" className="update-substore-update-btn">
            {substore ? "Update" : "Add"}
          </button>
          <button type="reset" className="update-substore-update-btn">
            reset
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddSubStore;
