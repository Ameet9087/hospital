// Modal.js
import React from 'react';
import './OutPatientTodayModal.css'; // Import CSS for the modal

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;