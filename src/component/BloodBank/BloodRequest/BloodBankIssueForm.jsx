import React, { useState } from "react";
import "./BloodBankIssueForm.css";
import { API_BASE_URL } from "../../api/api";

const BloodBankIssueForm = ({ requestId }) => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    unitsIssued: "",
    issueDate: "",
    issuedBy: "",
    status: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Prepare data in the desired format
    const bloodIssuePayload = {
      bloodGroup: formData.bloodGroup,
      unitsIssued: Number(formData.unitsIssued),
      issueDate: formData.issueDate,
      issuedBy: formData.issuedBy,
      status: formData.status,
      bloodRequestDTO: {
        requestId: requestId
      },
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bloodIssue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bloodIssuePayload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Blood issued successfully:", responseData);
        alert("Blood issued successfully!");
      } else {
        console.error("Failed to issue blood:", response.statusText);
        alert("Failed to issue blood. Please try again.");
      }
    } catch (error) {
      console.error("Error issuing blood:", error);
      alert("Error issuing blood. Please try again.");
    }
  };

  return (
    <div className="bloodbankissue-container">
      <h2 className="bloodbankissue-title">Issue Blood</h2>
      <form className="bloodbankissue-form" onSubmit={handleSubmit}>

      <div className="bloodbankissue-form-group">
          <label htmlFor="requestId">Request ID:</label>
          <input
            type="number"
            id="requestId"
            name="requestId"
            value={requestId}
            onChange={handleChange}
            placeholder="Enter request ID"
            required
          />
        </div>

        <div className="bloodbankissue-form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div className="bloodbankissue-form-group">
          <label htmlFor="unitsIssued">Units Issued:</label>
          <input
            type="number"
            id="unitsIssued"
            name="unitsIssued"
            value={formData.unitsIssued}
            onChange={handleChange}
            placeholder="Enter units issued"
            required
          />
        </div>

        <div className="bloodbankissue-form-group">
          <label htmlFor="issueDate">Issue Date:</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="bloodbankissue-form-group">
          <label htmlFor="issuedBy">Issued By:</label>
          <input
            type="text"
            id="issuedBy"
            name="issuedBy"
            value={formData.issuedBy}
            onChange={handleChange}
            placeholder="Enter issuer's name"
            required
          />
        </div>

        <div className="bloodbankissue-form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Issued">Issued</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

       
        <div className="bloodbankissue-form-actions">
          <button type="submit" className="bloodbankissue-submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BloodBankIssueForm;
