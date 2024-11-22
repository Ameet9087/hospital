/* Ajhar Tamboli addPatientNotification.jsx 10-10-24 */


import React, { useState, useEffect } from 'react';
import "./addPatientNotification.css";

const AddPatientNotification = ({ onClose, notification, onSubmit }) => {
  // State for form fields
  const [queueId, setQueueId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [mobile, setMobile] = useState('');
  const [remark, setRemark] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Populate fields if editing an existing notification
    if (notification) {
      setQueueId(notification.queueNumber);
      setPatientId(notification.id);
      setMobile(notification.mobile);
      setRemark(notification.remark);
      setNotificationStatus(notification.notificationStatus);
      setStatus(notification.status);
    }
  }, [notification]); // Only run when the notification prop changes

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Create an object with the form data
    const notificationData = {
      queueNumber: queueId,
      id: patientId,
      mobile,
      remark,
      notificationStatus,
      status,
    };

    // Call the onSubmit function passed from props with the notification data
    onSubmit(notificationData);

    // Clear form fields after submission
    setQueueId('');
    setPatientId('');
    setMobile('');
    setRemark('');
    setNotificationStatus('');
    setStatus('');

    onClose(); // Close the popup after submission
  };

  return (
    <div className="addPatientNotification-container">
      <div className="addPatientNotification-header">
        <h3>{notification ? 'Edit Patient Notification' : 'Add Patient Notification'}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="addPatientNotification-form">
          <div className="addPatientNotification-form-row">
            <div className="addPatientNotification-form-group-1row">
              <div className="addPatientNotification-form-group">
                <label>Queue ID<span>*</span></label>
                <input type="text" placeholder="Enter Queue ID" value={queueId} onChange={(e) => setQueueId(e.target.value)} required />
              </div>
              <div className="addPatientNotification-form-group">
                <label>Patient ID<span>*</span></label>
                <input type="text" placeholder="Enter Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
              </div>
            </div>

            <div className="addPatientNotification-form-group-1row">
              <div className="addPatientNotification-form-group">
                <label>Patient Mo.No</label>
                <input type="text" placeholder="Enter Patient Mo.No" value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>
              <div className="addPatientNotification-form-group">
                <label>Remark</label>
                <input type="text" placeholder="Enter Remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
              </div>
            </div>

            <div className="addPatientNotification-form-group-1row">
              <div className="addPatientNotification-form-group">
                <label>Notification Status</label>
                <input type="text" placeholder="Enter Notification Status" value={notificationStatus} onChange={(e) => setNotificationStatus(e.target.value)} />
              </div>
              <div className="addPatientNotification-form-group">
                <label>Status</label>
                <input type="text" placeholder="Enter Status" value={status} onChange={(e) => setStatus(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="addPatientNotification-form-actions">
            <button type="submit" className='addPatientNotification-add-btn'>
              {notification ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPatientNotification;
