import React, { useState, useRef } from 'react';
import './ExpiredContractsSCM.css';
import { Link } from 'react-router-dom';
import { startResizing } from './ResizableColumns';

const ExpiredContractsSCM = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="expired-contracts-container">
      <h1 className="expired-contracts-title">Expired Contracts</h1>
      <p className="expired-contracts-description">
        Monitor contracts that have expired and require immediate attention to avoid service disruptions.
      </p>

      {/* Expired Contracts Table */}
      <div className="expired-contracts-table-container">
        <h2 className="expired-contracts-section-title">List of Expired Contracts</h2>
        <table className="expired-contracts-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Contract Name",
                "Type",
                "Vendor",
                "Expiration Date",
                "Status"
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
              <td>Medical Equipment Lease</td>
              <td>Equipment</td>
              <td>ABC Medical</td>
              <td>2023-09-15</td>
              <td className="expired">Expired</td>
            </tr>
            <tr>
              <td>Pharmaceutical Supply</td>
              <td>Supply</td>
              <td>XYZ Pharma</td>
              <td>2023-10-01</td>
              <td className="expired">Expired</td>
            </tr>
            <tr>
              <td>IT Service Maintenance</td>
              <td>Service</td>
              <td>Tech Solutions</td>
              <td>2023-08-25</td>
              <td className="expired">Expired</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Link to="/superuser/tower" className="expiredcontract-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default ExpiredContractsSCM;
