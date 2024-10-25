// CustomModal.js
import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="Cus-modal-overlay">
      <div className="Cus-modal-container">
        <button className="Cus-close-btn " onClick={onClose}>X</button>
        <div className="Cus-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
