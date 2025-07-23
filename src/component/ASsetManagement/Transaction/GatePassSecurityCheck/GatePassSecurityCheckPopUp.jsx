import React, { useState, useEffect, useRef } from "react";
import "./GatePasssecuritycheckPopUp.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";
const GatePassSecurityCheckPopUp = ({ bookingId, closePopup }) => {
  const [id, setId] = useState(bookingId || "");
  const [columnWidths, setColumnWidths] = useState({});
  const [gatePassOptions, setGatePassOptions] = useState([]);
  const [selectedGatePass, setSelectedGatePass] = useState(null);
  const [securityRemarks, setSecurityRemarks] = useState("");
  const tableRef = useRef(null);
  const [parts, setParts] = useState([]);
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
      toast.error("Please select a Gate Pass Out No.");
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
          toast.success("Data submitted successfully!");
          closePopup(); // Close the popup on success
        } else {
          throw new Error("Failed to submit data");
        }
      })
      .catch((error) => {
        toast.error("Error submitting data:", error);
        toast.error("An error occurred while submitting the data.");
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
                <FloatingInput
                label={"Asset No"}
                type="text"
                  value={selectedGatePass?.equipmentGatePassOutDTO?.assetNo || id}
                  readOnly/>
               
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Gate Pass Out Date"}
                  type="text"
                  value={selectedGatePass?.equipmentGatePassOutDTO?.gatePassOutDate || id}
                  readOnly/>
                
              </div>
            </div>
          </div>

          {/* Gate Pass Selection */}
          <div className="MaintenanceChecklistPopUp-surgeryEvents-panel operation-details">
            <div className="MaintenanceChecklistPopUp-surgeryEvents-panel-content">
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
              <FloatingSelect
  label={"Gate Pass Out No"}
  onChange={handleGatePassChange}
  options={[
    { value: "", label: "Select Gate Pass" }, // Default option
    ...gatePassOptions.map((option) => ({
      value: option.securityGatePassId,
      label: option.equipmentGatePassOutDTO.gatePassOutId, // Display gate pass ID
    })),
  ]}
/>              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingInput
                label={"Gate Entry No"}
                type="text" value={selectedGatePass?.gateEntryNo || id} readOnly/>
                
              </div>
              <div className="MaintenanceChecklistPopUp-surgeryEvents-form-row">
                <FloatingTextarea
                label={"security Remarks"}
                
                  value={securityRemarks}
                  onChange={(e) => setSecurityRemarks(e.target.value)}/>
               
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


