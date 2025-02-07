import React, { useState, useEffect } from "react";
import "../ListRequest/rdlAddReport.css";
import { API_BASE_URL } from "../../api/api";
import ReactQuill from "react-quill";
import axios from "axios";
import { FloatingInput } from "../../../FloatingInputs";
import { toast } from "react-toastify";

function UpdateReportForm({ onClose, selectedRequest }) {
  const [formData, setFormData] = useState({
    indication: selectedRequest?.indication || "",
    mriXRayCTNo: selectedRequest?.mriXRayCTNo || "",
    signatureList: selectedRequest?.signatureList,
    imagingDate: selectedRequest?.imagingDate || "",
    prescriberId: selectedRequest?.prescriberId || 0,
    notes: selectedRequest?.notes,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [defaultSignatories, setDefaultSignatories] = useState([]);

  const fetchDefaultSignatories = async () => {
    const response = await axios.get(`${API_BASE_URL}/radiology-signatories`);
    setDefaultSignatories(response.data);
  };

  useEffect(() => {
    fetchDefaultSignatories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...restData } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("file", imageFile);
    formDataToSend.append("requisition", JSON.stringify(restData));

    axios
      .put(
        `${API_BASE_URL}/imaging-requisitions/update/${selectedRequest.imagingId}`,
        formDataToSend
      )
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        toast.success("Updated Successfully");
        onClose(); // Close the modal on successful update
      })
      .catch((error) => toast.error("Error updating report:", error));
  };

  return (
    <div className="rDLListRequest-add-report-form">
      <h2>
        Update report of {selectedRequest.imagingItemDTO?.imagingItemName} (
        {selectedRequest.imagingItemDTO?.imagingType?.imagingTypeName})
      </h2>
      <div className="rDLListRequest-add-report-patient-info">
        {/* Display patient information */}
        <div className="rDLListRequest-add-report-info-row">
          <span>
            <strong>Patient Name:</strong>{" "}
            {selectedRequest.inPatientDTO?.firstName ||
              selectedRequest.outPatientDTO?.firstName}{" "}
            {selectedRequest.inPatientDTO?.lastName ||
              selectedRequest.outPatientDTO?.lastName}
          </span>
          <span>
            <strong>Prescriber:</strong>{" "}
            {selectedRequest?.prescriberDTO?.doctorName || "self"}
          </span>
        </div>
        <div className="rDLListRequest-add-report-info-row">
          <span>
            <strong>Address:</strong>{" "}
            {selectedRequest.inPatientDTO?.address ||
              selectedRequest.outPatientDTO?.address}
          </span>
          <span>
            <strong>Phone No:</strong>{" "}
            {selectedRequest.inPatientDTO?.phoneNumber ||
              selectedRequest.outPatientDTO?.phoneNumber}
          </span>
          <span>
            <strong>Req. On:</strong> {selectedRequest.requestedDate}
          </span>
          <span>
            <strong>Scanned On:</strong> {formData.scannedDate}
          </span>
        </div>
      </div>
      <div className="rDLListRequest-add-report-report-details">
        <div className="rDLListRequest-add-report-info-row">
          <span>
            {/* <strong>Report Template:</strong> USG Chest{" "} */}
            {/* <a href="#" className="rDLListRequest-add-report-link">
              Select Different Template?
            </a>
          </span>
          <span>
            <a href="#" className="rDLListRequest-add-report-link">
              Select DICOM Images?
            </a> */}
          </span>
        </div>
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
            value={formData?.mriXRayCTNo}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="rDLListRequest-add-report-text-editor">
        <ReactQuill
          className="rDLListRequest-add-report-textarea"
          value={formData?.notes}
          name={"notes"}
          onChange={handleChange}
        />
      </div>
      <div className="rDLListRequest-add-report-form-actions">
        {selectedRequest?.performerDTO?.signatureImage && (
          <img
            src={`data:image/jpeg;base64,${selectedRequest?.performerDTO?.signatureImage}`}
            alt="Signature"
            style={{ maxWidth: "100%", height: "150px" }}
          />
        )}
        <p>
          {selectedRequest?.performerDTO?.salutation}{" "}
          {selectedRequest?.performerDTO?.firstName}{" "}
          {selectedRequest?.performerDTO?.lastName}
        </p>
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
          <div className="rDLListRequest-add-report-image-preview">
            {imagePreview || selectedRequest?.uploadFile != null ? (
              <img
                src={`data:image/jpeg;base64,${selectedRequest?.uploadFile}`}
                alt="Image preview"
                width={"300px"}
              />
            ) : (
              <img src={imagePreview} alt="Image preview" />
            )}
          </div>
        </div>
        <div className="rDLListRequest-add-report-submit-actions">
          <button
            className="rDLListRequest-add-report-save-btn"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="rDLListRequest-add-report-submit-print-btn"
            onClick={handleSubmit}
          >
            Submit & Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateReportForm;
