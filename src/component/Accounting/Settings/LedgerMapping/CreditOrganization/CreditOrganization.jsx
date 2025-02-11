import React, { useState, useRef } from "react";
import "./CreditOrganization.css";
import { startResizing } from "../../../../../TableHeadingResizing/ResizableColumns";

const CreditOrganization = () => {
  // Sample data (replace this with your actual data)
  const [data, setData] = useState([
    {
      id: 1,
      organizationName: "NHIF General",
      ledgerCode: "325743",
      ledgerName: "NHIF General",
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
      id: 2,
      organizationName: "NHIF CAPITATION",
      ledgerCode: "489363",
      ledgerName: "NHIF CAPITATI",
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
      id: 3,
      organizationName: "TEST CR",
      ledgerCode: "294179",
      ledgerName: "TEST CR",
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
      id: 4,
      organizationName: "BRITAM",
      ledgerCode: "1004",
      ledgerName: "Sundry Debto",
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
      id: 5,
      organizationName: "MADISON INSURANCE",
      ledgerCode: "",
      ledgerName: "Ledger Name",
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
      id: 6,
      organizationName: "MTIBA",
      ledgerCode: "",
      ledgerName: "Ledger Name",
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
      id: 7,
      organizationName: "NHIF LINDA MAMA SVD",
      ledgerCode: "",
      ledgerName: "Ledger Name",
      openingBalance: 0,
      balanceType: "Dr",
      active: true,
      tdsPercent: 0,
      kraPin: "",
      address: "",
      mobile: "",
      landline: "",
    },
  ]);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  return (
    <div className="credit-organization-container">
      <div className="filters">
        <label>
          Primary Group:
          <select>
            <option value="assets">Assets</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          Chart of Accounts:
          <select>
            <option value="current-assets">Current Assets</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          Ledger Group:
          <select>
            <option value="sundry-debtors">Sundry Debtors</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Type here to search Credit Organizations"
          />
          <button>Search</button>
        </div>
        <div className="checkbox-filters">
          <label>
            <input type="checkbox" /> All (7)
          </label>
          <label>
            <input type="checkbox" /> Credit Organization with A/c Head (4)
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
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{item.organizationName}</td>
                <td>{item.ledgerCode}</td>
                <td className="ledger">{item.ledgerName}</td>
                <td>
                  <input type="text" placeholder="Description" />
                </td>
                <td>
                  <input type="number" value={item.openingBalance} />
                </td>
                <td>
                  <label>
                    <input type="radio" checked={item.balanceType === "Dr"} />{" "}
                    Dr
                  </label>
                  <label>
                    <input type="radio" checked={item.balanceType === "Cr"} />{" "}
                    Cr
                  </label>
                </td>
                <td>
                  <input type="checkbox" checked={item.active} />
                </td>
                <td>
                  <input type="number" value={item.tdsPercent} />
                </td>
                <td>
                  <input type="text" value={item.kraPin} />
                </td>
                <td>
                  <input type="text" value={item.address} />
                </td>
                <td>
                  <input type="text" value={item.mobile} />
                </td>
                <td>
                  <input type="text" value={item.landline} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="save-button">Save Ledgers</button>
    </div>
  );
};

export default CreditOrganization;
