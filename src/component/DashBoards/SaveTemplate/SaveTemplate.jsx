import React, { useState } from "react";
import axios from "axios"; // Add axios for making the API request
import "./SaveTemplate.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";

const SaveTemplate = ({ complaintsText, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("specialty");
  const [templateName, setTemplateName] = useState("");
  const Navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTemplateNameChange = (event) => {
    setTemplateName(event.target.value);
  };

  const handleSave = () => {
    const postData = {
      complaintsText: complaintsText,
      template: {
        flat: selectedOption,
        templateName: templateName,
        specialisation:
          selectedOption === "for speciality"
            ? { specialisationId: 2 }
            : undefined,
        addDoctor:
          selectedOption === "for myself" ? { doctorId: 1 } : undefined,
      },
    };

    // Make the POST API call using axios
    axios
      .post(`${API_BASE_URL}/presenting-complaints`, postData)
      .then((response) => {
        console.log("Template saved successfully:", response.data);
        alert("Template saved successfully!"); // Show success message
        onClose();
      })
      .catch((error) => {
        console.error("Error saving template:", error);
      });
  };

  return (
    <div>
      <div className="SaveTemplate-Header">Save Template</div>
      <div className="SaveTemplate-Content">
        <div className="SaveTemplate-Name">
          <label className="SaveTemplate-NameLabel">Template Name</label>
          <input
            type="text"
            value={templateName}
            onChange={handleTemplateNameChange}
            className="SaveTemplate-Input"
          />
        </div>
        <div className="SaveTemplate-RadioOptions">
          <label className="SaveTemplate-RadioLabel">
            <input
              type="radio"
              name="templateType"
              value="hospital"
              checked={selectedOption === "for hospital"}
              onChange={handleOptionChange}
            />
            For Hospital
          </label>
          <label className="SaveTemplate-RadioLabel">
            <input
              type="radio"
              name="templateType"
              value="specialty"
              checked={selectedOption === "for specialty"}
              onChange={handleOptionChange}
            />
            For Specialty
          </label>
          <label className="SaveTemplate-RadioLabel">
            <input
              type="radio"
              name="templateType"
              value="myself"
              checked={selectedOption === "for myself"}
              onChange={handleOptionChange}
            />
            For Myself
          </label>
        </div>
        <div className="SaveTemplate-ButtonContainer">
          <button className="SaveTemplate-SaveButton" onClick={handleSave}>
            Save
          </button>
          {/* <button className="SaveTemplate-CloseButton" onClick={handleClose}>
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SaveTemplate;
