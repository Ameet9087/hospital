import React, { useState, useEffect } from "react";
import "./UpdateTemplate.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingTextarea } from "../../../FloatingInputs";
import { toast } from "react-toastify";

const UpdateTemplate = ({ template, onClose }) => {
  const [moduleName, setModuleName] = useState("Radiology");
  const [templateCode, setTemplateCode] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [templateContent, setTemplateContent] = useState("");
  const [footerNote, setFooterNote] = useState("");
  const [isCodeEdited, setIsCodeEdited] = useState(false);

  useEffect(() => {
    if (template) {
      setModuleName(template.moduleName || "Radiology");
      setTemplateCode(template.templateCode || "");
      setTemplateName(template.templateName || "");
      setIsActive(template.isActive === "true");
      setTemplateContent(template.templateContent || "");
      setFooterNote(template.footerNote || "");
    }
  }, [template]);

  useEffect(() => {
    if (!isCodeEdited) {
      // Auto-generate templateCode from templateName
      const generatedCode = templateName
        .trim()
        .toUpperCase()
        .replace(/\s+/g, "_"); // Replace spaces with underscores and convert to uppercase
      setTemplateCode(generatedCode);
    }
  }, [templateName, isCodeEdited]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      moduleName,
      templateCode,
      templateName,
      isActive: isActive ? "true" : "false",
      templateContent,
      footerNote,
    };

    try {
      if (template && template.radiologyTemplateId) {
        // Update existing template
        await axios.put(
          `${API_BASE_URL}/radiology-templates/${template.radiologyTemplateId}`,
          payload
        );
        toast.success("Data Updated Successfully");
      } else {
        // Create new template
        await axios.post(`${API_BASE_URL}/radiology-templates`, payload);
      }
      toast.success("Data Added Successfully");
      onClose();
    } catch (error) {
      toast.error("Error saving template:", error);
    }
  };
  const resetForm = (event) => {
    event.preventDefault(); // Prevents form submission when reset is clicked

    setModuleName("Radiology");
    setTemplateCode("");
    setTemplateName("");
    setIsActive(false);
    setTemplateContent("");
    setFooterNote("");
    setIsCodeEdited(false);
  };

  return (
    <div className="update-template-modal-container">
      <div className="update-template-modal-header">
        <h2>{template ? "Update Template" : "Create Template"}</h2>
      </div>
      <form className="update-template-template-form" onSubmit={handleSubmit}>
        <div className="update-template-form-group">
          <FloatingInput
            label={"Module Name"}
            type="text"
            value={moduleName}
            readOnly
          />
        </div>
        <div className="update-template-form-group">
          <FloatingInput
            label={"Template Name"}
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
          />
        </div>
        <div className="update-template-form-group">
          <FloatingInput
            label={"Template Code"}
            type="text"
            value={templateCode}
            onChange={(e) => {
              setTemplateCode(e.target.value);
              setIsCodeEdited(true); // User manually edited the code
            }}
            required
          />
        </div>
        <div className="update-template-form-group">
          <label>Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        <div className="update-template-form-group">
          <label>Template Content:</label>
          <ReactQuill
            className="update-template-text-editor"
            value={templateContent}
            onChange={setTemplateContent}
          />
        </div>
        <div className="update-template-form-group footer-note">
          <FloatingTextarea
            label={"Footer Note"}
            value={footerNote}
            onChange={(e) => setFooterNote(e.target.value)}
          />
        </div>
        <button type="submit" className="update-template-update-button">
          {template ? "Update" : "Create"}
        </button>
        <button className="update-template-update-button" onClick={resetForm}>Reset</button>
      </form>
    </div>
  );
};

export default UpdateTemplate;
