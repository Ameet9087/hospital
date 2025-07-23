import React, { useState, useRef, useEffect } from "react";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import "./OpdPostDiscountPrint.css";

const OpdPostDiscountPrint = ({ formData }) => {
  const printRef = useRef(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});

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
               .OpdPostDiscount-billDetails {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
      }
      
      .OpdPostDiscount-billDetails p {
        font-size: 14px;
        margin: 0px;
        text-align: left;
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
      <div ref={printRef} className="OpdBillingPrint-container">
        <div className="OpdBillingPrint-data">
          <div className="OpdBillingPrint-header">
            <h2>Hospital</h2>
            <p>
              A/12, Shrenik Park, Opposite Jain Temple,
              <br />
              Shrenik Park Cow Circle, Pune - 390020
              <br />
              Mb. No.: 9727955514
            </p>
            <h3>OPD Post Discount</h3>
          </div>
          <div>
            <div className="OpdBillingPrint-bill-info">
              <label htmlFor="">
                Bill Date: <span>{formData?.discountDate}</span>
              </label>
              <label htmlFor="">
                Bill No: <span>{formData?.opdPostDiscountId}</span>
              </label>
              <label htmlFor="">
                Consulting Doctor:{" "}
                <span>
                  {
                    formData?.opdBillingDTO?.outPatientDTO?.addDoctor
                      ?.doctorName
                  }
                </span>
              </label>
            </div>
          </div>

          <div className="OpdBillingPrint-info">
            <div className="OpdBillingPrint-left">
              <p>
                Patient Name:{" "}
                <span>
                  {formData.opdBillingDTO?.outPatientDTO?.patient?.firstName}{" "}
                  {formData.opdBillingDTO?.outPatientDTO?.patient?.lastName}
                </span>
              </p>
              <p>
                Age:{" "}
                <span>
                  {formData.opdBillingDTO?.outPatientDTO?.patient?.age}
                </span>
              </p>
              <p>
                Address:{" "}
                <span>
                  {formData.opdBillingDTO?.outPatientDTO?.patient?.address}
                </span>
              </p>
            </div>
            <div className="OpdBillingPrint-right">
              <p>
                Patient ID:{" "}
                <span>
                  {formData.opdBillingDTO?.outPatientDTO?.patient?.uhid}
                </span>
              </p>
              <p>
                Gender:{" "}
                <span>
                  {formData.opdBillingDTO?.outPatientDTO?.patient?.gender}
                </span>
              </p>

              <p>
                Mobile No:{" "}
                <span>
                  {formData.opdBillingDTO?.outPatientDTO?.patient?.mobileNumber}
                </span>
              </p>
            </div>
          </div>
          {formData && formData.testGridPostDiscountbillDTO?.length > 0 && (
            <table className="OpdBillingPrint-table" ref={tableRef}>
              <thead>
                <tr>
                  {[
                    "SN",
                    "Rate",
                    "Quantity",
                    "Service Name",
                    "Net Amt",
                    "Post Disc Percent",
                    "Disc Amt",
                    "Post Net Amt",
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
                {formData?.testGridPostDiscountbillDTO.map((item, subIndex) => {
                  return (
                    <tr key={subIndex}>
                      <td>{subIndex + 1}</td>
                      <td>{item.rate}</td>
                      <td>{item.quantity}</td>
                      <td>{item.serviceName || ""}</td>
                      <td>{item.netAmt || 0}</td>
                      <td>{item.postDiscPercent || 0}</td>
                      <td>{item.discAmt || 0}</td>
                      <td>{item.postNetAmt || 0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <br></br>
          <div className="OpdPostDiscount-billDetails">
            <p>
              <strong>Authorized Person Name:</strong>{" "}
              {formData.discountAuthorityDTO?.authorizationName || "N/A"}
            </p>
            <p>
              <strong>Total Amount:</strong> {formData?.totalAmount || 0}
            </p>
            <p>
              <strong>Discount Percentage:</strong>{" "}
              {formData?.discountPercentage || 0}%
            </p>
            <p>
              <strong>Discount Amount:</strong> {formData?.discountAmount || 0}
            </p>
            <p>
              <strong>After Discount Total Amount:</strong>{" "}
              {formData?.afterDiscountTotalAmount || 0}
            </p>
            <p>
              <strong>Amount to be Paid:</strong>{" "}
              {formData?.refundedAmount || 0}
            </p>
          </div>
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
      </div>
      <button onClick={handlePrint} className="OpdBillingPrint-print-button">
        Print Bill
      </button>
    </div>
  );
};

export default OpdPostDiscountPrint;
