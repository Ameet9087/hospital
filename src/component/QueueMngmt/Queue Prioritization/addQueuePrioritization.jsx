/* Ajhar Tamboli addQueuePrioritization.jsx 09-10-24 */

import React, { useEffect, useState } from 'react';
import "./addQueuePrioritization.css";

const AddQueuePrioritization = ({ onClose, editingItem, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    priority: '',
    department: '',
    queueNumber: '',
    consultationType: '',
    appointmentNo: '',
    appointmentTime: '',
    status: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        id: editingItem.id,
        name: editingItem.name,
        priority: editingItem.priority,
        department: editingItem.department,
        queueNumber: editingItem.queueNumber,
        consultationType: editingItem.consultationType,
        appointmentNo: editingItem.appointmentNo,
        appointmentTime: editingItem.appointmentTime,
        status: editingItem.status
      });
    } else {
      setFormData({
        id: '',
        name: '',
        priority: '',
        department: '',
        queueNumber: '',
        consultationType: '',
        appointmentNo: '',
        appointmentTime: '',
        status: ''
      });
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <div className="addQueuePrioritization-container">
      <div className="addQueuePrioritization-header">
        <h3>{editingItem ? 'Edit Queue Prioritization' : 'Add Queue Prioritization'}</h3>
      </div>

      <form className="addQueuePrioritization-form" onSubmit={handleSubmit}>
        <div className="addQueuePrioritization-form-row">

          <div className="addQueuePrioritization-form-group-1row">
            <div className="addQueuePrioritization-form-group">
              <label>Queue ID<span>*</span></label>
              <input
                type="text"
                name="queueNumber"
                placeholder="Enter Queue ID"
                value={formData.queueNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="addQueuePrioritization-form-group">
              <label>Patient ID<span>*</span></label>
              <input
                type="text"
                name="id" // Unique field name
                placeholder="Enter Patient ID"
                value={formData.id}
                onChange={handleChange}
                 // Make this field required
              />
            </div>
          </div>

          <div className="addQueuePrioritization-form-group-1row">
            <div className="addQueuePrioritization-form-group">
              <label>Patient Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Patient Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="addQueuePrioritization-form-group">
              <label>Priority<span>*</span></label>
              <input
                type="text"
                name="priority" // Fixed field name
                placeholder="Enter Priority"
                value={formData.priority}
                onChange={handleChange}
                 // Make this field required
              />
            </div>
          </div>

          <div className="addQueuePrioritization-form-group-1row">
            <div className="addQueuePrioritization-form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                placeholder="Enter Department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
            <div className="addQueuePrioritization-form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                placeholder="Enter Status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addQueuePrioritization-form-group-1row">
            <div className="addQueuePrioritization-form-group">
              <label>Consultation Type</label>
              <input
                type="text"
                name="consultationType"
                placeholder="Enter Consultation Type"
                value={formData.consultationType}
                onChange={handleChange}
              />
            </div>
            <div className="addQueuePrioritization-form-group">
              <label>Appointment No</label>
              <input
                type="text"
                name="appointmentNo"
                placeholder="Enter Appointment No"
                value={formData.appointmentNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="addQueuePrioritization-form-group-1row">
            <div className="addQueuePrioritization-form-group">
              <label>Appointment Time</label>
              <input
                type="time"
                name="appointmentTime" style={{width: '80%', marginLeft: '75px'}}
                value={formData.appointmentTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="addQueuePrioritization-form-actions">
          <button type="submit" className="addQueuePrioritization-add-btn">
            {editingItem ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQueuePrioritization;
