import React, { useState } from "react";
import "./BloodBankIssueForm.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const BloodBankIssueForm = ({ requestId }) => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    unitsIssued: "",
    issueDate: "",
    issuedBy: "",
    status: "",
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
        requestId: requestId,
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
        toast.success("Proposal saved successfully!");
      } else {
        console.error("Failed to issue blood:", response.statusText);
        toast.error("Failed to save proposal. Please try again.");
      }
    } catch (error) {
      console.error("Error issuing blood:", error);
      toast.error("Failed to save proposal. Please try again.");
    }
  };

  return (
    <div className="bloodbankissue-container">
      <h2 className="bloodbankissue-title">Issue Blood</h2>
      <form className="bloodbankissue-form" onSubmit={handleSubmit}>
        <div className="bloodbankissue-form-group">
          <FloatingInput
            label={"Request ID"}
            type="number"
            name="requestId"
            placeholder="Request ID"
            value={requestId}
            onChange={handleChange}
            required
            min="0"
          />
          <FloatingSelect
            label={"Blood Group"}
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Select a state" },
              { value: "A+", label: "A+" },
              { value: "A-", label: "A-" },
              { value: "B+", label: "B+" },
            ]}
          />
        </div>

        <div className="bloodbankissue-form-group">
          <FloatingInput
            label={"Units Issued"}
            type="number"
            id="unitsIssued"
            name="unitsIssued"
            value={formData.unitsIssued}
            onChange={handleChange}
            placeholder="Enter units issued"
            required
            min="0"
          />
          <FloatingInput
            label={"Issue Date"}
            type="date"
            id="issueDate"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="bloodbankissue-form-group">
          <FloatingInput
            label={"Issued By"}
            type="text"
            id="issuedBy"
            name="issuedBy"
            value={formData.issuedBy}
            onChange={handleChange}
            placeholder="Enter issuer's name"
            required
          />
          <FloatingSelect
            label={"Status"}
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Select a state" },
              { value: "Issued", label: "Issued" },
              { value: "Pending", label: "Pending" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />
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
