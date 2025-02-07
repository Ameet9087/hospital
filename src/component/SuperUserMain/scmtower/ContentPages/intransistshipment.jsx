import React, { useState, useRef } from 'react';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import './InTransitSCM.css';
import { Link } from 'react-router-dom';

const InTransitSCM = () => {
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  // Example in-transit shipment data
  const inTransitData = [
    {
      shipmentID: 'TS1001',
      itemName: 'Surgical Gloves',
      quantity: 500,
      shippedDate: '2024-09-25',
      expectedDeliveryDate: '2024-10-01',
      currentLocation: 'Distribution Center',
      history: [
        { date: '2024-09-25', status: 'Shipped' },
        { date: '2024-09-26', status: 'In Transit' },
        { date: '2024-09-30', status: 'Arrived at Transit Hub' }
      ],
      details: {
        supplier: 'MedSupply Co.',
        carrier: 'DHL Express',
        trackingNumber: 'DHL12345678',
        deliveryContact: 'Dr. John Smith'
      }
    },
    {
      shipmentID: 'TS1002',
      itemName: 'X-Ray Film',
      quantity: 300,
      shippedDate: '2024-09-27',
      expectedDeliveryDate: '2024-10-03',
      currentLocation: 'Transit Hub 2',
      history: [
        { date: '2024-09-27', status: 'Shipped' },
        { date: '2024-09-28', status: 'In Transit' },
        { date: '2024-10-01', status: 'Arrived at Transit Hub' }
      ],
      details: {
        supplier: 'HealthCorp Supplies',
        carrier: 'FedEx',
        trackingNumber: 'FDX987654321',
        deliveryContact: 'Dr. Jane Doe'
      }
    }
  ];

  // State to handle modal visibility and selected shipment
  const [selectedShipment, setSelectedShipment] = useState(null);

  // Function to handle the "View" button click
  const handleViewClick = (shipment) => {
    setSelectedShipment(shipment);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedShipment(null);
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="intransitscm-container">
      <h2 className="intransitscm-title">In-Transit Shipments</h2>
      <table className="intransitscm-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "Shipment ID",
              "Item Name",
              "Quantity",
              "Shipped Date",
              "Expected Delivery Date",
              "Current Location",
              "Actions"
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
          {inTransitData.map((shipment, index) => (
            <tr key={index}>
              <td>{shipment.shipmentID}</td>
              <td>{shipment.itemName}</td>
              <td>{shipment.quantity}</td>
              <td>{shipment.shippedDate}</td>
              <td>{shipment.expectedDeliveryDate}</td>
              <td>{shipment.currentLocation}</td>
              <td>
                <button className="intransitscm-view-btn" onClick={() => handleViewClick(shipment)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/superuser/tower" className="intransitshipment-back-button">Back to SCM Control Tower</Link>
      <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>


      {/* Modal to display shipment details */}
      {selectedShipment && (
        <div className="intransitscm-modal">
          <div className="intransitscm-modal-content">
            <h3>Shipment Details: {selectedShipment.shipmentID}</h3>
            <button className="intransitscm-close-btn" onClick={handleCloseModal}>Close</button>

            <div className="intransitscm-modal-details">
              <p><strong>Item Name:</strong> {selectedShipment.itemName}</p>
              <p><strong>Quantity:</strong> {selectedShipment.quantity}</p>
              <p><strong>Shipped Date:</strong> {selectedShipment.shippedDate}</p>
              <p><strong>Expected Delivery Date:</strong> {selectedShipment.expectedDeliveryDate}</p>
              <p><strong>Current Location:</strong> {selectedShipment.currentLocation}</p>
              <h4>Order History</h4>
              <ul>
                {selectedShipment.history.map((event, idx) => (
                  <li key={idx}>{event.date} - {event.status}</li>
                ))}
              </ul>
              <h4>Details</h4>
              <p><strong>Supplier:</strong> {selectedShipment.details.supplier}</p>
              <p><strong>Carrier:</strong> {selectedShipment.details.carrier}</p>
              <p><strong>Tracking Number:</strong> {selectedShipment.details.trackingNumber}</p>
              <p><strong>Delivery Contact:</strong> {selectedShipment.details.deliveryContact}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InTransitSCM;
