import React, { useState, useRef } from "react";
import './LowStockListDisplay.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';

const LateStockListDisplay = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  // Example low stock data
  const lowStockData = [
    { item: "Paracetamol", currentStock: 30, reorderLevel: 100, status: "Low" },
    { item: "Surgical Gloves", currentStock: 10, reorderLevel: 200, status: "Critical" },
    { item: "Syringes", currentStock: 40, reorderLevel: 50, status: "Low" },
    { item: "Antibiotics", currentStock: 5, reorderLevel: 50, status: "Critical" },
  ];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="lowstocklist-container">
      <h1 className="lowstocklist-title">Low Stock Items</h1>
      <table className="lowstocklist-table" ref={tableRef}>
        <thead>
          <tr>
            {["Item Name",
              "Current Stock",
              "Reorder Level",
              "Status"].map((header, index) => (
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
          {lowStockData.map((item, index) => (
            <tr key={index} className={`lowstocklist-row ${item.status.toLowerCase()}`}>
              <td className="lowstocklist-data">{item.item}</td>
              <td className="lowstocklist-data">{item.currentStock}</td>
              <td className="lowstocklist-data">{item.reorderLevel}</td>
              <td className={`lowstocklist-data ${item.status.toLowerCase()}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="lowstock-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>
    </div>
  );
};

export default LateStockListDisplay;
