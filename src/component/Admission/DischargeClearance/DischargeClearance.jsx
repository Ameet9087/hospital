import React, { useState, useRef, useEffect } from "react";
import "./DischargeClearance.css";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput } from "../../../FloatingInputs/index";

const DischargeClearance = ({ patient, setActiveState }) => {
  const [formData, setFormData] = useState({
    dischargeSummaryPrepared: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      dischargeSummaryPrepared: formData.dischargeSummaryPrepared,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/discharge-intimations/${patient?.disId}/discharge-clearance`,
        submissionData
      );
      console.log("Form submission success");
      setActiveState("");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  return (
    <>
      <div className="DischargeClearance-container">
        <div className="DischargeClearance-section">
          <div className="DischargeClearance-header">Discharge Clearance</div>
          <div className="DischargeClearance-grid">
            <div className="DischargeClearance-search-field">
              <FloatingInput
                label="MRNO"
                type="text"
                name="uhid"
                value={patient?.ipAdmissionDto?.patient?.patient?.uhid}
              />
            </div>
            <FloatingInput
              label="IPNo"
              value={patient?.ipAdmissionDto?.patient?.inPatientId}
              name="ipNo"
            />
            <FloatingInput
              label="Patient Name"
              value={`${patient?.ipAdmissionDto?.patient?.patient?.firstName} ${patient?.ipAdmissionDto?.patient?.patient?.lastName}`}
              readOnly
            />
            <FloatingInput
              label="DOA"
              value={patient?.ipAdmissionDto?.admissionDate}
              name="doa"
            />

            <FloatingInput
              label="Address"
              value={patient?.ipAdmissionDto?.patient?.patient?.address}
              name="address"
              readOnly
            />
            <div className="DischargeClearance-checkboxes">
              <label className="DischargeClearance-checkboxes-label">
                <input
                  type="checkbox"
                  name="dischargeSummaryPrepared"
                  checked={formData.dischargeSummaryPrepared}
                  onChange={handleChange}
                />
                Discharge Summary Prepared{" "}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="DischargeClearance-buttons">
        <button className="btn-blue" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </>
  );
};

export default DischargeClearance;
