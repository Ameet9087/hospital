import React from 'react';
import './SalesInvoice.css';

const SalesInvoice = ({ showInvoice, handleClose, invoiceData, handlePrint, invoiceType }) => {
  console.log("next page",invoiceData)
  // If the invoice is not visible, return null to hide the component
  if (!showInvoice) return null;

  // Log invoice data for debugging
  console.log('Medicines Data:', invoiceData);

  // Ensure invoiceData is loaded before rendering
  if (!invoiceData) return <p>Loading invoice...</p>;

  // Check if medicines exist in the invoice
  if (!invoiceData.medicines || invoiceData.medicines.length === 0) {
    return <p>No medicines found in the invoice</p>;
  }

  return (
    <div className="dispensaryprint-invoice-form">
      <div className="dispensaryprint-invoice-close-button">
        <button onClick={handleClose}>×</button>
      </div>

      <h3>PHARMACY UNITS</h3>
      <h4>{invoiceType || 'INVOICE'}</h4>

      <div className="dispensaryprint-invoice-header">
        <div>
          <p><strong>Invoice No:</strong> {invoiceData.invoiceId}</p>
          <p><strong>UHID:</strong> {invoiceData.person.uhid || 'N/A'}</p>
          <p><strong>Patient's Name:</strong> {invoiceData.person.firstName || 'N/A'}</p>
          <p><strong>Phone Number:</strong> {invoiceData.person.phoneNumber || 'N/A'}</p>
        </div>
        <div>
          <p><strong>Transaction Date:</strong> {invoiceData.transactionDate}</p>
          <p><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</p>
          <p><strong>Patient Type:</strong> {invoiceData.person.patientType || 'N/A'}</p>
          {invoiceType === 'Return Invoice' && <p><strong>refInvoiceNumber:</strong>{invoiceData.refInvoiceNumber}</p>}
        </div>
      </div>

      {/* Medicines Table */}
      <table className="dispensaryprint-invoice-table">
        <thead>
          <tr>
            <th>SN.</th>
            <th>Generic Name</th>
            <th>Medicine Name</th>
            <th>Expiry</th>
            <th>Batch</th>
            <th>Qty</th>
            {invoiceType === 'Return Invoice' && <th>Return Quantity</th>} {/* Conditional Return Qty */}

            <th>Sale Price</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.medicines.map((medicine, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{medicine.genericName}</td>
              <td>{medicine.medicineName}</td>
              <td>{medicine.expiry}</td>
              <td>{medicine.batch}</td>
              <td>{medicine.qty}</td>
              {invoiceType === 'Return Invoice' && <td>{medicine.returnedQty || medicine.returnqnt ||0}</td>}
              <td>{medicine.salePrice}</td>
              <td>{medicine.subTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Amount Section */}
      <div className="dispensaryprint-invoice-amount">
        <p><strong>Total Amount:</strong> {invoiceData.total_amt||invoiceData.totalAmount}</p>
      </div>

      {/* Footer */}
      <div className="dispensaryprint-invoice-footer">
        <div>
          <p><strong>Store:</strong> Main Dispensary</p>
          <p><strong>Remarks:</strong> N/A</p>
          <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="select-printer">
          <select>
            <option>Select Printer</option>
          </select>
          <button onClick={handlePrint}>OK</button>
        </div>
      </div>

      {/* Print Button */}
      <button className="dispensaryprint-invoice-print-button" onClick={handlePrint}>
        Print Receipt
      </button>
    </div>
  );
};

export default SalesInvoice;