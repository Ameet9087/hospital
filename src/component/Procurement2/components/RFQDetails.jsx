import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RFQDetails.css';

const RFQModal = ({ onClose }) => {
  const [rfqData, setRfqData] = useState(null);

  useEffect(() => {
    // Fetch data from the API using axios
    axios.post('http://localhost:8080/api/rfq/create', {
      subject: "Request for medical supplies",
      description: "Requesting quotes for various medical supplies",
      requestDate: "2024-08-24",
      requestCloseDate: "2024-08-30",
      vendorName: "MedSupplies Ltd",
      items: [
        {
          itemName: "Surgical Gloves",
          itemCode: "SG-001",
          unit: "Box",
          quantity: 100,
          description: "Latex surgical gloves"
        },
        {
          itemName: "Face Masks",
          itemCode: "FM-002",
          unit: "Box",
          quantity: 200,
          description: "N95 Face Masks"
        }
      ]
    })
      .then(response => setRfqData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!rfqData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="rfq-modal-container">
      <div className="rfq-modal-header">
        <h2>RFQ Details</h2>
        <button className="rfq-close-btn" onClick={onClose}>&times;</button>
      </div>
      <div className="rfq-modal-content">
        <div className="rfq-header-section">
          <div className="rfq-hospital-info">
            <h3>Kalimoni Mission Hospital</h3>
            <p>P.O Box 1718 RUIRU</p>
            <p>KRA PIN: P051097616A, Tel: 0718642944</p>
            <p>Inventory Unit</p>
          </div>
          <div className="rfq-qr-code">
            {/* <img src="/path-to-qr-code.png" alt="QR Code" /> */}
          </div>
        </div>

        <div className="rfq-details-section">
          <p>Dear, {rfqData.vendorName}</p>
          <p>RFQ Date: <strong>{rfqData.requestDate}</strong></p>
          <p>RFQ Close Date: <strong>{rfqData.requestCloseDate}</strong></p>
          <p>Order Status: <strong>active</strong></p>
        </div>

        <div className="rfq-subject-section">
          <p>Subject: <strong>{rfqData.subject}</strong></p>
          <p>Description: <strong>{rfqData.description}</strong></p>
          <p>Created By: <strong>admin</strong></p>
        </div>

        <table className="rfq-items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Requested Date</th>
            </tr>
          </thead>
          <tbody>
            {rfqData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.description}</td>
                <td>{rfqData.requestDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="rfq-footer-section">
          <div className="rfq-prepared-by">
            <p>Prepared By</p>
            <p>Name: <strong>admin</strong></p>
            <p>Designation: <strong>admin</strong></p>
          </div>
          <div className="rfq-authorized-by">
            <p>Authorized By</p>
            <p>Name: <strong>admin</strong></p>
            <p>Designation: <strong>admin</strong></p>
            <p>Sign:</p>
          </div>
        </div> */}

        <div className="rfq-print-button-container">
          <button className="rfq-print-btn">Print</button>
        </div>
      </div>
    </div>
  );
};

export default RFQModal;
