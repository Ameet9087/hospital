import React from 'react';
import { Link } from 'react-router-dom'; // For navigation back to SCM Control Tower
import './GMPage.css'; // Import the CSS file

const GMPage = () => {
  return (
    <div className="gmpage-container">

      <div className="gmpage-header">
        <h1 className="gmpage-title">Gross Margin (GM)</h1>
        <p className="gmpage-description">
          Gross Margin (GM) represents the profitability of your sales. It is calculated
          as the difference between sales revenue and the cost of goods sold (COGS).
          This helps track how well the company is performing and managing costs.
        </p>
      </div>

      <div className="gmpage-details-card">
        <h2 className="gmpage-subtitle">GM Details</h2>
        <div className="gmpage-gm-item">
          <p className="gmpage-label">Current GM</p>
          <div className="gmpage-progress-bar-container">
            <div className="gmpage-progress-bar" style={{ width: '13.99%' }}></div>
          </div>
          <span className="gmpage-percentage">13.99%</span>
        </div>
        <div className="gmpage-gm-item">
          <p className="gmpage-label">Last Quarter GM</p>
          <div className="gmpage-progress-bar-container">
            <div className="gmpage-progress-bar" style={{ width: '12.80%' }}></div>
          </div>
          <span className="gmpage-percentage">12.80%</span>
        </div>
        <div className="gmpage-gm-item">
          <p className="gmpage-label">GM Target</p>
          <div className="gmpage-progress-bar-container">
            <div className="gmpage-progress-bar target" style={{ width: '15%' }}></div>
          </div>
          <span className="gmpage-percentage">15%</span>
        </div>
      </div>
      <div className='backbtnclass' >
        <Link to="/superuser/tower" className="gmpage-back-button">Back to SCM Control Tower</Link>

      </div>


    </div>
  );
};

export default GMPage;
