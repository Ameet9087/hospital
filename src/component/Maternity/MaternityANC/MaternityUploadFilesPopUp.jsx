
import React, { useState } from "react";
import "./MaternityUploadFilesPopUp.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";

const MaternityUploadFilesPopUp = ({ patientData, onClose }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    uploadFile: null,
  });

  const [uploadMessage, setUploadMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      uploadFile: e.target.files[0],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.displayName || !formData.uploadFile) {
      setUploadMessage("Please fill in all fields and upload a file.");
      return;
    }

    const data = new FormData();
    data.append("displayName", formData.displayName);
    data.append("uploadFile", formData.uploadFile);

    try {
      const response = await fetch(
        `${API_BASE_URL}/patient-documents/patient/1`,
        {
          method: "POST",
          body: data,
        }
      );

      

      if (response) {
        setUploadMessage("Data saved successfully!");
        setTimeout(() => {
          onClose(); // Close the popup
        }, 2000);
      } else {
        setUploadMessage("Failed to save data. Please try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setUploadMessage("An error occurred while saving the data.");
    }
  };

  return (
    <div className="MaternityUploadFilesPopUp-container">
      <div className="MaternityUploadFilesPopUp-header">
        <h4>Upload Files</h4>
      </div>

      <div className="MaternityUploadFilesPopUp-form">
        <div className="MaternityUploadFilesPopUp-form-row">
          <div className="MaternityUploadFilesPopUp-form-row-section-1">
            <div className="MaternityUploadFilesPopUp-form-group-1row">
              <div className="MaternityUploadFilesPopUp-form-group">
                <label htmlFor="actual-sale-no">Name:</label>
                <input id="actual-sale-no" type="text"
                  value={`${patientData?.inPatientDTO?.patient?.firstName} ${patientData?.inPatientDTO?.patient?.lastName}`}
                  placeholder="Enter Name" />
              </div>
              <div className="MaternityUploadFilesPopUp-form-group">
                <label htmlFor="equipment-name">Contact No:</label>
                <input id="equipment-name" type="text"
                  value={patientData?.inPatientDTO?.patient?.contactNumber}

                  placeholder="Enter Contact No" />
              </div>
              <div className="MaternityUploadFilesPopUp-form-group">
                <label htmlFor="actual-sale-date">Age/Sex:</label>
                <input id="actual-sale-date" type="text"
                  value={`${patientData?.inPatientDTO?.patient?.age}/${patientData?.inPatientDTO?.patient?.gender}`}
                />
              </div>
            </div>
            <div className="MaternityUploadFilesPopUp-form-group-1row">
              <div className="MaternityUploadFilesPopUp-form-group">
                <label htmlFor="provisional-sale-no">Date of Birth:</label>
                <input id="provisional-sale-no" type="date"
                  value={patientData?.inPatientDTO?.patient?.dateOfBirth}
                  placeholder="Enter Provisional Sale No" />
              </div>
              <div className="MaternityUploadFilesPopUp-form-group">
                <label htmlFor="condemnation-date">Address:</label>
                <input id="condemnation-date" type="text"
                  value={patientData?.inPatientDTO?.patient?.address}
                />
              </div>
              <div className="MaternityUploadFilesPopUp-form-group">

              </div>
            </div>
          </div>
          <div className="MaternityUploadFilesPopUp-form-group">
            <label htmlFor="displayName">Display Name:</label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Enter Display Name"
              value={formData.displayName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="MaternityUploadFilesPopUp-form-group">
          <label htmlFor="uploadFile">Upload Images:</label>
          <input
            type="file"
            id="uploadFile"
            name="uploadFile"
            onChange={handleFileChange}
          />
        </div>

        {uploadMessage && (
          <p className="MaternityUploadFilesPopUp-message">{uploadMessage}</p>
        )}

        <div className="MaternityUploadFilesPopUp-form-actions">
          <button
            className="MaternityUploadFilesPopUp-add-btn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaternityUploadFilesPopUp;