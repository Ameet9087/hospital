import React, { useState, useRef } from "react";
import './dischargeTrack.css';
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

export default function DischargeTrack() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [data, setData] = useState([
    {
      sn: 1,
      name: "John Doe",
      ipno: "12345",
      dischargeDate: "2024-11-25",
      bedNo: "A101",
      organisation: "XYZ Org",
      dischargeClearance: "Pending",
      pharmacyClearance: "Cleared",
      nurseClearance: "Pending"
    },
    {
      sn: 2,
      name: "Jane Smith",
      ipno: "67890",
      dischargeDate: "2024-11-24",
      bedNo: "B202",
      organisation: "ABC Corp",
      dischargeClearance: "Cleared",
      pharmacyClearance: "Pending",
      nurseClearance: "Cleared"
    }
  ]);

  return (
    <div className="dischargetrack-container">
      <div className="dischargetrack-upper-bar">
        DISCHARGE TRACKING STD
      </div>
      <div className="dischargetrack-type-container">
  <label htmlFor="type" className="dischargetrack-label">Type:</label>
  <select id="type" className="dischargetrack-select">
    <option value="">All</option>
    <option value="first">First</option>
    <option value="second">Second</option>
  </select>
  <label htmlFor="date" className="dischargetrack-label">Date:</label>
  <input type="date" id="date" className="dischargetrack-input" />

  
</div>

      <button className="dischargetrack-button">Submit</button>

      <div className="dischargetrack-table-bar">
        DISCHARGE TRACKING STATUS
      </div>
      
      <div className="table-container">

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "NAME",
                "IPNO",
                "Discharge Information Date",
                "Bed No",
                "Organisation",
                "DISCHARGE CLEARANCE",
                "PHARMACY CLEARANCE",
                "NURSE CLEARANCE",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] || "auto" }}
                  className="dischargetrack-resizable-th"
                >
                  <div className="dischargetrack-header-content">
                    <span>{header}</span>
                    <div
                      className="dischargetrack-resizer"
                      onMouseDown={startResizing(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.sn}</td>
                  <td>{item.name}</td>
                  <td>{item.ipno}</td>
                  <td>{item.dischargeDate}</td>
                  <td>{item.bedNo}</td>
                  <td>{item.organisation}</td>
                  <td>{item.dischargeClearance}</td>
                  <td>{item.pharmacyClearance}</td>
                  <td>{item.nurseClearance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="dischargetrack-no-data">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


</div>
);
}
