// InventoryVendor.jsx
import React, { useState, useRef } from "react";
import "./InventoryVendor.css";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";

const InventoryVendor = () => {
  const vendors = [
    {
      name: "SHIKAMED CHEMIST",
      ledgerCode: "647576",
      ledgerName: "Apple Vendor",
      description: "",
      openingBalance: 0,
      balanceType: "Dr",
      active: true,
      tdsPercent: 0,
      kraPin: "",
      address: "",
      mobile: "",
      landline: "",
    },
    {
      name: "DAIMA DISPENSING CHEMIST",
      ledgerCode: "288772",
      ledgerName: "company & ashar",
      description: "",
      openingBalance: 0,
      balanceType: "Dr",
      active: true,
      tdsPercent: 0,
      kraPin: "",
      address: "",
      mobile: "",
      landline: "",
    },
    {
      name: "MEDS",
      ledgerCode: "452392",
      ledgerName: "Ashar & Company",
      description: "",
      openingBalance: 0,
      balanceType: "Dr",
      active: true,
      tdsPercent: 0,
      kraPin: "",
      address: "",
      mobile: "",
      landline: "",
    },
    {
      name: "Shadon Medical Diagnostic",
      ledgerCode: "452392",
      ledgerName: "Some Vendor",
      description: "",
      openingBalance: 0,
      balanceType: "Dr",
      active: true,
      tdsPercent: 0,
      kraPin: "",
      address: "",
      mobile: "",
      landline: "",
    },
    {
      name: "Arbaz Pathan",
      ledgerCode: "",
      ledgerName: "",
      description: "",
      openingBalance: 0,
      balanceType: "Dr",
      active: true,
      tdsPercent: 0,
      kraPin: "",
      address: "",
      mobile: "",
      landline: "",
    },
  ];

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <div className="inventory-vendor-container">
      <div className="header-section">
        <label className="primary-group">Primary Group*</label>
        <select className="select-box">
          <option value="Liabilities">Liabilities</option>
        </select>

        <label className="chart-account">Chart of Accounts*</label>
        <select className="select-box">
          <option value="Current Liabilities">Current Liabilities</option>
        </select>

        <label className="ledger-group">Ledger Group*</label>
        <select className="select-box">
          <option value="Sundry Creditors">Sundry Creditors</option>
        </select>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="type here to search Inventory Vendor"
          className="search-input"
        />
        <input type="checkbox" id="all" className="checkbox" />
        <label htmlFor="all">All ({vendors.length})</label>
      </div>

      <div className="status-section">
        <div className="status-item">
          <input type="checkbox" id="inventory-with-ac" className="checkbox" />
          <label htmlFor="inventory-with-ac">
            Inventory Vendor with A/c Head (
            {vendors.filter((vendor) => vendor.ledgerName).length})
          </label>
        </div>
        <div className="status-item">
          <input
            type="checkbox"
            id="inventory-without-ac"
            className="checkbox red"
          />
          <label htmlFor="inventory-without-ac">
            Inventory Vendor without A/c Head (
            {vendors.filter((vendor) => !vendor.ledgerName).length})
          </label>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "",
                "Organization Name",
                "Ledger Code",
                "Ledger Name",
                "Description",
                "Opening Balance",
                "Opening Balance Type",
                "Active",
                "TDS Percent",
                "PIN",
                "Address",
                "Mobile No.",
                "Landline No.",
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
            {vendors.map((vendor, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    className={`checkbox ${!vendor.ledgerName ? "red" : ""}`}
                  />{" "}
                </td>
                <td>{vendor.name}</td>
                <td>{vendor.ledgerCode}</td>
                <td className="ledger-name">{vendor.ledgerName}</td>
                <td>{vendor.description}</td>
                <td>
                  <input
                    type="number"
                    defaultValue={vendor.openingBalance}
                    className="number-input"
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    name={`balanceType${index}`}
                    checked={vendor.balanceType === "Dr"}
                    readOnly
                  />{" "}
                  Dr
                  <input
                    type="radio"
                    name={`balanceType${index}`}
                    checked={vendor.balanceType === "Cr"}
                    readOnly
                  />{" "}
                  Cr
                </td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={vendor.active}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    defaultValue={vendor.tdsPercent}
                    className="number-input"
                  />
                </td>
                <td>{vendor.kraPin}</td>
                <td>{vendor.address}</td>
                <td>{vendor.mobile}</td>
                <td>{vendor.landline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer-section">
        <button className="save-button">Save Ledgers</button>
      </div>
    </div>
  );
};

export default InventoryVendor;
