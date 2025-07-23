import React from 'react';
import '../NavLIS/labLISAddNewMapping.css';

function LabLISAddNewMapping({ onClose }) {
  return (
    <div className="labLISAddNewMapping-overlay">
    <div className="labLISAddNewMapping-container">
      <div className="labLISAddNewMapping-header">
        <h2>Add Mapping for Lab Component to Machine Component</h2>
        <button className="labLISAddNewMapping-close-btn" onClick={onClose}>×</button>
      </div>
      <div className="labLISAddNewMapping-content">
        {/* Content can be added here */}
      </div>
      <div className="labLISAddNewMapping-actions">
        <button className="labLISAddNewMapping-cancel-btn" onClick={onClose}>Cancel</button>
        <button className="labLISAddNewMapping-save-btn">Save</button>
      </div>
    </div>
  </div>
  );
}

export default LabLISAddNewMapping;
