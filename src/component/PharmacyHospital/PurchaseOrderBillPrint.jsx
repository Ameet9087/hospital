
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './PurchaseOrderBillPrint.css';

const PurchaseOrderBillPrint = ({ purchaseOrder }) => {
  const componentRef = useRef();

  const numberToWords = (num) => {
    return `${num?.toFixed(2)} Only`;
  };
  const handlePrint = () => {
    if (!purchaseOrder) {
      alert("No purchase order data available.");
      return;
    }

    const printContent = `
<html>
<head>
  <title>Purchase Order - ${purchaseOrder?.poId || "Document"}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .po-header, .po-footer {
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
    .po-details {
      margin-bottom: 20px;
    }
    .po-footer {
      margin-top: 30px;
      font-weight: bold;
    }

    .PurchaseOrderBillPrint-container {
      width: 100%;
      max-width: 1100px;
      margin: 2px auto;
      padding: 2px 10px;
      border: 1px solid #ddd;
      font-family: Arial, sans-serif;
    }
    .PurchaseOrderBillPrint-main-title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin: 10px 0;
    }
    .PurchaseOrderBillPrint-details {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .PurchaseOrderBillPrint-left-details,
    .PurchaseOrderBillPrint-right-details {
      width: 45%;
    }
    .PurchaseOrderBillPrint-left-details div,
    .PurchaseOrderBillPrint-right-details div {
      margin: 5px 0;
    }
    .PurchaseOrderBillPrint-right-details {
      text-align: right;
    }
    .PurchaseOrderBillPrint-table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    .PurchaseOrderBillPrint-table th,
    .PurchaseOrderBillPrint-table td {
      border: 1px solid #ccc;
      padding: 5px;
      text-align: left;
    }
    .PurchaseOrderBillPrint-calculations {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 10px 0;
    }
    .PurchaseOrderBillPrint-calculations div {
      margin: 5px 0;
    }
    .PurchaseOrderBillPrint-footer {
      margin-top: 10px;
      text-align: center;
      font-weight: bold;
    }
    @media print {
      .PurchaseOrderBillPrint-buttons {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="PurchaseOrderBillPrint-main-title">Purchase Order</div>
  <div class="PurchaseOrderBillPrint-details">
    <div class="PurchaseOrderBillPrint-left-details">
      <div>PO No.: ${purchaseOrder.poId}</div>
      <div>Supplier's Name: ${purchaseOrder.supplierDTO?.supplierName || 'N/A'}</div>
      <div>Address: ${purchaseOrder.supplierDTO?.contactAddress || 'N/A'}</div>
      <div>Contact/Mobile Number: ${purchaseOrder.contact || 'N/A'}</div>
      <div>Invoicing Address: ${purchaseOrder.invoicingAddress || 'N/A'}</div>
      <div>Delivery Address: ${purchaseOrder.deliveryAddress || 'N/A'}</div>
    </div>
    <div class="PurchaseOrderBillPrint-right-details">
      <div>PO Date: ${purchaseOrder.poDate || 'N/A'}</div>
      <div>PIN: ${purchaseOrder.supplierDTO?.kraPin || 'N/A'}</div>
      <div>Delivery Days: ${purchaseOrder.deliveryDays || 'N/A'}</div>
      <div>Delivery Date: ${purchaseOrder.deliveryDate || 'N/A'}</div>
      <div>Reference No: ${purchaseOrder.referenceNumber || 'N/A'}</div>
      <div>Contact Details: ${purchaseOrder.contact || 'N/A'}</div>
    </div>
  </div>

  <table class="PurchaseOrderBillPrint-table">
    <thead>
      <tr>
        <th>SN</th>
        <th>Item Name</th>
        <th>Qty</th>
        <th>Free Qty</th>
        <th>Total Qty</th>
        <th>UOM</th>
        <th>Standard Rate</th>
        <th>CCCharge %</th>
        <th>CCCharge Amt</th>
        <th>Total Amt</th>
      </tr>
    </thead>
    <tbody>
      ${
        purchaseOrder?.purchaseOrderItemDTOs?.map(
          (item, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${item?.pharmacyItemMasterDTO?.itemName || "N/A"}</td>
              <td>${item?.quantity}</td>
              <td>${item?.freeQuantity}</td>
              <td>${item?.totalQuantity}</td>
              <td>${item?.pharmacyItemMasterDTO?.unitsOfMeasurement?.name || "N/A"}</td>
              <td>${item?.standardRate}</td>
              <td>${item?.ccCharge}</td>
              <td>${((item?.subTotal * item?.ccCharge) / 100).toFixed(2)}</td>
              <td>${item?.totalAmount}</td>
            </tr>
          `
        ).join("") || "<tr><td colspan='10'>No items available</td></tr>"
      }
    </tbody>
  </table>

  <div class="PurchaseOrderBillPrint-calculations">
    <div>SubTotal: ${purchaseOrder.subTotal?.toFixed(2)}</div>
    <div>Discount %: ${purchaseOrder.discountPercent?.toFixed(2)}</div>
    <div>Discount Amount: ${purchaseOrder.discountAmount?.toFixed(2)}</div>
    <div>Taxable Amount: ${purchaseOrder.taxableAmount?.toFixed(2)}</div>
    <div>Non-Taxable Amount: ${purchaseOrder.nonTaxableAmount?.toFixed(2)}</div>
    <div>VAT Amount: ${purchaseOrder.vatAmount?.toFixed(2)}</div>
    <div>CCCharge Amount: ${purchaseOrder.ccCharge?.toFixed(2)}</div>
    <div>Adjustment: ${purchaseOrder.adjustment?.toFixed(2) || '0.00'}</div>
    <div>Total Amount: ${purchaseOrder.totalAmount?.toFixed(2)}</div>
  </div>

  <div class="PurchaseOrderBillPrint-footer">
    Thank you for your business!
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
      printWindow.close();
    };
  };

  if (!purchaseOrder) {
    return <div>No purchase order data available</div>;
  }

  return (
    <div className="PurchaseOrderBillPrint-wrapper">
      <div ref={componentRef} className="PurchaseOrderBillPrint-container">
        <div className="PurchaseOrderBillPrint-top-header">
          <span className="PurchaseOrderBillPrint-ph">Ph No: {purchaseOrder.contact || 'N/A'}</span>
          <span className="PurchaseOrderBillPrint-kra">PIN: {purchaseOrder.supplierDTO?.kraPin || 'N/A'}</span>
        </div>
        
        <div className="PurchaseOrderBillPrint-main-title">Purchase Order</div>
        
        <div className="PurchaseOrderBillPrint-details">
          <div className="PurchaseOrderBillPrint-left-details">
            <div>PO No.: {purchaseOrder.poId}</div>
            <div>Supplier's Name: {purchaseOrder.supplierDTO?.supplierName || 'N/A'}</div>
            <div>Address: {purchaseOrder.supplierDTO?.contactAddress || 'N/A'}</div>
            <div>Contact/Mobile Number: {purchaseOrder.contact || 'N/A'}</div>
            <div>Invoicing Address: {purchaseOrder.invoicingAddress || 'N/A'}</div>
            <div>Delivery Address: {purchaseOrder.deliveryAddress || 'N/A'}</div>
          </div>
          
          <div className="PurchaseOrderBillPrint-right-details">
            <div>PO Date: {purchaseOrder.poDate || 'N/A'}</div>
            <div>PIN: {purchaseOrder.supplierDTO?.kraPin || 'N/A'}</div>
            <div>Delivery Days: {purchaseOrder.deliveryDays || 'N/A'}</div>
            <div>Delivery Date: {purchaseOrder.deliveryDate || 'N/A'}</div>
            <div>Reference No: {purchaseOrder.referenceNumber || 'N/A'}</div>
            <div>Contact Details: {purchaseOrder.contact || 'N/A'}</div>
          </div>
        </div>

        <div className="PurchaseOrderBillPrint-order-text">
          We Are Pleased To Place This Order For Below Mentioned Materials To Your Above Stated Company/Firm.
        </div>

        <table className="PurchaseOrderBillPrint-table">
          <thead>
            <tr>
              <th>SN.</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Free Qty</th>
              <th>Total Qty</th>
              <th>UOM</th>
              <th>Standard Rate</th>
              <th>CCcharge %</th>
              <th>CCcharge Amt</th>
              <th>Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrder.purchaseOrderItemDTOs?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.pharmacyItemMasterDTO?.itemName || 'N/A'}</td>
                <td>{item.quantity}</td>
                <td>{item.freeQuantity}</td>
                <td>{item.totalQuantity}</td>
                <td>{item.pharmacyItemMasterDTO?.unitsOfMeasurement?.name || 'N/A'}</td>
                <td>{item.standardRate}</td>
                <td>{item.ccCharge}</td>
                <td>{(item.subTotal * item.ccCharge / 100).toFixed(2)}</td>
                <td>{item.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="PurchaseOrderBillPrint-total-words">
          Total Value In Words: {numberToWords(purchaseOrder.totalAmount)}
        </div>

        <div className="PurchaseOrderBillPrint-calculations">
          <div>SubTotal: {purchaseOrder.subTotal?.toFixed(2)}</div>
          <div>Discount %: {purchaseOrder.discountPercent?.toFixed(2)}</div>
          <div>Discount Amount: {purchaseOrder.discountAmount?.toFixed(2)}</div>
          <div>Taxable Amount: {purchaseOrder.taxableAmount?.toFixed(2)}</div>
          <div>Non-Taxable Amount: {purchaseOrder.nonTaxableAmount?.toFixed(2)}</div>
          <div>VAT Amount: {purchaseOrder.vatAmount?.toFixed(2)}</div>
          <div>CCCharge Amount: {purchaseOrder.ccCharge?.toFixed(2)}</div>
          <div>Adjustment: {purchaseOrder.adjustment?.toFixed(2) || '0.00'}</div>
          <div>Total Amount: {purchaseOrder.totalAmount?.toFixed(2)}</div>
        </div>

        <div className="PurchaseOrderBillPrint-footer">
          <div className="PurchaseOrderBillPrint-remarks">Remarks: {purchaseOrder.remarks || 'N/A'}</div>
          <div className="PurchaseOrderBillPrint-terms">Terms & Conditions:</div>
          <div className="PurchaseOrderBillPrint-admin">Mr. Admin Admin</div>
          <div className="PurchaseOrderBillPrint-signatures">
            <span>Prepared By</span>
            <span>Checked By</span>
          </div>
          <div className="PurchaseOrderBillPrint-note">
            Note: This Is Computer Generated Purchase Order Signature Not Required.
          </div>
        </div>
      </div>

      <div className="PurchaseOrderBillPrint-buttons no-print">
        <button 
          className="PurchaseOrderBillPrint-print"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default PurchaseOrderBillPrint;