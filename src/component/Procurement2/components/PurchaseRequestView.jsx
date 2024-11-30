import React from "react";
import "./PurchaseRequestView.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const PurchaseRequestView = () => {
  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write("<style>");
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; }
      .PurchaseRequestView-details { margin: 20px; }
      .PurchaseRequestView-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
      .PurchaseRequestView-details-table { width: 100%; border-collapse: collapse; }
      .PurchaseRequestView-details-table th, .PurchaseRequestView-details-table td { border: 1px solid #ddd; padding: 8px; }
      .PurchaseRequestView-details-table th { background-color: #f2f2f2; }
      .PurchaseRequestView-signature-section { margin-top: 20px; }
    `);
    printWindow.document.write("</style></head><body >");
    printWindow.document.write(
      document.querySelector(".PurchaseRequestView-details").outerHTML
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="PurchaseRequestView-details">
      <div className="PurchaseRequestView-header">
        <button className="PurchaseRequestView-back-button">
          ← Back to Purchase Request List
        </button>
        <button
          className="PurchaseRequestView-print-button"
          onClick={handlePrint}
        >
          <i className="fas fa-print"></i> Print
        </button>
      </div>
      <div className="PurchaseRequestView-content">
        <div className="PurchaseRequestView-logo-section">
          <i className="fas fa-clinic-medical fa-3x PurchaseRequestView-sasa-logo"></i>
          <div className="PurchaseRequestView-hospital-info">
            <h2>Kalimoni Mission Hospital</h2>
            <p>P.O Box 1718 RUIRU</p>
            <p>KRA PIN: P051097616A , Tel: 0718642944</p>
            <p>Procurement Unit</p>
          </div>
          <i className="fas fa-qrcode fa-3x PurchaseRequestView-qr-code"></i>
        </div>
        <div className="PurchaseRequestView-request-info">
          <p>
            <strong>PR No: 7</strong>
          </p>
          <p>
            <strong>Supplier Name: SHIKAMED CHEMIST</strong>
          </p>
          <p className="PurchaseRequestView-requested-date">
            <strong>Requested Date: 2024-08-24</strong>
          </p>
        </div>
        <h3 className="PurchaseRequestView-details-title">
          PURCHASE REQUEST DETAILS PRINT
        </h3>
        <table className="PurchaseRequestView-details-table">
          <thead>
            <tr>
              <th>Item Category</th>
              <th>Item Name</th>
              <th>UOM</th>
              <th>Item Code</th>
              <th>Quantity Required</th>
              <th>Quantity Available in Stores</th>
              <th>Quantity verified On</th>
              <th>Supply Required Before</th>
              <th>Approved Quantity by Top Management</th>
              <th>Po No.& Date</th>
              <th>Supplier Invoice No. & Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Consumables</td>
              <td>catheter</td>
              <td>Piece</td>
              <td>0007001</td>
              <td>10</td>
              <td>54</td>
              <td>24-Aug-24</td>
              <td>4 Month</td>
              <td></td>
              <td></td>
              <td></td>
              <td>active</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="PurchaseRequestView-signature-section">
          <div className="PurchaseRequestView-signature-block">
            <h4>Prepared by Stores-RM/PM in Charge Sign with Date</h4>
            <p>
              <strong>Requested By:</strong>
            </p>
            <p>Mr. admin admin</p>
            <p>Aug 24, 2024, 4:40:24 PM</p>
            <p>
              <strong>Verified By:</strong>
            </p>
            <p>1 Mr. admin admin (Aug 24, 2024, 4:41:45 PM)</p>
            <p>2 Mr. admin admin (Aug 24, 2024, 4:43:12 PM)</p>
          </div>
          <div className="PurchaseRequestView-signature-block">
            <h4>Processed by Purchase In Charge Sign With Date</h4>
          </div>
          <div className="PurchaseRequestView-signature-block">
            <h4>Approved by Top management Sign with Date</h4>
          </div>
        </div>
        <button className="PurchaseRequestView-add-purchase-order">
          Add Purchase Order ↗
        </button>
      </div>
    </div>
  );
};

export default PurchaseRequestView;
