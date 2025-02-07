import React, { useState, useRef } from 'react';
import './StockOnOrderTable.css';
import { Link } from 'react-router-dom';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';

const StockOnOrderTable = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const stockOrders = [
    { item: 'Surgical Masks', quantity: 500, supplier: 'MedSupply Co.', expectedDelivery: '2024-10-10' },
    { item: 'Gloves', quantity: 1000, supplier: 'SafeHealth', expectedDelivery: '2024-10-15' },
    { item: 'Ventilator', quantity: 10, supplier: 'TechMed Inc.', expectedDelivery: '2024-10-20' },
    { item: 'Hand Sanitizer', quantity: 200, supplier: 'PureHands', expectedDelivery: '2024-10-08' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="onorder-container">
      <h1 className="onorder-title">Stock on Order</h1>
      <table className="onorder-table">
        <thead>
          <tr>
            {["Item",
              "Quantity",
              "Supplier",
              "Expected Delivery"].map((header, index) => (
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
          {stockOrders.map((order, index) => (
            <tr key={index} className="onorder-row">
              <td className="onorder-data">{order.item}</td>
              <td className="onorder-data">{order.quantity}</td>
              <td className="onorder-data">{order.supplier}</td>
              <td className="onorder-data">{order.expectedDelivery}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="stockon-order-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>
    </div>
  );
};

export default StockOnOrderTable;
