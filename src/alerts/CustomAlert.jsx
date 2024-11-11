import React, { useState, useEffect } from 'react';
import './CustomAlert.css'; // Import CSS for styling

const CustomAlert = ({ message, type, duration, onClose }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`custom-alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">x</button>
    </div>
  );
};

export default CustomAlert;
