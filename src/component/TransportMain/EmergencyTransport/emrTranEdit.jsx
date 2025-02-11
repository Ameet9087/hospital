/* Dhanashree_EmrTranEdit_24/09_Starts */

import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './emrTranEdit.css';
import { API_BASE_URL } from '../../api/api';

const EmrTranEdit = ({ row, closeModal }) => {
  const [formData, setFormData] = useState({
    name: row.patientName || '',
    age: row.age || '',
    gender: row.gender || '',
    contactNumber: row.contactNumber || '',
    emergencyType: row.emergencyType || '',
    pickupLocation: row.pickupLocation || '',
    status: row.status || '',
    emergencyCost: row.emergencyCost || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    const updateUrl = `${API_BASE_URL}/EmergencyTransport/updateTransport/${row.emergencyId}`; // Replace with actual update API URL
    axios.put(updateUrl, formData)
      .then((response) => {
        console.log('Updated Data:', response.data);
        alert('Data Updated Successfully!');
        closeModal(); // Close the modal after update
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        alert('Failed to update data. Please try again.');
      });
  };

  return (
    <div className="EmrTranEdit-card">
      <h2>Edit Emergency Patient</h2>
      <div className="EmrTranEdit-form-group">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="EmrTranEdit-form-group">
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </div>
      <div className="EmrTranEdit-form-group">
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="EmrTranEdit-form-group">
        <label>Contact Number:</label>
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </div>
      <div className="EmrTranEdit-form-group">
        <label>Emergency Type:</label>
        <input type="text" name="emergencyType" value={formData.emergencyType} onChange={handleChange} />
      </div>
      <div className="EmrTranEdit-form-group">
        <label>Pickup Location:</label>
        <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} />
      </div>
      <div className="EmrTranEdit-form-group">
        <label>Status:</label>
        <input type="text" name="status" value={formData.status} onChange={handleChange} />
      </div>
      <div className="EmrTranEdit-form-group">
        <label>Emergency Cost:</label>
        <input type="number" name="emergencyCost" value={formData.emergencyCost} onChange={handleChange} />
      </div>
      <button className="EmrTranEdit-button" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default EmrTranEdit;

/* Dhanashree_EmrTranEdit_24/09_Ends */
