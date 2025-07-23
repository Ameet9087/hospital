import React, { useState } from "react";
import "./PostAccounting.css";

function PostAccounting() {
  const [fiscalYear, setFiscalYear] = useState("2024/2024");
  const [month, setMonth] = useState("2024-Aug");
  const [module, setModule] = useState("Inventory");
  const [switchTo, setSwitchTo] = useState("AD");
  const handleSwitch = () => {
    switchTo != "AD" ? setSwitchTo("AD") : setSwitchTo("BS");
  };
  return (
    <div className="post-to-accounting">
      <div className="PA-filter-form">
        <div className="PA-form-group">
          <label>Select Fiscal Year:</label>
          <div className="PA-date">
            <select
              className="PA-select"
              value={fiscalYear}
              onChange={(e) => setFiscalYear(e.target.value)}
            >
              <option>2024/2024</option>
            </select>
            <select
              className="PA-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option>2024-Aug</option>
            </select>
          </div>
        </div>
        <div className="PA-form-group">
          <label>
            Select Module <span className="required">*</span>:
          </label>
          <div className="PA-module">
            <select
              className="PA-select"
              value={module}
              onChange={(e) => setModule(e.target.value)}
            >
              <option>Inventory</option>
              <option>Billing</option>
              <option>Pharmacy</option>
              <option>Incentive</option>
            </select>
            <button className="PA-load-btn">↻ Load</button>
          </div>
        </div>
      </div>

      <table className="PA-data-table">
        <thead className="PA-data-tablehead">
          <tr>
            <th>Sr. No.</th>
            <th>
              <button className="PA-data-btn" onClick={handleSwitch}>
                {switchTo} ↻
              </button>
            </th>
            <th>Transaction Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="PA-data-tablerow">
            <td colSpan="4" className="no-data">
              No Data Available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PostAccounting;
