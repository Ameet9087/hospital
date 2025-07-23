import React, { useState, useEffect } from 'react';
import './UpdateRouteScheduleManagement.css'; // Import CSS for styling
import axios from 'axios'; // Import axios for API requests
import { API_BASE_URL } from '../../../api/api';

const UpdateForm = ({ initialData, onSubmit }) => {
  console.log(initialData)
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData); // Log form data to check before sending
      const response = await axios.put(`${API_BASE_URL}/routes/${formData.routeID}`, formData);
      onSubmit(response.data); // Pass the response data to the parent component
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code outside the range of 2xx
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  return (
    <div className="UUStaffTransportManagement-form-container">
      <h2 className="UUStaffTransportManagement-form-title">Update Route</h2>
      <form onSubmit={handleSubmit} className="UUStaffTransportManagement-form">
        <div className="UUStaffTransportManagement-form-group">
          <label className="UUStaffTransportManagement-form-label">Route ID</label>
          <input
            type="text"
            name="routeID"
            value={formData.routeID} // Bind Route ID to form data
            onChange={handleChange}
            className="UUStaffTransportManagement-form-input"
            readOnly // Set as read-only if it should not be edited
            required
          />
        </div>

        <div className="UUStaffTransportManagement-form-group">
          <label className="UUStaffTransportManagement-form-label">Route</label>
          <input
            type="text"
            name="routeName"
            value={formData.routeName}
            onChange={handleChange}
            className="UUStaffTransportManagement-form-input"
            required
          />
        </div>

        <div className="UUStaffTransportManagement-form-group">
          <label className="UUStaffTransportManagement-form-label">Pickup Time</label>
          <input
            type="text"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className="UUStaffTransportManagement-form-input"
            required
          />
        </div>

        <div className="UUStaffTransportManagement-form-group">
          <label className="UUStaffTransportManagement-form-label">Drop-off Time</label>
          <input
            type="text"
            name="dropOffTime"
            value={formData.dropOffTime}
            onChange={handleChange}
            className="UUStaffTransportManagement-form-input"
            required
          />
        </div>



        <div className="UUStaffTransportManagement-form-group">
          <label className="UUStaffTransportManagement-form-label">Traffic Condition</label>
          <input
            type="text"
            name="trafficCondition"
            value={formData.trafficCondition}
            onChange={handleChange}
            className="UUStaffTransportManagement-form-input"
            required
          />
        </div>

        <button type="submit" className="UUStaffTransportManagement-form-submit-button">Update Route</button>
      </form>
    </div>
  );
};

export default UpdateForm;
