/* Ajhar Tamboli addPatientQueueDisplay.jsx 08-10-24 */


import React, { useState, useEffect } from 'react';
import './addPatientQueueDisplay.css';

const AddPatientQueueDisplay = ({ onClose, onSubmit, selectedQueue }) => {
  const [formData, setFormData] = useState({
    queueNumber: '',
    id: '',
    name: '',
    ageGender: '',
    department: '',
    consultationType: '',
    appointmentNumber: '',
    serviceProvider: '',
    mobile: '',
    appointmentTime: '',
    status: ''
  });

  // Populate the form if selectedQueue is passed
  useEffect(() => {
    if (selectedQueue) {
      // Ensure every field has a default value to avoid uncontrolled input
      setFormData({
        queueNumber: selectedQueue.queueNumber || '',
        id: selectedQueue.id || '',
        name: selectedQueue.name || '',
        ageGender: selectedQueue.ageGender || '',
        department: selectedQueue.department || '',
        consultationType: selectedQueue.consultationType || '',
        appointmentNumber: selectedQueue.appointmentNumber || '',
        serviceProvider: selectedQueue.serviceProvider || '',
        mobile: selectedQueue.mobile || '',
        appointmentTime: selectedQueue.appointmentTime || '',
        status: selectedQueue.status || ''
      });
    }
  }, [selectedQueue]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the parent component's onSubmit function with form data
  };

  return (
    <div className="addPatientQueueDisplay-container">
      <div className="addPatientQueueDisplay-header">
        <h3>{selectedQueue ? 'Edit Patient Queue Display' : 'Add Patient Queue Display'}</h3>
      </div>

      <form className="addPatientQueueDisplay-form" onSubmit={handleSubmit}>
        <div className="addPatientQueueDisplay-form-row">
          <div className="addPatientQueueDisplay-form-group-1row">
            <div className="addPatientQueueDisplay-form-group">
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
            <div className="addPatientQueueDisplay-form-group">
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

          <div className="addPatientQueueDisplay-form-group-1row">
            <div className="addPatientQueueDisplay-form-group">
              <label>Patient Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Patient Name"
              />
            </div>
            <div className="addPatientQueueDisplay-form-group">
              <label>Age<span>*</span></label>
              <input
                type="text"
                name="ageGender"
                value={formData.ageGender}
                onChange={handleInputChange}
                placeholder="Enter Age"

              />
            </div>
          </div>

          <div className="addPatientQueueDisplay-form-group-1row">
            <div className="addPatientQueueDisplay-form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Enter Department"
              />
            </div>
            <div className="addPatientQueueDisplay-form-group">
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

          <div className="addPatientQueueDisplay-form-group-1row">
            <div className="addPatientQueueDisplay-form-group">
              <label>Consultation Type</label>
              <input
                type="text"
                name="consultationType"
                value={formData.consultationType}
                onChange={handleInputChange}
                placeholder="Enter Consultation Type"
              />
            </div>
            <div className="addPatientQueueDisplay-form-group">
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

          <div className="addPatientQueueDisplay-form-group-1row">
            <div className="addPatientQueueDisplay-form-group">
              <label>Service Provider</label>
              <input
                type="text"
                name="serviceProvider"
                value={formData.serviceProvider}
                onChange={handleInputChange}
                placeholder="Enter Service Provider"
              />
            </div>
            <div className="addPatientQueueDisplay-form-group">
              <label>Mobile No</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter Mobile No"
              />
            </div>
          </div>

          <div className="addPatientQueueDisplay-form-group-1row">
            <div className="addPatientQueueDisplay-form-group">
              <label>Appointment Time</label>
              <input
                type="time"
                name="appointmentTime" style={{ width: '80%', marginLeft: '75px' }}
                value={formData.appointmentTime}
                onChange={handleInputChange}
                placeholder="Enter Appointment Time"
              />
            </div>
          </div>
        </div>
        <div className="addPatientQueueDisplay-form-actions">
          <button className="addPatientQueueDisplay-add-btn" type="submit">
            {selectedQueue ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPatientQueueDisplay;
