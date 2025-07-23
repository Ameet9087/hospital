import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './SystemAdmin.css';
import DatabaseBackup from './DataBaseBackup';
import MaterializedSalesView from './Materialized';
import SalesBookDetails from './SalesBook';
import NewSales from './NewSales';
import AuditTrails from './AuditTrial';

const SystemAdmin = () => {
  const location = useLocation(); // Get the current route

  // Define the navigation structure
  const navItems = [
    { path: '/databasebackup', label: 'Database Backup', component: <DatabaseBackup /> },
    { path: '/materializedsales', label: 'Materialized Sales View', component: <MaterializedSalesView /> },
    { path: '/salesbook', label: 'Sales Book', component: <SalesBookDetails /> },
    { path: '/newsales', label: 'New Sales Book', component: <NewSales /> },
    { path: '/audittrail', label: 'AuditTrail', component: <AuditTrails /> },
  ];

  return (
    <div className="ButtonPanel-button-panel-container">
      {/* Navbar */}
      <div className="ButtonPanel-button-panel">
        {navItems.map((item, index) => (
          <Link to={`/systemadmin${item.path}`} key={index}>
            <button
              className={`ButtonPanel-button ${
                location.pathname === "/systemadmin"+item.path ? 'ButtonPanel-active' : ''
              }`}
            >
              {item.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Content Rendering */}
      <div className="ButtonPanel-content">
        <Routes>
          {navItems.map((item, index) => (
            <Route key={index} path={item.path} element={item.component} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default SystemAdmin;
