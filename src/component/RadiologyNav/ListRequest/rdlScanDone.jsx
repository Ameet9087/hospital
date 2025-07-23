import React, { useState, useEffect } from "react";
import "../ListRequest/rdlScanDone.css";
import { API_BASE_URL } from "../../api/api";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

function RDLAddScanDoneDetails({ onClose, onUpdateStatus, patient }) {
  console.log(patient);

  const [scannedOn, setScannedOn] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateStatus(scannedOn, remarks);
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
            <FloatingInput
              label={"Scanned On"}
              type="date"
              id="scannedOn"
              value={scannedOn}
              onChange={(e) => setScannedOn(e.target.value)}
              required
            />
          </div>
          {/* <div className="rDLListRequest-ScanDone-form-group">
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
          </div> */}
          <div className="rDLListRequest-ScanDone-form-group">
            <FloatingTextarea
              label="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
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
