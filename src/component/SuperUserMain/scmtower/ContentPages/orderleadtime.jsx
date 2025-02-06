import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './OrderLeadTimeSCM.css';
import { Link } from 'react-router-dom';

const OrderLeadTimeSCM = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  // Example order lead time data
  const orderData = [
    {
      orderID: 'PO101',
      orderDate: '2024-09-01',
      supplier: 'MedSupply Co.',
      expectedDeliveryDate: '2024-09-04',
      actualDeliveryDate: '2024-09-05',
      leadTime: '4 days'
    },
    {
      orderID: 'PO102',
      orderDate: '2024-09-03',
      supplier: 'HealthEquip Ltd.',
      expectedDeliveryDate: '2024-09-06',
      actualDeliveryDate: '2024-09-06',
      leadTime: '3 days'
    },
    {
      orderID: 'PO103',
      orderDate: '2024-09-05',
      supplier: 'MediGoods Inc.',
      expectedDeliveryDate: '2024-09-08',
      actualDeliveryDate: '2024-09-09',
      leadTime: '4 days'
    }
  ];
  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="orderleadtime-scm-container">
      <h2 className="orderleadtime-scm-title">Order Lead Time</h2>
      <table className="orderleadtime-scm-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Order ID",
              "Order Date",
              "Supplier",
              "Expected Delivery Date",
              "Actual Delivery Date",
              "Lead Time"
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
          {orderData.map((order, index) => (
            <tr key={index}>
              <td>{order.orderID}</td>
              <td>{order.orderDate}</td>
              <td>{order.supplier}</td>
              <td>{order.expectedDeliveryDate}</td>
              <td>{order.actualDeliveryDate}</td>
              <td>{order.leadTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="ordleadtime-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

    </div>
  );
};

export default OrderLeadTimeSCM;
