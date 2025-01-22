import React, { useState, useEffect } from "react";
import "../ListRequest/rdlScanDone.css";
import { API_BASE_URL } from "../../api/api";

function RDLAddScanDoneDetails({ onClose, onUpdateStatus, patient }) {
  console.log(patient);

  const [scannedOn, setScannedOn] = useState("");
  const [filmType, setFilmType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remarks, setRemarks] = useState("");
  const [filmTypes, setFilmTypes] = useState([]);

  useEffect(() => {
    // Fetch film types from the API
    fetch(`${API_BASE_URL}/film-types`)
      .then((response) => response.json())
      .then((data) => setFilmTypes(data))
      .catch((error) => {
        console.error("Error fetching film types:", error);
        // Optionally, add UI feedback to inform the user of the error
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateStatus(scannedOn, filmType, quantity, remarks);
  };

  return (
    <div className="rDLListRequest-ScanDone-modal-backdrop">
      <div className="rDLListRequest-ScanDone-modal">
        <h2>
          Add Scan Done Details of {patient?.outPatientDTO?.salutation}{" "}
          {patient?.outPatientDTO?.firstName} {patient?.outPatientDTO?.lastName}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="rDLListRequest-ScanDone-form-group">
            <label htmlFor="scannedOn">Scanned On</label>
            <input
              type="date"
              id="scannedOn"
              value={scannedOn}
              onChange={(e) => setScannedOn(e.target.value)}
              required
            />
          </div>
          <div className="rDLListRequest-ScanDone-form-group">
            <label htmlFor="filmType">Film Type *</label>
            <select
              id="filmType"
              value={filmType}
              onChange={(e) => setFilmType(e.target.value)}
              required
            >
              <option value="">Select The Film Type</option>
              {filmTypes.map((type) => (
                <option key={type.filmTypeId} value={type.filmTypeId}>
                  {type.filmType}
                </option>
              ))}
            </select>
          </div>
          <div className="rDLListRequest-ScanDone-form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              min={0}
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="rDLListRequest-ScanDone-form-group">
            <label htmlFor="remarks">Remarks</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>
          <div className="rDLListRequest-ScanDone-form-actions">
            <button type="submit" className="rDLListRequest-ScanDone-done-btn">
              Done
            </button>
            <button
              type="button"
              className="rDLListRequest-ScanDone-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RDLAddScanDoneDetails;
