import React from 'react';
import './ReportStock.css';

const reportItems = [
  { title: "Current Stock Level", subtitle: "Report", icon: "📊" },
  { title: "Expiry Item", subtitle: "Report", icon: "⭕" },
  { title: "Expirable Stock", subtitle: "Report", icon: "⭕" },
  { title: "Inventory Summary", subtitle: "Report", icon: "📦" },
  { title: "Consumable Stock Ledger", subtitle: "Report", icon: "⭕" },
  { title: "Capital Stock Ledger", subtitle: "Report", icon: "⭕" },
  { title: "Substore Dispatch And Consumption", subtitle: "Report", icon: "🛒" },
  { title: "Detail Stock Ledger", subtitle: "Report", icon: "⭕" },
  { title: "Opening Stock Valuation", subtitle: "Report", icon: "⭕" },
  { title: "Issued Item List", subtitle: "Report", icon: "⭕" },
    { title: "Substore Wise Summary", subtitle: "Report", icon: "📊" }
];

const ReportStock = () => {
  return (
    <div className="report-stock-report-grid">
      {reportItems.map((item, index) => (
        <div className="report-stock-report-item" key={index}>
          <div className="report-stock-report-icon">{item.icon}</div>
          <div className="report-stock-report-text">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportStock;
