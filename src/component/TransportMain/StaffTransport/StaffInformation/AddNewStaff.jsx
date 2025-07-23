import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './AddNewStaff.css';
import { API_BASE_URL } from '../../../api/api';

function AddNewStaff() {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    noOfPeople: '', // New field for number of people
    staffRouteAssignment: '', // New field for staff route assignment
    department: '',
    designation: '',
    shiftStart: '',
    shiftEnd: '',
    pickupLocation: '',
    dropOffLocation: '',
  });

  // Handler to manage input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler to submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log('Form submitted:', formData);

    try {
      const response = await axios.post(`${API_BASE_URL}/staff`, formData);
      console.log('Response from server:', response.data);

      // Optional: Reset the form after successful submission
      setFormData({
        staffId: '',
        name: '',
        noOfPeople: '',
        staffRouteAssignment: '',
        department: '',
        designation: '',
        shiftStart: '',
        shiftEnd: '',
        pickupLocation: '',
        dropOffLocation: '',
      });

      // Optional: Show a success message or perform any additional actions
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optional: Handle error appropriately (e.g., show a notification)
    }
  };

  return (
    <div className="StaffTransportForm-form-container">
      <h2 className="StaffTransportForm-form-title">Staff Transport Form</h2>
      <form onSubmit={handleSubmit} className="StaffTransportForm-form"> {/* Corrected here */}

        <div className="StaffTransportForm-form-group">
          <label htmlFor="staffId">Staff ID</label>
          <input
            type="text"
            id="staffId"
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="StaffTransportForm-form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* New field for No. of People */}
        <div className="StaffTransportForm-form-group">
          <label htmlFor="noOfPeople">No. of People</label>
          <input
            type="number"
            id="noOfPeople"
            name="noOfPeople"
            value={formData.noOfPeople}
            onChange={handleChange}
            required
          />
        </div>

        {/* New field for Staff Route Assignment */}
        <div className="StaffTransportForm-form-group">
          <label htmlFor="staffRouteAssignment">Staff Route Assignment</label>
          <input
            type="text"
            id="staffRouteAssignment"
            name="staffRouteAssignment"
            value={formData.staffRouteAssignment}
            onChange={handleChange}
            required
          />
        </div>

        <div className="StaffTransportForm-form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="StaffTransportForm-form-group">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="StaffTransportForm-form-group">
          <label>Shift Timing</label>
          <div className="StaffTransportForm-shift-timing">
            <input
              type="time"
              name="shiftStart"
              value={formData.shiftStart}
              onChange={handleChange}
              required
            />
            <span>to</span>
            <input
              type="time"
              name="shiftEnd"
              value={formData.shiftEnd}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="StaffTransportForm-form-group">
          <label htmlFor="pickupLocation">Pickup Location</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="StaffTransportForm-form-group">
          <label htmlFor="dropOffLocation">Drop-off Location</label>
          <input
            type="text"
            id="dropOffLocation"
            name="dropOffLocation"
            value={formData.dropOffLocation}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="StaffTransportForm-submit-button">Submit</button>
      </form>
    </div>
  );
}

export default AddNewStaff;
