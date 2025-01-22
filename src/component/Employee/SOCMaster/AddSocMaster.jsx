import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../api/api";
import "./SocMaster.css";
import axios from "axios";

const AddSocMaster = ({ onClose, initialData }) => {
  const today = new Date().toISOString().split("T")[0];

  const [socName, setSocName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(today);
  const [opRegFees, setOpRegFees] = useState("");
  const [status, setStatus] = useState("Active");

  // Populate form fields when `initialData` is provided
  useEffect(() => {
    if (initialData) {
      setSocName(initialData.socName || "");
      setRemarks(initialData.remarks || "");
      setDateFrom(initialData.dateFrom || today);
      setDateTo(initialData.dateTo || today);
      setOpRegFees(initialData.opRegFees || "");
      setStatus(initialData.status || "Active");
    }
  }, [initialData]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (new Date(dateTo) < new Date(dateFrom)) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    const socData = {
      socName,
      remarks,
      dateFrom,
      dateTo,
      opRegFees: parseFloat(opRegFees),
      status,
    };

    try {
      if (initialData) {
        // Update existing SOC Master
        await axios.put(`${API_BASE_URL}/socmasters/${initialData.socId}`, socData);
        alert("SOC Master updated successfully");
      } else {
        // Create a new SOC Master
        await axios.post(`${API_BASE_URL}/socmasters`, socData);
        alert("SOC Master saved successfully");
      }

      // Clear the form after submission
      setSocName("");
      setRemarks("");
      setDateFrom(today);
      setDateTo(today);
      setOpRegFees("");
      setStatus("Active");
      onClose();
    } catch (error) {
      console.error("Error saving SOC Master:", error);
    }
  };

  return (
    <div className="soc-master">
      <div className="soc-master__header">
        <h3>{initialData ? "Update SOC Master" : "Add SOC Master"}</h3>
      </div>

      <form onSubmit={handleSubmit} className="soc-master__form-container">
        <div className="soc-master__form-group">
          <label>SOC Name: *</label>
          <input
            type="text"
            value={socName}
            onChange={(e) => setSocName(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>Remarks: *</label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>From: *</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>To: *</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>OP Reg Fees: *</label>
          <input
            type="number"
            value={opRegFees}
            onChange={(e) => setOpRegFees(e.target.value)}
            required
          />
        </div>
        <div className="soc-master__form-group">
          <label>Status:</label>
          <div className="soc-master__radio-group">
            <label>
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={handleStatusChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={handleStatusChange}
              />
              Inactive
            </label>
          </div>
        </div>
        <button type="submit" className="socMaster-submit-btn">
          {initialData ? "Update SOC Master" : "Save SOC Master"}
        </button>
      </form>
    </div>
  );
};

export default AddSocMaster;
