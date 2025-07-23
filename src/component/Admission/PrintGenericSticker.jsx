import React, { useRef, useState } from "react";
import "./printGenericSticker.css";
import Barcode from "react-barcode";

function PrintGenericSticker({ patient }) {
  const iframeRef = useRef(null);
  const [numOfPrints, setNumOfPrints] = useState(1); // State to store the number of prints

  const handlePrint = () => {
    const iframe = iframeRef.current;
    const doc = iframe.contentWindow.document;

    // Prepare the content to be printed multiple times based on numOfPrints
    let patientInfoHTML = "";
    for (let i = 0; i < numOfPrints; i++) {
      patientInfoHTML += `
        <div style="font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; font-weight:bold; padding: 5px; border: 1px dashed black; margin-bottom:5px">
          <div>
            <p style="margin:5px">${patient?.patient?.patient?.firstName} ${patient?.patient?.patient?.age} ${patient?.patient?.patient?.ageUnit} / ${patient?.patient?.patient?.gender}</p>
            <p style="margin:5px"><strong>Ward:</strong> ${patient.roomDetails?.roomDTO?.roomNumber} / ${patient.roomDetails?.bedDTO?.bedNo}</p>
            <p style="margin:5px"><strong>Consultant:</strong> ${patient.admissionUnderDoctorDetail.consultantDoctor?.salutation}
            ${patient.admissionUnderDoctorDetail?.consultantDoctor?.doctorName}</p>
          </div>
          <div>
            <svg id="barcode-${i}"></svg>
          </div>
        </div>
      `;
    }

    // Write the HTML to the iframe and generate the barcodes
    doc.open();
    doc.write(`
      <html>
        <head>
          <title>Print Generic Sticker</title>
        </head>
        <body>
        <div style="display:flex;flex-wrap:wrap;">
          ${patientInfoHTML}
          <div>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.5/JsBarcode.all.min.js"></script>
          <script>
            window.onload = function() {
              for (let i = 0; i < ${numOfPrints}; i++) {
                JsBarcode("#barcode-" + i, "${patient?.patient?.patient?.uhid}", {width: 2, height: 15, displayValue:false});
              }
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    doc.close();
  };

  const handleIframeLoad = () => {
    handlePrint();
  };

  return (
    <>
      <div className="printGenericWindowContainer">
        <div className="printGenericWindowData">
          <p>
            Patient Name : {patient?.patient?.patient?.firstName}{" "}
            {patient?.patient?.patient?.lastName}{" "}
            {patient?.patient?.patient?.age}{" "}
            {patient?.patient?.patient?.ageUnit} /{" "}
            {patient?.patient?.patient?.gender}
          </p>
          <p>Uhid : {patient?.patient?.patient?.uhid}</p>
          <p>
            Room/Bed : {patient.roomDetails?.roomDTO?.roomNumber} {" / "}
            {patient.roomDetails?.bedDTO?.bedNo}
          </p>
          <p>
            Admitting Dr :{" "}
            {patient.admissionUnderDoctorDetail.consultantDoctor?.salutation}{" "}
            {patient.admissionUnderDoctorDetail?.consultantDoctor?.doctorName}{" "}
            {/* {patient.admissionUnderDoctorDetail?.consultantDoctor?.} */}
          </p>
          <p>
            DOA/TOA : {patient.admissionDate} {"/"} {patient.admissionTime}
            {/* {patient.admissionUnderDoctorDetail?.consultantDoctor?.} */}
          </p>
          <div className="printGenericStickerBarcode">
            <Barcode
              value={patient?.patient?.patient?.uhid}
              width={2}
              height={30}
              displayValue={false}
            />
          </div>
        </div>
        {/* Hidden iframe for printing */}
        <iframe
          ref={iframeRef}
          style={{ display: "none" }}
          onLoad={handleIframeLoad}
        />
      </div>
      <label>
        No of Prints :
        <input
          type="number"
          className="printGenericInputBox"
          min={1}
          value={numOfPrints}
          onChange={(e) => setNumOfPrints(e.target.value)}
        />
      </label>
      <button className="printGenericWindowBTN" onClick={handlePrint}>
        Print
      </button>
    </>
  );
}

export default PrintGenericSticker;
