import React, { useState, useEffect } from "react";
import "../ListRequest/rdlAddReport.css";
import { API_BASE_URL } from "../../api/api";

function UpdateReportForm({ onClose, selectedRequest }) {
  const [formData, setFormData] = useState({
    indication: selectedRequest?.indication || "",
    mrixrayctno: selectedRequest?.mrixrayctno || "",
    selectedSignatory: selectedRequest?.signatureList,
    imagingDate: selectedRequest?.imagingDate || "",
    prescriberId: selectedRequest?.prescriberId || 0,
    notes: selectedRequest?.notes,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

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

    fetch(
      `${API_BASE_URL}/imaging-requisitions/update/${selectedRequest.imagingId}`,
      {
        method: "PUT",
        body: formDataToSend,
      }
    )
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        console.log("Updated Successfully");
        onClose(); // Close the modal on successful update
      })
      .catch((error) => console.error("Error updating report:", error));
  };

  return (
    <div className="rDLListRequest-add-report-form">
      <h2>
        Update report of {selectedRequest.imagingItemDTO?.imagingItemName} (
        {selectedRequest.imagingTypeDTO?.imagingTypeName})
      </h2>
      <div className="rDLListRequest-add-report-patient-info">
        {/* Display patient information */}
        <div className="rDLListRequest-add-report-info-row">
          <span>
            <strong>Patient Name:</strong>{" "}
            {selectedRequest.patientDTO?.firstName ||
              selectedRequest.newPatientVisitDTO?.firstName}{" "}
            {selectedRequest.patientDTO?.lastName ||
              selectedRequest.newPatientVisitDTO?.lastName}
          </span>
          <span>
            <strong>Prescriber:</strong>{" "}
            <input
              type="text"
              name="prescriberName"
              value={selectedRequest?.prescriberDTO?.employeeName || "self"}
              onChange={handleChange}
            />
          </span>
        </div>
        <div className="rDLListRequest-add-report-info-row">
          <span>
            <strong>Address:</strong>{" "}
            {selectedRequest.patientDTO?.address ||
              selectedRequest.newPatientVisitDTO?.address}
          </span>
          <span>
            <strong>Phone No:</strong>{" "}
            {selectedRequest.patientDTO?.phoneNumber ||
              selectedRequest.newPatientVisitDTO?.phoneNumber}
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
          <span>
            <strong>Indication:</strong>{" "}
            <input
              type="text"
              name="indication"
              placeholder="Indication"
              value={formData.indication}
              onChange={handleChange}
            />
          </span>
          <span>
            <strong>MRI/CT/X-ray No:</strong>{" "}
            <input
              type="text"
              name="mrixrayctno"
              placeholder="MRI/CT/X-ray Number"
              value={formData?.mrixrayctno}
              onChange={handleChange}
            />
          </span>
        </div>
      </div>
      <div className="rDLListRequest-add-report-text-editor">
        <div className="rDLListRequest-add-report-toolbar">
          {/* Add toolbar buttons here */}
        </div>


        <textarea
          rows="10"
          name="notes"
          className="rDLListRequest-add-report-textarea"
          value={formData?.notes}
          onChange={handleChange}
        ></textarea> 
  
      </div>
      <div className="rDLListRequest-add-report-form-actions">
        <div className="rDLListRequest-add-report-select-signatories">
          <strong>Select Signatories:</strong>
          <select
            name="selectedSignatory"
            value={formData.selectedSignatory}
            onChange={handleChange}
          >
            <option>DR. ANN NJOKI THIONG'O</option>
            <option>Mr. Immam</option>
            <option>Prof. DR. Suresh</option>
          </select>
        </div>
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
          {selectedRequest?.uploadFile && (
            <div className="rDLListRequest-add-report-image-preview">
              <img
                src={`data:image/jpeg;base64,${selectedRequest?.uploadFile}`}
                alt="Image preview"
                width={"300px"}
              />
            </div>
          )}
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
