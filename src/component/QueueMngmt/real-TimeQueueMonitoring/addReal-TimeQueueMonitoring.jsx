/* Ajhar Tamboli addReal-TimeQueueMonitoring.jsx 08-10-24 */


import React, { useState, useEffect } from 'react';
import "./addReal-TimeQueueMonitoring.css";

const AddRealTimeQueueMonitoring = ({ onClose, selectedData, onSubmit }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    queueNumber: '',
    id: '',
    arrivalTime: '',
    priority: '',
    appointmentTime: '',
    appointmentNumber: '',
    scheduledTime: '',
    serviceType: '',
    roomNumber: '',
    position: '',
    status: '',
  });

  // Effect to populate form data when selectedData changes
  useEffect(() => {
    if (selectedData) {
      setFormData({
        queueNumber: selectedData.queueNumber || '',
        id: selectedData.id || '',
        arrivalTime: selectedData.arrivalTime || '',
        priority: selectedData.priority || '',
        appointmentTime: selectedData.appointmentTime || '',
        appointmentNumber: selectedData.appointmentNumber || '',
        scheduledTime: selectedData.scheduledTime || '',
        serviceType: selectedData.serviceType || '',
        roomNumber: selectedData.roomNumber || '',
        position: selectedData.position || '',
        status: selectedData.status || '',
      });
    }
  }, [selectedData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the submit handler
    onClose(); // Close the popup after submission
  };

  return (
    <div className="addRealTimeQueueMonitoring-container">
      <div className="addRealTimeQueueMonitoring-header">
        <h3>{selectedData ? 'Update Real-Time Queue Monitoring' : 'Add Real-Time Queue Monitoring'}</h3>
      </div>

      <form className="addRealTimeQueueMonitoring-form" onSubmit={handleSubmit}>
        <div className="addRealTimeQueueMonitoring-form-row">
          {/* First Row */}
          <div className="addRealTimeQueueMonitoring-form-group-1row">
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Queue ID<span>*</span></label>
              <input
                type="text"
                name="queueNumber"
                value={formData.queueNumber}
                onChange={handleChange}
                placeholder="Enter Queue ID"
                required
              />
            </div>
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Patient ID<span>*</span></label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="Enter Patient ID"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="addRealTimeQueueMonitoring-form-group-1row">
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Arrival Time</label>
              <input
                type="time"
                name="arrivalTime" style={{ width: '80%', marginLeft: '75px' }}
                value={formData.arrivalTime}
                onChange={handleChange}
                placeholder="Enter Arrival Time"
              />
            </div>
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Priority Level<span>*</span></label>
              <input
                type="text"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                placeholder='Enter Priority Level'
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="addRealTimeQueueMonitoring-form-group-1row">
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Appointment Time</label>
              <input
                type="time"
                name="appointmentTime" style={{ width: '80%', marginLeft: '75px' }}
                value={formData.appointmentTime}
                onChange={handleChange}
                placeholder="Enter Appointment Time"
              />
            </div>
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Appointment No<span>*</span></label>
              <input
                type="text"
                name="appointmentNumber"
                value={formData.appointmentNumber}
                onChange={handleChange}
                placeholder='Enter Appointment No'
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="addRealTimeQueueMonitoring-form-group-1row">
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Scheduled Time</label>
              <input
                type="text"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                placeholder="Enter Scheduled Time"
              />
            </div>
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Service Type</label>
              <input
                type="text"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                placeholder="Enter Service Type"
              />
            </div>
          </div>

          {/* Fifth Row */}
          <div className="addRealTimeQueueMonitoring-form-group-1row">
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Room/Location</label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Enter Room/Location"
              />
            </div>
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Queue Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter Queue Position"
              />
            </div>
          </div>

          {/* Status Row */}
          <div className="addRealTimeQueueMonitoring-form-group-1row">
            <div className="addRealTimeQueueMonitoring-form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Enter Status"
              />
            </div>
          </div>
        </div>

        <div className="addRealTimeQueueMonitoring-form-actions">
          <button type="submit" className="addRealTimeQueueMonitoring-add-btn" >
            {selectedData ? 'Update' : 'Add'}  {/* Change button text based on operation */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRealTimeQueueMonitoring;
