
import './CurrentInventoryDisplay.css';
import { Link } from 'react-router-dom';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import React, { useState, useRef } from "react";

const CurrentInventoryDisplay = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const inventoryData = [
    { item: "Paracetamol", currentStock: 120, reorderLevel: 100, status: "Sufficient" },
    { item: "Surgical Gloves", currentStock: 50, reorderLevel: 200, status: "Low" },
    { item: "Syringes", currentStock: 30, reorderLevel: 50, status: "Critical" },
    { item: "X-Ray Film", currentStock: 500, reorderLevel: 100, status: "Sufficient" },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="currentinventory-container">
      <p className="currentinventorylevel-title">Current Inventory Levels</p>
      <table className="currentinventory-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Item Name",
              "Current Stock (units)",
              "Reorder Level",
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
          {inventoryData.map((item, index) => (
            <tr key={index} className={`currentinventory-row ${item.status.toLowerCase()}`}>
              <td className="currentinventory-data">{item.item}</td>
              <td className="currentinventory-data">{item.currentStock}</td>
              <td className="currentinventory-data">{item.reorderLevel}</td>
              <td className={`currentinventory-data ${item.status.toLowerCase()}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="currentinventorylevel-back-button">Back to SCM Control Tower</Link>
      <button className='currentinventory-printbtn' onClick={handlePrint} style={{ marginLeft: "20px", border: "none" }}>Print</button>
    </div>
  );
};

export default CurrentInventoryDisplay;
