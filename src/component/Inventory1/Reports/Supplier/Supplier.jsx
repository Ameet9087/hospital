import React from 'react';
import './Supplier.css';

const supplierItems = [
  { title: "Supplier Wise Stock", subtitle: "Report", icon: "📊" },
  { title: "Supplier Information Report", subtitle: "Report", icon: "⭕" },
];

const Supplier = () => {
  return (
    <div className="supplier-grid">
      {supplierItems.map((item, index) => (
        <div className="supplier-item" key={index}>
          <div className="supplier-icon">{item.icon}</div>
          <div className="supplier-text">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Supplier;
