/* Ajhar tamboli sSPReports.jsx 19-09-24 */


import React, { useState } from 'react';
import "../SSPharmacy/sSPReports.css";
import SSPReportsStock from './sSPReportsStock'; // Import the Stock component
import SSPReportsReqDis from './sSPReportsReqDis'; // Import the Requisition/Dispatch component
import SSPReportsConsumption from './sSPReportsConsumption';
import SSPReportsBreakage from './sSPReportsBreakage';
import SSPReportsTransfer from './sSPReportsTransfer';
import SSPReportsInternalConsumption from './sSPReportsInternalConsumption';

const SSPReports = () => {
  const [activeComponent, setActiveComponent] = useState('reports'); // State to manage active component

  const reports = [
    { name: 'Stock', type: 'Report', id: 'stock' },
    { name: 'Requisition/Dispatch', type: 'Report', id: 'requisition' },
    { name: 'Consumption', type: 'Report', id: 'consumption' },
    { name: 'Breakage', type: 'Report', id: 'breakage' },
    { name: 'Transfer', type: 'Report', id: 'transfer' },
    { name: 'Internal Consumption', type: 'Report', id: 'internal-consumption' },
  ];

  // Handle card click to change the active component
  const handleCardClick = (id) => {
    setActiveComponent(id); // Set the active component based on the id
  };

  // Function to render the selected component
  const renderComponent = () => {
    if (activeComponent === 'stock') {
      return <SSPReportsStock />;
    } else if (activeComponent === 'requisition') {
      return <SSPReportsReqDis />;
    } else if (activeComponent === 'consumption') {
      return <SSPReportsConsumption />;
    } else if (activeComponent === 'breakage') {
      return <SSPReportsBreakage />;
    } else if (activeComponent === 'transfer') {
      return <SSPReportsTransfer />;
    } else if (activeComponent === 'internal-consumption') {
      return <SSPReportsInternalConsumption />;
    } else {
      return (
        <div className="SSp-dis-report-list">
          {reports.map((report, index) => (
            <div key={index} className="SSp-dis-report-item" onClick={() => handleCardClick(report.id)}>
              <div className="SSp-dis-report-icon"></div>
              <div className="SSp-dis-report-info">
                <h3>{report.name}</h3>
                <p>{report.type}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      {activeComponent !== 'reports' && (
        <button onClick={() => setActiveComponent('reports')}>Back to Reports</button>
      )}
      {renderComponent()}
    </div>
  );
};

export default SSPReports;
