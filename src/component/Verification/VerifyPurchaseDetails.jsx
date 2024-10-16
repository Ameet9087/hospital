import React, { useState } from 'react';
import './VerifyPurchaseDetails.css';

const VerifyPurchaseDetails = ({ onclose, request,handleCloseForm  }) => {
  console.log(request);

  const [status, setStatus] = useState(request.status || 'active');
  const [remarks, setRemarks] = useState(request.remarks || '');
  const currentDate = new Date(Date.now()).toLocaleDateString();

  const handleSubmit = async () => {
    const apiUrl = `http://localhost:1415/api/purchase-requests/${request.purchaseId}/updateStatusAndRemarks`;

    try {
      const response = await fetch(`${apiUrl}?status=${status}&remarks=${remarks}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Purchase request updated successfully!');
        handleCloseForm();
      } else {
        alert('Failed to update purchase request.');
      }
    } catch (error) {
      console.error('Error updating purchase request:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleRejectAll = async () => {
    setStatus('reject');
    await handleSubmit();
  };

  return (
    <div className="verify-purchase-container">
      <button className="verify-purchase-approve" onClick={onclose}>Back</button>

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
          <span>PR No: {request.purchaseId}</span>
          <span>Requested Date: {request.requestDate}</span>
        </div>
        <div className="verify-purchase-row">
          <span>Selected Vendor: {request.vendor.vendorName}</span>
          <span>Request From : {request.requestedBy}</span>
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
          <tr>
            <td>{request.item.itemName}</td>
            <td>{request.item.unitOfMeasurement.name}</td>
            <td>{request.quantity}</td>
            <td>{request.status}</td>
          </tr>
        </tbody>
      </table>

      <div className="verify-purchase-status">
        <label htmlFor="status">Status:</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="approved">Approved</option>
          <option value="reject">Reject</option>
        </select>
      </div>

      <div className="verify-purchase-remarks">
        <label htmlFor="remarks">Remarks:</label>
        <textarea
          id="remarks"
          rows="4"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
      </div>

      <div className="verify-purchase-requester">
        <p>Requested By:</p>
        <p>Mr. admin admin</p>
        <p>{currentDate}</p>
      </div>

      <div className="verify-purchase-actions">
        <button className="verify-purchase-approve" onClick={handleSubmit}>✔ Approve</button>
        <button className="verify-purchase-reject" onClick={handleRejectAll}>❌ Reject All</button>
      </div>
    </div>
  );
};

export default VerifyPurchaseDetails;
