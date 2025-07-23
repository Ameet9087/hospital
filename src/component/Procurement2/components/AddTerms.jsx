import React, { useState, useEffect } from "react";
import "./AddTerms.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { FloatingInput } from "../../../FloatingInputs";
import { toast } from "react-toastify";
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
      toast.error("Please fill in all required fields.", { autoClose: 2000 });
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
        response = await axios.put(
          `${API_BASE_URL}/terms/${termsId}`,
          termData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(`${API_BASE_URL}/terms/create`, termData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
  
      if (response.status === 200 || response.status === 201) {
        toast.success(
          isEditing
            ? "Terms and Conditions updated successfully!"
            : "Terms and Conditions added successfully!",
          { autoClose: 2000 }
        );
  
        // Only reset the form for new entries, not updates
        if (!isEditing) {
          setShortName("");
          setValue("");
          setType("");
          setIsActive(true);
        }
        
        setIsEditing(false); // Reset the editing flag
      } else {
        setError(response.data.message || "Error saving terms.");
        toast.error(response.data.message || "Error saving terms.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to save terms.");
      toast.error("Failed to save terms.", { autoClose: 2000 });
    }
  };
  
  return (
    <div className="cons-container">
      <h2 className="cons-heading">
        {isEditing ? "Update Terms & Conditions" : "Add Terms & Conditions"}
      </h2>
      <form className="cons-terms-form" onSubmit={handleSubmit}>
        <div className="cons-form-group">
          <FloatingInput
            label={" Short Name"}
            type="text"
            id="shortName"
            className="cons-input-text"
            placeholder="Short Name"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
        </div>

        <div className="cons-form-groupsdf"> 
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
          <FloatingInput
          label={"Type"}
          type="text"
          id="type"
          className="cons-input-text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          />
        
        </div>

        <div className="cons-form-groups">
          <label htmlFor="isActive">
            Is Active
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
