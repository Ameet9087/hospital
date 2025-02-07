import React, { useState, useEffect } from "react";
import "./AddTerms.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL } from "../../api/api";
import axios from 'axios';

const AddTermsAndConditions = ({ terms }) => {
  // State for handling form inputs
  const [shortName, setShortName] = useState("");
  const [value, setValue] = useState(""); // For ReactQuill content
  const [type, setType] = useState("");
  const [termsId, setTermsId] = useState("");
  const [isActive, setIsActive] = useState(true); // Checkbox for isActive
  const [error, setError] = useState(""); // For handling errors
  const [isEditing, setIsEditing] = useState(false); // To check if we are updating

  useEffect(() => {
    if (terms) {
      setTermsId(terms.termsId);
      setShortName(terms.shortName);
      setValue(terms.text);
      setType(terms.type);
      setIsActive(terms.isActive);
      setIsEditing(true);
    }
  }, [terms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!shortName || !value || !type) {
      setError("Please fill in all required fields.");
      return;
    }
  
    const termData = {
      shortName,
      text: value,
      type,
      isActive,
    };
  
    try {
      let response;
      if (isEditing) {
        response = await axios.put(`${API_BASE_URL}/terms/${termsId}`, termData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // POST request for creating new terms
        response = await axios.post(`${API_BASE_URL}/terms/create`, termData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
  
      if (response.status === 200 || response.status === 201) {
        alert(isEditing ? "Terms and Conditions updated successfully!" : "Terms and Conditions added successfully!");
        // Reset form fields after successful operation
        setShortName("");
        setValue("");
        setType("");
        setIsActive("");
        setIsEditing(false); // Reset the editing flag
      } else {
        setError(response.data.message || "Error saving terms.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to save terms.");
    }
  };

  return (
    <div className="cons-container">
      <h2 className="cons-heading">{isEditing ? "Update Terms & Conditions" : "Add Terms & Conditions"}</h2>
      <form className="cons-terms-form" onSubmit={handleSubmit}>
        <div className="cons-form-group">
          <label htmlFor="shortName">
            Short Name<span>*</span>:
          </label>
          <input
            type="text"
            id="shortName"
            className="cons-input-text"
            placeholder="Short Name"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
        </div>

        <div className="cons-form-group">
          <label htmlFor="text">
            Text<span>*</span>:
          </label>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Enter terms and conditions text"
            className="terms-quill"
          />
        </div>

        <div className="cons-form-group">
          <label htmlFor="type">
            Type<span>*</span>:
          </label>
          <input
            type="text"
            id="type"
            className="cons-input-text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="cons-form-group">
          <label htmlFor="isActive">
            Is Active<span>*</span>:
          </label>
          <input
            type="checkbox"
            id="isActive"
            className="cons-input-checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>

        {error && <p className="cons-error-message">{error}</p>}

        <div className="cons-form-actions">
          <button type="submit" className="cons-save-button">
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTermsAndConditions;
