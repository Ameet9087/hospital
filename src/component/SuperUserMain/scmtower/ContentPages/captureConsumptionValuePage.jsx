import React from 'react';
import { Link } from 'react-router-dom';
import './CaptureConsumptionValuePage.css'; // Import the CSS file

const CaptureConsumptionValuePage = () => {
  return (
    <div className="CaptureConsumptionValue-page-container">
      <h1 className="CaptureConsumptionValue-page-title">Capture Consumption Value</h1>
      <p className="CaptureConsumptionValue-page-description">
        Monitor and track hospital resources, including medications, medical supplies, utilities, and more.
      </p>

      <div className="CaptureConsumptionValue-card-container">
        {/* Medication and Medical Supplies Section */}
        <div className="CaptureConsumptionValue-info-card">
          <div className="CaptureConsumptionValue-card-icon">
            <i className="fas fa-pills"></i>
          </div>
          <h2 className="CaptureConsumptionValue-card-title">Medication & Supplies</h2>
          <p className="CaptureConsumptionValue-card-description">
            Stay on top of medication usage, bandages, and surgical tools to ensure efficient patient care.
          </p>
          <ul className="CaptureConsumptionValue-card-details">
            <li>Medications Used: 250 units</li>
            <li>Supplies Used: 320 units</li>
          </ul>
        </div>

        {/* Utility Consumption Section */}
        <div className="CaptureConsumptionValue-info-card">
          <div className="CaptureConsumptionValue-card-icon">
            <i className="fas fa-lightbulb"></i>
          </div>
          <h2 className="CaptureConsumptionValue-card-title">Utility Consumption</h2>
          <p className="CaptureConsumptionValue-card-description">
            Track electricity, water, and oxygen consumption to manage operational costs effectively.
          </p>
          <ul className="CaptureConsumptionValue-card-details">
            <li>Electricity: 1200 kWh</li>
            <li>Water: 1500 liters</li>
            <li>Oxygen: 500 units</li>
          </ul>
        </div>

        {/* Patient Care Resource Allocation Section */}
        <div className="CaptureConsumptionValue-info-card">
          <div className="CaptureConsumptionValue-card-icon">
            <i className="fas fa-procedures"></i>
          </div>
          <h2 className="CaptureConsumptionValue-card-title">Patient Care Resources</h2>
          <p className="CaptureConsumptionValue-card-description">
            Monitor how resources like staff and equipment are allocated to patient care.
          </p>
          <ul className="CaptureConsumptionValue-card-details">
            <li>Staff Hours: 45 hours</li>
            <li>Equipment Used: 20 units</li>
          </ul>
        </div>

        {/* Inventory Management Section */}
        <div className="CaptureConsumptionValue-info-card">
          <div className="CaptureConsumptionValue-card-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h2 className="CaptureConsumptionValue-card-title">Inventory Management</h2>
          <p className="CaptureConsumptionValue-card-description">
            Keep a close eye on critical inventory levels to avoid shortages and ensure timely replenishments.
          </p>
          <ul className="CaptureConsumptionValue-card-details">
            <li>Inventory Level: 1200 units</li>
            <li>Replenishment Needed: Yes</li>
          </ul>
        </div>
      </div>

      <Link to="/superuser/tower" className="CaptureConsumptionValue-back-button">Back to SCM Control Tower</Link>
    </div>
  );
};

export default CaptureConsumptionValuePage;
