import React, { useRef } from 'react';
import './RFQDetails.css';

const RFQModal = ({ rfq, onClose }) => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>RFQ Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            .rfq-details-section-container {
              font-size: 14px;
              color: #333;
            }
              .rfq-hospital-info {
  max-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
}
            .rfq-items-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
              .rfq-details-section-container
{
  display: flex;
  justify-content: space-between;
}
.rfq-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}
            .rfq-items-table th,
            .rfq-items-table td {
              border: 1px solid #ccc;
              text-align: center;
              padding: 8px;
            }
            .rfq-items-table th {
              background-color: #f2f2f2;
            }
            .rfq-header-section h3 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="rfq-modal-container">
      <div className="rfq-modal-content">
        <div ref={printRef}>
          <div className="rfq-header-section">
            <div className="rfq-hospital-info">
              <h3>HIMS Hospital</h3>
              <p>Inventory Unit</p>
            </div>
          </div>
          <div className="rfq-details-section">
            <p>Dear, {rfq?.vendor.vendorName}</p>
          </div>
          <div className="rfq-details-section-container">
            <div className="rfq-details-section">
              <p>RFQ Date: <strong>{rfq?.requestDate}</strong></p>
              <p>RFQ Close Date: <strong>{rfq?.requestCloseDate}</strong></p>
              <p>Order Status: <strong>active</strong></p>
            </div>
            <div className="rfq-subject-section">
              <p>Subject: <strong>{rfq?.subject}</strong></p>
              <p>Description: <strong>{rfq?.description}</strong></p>
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
              {rfq?.items.map((item, index) => (
                <tr key={index}>
                  <td>{item?.item.itemName}</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.description}</td>
                  <td>{rfq?.requestDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rfq-print-button-container">
          <button className="rfq-print-btn" onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default RFQModal;
