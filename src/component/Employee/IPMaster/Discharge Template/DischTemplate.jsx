import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import "./DischTemplate.css";

// Helper function to strip HTML tags
const stripHtmlTags = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const DischTemplate = () => {
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [templateFormat, setTemplateFormat] = useState("");
  const [status, setStatus] = useState("active");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get("http://192.168.0.106:8080/api/discharge-template");
      setTemplates(response.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleSave = async () => {
    if (!templateName || !templateFormat) {
      alert("Please fill in all fields.");
      return;
    }

    // Strip HTML tags before saving
    const plainTextTemplateFormat = stripHtmlTags(templateFormat);

    const data = {
      templateName,
      templateFormat: plainTextTemplateFormat,
      status,
      disId: selectedTemplate?.disId || null,
    };

    try {
      if (selectedTemplate) {
        await axios.put(
          `http://192.168.0.106:8080/api/discharge-template/${selectedTemplate.disId}`,
          data
        );
        alert("Template updated successfully!");
      } else {
        await axios.post("http://192.168.0.106:8080/api/discharge-template", data);
        alert("Template added successfully!");
      }
      fetchTemplates();
      clearForm();
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  const handleEdit = (template) => {
    setTemplateName(template.templateName);
    setTemplateFormat(template.templateFormat);
    setStatus(template.status);
    setSelectedTemplate(template);
  };

  const clearForm = () => {
    setTemplateName("");
    setTemplateFormat("");
    setStatus("active");
    setSelectedTemplate(null);
  };

  return (
    <div className="disch-template-container">
      <div className="disch-template-header">
        <h3><b>Discharge Template</b></h3>
      </div>

      <div className="disch-template-form">
        <div>
          <label>Template Name:</label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div><br></br>
        <div>
          <label>Template Format:</label>
          <ReactQuill
            theme="snow"
            value={templateFormat}
            onChange={setTemplateFormat}
            className="disch-template-quill-editor"
          />
        </div>
        <div>
          <label>Status:</label>
          <label>&nbsp;
            <input
              type="radio"
              value="active"
              checked={status === "active"}
              onChange={(e) => setStatus(e.target.value)}
            />
            &nbsp;Active
          </label>
          <label>&nbsp;
            <input
              type="radio"
              value="inactive"
              checked={status === "inactive"}
              onChange={(e) => setStatus(e.target.value)}
            />
           &nbsp; Inactive
          </label>
        </div>
        
        <button onClick={handleSave} className="discharge-master-btn">
          {selectedTemplate ? "Update" : "Save"}
        </button>
        <button onClick={clearForm} className="discharge-master-btn">
          Clear
        </button>
        <br></br>
        
      </div>

      <div className="disch-template-list">
        <h3>Existing Templates</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Template Name</th>
              <th>Template Format</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.disId}>
                <td>{template.disId}</td>
                <td>{template.templateName}</td>
                <td>{template.templateFormat}</td>
                <td>{template.status}</td>
                <td>
                  <button
                    onClick={() => handleEdit(template)}
                    className="discharge-master-btn"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DischTemplate;
