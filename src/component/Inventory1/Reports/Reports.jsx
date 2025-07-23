import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ReportStock from './Stocks/ReportStock';
import Supplier from './Supplier/Supplier';
import './Report.css';
import Purchase from './Purchase/Purchase';

const Report = () => {
    const [activeTab, setActiveTab] = useState('purchase');
    const navigate = useNavigate();

    const tabs = [
        { name: 'Purchase', path: 'purchase' },
        { name: 'Stock', path: 'stock' },
        { name: 'Supplier', path: 'supplier' },
    ];

    const handleTabClick = (tab) => {
        setActiveTab(tab.name);
        navigate(tab.path);
    };

    return (
        <div>
            <div className="report-report-tabs">
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
            <div className="report-report-content">
                <Routes>
                    <Route path="purchase" element={<Purchase/>} />
                    <Route path="stock/*" element={<ReportStock />} />
                    <Route path="supplier" element={<Supplier />} />
                </Routes>
            </div>
        </div>
    );
};

export default Report;
