// Dhanashree_AddMessagePageHIMS_26/09_Starts

import React, { useState } from 'react';
import AddMessagePopup from '../components/AddMessagePopup';
import './AddMessagePage.css';

const AddMessagePageHIMS = () => {
  const [formData, setFormData] = useState({
    messageId: '',
    message: '',
    department: '',
    selectedStaff: []
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleSelectDepartment = (selected, messageId, message) => {
    setFormData({
      ...formData,
      messageId,
      message,
      department: selected
    });
  };

  const handleSendMessage = () => {
    setIsFormSubmitted(true);
    setIsPopupVisible(true); // Show the success popup

    // Hide popup after 3 seconds
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  return (
    <div className="AddMessagePageHIMS-container">
      <h1 className="AddMessagePageHIMS-header">Broadcast Message</h1>
      <AddMessagePopup onSelectDepartment={handleSelectDepartment} />

      <button className="AddMessagePageHIMS-send-button" onClick={handleSendMessage}>Send Message</button>

      {/* <Link to="/broadcast/send">
        </Link> */}


      {isPopupVisible && (
        <div className="AddMessagePageHIMS-success-popup">
          <span className="AddMessagePageHIMS-tick">✔</span>
          <span className="AddMessagePageHIMS-success-text">Message sent successfully</span>
        </div>
      )}

      {/* {isFormSubmitted && (
        <div className="AddMessagePageHIMS-summary">
          <h2>Message Summary</h2>
          <p><strong>Department:</strong> {formData.department}</p>
          <p><strong>Message ID:</strong> {formData.messageId}</p>
          <p><strong>Message:</strong> {formData.message}</p>
          <p><strong>Selected Staff:</strong> {formData.selectedStaff.join(', ')}</p>
        </div>
      )} */}
    </div>
  );
};

export default AddMessagePageHIMS;

// Dhanashree_AddMessagePageHIMS_26/09_Ends
