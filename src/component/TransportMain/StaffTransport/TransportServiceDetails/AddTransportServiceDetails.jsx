import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './AddTransportServiceDetails.css'; // Import CSS for styling
import { API_BASE_URL } from '../../../api/api';

const StaffTransportForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    department: '',
    designation: '',
    shiftStart: '',
    shiftEnd: '',
    pickupLocation: '',
    dropOffLocation: '',
    vehicleId: '',
    vehicleCapacity: '',
    driverName: '',
    driverContact: '',
    licensePlateNumber: '',
    vehicleType: '',
    fuelStatus: '',
    availabilityStatus: '',
  });

  // Pre-fill form if initial data is provided
  useEffect(() => {
    if (initialData) {
      setFormData({
        staffId: initialData.id,
        name: initialData.name,
        department: initialData.department,
        designation: initialData.designation,
        shiftTime: initialData.shiftTiming.split(' - ')[0],
        shiftEnd: initialData.shiftTiming.split(' - ')[1],
        pickupLocation: initialData.pickupLocation,
        dropOffLocation: initialData.dropOffLocation,
        vehicleId: initialData.vehicleId || '',
        vehicleCapacity: initialData.vehicleCapacity || '',
        driverName: initialData.driverName || '',
        driverContact: initialData.driverContact || '',
        licensePlateNumber: initialData.licensePlateNumber || '',
        vehicleType: initialData.vehicleType || '',
        fuelStatus: initialData.fuelStatus || '',
        availabilityStatus: initialData.availabilityStatus || '',
      });
    }
  }, [initialData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const shiftTiming = `${formData.shiftStart} - ${formData.shiftEnd}`;
    const payload = { ...formData, shiftTiming };

    try {
      // Send POST request to your API
      console.log(payload);
      const response = await axios.post(`${API_BASE_URL}/vehicles`, payload);
      console.log('Server response:', response.data);
      onSubmit(response.data); // Optionally pass the response back for further processing
      // Display success message or redirect after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error appropriately (e.g., show a notification)
    }
  };

  return (
    <div className="MADStaffTransportManagement-form-container">
      <h2 className="MADStaffTransportManagement-form-title">Staff Transport Form</h2>
      <form onSubmit={handleSubmit} className="MADStaffTransportManagement-form">

        <div className="MADStaffTransportManagement-form-group MADStaffTransportManagement-form-group-columns">
          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="staffId" className="MADStaffTransportManagement-label">Staff Vehicle ID</label>
            <input
              type="text"
              id="staffId"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              className="MADStaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="MADStaffTransportManagement-form-group MADStaffTransportManagement-form-group-columns">
          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="vehicleCapacity" className="MADStaffTransportManagement-label">Vehicle Capacity</label>
            <input
              type="number"
              id="vehicleCapacity"
              name="vehicleCapacity"
              value={formData.vehicleCapacity}
              onChange={handleChange}
              className="MADStaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="MADStaffTransportManagement-form-group MADStaffTransportManagement-form-group-columns">
          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="driverName" className="MADStaffTransportManagement-label">Driver Name</label>
            <input
              type="text"
              id="driverName"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              className="MADStaffTransportManagement-input"
              required
            />
          </div>

          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="driverContact" className="MADStaffTransportManagement-label">Driver Contact</label>
            <input
              type="text"
              id="driverContact"
              name="driverContact"
              value={formData.driverContact}
              onChange={handleChange}
              className="MADStaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="MADStaffTransportManagement-form-group MADStaffTransportManagement-form-group-columns">
          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="licensePlateNumber" className="MADStaffTransportManagement-label">License Plate Number</label>
            <input
              type="text"
              id="licensePlateNumber"
              name="licensePlateNumber"
              value={formData.licensePlateNumber}
              onChange={handleChange}
              className="MADStaffTransportManagement-input"
              required
            />
          </div>

          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="vehicleType" className="MADStaffTransportManagement-label">Vehicle Type</label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="MADStaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="MADStaffTransportManagement-form-group MADStaffTransportManagement-form-group-columns">
          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="fuelStatus" className="MADStaffTransportManagement-label">Fuel Status</label>
            <input
              type="text"
              id="fuelStatus"
              name="fuelStatus"
              value={formData.fuelStatus}
              onChange={handleChange}
              className="MADStaffTransportManagement-input"
              required
            />
          </div>

          <div className="MADStaffTransportManagement-form-field">
            <label htmlFor="availabilityStatus" className="MADStaffTransportManagement-label">Availability Status</label>
            <select
              id="availabilityStatus"
              name="availabilityStatus"
              value={formData.availabilityStatus}
              onChange={handleChange}
              className="MADStaffTransportManagement-select"
              required
            >
              <option value="">Select</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>
        </div>

        <div className="MADStaffTransportManagement-button-container">
          <button type="submit" className="MADStaffTransportManagement-submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default StaffTransportForm;
