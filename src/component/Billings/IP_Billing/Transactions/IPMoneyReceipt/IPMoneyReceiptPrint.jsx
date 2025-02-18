import React, { useRef } from "react";
import "./IPMoneyReceiptPrint.css"; // Make sure the CSS file is created for styling
import { useLocation } from "react-router-dom";

const IPMoneyReceiptPrint = () => {
  const printRef = useRef(null);
  const location = useLocation();
  const { selectedIPNo, formData, moneyReceiptData } = location.state || {};

  // Function to convert number to words
  const convertNumberToWords = (num) => {
    const singleDigits = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const doubleDigits = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const thousandPowers = ["", "Thousand", "Million", "Billion"];

    if (num === 0) return "Zero";

    let words = "";

    const getWords = (n, index) => {
      if (n === 0) return "";
      if (n < 10) return singleDigits[n] + " ";
      if (n < 20) return doubleDigits[n - 10] + " ";
      if (n < 100) return tens[Math.floor(n / 10)] + " " + getWords(n % 10, 0);
      return singleDigits[Math.floor(n / 100)] + " Hundred " + getWords(n % 100, 0);
    };

    const chunks = [];
    let chunkCount = 0;
    while (num > 0) {
      chunks.push(num % 1000);
      num = Math.floor(num / 1000);
      chunkCount++;
    }

    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i] > 0) {
        words = getWords(chunks[i], 0) + thousandPowers[i] + " " + words;
      }
    }

    return words.trim();
  };

  const handlePrint = () => {
    const printContent = printRef.current; // Access the ref content
    const printWindow = window.open("", "_blank", "width=800,height=600");

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 20px;
            }
            .OpdBillingPrint-container {
              width: 100%;
              max-width: 1000px;
              margin: 0 auto;
            }
            .OpdBillingPrint-bill-info {
              display: flex;
              justify-content: space-between;
            }
            .OpdBillingPrint-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .OpdBillingPrint-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .OpdBillingPrint-info .OpdBillingPrint-left, .OpdBillingPrint-right {
              width: 48%;
            }
            .OpdBillingPrint-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .OpdBillingPrint-table th, .OpdBillingPrint-table td {
              border: 1px solid #000;
              padding: 8px;
              text-align: left;
            }
            .OpdBillingPrint-table th {
              background-color: #f4f4f4;
            }
            .OpdBillingPrint-footer {
              text-align: left;
              margin-top: 20px;
            }
            .OpdBillingPrint-signature {
              text-align: right;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="OpdBillingPrint-container">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div>
      {/* Bill Design */}
      <div ref={printRef} className="OpdBillingPrint-container">
        <div className="OpdBillingPrint-header">
          <h2>Hospital</h2>
          <p>
            A/12, Shrenik Park, Opposite Jain Temple,
            <br />
            Shrenik Park Cow Circle, Pune - 390020
            <br />
            Mb. No.: 9727955514
          </p>
          <h3>Money Receipt</h3>
        </div>
        <div>
          <div className="OpdBillingPrint-bill-info">
            <label htmlFor="">
              Bill Date: <span>{formData?.receiptDate}</span>
            </label>
            <label htmlFor="">
              Bill No: <span>{formData?.id}</span>
            </label>
            <label htmlFor="">
              UHID: <span>{selectedIPNo?.uhid}</span>
            </label>
          </div>
        </div>

        <div className="OpdBillingPrint-info">
          <div className="OpdBillingPrint-left">
            <p>
              Patient Name: <span>{formData?.patientName}</span>
            </p>
            <p>
              Bed No: <span>{formData?.bedNo}</span>
            </p>
            <p>
              Address: <span>{formData?.address}</span>
            </p>
          </div>
          <div className="OpdBillingPrint-right">
            {/* <p>
              Gender: <span></span>
            </p> */}
            <p>
              Patient ID: <span>{formData?.id}</span>
            </p>
            <p>
              Mobile No: <span>{formData?.contactNumber}</span>
            </p>
          </div>
        </div>

        <table className="OpdBillingPrint-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>IPD Details</th>
              <th>QTY</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
      <td>1</td>
      <td>Receipt No: {moneyReceiptData.receiptNo}</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td>2</td>
      <td>IP Admission ID: {moneyReceiptData.ipAdmissionDTO.ipAdmmissionId}</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr> */}
            {moneyReceiptData?.paymentModes?.map((paymentMode, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Payment Mode: {paymentMode.modeName}</td>
                <td>-</td>
                <td>-</td>
                <td>{paymentMode.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={"3"}>
                Amount Received in {moneyReceiptData?.paymentModes?.map(
                  (paymentMode) => paymentMode.modeName
                ).join(", ")}{" "}
                <br />
                RUPEES {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(moneyReceiptData.amount).toUpperCase()}
              </td>
              <td>Total Amount</td>
              <td>{moneyReceiptData.amount}</td>
            </tr>
          </tfoot>
        </table>


        <div className="OpdBillingPrint-footer">
          <p>
            Terms & Conditions:
            <br />
            - Subject to Vadodara Jurisdiction E & OE
            <br />
            - Mediclaim Payment Receipts are provided
            <br />- Discharge Card will be provided once Patient Discharge is
            Done
          </p>
        </div>

        <div className="OpdBillingPrint-signature">
          <p>For, Hospital</p>
        </div>
      </div>

      {/* Print Button */}
      <button onClick={handlePrint} className="OpdBillingPrint-print-button">
        Print Bill
      </button>
    </div>
  );
};

export default IPMoneyReceiptPrint;
