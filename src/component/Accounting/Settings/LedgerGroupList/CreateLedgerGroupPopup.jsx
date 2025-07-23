import React, { useState } from "react";
import "./CreateLedgerGroup.css";

const CreateLedgerGroupPopup = ({ onClose }) => {
  const [ledgerGroup, setLedgerGroup] = useState({
    coaName: "",
    description: "",
    primaryGroup: "Revenue",
    chartOfAccounts: "",
  });

  const handleInputChange = (field, value) => {
    setLedgerGroup((prevLedgerGroup) => ({
      ...prevLedgerGroup,
      [field]: value,
    }));
  };

  const handlePrimaryGroupChange = (e) => {
    const selectedGroup = e.target.value;
    setLedgerGroup((prevLedgerGroup) => ({
      ...prevLedgerGroup,
      primaryGroup: selectedGroup,
      chartOfAccounts: "", // Reset Chart of Accounts when Primary Group changes
    }));
  };

  const handleSave = () => {
    console.log("Saving ledger group:", ledgerGroup);
    onClose();
  };

  const getChartOfAccountsOptions = () => {
    switch (ledgerGroup.primaryGroup) {
      case "Revenue":
        return ["Direct Income", "Indirect Income"];
      case "Expenses":
        return ["Direct Expense", "Indirect Expense", "Purchase"];
      case "Assets":
        return ["Current Assets", "Fixed Assets"];
      case "Liabilities":
        return [
          "Capital and Equity",
          "Current Liabilities",
          "Long Term Liabilities",
        ];
      default:
        return [];
    }
  };

  return (
    <div className="clg-popup-overlay">
      <div className="clg-popup-content">
        <h2>Create Ledger Group</h2>
        <div className="clg-form-row">
          <div className="clg-form-group">
            <label>Primary Group</label>
            <select
              value={ledgerGroup.primaryGroup}
              onChange={handlePrimaryGroupChange}
            >
              <option value="Revenue">Revenue</option>
              <option value="Expenses">Expenses</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
            </select>
          </div>
          <div className="clg-form-group">
            <label>Chart of Accounts</label>
            <select
              value={ledgerGroup.chartOfAccounts}
              onChange={(e) =>
                handleInputChange("chartOfAccounts", e.target.value)
              }
            >
              {getChartOfAccountsOptions().map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="clg-form-group">
            <label>COA Name</label>
            <input
              type="text"
              placeholder="COA Name"
              value={ledgerGroup.coaName}
              onChange={(e) => handleInputChange("coaName", e.target.value)}
              className="clg-popup-input"
            />
          </div>
          <div className="clg-form-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={ledgerGroup.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="clg-popup-input"
            />
          </div>
        </div>
        <div className="clg-button-row">
          <button className="clg-save-btn" onClick={handleSave}>
            Save COA
          </button>
        </div>
        <button className="clg-close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default CreateLedgerGroupPopup;
