import React from "react";
import "./AutoIncrement.css";

export default function AutoIncrement() {
  return (
    <div className="AutoIncrement-container">
      <h1 className="AutoIncrement-heading">IP AutoIncrement Services</h1>
      <div className="AutoIncrement-row">
        <label className="AutoIncrement-label">SOC Name</label>
        <input type="text" className="AutoIncrement-input" />
      </div>
      <div className="AutoIncrement-row">
        <label className="AutoIncrement-label">Auto Increment Scheme</label>
        <input type="text" className="AutoIncrement-input" />
      </div>
      <table className="AutoIncrement-table">
        <thead>
          <tr>
            <th colSpan="3">AUTO INCREMENT SERVICES</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Action</th>
            <th>SN</th>
            <th>Service Name</th>
          </tr>
          <tr>
            <td>
              <button className="AutoIncrement-button">Add</button>
              <button className="AutoIncrement-button AutoIncrement-button-delete">Del</button>
            </td>
            <td>11</td>
            <td>Service</td>
          </tr>
        </tbody>
      </table>
{/* 
      <div className="auto-increment-buttons">
          <button className="btn-blue">Update</button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button>
          <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green">Print</button>
          <button className="btn-blue">Export</button>
          <button className="btn-gray">Import</button>
          <button className="btn-green">Health</button>
          <button className="btn-gray">Version</button>
          <button className="btn-gray">Comparison</button>
          <button className="btn-gray">SOC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button>
        </div> */}
    </div>
  );
}
