import React, { useState } from 'react';
import './AddEmergencyLateNightsArrangements.css'; // Import CSS for styling
import axios from 'axios'; // Import axios for API requests
import { API_BASE_URL } from '../../../api/api';

const AddSpecialTransportRequest = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    emergencyRequestId: '',
    lateNightPickupEligibility: false,
    driverAllocation: '',
    specialTransportRequests: '',
    numberOfVehicles: '',
    costingPerRequest: '',
    numberOfDrivers: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/emergency-arrangements`, {
        emergencyRequestID: formData.emergencyRequestId,
        lateNightPickupEligibility: formData.lateNightPickupEligibility ? 'Eligible' : 'Not Eligible', // Assuming eligibility is a string
        driverLocation: formData.driverAllocation, // This could be changed based on the actual location data
        specialTransportRequest: formData.specialTransportRequests,
        noOfVehicle: Number(formData.numberOfVehicles), // Ensure it’s a number
        noOfDriver: Number(formData.numberOfDrivers), // Ensure it’s a number
        costPerRequest: Number(formData.costingPerRequest), // Ensure it’s a number
      });

      // Call the onSubmit prop with the response data
      onSubmit(response.data);

      // Optionally reset the form after submission
      setFormData({
        emergencyRequestId: '',
        lateNightPickupEligibility: false,
        driverAllocation: '',
        specialTransportRequests: '',
        numberOfVehicles: '',
        costingPerRequest: '',
        numberOfDrivers: '',
      });

      console.log('Special transport request added successfully:', response.data);
    } catch (error) {
      console.error('Error adding special transport request:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="AddStaffTransportManagement-form-container">
      <h2 className="AddStaffTransportManagement-form-title">Add Special Transport Request</h2>
      <form onSubmit={handleSubmit} className="AddStaffTransportManagement-form">
        <div className="AddStaffTransportManagement-flex-container">
          <div className="AddStaffTransportManagement-left">
            <div className="AddStaffTransportManagement-form-group">
              <label className="AddStaffTransportManagement-form-label">Emergency Request ID</label>
              <input
                type="text"
                name="emergencyRequestId"
                value={formData.emergencyRequestId}
                onChange={handleChange}
                className="AddStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="AddStaffTransportManagement-form-group">
              <label className="AddStaffTransportManagement-form-label">Late-Night Pickup Eligibility</label>
              <input
                type="checkbox"
                name="lateNightPickupEligibility"
                checked={formData.lateNightPickupEligibility}
                onChange={handleChange}
                className="AddStaffTransportManagement-form-checkbox"
              />
            </div>

            <div className="AddStaffTransportManagement-form-group">
              <label className="AddStaffTransportManagement-form-label">No. of Vehicles</label>
              <input
                type="number"
                name="numberOfVehicles"
                value={formData.numberOfVehicles}
                onChange={handleChange}
                className="AddStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="AddStaffTransportManagement-form-group">
              <label className="AddStaffTransportManagement-form-label">Costing per Request</label>
              <input
                type="text"
                name="costingPerRequest"
                value={formData.costingPerRequest}
                onChange={handleChange}
                className="AddStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="AddStaffTransportManagement-form-group">
              <label className="AddStaffTransportManagement-form-label">No. of Drivers</label>
              <input
                type="number"
                name="numberOfDrivers"
                value={formData.numberOfDrivers}
                onChange={handleChange}
                className="AddStaffTransportManagement-form-input"
                required
              />
            </div>
          </div>

          <div className="AddStaffTransportManagement-right">
            <div className="AddStaffTransportManagement-form-group">
              <label className="AddStaffTransportManagement-form-label">Driver Allocation for Emergency Shifts</label>
              <input
                type="text"
                name="driverAllocation"
                value={formData.driverAllocation}
                onChange={handleChange}
                className="AddStaffTransportManagement-form-input"
                required
              />
            </div>

            <div className="AddStaffTransportManagement-form-group">
              <label className="AddStaffTransportManagement-form-label">Special Transport Requests</label>
              <textarea
                name="specialTransportRequests"
                value={formData.specialTransportRequests}
                onChange={handleChange}
                className="AddStaffTransportManagement-form-textarea"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="AddStaffTransportManagement-form-submit-button">Add Request</button>
      </form>
    </div>
  );
};

export default AddSpecialTransportRequest;
