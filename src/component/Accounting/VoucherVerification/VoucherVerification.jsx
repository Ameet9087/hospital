import React, { useState, useRef } from "react";
import "./VoucherVerification.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const VoucherVerification = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  return (
    <div className="vv">
      <main className="vv-main">
        <h1 className="vv-title">Voucher Verification</h1>

        <form className="vv-form">
          <div className="vv-form-first-group">
            <div className="vv-form-group">
              <label>Select Fiscal Year *:</label>
              <div className="vv-form-input-group">
                <select>
                  <option>2024</option>
                </select>
                <label>From:</label>
                <input type="date" value="2024-08-12" />
                <label>To:</label>
                <input type="date" value="2024-08-12" />
                <button className="vv-star-btn">☆</button>
              </div>
            </div>
          </div>

          <div className="vv-form-second-group">
            <div className="vv-form-group">
              <label>Voucher Type *:</label>
              <div className="vv-form-input-group">
                <select>
                  <option>Vendor Bill</option>
                </select>
              </div>
            </div>
            <div className="vv-form-group">
              <label>Select Module *:</label>
              <div className="vv-form-input-group">
                <select>
                  <option>Inventory</option>
                </select>
              </div>
            </div>
            <button className="vv-load-btn">↻ Load</button>
          </div>
        </form>

        <div className="vv-search">
          <div className="vv-search-bar">
            <input type="text" placeholder="Search" />
            <i className="fas fa-search"></i>
          </div>
          <div className="vv-results">
            <span>Showing 0 / 0 results</span>
            <button className="vv-export-btn">Export</button>
            <button className="vv-print-btn">Print</button>
          </div>
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Voucher No.",
                  "Fiscal Year",
                  "Transaction Date",
                  "Voucher Type",
                  "Total Amount",
                  "Narration",
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
              <tr>
                <td colSpan="7" className="vv-no-rows">
                  No Rows To Show
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default VoucherVerification;
