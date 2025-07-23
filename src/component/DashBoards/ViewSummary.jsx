import React, { useState } from 'react';
import './Activeproblems.css';
import FamilyHistoryProblemList from '../DashBoards/HistoryBar';
import SurgicalHistory from './SurgicalHistory';
import SocialHistory from './SocialHistory'; 
import ReferralSource from './ReferralSource'; 

const ActiveProblems = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('ActiveProblems');

  const renderContent = () => {
    switch (activeTab) {
      case 'ActiveProblems':
        return (
          <section className="ive-active-problems">
            <div className="ive-header">
              <h2>Active Medical Problems</h2>
              <button className="ive-add-btn">Add</button>
              <button className="close-btn" onClick={onClose}>❌</button> {/* Add a close button */}
            </div>
            <table>
              <thead>
                <tr>
                  <th>ICD-11 Description</th>
                  <th>Date</th>
                  <th>Notes</th>
                  <th>Resolved</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>(1F4Z)Malaria, unspecified</td>
                  <td>2024-08-13</td>
                  <td>fregert</td>
                  <td><input type="checkbox" /></td>
                  <td><a href="#" className="ive-edit-link">Edit</a></td>
                </tr>
                <tr>
                  <td><span className="ive-star">★</span> (DB10.)Appendicitis</td>
                  <td>2024-08-24</td>
                  <td></td>
                  <td><input type="checkbox" /></td>
                  <td><a href="#" className="ive-edit-link">Edit</a></td>
                </tr>
              </tbody>
            </table>
          </section>
        );
      case 'FamilyHistory':
        return <FamilyHistoryProblemList />;
      case 'SurgicalHistory':
        return <SurgicalHistory />;
      case 'SocialHistory':
        return <SocialHistory />;
      case 'ReferralSource':
        return <ReferralSource />;
      default:
        return null;
    }
  };

  return (
    <div className="ive-container">
      <nav className="ive-nav">
        <ul>
          <li 
            className={activeTab === 'ActiveProblems' ? 'ive-active' : ''} 
            onClick={() => setActiveTab('ActiveProblems')}
          >
            Active Problems
          </li>
          <li 
            className={activeTab === 'FamilyHistory' ? 'ive-active' : ''} 
            onClick={() => setActiveTab('FamilyHistory')}
          >
            Family History
          </li>
          <li 
            className={activeTab === 'SurgicalHistory' ? 'ive-active' : ''} 
            onClick={() => setActiveTab('SurgicalHistory')}
          >
            Surgical History
          </li>
          <li 
            className={activeTab === 'SocialHistory' ? 'ive-active' : ''} 
            onClick={() => setActiveTab('SocialHistory')}
          >
            Social History
          </li>
          <li 
            className={activeTab === 'ReferralSource' ? 'ive-active' : ''} 
            onClick={() => setActiveTab('ReferralSource')}
          >
            Referral Source
          </li>
        </ul>
      </nav>

      {renderContent()}
    </div>
  );
};

export default ActiveProblems;
