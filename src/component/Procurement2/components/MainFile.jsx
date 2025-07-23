import React, { useState } from 'react';
import './Main.css';
import Procurement from './Procurement'; 
import PurchaseOrder from './PurchaseOrder'; 
import GoodsArrivalNotification from './GoodArrivalNotification'; 
import QuotationRequest from './Quotation'; 
import TabNavigation from './Settings'; 
import HorizontalList from './Records'; 

const Main = () => {
  const [activeComponent, setActiveComponent] = useState(''); 

  const handlePurchaseRequestClick = () => {
    setActiveComponent('Procurement'); 
  };

  const handlePurchaseOrderClick = () => {
    setActiveComponent('PurchaseOrder'); 
  };

  const handleGoodsArrivalClick = () => {
    setActiveComponent('GoodsArrivalNotification'); 
  };

  const handleQuotationClick = () => {
    setActiveComponent('QuotationRequest'); 
  };

  const handleSettingsClick = () => {
    setActiveComponent('Settings'); 
  };

  const handleReportsClick = () => {
    setActiveComponent('Reports'); 
  };

  return (
    <div className="Mai-purchase-request-container">
      <nav className="Mai-top-nav">
        <button 
          className={`Mai-nav-button ${activeComponent === 'Procurement' ? 'Mai-active' : ''}`} 
          onClick={handlePurchaseRequestClick}>
          Purchase Request
        </button>
        <button 
          className={`Mai-nav-button ${activeComponent === 'PurchaseOrder' ? 'Mai-active' : ''}`} 
          onClick={handlePurchaseOrderClick}>
          Purchase Order
        </button>
        <button 
          className={`Mai-nav-button ${activeComponent === 'GoodsArrivalNotification' ? 'Mai-active' : ''}`} 
          onClick={handleGoodsArrivalClick}>
          Goods Arrival Notification
        </button>
        <button 
          className={`Mai-nav-button ${activeComponent === 'QuotationRequest' ? 'Mai-active' : ''}`} 
          onClick={handleQuotationClick}>
          Quotation
        </button>
        <button 
          className={`Mai-nav-button ${activeComponent === 'Settings' ? 'Mai-active' : ''}`} 
          onClick={handleSettingsClick}>
          Settings
        </button>
        <button 
          className={`Mai-nav-button ${activeComponent === 'Reports' ? 'Mai-active' : ''}`} 
          onClick={handleReportsClick}>
          Reports
        </button>
        <div className="Mai-active-inventory">
          Active Inventory: GENERAL-INVENTORY
          <span className="Mai-arrow">➜</span>
        </div>
      </nav>

      {activeComponent === 'Procurement' && <Procurement />}
      {activeComponent === 'PurchaseOrder' && <PurchaseOrder />}
      {activeComponent === 'GoodsArrivalNotification' && <GoodsArrivalNotification />}
      {activeComponent === 'QuotationRequest' && <QuotationRequest />}
      {activeComponent === 'Settings' && <TabNavigation />}
      {activeComponent === 'Reports' && <HorizontalList />} 
    </div>
  );
};

export default Main;
