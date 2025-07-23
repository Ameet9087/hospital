import React, { useState, useEffect, useRef } from "react";
import "./LedgerGroup.css";
import CreateledgergroupPopup from "./CreateLedgerGroupPopup";
import UpdateLedgerGroupPopup from "./UpdateLedgerGroupPopup"; // Assuming this component exists
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const dummyData = [
  {
    primaryGroup: "Assets",
    chartOfAccount: "Fixed Assets",
    ledgerGroup: "Land & Buildings",
    description: "Account for land and buildings owned by the company.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    primaryGroup: "Liabilities",
    chartOfAccount: "Long Term Liabilities",
    ledgerGroup: "Bank Loan",
    description: "Long-term bank loan.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    primaryGroup: "Revenue",
    chartOfAccount: "Direct Income",
    ledgerGroup: "Sales",
    description: "Income from sales.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    primaryGroup: "Expenses",
    chartOfAccount: "Direct Expense",
    ledgerGroup: "Cost of Goods Sold",
    description: "Cost related to the production of goods sold.",
    isActive: "No",
    action: "Edit",
  },
];

function LedgerGroupList() {
  const [showCreateledgergroupPopup, setShowCreateledgergroupPopup] =
    useState(false);
  const [showUpdateLedgerPopup, setShowUpdateLedgerPopup] = useState(false);
  const [selectedLedgerGroup, setSelectedLedgerGroup] = useState(null);

  const handleNewledgergroup = () => {
    setSelectedLedgerGroup(null); // Clear selection for a new ledger group
    setShowCreateledgergroupPopup(true);
  };

  const handleUpdateLedger = (ledgerGroup) => {
    console.log(ledgerGroup);

    setSelectedLedgerGroup(ledgerGroup); // Set the selected ledger group for editing
    setShowUpdateLedgerPopup(true);
  };

  const handleClosePopup = () => {
    setShowCreateledgergroupPopup(false);
    setShowUpdateLedgerPopup(false);
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (
    <div className="ledger-group">
      <div className="ledger-group-create">
        <button className="" onClick={handleNewledgergroup}>
          + Create Ledger Group
        </button>
      </div>
      <div className="ledger-group-search-bar">
        <div className="ledger-group-search-container">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <span className="ledger-group-results-count">
            Showing {dummyData.length} / {dummyData.length} results
          </span>
          <button className="ledger-group-print-btn">Print</button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Primary Group",
                "Chart Of Account",
                "Ledger Group",
                "Description",
                "Is Active",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData?.map((item, index) => (
              <tr key={index}>
                <td>{item.primaryGroup}</td>
                <td>{item.chartOfAccount}</td>
                <td>{item.ledgerGroup}</td>
                <td>{item.description}</td>
                <td>{item.isActive}</td>
                <td>
                  <button
                    onClick={() => handleUpdateLedger(item)}
                    className="ledger-group-table-btn"
                    type="button"
                  >
                    {item.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showCreateledgergroupPopup && (
        <CreateledgergroupPopup
          onClose={handleClosePopup}
          ledgerGroup={selectedLedgerGroup} // Pass the selected ledger group data
        />
      )}
      {showUpdateLedgerPopup && (
        <UpdateLedgerGroupPopup
          onClose={handleClosePopup}
          data={selectedLedgerGroup} // Pass the selected ledger group data
        />
      )}
    </div>
  );
}

export default LedgerGroupList;
