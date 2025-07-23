import React from 'react';
import './NursingCustomModal.css'; // Create this CSS file for styling the modal.

function NursingCustomModal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div className="Nursing-modal-overlay">
      <div className="Nursing-modal-content">
        <div className="Nursing-modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="Nursing-close-button">×</button>
        </div>
        <div className="Nursing-modal-body">
          {children}
        </div>
        {/* <div className="Nursing-modal-footer">
          <button onClick={onClose} className="Nursing-modal-close-button">Close</button>
        </div> */}
      </div>
    </div>
  );
}

export default NursingCustomModal;
