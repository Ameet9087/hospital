import React, { useState, useEffect, useRef } from "react";
import "./GatePasssecuritycheckPopUp.css";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import { API_BASE_URL } from "../../../api/api";

const GatePassSecurityCheckPopUp = ({ bookingId, closePopup }) => {
  const [id, setId] = useState(bookingId || "");
  const [columnWidths, setColumnWidths] = useState({});
  const [gatePassOptions, setGatePassOptions] = useState([]);
  const [selectedGatePass, setSelectedGatePass] = useState(null);
  const [securityRemarks, setSecurityRemarks] = useState("");
  const tableRef = useRef(null);
  const [parts, setParts] = useState([]);

  // Fetch Gate Pass Out Numbers on Component Mount
  useEffect(() => {
    fetch(`${API_BASE_URL}/security-gatepass-out`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGatePassOptions(data);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching gate pass data:", error));
  }, []);

  // Handle Gate Pass Out No Selection
  const handleGatePassChange = (e) => {
    const selectedId = e.target.value;
    const selectedPass = gatePassOptions.find(
      (option) => option.securityGatePassId.toString() === selectedId
    );
    setSelectedGatePass(selectedPass);

    // Update table parts dynamically
    if (selectedPass) {
      setParts(selectedPass.equipmentGatePassOutDTO.partsDTO || []);
    }
  };

  // Handle Submit to POST API
  const handleSubmit = () => {
    if (!selectedGatePass) {
      alert("Please select a Gate Pass Out No.");
      return;
    }

    const postData = {
      securityRemarks,
      securityGatePassOutDTO: {
        securityGatePassId: selectedGatePass.securityGatePassId,
      },
    };

    fetch(`${API_BASE_URL}/security-gatepass-check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Data submitted successfully!");
          closePopup(); // Close the popup on success
        } else {
          throw new Error("Failed to submit data");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        alert("An error occurred while submitting the data.");
      });
  };

  return (
    <div className="MaintenanceChecklistPopUp-surgery-Events">
      {/* Pop-up Header and Content */}
      <div className="MaintenanceChecklistPopUp-surgeryEvents-title-bar">
        <div className="MaintenanceChecklistPopUp-surgeryEvents-header">
          <span>Gate Pass Security Check</span>
        </div>
      </div>
      <div className="MaintenanceChecklistPopUp-surgeryEvents-content-wrapper">
        <div className="MaintenanceChecklistPopUp-surgeryEvents-main-section">
          {/* Equipment In Details */}
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel dis-templates">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-header">
              EQUIPMENT IN DETAILS
            </div>
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <label>Asset No:</label>
                <input
                  type="text"
                  value={selectedGatePass?.equipmentGatePassOutDTO?.assetNo || id}
                  readOnly
                />
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <label>Gate Pass Out Date:</label>
                <input
                  type="text"
                  value={selectedGatePass?.equipmentGatePassOutDTO?.gatePassOutDate || id}
                  readOnly
                />
              </div>
            </div>
          </div>
          
          {/* Gate Pass Selection */}
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <label>
                  Gate Pass Out No: <span className="GatePassSecurityCheckPopUp-required">*</span>
                </label>
                <select onChange={handleGatePassChange}>
                  <option value="">Select Gate Pass</option>
                  {gatePassOptions.map((option) => (
                    <option key={option.securityGatePassId} value={option.securityGatePassId}>
                      {option.equipmentGatePassOutDTO.gatePassOutId}
                    </option>
                  ))}
                </select>
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <label>Gate Entry No:</label>
                <input type="text" value={selectedGatePass?.gateEntryNo || id} readOnly />
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <label>security Remarks:</label>
                <textarea
                  placeholder="Enter security remarks"
                  value={securityRemarks}
                  onChange={(e) => setSecurityRemarks(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Item Details Table */}
        <div className="MaintenanceChecklistPopUp-services-table">
          <div className="MaintenanceChecklistPopUp-surgeryEvents-title-bar">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-header">
              <span>Item Details</span>
            </div>
          </div>
          <table ref={tableRef}>
            <thead>
              <tr>
                {["SN", "Part Name", "Model No", "Serial No"].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="resizable-th"
                  >
                    <div className="header-content">
                      <span>{header}</span>
                      <div
                        className="resizer"
                        onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parts.map((part, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{part.partName}</td>
                  <td>{part.modelNo}</td>
                  <td>{part.serialNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="MaintenanceChecklistPopUp-surgeryEvents-action-buttons">
          <button className="MaintenanceChecklistPopUp-btn-blue" onClick={handleSubmit}>
            Submit
          </button>
          <button className="MaintenanceChecklistPopUp-btn-gray" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GatePassSecurityCheckPopUp;


