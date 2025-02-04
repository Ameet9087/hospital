import React, { useEffect, useState } from 'react'
import './UpdateStaff.css';
function UpdateStaff({ onSubmit, initialData }) {
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

  // Populate form with initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        staffId: initialData.id,
        name: initialData.name,
        noOfPeople: initialData.noOfPeople || '', // Assuming initialData contains this property
        staffRouteAssignment: initialData.staffRouteAssignment || '', // Assuming initialData contains this property
        department: initialData.department,
        designation: initialData.designation,
        shiftStart: initialData.shiftTiming.split(' - ')[0], // Assuming the format '9:00 AM - 5:00 PM'
        shiftEnd: initialData.shiftTiming.split(' - ')[1],
        pickupLocation: initialData.pickupLocation,
        dropOffLocation: initialData.dropOffLocation,
      });
    }
  }, [initialData]);

  // Handler to manage input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler to submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const shiftTiming = `${formData.shiftStart} - ${formData.shiftEnd}`;
    onSubmit({ ...formData, shiftTiming });
  };

  return (
    <div className="StaffTransportManagement-form-container">
      <h2 className="StaffTransportManagement-form-title">Staff Transport Form</h2>
      <form onSubmit={handleSubmit} className="StaffTransportManagement-form">

        <div className="StaffTransportManagement-form-group">
          <label htmlFor="staffId" className="StaffTransportManagement-label">Staff ID</label>
          <input
            type="text"
            id="staffId"
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            className="StaffTransportManagement-input"
            required
          />
        </div>

        <div className="StaffTransportManagement-form-group">
          <label htmlFor="name" className="StaffTransportManagement-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="StaffTransportManagement-input"
            required
          />
        </div>

        {/* New field for No. of People */}
        <div className="StaffTransportManagement-form-group">
          <label htmlFor="noOfPeople" className="StaffTransportManagement-label">No. of People</label>
          <input
            type="number"
            id="noOfPeople"
            name="noOfPeople"
            value={formData.noOfPeople}
            onChange={handleChange}
            className="StaffTransportManagement-input"
            required
          />
        </div>

        {/* New field for Staff Route Assignment */}
        <div className="StaffTransportManagement-form-group">
          <label htmlFor="staffRouteAssignment" className="StaffTransportManagement-label">Staff Route Assignment</label>
          <input
            type="text"
            id="staffRouteAssignment"
            name="staffRouteAssignment"
            value={formData.staffRouteAssignment}
            onChange={handleChange}
            className="StaffTransportManagement-input"
            required
          />
        </div>

        <div className="StaffTransportManagement-form-group">
          <label htmlFor="department" className="StaffTransportManagement-label">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="StaffTransportManagement-input"
            required
          />
        </div>

        <div className="StaffTransportManagement-form-group">
          <label htmlFor="designation" className="StaffTransportManagement-label">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="StaffTransportManagement-select"
            required
          >
            <option value="">Select</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="StaffTransportManagement-form-group">
          <label className="StaffTransportManagement-label">Shift Timing</label>
          <div className="StaffTransportManagement-shift-timing">
            <input
              type="time"
              name="shiftStart"
              value={formData.shiftStart}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
            <span className="StaffTransportManagement-shift-to">to</span>
            <input
              type="time"
              name="shiftEnd"
              value={formData.shiftEnd}
              onChange={handleChange}
              className="StaffTransportManagement-input"
              required
            />
          </div>
        </div>

        <div className="StaffTransportManagement-form-group">
          <label htmlFor="pickupLocation" className="StaffTransportManagement-label">Pickup Location</label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="StaffTransportManagement-input"
            required
          />
        </div>

        <div className="StaffTransportManagement-form-group">
          <label htmlFor="dropOffLocation" className="StaffTransportManagement-label">Drop-off Location</label>
          <input
            type="text"
            id="dropOffLocation"
            name="dropOffLocation"
            value={formData.dropOffLocation}
            onChange={handleChange}
            className="StaffTransportManagement-input"
            required
          />
        </div>

        <button type="submit" className="StaffTransportManagement-submit-button">Submit</button>
      </form>
    </div>
  );
}

export default UpdateStaff