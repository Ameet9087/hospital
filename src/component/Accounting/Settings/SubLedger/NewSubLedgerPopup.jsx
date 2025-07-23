import React, { useState, useEffect, useRef } from "react";
import "./NewSubLedger.css";

const NewSubLedgerPopup = ({ onClose }) => {
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

  const [groupSearchTerm, setGroupSearchTerm] = useState("");
  const [ledgerSearchTerm, setLedgerSearchTerm] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [showLedgerDropdown, setShowLedgerDropdown] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [filteredLedgers, setFilteredLedgers] = useState([]);

  const dropdownGroupRef = useRef(null);
  const dropdownLedgerRef = useRef(null);

  const ledgerGroups = [
    "Sundry Debtors",
    "CONSULTANT (CREDIT A/C)",
    "Sundry Creditors",
    "RESERVE AND SURPLUSES",
    "Bank",
    "Cash In Hand",
    "Inventory",
    "Fixed Assets",
    "Cost of Goods Consumed",
    "Cost of Goods Sold",
    "Administration Expenses",
    "Duties and Taxes",
    "Patient Deposits (Liability)",
  ];

  const ledgerMapping = {
    "Sundry Debtors": [
      "Sundry Debtors (Receivables)",
      "Test CR",
      "Example Ledger 1",
    ],
    "CONSULTANT (CREDIT A/C)": ["Consultant A", "Consultant B"],
    "Sundry Creditors": ["Creditor A", "Creditor B"],
    Bank: ["BANK A/C#", "Example Bank Ledger"],
    "Cash In Hand": ["CASH", "PRETTY CASH"],
    Inventory: [
      "Merchandise Inventory",
      "INVENTORY PHARMACY",
      "INVENTORY HOSPITAL",
    ],
    "Fixed Assets": ["FIXED ASSETS", "Example Asset Ledger"],
    "Cost of Goods Sold": ["COGS", "Example COGS Ledger"],
  };

  const handleGroupSearchChange = (value) => {
    setGroupSearchTerm(value);
    const filtered = ledgerGroups.filter((group) =>
      group.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredGroups(filtered);
    setShowGroupDropdown(true);
  };

  const handleGroupSelect = (value) => {
    setGroupSearchTerm(value);
    setSelectedGroup(value);
    setFilteredLedgers(ledgerMapping[value] || []); // Fetch related ledgers
    setShowGroupDropdown(false);
    setLedgerSearchTerm(""); // Clear ledger search term when a new group is selected
    setShowLedgerDropdown(false); // Don't show ledger dropdown automatically
  };

  const handleLedgerSearchChange = (value) => {
    setLedgerSearchTerm(value);
    const filtered = (ledgerMapping[selectedGroup] || []).filter((ledger) =>
      ledger.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLedgers(filtered);
    setShowLedgerDropdown(true); // Show ledger dropdown when searching
  };

  const handleLedgerClick = () => {
    setShowLedgerDropdown(true);
  };

  const handleLedgerSelect = (value) => {
    setLedgerSearchTerm(value);
    setShowLedgerDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownGroupRef.current &&
      !dropdownGroupRef.current.contains(event.target)
    ) {
      setShowGroupDropdown(false);
    }
    if (
      dropdownLedgerRef.current &&
      !dropdownLedgerRef.current.contains(event.target)
    ) {
      setShowLedgerDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  return (
    <>
      <div className="sub-ledger-popup-overlay">
        <div className="sub-ledger-popup-content">
          <h2>Create Ledger</h2>

          <div className="sub-ledger-form-row">
            <div className="sub-ledger-form-group">
              <label>Ledger Group</label>
              <div className="sub-ledger-ledger-group" ref={dropdownGroupRef}>
                <input
                  type="text"
                  placeholder="Search Ledger Group"
                  className="sub-ledger-ledger-input"
                  value={groupSearchTerm}
                  onChange={(e) => handleGroupSearchChange(e.target.value)}
                  onClick={() => setShowGroupDropdown(true)}
                />
                {showGroupDropdown && (
                  <ul className="sub-ledger-dropdown">
                    {ledgerGroups.map((group, index) => (
                      <li
                        key={index}
                        className="sub-ledger-item"
                        onClick={() => handleGroupSelect(group)}
                      >
                        {group}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="sub-ledger-form-group">
              <label>Ledger</label>
              <div className="sub-ledger-ledger-group" ref={dropdownLedgerRef}>
                <input
                  type="text"
                  placeholder="Search Ledger"
                  className="sub-ledger-ledger-input"
                  value={ledgerSearchTerm}
                  onClick={handleLedgerClick} // Show dropdown on click
                  onChange={(e) => handleLedgerSearchChange(e.target.value)}
                />
                {showLedgerDropdown && (
                  <ul className="sub-ledger-dropdown">
                    {filteredLedgers.length > 0 ? (
                      filteredLedgers.map((ledger, index) => (
                        <li
                          key={index}
                          className="sub-ledger-item"
                          onClick={() => handleLedgerSelect(ledger)}
                        >
                          {ledger}
                        </li>
                      ))
                    ) : (
                      <li className="sub-ledger-item">No ledgers found</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Ledger Name</th>
                <th>Legal Name</th>
                <th>Opening Balance Type</th>
                <th>Description</th>
                <th></th>
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
                      type="text"
                      value={ledger.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                      placeholder="Description"
                    />
                  </td>
                  <td>
                    <button className="sub-ledger-add-btn" onClick={addLedger}>
                      +
                    </button>
                    {index > 0 && (
                      <button
                        className="sub-ledger-remove-btn"
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

          <div className="sub-ledger-button-row">
            <button className="sub-ledger-save-btn" onClick={handleSave}>
              Save Ledgers
            </button>
          </div>

          <button className="sub-ledger-close-btn" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default NewSubLedgerPopup;
