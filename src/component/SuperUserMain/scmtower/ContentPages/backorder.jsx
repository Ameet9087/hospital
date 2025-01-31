import React, { useState, useRef } from 'react';
import { startResizing } from './ResizableColumns';
import './BackOrderSCM.css';
import { Link } from 'react-router-dom';

const BackOrderSCM = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  // Example back order data
  const backOrderData = [
    {
      orderID: 'BO101',
      itemName: 'Surgical Masks',
      quantityOrdered: 500,
      quantityBackOrdered: 200,
      expectedRestockDate: '2024-10-10',
      supplier: 'MedSupply Co.'
    },
    {
      orderID: 'BO102',
      itemName: 'IV Fluids',
      quantityOrdered: 300,
      quantityBackOrdered: 50,
      expectedRestockDate: '2024-10-08',
      supplier: 'HealthEquip Ltd.'
    }
  ];
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="backorder-scm-container">
      <h2 className="backorder-scm-title">Back Orders</h2>
      <table className="backorder-scm-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Order ID",
              "Item Name",
              "Quantity Ordered",
              "Quantity Back-Ordered",
              "Expected Restock Date",
              "Supplier"
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
          {backOrderData.map((order, index) => (
            <tr key={index}>
              <td>{order.orderID}</td>
              <td>{order.itemName}</td>
              <td>{order.quantityOrdered}</td>
              <td>{order.quantityBackOrdered}</td>
              <td>{order.expectedRestockDate}</td>
              <td>{order.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="backorder-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default BackOrderSCM;
