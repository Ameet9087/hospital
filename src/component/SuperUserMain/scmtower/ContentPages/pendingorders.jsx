import React, { useState, useRef } from 'react';
import { startResizing } from './ResizableColumns';
import './PendingOrdersSCM.css';
import { Link } from 'react-router-dom';



const PendingOrdersSCM = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const pendingOrders = [
    { orderID: 'PO123', item: 'Surgical Gloves', quantity: 500, vendor: 'ABC Supplies', expectedDelivery: '2024-10-05', status: 'Pending' },
    { orderID: 'PO124', item: 'X-ray Machine', quantity: 1, vendor: 'Medical Equip Ltd.', expectedDelivery: '2024-10-10', status: 'Pending' },
    { orderID: 'PO125', item: 'Antibiotics', quantity: 1000, vendor: 'Pharma Co.', expectedDelivery: '2024-10-03', status: 'Pending' }
  ];
  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="pendingorders-scm-container">
      <h2 className="pendingorders-scm-title">Pending Orders</h2>
      <table className="pendingorders-scm-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Order ID",
              "Item",
              "Quantity",
              "Vendor",
              "Expected Delivery",
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
          {pendingOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.orderID}</td>
              <td>{order.item}</td>
              <td>{order.quantity}</td>
              <td>{order.vendor}</td>
              <td>{order.expectedDelivery}</td>
              <td className="pendingorders-scm-status">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="pendingord-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default PendingOrdersSCM;
