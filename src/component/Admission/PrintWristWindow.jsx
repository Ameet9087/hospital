import React, { useRef } from "react";
import QRCode from "react-qr-code";
import "./printWristWindow.css";

function PrintWristWindow({ patient }) {
  const iframeRef = useRef(null);

  const handlePrint = () => {
    const iframe = iframeRef.current;
    const doc = iframe.contentWindow.document;
    const patientInfo = `
      <div style="display:flex; gap:20px, font-family: Arial, sans-serif; padding: 20px; border: 1px dashed black; width: 600px;">
        <div>
          <p><strong>Name:</strong> ${patient?.patient?.patient?.firstName}</p>
          <p><strong>Age:</strong> ${patient?.patient?.patient?.age} ${patient?.patient?.patient?.ageUnit}</p>
          <p><strong>Gender:</strong> ${patient?.patient?.patient?.gender}</p>
          <p><strong>DOB:</strong> ${patient?.patient?.patient?.dateOfBirth}</p>
          <p><strong>DOA:</strong> ${patient?.admissionDate}</p>
        </div>
        <div>
          <p><strong>IP No.:</strong> ${patient?.patient?.patient?.inPatientId}</p>
          <p><strong>Ward:</strong> ${patient.roomDetails?.roomDTO?.roomNumber} / ${patient.roomDetails?.bedDTO?.bedNo}</p>
          <p><strong>Blood Group:</strong> ${patient?.patient?.patient?.bloodGroup}</p>
          <p><strong>Consultant:</strong> ${patient.admissionUnderDoctorDetail.consultantDoctor?.salutation} 
            ${patient.admissionUnderDoctorDetail?.consultantDoctor?.doctorName}</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <div id="qr-code"></div>
        </div>
      </div>
    `;
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Wristband</title>
        </head>
        <body>
          ${patientInfo}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
          <script>
            var qrCode = new QRCode(document.getElementById("qr-code"), {
              text: "Name: ${patient?.patient?.patient?.firstName} ${patient?.patient?.patient?.lastName}, IP No.: ${patient?.patient?.patient?.patientId}",
              width: 100,
              height: 100,
            });
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const patientInfo = `Name: ${patient?.patient?.patient?.firstName} ${patient?.patient?.patient?.lastName}
  Age: ${patient?.patient?.patient?.age} ${patient?.patient?.patient?.ageUnit}
  Gender: ${patient?.patient?.patient?.gender}
  IP No.: ${patient?.patient?.patient?.patientId}
  Ward: ${patient.roomDetails?.roomDTO?.roomNumber} / ${patient.roomDetails?.bedDTO?.bedNo}`;

  const handleIframeLoad = () => {
    // Ensure the iframe has loaded before attempting to write t    o its document
    handlePrint();
  };

  return (
    <>
      <div className="printWristWindowContainer">
        <div className="printWristWindowData_1">
          <p>Name : {patient?.patient?.patient?.firstName}</p>
          <p>
            Age : {patient?.patient?.patient?.age}{" "}
            {patient?.patient?.patient?.ageUnit}
          </p>
          <p>Gender : {patient?.patient?.patient?.gender}</p>
          <p>DOB : {patient?.patient?.patient?.dateOfBirth}</p>
          <p>DOA : {patient?.admissionDate}</p>
        </div>
        <div className="printWristWindowData_2">
          <p>IP No. : {patient?.patient?.patient?.inPatientId}</p>
          <p>
            {patient.roomDetails?.roomDTO?.roomNumber}
            {" / "}
            {patient.roomDetails?.bedDTO?.bedNo}
          </p>
          <p>Blood Group : {patient?.patient?.patient?.bloodGroup}</p>
          <p>
            Consultant :
            {patient.admissionUnderDoctorDetail.consultantDoctor?.salutation}
            {patient.admissionUnderDoctorDetail?.consultantDoctor?.doctorName}
          </p>
        </div>
        <div>
          <QRCode value={patientInfo} size={100} />
        </div>
        <iframe
          ref={iframeRef}
          style={{ display: "none" }} // Hide iframe from the main UI
          onLoad={handleIframeLoad}
        />
      </div>
      <button className="printWristWindowBTN" onClick={handleIframeLoad}>
        Print
      </button>
    </>
  );
}

export default PrintWristWindow;
