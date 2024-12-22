import React from "react";
import "./RadiologyReportDoc.css";
const RadiologyReportDoc = ({ reportData, onClose }) => {
  console.log(reportData);

  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Report</title>");
    printWindow.document.write(
      '<link rel="stylesheet" type="text/css" href="./RadiologyReport.css">'
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write(
      document.querySelector(".RadiologyReportPopup-report-content").innerHTML
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  return (
    <div>
      <div className="RadiologyReportPopup">
        <div className="RadiologyReportPopup-popup-content">
          <button className="RadiologyReportPopup-close-btn" onClick={onClose}>
            &times;
          </button>
          <h2>Radiology Report</h2>
          <div className="RadiologyReportPopup-report-content">
            <div className="RadiologyReportPopup-patient-info">
              <div className="RadiologyReportPopup-patient-info-group">
                <span>
                  Name:
                  {reportData.inPatientDTO?.firstName ||
                    reportData.outPatientDTO?.firstName +
                      " " +
                      reportData.outPatientDTO?.lastName ||
                    reportData.outPatientDTO?.firstName ||
                    "N/A"}
                </span>
                <span>
                  Age/Sex:{" "}
                  {reportData.inPatientDTO?.age ||
                    reportData.outPatientDTO?.age}{" "}
                  {reportData.inPatientDTO?.ageUnit ||
                    reportData.outPatientDTO?.ageUnit}{" "}
                  /{" "}
                  {reportData.outPatientDTO?.gender ||
                    reportData.inPatientDTO?.gender ||
                    "N/A"}
                </span>
                <span>
                  Rep. Date:{" "}
                  {new Date(reportData.imagingDate).toDateString() || "N/A"}
                </span>
              </div>
              <div className="RadiologyReportPopup-patient-info-group">
                <span>
                  Address/Contact No:{" "}
                  {reportData.inPatientDTO?.address ||
                    reportData.outPatientDTO?.address ||
                    "NA"}{" "}
                  /{" "}
                  {reportData.inPatientDTO?.phoneNumber ||
                    reportData.outPatientDTO?.phoneNumber ||
                    "N/A"}
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
            <button
              className="RadiologyReportPopup-print-report"
              onClick={handlePrint}
            >
              Print Report
            </button>
            <button className="RadiologyReportPopup-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadiologyReportDoc;
