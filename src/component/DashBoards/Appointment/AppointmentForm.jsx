import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    age: '',
    ageUnit: 'Yrs',
    reason: '',
    contactNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    department: '',
    doctor: '',
    visitType: 'New Patient'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="firstName">First Name *</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="middleName">Middle Name</label>
        <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name *</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Gender *</label>
        <div className="radio-group">
          <input type="radio" id="male" name="gender" value="Male" onChange={handleChange} />
          <label htmlFor="male">Male</label>
          <input type="radio" id="female" name="gender" value="Female" onChange={handleChange} />
          <label htmlFor="female">Female</label>
          <input type="radio" id="other" name="gender" value="Other" onChange={handleChange} />
          <label htmlFor="other">Other</label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="age">Age *</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
        <select name="ageUnit" value={formData.ageUnit} onChange={handleChange}>
          <option value="Yrs">Yrs</option>
          <option value="Months">Months</option>
          <option value="Days">Days</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="reason">Reason</label>
        <input type="text" id="reason" name="reason" value={formData.reason} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="contactNumber">Contact Number *</label>
        <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentDate">Appointment Date *</label>
        <input type="date" id="appointmentDate" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label htmlFor="appointmentTime">Appointment Time</label>
        <input type="time" id="appointmentTime" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="doctor">Doctor</label>
        <input type="text" id="doctor" name="doctor" value={formData.doctor} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="visitType">Select Visit Type</label>
        <select id="visitType" name="visitType" value={formData.visitType} onChange={handleChange}>
          <option value="New Patient">New Patient</option>
          <option value="Follow Up">Follow Up</option>
        </select>
      </div>

      <button type="submit" className="submit-button">Add Appointment</button>
    </form>
  );
};

export default AppointmentForm;