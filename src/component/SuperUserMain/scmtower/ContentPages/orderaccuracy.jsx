import React, { useState, useRef } from 'react';
import { startResizing } from './ResizableColumns';
import './OrderAccuracySCM.css';
import { Link } from 'react-router-dom';

const OrderAccuracySCM = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  // Example order data
  const orderDetails = [
    {
      orderID: 'PO101',
      orderDate: '2024-09-01',
      supplier: 'MedSupply Co.',
      orderedQty: 100,
      deliveredQty: 100,
      accuracy: 'Accurate',
      remarks: 'Delivered on time'
    },
    {
      orderID: 'PO102',
      orderDate: '2024-09-03',
      supplier: 'HealthEquip Ltd.',
      orderedQty: 50,
      deliveredQty: 45,
      accuracy: 'Inaccurate',
      remarks: 'Shortage of 5 items'
    },
    {
      orderID: 'PO103',
      orderDate: '2024-09-05',
      supplier: 'MediGoods Inc.',
      orderedQty: 200,
      deliveredQty: 200,
      accuracy: 'Accurate',
      remarks: 'Delivered in good condition'
    },
    {
      orderID: 'PO104',
      orderDate: '2024-09-07',
      supplier: 'CareSupply Solutions',
      orderedQty: 150,
      deliveredQty: 150,
      accuracy: 'Accurate',
      remarks: 'Delivered on time'
    },
    {
      orderID: 'PO105',
      orderDate: '2024-09-09',
      supplier: 'SurgiCare Provisions',
      orderedQty: 80,
      deliveredQty: 75,
      accuracy: 'Inaccurate',
      remarks: 'Wrong item delivered for 5 units'
    }
  ];

  const handlePrint = () => {
    window.print();
  };
  return (
    <div className="orderaccuracy-scm-container">
      <h2 className="orderaccuracy-scm-title">Order Accuracy and Details</h2>
      <table className="orderaccuracy-scm-table">
        <thead>
          <tr>
            {[
              "Order ID",
              "Order Date",
              "Supplier",
              "Ordered Quantity",
              "Delivered Quantity",
              "Accuracy",
              "Remarks"
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
          {orderDetails.map((order, index) => (
            <tr key={index} className={order.accuracy === 'Accurate' ? 'accurate-row' : 'inaccurate-row'}>
              <td>{order.orderID}</td>
              <td>{order.orderDate}</td>
              <td>{order.supplier}</td>
              <td>{order.orderedQty}</td>
              <td>{order.deliveredQty}</td>
              <td className={order.accuracy === 'Accurate' ? 'accurate' : 'inaccurate'}>
                {order.accuracy}
              </td>
              <td>{order.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="orderaccuracy-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default OrderAccuracySCM;
