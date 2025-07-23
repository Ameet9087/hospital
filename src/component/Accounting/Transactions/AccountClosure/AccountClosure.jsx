import React from "react";
import "./AccountClosure.css";

const AccountClosure = () => {
  return (
    <div className="ac">
      <div className="ac-content">
        <div className="ac-fiscal-details">
          <h2>Fiscal year details</h2>
          <div className="ac-form">
            <div className="ac-form-group">
              <label>Fiscal Year Name:</label>
              <select>
                <option>2024</option>
              </select>
            </div>
            <div className="ac-form-group">
              <label>Starting Date:</label>
              <span>AD 2024-01-01</span>
            </div>
            <div className="ac-form-group">
              <label>End Date:</label>
              <span>AD 2024-12-31</span>
            </div>
            <div className="ac-form-group">
              <label>Account Closed Status:</label>
              <span>Closed</span>
            </div>
          </div>
          <button className="ac-close-btn">Close Account</button>
        </div>
        <div className="ac-activity">
          <h2>Fiscal Year Activity Details</h2>
          <div className="ac-search">
            <div className="ac-search-container">
              <input type="text" placeholder="Search" />
              <i className="fas fa-search"></i>
            </div>
            <span className="ac-results">Showing 0 / 0 results</span>
          </div>
          <table className="ac-table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Fiscal Year</th>
                <th>Date</th>
                <th>Action</th>
                <th>By</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="6" className="ac-no-rows">
                  No Rows To Show
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountClosure;
