import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './TransportationCosts.css';
import { Link } from 'react-router-dom';

const TransportationCosts = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  const transportationData = [
    {
      id: 'TC001',
      vendor: 'MedSupply Co.',
      item: 'Surgical Masks',
      transportType: 'Truck',
      cost: 500,
      date: '2024-09-30'
    },
    {
      id: 'TC002',
      vendor: 'PharmaCare',
      item: 'Pharmaceuticals',
      transportType: 'Air',
      cost: 1500,
      date: '2024-09-28'
    },
    {
      id: 'TC003',
      vendor: 'EquipmentPro',
      item: 'X-Ray Machine',
      transportType: 'Freight',
      cost: 2000,
      date: '2024-09-27'
    }
  ];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="transportation-costs-container">
      <h2 className="transportation-costs-title">Transportation Costs</h2>
      <table className="transportation-costs-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "ID",
              "Vendor",
              "Item",
              "Transport Type",
              "Cost",
              "Date"
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
          {transportationData.map((cost, index) => (
            <tr key={index}>
              <td>{cost.id}</td>
              <td>{cost.vendor}</td>
              <td>{cost.item}</td>
              <td>{cost.transportType}</td>
              <td>{cost.cost}</td>
              <td>{cost.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="transportationcostbtn-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default TransportationCosts;
