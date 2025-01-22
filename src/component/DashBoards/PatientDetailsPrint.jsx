import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { FiDownload, FiRotateCcw, FiPrinter } from "react-icons/fi";
import axios from "axios";
import "./PatientDetailsPrint.css";

const PatientDetailsPrint = () => {
  const [rotateAngle, setRotateAngle] = useState(0);
  const [selectedPages, setSelectedPages] = useState({
    page1: true,
    page2: true,
    page3: true,
    page4: true,
    page5: true,
  });
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("http://82.180.163.53:1415/api/ip-admissions")
      .then((response) => {
        // Check if the response contains data
        if (response.data && response.data.length > 0) {
          setPatientData(response.data[0]); // Assuming the first item is the patient
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, []);

  const handleCheckboxChange = (page) => {
    setSelectedPages((prev) => ({
      ...prev,
      [page]: !prev[page],
    }));
  };

  const handlePrint = () => {
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
            }
            .patientDetailsPrint-container {
              padding: 20px;
            }
            .patientDetailsPrint-page {
              page-break-before: always;
              margin: 20px 0;
              padding: 15px;
            }
            .patientDetailsPrint-content {
              padding: 15px;
            }
            .patientDetailsPrint-content{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 20px;
                }
                .patientDetailsPrint-details{
                  display: flex;
                  gap: 10px;
                }
                .patientDetailsPrint-image{
                  width: 100px;
                  height: 100px;
                  border: 1px solid black;
                }
                .patientDetailsPrint-visit{
                  margin-top: 5px;
                  height: 60px;
                  width: 100px;
                  border: 1px solid black;
                }
            @media print {
              .page-checkbox{
                display: none; /* Hide checkboxes during print */
              }
              .patientDetailsPrint-page {
                border: none; /* Remove border from the page wrapper */
              }
              .patientDetailsPrint-pdf-container{
              background:none;
              }
              
            }
          </style>
        </head>
        <body>
          <div class="patientDetailsPrint-container">
            ${Object.keys(selectedPages)
              .filter((key) => selectedPages[key])
              .map(
                (page) =>
                  `<div class="patientDetailsPrint-page">${
                    document.getElementById(`patientDetailsPrint-${page}`)
                      .outerHTML
                  }</div>`
              )
              .join("")}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleDownload = () => {
    const doc = new jsPDF("p", "mm", "a4"); // A4 size in portrait orientation
  
    // We will set custom styling to remove borders and set proper width/height
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-size: 12px;
              margin: 0;
              padding: 0;
            }
            .patientDetailsPrint-container {
              padding: 0;
              margin: 0;
              border: none !important; /* Removing borders */
            }
            .patientDetailsPrint-page {
              margin: 0;
              padding: 0;
              border: none !!important; 
              page-break-before: always; 
            }
            .page-checkbox {
            display: none;
            }
          </style>
        </head>
        <body>
          <div class="patientDetailsPrint-container">
            ${Object.keys(selectedPages)
              .filter((key) => selectedPages[key])
              .map(
                (page) =>
                  `<div class="patientDetailsPrint-page" style="width: 210mm; height: 297mm; border:none;">${
                    document.getElementById(`patientDetailsPrint-${page}`).outerHTML
                  }</div>`
              )
              .join("")}
          </div>
        </body>
      </html>
    `;
  
    // Use `jsPDF` to render the above HTML into a PDF
    doc.html(htmlContent, {
      callback: function () {
        doc.save("Patient_Details_Prints.pdf"); // Save the PDF
      },
      x: 10, // Horizontal margin
      y: 10, // Vertical margin
      width: 180, // Adjusted width (A4 size - margins)
      autoPaging: true, // Enable automatic pagination
      windowWidth: 900, // Set window width for proper rendering
    });
  };

  const handleRotate = () => {
    setRotateAngle((prev) => (prev + 90) % 360);
  };

  // Add a check here to handle the case when patientData or patientData.patient is not available yet
  if (!patientData || !patientData.patient) return <div>Loading...</div>;

  return (
    <div className="patientDetailsPrint-container">
      <div className="patientDetailsPrint-navbar">
        <a onClick={handlePrint}>
          <FiPrinter /> Print
        </a>
        <a onClick={handleDownload}>
          <FiDownload /> Download
        </a>
        <a onClick={handleRotate}>
          <FiRotateCcw /> Rotate
        </a>
      </div>

      <div
        className="patientDetailsPrint-pdf-container"
        style={{
          transform: `rotate(${rotateAngle}deg)`,
          transition: "transform 0.3s ease-in-out",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        {/* Page 1 */}
        <div
          className="patientDetailsPrint-page"
          id="patientDetailsPrint-page1"
        >
          <input
            type="checkbox"
            className="page-checkbox"
            checked={selectedPages.page1}
            onChange={() => handleCheckboxChange("page1")}
          />

          <h2>Patient Details</h2>
          <div className="patientDetailsPrint-content">
            <div>
              <div className="patientDetailsPrint-image">
                <img
                  src=""
                  alt="Patient Image"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              <div className="patientDetailsPrint-visit">
                <label>No Of Visits:</label>
                <span>{patientData.patient.age}</span>
              </div>
            </div>
            <div className="patientDetailsPrint-details">
              <div>
                <label>Name:</label>
                <span>{`${patientData.patient.firstName} ${patientData.patient.middleName} ${patientData.patient.lastName}`}</span>
                <br />
                <label>Gender:</label>
                <span>{patientData.patient.gender}</span>
                <br />
                <label>DOB:</label>
                <span>{patientData.patient.dateOfBirth}</span>
                <br />
                <label>Relative:</label>
                <span>{patientData.patient.guarantorDTO.guarantorName}</span>
                <br />
                <label>Religion:</label>
                <span>{patientData.patient.religion}</span>
                <br />
                <label>Email:</label>
                <span>{patientData.patient.email}</span>
                <br />
                <label>Mobile No:</label>
                <span>{patientData.patient.phoneNumber}</span>
                <br />
                <label>Address:</label>
                <span>{patientData.patient.address}</span>
              </div>
              <div>
                <label>MR NO:</label>
                <span>{patientData.patient.uhid}</span>
                <br />
                <label>Reg Date:</label>
                <span>{patientData.admissionDate}</span>
                <br />
                <label>Age:</label>
                <span>{patientData.patient.age}</span>
                <br/>
                <label>Barcode:</label>
                <span>| || ||| |</span>
              </div>
            </div>
          </div>
        </div>
          {/* Page 2 */}
          <div
          className="patientDetailsPrint-page"
          id="patientDetailsPrint-page2"
        >
          <input
            type="checkbox"
            className="page-checkbox"
            checked={selectedPages.page2}
            onChange={() => handleCheckboxChange("page2")}
          />
          <h2>Medical History</h2>
          <p>Content for Page 2...</p>
        </div>

        {/* Page 3 */}
        <div
          className="patientDetailsPrint-page"
          id="patientDetailsPrint-page3"
        >
          <input
            type="checkbox"
            className="page-checkbox"
            checked={selectedPages.page3}
            onChange={() => handleCheckboxChange("page3")}
          />
          <h2>Prescription Details</h2>
          <p>Content for Page 3...</p>
        </div>
{/* Page 4 */}
<div
          className="patientDetailsPrint-page"
          id="patientDetailsPrint-page4"
        >
          <input
            type="checkbox"
            className="page-checkbox"
            checked={selectedPages.page4}
            onChange={() => handleCheckboxChange("page4")}
          />
          <h2>Lab Test Results</h2>
          <p>Content for Page 4...</p>
        </div>

        {/* Page 5 */}
        <div
          className="patientDetailsPrint-page"
          id="patientDetailsPrint-page5"
        >
          <input
            type="checkbox"
            className="page-checkbox"
            checked={selectedPages.page5}
            onChange={() => handleCheckboxChange("page5")}
          />
          <h2>Billing Details</h2>
          <p>Content for Page 5...</p>
        </div>

      </div>
    </div>
  );
};

export default PatientDetailsPrint;
