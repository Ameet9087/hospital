import React, { useState } from "react";
import "./NewLedger.css";

const NewLedgerPopup = ({ onClose }) => {
  const [showLedgerGroupPopup, setShowLedgerGroupPopup] = useState(false);

  const toggleLedgerGroupPopup = () => {
    setShowLedgerGroupPopup(!showLedgerGroupPopup);
  };

  const handleClosePopup = () => {
    setShowLedgerGroupPopup(false);
  };

  const [ledgers, setLedgers] = useState([
    {
      ledgerName: "",
      legalName: "",
      description: "",
      openingBalance: 0,
      openingBalanceType: "",
      isActive: true,
      isCostCenterApplicable: false,
    },
  ]);

  const [primaryGroup, setPrimaryGroup] = useState("Revenue");

  const handleInputChange = (index, field, value) => {
    const newLedgers = [...ledgers];
    newLedgers[index][field] = value;
    setLedgers(newLedgers);
  };

  const addLedger = () => {
    setLedgers([
      ...ledgers,
      {
        ledgerName: "",
        legalName: "",
        description: "",
        openingBalance: 0,
        openingBalanceType: "",
        isActive: true,
        isCostCenterApplicable: false,
      },
    ]);
  };

  const removeLedger = (index) => {
    const newLedgers = ledgers.filter((_, i) => i !== index);
    setLedgers(newLedgers);
  };

  const handleSave = () => {
    console.log("Saving ledgers:", ledgers);
    onClose();
  };

  const handlePrimaryGroupChange = (e) => {
    setPrimaryGroup(e.target.value);
  };

  const getChartOfAccountsOptions = () => {
    switch (primaryGroup) {
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
    <>
      <div className="lg-popup-overlay">
        <div className="lg-popup-content">
          <h2>Create Ledger</h2>
          <div className="lg-form-row">
            <div className="lg-form-group">
              <label>Primary Group*</label>
              <select value={primaryGroup} onChange={handlePrimaryGroupChange}>
                <option value="Revenue">Revenue</option>
                <option value="Expenses">Expenses</option>
                <option value="Assets">Assets</option>
                <option value="Liabilities">Liabilities</option>
              </select>
            </div>
            <div className="lg-form-group">
              <label>Chart of Accounts*</label>
              <select>
                {getChartOfAccountsOptions().map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg-form-group">
              <label>Ledger Group*</label>
              <div className="lg-ledger-group">
                <input
                  type="text"
                  placeholder="Ledger Group Name"
                  className="lg-ledger-input"
                />
                <button
                  type="button"
                  onClick={toggleLedgerGroupPopup}
                  className="add-ledger"
                >
                  ?
                </button>
              </div>
              {/* <span className="error-message">
                Ledger Group Name is required
              </span> */}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Ledger Name</th>
                <th>Legal Name</th>
                <th>Description</th>
                <th>Opening Balance</th>
                <th>Opening Balance Type</th>
                <th>Is Active</th>
                <th>Is Cost Center Applicable</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ledgers.map((ledger, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={ledger.ledgerName}
                      onChange={(e) =>
                        handleInputChange(index, "ledgerName", e.target.value)
                      }
                      placeholder="Ledger Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ledger.legalName}
                      onChange={(e) =>
                        handleInputChange(index, "legalName", e.target.value)
                      }
                      placeholder="Legal Ledger Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={ledger.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={ledger.openingBalance}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "openingBalance",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name={`balanceType-${index}`}
                        value="Dr"
                        checked={ledger.openingBalanceType === "Dr"}
                        onChange={() =>
                          handleInputChange(index, "openingBalanceType", "Dr")
                        }
                      />{" "}
                      Dr
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`balanceType-${index}`}
                        value="Cr"
                        checked={ledger.openingBalanceType === "Cr"}
                        onChange={() =>
                          handleInputChange(index, "openingBalanceType", "Cr")
                        }
                      />{" "}
                      Cr
                    </label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ledger.isActive}
                      onChange={(e) =>
                        handleInputChange(index, "isActive", e.target.checked)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={ledger.isCostCenterApplicable}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "isCostCenterApplicable",
                          e.target.checked
                        )
                      }
                    />
                  </td>
                  <td>
                    <button className="lg-add-btn" onClick={addLedger}>
                      +
                    </button>
                    {index > 0 && (
                      <button
                        className="lg-remove-btn"
                        onClick={() => removeLedger(index)}
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="lg-button-row">
            <button className="cc-save-btn" onClick={handleSave}>
              Save Ledgers
            </button>
          </div>

          <button className="lg-close-btn" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      {showLedgerGroupPopup && (
        <CreateLedgerGroupPopup onClose={handleClosePopup} />
      )}
    </>
  );
};

const CreateLedgerGroupPopup = ({ onClose }) => {
  const [groupData, setGroupData] = useState({
    primaryGroup: "",
    chartOfAccount: "",
    ledgerGroupName: "",
    description: "",
    isActive: true,
  });

  const handleInputChange = (field, value) => {
    setGroupData({ ...groupData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Ledger Group:", groupData);
    onClose();
  };

  return (
    <div className="ledger-popup-overlay">
      <div className="ledger-group-popup">
        <h3>Create Ledger Group</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Primary Group*</label>
            <select
              value={groupData.primaryGroup}
              onChange={(e) =>
                handleInputChange("primaryGroup", e.target.value)
              }
              required
            >
              <option value="">Select Primary Group</option>
              <option value="Liabilities">Liabilities</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label>Chart Of Account*</label>
            <select
              value={groupData.chartOfAccount}
              onChange={(e) =>
                handleInputChange("chartOfAccount", e.target.value)
              }
              required
            >
              <option value="">Select Chart of Account</option>
              {/* Add options based on your data */}
            </select>
          </div>
          <div className="form-group">
            <label>Ledger Group Name*</label>
            <input
              type="text"
              value={groupData.ledgerGroupName}
              onChange={(e) =>
                handleInputChange("ledgerGroupName", e.target.value)
              }
              placeholder="LedgerGroupName"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={groupData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter Description"
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={groupData.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
              />
              Is Active
            </label>
          </div>
          <button type="submit" className="add-ledger-group-btn">
            Add Ledger Group
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};
export default NewLedgerPopup;
