import React, { useState, useRef } from "react";
import "./InventorySubstore.css";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";

const InventorySubstore = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Maternity Substore",
      code: 237631,
      ledgerName: "Maternity Substore",
      active: true,
      dr: true,
      cr: true,
    },
    {
      id: 2,
      name: "Accounts",
      code: 878825,
      ledgerName: "Accounts",
      active: true,
      dr: true,
      cr: true,
    },
    {
      id: 3,
      name: "SubStore3",
      code: 878825,
      ledgerName: "SubStore3",
      active: true,
      dr: true,
      cr: true,
    },
    {
      id: 4,
      name: "male ward SubStore",
      code: 520020,
      ledgerName: "male ward SubStore",
      active: true,
      dr: true,
      cr: true,
    },
    {
      id: 5,
      name: "SubStore1",
      code: 520020,
      ledgerName: "SubStore1",
      active: true,
      dr: true,
      cr: true,
    },
    {
      id: 6,
      name: "Main Dispensary",
      code: null,
      ledgerName: "",
      active: false,
      dr: false,
      cr: false,
    },
    {
      id: 7,
      name: "ICU Sub store",
      code: null,
      ledgerName: "",
      active: false,
      dr: false,
      cr: false,
    },
    {
      id: 8,
      name: "Private Sub Store",
      code: null,
      ledgerName: "",
      active: false,
      dr: false,
      cr: false,
    },
    {
      id: 9,
      name: "Female Ward Substore",
      code: null,
      ledgerName: "",
      active: false,
      dr: false,
      cr: false,
    },
  ]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (
    <div className="inventory-substore-container">
      <div className="inventory-substore-header">
        <label>
          Primary Group <span>*</span>
        </label>
        <select>
          <option value="Expenses">Expenses</option>
          {/* Add more options if needed */}
        </select>
        <label>
          Chart of Accounts <span>*</span>
        </label>
        <select>
          <option value="Cost of Goods Consumed">Cost of Goods Consumed</option>
          {/* Add more options if needed */}
        </select>
        <label>
          Ledger Group <span>*</span>
        </label>
        <select>
          <option value="Sundry Creditors">Sundry Creditors</option>
          {/* Add more options if needed */}
        </select>
        <input type="text" placeholder="Type here to search substore" />
        <input type="checkbox" defaultChecked /> All ({data.length})
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "",
                "SubStore Name",
                "Ledger Code",
                "Ledger Name",
                "Description",
                "Opening Balance",
                "Opening Balance Type",
                "Active",
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
            {data.map((item) => (
              <tr key={item.id} className={item.code ? "has-code" : "no-code"}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.name}</td>
                <td>{item.code || ""}</td>
                <td>
                  <input type="text" value={item.ledgerName} readOnly />
                </td>
                <td>
                  <input type="text" placeholder="" />
                </td>
                <td>
                  <input type="text" placeholder="0" />
                </td>
                <td>
                  <label>
                    <input type="checkbox" checked={item.dr} readOnly /> Dr
                  </label>
                  <label>
                    <input type="checkbox" checked={item.cr} readOnly /> Cr
                  </label>
                </td>
                <td>
                  <input type="checkbox" checked={item.active} readOnly />{" "}
                  Active
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="inventory-substore-save-btn">Save Ledgers</button>
    </div>
  );
};

export default InventorySubstore;
