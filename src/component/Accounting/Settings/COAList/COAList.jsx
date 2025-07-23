import React, { useState, useEffect, useRef } from "react";
import "./COAList.css";
import CreateCoaPopup from "./NewCoaPopup";
import UpdateCoaPopup from "./UpdateCoaPopup";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const dummyData = [
  {
    coaName: "Cash Account",
    coaCode: "CA1001",
    description: "Primary cash account for daily transactions.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    coaName: "Bank Account",
    coaCode: "BA1002",
    description: "Bank account used for receiving payments.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    coaName: "Accounts Receivable",
    coaCode: "AR1003",
    description: "Amounts owed by customers.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    coaName: "Accounts Payable",
    coaCode: "AP1004",
    description: "Amounts owed to suppliers.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    coaName: "Revenue Account",
    coaCode: "RA1005",
    description: "Revenue from sales.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    coaName: "Office Supplies",
    coaCode: "OS1006",
    description: "Expenses for office supplies.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    coaName: "Salary Account",
    coaCode: "SA1007",
    description: "Expenses for employee salaries.",
    isActive: "Yes",
    action: "Edit",
  },
  {
    coaName: "Utilities Account",
    coaCode: "UA1008",
    description: "Expenses for utilities like electricity and water.",
    isActive: "No",
    action: "Edit",
  },
];

function COAList() {
  const [showCreateCoaPopup, setShowCreateCoaPopup] = useState(false);
  const [showUpdateLedgerPopup, setShowUpdateLedgerPopup] = useState(false);
  const [selectedCoaData, setSelectedCoaData] = useState(null);

  const handleNewCOA = () => {
    setShowCreateCoaPopup(true);
  };
  const handleUpdateCoa = (item) => {
    setSelectedCoaData(item);
    setShowUpdateLedgerPopup(true);
  };

  // const handleNewDependent = () => {
  //   setShowNewDependentPopup(true);
  // };

  const handleClosePopup = () => {
    setShowCreateCoaPopup(false);
    setShowUpdateLedgerPopup(false);
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <div className="coa">
      <div className="coa-create">
        <button className="" onClick={handleNewCOA}>
          + Create COA
        </button>
      </div>
      <div className="coa-search-bar">
        <div className="coa-search-container">
          <input type="text" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div>
          <span className="coa-results-count">
            Showing {dummyData.length} / {dummyData.length}
          </span>
          <button className="coa-print-btn">Print</button>
        </div>
      </div>
      <div className="table-container">
        <table className="coa-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "COA Name",
                "COA Code",
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
                <td>{item.coaName}</td>
                <td>{item.coaCode}</td>
                <td>{item.description}</td>
                <td>{item.isActive}</td>
                <td>
                  <button
                    onClick={() => handleUpdateCoa(item)}
                    className="coa-table-btn"
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
      {showCreateCoaPopup && <CreateCoaPopup onClose={handleClosePopup} />}
      {showUpdateLedgerPopup && (
        <UpdateCoaPopup
          initialData={selectedCoaData}
          closeupdate={handleClosePopup}
        />
      )}
    </div>
  );
}

export default COAList;
