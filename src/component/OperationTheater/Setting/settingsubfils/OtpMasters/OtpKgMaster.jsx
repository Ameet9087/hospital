import React from "react";
import "./OtpkgMaster.css";

const OtpKgMaster = () => {
  return (
    <div className="otpkgmster-container">
      <div className="otpkgmster-header">
        <h3>OT Package Master</h3>
      </div>
      <div className="otpkgmster-form">
        <label>
          Template Name: <input type="text" className="otpkgmster-input" />
        </label>
        <label>
          Surgery/Procedure: <input type="text" className="otpkgmster-input" />
        </label>
      </div>
      <table className="otpkgmster-table">
        <thead>
          <tr>

            <th>SN</th>
            <th>Item Name</th>
            <th>Qty</th>
          </tr>
        </thead>
        <tbody>
          <tr>

            <td>1</td>
            <td>
              <input type="text" className="otpkgmster-item-input" />
            </td>
            <td>
              <input type="number" className="otpkgmster-qty-input" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="otpkgmster-sidebar">
        <button>Save</button>
        <button>Delete</button>
        <button>Clear</button>
        <button>Close</button>
        <button>Search</button>
        <button>Tracking</button>
        <button>Print</button>
        <button>Error Logs</button>
        <button>Export</button>
        <button>Import</button>
        <button>Health</button>
        <button>Version Comparison</button>
        <button>SDC</button>
        <button>Testing</button>
        <button>Info</button>
      </div>
    </div>
  );
};

export default OtpKgMaster;
