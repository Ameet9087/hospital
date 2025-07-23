import React from 'react';
import './Modal.css'; // CSS for modal styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="StaffTransportTableEmergency-modal-overlay">
      <div className="StaffTransportTableEmergency-modal-content">
        <button className="StaffTransportTableEmergency-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
