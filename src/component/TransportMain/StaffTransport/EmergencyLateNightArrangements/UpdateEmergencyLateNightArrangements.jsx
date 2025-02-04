import React, { useState, useEffect } from 'react';
import './UpdateEmergencyLateNightArrangement.css'; // Import CSS for styling
import axios from 'axios'; // Import axios for API requests
import { API_BASE_URL } from '../../../api/api';

const UpdateSpecialTransportRequest = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/emergency-arrangements/${formData.emergencyRequestId}`, formData); // Use the correct ID here
      onSubmit(response.data); // Call the onSubmit prop with the response data
    } catch (error) {
      console.error('Error updating special transport request:', error);
      alert('Failed to update the special transport request. Please try again.'); // User feedback for error
    }
  };

  return (
    <div className="RRUpdateStaffTransportManagement-form-container">
      <h2 className="RRUpdateStaffTransportManagement-form-title">Update Special Transport Request</h2>
      <form onSubmit={handleSubmit} className="RRUpdateStaffTransportManagement-form">
        <div className="RRUpdateStaffTransportManagement-flex-container">
          <div className="RRUpdateStaffTransportManagement-left">
            <div className="RRUpdateStaffTransportManagement-form-group">
              <label className="RRUpdateStaffTransportManagement-form-label">Emergency Request ID</label>
              <input
                type="text"
                name="emergencyRequestId"
                value={formData.emergencyRequestId}
                onChange={handleChange}
                className="RRUpdateStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="RRUpdateStaffTransportManagement-form-group">
              <label className="RRUpdateStaffTransportManagement-form-label">Late-Night Pickup Eligibility</label>
              <input
                type="checkbox"
                name="lateNightPickupEligibility"
                checked={formData.lateNightPickupEligibility}
                onChange={handleChange}
                className="RRUpdateStaffTransportManagement-form-checkbox"
              />
            </div>

            <div className="RRUpdateStaffTransportManagement-form-group">
              <label className="RRUpdateStaffTransportManagement-form-label">Driver Allocation for Emergency Shifts</label>
              <input
                type="text"
                name="driverAllocation"
                value={formData.driverAllocation}
                onChange={handleChange}
                className="RRUpdateStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="RRUpdateStaffTransportManagement-form-group">
              <label className="RRUpdateStaffTransportManagement-form-label">Special Transport Requests</label>
              <textarea
                name="specialTransportRequests"
                value={formData.specialTransportRequests}
                onChange={handleChange}
                className="RRUpdateStaffTransportManagement-form-textarea"
                required
              />
            </div>
          </div>

          <div className="RRUpdateStaffTransportManagement-right">
            <div className="RRUpdateStaffTransportManagement-form-group">
              <label className="RRUpdateStaffTransportManagement-form-label">No. of Vehicles</label>
              <input
                type="number"
                name="numberOfVehicles"
                value={formData.numberOfVehicles}
                onChange={handleChange}
                className="RRUpdateStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="RRUpdateStaffTransportManagement-form-group">
              <label className="RRUpdateStaffTransportManagement-form-label">Costing per Request</label>
              <input
                type="text"
                name="costingPerRequest"
                value={formData.costingPerRequest}
                onChange={handleChange}
                className="RRUpdateStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="RRUpdateStaffTransportManagement-form-group">
              <label className="RRUpdateStaffTransportManagement-form-label">No. of Drivers</label>
              <input
                type="number"
                name="numberOfDrivers"
                value={formData.numberOfDrivers}
                onChange={handleChange}
                className="RRUpdateStaffTransportManagement-form-input"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="RRUpdateStaffTransportManagement-form-submit-button">Update Request</button>
      </form>
    </div>
  );
};

export default UpdateSpecialTransportRequest;
