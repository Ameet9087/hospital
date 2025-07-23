import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './CogsDisplay.css'
import { Link } from 'react-router-dom';



const cogsData = [
  { department: 'Pharmacy', cost: 15000 },
  { department: 'Surgery', cost: 35000 },
  { department: 'Laboratory', cost: 10000 },
  { department: 'Radiology', cost: 8000 },
  { department: 'General Supplies', cost: 5000 },
];




const CogsDisplay = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="cogs-container">
      <h2 className="cogs-title">COGS Overview</h2>

      <div className="cogs-content">
        {/* COGS Table */}
        <div className="cogs-table-wrapper">
          <table className="cogs-table" ref={tableRef}>
            <thead>
              <tr>
                {["Department",
                  "Cost of Goods Sold (COGS)"].map((header, index) => (
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
              {cogsData.map((item, index) => (
                <tr key={index}>
                  <td>{item.department}</td>
                  <td>${item.cost.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
      <Link to="/superuser/tower" className="cogs-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>


    </div>
  );
};

export default CogsDisplay;
