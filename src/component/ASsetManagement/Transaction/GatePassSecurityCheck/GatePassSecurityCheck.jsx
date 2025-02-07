import React, { useState, useEffect } from "react";
import "./GatePassecuritycheck.css";
import CustomModal from "../../../../CustomModel/CustomModal";
import GatePassSecurityCheckPopUp from "./GatePassSecurityCheckPopUp";
import { API_BASE_URL } from "../../../api/api";
const GatePassSecurityCheck = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [gatePassDetails, setGatePassDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/security-gatepass-check`)
      .then((res) => res.json())
      .then((data) => setGatePassDetails(data))
      .catch((err) => {
        console.error("Error fetching gate pass details:", err);
      });
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Callback to add new gate pass details
  const handleAddGatePass = (newGatePass) => {
    setGatePassDetails((prevDetails) => [...prevDetails, newGatePass]);
    setShowPopup(false); // Close popup after adding
  };

  const filteredGatePassDetails = gatePassDetails.filter((gatePass) => {
    const lowerQuery = searchQuery.toLowerCase();
    const securityGatePassOut = gatePass.securityGatePassOutDTO || {};
    const equipment = securityGatePassOut.equipmentGatePassOutDTO || {};
    const parts = equipment.partsDTO || [];

    return (
      (securityGatePassOut.gatePassOutId?.toString() || "").includes(lowerQuery) ||
      (securityGatePassOut.store || "").toLowerCase().includes(lowerQuery) ||
      (securityGatePassOut.remarks || "").toLowerCase().includes(lowerQuery) ||
      (securityGatePassOut.gateEntryNo || "").toLowerCase().includes(lowerQuery) ||
      (equipment.assetNo || "").toLowerCase().includes(lowerQuery) ||
      (equipment.gatePassOutDate || "").toLowerCase().includes(lowerQuery) ||
      parts.some((part) => (part.partName || "").toLowerCase().includes(lowerQuery))
    );
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const csvData = filteredGatePassDetails.map((gatePass) => {
      const securityGatePassOut = gatePass.securityGatePassOutDTO || {};
      const equipment = securityGatePassOut.equipmentGatePassOutDTO || {};
      return [
        securityGatePassOut.gateEntryNo || "N/A",
        equipment.assetNo || "N/A",
        equipment.gatePassOutDate || "N/A",
      ];
    });

    const csvHeader = ["Gate Entry No", "Asset No", "Gate Pass Out Date"];
    const csvContent = [csvHeader, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gate_pass_security_check.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="GatePassSecurityCheck-container">
      <div className="GatePassSecurityCheck-addBtn">
        <button className="GatePassSecurityCheck-add-button" onClick={openPopup}>
          + Add New Gate Pass Security Check
        </button>
      </div>

      <div className="GatePassSecurityCheck-search-N-result">
        <div className="GatePassSecurityCheck-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="GatePassSecurityCheck-results-info">
          <span>
            Showing {filteredGatePassDetails.length} / {gatePassDetails.length} results
          </span>
        </div>
      </div>
      <div className="GatePassSecurityCheck-action-buttons">
        <button className="GatePassSecurityCheck-print-button" onClick={handlePrint}>
          Print
        </button>
        <button className="GatePassSecurityCheck-print-button" onClick={handleExport}>
          Export
        </button>
      </div>
      <div className="GatePassSecurityCheck-table-container">
        <table>
          <thead>
            <tr>
              {["Gate Entry No", "Asset No", "Gate Pass Out Date"].map(
                (header, index) => (
                  <th key={index}>{header}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filteredGatePassDetails.map((gatePass, index) => {
              const securityGatePassOut = gatePass.securityGatePassOutDTO || {};
              const equipment = securityGatePassOut.equipmentGatePassOutDTO || {};
              return (
                <tr key={index}>
                  <td>{securityGatePassOut.gateEntryNo || "N/A"}</td>
                  <td>{equipment.assetNo || "N/A"}</td>
                  <td>{equipment.gatePassOutDate || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>



      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <GatePassSecurityCheckPopUp closePopup={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default GatePassSecurityCheck;
