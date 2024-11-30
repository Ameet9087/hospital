import React, { useState, useEffect } from "react";
import "./AddTerms.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL } from "../../api/api";

const AddTermsAndConditions = ({ terms }) => {
  // State for handling form inputs
  const [shortName, setShortName] = useState("");
  const [value, setValue] = useState(""); // For ReactQuill content
  const [type, setType] = useState("");
  const [isActive, setIsActive] = useState(true); // Checkbox for isActive
  const [error, setError] = useState(""); // For handling errors
  const [isEditing, setIsEditing] = useState(false); // To check if we are updating

  useEffect(() => {
    if (terms) {
      // If terms are passed (for update scenario)
      setShortName(terms.shortName);
      setValue(terms.text);
      setType(terms.type);
      setIsActive(terms.isActive);
      setIsEditing(true); // Set editing flag to true for update
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
        // PUT request for updating existing terms
        response = await fetch(`${API_BASE_URL}/terms/update/${terms.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(termData),
        });
      } else {
        // POST request for creating new terms
        response = await fetch(`${API_BASE_URL}/terms/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(termData),
        });
      }

      if (response.ok) {
        alert(isEditing ? "Terms and Conditions updated successfully!" : "Terms and Conditions added successfully!");
        // Reset form fields after successful operation
        setShortName("");
        setValue("");
        setType("");
        setIsActive(true);
        setIsEditing(false); // Reset the editing flag
      } else {
        const data = await response.json();
        setError(data.message || "Error saving terms.");
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
