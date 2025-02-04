import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import './StockTurnoverRate.css'
const StockTurnoverRate = () => {
  const data = [
    { name: 'Pharmacy', turnoverRate: 7.5 },
    { name: 'Surgery', turnoverRate: 3.2 },
    { name: 'General Supplies', turnoverRate: 5.6 },
    { name: 'ICU Supplies', turnoverRate: 4.1 },
  ];

  return (
    <div className="chart-container">
      <h1 className="chart-title">Stock Turnover Rate by Department</h1>
      <ResponsiveContainer width="60%" height={500}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="turnoverRate" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
      <Link to="/superuser/tower" className="stockturnover-back-button">Back to SCM Control Tower</Link>
    </div>
  );
};

export default StockTurnoverRate;
