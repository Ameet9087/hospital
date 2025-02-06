import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './OverheadCostsTable.css';
import { Link } from 'react-router-dom';

const OverheadCostsTable = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const overheadCosts = [
    { category: 'Administrative Salaries', cost: 50000 },
    { category: 'Utilities', cost: 30000 },
    { category: 'Building Maintenance', cost: 20000 },
    { category: 'Office Supplies', cost: 15000 },
    { category: 'Insurance', cost: 10000 },
  ];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="currentinventory-table-container">
      <h2 className="currentinventory-title">Hospital Overhead Costs</h2>
      <table className="currentinventory-table" ref={tableRef}>
        <thead>
          <tr>
            {["Category",
              "Cost",].map((header, index) => (
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
          {overheadCosts.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.cost.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link to="/superuser/tower" className="overheadcost-back-button">Back to SCM Control Tower</Link>
        <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>


      </div>
    </div>
  );
};

export default OverheadCostsTable;
