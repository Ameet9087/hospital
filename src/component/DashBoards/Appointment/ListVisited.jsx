import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, FormControl, InputGroup } from 'react-bootstrap';
import './ListVisited.css';

const ListVisited = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://192.168.1.34:1415/api/new-patient-visits');
        setAppointments(response.data); // Assume the data is in response.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="appointment-list">
      <div className='d-flex' style={{alignItems:"center", justifyContent:"space-between"}}>
        <div>
          <h3>Patient Visit List</h3>
          <p>* Followup is valid up to 10 days of last visit with same doctor</p>
          <p>* Refer is valid up to 7 days of last visit</p>
        </div>
        <div>
          <Button variant="primary">Reload</Button>
        </div>
      </div>
      <div className='d-flex' style={{alignItems:"center", justifyContent:"space-between"}} >
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search (Atleast 3 characters)" 
          value={search}
          onChange={handleSearchChange} 
        />
      </div>
        <Button variant="primary">Print</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Patient No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Department</th>
            <th>Doctor</th>
            <th>Visit Type</th>
          
            <th>Day</th>
            <th>Scheme</th>
            <th>Queue</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {appointments
    .filter((appointment) => 
    
      (appointment.firstName.toLowerCase().includes(search.toLowerCase())) || 
      (appointment.newPatientVisitId.toString().includes(search))
    )
    .map((appointment, index) => (
      <tr key={index}>
        <td>{appointment.visitDate}</td>
        <td>{appointment.visitTime}</td>
        <td>{appointment.newPatientVisitId}</td>
        <td>{appointment.firstName} {appointment.middleName} {appointment.lastName}</td>
        <td>{appointment.phoneNumber}</td>
        <td>{appointment.age} / {appointment.gender}</td>
        <td>{appointment?.patientQueue?.department}</td>
        <td>{appointment?.employeeDTO?.salutation} {appointment?.employeeDTO?.firstName} {appointment?.employeeDTO?.lastName}</td>
        <td>{appointment.visitType}</td>
       
        <td>{appointment.day}</td>
        <td>{appointment.scheme}</td>
        <td>{appointment?.patientQueue?.patientQueueId}</td>
        <td>
          <Button variant="primary" size="sm">refer</Button>{' '}
          <Button variant="primary" size="sm">followup</Button>{' '}
          <Button variant="primary" size="sm">sticker</Button>
        </td>
      </tr>
    ))}
</tbody>

      </Table>
    </div>
  );
};

export default ListVisited;
