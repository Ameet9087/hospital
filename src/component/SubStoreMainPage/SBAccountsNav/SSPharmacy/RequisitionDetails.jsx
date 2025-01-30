import React, { useRef } from "react";
import QRCode from "react-qr-code";
import "./RequisitionDetails.css";

const RequisitionDetails = ({ request }) => {
  const qrCodeRef = useRef(null);

  const requisitionInfo = {
    requisitionNo: request.pharRequisitionId,
    requisitioningStore: request.subStore.subStoreName,
    date: request.requestedDate,
    medicineName: request.subPharmRequisitionItems,
    status: request.status,
    remarks: request.remarks,
    requestedBy: request.subStore.subStoreName,
    receivedBy: "",
  };

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Requisition Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .requisition-header, .requisition-footer {
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f4f4f4;
            }
          </style>
        </head>
        <body>
          <div class="requisition-header">
            <h2>Pharmacy Unit</h2>
            <h3>REQUISITION DETAILS PRINT</h3>
            <p>Requisition Date: ${requisitionInfo.date}</p>
          </div>
          <div class="requisition-details">
            <p><strong>Requisition No:</strong> ${requisitionInfo.requisitionNo}</p>
            <p><strong>Requesting Store:</strong> ${requisitionInfo.requisitioningStore}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Quantity</th>
                <th>Dispatched Qty.</th>
                <th>Pending Qty.</th>
                <th>Status</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${requisitionInfo.medicineName
        .map(
          (item) => `
                  <tr>
                    <td>${item.items.itemName}</td>
                    <td>${item.items.budgetedQuantity}</td>
                    <td>${item.dispatchQuantity}</td>
                    <td>${item.requiredQuantity}</td>
                    <td>${requisitionInfo.status}</td>
                    <td>${requisitionInfo.remarks}</td>
                  </tr>
                `
        )
        .join("")}
            </tbody>
          </table>
          <div class="requisition-footer">
            <p><strong>Requested By:</strong> ${requisitionInfo.requestedBy}</p>
            <p><strong>Received By:</strong> ${requisitionInfo.receivedBy}</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="requisition-container">
      <header className="requisition-header">
        <div>
          <h2 className="requisition-main-title">Pharmacy Unit</h2>
          <h3 className="requisition-submain-title">REQUISITION DETAILS PRINT</h3>
        </div>
        <div ref={qrCodeRef}>
          <p>Requisition Date: {requisitionInfo.date}</p>
          <QRCode value={JSON.stringify({
            requisitionId: requisitionInfo?.requisitionNo,
            date: requisitionInfo?.date
          })} size={80} />
        </div>
      </header>
      <main>
        <div className="requisition-details">
          <div>
            <p>
              <strong>Requisition No:</strong> {requisitionInfo.requisitionNo}
            </p>
            <p>
              <strong>Requesting Store:</strong> {requisitionInfo.requisitioningStore}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Dispatched Qty.</th>
              <th>Pending Qty.</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {requisitionInfo.medicineName.map((item, index) => (
              <tr key={index}>
                <td>{item.items.itemName}</td>
                <td>{item.items.budgetedQuantity}</td>
                <td>{item.dispatchQuantity}</td>
                <td>{item.requiredQuantity}</td>
                <td>{requisitionInfo.status}</td>
                <td>{requisitionInfo.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="requisition-footer">
          <p>
            <strong>Requested By:</strong> {requisitionInfo.requestedBy}
          </p>
          <p>
            <strong>Received By:</strong> {requisitionInfo.receivedBy}
          </p>
        </div>
      </main>
      <footer>
        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
      </footer>
    </div>
  );
};

export default RequisitionDetails;
