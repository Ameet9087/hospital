import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import "./OpdBillingCancellationPrint.css"; // Make sure the CSS file is created for styling
import { useLocation } from "react-router-dom";

const OPDBillingCancellationPrint = ({ formData }) => {
  console.log(formData);

  const printRef = useRef(null);
  const location = useLocation();
  const {
    selectedBillNo,
    selecteddiscAuthority,
    requestBodyPrint,
    selectedBillingData,
  } = location.state || {};
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});

  console.log(requestBodyPrint, "req prachi");
  // console.log(selectedBillingData,"req bill prachi");

  const dateObject = new Date(formData.cancelDate);
  const formattedDate = dateObject.toISOString().split("T")[0];

  const [testGridTableRowsableRows] = useState([
    {
      authorizedPersonName: `${selecteddiscAuthority?.employee?.firstName} ${selecteddiscAuthority?.employee?.lastName}`,
      totalAmount: selectedBillingData?.originalobj?.totalAmount,
      discountPercentage: 5,
      amountToBePaid:
        selectedBillingData?.originalobj?.totalAmount -
        selectedBillingData?.originalobj?.financialDiscAmt,
      discountDate: selectedBillingData?.billing_date,
      // billPaid: selectedBillingData?.paymentModeDTO[0]?.paymentMode === "cash" ? "Yes" : "No",
      fileCharges: "50.00",
      paymode: "cash",
    },
  ]);

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

  const safeToFixed = (value) => {
    return typeof value === "number" ? value.toFixed(2) : "0.00";
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

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500); // Delay for 500ms
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
          <h3>OPD {formData?.cancelType} bill</h3>
        </div>
        <div>
          <div className="OpdBillingPrint-bill-info"></div>
        </div>

        <div className="OpdBillingPrint-info">
          <div className="OpdBillingPrint-left">
            <p>
              Patient Name:{" "}
              <span>
                {formData?.opdBillingDTO?.outPatientDTO?.patient?.firstName}{" "}
                {formData?.opdBillingDTO?.outPatientDTO?.patient?.lastName}
              </span>
            </p>
            <p>
              Patient ID:{" "}
              <span>
                {
                  formData?.opdBillingDTO?.outPatientDTO?.patient
                    ?.patientRegistrationId
                }
              </span>
            </p>
          </div>
          <div className="OpdBillingPrint-right">
            <label htmlFor="">
              Bill Date: <span>{formattedDate}</span>
            </label>
            <label htmlFor="">
              Bill No: <span>{formData?.opdBillingRefundCancellationId}</span>
            </label>
            <p>
              Age:{" "}
              <span>
                {formData?.opdBillingDTO?.outPatientDTO?.patient?.age}{" "}
                {formData?.opdBillingDTO?.outPatientDTO?.patient?.ageUnit}
              </span>
            </p>
            {/* <p>
              Gender: <span>{formData?.opdBillingDTO?.outPatientDTO?.patient?.gender}</span>
            </p>
            <p>
              Relation: <span>{formData?.opdBillingDTO?.outPatientDTO?.patient?.relation}</span>
            </p> */}
          </div>
        </div>
        <h6>Bill {formData?.cancelType} Details</h6>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Received By",
                "File Charges",
                "Total Due",
                "Adjust Amount",
                "Refundable Amount",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData?.receivedby} </td>
              <td>{formData?.fileCharges}</td>
              {/* <td>{requestBodyPrint.paymentMode }</td> */}
              <td>{safeToFixed(formData?.totalDue)}</td>
              <td>{formData?.adjustAmount}</td>
              <td>{safeToFixed(formData?.refundableAmount)}</td>
            </tr>
          </tbody>
        </table>

        <br></br>
        <div></div>
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

export default OPDBillingCancellationPrint;
