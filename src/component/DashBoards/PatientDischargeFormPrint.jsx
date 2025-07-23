import React, { useRef } from "react";
import "./PatientDischargeFormPrint.css"; // External CSS file

const PatientDischargeFormPrint = ({ data, patient }) => {
  console.log(data);
  console.log(patient);

  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML; // Get the content inside the ref
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none"; // Hide the iframe

    document.body.appendChild(iframe); // Add the iframe to the body

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            /* Add your custom print styles here */
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            h1, h2, h3 {
              margin: 0;
              padding: 0;
            }
            .PatientDischargeForm-signature {
              margin-top: 50px;
            }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  return (
    <div className="PatientDischargeForm-container">
      <div ref={printRef}>
        <h1 className="PatientDischargeForm-title">Discharge Summary</h1>

        <div className="PatientDischargeForm-section">
          <h2 className="PatientDischargeForm-section-title">
            To be filled in by nurse
          </h2>
          <p>
            <strong>
              Name:
              {`${patient?.firstName || patient?.patientDTO?.firstName} ${
                patient?.lastName || patient?.patientDTO?.lastName
              }`}
            </strong>
          </p>
          <p>
            <strong>Age:</strong>
            {patient?.patientDTO?.age}
          </p>
          <p>
            <strong>Sex:</strong> {patient?.patientDTO?.gender}
          </p>
          <p>
            <strong>Address:</strong>
            {patient?.patientDTO?.address}{" "}
          </p>
          <p>
            <strong>Date of Discharge:</strong>
            {data.dischargeDate}
          </p>
          <p>
            <strong>Date of Admission:</strong> {patient.admissionDate}
          </p>
        </div>

        <div className="PatientDischargeForm-section">
          <h2 className="PatientDischargeForm-section-title">
            To be filled by Doctor
          </h2>
          <p>
            <strong>Discharge Type:</strong>
            {data?.dischargedType}
          </p>
          <p>
            <strong>Discharge Condition:</strong>
            {data?.conditionOnDischarge}
          </p>
          <p>
            <strong>Dr.:</strong>
            {data.consultant}
          </p>
          <p>
            <strong>Resident Dr.:</strong>
            {data?.residentDr}
          </p>

          <h3>Investigations:</h3>
          <h4>Lab Tests:</h4>
          <ul>
            {JSON.parse(data?.labTests || "[]").map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
          <h4>Imaging:</h4>
          <ul>
            {JSON.parse(data?.imaging || "[]").map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
          <h4>Medication:</h4>
          <ul>
            {JSON.parse(data?.medications || "[]").map((medication, index) => (
              <div key={index}>
              <p>Name: {medication.name}</p>
              <p>Dosage: {medication.dosage}</p>
              <p>Frequency: {medication.frequency}</p>
            </div>
            ))}
          </ul>
        </div>

        <p>
          <strong>Date:</strong>{data.dischargeDate}
        </p>
        <p className="PatientDischargeForm-signature">Signature of M.O:</p>
      </div>

      <button
        className="PatientDischargeForm-print-button"
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
};

export default PatientDischargeFormPrint;
