import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RFQDetails.css';

const RFQModal = ({rfq, onClose }) => {
  const rfqData=rfq;
  return (
    <div className="rfq-modal-container">
      <div className="rfq-modal-header">
        <h2>RFQ Details</h2>
      </div>
      <div className="rfq-modal-content">
        <div className="rfq-header-section">
          <div className="rfq-hospital-info">
            <h3>HIMS Hospital</h3>
            <p>P.O Box 1718 RUIRU</p>
            <p>KRA PIN: P051097616A, Tel: 0718642944</p>
            <p>Inventory Unit</p>
          </div>
          <div className="rfq-qr-code">
            {/* <img src="/path-to-qr-code.png" alt="QR Code" /> */}
          </div>
        </div>

        <div className="rfq-details-section">
          <p>Dear, {rfqData?.vendor.vendorName}</p>
        </div>
        <div className='rfq-details-section-container'>
        <div className="rfq-details-section">
        <p>RFQ Date: <strong>{rfqData?.requestDate}</strong></p>
        <p>RFQ Close Date: <strong>{rfqData?.requestCloseDate}</strong></p>
        <p>Order Status: <strong>active</strong></p>
        </div>

        <div className="rfq-subject-section">
          <p>Subject: <strong>{rfqData?.subject}</strong></p>
          <p>Description: <strong>{rfqData?.description}</strong></p>
          <p>Created By: <strong>admin</strong></p>
        </div>
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
                <td>{item?.item.itemName}</td>
                <td>{item?.quantity}</td>
                <td>{item?.description}</td>
                <td>{rfqData?.requestDate}</td>
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
