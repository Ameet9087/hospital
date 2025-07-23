/* Ajhar Tamboli addServiceTimeTracking.jsx 08-10-24 */


import React, { useState, useEffect } from 'react';
import "./addServiceTimeTracking.css";

const AddServiceTimeTracking = ({ onClose, selectedTest, onSubmit }) => {
  const [formData, setFormData] = useState({
    queueNumber: '',
    id: '',
    waitTime: '',
    appointmentNumber: '',
    completedTime: '',
    serviceStartTime: '',
    arrivalTime: '',
    appointmentTime: '',
    status: ''
  });

  // Populate form data if updating
  useEffect(() => {
    if (selectedTest) {
      setFormData({
        queueNumber: selectedTest.queueNumber || '',
        id: selectedTest.id || '',
        waitTime: selectedTest.waitTime || '',
        appointmentNumber: selectedTest.appointmentNumber || '',
        completedTime: selectedTest.completedTime || '',
        serviceStartTime: selectedTest.serviceStartTime || '',
        arrivalTime: selectedTest.arrivalTime || '',
        appointmentTime: selectedTest.appointmentTime || '',
        status: selectedTest.status || ''
      });
    } else {
      setFormData({
        queueNumber: '',
        id: '',
        waitTime: '',
        appointmentNumber: '',
        completedTime: '',
        serviceStartTime: '',
        arrivalTime: '',
        appointmentTime: '',
        status: ''
      });
    }
  }, [selectedTest]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data:", formData); // Log the form data before submitting
    onSubmit(formData); // Submit the form data to parent component
    onClose(); // Close the modal
  };

  return (
    <div className="addServiceTimeTracking-container">
      <div className="addServiceTimeTracking-header">
        <h3>{selectedTest ? 'Update' : 'Add'} Service Time Tracking</h3>
      </div>

      <form onSubmit={handleSubmit}>  {/* Handle form submit */}
        <div className="addServiceTimeTracking-form">
          <div className="addServiceTimeTracking-form-row">
            {/* Queue ID and Patient ID */}
            <div className="addServiceTimeTracking-form-group-1row">
              <div className="addServiceTimeTracking-form-group">
                <label>Queue ID<span>*</span></label>
                <input
                  type="text"
                  name="queueNumber"
                  value={formData.queueNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Queue ID"
                  required
                />
              </div>
              <div className="addServiceTimeTracking-form-group">
                <label>Patient ID<span>*</span></label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Enter Patient ID"
                />

              </div>
            </div>

            {/* Wait Time and Appointment Number */}
            <div className="addServiceTimeTracking-form-group-1row">
              <div className="addServiceTimeTracking-form-group">
                <label>Wait Time</label>
                <input
                  type="text"
                  name="waitTime"
                  value={formData.waitTime}
                  onChange={handleInputChange}
                  placeholder="Enter Wait Time"
                />
              </div>
              <div className="addServiceTimeTracking-form-group">
                <label>Appointment No</label>
                <input
                  type="text"
                  name="appointmentNumber"
                  value={formData.appointmentNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Appointment No"
                />
              </div>
            </div>

            {/* Completed Time and Service Time */}
            <div className="addServiceTimeTracking-form-group-1row">
              <div className="addServiceTimeTracking-form-group">
                <label>Completed Time</label>
                <input
                  type="time"
                  name="completedTime"
                  value={formData.completedTime}
                  onChange={handleInputChange}
                  style={{ width: '80%', marginLeft: '75px' }}
                />
              </div>
              <div className="addServiceTimeTracking-form-group">
                <label>Service Time<span>*</span></label>
                <input
                  type="time"
                  name="serviceStartTime"
                  value={formData.serviceStartTime}
                  onChange={handleInputChange}
                  style={{ width: '80%', marginLeft: '75px' }}

                />
              </div>
            </div>

            {/* Arrival Time and Appointment Time */}
            <div className="addServiceTimeTracking-form-group-1row">
              <div className="addServiceTimeTracking-form-group">
                <label>Arrival Time</label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                  style={{ width: '80%', marginLeft: '75px' }}
                />
              </div>
              <div className="addServiceTimeTracking-form-group">
                <label>Appointment Time<span>*</span></label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  style={{ width: '80%', marginLeft: '75px' }}
                />
              </div>
            </div>

            {/* Status */}
            <div className="addServiceTimeTracking-form-group-1row">
              <div className="addServiceTimeTracking-form-group">
                <label>Status</label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  placeholder="Enter Status"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="addServiceTimeTracking-form-actions">
          <button className="addServiceTimeTracking-add-btn" type="submit">
            {selectedTest ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceTimeTracking;
