import React from 'react';
import './LateDeliveriesAlert.css';
import { Link } from 'react-router-dom';

const LateDeliveriesAlert = ({ supplier, lateDeliveries }) => {
  const isCritical = lateDeliveries > 5;  // Example threshold for critical late deliveries

  return (
    <div className={`latedeliveriesscm-alert ${isCritical ? 'critical' : ''}`}>
      <h3 className="latedeliveriesscm-alert-title">{supplier}</h3>
      <p className="latedeliveriesscm-alert-text">Late Deliveries: {lateDeliveries}</p>
    </div>
  );
};

const SupplierAlerts = () => {
  const suppliers = [
    { supplier: 'MedSupply Co.', lateDeliveries: 8 },
    { supplier: 'SafeHealth', lateDeliveries: 5 },
    { supplier: 'TechMed Inc.', lateDeliveries: 12 },
    { supplier: 'PureHands', lateDeliveries: 7 },
  ];

  return (
    <div className="latedeliveriesscm-alert-container">
      {suppliers.map((supplier, index) => (
        <LateDeliveriesAlert key={index} supplier={supplier.supplier} lateDeliveries={supplier.lateDeliveries} />
      ))}
      <Link to="/" className="back-button">Back to SCM Control Tower</Link>
    </div>
  );
};

export default SupplierAlerts;
