import React, { useState } from "react";
import "./Infusion.css";
import { API_BASE_URL } from "../api/api";

const Infusion = ({ inPatientId, outPatientId }) => {
  const [formData, setFormData] = useState({
    infusionNm: "",
    infusionGeneric: "",
    infusionRoute: "",
    drug: "",
    flowRate: "",
    infuRemarks: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    ...(inPatientId
      ? { inPatient: { inPatientId } }
      : { outPatient: { outPatientId } }),
  });

  const handleCancel = () => {
    setFormData({
      infusionNm: "",
      infusionGeneric: "",
      infusionRoute: "",
      drug: "",
      flowRate: "",
      infuRemarks: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/infusions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData directly
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully saved:", result);

        // Optionally reset the form or show a success message
        setFormData({
          infusionNm: "",
          infusionGeneric: "",
          infusionRoute: "",
          drug: "",
          flowRate: "",
          infuRemarks: "",
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
          ...(inPatientId
            ? { inPatient: { inPatientId } }
            : { outPatient: { outPatientId } }),
        });
      } else {
        console.error("Failed to save data:", response);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="Infusion-container">
      <h3>Infusion</h3>

      <form>
        <div className="Infusion-content">
          <div className="Infusion-form-group-left">
            <div className="Infusion-form-group">
              <label>Infusion Name:</label>
              <input
                type="text"
                name="infusionNm"
                value={formData.infusionNm}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>Infusion Generic:</label>
              <input
                type="text"
                name="infusionGeneric"
                value={formData.infusionGeneric}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>Infusion Frequency:</label>
              <input
                type="text"
                name="infusionRoute"
                value={formData.infusionRoute}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>Drug:</label>
              <input
                type="text"
                name="drug"
                value={formData.drug}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>Flow Rate:</label>
              <input
                type="text"
                name="flowRate"
                value={formData.flowRate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="Infusion-form-group-right">
            <div className="Infusion-form-group">
              <label>Infusion Remarks:</label>
              <textarea
                name="infuRemarks"
                value={formData.infuRemarks}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>Start Date:</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>End Date:</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Infusion-form-group">
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </form>

      <div className="Infusion-form-group-button">
        <button
          type="button"
          onClick={handleCancel}
          className="Infusion-form-cancel"
        >
          Cancel
        </button>
        <button
          className="Infusion-form-submit"
          type="submit"
          onClick={handleSubmit}
        >
          Submit{" "}
        </button>
      </div>
    </div>
  );
};

export default Infusion;
