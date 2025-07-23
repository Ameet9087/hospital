import React, { useState, useEffect, useRef } from "react";
import "./LedgerList.css";
import CreateLedgerPopup from "./NewLedgerPopup";
import UpdateLedgerPopup from "./UpdateLedgerPopup";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const dummyData = [
  {
    code: "1001",
    ledgerName: "Cash Account",
    primaryGroup: "Assets",
    chartOfAccount: "General Ledger",
    ledgerGroup: "Cash Group",
    action: "Edit",
    employee: "John Doe",
    department: "Finance",
    designation: "Accountant",
    relation: "Self",
    insNo: "INS12345",
    remarks: "Primary cash account",
    isActive: "true",
  },
  {
    code: "1002",
    ledgerName: "Bank Account",
    primaryGroup: "Assets",
    chartOfAccount: "General Ledger",
    ledgerGroup: "Bank Group",
    isActive: "true",
    action: "Edit",
    employee: "Jane Smith",
    department: "Finance",
    designation: "Senior Accountant",
    relation: "Spouse",
    insNo: "INS54321",
    remarks: "Primary bank account",
  },
  {
    code: "1003",
    ledgerName: "Accounts Receivable",
    primaryGroup: "Assets",
    chartOfAccount: "General Ledger",
    ledgerGroup: "Receivables Group",
    isActive: "true",
    action: "Edit",
    employee: "Alice Johnson",
    department: "Sales",
    designation: "Sales Manager",
    relation: "Child",
    insNo: "INS67890",
    remarks: "Customer receivables",
  },
  {
    code: "1004",
    ledgerName: "Accounts Payable",
    primaryGroup: "Liabilities",
    chartOfAccount: "General Ledger",
    ledgerGroup: "Payables Group",
    isActive: "true",
    action: "Edit",
    employee: "Bob Lee",
    department: "Procurement",
    designation: "Procurement Manager",
    relation: "Parent",
    insNo: "INS09876",
    remarks: "Supplier payables",
  },
  {
    code: "1005",
    ledgerName: "Revenue Account",
    primaryGroup: "Income",
    chartOfAccount: "General Ledger",
    ledgerGroup: "Revenue Group",
    isActive: "true",
    action: "Edit",
    employee: "Carol King",
    department: "Sales",
    designation: "Sales Executive",
    relation: "Sibling",
    insNo: "INS11223",
    remarks: "Sales revenue",
  },
];

function LedgerList() {
  const [showCreateLedgerPopup, setShowCreateLedgerPopup] = useState(false);
  const [showUpdateLedgerPopup, setShowUpdateLedgerPopup] = useState(false);
  const [selectedLedgerData, setSelectedLedgerData] = useState(null);

  const handleNewLedger = () => {
    setShowCreateLedgerPopup(true);
  };
  const handleUpdateLedger = (item) => {
    setSelectedLedgerData(item);
    setShowUpdateLedgerPopup(true);
  };

  const handleClosePopup = () => {
    setShowCreateLedgerPopup(false);
    setShowUpdateLedgerPopup(false);
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (
    <div className="lg">
      <div className="lg-create">
        <button className="" onClick={handleNewLedger}>
          + Create Ledger
        </button>
      </div>
      <div className="lg-search-bar">
        <div className="lg-search-container">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <span className="lg-results-count">
            Showing {dummyData.length} / {dummyData.length}
          </span>
          <button className="lg-print-btn">Print</button>
        </div>
      </div>
      <div className="table-container">
        <table className="lg-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Code",
                "Ledger Name",
                "primary Group",
                "Chart Of Account",
                "Ledger Group",
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
                <td>{item.code}</td>
                <td>{item.ledgerName}</td>
                <td>{item.primaryGroup}</td>
                <td>{item.chartOfAccount}</td>
                <td>{item.ledgerGroup}</td>
                <td>{item.isActive}</td>
                <td>
                  <button className="lg-table-btn" type="button">
                    Deactivate
                  </button>
                  <button
                    onClick={() => handleUpdateLedger(item)}
                    className="lg-table-btn"
                    type="button"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateLedgerPopup && (
        <CreateLedgerPopup onClose={handleClosePopup} />
      )}
      {showUpdateLedgerPopup && (
        <UpdateLedgerPopup
          data={selectedLedgerData}
          closeupdate={handleClosePopup}
        />
      )}
    </div>
  );
}

export default LedgerList;
