/* Ajhar Tamboli rdlEditDrEditBtn.jsx 19-09-24 */

import React, { useState } from "react";
import "../EditDoctors/rdlEditDrEditBtn.css";

function TransactionDetails({ onClose, selectedRequest }) {
  const [reportingDoctor, setReportingDoctor] = useState();

  const handleUpdate = () => {
    const prescriberId = reportingDoctor;
    const imagingId = selectedRequest.imagingId;

    fetch(
      `${API_BASE_URL}/imaging-requisitions/update-prescriber?prescriberId=${prescriberId}&imagingId=${imagingId}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Doctor updated successfully:", data);
        onClose(); // Close the popup after successful update
      })
      .catch((error) => {
        console.error("Error updating doctor:", error);
      });
  };

  return (
    <div className="rdlEditDrEditBtn-popup-overlay">
      <div className="rdlEditDrEditBtn-popup-content">
        <div className="rdlEditDrEditBtn-transaction-container">
          <div className="rdlEditDrEditBtn-transaction-header">
            <div className="rdlEditDrEditBtn-transaction-date">
              <span>Transaction Date:</span>
              <span>
                {new Date(selectedRequest.imagingDate).toDateString()}
              </span>
            </div>
            <div className="rdlEditDrEditBtn-patient-name">
              <span>Patient Name:</span>
              <span>{selectedRequest.patientDTO?.firstName}</span>
            </div>
          </div>

          <table className="rdlEditDrEditBtn-transaction-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Item Name</th>
                <th>Reporting Doctor (Radiologist)</th>
                <th>Prescriber Dr. Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedRequest.imagingTypeDTO.imagingTypeName}</td>
                <td>{selectedRequest.imagingItemDTO.imagingItemName}</td>
                <td>{selectedRequest.performerDTO?.firstName}</td>
                <td>
                  {selectedRequest.prescriberDTO?.salutation}
                  {selectedRequest.prescriberDTO?.firstName}{" "}
                  {selectedRequest.prescriberDTO?.lastName}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="rdlEditDrEditBtn-reporting-doctor">
            <span>Reporting Doctor (Radiologist):</span>
            <input
              type="text"
              value={reportingDoctor}
              onChange={(e) => setReportingDoctor(e.target.value)}
            />
            <button className="rdlEditDrEditBtn-search-button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <button
            className="rdlEditDrEditBtn-update-button"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button className="rdlEditDrEditBtn-close-button" onClick={onClose}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionDetails;
