import React from "react";
import "./PatientCard.css";

const PatientCard = ({ patient }) => {
  console.log(patient);

  const handlePrint = (e) => {
    e.preventDefault();

    // Get the contents of the div to print
    const printContents = document.getElementById("printable-area").innerHTML;

    // Create an invisible iframe
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    document.body.appendChild(iframe);

    // Write the content to the iframe
    const iframeDoc = iframe.contentWindow || iframe.contentDocument;
    const doc = iframeDoc.document || iframeDoc;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Patient Card</title>
          <link rel="stylesheet" type="text/css" href="PatientCard.css" /> <!-- Include CSS -->
          <style>
            .no-print{
              display:none;
            }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    doc.close();

    // Wait for the iframe to load and then trigger the print dialog
    iframe.onload = () => {
      iframe.contentWindow.focus(); // Focus on the iframe's content
      iframe.contentWindow.print(); // Trigger the print dialog
      document.body.removeChild(iframe); // Remove the iframe after printing
    };
  };

  return (
    <div className="patient-card" id="printable-area">
      <h2 className="patient-header">
        IPD /{" "}
        {patient?.admissionUnderDoctorDetail?.consultantDoctor?.salutation}{" "}
        {patient?.admissionUnderDoctorDetail?.consultantDoctor?.doctorName}
      </h2>
      <p>
        <strong>Patient:</strong> {patient?.patient?.patient?.firstName}{" "}
        {patient?.patient?.patient?.lastName} {patient?.patient?.patient?.age}{" "}
        {patient?.patient?.patient?.ageUnit}/{" "}
        {patient?.patient?.patient?.gender}
      </p>
      <p>
        <strong>Contact:</strong> {patient?.patient?.patient?.mobileNumber} /{" "}
        {patient?.patient?.patient?.address}
      </p>
      <p>
        <strong>IP No.:</strong> {patient?.ipAdmmissionId}
      </p>
      <p>
        <strong>Room/Bed:</strong> {patient?.roomDetails?.roomDTO?.roomNumber} /
        {patient?.roomDetails?.bedDTO?.bedNo}
      </p>
      <p>
        <strong>DOA:</strong> {patient?.admissionDate}
      </p>
      <button
        className="patient-card-print-button no-print"
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
};

export default PatientCard;
