import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import StockList from './StockList/StockList';
import GoodsReceiptList from './goods_receipt/GoodsReceiptList';
import './Stock.css';

const Stock = () => {
    const [activeTab, setActiveTab] = useState('stockList');
    const navigate = useNavigate();
    
    const tabs = [
      { name: 'Stock List', path: 'stockList' },
      { name: 'Goods Receipt List', path: 'goodsReceiptList' }
    ];
    const handleTabClick = (tab) => {
      setActiveTab(tab.name);
      navigate(tab.path);
    };
  return (
    <div>
    <div className="inventory-stock-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={activeTab === tab.name ? 'active' : ''}
          onClick={() => handleTabClick(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
    <div className="inventory-stock-content">
      <Routes>
        <Route path="stockList" element={<StockList/>} />
        <Route path="goodsReceiptList" element={<GoodsReceiptList/>} />
      </Routes>
    </div>
  </div>
  )
}

export default Stock
