/* Ajhar Tamboli RadiologyReportPopup.jsx 19-09-24 */

import React, { useState, useEffect } from "react";
// import AddReportForm from "./AddReportForm";
import "./RadiologyReport.css";
import UpdateReportForm from "./UpdateReportForm";

const RadiologyReportPopup = ({ onClose, selectedRequest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showHeaderImage, setShowHeaderImage] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (selectedRequest) {
      console.log(selectedRequest);

      setReportData(selectedRequest);
    }
  }, [selectedRequest]);

  // const handlePrint = () => {
  //   const printWindow = window.open("", "", "height=600,width=800");
  //   printWindow.document.write("<html><head><title>Print Report</title>");
  //   printWindow.document.write(
  //     '<link rel="stylesheet" type="text/css" href="./RadiologyReport.css">'
  //   );
  //   printWindow.document.write("</head><body>");
  //   printWindow.document.write(
  //     document.querySelector(".RadiologyReportPopup-report-content").innerHTML
  //   );
  //   printWindow.document.write("</body></html>");
  //   printWindow.document.close();
  //   printWindow.focus();
  //   printWindow.print();
  // };


  const handlePrint = () => {
    if (!reportData) {
      alert("No report data available to print!");
      return;
    }
  
    const printWindow = window.open("", "_blank", "height=600,width=800");
    if (!printWindow) {
      alert("Failed to open the print window. Please disable popup blockers.");
      return;
    }
  
    const hospitalDetails = `
      <h1>
        <img src="lopmudralogo.jpeg" alt="Hospital Logo" style="width: 100px; height: auto;" />
        LOPMUDRA HOSPITAL
      </h1>
      <p style="font-size: 14px;">
        Survey No 148/4, Vishwakarma Nagar Lopmudra Hospital, CTS No. 1338, Pashan - Sus Rd, 
        near NIV, Pashan, Pune, Maharashtra 411021
      </p>
      <h2 style="text-align: center;">Radiology Report</h2>
    `;
  
    const patientInfo = `
      <div style="font-size: 14px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="flex: 1; padding-right: 10px;">
            <p><strong>Name:</strong> ${reportData.patientDTO?.firstName || reportData.newPatientVisitDTO?.firstName} 
            ${reportData.patientDTO?.lastName || reportData.newPatientVisitDTO?.lastName}</p>
            <p><strong>Age/Sex:</strong> ${reportData.patientDTO?.age || reportData.newPatientVisitDTO?.age} Y / 
            ${reportData.patientDTO?.gender || reportData.newPatientVisitDTO?.gender}</p>
          </div>
          <div style="flex: 1; padding-left: 10px;">
            <p><strong>Rep. Date:</strong> ${new Date(reportData.imagingDate).toDateString() || "N/A"}</p>
            <p><strong>Address/Contact No:</strong> ${reportData.patientDTO?.address || reportData.newPatientVisitDTO?.address} / 
            ${reportData.patientDTO?.phoneNumber || reportData.newPatientVisitDTO?.phoneNumber}</p>
          </div>
        </div>
  
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1; padding-right: 10px;">
            <p><strong>Prescriber Name:</strong> ${reportData.prescriberDTO?.employeeName || "Self"}</p>
          </div>
        </div>
      </div>
    `;
  
    const reportBody = `
      <div style="text-align: center; margin-top: 20px;">
        ${reportData.uploadFile
          ? `<img src="data:image/jpeg;base64,${reportData.uploadFile}" alt="Radiology Scan" style="max-width: 100%; height: auto;" />`
          : "<p>No image available</p>"}
      </div>
    `;
  
    printWindow.document.open();
    printWindow.document.write("<html><head><title>Print Report</title>");
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>');
    printWindow.document.write("</head><body>");
    printWindow.document.write(hospitalDetails);
    printWindow.document.write(patientInfo);
    printWindow.document.write(reportBody);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };
  


  //   const handlePrint = () => {
  //     window.print();
  //   };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCheckboxChange = () => {
    setShowHeaderImage(!showHeaderImage);
  };

  const handleFormSubmit = (updatedData) => {
    // Handle form submission logic, e.g., save the updated report
    setReportData(updatedData);
    setIsEditing(false);
  };

  if (!reportData) {
    return null; // Or a loading spinner if needed
  }

  return (
    <>
      {isEditing ? (
        <div className="rDLListRequest-modal-overlay">
          <div className="rDLListRequest-modal-content">
            <button
              className="rDLListRequest-close-modal"
              onClick={() => setIsEditing(false)}
            >
              &times;
            </button>
            <UpdateReportForm selectedRequest={selectedRequest} />
          </div>
        </div>
      ) : (
        <div className="RadiologyReportPopup">
          <div className="RadiologyReportPopup-popup-content">
            <button
              className="RadiologyReportPopup-close-btn"
              onClick={onClose}
            >
              &times;
            </button>
            <div>
  <h1>
    <img src="lopmudralogo.jpeg" class="radiology-hospital-logo" /> LOPMUDRA HOSPITAL
  </h1>
  <span class="radiology-address">Survey No 148/4, Vishwakarma Nagar Lopmudra Hospital,
    CTS No. 1338, Pashan - Sus Rd, near NIV, Pashan, Pune, Maharashtra 411021
  <h2>Radiology Report</h2>

  </span>
</div>

          

       

            <div className="RadiologyReportPopup-report-content">
              <div className="RadiologyReportPopup-patient-info">
                <div className="RadiologyReportPopup-patient-info-group">
                  <span>
                    Name:{" "}
                    {reportData.patientDTO?.firstName ||
                      reportData.newPatientVisitDTO?.firstName}{" "}
                    {reportData.patientDTO?.lastName ||
                      reportData.newPatientVisitDTO?.lastName}
                  </span>
                  <span>
                    Age/Sex:{" "}
                    {reportData.patientDTO?.age ||
                      reportData.newPatientVisitDTO?.age}{" "}
                    Y /{" "}
                    {reportData.patientDTO?.gender ||
                      reportData.newPatientVisitDTO?.gender}
                  </span>
                  <span>
                    Rep. Date:{" "}
                    {new Date(reportData.imagingDate).toDateString() || "N/A"}
                  </span>
                </div>
                <div className="RadiologyReportPopup-patient-info-group">
                  <span>
                    Address/Contact No:{" "}
                    {reportData.patientDTO?.address ||
                      reportData.newPatientVisitDTO?.address}
                    /{" "}
                    {reportData.patientDTO?.phoneNumber ||
                      reportData.newPatientVisitDTO?.phoneNumber}
                  </span>
                  <span>
                    Prescriber Name:{" "}
                    {reportData.prescriberDTO?.employeeName || "self"}
                  </span>
                  <span>Date: {reportData.imagingDate}</span>
                </div>
              </div>
              <div className="RadiologyReportPopup-report-body">
                {/* <p>{reportData.reportText || "No report text available"}</p> */}
                {reportData.uploadFile && (
                  <img
                    src={`data:image/jpeg;base64,${reportData?.uploadFile}`}
                    alt="Radiology scan"
                    className="RadiologyReportPopup-image"
                  />
                )}
              </div>
            </div>

            <div className="RadiologyReportPopup-footer-actions">
              {/* <button
                className="RadiologyReportPopup-print-report"
                onClick={handlePrint}
              >
                Print Report
              </button> */}


<button className="rDLListReport-ex-pri-buttons" onClick={handlePrint}>
  <i className="fa-solid fa-print"></i> Print
</button>

              <button
                className="RadiologyReportPopup-edit"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button className="RadiologyReportPopup-close" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RadiologyReportPopup;
