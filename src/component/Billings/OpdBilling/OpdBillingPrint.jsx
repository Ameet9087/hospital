import React, { useRef } from "react";
import "./OpdBillingPrint.css"; // Make sure the CSS file is created for styling
import { useLocation } from "react-router-dom";

const OpdBillingPrint = (formData) => {
  const printRef = useRef(null);
  console.log(formData);

  // Function to convert number to words
  const convertNumberToWords = (num) => {
    const singleDigits = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const doubleDigits = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousandPowers = ["", "Thousand", "Million", "Billion"];

    if (num === 0) return "Zero";

    let words = "";

    const getWords = (n, index) => {
      if (n === 0) return "";
      if (n < 10) return singleDigits[n] + " ";
      if (n < 20) return doubleDigits[n - 10] + " ";
      if (n < 100) return tens[Math.floor(n / 10)] + " " + getWords(n % 10, 0);
      return (
        singleDigits[Math.floor(n / 100)] + " Hundred " + getWords(n % 100, 0)
      );
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
    <div className="OpdBillingPrint-container">
      {/* Bill Design */}
      <div ref={printRef} className="OpdBillingPrint-data">
        <div className="OpdBillingPrint-header">
          <h2>Hospital</h2>
          <p>
            A/12, Shrenik Park, Opposite Jain Temple,
            <br />
            Shrenik Park Cow Circle, Pune - 390020
            <br />
            Mb. No.: 9727955514
          </p>
          <h3>OPD BILL</h3>
        </div>
        <div>
          <div className="OpdBillingPrint-bill-info">
            <label htmlFor="">
              Bill Date: <span>{formData.formData?.billing_date}</span>
            </label>
            <label htmlFor="">
              Bill No: <span>{formData.formData?.opdBillingId}</span>
            </label>
            <label htmlFor="">
              Consulting Doctor:{" "}
              <span>{formData.formData?.doctorDTO?.doctorName}</span>
            </label>
          </div>
        </div>

        <div className="OpdBillingPrint-info">
          <div className="OpdBillingPrint-left">
            <p>
              Patient Name:{" "}
              <span>
                {formData.formData.outPatientDTO?.patient?.firstName}{" "}
                {formData.formData.outPatientDTO?.patient?.middleName}{" "}
                {formData.formData.outPatientDTO?.patient?.lastName}
              </span>
            </p>
            <p>
              Age: <span>{formData.formData.outPatientDTO?.patient?.age}</span>
            </p>
            <p>
              Address:{" "}
              <span>{formData.formData.outPatientDTO?.patient?.address}</span>
            </p>
          </div>
          <div className="OpdBillingPrint-right">
            <p>
              Gender:{" "}
              <span>{formData.formData.outPatientDTO?.patient?.gender}</span>
            </p>
            <p>
              UHID:{" "}
              <span>{formData.formData.outPatientDTO?.patient?.uhid}</span>
            </p>
            <p>
              Mobile No:{" "}
              <span>
                {formData.formData.outPatientDTO?.patient?.mobileNumber}
              </span>
            </p>
          </div>
        </div>
        {formData.formData?.testGridOpdBillDTO &&
          formData.formData?.testGridOpdBillDTO.length > 0 && (
            <table className="OpdBillingPrint-table">
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>OPD Services Details</th>
                  <th>QTY</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {formData.formData?.testGridOpdBillDTO.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.serviceDetailsDTO.serviceName}</td>
                    <td>{row.quantity}</td>
                    <td>{row.rate}</td>
                    <td>{row.netAmount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={"2"}>
                    Amount Received
                    <br />
                    {convertNumberToWords(formData.formData.totalAmount)}
                  </td>

                  <td colSpan={"2"}>
                    Total Amount by:
                    {formData.formData.paymentModeDTO?.map(
                      (paymentModeObj, index) => (
                        <span className="opdBillingPrint-paymentModes" key={paymentModeObj.opdbillingPaymentModeID}>
                          {paymentModeObj.paymentMode} ({paymentModeObj.amount})
                        </span>
                      )
                    )}
                  </td>
                  <td>{formData.formData.totalAmount}</td>
                </tr>
              </tfoot>
            </table>
          )}

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

      <button onClick={handlePrint} className="OpdBillingPrint-print-button">
        Print Bill
      </button>
    </div>
  );
};

export default OpdBillingPrint;
