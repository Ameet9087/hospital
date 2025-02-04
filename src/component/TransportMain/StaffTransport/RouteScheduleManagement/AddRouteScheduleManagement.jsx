import React, { useState } from 'react';
import './AddRouteScheduleManagement.css'; // Import CSS for styling
import axios from 'axios'; // Import axios for API requests
import { API_BASE_URL } from '../../../api/api';

const AddForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    routeID: '',
    pickupTime: '',
    dropOffTime: '',

    routeName: '',
    trafficCondition: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Making a POST request to the server with formData
      const response = await axios.post(`${API_BASE_URL}/routes`, formData);

      // After the route is successfully added, call the onSubmit function
      onSubmit(response.data);

      // Optionally, you can reset the form after submission if needed
      setFormData({
        routeID: '',
        pickupTime: '',
        dropOffTime: '',

        routeName: '',
        trafficCondition: '',
      });

      console.log('Route added successfully:', response.data);
    } catch (error) {
      console.error('Error adding new route:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="DDStaffTransportManagement-form-container">
      <h2 className="DDStaffTransportManagement-form-title">Add New Route</h2>
      <form onSubmit={handleSubmit} className="DDStaffTransportManagement-form">
        <div className="DDStaffTransportManagement-form-group">
          <label className="DDStaffTransportManagement-form-label">Route ID</label>
          <input
            type="text"
            name="routeId"
            value={formData.routeID}
            onChange={handleChange}
            className="DDStaffTransportManagement-form-input"

          />
        </div>

        <div className="DDStaffTransportManagement-form-group">
          <label className="DDStaffTransportManagement-form-label">Route</label>
          <input
            type="text"
            name="routeName"
            value={formData.routeName}
            onChange={handleChange}
            className="DDStaffTransportManagement-form-input"
            required
          />
        </div>

        <div className="DDStaffTransportManagement-form-group">
          <label className="DDStaffTransportManagement-form-label">Pickup Time</label>
          <input
            type="text"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className="DDStaffTransportManagement-form-input"
            required
          />
        </div>

        <div className="DDStaffTransportManagement-form-group">
          <label className="DDStaffTransportManagement-form-label">Drop-off Time</label>
          <input
            type="text"
            name="dropOffTime"
            value={formData.dropOffTime}
            onChange={handleChange}
            className="DDStaffTransportManagement-form-input"
            required
          />
        </div>



        <div className="DDStaffTransportManagement-form-group">
          <label className="DDStaffTransportManagement-form-label">Traffic Condition</label>
          <input
            type="text"
            name="trafficCondition"
            value={formData.trafficCondition}
            onChange={handleChange}
            className="DDStaffTransportManagement-form-input"
            required
          />
        </div>

        <button type="submit" className="DDStaffTransportManagement-form-submit-button">Add Route</button>
      </form>
    </div>
  );
};

export default AddForm;
