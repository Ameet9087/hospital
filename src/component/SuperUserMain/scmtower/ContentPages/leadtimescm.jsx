import React, { useState, useRef } from 'react';
import './LeadTimeSCM.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';

const LeadTimeSCM = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="leadtime-container">
      <h1 className="leadtime-title">Lead Time Monitoring</h1>
      <p className="leadtime-description">
        Track the time taken between placing orders and receiving critical supplies to ensure efficient hospital operations.
      </p>

      {/* Lead Time Overview Card */}
      <div className="leadtime-card">
        <h2 className="leadtime-section-title">Current Lead Time Overview</h2>
        <ul className="leadtime-list">
          <li>Average Lead Time: <strong>5 days</strong></li>
          <li>Longest Lead Time: <strong>10 days</strong></li>
          <li>Shortest Lead Time: <strong>2 days</strong></li>
        </ul>
      </div>

      {/* Detailed Lead Time Table */}
      <div className="leadtime-table-container">
        <h2 className="leadtime-section-title">Detailed Lead Time by Supplier</h2>
        <table className="leadtime-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Supplier",
                "Product",
                "Order Date",
                "Received Date",
                "Lead Time (Days)"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="rd-resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ABC Pharmaceuticals</td>
              <td>Antibiotics</td>
              <td>2024-09-20</td>
              <td>2024-09-25</td>
              <td>5 days</td>
            </tr>
            <tr>
              <td>XYZ Medical</td>
              <td>Surgical Tools</td>
              <td>2024-09-15</td>
              <td>2024-09-25</td>
              <td>10 days</td>
            </tr>
            <tr>
              <td>Quick Health Supplies</td>
              <td>Face Masks</td>
              <td>2024-09-21</td>
              <td>2024-09-23</td>
              <td>2 days</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add more sections for visual representation or other insights */}
      <Link to="/superuser/tower" className="leadtimedeliveris-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default LeadTimeSCM;
