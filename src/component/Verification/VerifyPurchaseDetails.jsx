import React, { useState } from "react";
import "./VerifyPurchaseDetails.css";
import { API_BASE_URL } from "../api/api";
import { FloatingInput, FloatingSelect } from "../../FloatingInputs";
import { toast } from "react-toastify";
const VerifyPurchaseDetails = ({ onclose, request, handleCloseForm }) => {
  const [status, setStatus] = useState(request.status || "active");
  const [remarks, setRemarks] = useState(request.remarks || "");
  const [verifiedBy, setVerifiedBy] = useState();

  const currentDate = new Date(Date.now()).toLocaleDateString();

  const handleSubmit = async () => {
    if (!status || !verifiedBy) {
      toast.error("Please fill out both the status and verified by fields.");
      return; // Stop execution if validation fails
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/purchase-requests/${request.id}/verify?status=${status}&verifyOrNot=Yes&verifyBy=${verifiedBy}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Purchase request updated successfully!");
        handleCloseForm();
      } else {
        toast.error("Failed to update purchase request.");
      }
    } catch (error) {
      console.error("Error updating purchase request:", error);
      // toast.error("An error occurred. Please try again.");
    }
  };

  const handleRejectAll = async () => {
    setStatus("reject");
    await handleSubmit();
  };

  return (
    <div className="verify-purchase-container">
      <header className="verify-purchase-header">
        <div className="verify-purchase-logo">
          <img src="/path-to-base-health-logo.png" alt="Base Health" />
        </div>
        <div className="verify-purchase-hospital-info">
          <h1>HIMS</h1>
          <p>Inventory Unit</p>
        </div>
        <div className="verify-purchase-qr-code">
          <img src="/path-to-qr-code.png" alt="QR Code" />
        </div>
      </header>

      <div className="verify-purchase-details">
        <div className="verify-purchase-row">
          <span>PR No: {request?.id}</span>
          <span>Requested Date: {request?.requestDate}</span>
        </div>
        <div className="verify-purchase-row">
          <span>Selected Vendor: {request?.vendor?.vendorName}</span>
          <span>Request From : {request?.requestedBy}</span>
        </div>
      </div>

      <h2 className="verify-purchase-title">PURCHASE REQUEST DETAILS PRINT</h2>

      <table className="verify-purchase-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Unit</th>
            <th>Requested Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {request.items.length > 0 &&
            request.items.map((item, index) => (
              <tr key={index}>
                <td>{item?.itemId?.itemName}</td>
                <td>{item?.itemId?.unitOfMeasurement?.name}</td>
                <td>{item?.requiredQty}</td>
                <td>{request?.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="verify-purchase-update-container">
        <div className="verify-purchase-status">
          <FloatingSelect
            label={"Status"}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "", label: "Select Accounting" },
              { value: "Approved", label: "Approved" },
              { value: "Reject", label: "Reject" },
            ]}
          />
        </div>

        <div className="verify-purchase-status">
          <FloatingInput
          label={"Verified By"}
          type="text"
          name="verifiedBy"
          value={verifiedBy}
          onChange={(e) => setVerifiedBy(e.target.value)}
          />
       
        </div>
      </div>

      <div className="verify-purchase-actions">
        <button className="verify-purchase-approve" onClick={handleSubmit}>
          ✔ Approve
        </button>
        <button className="verify-purchase-reject" onClick={handleRejectAll}>
          ❌ Reject All
        </button>
      </div>
    </div>
  );
};

export default VerifyPurchaseDetails;
