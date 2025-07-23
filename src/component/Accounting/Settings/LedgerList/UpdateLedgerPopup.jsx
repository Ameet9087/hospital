import React, { useState } from "react";
import "./UpdateLedger.css";

const UpdateLedgerPopup = ({ data, closeupdate, onUpdate }) => {
  // Initialize state with the incoming data
  const [ledgerData, setLedgerData] = useState({
    code: data.code,
    ledgerName: data.ledgerName,
    primaryGroup: data.primaryGroup,
    chartOfAccount: data.chartOfAccount,
    ledgerGroup: data.ledgerGroup,
    description: data.description || "",
    kraPin: data.kraPin || "",
    address: data.address || "",
    tdsPercent: data.tdsPercent || "",
    landlineNo: data.landlineNo || "",
    isActive: data.isActive === "true",
    legalLedgerName: data.legalLedgerName || "",
    mobileNumber: data.mobileNumber || "",
    creditPeriod: data.creditPeriod || "",
    openingBalance: data.openingBalance || 0,
    openingBalanceType: data.openingBalanceType || "Cr",
    openingBalanceInWords: data.openingBalanceInWords || "",
    isCostCenterApplicable: data.isCostCenterApplicable || false,
  });

  // Handle input change for all fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLedgerData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleUpdate = () => {
    onUpdate(ledgerData);
    closeupdate();
  };

  return (
    <div className="ul-popup-overlay">
      <div className="ul-container">
        <h2 className="ul-title">Update Ledger</h2>
        <form className="ul-form">
          <div className="ul-column">
            <div className="ul-field">
              <label>Primary Group*</label>
              <select
                name="primaryGroup"
                value={ledgerData.primaryGroup}
                onChange={handleInputChange}
                required
              >
                <option value="Assets">Assets</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Equity">Equity</option>
                <option value="Revenue">Revenue</option>
                <option value="Expenses">Expenses</option>
              </select>
            </div>
            <div className="ul-field">
              <label>Ledger Group*</label>
              <input
                type="text"
                name="ledgerGroup"
                value={ledgerData.ledgerGroup}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="ul-field">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={ledgerData.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
            </div>
            <div className="ul-field">
              <label>KRA PIN</label>
              <input
                type="text"
                name="kraPin"
                value={ledgerData.kraPin}
                onChange={handleInputChange}
                placeholder="KRA PIN"
              />
            </div>
            <div className="ul-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={ledgerData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </div>
            <div className="ul-field">
              <label>TDS Percent</label>
              <input
                type="text"
                name="tdsPercent"
                value={ledgerData.tdsPercent}
                onChange={handleInputChange}
                placeholder="TDS Percent"
              />
            </div>
            <div className="ul-field">
              <label>Landline No</label>
              <input
                type="text"
                name="landlineNo"
                value={ledgerData.landlineNo}
                onChange={handleInputChange}
                placeholder="Landline No"
              />
            </div>
            <div className="ul-field">
              <label>Is Active</label>
              <input
                type="checkbox"
                name="isActive"
                checked={ledgerData.isActive}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="ul-column">
            <div className="ul-field">
              <label>Chart of Account*</label>
              <select
                name="chartOfAccount"
                value={ledgerData.chartOfAccount}
                onChange={handleInputChange}
                required
              >
                <option value="Current Assets">Current Assets</option>
                <option value="Fixed Assets">Fixed Assets</option>
                <option value="General Ledger">General Ledger</option>
                <option value="Income Statement">Income Statement</option>
              </select>
            </div>
            <div className="ul-field">
              <label>Ledger Name*</label>
              <input
                type="text"
                name="ledgerName"
                value={ledgerData.ledgerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="ul-field">
              <label>Legal Ledger Name</label>
              <input
                type="text"
                name="legalLedgerName"
                value={ledgerData.legalLedgerName}
                onChange={handleInputChange}
                placeholder="Legal Ledger Name"
              />
            </div>
            <div className="ul-field">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                value={ledgerData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile Number"
              />
            </div>
            <div className="ul-field">
              <label>Credit Period</label>
              <input
                type="text"
                name="creditPeriod"
                value={ledgerData.creditPeriod}
                onChange={handleInputChange}
                placeholder="Credit Period"
              />
            </div>
            <div className="ul-field">
              <label>Opening Balance</label>
              <input
                type="number"
                name="openingBalance"
                value={ledgerData.openingBalance}
                onChange={handleInputChange}
              />
            </div>
            <div className="ul-field">
              <label>Opening Balance Type</label>
              <div className="ul-radio-group">
                <div>
                  <input
                    type="radio"
                    name="openingBalanceType"
                    value="Dr"
                    checked={ledgerData.openingBalanceType === "Dr"}
                    onChange={handleInputChange}
                  />
                  Dr
                </div>
                <div>
                  <input
                    type="radio"
                    name="openingBalanceType"
                    value="Cr"
                    checked={ledgerData.openingBalanceType === "Cr"}
                    onChange={handleInputChange}
                  />
                  Cr
                </div>
              </div>
            </div>
            <div className="ul-field">
              <label>Opening Balance In Words</label>
              <input
                type="text"
                name="openingBalanceInWords"
                value={ledgerData.openingBalanceInWords}
                onChange={handleInputChange}
              />
            </div>
            <div className="ul-field">
              <label>Is Cost Center Applicable</label>
              <input
                type="checkbox"
                name="isCostCenterApplicable"
                checked={ledgerData.isCostCenterApplicable}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <button className="ul-update-btn" onClick={handleUpdate}>
          Update Ledger
        </button>
        <button className="ul-close-btn" onClick={closeupdate}>
          X
        </button>
      </div>
    </div>
  );
};

export default UpdateLedgerPopup;
