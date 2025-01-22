import React, { useEffect, useState } from "react";
import "./InsuranceEntryMasterFormPopUp.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import axios from "axios";
const InsuranceEntryMasterFormPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    entryNumber: "", 
    insuranceCompanyName: "",
    address: "", 
    policyNumber: "", 
    policyType: "",
    policyFormDate: "", 
    policyToDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setFormData({
      entryNumber: "",
      insuranceCompanyName: "",
      address: "",
      policyNumber: "",
      policyType: "",
      policyFormDate: "",
      policyToDate: "",
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${ API_BASE_URL }/insurance-entries` ,
        formData
      );
      alert("Data saved successfully!");
      console.log("Response:", response.data);
      handleClear(); 
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleInfo = () => {
    alert("This is an insurance entry form for managing policy details.");
  };

 
  return (
    <div 
    className="InsuranceEntryMasterFormPopUp-container"
    >
      <div className="InsuranceEntryMasterFormPopUp-header">
        <h4>Insurance Entry Master Form</h4>
      
      </div>

      <div className="InsuranceEntryMasterFormPopUp-form">
        <div className="InsuranceEntryMasterFormPopUp-form-row">
          <div className="InsuranceEntryMasterFormPopUp-form-group-1row">
            <div className="InsuranceEntryMasterFormPopUp-form-group">
            <label>Entry Number:</label>
              <input
                type="text"
                name="entryNumber"
                value={formData.entryNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="InsuranceEntryMasterFormPopUp-form-group">
            <label>Insurance Company Name:</label>
              <textarea
                name="insuranceCompanyName"
                value={formData.insuranceCompanyName}
                onChange={handleChange}
                rows="2"
                required
              ></textarea>
            </div>
          </div>

          <div className="InsuranceEntryMasterFormPopUp-form-group-1row">
            <div className="InsuranceEntryMasterFormPopUp-form-group">
            <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>
            <div className="InsuranceEntryMasterFormPopUp-form-group">
            <label>Policy Number:</label>
              <input
                type="text"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                required
              />
            </div>
            
          </div>
          <div className="InsuranceEntryMasterFormPopUp-form-group-1row">
            <div className="InsuranceEntryMasterFormPopUp-form-group">
            <label>Policy Type:</label>
              <input
                type="text"
                name="policyType"
                value={formData.policyType}
                onChange={handleChange}
                required
              />
            </div>
            
            
            
          </div>
          <div className="InsuranceEntryMasterFormPopUp-form-group-1row">
            
            <div className="InsuranceEntryMasterFormPopUp-form-group">
            <label>Policy Form Date:</label>
              <input
                type="date"
                name="policyFormDate"
                value={formData.policyFormDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="InsuranceEntryMasterFormPopUp-form-group">
            <label>Policy To Date:</label>
              <input
                type="date"
                name="policyToDate"
                value={formData.policyToDate}
                onChange={handleChange}
                required
              />
            </div>
            
            
          </div>
          </div>
          </div>
         

      <div className="InsuranceEntryMasterFormPopUp-form-actions">
        <button
          className="InsuranceEntryMasterFormPopUp-add-btn"
          onClick={handleSave}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default InsuranceEntryMasterFormPopUp;
