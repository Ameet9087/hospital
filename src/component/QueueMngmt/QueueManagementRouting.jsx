import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './QueueManagement.css';

import PatientQueue from "./QueueMain/PatientQueue"
import PatientQueuePrioritization from "./Queue Prioritization/queuePrioritization"
import RealTimeQueueMonitoring from './real-TimeQueueMonitoring/real-TimeQueueMonitoring';
import ServiceTimeTracking from './ServiceTimeTracking/serviceTimeTracking';
import PatientNotification from './PatientNotification/patientNotification'; 
// Placeholder components for each submodule
const QueueManagementRouting = () => {
  const location = useLocation(); // Get the current route

  // Navigation items for the QueueManagement module
  const submodules = [
    { route:'/opd',path: '/queuemanagement/opd', label: 'OPD', component: <PatientQueue /> },
    { route:'/prioritization',path: '/queuemanagement/prioritization', label: 'Patient Queue Prioritization', component: <PatientQueuePrioritization /> },
    { route:'/monitoring',path: '/queuemanagement/monitoring', label: 'Real-Time Queue Monitoring', component: <RealTimeQueueMonitoring /> },
    { route:'/tracking',path: '/queuemanagement/tracking', label: 'Service Time Tracking', component: <ServiceTimeTracking /> },
    { route:'/notification',path: '/queuemanagement/notification', label: 'Patient Notification', component: <PatientNotification /> },
  ];

  return (
    <div className="QueueManagement-container">
      {/* Navbar */}
      <div className="QueueManagement-navbar">
        {submodules.map((item, index) => (
          <Link to={item.path} key={index}>
            <button
              className={`QueueManagement-button ${
                location.pathname === item.path ? 'QueueManagement-active' : ''
              }`}
            >
              {item.label}
            </button>
          </Link>
        ))}
      </div>

      {/* Content Rendering */}
      <div className="QueueManagement-content">
        <Routes>
          {submodules.map((item, index) => (
            <Route key={index} path={item.route} element={item.component} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default QueueManagementRouting;
