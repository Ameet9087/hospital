/* Ajhar Tamboli RadiologyReportPopup.jsx 19-09-24 */

import React, { useState, useEffect } from "react";
// import AddReportForm from "./AddReportForm";
import "./RadiologyReport.css";
import UpdateReportForm from "./UpdateReportForm";
import CustomModel from "../../../CustomModel/CustomModal";

const RadiologyReportPopup = ({ onClose, selectedRequest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showHeaderImage, setShowHeaderImage] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (selectedRequest) {
      setReportData(selectedRequest);
    }
  }, [selectedRequest]);

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
         HOSPITAL
      </h1>
      <p style="font-size: 14px;">
        Survey No 148/4, Vishwakarma Nagar  Hospital, CTS No. 1338, Pashan - Sus Rd, 
        near NIV, Pashan, Pune, Maharashtra 411021
      </p>
      <h2 style="text-align: center;">Radiology Report</h2>
    `;

    const patientInfo = `
      <div style="font-size: 14px; margin-bottom: 20px; border:1px solid #ccc; padding:10px">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; ">
          <div style="flex: 1; padding-right: 10px; ">
            <p><strong>Name:</strong> ${reportData.inPatientDTO?.patient?.firstName ||
      reportData.outPatientDTO?.patient?.firstName
      } 
            ${reportData.inPatientDTO?.patient?.lastName ||
      reportData.outPatientDTO?.patient?.lastName
      }</p>
            <p><strong>Age/Sex:</strong> ${reportData.inPatientDTO?.patient?.age ||
      reportData.outPatientDTO?.patient?.age
      } ${reportData.inPatientDTO?.patient?.ageUnit ||
      reportData.outPatientDTO?.patient?.ageUnit
      } / 
            ${reportData.inPatientDTO?.patient?.gender ||
      reportData.outPatientDTO?.patient?.gender
      }</p>
          </div>
          <div style="flex: 1; padding-left: 10px;">
            <p><strong>Rep. Date:</strong> ${new Date(reportData.imagingDate).toDateString() || "N/A"
      }</p>
            <p><strong>Address/Contact No:</strong> ${reportData.inPatientDTO?.patient?.address ||
      reportData.outPatientDTO?.patient?.address
      } / 
            ${reportData.patientDTO?.patient?.mobileNumber ||
      reportData.outPatientDTO?.patient?.mobileNumber
      }</p>
          </div>
        </div>
  
        <div style="display: flex; justify-content: space-between;">
          <div style="flex: 1; padding-right: 10px;">
            <p><strong>Prescriber Name:</strong> ${reportData.prescriberDTO?.doctorName || "Self"
      }</p>
          </div>
        </div>
      </div>
    `;

    const template = `
     ${reportData?.notes}
    `;

    const footer = `
      <p>
      <strong>Footer : </strong>
      ${reportData.imagingItemDTO?.radiologyTemplateDTO?.footerNote}</p>
    `;

    const signature = `
       ${reportData?.performerDTO?.signatureImage
        ? `<img src="data:image/jpeg;base64,${reportData?.performerDTO?.signatureImage}" alt="Radiology Scan" style="max-width: 100%; height: 150px;" />`
        : "<p>No image</p>"
      }
       <p>Signature</p>
    `;

    const reportBody = `
      <div style="text-align: center; margin-top: 20px;">
        ${reportData?.uploadFile
        ? `<img src="data:image/jpeg;base64,${reportData?.uploadFile}" alt="Radiology Scan" style="max-width: 100%; height: auto;" />`
        : "<p>No image available</p>"
      }
      </div>
    `;

    printWindow.document.open();
    printWindow.document.write("<html><head><title>Print Report</title>");
    printWindow.document.write(
      "<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>"
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(hospitalDetails);
    printWindow.document.write(patientInfo);
    printWindow.document.write(template);
    printWindow.document.write(footer);
    printWindow.document.write(signature);
    printWindow.document.write(reportBody);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

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
        <CustomModel isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <UpdateReportForm selectedRequest={selectedRequest} />
        </CustomModel>
      ) : (
        <div className="RadiologyReportPopup">
          <div className="RadiologyReportPopup-container">
            <button
              className="RadiologyReportPopup-close-btn"
              onClick={onClose}
            >
              &times;
            </button>
            <div className="RadiologyReportPopup-popup-content">
              <div>
                <h1>
                  <img
                    src="lopmudralogo.jpeg"
                    class="radiology-hospital-logo"
                  />{" "}
                  HOSPITAL
                </h1>
                <span class="radiology-address">
                  Survey No 148/4, Vishwakarma Nagar  Hospital, CTS No.
                  1338, Pashan - Sus Rd, near NIV, Pashan, Pune, Maharashtra
                  411021
                  <h2>Radiology Report</h2>
                </span>
              </div>

              <div className="RadiologyReportPopup-report-content">
                <div className="RadiologyReportPopup-patient-info">
                  <div className="RadiologyReportPopup-patient-info-group">
                    <span>
                      Name:{" "}
                      {reportData.inPatientDTO?.patient?.firstName ||
                        reportData.outPatientDTO?.patient?.firstName}{" "}
                      {reportData.inPatientDTO?.patient?.lastName ||
                        reportData.outPatientDTO?.patient?.lastName}
                    </span>
                    <span>
                      Age/Sex:{" "}
                      {reportData.inPatientDTO?.patient?.age ||
                        reportData.outPatientDTO?.patient?.age}{" "}
                      {reportData.inPatientDTO?.patient?.ageUnit ||
                        reportData.outPatientDTO?.patient?.ageUnit}{" "}
                      /{" "}
                      {reportData.inPatientDTO?.patient?.gender ||
                        reportData.outPatientDTO?.patient?.gender}
                    </span>
                    <span>
                      Rep. Date:{" "}
                      {new Date(reportData.imagingDate).toDateString() || "N/A"}
                    </span>
                  </div>
                  <div className="RadiologyReportPopup-patient-info-group">
                    <span>
                      Address/Contact No:{" "}
                      {reportData.inPatientDTO?.patient?.address ||
                        reportData.outPatientDTO?.patient?.address}
                      /{" "}
                      {reportData.inPatientDTO?.patient?.mobileNumber ||
                        reportData.outPatientDTO?.patient?.mobileNumber}
                    </span>
                    <span>
                      Prescriber Name:{" "}
                      {reportData.prescriberDTO?.doctorName || "self"}
                    </span>
                    <span>Date: {reportData.imagingDate}</span>
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: reportData?.notes }} />
                <div>
                  <p>
                    <strong>Footer :</strong>
                    {
                      reportData.imagingItemDTO?.radiologyTemplateDTO
                        ?.footerNote
                    }
                  </p>
                </div>
                <div>
                  {reportData?.performerDTO?.signatureImage && (
                    <img
                      src={`data:image/jpeg;base64,${reportData?.performerDTO?.signatureImage}`}
                      alt="Radiology Scan"
                      style={{ maxWidth: "100%", height: "150px" }}
                    />
                  )}
                  <p>
                    {reportData?.performerDTO?.salutation}{" "}
                    {reportData?.performerDTO?.firstName}{" "}
                    {reportData?.performerDTO?.lastName}
                  </p>
                </div>
                <div className="RadiologyReportPopup-report-body">
                  {reportData.uploadFile && (
                    <img
                      src={`data:image/jpeg;base64,${reportData?.uploadFile}`}
                      alt="Radiology scan"
                      className="RadiologyReportPopup-image"
                      style={{ maxWidth: "100%", height: "500px" }}
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

                <button
                  className="rDLListReport-ex-pri-buttons"
                  onClick={handlePrint}
                >
                  <i className="fa-solid fa-print"></i> Print
                </button>

                <button
                  className="RadiologyReportPopup-edit"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
                <button
                  className="RadiologyReportPopup-close"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RadiologyReportPopup;
