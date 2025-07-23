import React, { useState } from 'react';
import './Purchase.css';
import PurchaseOrderReport from '../../Internal/PurchaseOrderReport';
import CancelledPoGrReport from '../../Internal/CancelledPoGrReport';
import PurchaseItemsReport from '../../Internal/PurchaseItemsReport';
import PurchaseSummaryReport from '../../Internal/PurchaseSummaryReport';
import ReturnToSupplierReport from '../../Internal/ReturnToSupplierReport';

const purchaseItems = [
  { title: "Purchase Order", subtitle: "Report", icon: "🛒" },
  { title: "Cancelled PO and GR", subtitle: "Report", icon: "❌" },
  { title: "Purchase Items", subtitle: "Report", icon: "🛒" },
  { title: "Purchase Summary", subtitle: "Report", icon: "🛒" },
  { title: "Return To Supplier", subtitle: "Report", icon: "⭕" }
];

const Purchase = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const handleClick = (title) => {
    setSelectedReport(title);
  };

  const renderReport = () => {
    switch (selectedReport) {
      case "Purchase Order":
        return <PurchaseOrderReport />;
      case "Cancelled PO and GR":
        return <CancelledPoGrReport />;
      case "Purchase Items":
        return <PurchaseItemsReport />;
      case "Purchase Summary":
        return <PurchaseSummaryReport />;
      case "Return To Supplier":
        return <ReturnToSupplierReport />;
      default:
        return null;
    }
  };

  return (
    <div>
      {selectedReport ? (
        <div className="report-container">
          {/* <button className="back-button" onClick={() => setSelectedReport(null)}>Back</button> */}
          {renderReport()}
        </div>
      ) : (
        <div className="purchase-grid">
          {purchaseItems.map((item, index) => (
            <div 
              className="purchase-item" 
              key={index} 
              onClick={() => handleClick(item.title)}
            >
              <div className="purchase-icon">{item.icon}</div>
              <div className="purchase-text">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Purchase;
