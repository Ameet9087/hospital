import React, { useState } from 'react';
import CustomAlert from './CustomAlert';

const useCustomAlert = () => {
  const [alerts, setAlerts] = useState([]);

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const createAlert = (message, type, duration = 3000) => {
    const id = Math.random();
    const newAlert = {
      id,
      message,
      type,
      duration,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    setTimeout(() => {
      removeAlert(id);
    }, duration);
  };

  // Success alert
  const success = (message, duration) => {
    createAlert(message, 'success', duration);
  };

  // Warning alert
  const warning = (message, duration) => {
    createAlert(message, 'warning', duration);
  };

  // Error alert
  const error = (message, duration) => {
    createAlert(message, 'error', duration);
  };

  const CustomAlerts = () => (
    <div className="custom-alert-container">
      {alerts.map((alert) => (
        <CustomAlert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );

  return { success, warning, error, CustomAlerts };
};

export default useCustomAlert;
