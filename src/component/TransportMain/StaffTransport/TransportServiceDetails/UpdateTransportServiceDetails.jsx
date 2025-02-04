import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateTransportServiceDetails.css'; // Importing the CSS for styling
import { API_BASE_URL } from '../../../api/api';

const UpdateStaffForm = ({ staffData, onSubmit }) => {
  const [formData, setFormData] = useState({
    vehicleId: '',
    vehicleCapacity: '',
    driverName: '',
    driverContact: '',
    licensePlate: '',
    vehicleType: '',
    availabilityStatus: '',
  });

  // Populate the form with the staff data when editing
  useEffect(() => {
    if (staffData) {
      setFormData({
        ...staffData,
      });
    }
  }, [staffData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      console.log(formData);
      const response = await axios.put(`${API_BASE_URL}/vehicles/${formData.vehicleID}`, formData);
      console.log('Data updated successfully', response.data);
      onSubmit(response.data); // Pass the updated data to the parent component
    } catch (error) {
      console.error('Error updating staff data:', error);
    }
  };

  return (
    <div className="StaffTransportManagement-form-container">
      <h2 className="StaffTransportManagement-form-title">Update Vehicle Information</h2>
      <form onSubmit={handleSubmit} className="StaffTransportManagement-form">
        <div className="StaffTransportManagement-form-row">
          <div className="StaffTransportManagement-form-group">
            <label className="StaffTransportManagement-label">Vehicle ID</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleID}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>

          <div className="StaffTransportManagement-form-group">
            <label className="StaffTransportManagement-label">Vehicle Capacity</label>
            <input
              type="number"
              name="vehicleCapacity"
              value={formData.vehicleCapacity}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="StaffTransportManagement-form-row">
          <div className="StaffTransportManagement-form-group">
            <label className="StaffTransportManagement-label">Driver Name</label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>

          <div className="StaffTransportManagement-form-group">
            <label className="StaffTransportManagement-label">Driver Contact</label>
            <input
              type="text"
              name="driverContact"
              value={formData.driverContact}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="StaffTransportManagement-form-row">
          <div className="StaffTransportManagement-form-group">
            <label className="StaffTransportManagement-label">License Plate Number</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlateNumber}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>

          <div className="StaffTransportManagement-form-group">
            <label className="StaffTransportManagement-label">Vehicle Type</label>
            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="StaffTransportManagement-form-row">
          <div className="StaffTransportManagement-form-group">
            <label className="StaffTransportManagement-label">Availability Status</label>
            <input
              type="text"
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <button type="submit" className="StaffTransportManagement-submit-button">Update Vehicle</button>
      </form>
    </div>
  );
};

export default UpdateStaffForm;
