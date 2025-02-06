import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './CostVarianceTable.css';
import { Link } from 'react-router-dom';

const CostVarianceTable = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const costVarianceData = [
    { item: 'Medical Supplies', budgetedCost: 50000, actualCost: 55000, variance: -5000 },
    { item: 'Staff Salaries', budgetedCost: 200000, actualCost: 190000, variance: 10000 },
    { item: 'Pharmaceuticals', budgetedCost: 30000, actualCost: 32000, variance: -2000 },
    { item: 'Facility Maintenance', budgetedCost: 10000, actualCost: 9500, variance: 500 },
  ];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="costvariance-container">
      <h2 className="costvariance-title">Cost Variance Report</h2>
      <table className="costvariance-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Item",
              "Budgeted Cost (USD)",
              "Actual Cost (USD)",
              "Variance (USD)"
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
          {costVarianceData.map((data, index) => (
            <tr key={index} className={data.variance < 0 ? 'negative-variance' : 'positive-variance'}>
              <td>{data.item}</td>
              <td>${data.budgetedCost.toLocaleString()}</td>
              <td>${data.actualCost.toLocaleString()}</td>
              <td>{data.variance < 0 ? `-$${Math.abs(data.variance).toLocaleString()}` : `$${data.variance.toLocaleString()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="costvarience-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>


    </div>
  );
};

export default CostVarianceTable;
