import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../ListRequest/rdlAddReport.css";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { FloatingInput } from "../../../FloatingInputs";
import { toast } from "react-toastify";

function AddReportForm({ onClose, selectedRequest }) {
  const [formData, setFormData] = useState({
    mriXRayCTNo: "",
    imagingDate: "",
    urgency: "",
    hasInsurance: "No",
    wardName: "",
    isActive: "Yes",
    isScanned: "Yes",
    scannedOn: "",
    scanRemark: "",
    quantity: 0,
    notes: "",
    indication: "",
    type: "",
    status: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (selectedRequest) {
      setFormData({
        requisitionRemark: selectedRequest.requisitionRemark || "",
        imagingDate: selectedRequest.imagingDate || "",
        urgency: selectedRequest.urgency || "",
        isActive: selectedRequest.isActive || true,
        isScanned: selectedRequest.isScanned || true,
        scannedDate: selectedRequest.scannedDate || "",
        scanRemark: selectedRequest.scanRemark || "",
        quantity: selectedRequest.quantity || 0,
        indication: selectedRequest.indication || "",
        type: selectedRequest.type || "",
        status: selectedRequest.status || "",
        notes:
          selectedRequest.imagingItemDTO?.radiologyTemplateDTO?.templateContent,
      });
    }
  }, [selectedRequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleNotesChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      notes: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    if (imageFile) {
      formDataToSend.append("file", imageFile);
    }

    const requisition = {
      imagingDate: formData.imagingDate
        ? new Date().toISOString().toString()
        : new Date().toISOString().toString(),
      notes: formData.notes,
      indication: formData.indication,
      status: "PendingForApproval",
      mriXRayCTNo: formData.mriXRayCTNo,
    };

    formDataToSend.append("requisition", JSON.stringify(requisition));

    fetch(
      `${API_BASE_URL}/imaging-requisitions/update/${selectedRequest.imagingId}`,
      {
        method: "PUT",
        body: formDataToSend,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        toast.success("Data Added Successfully");
      })
      .then((data) => {
        toast.success("Data Added Successfully");
        onClose();
      })
      .catch((error) => toast.error("Error updating report:", error));
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank", "height=600,width=800");
    if (!printWindow) {
      alert("Failed to open the print window. Please disable popup blockers.");
      return;
    }

    const hospitalDetails = `
    <div style="text-align: center;">
      <h1> HOSPITAL</h1>
      <p style="font-size: 14px;">
        Survey No 148/4, Vishwakarma Nagar  Hospital, CTS No. 1338, Pashan - Sus Rd, 
        near NIV, Pashan, Pune, Maharashtra 411021
      </p>
    </div>
    <h2 style="text-align: center;">Radiology Report</h2>
  `;

    const patientInfo = `
    <div style="font-size: 14px; border: 1px solid #ccc; padding:10px;">
      <div style="display: flex; justify-content: space-between;">
        <p style="margin-bottom:2px"><strong>Patient Name:</strong> ${selectedRequest.inPatientDTO?.patient?.firstName ||
      selectedRequest.outPatientDTO?.patient?.firstName
      } 
          ${selectedRequest.inPatientDTO?.patient?.lastName ||
      selectedRequest.outPatientDTO?.patient?.lastName
      }</p>
        <p style="margin-bottom:2px"><strong>Prescriber:</strong> ${selectedRequest.prescriberDTO?.doctorName || "self"
      }</p>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <p style="margin-bottom:2px"><strong>Address:</strong> ${selectedRequest.inPatientDTO?.patient?.address ||
      selectedRequest.outPatientDTO?.patient?.address
      }</p>
        <p style="margin-bottom:2px"><strong>Phone No:</strong> ${selectedRequest.inPatientDTO?.patient?.mobileNumber ||
      selectedRequest.outPatientDTO?.patient?.mobileNumber
      }</p>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <p style="margin-bottom:2px"><strong>Requested On:</strong> ${selectedRequest.requestedDate
      }</p>
        <p style="margin-bottom:2px"><strong>Scanned On:</strong> ${formData.scannedDate
      }</p>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <p style="margin-bottom:2px"><strong>Indication:</strong> ${formData.indication
      }</p>
        <p style="margin-bottom:2px"><strong>MRI/CT/X-ray No:</strong> ${formData.mriXRayCTNo
      }</p>
      </div>
    </div>
  `;

    const template = `
      <div>
        ${formData.notes}
      </div>
  `;

    const reportBody = `
    <div style="margin-top: 20px;">
        <strong>Footer : </strong> ${selectedRequest.imagingItemDTO?.radiologyTemplateDTO?.footerNote}
    </div>
  `;

    const imageSection = `
   ${imagePreview
        ? `<img src="${imagePreview}" alt="Image Preview" style="max-width: 100%; height: auto;" />`
        : "<p>No image available</p>"
      }
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
    printWindow.document.write(reportBody);
    printWindow.document.write(imageSection);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="rDLListRequest-add-report-form">
      <h2>
        Add report of {selectedRequest.imagingItemDTO?.imagingItemName} (
        {selectedRequest.imagingItemDTO?.imagingType?.imagingTypeName})
      </h2>
      <div className="rDLListRequest-add-report-patient-info">
        <div className="rDLListRequest-add-report-details">
          {/* Panel 1 */}
          <div className="rDLListRequest-panel">
            <div className="rDLListRequest-form-field">
              <span>
                <strong>Patient Name:</strong>{" "}
                {selectedRequest.inPatientDTO?.patient?.firstName ||
                  selectedRequest.outPatientDTO?.patient?.firstName}{" "}
                {selectedRequest.inPatientDTO?.patient?.lastName ||
                  selectedRequest.outPatientDTO?.patient?.lastName}
              </span>
            </div>
            <div className="rDLListRequest-form-field rdlAddReport-prescrider-name">
              <span>
                <strong>Prescriber: </strong>
                {"  "}
                {selectedRequest?.prescriberDTO?.doctorName || "self"}
              </span>
            </div>
            <div className="rDLListRequest-form-field">
              <span>
                <strong>Address:</strong>{" "}
                {selectedRequest.inPatientDTO?.patient?.address ||
                  selectedRequest.outPatientDTO?.patient?.address}
              </span>
            </div>
            <div className="rDLListRequest-form-field">
              <span>
                <strong>Phone No:</strong>{" "}
                {selectedRequest.inPatientDTO?.patient?.mobileNumber ||
                  selectedRequest.outPatientDTO?.patient?.mobileNumber}
              </span>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="rDLListRequest-panel">
            <div className="rDLListRequest-form-field">
              <span>
                <strong>Req. On:</strong> {selectedRequest.requestedDate}
              </span>
            </div>
            <div className="rDLListRequest-form-field">
              <span>
                <strong>Scanned On:</strong> {formData.scannedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rDLListRequest-add-report-report-details">
        <div className="rDLListRequest-add-report-info-row">
          <FloatingInput
            label={"Indication"}
            type="text"
            name="indication"
            value={formData.indication}
            onChange={handleChange}
          />

          <FloatingInput
            label={"MRI/CT/X-ray No"}
            type="text"
            name="mriXRayCTNo"
            value={formData.mriXRayCTNo}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="rDLListRequest-add-report-text-editor">
        <ReactQuill
          value={formData.notes}
          onChange={handleNotesChange}
          className="quill-editor"
        />
      </div>
      <div className="rDLListRequest-add-report-footer">
        <p>
          Footer :{" "}
          {selectedRequest.imagingItemDTO?.radiologyTemplateDTO?.footerNote}
        </p>
      </div>
      <div className="rDLListRequest-add-report-form-actions">
        <div className="rDLListRequest-add-report-upload-images">
          <strong>Upload Images:</strong>
          <input
            type="file"
            id="file-upload"
            hidden
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="rDLListRequest-add-report-file-upload-btn"
          >
            Choose Files
          </label>
          {imagePreview && (
            <div className="rDLListRequest-add-report-image-preview">
              <img src={imagePreview} alt="Image preview" />
            </div>
          )}
        </div>
        <div className="rDLListRequest-add-report-form-buttons">
          <button
            type="button"
            className="rDLListRequest-add-report-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rDLListRequest-add-report-save-btn"
            onClick={handleSubmit}
          >
            Save
          </button>
          {/* Print Button */}
          <button
            type="button"
            className="rDLListRequest-add-report-print-btn"
            onClick={handlePrint}
          >
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddReportForm;
