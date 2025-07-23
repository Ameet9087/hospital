import React, { useState } from "react";
import axios from "axios";
import "./cancelAdmission.css"; // Make sure to import the CSS file
import { API_BASE_URL } from "../api/api"; // Make sure you have this API base URL imported

const CancelAdmission = ({ patient, setShowOptionWindow }) => {
  const [cancelDate, setCancelDate] = useState("09-10-2024"); // Default cancel date
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleCancelAdmission = async () => {
    if (!remarks.trim()) {
      setErrorMessage("Remarks are required");
      return;
    }
    try {
      let admissionId = parseInt(patient.ipAdmmissionId);
      const response = await axios.put(
        `${API_BASE_URL}/ip-admissions/${admissionId}/cancel?date=${cancelDate}&remark=${remarks}`
      );

      if (response.status === 200) {
        setSuccessMessage("Admission cancelled successfully.");
        setErrorMessage("");
        // Optionally, you can trigger a close action here if the parent component passed onClose
        setShowOptionWindow(false);
      }
    } catch (error) {
      setErrorMessage("Failed to cancel the admission. Please try again.");
      console.error("Error cancelling admission:", error);
    }
  };

  return (
    <div className="cancelAdmission-container">
      <div className="cancelAdmission-header">
        <div>
          <p className="cancelAdmission-name">
            Name: {patient.patient?.firstName} {patient.patient?.middleName}{" "}
            {patient.patient?.lastName}
          </p>
          <p className="cancelAdmission-inpatient">
            Uhid: {patient.patient?.uhid}
          </p>
          <p className="cancelAdmission-ward">
            Room: {patient.roomDetails?.roomDTO?.roomNumber}
          </p>
        </div>
        <div>
          <p className="cancelAdmission-ageSex">
            Age/Sex: {patient.patient?.age} {patient.patient?.ageUnit} /{" "}
            {patient.patient?.gender}
          </p>
          <p className="cancelAdmission-bedCode">
            Bed Code: {patient.roomDetails?.bedDTO?.bedNo}
          </p>
        </div>
      </div>

      <div className="cancelAdmission-warning">
        This will cancel the admission, and it cannot be reverted. <br />
        Are you sure you want to cancel this admission for this patient?
      </div>

      <div className="cancelAdmission-dates">
        <div>
          <label>Admission Date:</label>
          <input
            type="text"
            value={patient?.admissionDate} // Admission date from patient data
            readOnly
            className="cancelAdmission-admissionDate"
          />
        </div>
        <div>
          <label>Cancelled On:</label>
          <div className="cancelAdmission-cancelDate">
            <input
              type="date"
              value={cancelDate}
              onChange={(e) => setCancelDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="cancelAdmission-remarks">
        <label>Remarks *:</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="cancelAdmission-remarksInput"
          placeholder="Provide reason for cancellation"
        />
      </div>

      {errorMessage && <p className="cancelAdmission-error">{errorMessage}</p>}
      {successMessage && (
        <p className="cancelAdmission-success">{successMessage}</p>
      )}

      <div className="cancelAdmission-actions">
        <button
          className="cancelAdmission-cancelBtn"
          onClick={handleCancelAdmission}
        >
          Cancel Admission
        </button>
      </div>
    </div>
  );
};

export default CancelAdmission;
