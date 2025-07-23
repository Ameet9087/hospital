import React from 'react';
import './HomePage.css'; // Import the CSS file for this component

function HomePage() {
    return (
        <div className="home-page-container">
            <div className="home-page-content-left">
                <h2 className="home-page-title">Patient Distribution based on Rank</h2>
                <input type="text" placeholder="Department Name" className="home-page-department-input" />
            </div>
            <div className="home-page-content-right">
                <h2 className="home-page-title">Hospital Management</h2>
                <div className="home-page-hospital-metrics">
                    <div className="home-page-metric">
                        <span className="home-page-metric-label">OPD</span>
                        <div className="home-page-progress-bar">
                            <div className="home-page-progress" style={{ width: '90%' }}></div>
                        </div>
                        <span className="home-page-metric-count">14</span>
                    </div>
                    <div className="home-page-metric">
                        <span className="home-page-metric-label">Lab</span>
                        <div className="home-page-progress-bar">
                            <div className="home-page-progress" style={{ width: '50%' }}></div>
                        </div>
                        <span className="home-page-metric-count">7</span>
                    </div>
                    <div className="home-page-metric">
                        <span className="home-page-metric-label">NewPatient</span>
                        <div className="home-page-progress-bar">
                            <div className="home-page-progress" style={{ width: '70%' }}></div>
                        </div>
                        <span className="home-page-metric-count">9</span>
                    </div>
                    <div className="home-page-metric">
                        <span className="home-page-metric-label">Admission</span>
                        <div className="home-page-progress-bar">
                            <div className="home-page-progress" style={{ width: '0%' }}></div>
                        </div>
                        <span className="home-page-metric-count">0</span>
                    </div>
                    <div className="home-page-metric">
                        <span className="home-page-metric-label">Discharge</span>
                        <div className="home-page-progress-bar">
                            <div className="home-page-progress" style={{ width: '10%' }}></div>
                        </div>
                        <span className="home-page-metric-count">1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
