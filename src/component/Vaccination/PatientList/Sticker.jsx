import React from "react";
import "./vaccinationSticker.css";

const Sticker = ({ patient, onClose }) => {
  const printSticker = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .sticker {
              border: 1px solid #000;
              padding: 10px;
              width: 300px;
              margin: 0 auto;
            }
            h2 { margin: 0 0 5px; font-size: 16px; }
            p { margin: 2px 0; font-size: 12px; }
            .print-button {
              display: block;
              margin: 20px auto;
              padding: 10px 20px;
              background-color: #4CAF50;
              color: white;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="sticker">
            <h2>IMMUNIZATION</h2>
            <p>Date: ${patient?.lastVisDate}</p>
            <p>Vacc. Reg. No: ${patient?.vaccinationId}</p>
            <p>Name: ${patient?.babyName}</p>
            <p>BABY'S DOB:</p>
            <p>Address: ${patient?.address}</p>
            <p>Time: ${new Date().toLocaleString()} User: admin
          </div>
          <button class="print-button" onclick="window.print()">Print</button>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="vaccinationSticker__overlay">
      <div className="vaccinationSticker__popup">
        <button onClick={onClose} className="vaccinationSticker__closeButton">
          X
        </button>
        <div className="vaccinationSticker__content">
          <h2>IMMUNIZATION</h2>
          <p>
            Date:{" "}
            {patient?.vaccinationDoses?.length
              ? patient.vaccinationDoses[patient.vaccinationDoses.length - 1]
                  .vaccinationDate
              : null}
          </p>
          <p>Vacc. Reg. No: {patient?.vaccinationId}</p>
          <p>Name: {patient?.babyName}</p>
          <p>BABY'S DOB: {patient?.dateOfBirth}</p>
          <p>Address: {patient?.address}</p>
          <p className="vaccinationSticker_generatedby">
            Time: {new Date().toLocaleString()} User: admin
          </p>
        </div>
        <div className="vaccinationSticker__formActions">
          <button onClick={printSticker}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default Sticker;
