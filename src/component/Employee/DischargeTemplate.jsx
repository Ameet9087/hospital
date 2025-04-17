import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./DischargeTemplate.css";
import FloatingInput from "../../FloatingInputs/FloatingInput";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../api/api";
const DischargeTemplate = () => {
      const [templateName, setTemplateName] = useState(""); // State for template name
      const [notes, setNotes] = useState(""); // State for notes

      // Function to handle API call
      const handleSave = async () => {
            if (!templateName || !notes) {
                  toast.error("Please enter both Template Name and Notes.");
                  return;
            }

            const templateData = {
                  templateName: templateName,
                  templateDesign: notes,
            };

            try {
                  const response = await fetch(`${API_BASE_URL}/ipTemplates`, {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(templateData),
                  });

                  if (response) {
                        toast.success("Proposal saved successfully!");

                        // alert("Template saved successfully!");
                        setTemplateName(""); // Clear input fields
                        setNotes("");
                  } else {
                        toast.error("Failed to save proposal. Please try again.");

                        // alert("Failed to save template.");
                  }
            } catch (error) {
                  toast.error("Failed to save proposal. Please try again.");

                  console.error("Error saving template:", error);
                  // alert("Error saving template. Please try again.");
            }
      };

      return (
            <div className="DischargeTemplate-discharge-container">
                  <div className="DischargeTemplate-header">Discharge Template</div>

                  <div className="DischargeTemplate-patient-details">
                        <div className="DischargeTemplate-left">
                              <FloatingInput
                                    label={"Template Name"}
                                    type="text"
                                    id="templateName"
                                    name="templateName"
                                    value={templateName}
                                    placeholder="Enter Template Name"
                                    required
                                    onChange={(e) => setTemplateName(e.target.value)}
                              />
                        </div>
                  </div>

                  <div className="DischargeTemplate-editor-container">
                        <label>Discharge Template:</label>
                        <ReactQuill
                              className="DischargeTemplate-ql"
                              value={notes}
                              onChange={setNotes}
                        />
                  </div>

                  <div className="DischargeTemplate-save-btn">
                        <button className="DischargeTemplate-save" onClick={handleSave}>
                              Save
                        </button>
                  </div>
            </div>
      );
};

export default DischargeTemplate;