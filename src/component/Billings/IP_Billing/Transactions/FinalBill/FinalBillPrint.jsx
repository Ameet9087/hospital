import React, { useRef,useState,useEffect } from "react";
import "./FinalBillPrint.css"; // Make sure the CSS file is created for styling
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


const FinalBillPrint = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountInWords, setTotalAmountInWords] = useState("");
  const [doctorVisitTotalAmountInWords, setDoctorVisitTotalAmountInWords] = useState("");
  const [doctorVisitTotalAmount, setDoctorVisitTotalAmount] = useState(0);
  const [grossAmountInWords, setGrossAmountInWords] = useState("");


  const printRef = useRef(null);
  const location = useLocation();
  const { patientData,ipBillingData,doctorVisitRows,finalBillDetails,selectedPatientDetails,roomRentTableRows,drVisitsTableRows,investigationTableRows,otPackagesTableRows,pharmacyTableRows,pharmacyRetTableRows,messageTableRows,servicesTableRows   } = location.state || {};

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
      const total = ipBillingData.testGridIpdBill.reduce(
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
      const total = doctorVisitRows.reduce((sum, visit) => sum + visit.netAmt, 0);
      setDoctorVisitTotalAmount(total); // Save total amount in state
      setDoctorVisitTotalAmountInWords(convertNumberToWords(total)); // Convert total amount to words
    } else {
      setDoctorVisitTotalAmount(0);
      setDoctorVisitTotalAmountInWords("Zero");
    }
  }, [doctorVisitRows]);

//   useEffect(() => {
//     const doctorVisitTotal = doctorVisitRows.reduce((total, visit) => total + visit.netAmt, 0);
//     const grossAmount = totalAmount + doctorVisitTotal;
//     setGrossAmountInWords(convertNumberToWords(grossAmount)); // Convert total gross amount to words
//   }, [totalAmount, doctorVisitRows]);

const calculateTotalAmount = (rows) => {
    if (!Array.isArray(rows)) return 0;  // Safe check to avoid errors
    return rows.reduce((total, row) => total + (parseFloat(row.totalAmt) || 0), 0);
  };


  const calculateRowTotalAmount = (rows) => {
    if (!Array.isArray(rows)) return [];  // If rows is undefined or not an array, return an empty array
    return rows.map((row, index) => ({
      ...row,
      sn: index + 1,  // Adding serial number if not present
      totalAmt: parseFloat(row.rate || 0) * parseFloat(row.quantity || 0),
    }));
  };
  // Update services table rows with total amounts
  const updatedServicesTableRows = calculateRowTotalAmount(servicesTableRows);


 
  const totalRoomRent = calculateTotalAmount(roomRentTableRows);
  const totalDoctorVisits = calculateTotalAmount(drVisitsTableRows);
  const totalInvestigations = calculateTotalAmount(investigationTableRows);
  const totalOTPackages = calculateTotalAmount(otPackagesTableRows);
  const totalPharmacy = calculateTotalAmount(pharmacyTableRows);
  const totalPharmacyReturn = calculateTotalAmount(pharmacyRetTableRows);

  const totalServices = calculateTotalAmount(updatedServicesTableRows);


  const totalAmounts = totalRoomRent+totalServices + totalDoctorVisits + totalInvestigations + totalOTPackages + totalPharmacy - totalPharmacyReturn;

  const totalAmountInWordss = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalAmount);

  const renderTable = (title, data, columns) => (
    <div style={{ marginBottom: '20px' }}>
      <h6><b>{title}</b></h6>
      <table className="OpdBillingPrint-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>{row[col.key] || '-'}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                No details available.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length - 2}>Amount Received</td>
            <td>Total Amount</td>
            <td>{calculateTotalAmount(data)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );





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
          <h3>Final Billing</h3>
        </div>
        <div>
          <div className="OpdBillingPrint-bill-info">
            <label htmlFor="">
              Bill Date: <span>{finalBillDetails?.billDate}</span>
            </label>
            <label htmlFor="">
              Bill No: <span>{finalBillDetails?.id}</span>
            </label>
            <label htmlFor="">
              Admission ID: <span>{finalBillDetails?.admissionDTO?.ipAdmmissionId}
              </span>
            </label>
          </div>
        </div>

<br/>
<div className="OpdBillingPrint-info">
  <div className="OpdBillingPrint-left">
    <p>
      Patient Name: <span>{selectedPatientDetails?.firstName} {selectedPatientDetails?.lastName}</span>
    </p>
    <p>
      Bed No: <span>{selectedPatientDetails?.bedNo}</span>
    </p>
    <p>
      Address: <span>{selectedPatientDetails?.address}</span>
    </p>
  </div>
  <div className="OpdBillingPrint-right">
    <p>
      Patient ID: <span>{selectedPatientDetails?.ipAdmmissionId}</span>
    </p>
    <p>
      Mobile No: <span>{selectedPatientDetails?.contactNumber}</span> {/* Assuming you have 'contactNumber' in your data */}
    </p>
  </div>
</div>

       

 
<br/>

<div>
      {renderTable('Room Rent Details', roomRentTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'roomType', label: 'Room Type' },
        { key: 'qty', label: 'QTY' },
        { key: 'rate', label: 'Rate' },
        { key: 'totalAmt', label: 'Amount' },
      ])}

      {renderTable('Doctor Visits', drVisitsTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'doctorName', label: 'Doctor Name' },
        { key: 'qty', label: 'QTY' },
        { key: 'drFree', label: 'Rate' },
        { key: 'totalAmt', label: 'Amount' },
      ])}

        {renderTable('Services', updatedServicesTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'serviceName', label: 'Service Name' },
        { key: 'quantity', label: 'QTY' },
        { key: 'rate', label: 'Rate' },
        { key: 'totalAmt', label: 'Amount' },
        ])}



      {renderTable('Investigations', investigationTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'doctorName', label: 'Referred By' },
        { key: 'qty', label: 'QTY' },
        { key: 'drFree', label: 'Rate' },
        { key: 'totalAmt', label: 'Amount' },
      ])}

      {renderTable('OT Packages', otPackagesTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'operationName', label: 'Operation Name' },
        { key: 'qty', label: 'QTY' },
        { key: 'rate', label: 'Rate' },
        { key: 'totalAmt', label: 'Amount' },
      ])}

      {renderTable('Pharmacy', pharmacyTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'medicineName', label: 'Medicine Name' },
        { key: 'qty', label: 'QTY' },
        { key: 'rate', label: 'Rate' },
        { key: 'totalAmt', label: 'Amount' },
      ])}

      {renderTable('Pharmacy Returns', pharmacyRetTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'medicineName', label: 'Medicine Name' },
        { key: 'qty', label: 'QTY' },
        { key: 'rate', label: 'Rate' },
        { key: 'totalAmt', label: 'Amount' },
      ])}

      {/* {renderTable('Messages', messageTableRows, [
        { key: 'sn', label: 'Sr No' },
        { key: 'msgDate', label: 'Date' },
        { key: 'msgTime', label: 'Time' },
        { key: 'message', label: 'Message' },
      ])} */}

      <div>
        <h5>Final Bill Summary</h5>
        <table className="OpdBillingPrint-table">
          <tfoot>
            <tr>
              <td colSpan="3">
                Amount Received <br />
                RUPEES {totalAmountInWordss.toUpperCase()}
              </td>
              <td>Total Amount</td>
              <td>{totalAmounts}</td>
            </tr>
          </tfoot>
        </table>
      </div>
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

      {/* Print Button */}
      <button onClick={handlePrint} className="OpdBillingPrint-print-button">
        Print Bill
      </button>
    </div>
  );
};

export default FinalBillPrint;
