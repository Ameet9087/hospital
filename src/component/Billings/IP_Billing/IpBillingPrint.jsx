import React, { useRef, useState, useEffect } from "react";
import "./IpBillingPrint.css"; // Make sure the CSS file is created for styling
import { useLocation } from "react-router-dom";

const convertNumberToWords = (num) => {
  const a = [
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
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const thousand = ["", "Thousand", "Million", "Billion"];

  if (num === 0) return "Zero";

  const getWords = (n, suffix) => {
    if (n === 0) return "";
    let str = "";
    if (n < 20) str += a[n];
    else {
      str += b[Math.floor(n / 10)];
      if (n % 10) str += " " + a[n % 10];
    }
    return str + (suffix ? " " + suffix : "");
  };

  let word = "";
  let i = 0;
  while (num > 0) {
    const rem = num % 1000;
    if (rem > 0) word = getWords(Math.floor(rem / 100), "Hundred") + " " + getWords(rem % 100) + " " + thousand[i] + " " + word;
    num = Math.floor(num / 1000);
    i++;
  }

  return word.trim();
};


const IpBillingPrint = ({ formData }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountInWords, setTotalAmountInWords] = useState("");
  const [doctorVisitTotalAmountInWords, setDoctorVisitTotalAmountInWords] = useState("");
  const [doctorVisitTotalAmount, setDoctorVisitTotalAmount] = useState(0);
  const [grossAmountInWords, setGrossAmountInWords] = useState("");


  const printRef = useRef(null);
  const location = useLocation();
  const { patientData, ipBillingData, doctorVisitRows } = location.state || {};

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

  useEffect(() => {
    if (ipBillingData?.testGridIpdBill?.length > 0) {
      // Calculate the total amount dynamically
      const total = ipBillingData?.testGridIpdBill?.reduce(
        (sum, service) => sum + service.rate * service.quantity,
        0
      );
      setTotalAmount(total); // Save total amount in state
      setTotalAmountInWords(convertNumberToWords(total)); // Convert total amount to words
    } else {
      setTotalAmount(0);
      setTotalAmountInWords("Zero");
    }
  }, [ipBillingData]);

  useEffect(() => {
    if (doctorVisitRows?.length > 0) {
      // Calculate the total amount dynamically for doctor visits
      const total = doctorVisitRows?.reduce((sum, visit) => sum + visit.netAmt, 0);
      setDoctorVisitTotalAmount(total); // Save total amount in state
      setDoctorVisitTotalAmountInWords(convertNumberToWords(total)); // Convert total amount to words
    } else {
      setDoctorVisitTotalAmount(0);
      setDoctorVisitTotalAmountInWords("Zero");
    }
  }, [doctorVisitRows]);

  useEffect(() => {
    // Calculate the total gross amount
    const doctorVisitTotal = doctorVisitRows?.reduce((total, visit) => total + visit.netAmt, 0);
    const grossAmount = totalAmount + doctorVisitTotal;
    setGrossAmountInWords(convertNumberToWords(grossAmount)); // Convert total gross amount to words
  }, [totalAmount, doctorVisitRows]);



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
          <h3>IP Billing</h3>
        </div>
        <div>
          <div className="OpdBillingPrint-bill-info">
            <label htmlFor="">
              Bill Date: <span>{ipBillingData?.billingDate}</span>
            </label>
            <label htmlFor="">
              Bill No: <span>{ipBillingData?.id}</span>
            </label>
            <label htmlFor="">
              Admission ID: <span>{ipBillingData?.ipAdmission?.ipAdmmissionId}
              </span>
            </label>
          </div>
        </div>

        <div className="OpdBillingPrint-info">
          <div className="OpdBillingPrint-left">
            <p>
              Patient Name: <span>{patientData?.patient?.patient?.firstName} {patientData?.patient?.lastName}</span>
            </p>
            <p>
              Bed No: <span>{patientData?.roomDetails?.bedDTO?.bedNo}</span>
            </p>
            <p>
              Address: <span>{patientData?.patient?.patient?.address}</span>
            </p>
          </div>
          <div className="OpdBillingPrint-right">
            {/* <p>
              Gender: <span></span>
            </p> */}
            <p>
              Patient ID: <span>{ipBillingData?.ipAdmission?.ipAdmmissionId}</span>
            </p>
            <p>
              Mobile No: <span>{patientData?.patient?.patient?.contactNumber}</span>
            </p>
          </div>
        </div>

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
            {ipBillingData?.testGridIpdBill?.length > 0 ? (
              ipBillingData.testGridIpdBill.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.serviceName}</td>
                  <td>{service.quantity}</td>
                  <td>{service.rate}</td>
                  <td>{service.rate * service.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No billing details available.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={"3"}>
                Amount Received <br />
                RUPEES {totalAmountInWords.toUpperCase()}
              </td>
              <td>Total Amount</td>
              <td>{totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        <table className="DoctorVisitPrint-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Date</th>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Rate</th>
              <th>QTY</th>
              <th>Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {doctorVisitRows?.length > 0 ? (
              doctorVisitRows.map((visit, index) => (
                <tr key={index}>
                  <td>{visit.sn}</td>
                  <td>{visit.date || "N/A"}</td>
                  <td>{visit.doctorName}</td>
                  <td>{visit.specialization}</td>
                  <td>{visit.rate || visit.generalOpdFee}</td>
                  <td>{visit.qty}</td>
                  <td>{visit.netAmt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No doctor visit details available.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={"5"} style={{ textAlign: "center" }}>
                Amount Received <br />
                RUPEES {doctorVisitTotalAmountInWords.toUpperCase()}
              </td>

              <td style={{ textAlign: "right" }}>
                Total Amount
              </td>
              <td>
                {doctorVisitTotalAmount}
              </td>
            </tr>
            {/* <tr>
          <td colSpan="6" style={{ textAlign: "right" }}>
            Amount in Words
          </td>
          <td>
            {doctorVisitTotalAmountInWords.toUpperCase()}
          </td>
        </tr> */}
          </tfoot>
        </table>
        <br />

        <table className="GrossAmountPrint-table">
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>OPD Services Total</td>
              <td>{totalAmount}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Doctor Visits Total</td>
              <td>
                {doctorVisitRows?.reduce((total, visit) => total + visit.netAmt, 0)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" style={{ textAlign: "right" }}>
                <strong>Gross Amount</strong>
              </td>
              <td>
                <strong>
                  {totalAmount + doctorVisitRows?.reduce((total, visit) => total + visit.netAmt, 0)}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "right" }}>
                <strong>Amount in Words</strong>
              </td>
              <td>
                <strong>{grossAmountInWords.toUpperCase()} </strong>
              </td>
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

export default IpBillingPrint;
