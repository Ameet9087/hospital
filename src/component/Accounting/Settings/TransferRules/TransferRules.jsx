import React, { useState, useRef } from "react";
import "./TransferRules.css";

const TransferRules = () => {
  const [selectedModule, setSelectedModule] = useState("Inventory");
  const [showTable, setShowTable] = useState(false);
  const moduleOptions = ["Inventory", "Billing", "Pharmacy", "Incentive"];

  const dummyData = {
    Inventory: [
      {
        id: 1,
        moduleName: "Inventory",
        voucherName: "Journal Voucher",
        customVoucherName: "Journal Voucher",
        ruleName: "INV_ConsumableDispatch",
        isActive: true,
      },
      {
        id: 2,
        moduleName: "Inventory",
        voucherName: "Journal Voucher",
        customVoucherName: "Journal Voucher",
        ruleName: "INV_ConsumableDispatchReturn",
        isActive: true,
      },
      {
        id: 3,
        moduleName: "Inventory",
        voucherName: "Purchase Voucher",
        customVoucherName: "Purchase Voucher",
        ruleName: "INV_ConsumablePurchase",
        isActive: true,
      },
    ],
    Billing: [
      {
        id: 1,
        moduleName: "Billing",
        voucherName: "Invoice",
        customVoucherName: "Invoice",
        ruleName: "BILL_GenerateInvoice",
        isActive: true,
      },
      {
        id: 2,
        moduleName: "Billing",
        voucherName: "Receipt",
        customVoucherName: "Receipt",
        ruleName: "BILL_GenerateReceipt",
        isActive: true,
      },
    ],
    Pharmacy: [
      {
        id: 1,
        moduleName: "Pharmacy",
        voucherName: "Prescription",
        customVoucherName: "Prescription",
        ruleName: "PHARM_IssueMedicine",
        isActive: true,
      },
      {
        id: 2,
        moduleName: "Pharmacy",
        voucherName: "Stock Entry",
        customVoucherName: "Stock Entry",
        ruleName: "PHARM_UpdateStock",
        isActive: true,
      },
    ],
    Incentive: [
      {
        id: 1,
        moduleName: "Incentive",
        voucherName: "Payout",
        customVoucherName: "Payout",
        ruleName: "INC_CalculatePayout",
        isActive: true,
      },
      {
        id: 2,
        moduleName: "Incentive",
        voucherName: "Adjustment",
        customVoucherName: "Adjustment",
        ruleName: "INC_AdjustIncentive",
        isActive: true,
      },
    ],
  };

  const [voucherData, setVoucherData] = useState(dummyData[selectedModule]);

  const handleShow = () => {
    setVoucherData(dummyData[selectedModule]);
    setShowTable(true);
  };

  const handleDeactivate = (id) => {
    setVoucherData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isActive: false } : item
      )
    );
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const startResizing = (index) => (e) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = tableRef.current
      ? tableRef.current.querySelector(`th:nth-child(${index + 1})`).offsetWidth
      : 0;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [index]: `${newWidth}px`,
      }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="transferRule-management">
      <div className="transferRule-module-selector">
        <select
          value={selectedModule}
          onChange={(e) => {
            setSelectedModule(e.target.value);
            setShowTable(false);
          }}
          className="transferRule-module-select"
        >
          {moduleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button className="transferRule-show-button" onClick={handleShow}>
          Show
        </button>
      </div>
      {showTable && (
        <>
          <div className="transferRule-search-bar">
            <div className="transferRule-search-container">
              <input type="text" placeholder="Search" />
              <i className="fas fa-search"></i>
            </div>
            <div>
              <span className="transferRule-results-count">
                Showing {voucherData.length} / {voucherData.length}
              </span>
              <button className="transferRule-print-btn">Print</button>
            </div>
          </div>
          <table className="transferRule-table" ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Ledger Name",
                  "SubLedger Name",
                  "SubLedger Code",
                  "Opening Balance",
                  "Description",
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
                        onMouseDown={startResizing(index)}
                      ></div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {voucherData?.map((item, index) => (
                <tr key={index}>
                  <td>{item.moduleName}</td>
                  <td>{item.voucherName}</td>
                  <td>{item.customVoucherName}</td>
                  <td>{item.ruleName}</td>
                  <td>{item.isActive.toString()}</td>
                  <td>
                    {item.isActive ? (
                      <button
                        className="transferRule-deactivate-button"
                        onClick={() => handleDeactivate(item.id)}
                      >
                        Deactivate
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TransferRules;
