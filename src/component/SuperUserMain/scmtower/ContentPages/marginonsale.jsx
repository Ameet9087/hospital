import React from 'react';
import './MarginSaleAccordion.css';
import { Link } from 'react-router-dom';

const MarginSaleDashboard = () => {
  const totalProfit = 145;
  const marginData = [
    { item: "Medication A", profit: 5 },
    { item: "Surgical Gloves", profit: 10 },
    { item: "X-Ray Service", profit: 30 },
    { item: "Private Room", profit: 100 },
  ];

  return (
    <div className="marginsale-dashboard-container">
      <p className="marginsale-dashboard-title">Margin Sale Dashboard</p>
      <div className="marginsale-summary-widget">
        <p className="marginsale-summary-title">Total Profit</p>
        <p className="marginsale-summary-value">{totalProfit}</p>
      </div>
      <div className="marginsale-item-list">
        {marginData.map((data, index) => (
          <div key={index} className="marginsale-item-widget">
            <h3 className="marginsale-item-name">{data.item}</h3>
            <p className="marginsale-item-profit">Profit: {data.profit}</p>
          </div>
        ))}
      </div>
      <Link to="/superuser/tower" className="marginsaledashboard-back-button">Back to SCM Control Tower</Link>
    </div>
  );
};

export default MarginSaleDashboard;
