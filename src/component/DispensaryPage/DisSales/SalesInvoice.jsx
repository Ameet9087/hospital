import React from "react";
import "./SalesInvoice.css";

const SalesInvoice = ({
  showInvoice,
  handleClose,
  invoiceData,
  handlePrint,
  invoiceType,
}) => {
  console.log("Invoice Data:", invoiceData);

  // If the invoice is not visible, return null to hide the component
  if (!showInvoice) return null;

  // Ensure invoiceData is loaded before rendering
  if (!invoiceData) return <p>Loading invoice...</p>;

  // Check if medicines exist in the invoice
  if (!invoiceData.medicines || invoiceData.medicines.length === 0) {
    return <p>No medicines found in the invoice</p>;
  }

  return (
    <div >
      {/* Close Button */}
      {/* <div className="dispensaryprint-invoice-close-button">
        <button onClick={handleClose}>×</button>
      </div> */}

      <h3>PHARMACY UNITS</h3>
      <h4>{invoiceType || "INVOICE"}</h4>

      {/* Invoice Header */}
      <div className="dispensaryprint-invoice-header">
        <div>
          <p>
            <strong>Invoice No:</strong> {invoiceData.invoiceId || "N/A"}
          </p>
          <p>
            <strong>UHID:</strong> {invoiceData.inPatient?.inPatientId || "N/A"}
          </p>
          <p>
            <strong>Patient's Name:</strong> {invoiceData.inPatient?.patient?.firstName || "N/A"}
          </p>
          <p>
            <strong>Phone Number:</strong> N/A
          </p>
        </div>
        <div>
          <p>
            <strong>Transaction Date:</strong> {invoiceData.transactionDate || "N/A"}
          </p>
          <p>
            <strong>Invoice Date:</strong> {invoiceData.invoiceDate || "N/A"}
          </p>
          <p>
            <strong>Patient Type:</strong> InPatient
          </p>
          {invoiceType === "Return Invoice" && (
            <p>
              <strong>Ref Invoice Number:</strong> {invoiceData.refInvoiceNumber || "N/A"}
            </p>
          )}
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
            {invoiceType === "Return Invoice" && <th>Return Quantity</th>}
            <th>Sale Price</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.medicines.map((medicine, index) => {
            // Calculate subtotal dynamically for Return Invoice
            const calculatedSubTotal =
              invoiceType === "Return Invoice"
                ? medicine.salePrice * (medicine.returnqnt || 0) // Calculate Subtotal for Return Invoice
                : medicine.subTotal;

            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{medicine.genericName}</td>
                <td>{medicine.medicineName}</td>
                <td>{medicine.expiry}</td>
                <td>{medicine.batch}</td>
                <td>{medicine.qty}</td>
                {invoiceType === "Return Invoice" && <td>{medicine.returnqnt || 0}</td>}
                <td>{medicine.salePrice}</td>
                <td>{calculatedSubTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Total Amount Section */}
      <div className="dispensaryprint-invoice-amount">
        <p>
          <strong>Total Amount:</strong>{" "}
          {invoiceType === "Return Invoice"
            ? invoiceData.totalAmount || "0.0" // Display return total amount
            : invoiceData.total_amt || "0.0"}{" "}
        </p>
      </div>

      {/* Footer Section */}
      <div className="dispensaryprint-invoice-footer">
        <div>
          <p>
            <strong>Store:</strong> Main Dispensary
          </p>
          <p>
            <strong>Remarks:</strong> N/A
          </p>
          <p>
            <strong>Time:</strong> {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="select-printer">
          <select>
            <option>Select Printer</option>
          </select>
          <button onClick={handlePrint}>OK</button>
        </div>
      </div>

      {/* Print Button */}
      <button
        className="dispensaryprint-invoice-print-button"
        onClick={handlePrint}
      >
        Print Receipt
      </button>  </div>
  );
};

export default SalesInvoice;
