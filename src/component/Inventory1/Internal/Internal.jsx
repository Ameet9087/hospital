import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Requisition from './Requisition';
import WriteOff from './WriteOff';
import WriteOffItemsList from './WriteOffItemsList';
import ReturnFromSubstore from './ReturnFromSubstore';
import PurchaseRequest from './PurchaseRequest';
import './Internal.css'

const Internal = () => {
  const [activeTab, setActiveTab] = useState('Requisition');
  const navigate = useNavigate();
  
  const tabs = [
    { name: 'Write Off Items List', path: 'writeOffItemsList' },
    { name: 'Requisition', path: 'requisition' },
    { name: 'Return From Substore', path: 'returnFromSubstore' },
    { name: 'Purchase Request', path: 'purchaseRequest' },
    { name: 'Write-Off', path: 'writeOff' },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.name);
    navigate(tab.path);
  };

  return (
    <div>
      <div className="inventory-internal-tabs">
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
      <div className="inventory-internal-tabs-content">
        <Routes>
        <Route path="writeOff" element={<WriteOff />} />
          <Route path="requisition" element={<Requisition />} />
          <Route path="writeOffItemsList" element={<WriteOffItemsList />} />
          <Route path="returnFromSubstore" element={<ReturnFromSubstore />} />
          <Route path="purchaseRequest" element={<PurchaseRequest />} />
        </Routes>
      </div>
    </div>
  );
};

export default Internal;

