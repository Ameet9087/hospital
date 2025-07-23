import React, { useState } from 'react';

const PatientForm = () => {
  const [patient, setPatient] = useState({
    salutation: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  age: 0,
  phoneNumber: '',
  landlineNumber:'',
  country:'',
  passportNumber: '',
  state: '',
  address: '',
  bloodGroup: '',
  gender: '',
  religion:'',
  maritalStatus: '',
  notifications: false,
  employerInfo: '',
  previousLastName: '',
  occupation: '',
  email: '',
  race: '',
  pinCode: '',
  dialysisPatient: false,
  hospitalNo: '',
  isIPD: false,
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to the backend
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#e0f7fa', borderRadius: '5px' }}>
      <label>Salutation:</label>
      <input type="text" name="salutation" value={patient.salutation} onChange={handleChange} />

      <label>First Name:</label>
      <input type="text" name="firstName" value={patient.firstName} onChange={handleChange} required />

      <label>Middle Name:</label>
      <input type="text" name="middleName" value={patient.middleName} onChange={handleChange} />

      <label>Last Name:</label>
      <input type="text" name="lastName" value={patient.lastName} onChange={handleChange} required />

      <label>Date of Birth:</label>
      <input type="date" name="dateOfBirth" value={patient.dateOfBirth} onChange={handleChange} />

      <label>Age:</label>
      <input type="number" name="age" value={patient.age} onChange={handleChange} />

      <label>Phone Number:</label>
      <input type="tel" name="phoneNumber" value={patient.phoneNumber} onChange={handleChange} required />

      <label>Landline Number:</label>
      <input type="tel" name="landlineNumber" value={patient.landlineNumber} onChange={handleChange} />

      <label>Country:</label>
      <input type="text" name="country" value={patient.country} onChange={handleChange} required />

      <label>Passport Number:</label>
      <input type="text" name="passportNumber" value={patient.passportNumber} onChange={handleChange} />

      <label>State:</label>
      <input type="text" name="state" value={patient.state} onChange={handleChange} required />

      <label>Address:</label>
      <input type="text" name="address" value={patient.address} onChange={handleChange} />

      <label>Blood Group:</label>
      <input type="text" name="bloodGroup" value={patient.bloodGroup} onChange={handleChange} />

      {/* Add more fields as needed */}

      <button type="submit">Register Patient</button>
    </form>
  );
};

export default PatientForm;
