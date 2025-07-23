import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Barcode from "react-barcode";
import "./sampleCodePopup.css";

const SampleCodePopup = ({
  isOpen,
  onClose,
  data,
  barcodeValue,
  runNumber,
}) => {
  const [copies, setCopies] = useState(1);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const printRef = useRef(null);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!isOpen) return null;

  const safeBarcodeValue = barcodeValue || "";
  const safeRunNumber = runNumber || "";

  const handlePrint = () => {
    let stickersContent = "";
    for (let i = 0; i < copies; i++) {
      const content = document.getElementById(
        "samplecodepopup-barcode"
      ).innerHTML;
      stickersContent += `<div style='display:flex; flex-direction:column; align-items:center; border:1px dashed black; margin-bottom: 10px;'>${content}</div>`;
    }

    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.write(
      "<html><head><title>Print Sticker</title></head><body>"
    );
    printWindow.document.write(
      "<div style='display:flex; gap:5px; flex-wrap:wrap;'>"
    );
    printWindow.document.write(stickersContent);
    printWindow.document.write("</div>");
    printWindow.document.write("</body></html>");

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handlePrintEmptySheet = () => {
    const content = document.getElementById(
      "samplecodepopup-emptysheet-info"
    ).outerHTML;

    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Sticker</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            .bg-gray-100 {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <div style='display:flex; flex-direction:column;'>
            <div style='display:flex; justify-content:space-between;'>
              <div style='padding:0px'>
                <p>Patient Name : ${
                  data?.outPatient?.patient?.firstName ||
                  data?.inPatient?.patient?.firstName
                } ${
      data?.outPatient?.patient?.lastName || data?.inPatient?.patient?.lastName
    }</p>
                <p>Address : ${
                  data?.outPatient?.patient?.address ||
                  data?.inPatient?.patient?.address
                }</p>
                <p>Prescribed By : ${
                  data?.prescriber != ""
                    ? data?.prescriber?.salutation +
                      data?.prescriber?.doctorName
                    : "SELF"
                }</p>
                <p>Lab No: ${safeRunNumber}</p>
              </div>
              <div>
                <p>Patient No. : ${
                  data?.outPatient?.patient?.outPatientId ||
                  data?.inPatient?.patient?.inPatientId
                }</p>
                <p>Age/Sex : ${
                  data?.outPatient?.patient?.age ||
                  data?.inPatient?.patient?.age
                } Y/${
      data?.outPatient?.patient?.gender || data?.inPatient?.patient?.gender
    }</p>
                <p>Receiving Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
                <Barcode value=${safeBarcodeValue}/>
              </div>
            </div>
            ${content}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="samplecodepopup-overlay">
      <div className="samplecodepopup-container">
        <div className="samplecodepopup-header">
          <h2 className="samplecodepopup-title">
            Sample Code generated successfully
          </h2>
          <button onClick={onClose} className="samplecodepopup-close-button">
            <X />
          </button>
        </div>

        {/* Patient Information */}
        <div className="samplecodepopup-patient-info">
          <p>
            <strong>Patient Name:</strong>{" "}
            {data?.outPatient?.patient?.firstName ||
              data?.inPatient?.patient?.firstName}{" "}
            {data?.outPatient?.patient?.lastName ||
              data?.inPatient?.patient?.lastName}
          </p>
        </div>

        {/* Sample Information Table */}
        <div className="samplecodepopup-divided" ref={printRef}>
          <table
            id="samplecodepopup-emptysheet-info"
            className="samplecodepopup-table"
          >
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">Test Name</th>
                <th className="text-left p-2">Run Number</th>
                <th className="text-left p-2">BarCodeNumber</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td className="p-2">
                  {data?.labTests && Array.isArray(data.labTests)
                    ? data.labTests
                        .map((item) => item.labTestName)
                        .filter(Boolean)
                        .join(", ")
                    : "No Lab Tests Available"}
                </td> */}
                <td className="p-2">{safeBarcodeValue}</td>
                <td className="p-2">{safeBarcodeValue}</td>
              </tr>
            </tbody>
          </table>

          {/* Barcode Information */}
          <div className="samplecodepopup-barcode-container">
            <div
              className="samplecodepopup-barcode-info"
              id="samplecodepopup-barcode"
            >
              <p>
                {data?.outPatient?.patient?.firstName ||
                  data?.inPatient?.patient?.firstName}{" "}
                {data?.outPatient?.patient?.lastName ||
                  data?.inPatient?.patient?.lastName}{" "}
                {data?.outPatient?.patient?.age ||
                  data?.inPatient?.patient?.age}{" "}
                Y/
                {data?.outPatient?.patient?.gender ||
                  data?.inPatient?.patient?.gender}
              </p>
              <Barcode width={2} height={30} value={safeBarcodeValue} />
              <p>
                RN: {safeBarcodeValue} | {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>

            {/* Number of copies and Print Button */}
            <div className="samplecodepopup-copies">
              <label className="mr-2">No. of copies:</label>
              <input
                type="number"
                value={copies}
                onChange={(e) => setCopies(parseInt(e.target.value))}
                className="border p-1 w-16"
                min="1"
              />
              <button
                onClick={handlePrint}
                className="samplecodepopup-print-button"
              >
                <span className="mr-2">Print</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="samplecodepopup-footer">
          <div>
            <button
              onClick={handlePrintEmptySheet}
              className="samplecodepopup-empty-sheet-button"
            >
              Print Empty Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleCodePopup;
