import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './ShippingCostsTable.css';
import { Link } from 'react-router-dom';

const ShippingCostsTable = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const shippingData = [
    { shipmentId: 'SCM001', date: '2024-09-30', cost: 1200, status: 'Delivered' },
    { shipmentId: 'SCM002', date: '2024-10-02', cost: 900, status: 'In Transit' },
    { shipmentId: 'SCM003', date: '2024-10-01', cost: 1500, status: 'Pending' },
    { shipmentId: 'SCM004', date: '2024-09-28', cost: 500, status: 'Delivered' },
  ];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="shippingcosts-container">
      <h2 className="shippingcosts-title">Hospital Shipping Costs</h2>
      <table className="shippingcosts-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Shipment ID",
              "Date",
              "Cost",
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
          {shippingData.map((item, index) => (
            <tr key={index}>
              <td>{item.shipmentId}</td>
              <td>{item.date}</td>
              <td>{item.cost.toLocaleString()}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/superuser/tower" className="overheadcost-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>



    </div>
  );
};

export default ShippingCostsTable;
