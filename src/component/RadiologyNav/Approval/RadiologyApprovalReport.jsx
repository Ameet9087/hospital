/* Ajhar Tamboli RadiologyReportPopup.jsx 19-09-24 */

import React, { useState, useEffect } from "react";
// import AddReportForm from "./AddReportForm";
import "../ListReports/RadiologyReport.css";
import CustomModel from "../../../CustomModel/CustomModal";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";

const RadiologyReportPopup = ({ onClose, selectedRequest }) => {
  const [reportData, setReportData] = useState(null);
  const [defaultSignatories, setDefaultSignatories] = useState([]);
  const [signatories, setSignatories] = useState([]);

  const fetchDefaultSignatories = async () => {
    const response = await axios.get(`${API_BASE_URL}/radiology-signatories`);
    setDefaultSignatories(response.data);
  };

  useEffect(() => {
    fetchDefaultSignatories();
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
       ${reportData?.signatureList
        ? `<img src="data:image/jpeg;base64,${reportData?.signatureList}" alt="Radiology Scan" style="max-width: 100%; height: 150px;" />`
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

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedSignatory = selectedValue ? JSON.parse(selectedValue) : null;
    setSignatories(selectedSignatory);
  };

  const handleFormSubmit = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/imaging-requisitions/approve-by?performerId=${signatories?.employeeDTO?.employeeId}&imagingId=${reportData?.imagingId}`
      );
      toast.success("Report Approved Successfully");
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  if (!reportData) {
    return null; // Or a loading spinner if needed
  }

  return (
    <>
      <div className="RadiologyReportPopup">
        <div className="RadiologyReportPopup-container">
          <button className="RadiologyReportPopup-close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="RadiologyReportPopup-popup-content">
            <div>
              <h1>
                <img src="lopmudralogo.jpeg" class="radiology-hospital-logo" />{" "}
                HOSPITAL
              </h1>
              <span class="radiology-address">
                Survey No 148/4, Vishwakarma Nagar Hospital, CTS No.
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
                  {reportData.imagingItemDTO?.radiologyTemplateDTO?.footerNote}
                </p>
              </div>
              <div>
                {reportData.signatureList && (
                  <img
                    src={`data:image/jpeg;base64,${reportData?.signatureList}`}
                    alt="Radiology Scan"
                    style={{ maxWidth: "100%", height: "150px" }}
                  />
                )}
                <p>Signature</p>
              </div>
              <div className="RadiologyReportPopup-report-body">
                {reportData.uploadFile && (
                  <img
                    src={`data:image/jpeg;base64,${reportData?.uploadFile}`}
                    alt="Radiology scan"
                    className="RadiologyReportPopup-image"
                    style={{ maxWidth: "100%", height: "50  0px" }}
                  />
                )}
              </div>
            </div>
            <div className="rDLListRequest-add-report-signature-section">
              <div className="rDLListRequest-add-report-signature-box active">
                {signatories != null && (
                  <img
                    src={`data:image/jpeg;base64,${signatories?.employeeDTO?.signatureImage}`}
                    alt="Signature"
                    style={{ maxWidth: "100%", height: "150px" }}
                  />
                )}
                <p>
                  {signatories?.employeeDTO?.salutation}{" "}
                  {signatories?.employeeDTO?.firstName}{" "}
                  {signatories?.employeeDTO?.lastName}
                </p>
              </div>
            </div>
            <div className="rDLListRequest-add-report-select-signatories">
              <strong>Select Signatories:</strong>
              <select name="signatureList" onChange={handleChange}>
                <option value="">Select Signatories</option>
                {defaultSignatories.length > 0 &&
                  defaultSignatories.map((signatories) => (
                    <option
                      key={signatories.employeeDTO?.signatureImage}
                      value={JSON.stringify(signatories)} // Store the whole object as a JSON string
                    >
                      {signatories.employeeDTO?.salutation}
                      {signatories.employeeDTO?.firstName}{" "}
                      {signatories.employeeDTO?.lastName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="RadiologyReportPopup-footer-actions">
              <button
                className="rDLListReport-ex-pri-buttons"
                onClick={handlePrint}
              >
                <i className="fa-solid fa-print"></i> Print
              </button>

              <button
                className="RadiologyReportPopup-edit"
                onClick={handleFormSubmit}
              >
                Approve
              </button>
              <button className="RadiologyReportPopup-close" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RadiologyReportPopup;
