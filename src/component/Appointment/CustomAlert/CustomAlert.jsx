import React, { useState, useEffect } from "react";
import "./CustomAlert.css"; // For styling

const CustomAlert = ({ message, type = "info", duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`custom-alert custom-alert-${type}`}>
      <span>{message}</span>
      <button className="custom-alert-close" onClick={() => setVisible(false)}>
        ×
      </button>
    </div>
  );
};

export default CustomAlert;
