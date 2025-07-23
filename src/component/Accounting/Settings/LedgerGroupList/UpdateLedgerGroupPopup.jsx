import React, { useState } from "react";
import "./UpdateLedgerGroup.css";

function UpdateLedgerGroupPopup({ data, onClose, onUpdate }) {
  const [ledgerGroup, setLedgerGroup] = useState({
    ledgergroupName: data?.ledgerGroup,
    description: data?.description,
    isActive: data?.isActive,
    primaryGroup: data?.primaryGroup,
    chartOfAccount: data?.chartOfAccount,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLedgerGroup((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(ledgerGroup);
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
    <div className="update-ledger-popup-overlay">
      <div className="update-ledger-popup-content">
        <h2>Update Ledger Group</h2>
        <div className="ulp-form-row">
          <div className="ulp-form-group">
            <label>Ledger Group Name</label>
            <input
              type="text"
              name="ledgergroupName"
              value={ledgerGroup?.ledgergroupName}
              onChange={handleInputChange}
            />
          </div>
          <div className="ulp-form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={ledgerGroup?.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="ulp-form-group">
            <label>Primary Group</label>
            <select
              name="primaryGroup"
              value={ledgerGroup.primaryGroup}
              onChange={handleInputChange}
            >
              <option value="Revenue">Revenue</option>
              <option value="Expenses">Expenses</option>
              <option value="Assets">Assets</option>
              <option value="Liabilities">Liabilities</option>
            </select>
          </div>
          <div className="ulp-form-group">
            <label>Chart of Account</label>
            <select
              name="chartOfAccount"
              value={ledgerGroup.chartOfAccount}
              onChange={handleInputChange}
            >
              {getChartOfAccountsOptions().map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="ulp-form-group">
            <label>Is Active</label>
            {ledgerGroup?.isActive === "Yes" ? (
              <input
                type="checkbox"
                name="isActive"
                checked={true}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type="checkbox"
                name="isActive"
                onChange={handleInputChange}
              />
            )}
          </div>
        </div>
        <div className="ulp-button-row">
          <button className="ulp-save-btn" onClick={handleSave}>
            Update Changes
          </button>
          <button className="ulp-close-btn" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateLedgerGroupPopup;
