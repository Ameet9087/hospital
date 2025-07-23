import React, { useState, useEffect } from 'react';
import './BookingAppointment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios if you are using it

const BookingAppointment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('http://192.168.1.34:1415/api/appointments/fetch-all-appointment');
        setPatients(response.data);
      } catch (error) {
        setError('Failed to fetch patient data.');
        console.error('Error fetching patient data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    Object.values(patient).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleNewPatient = () => {
    navigate('/add-new-appointment');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-appointment">
      <button className="new-patient-btn" onClick={handleNewPatient}>+ New Patient</button>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search (Minimum 3 Characters)"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-btn">🔍</button>
      </div>
      <div className="results-info">
        <span>Showing {filteredPatients.length} / {patients.length} results</span>
        <button className="print-btn">Print</button>
      </div>
      <table>
        <thead>
          <tr>
            {/* <th>Hospital Number</th> */}
            <th>Patient Name</th>
            <th>Age/Sex</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={index}>
              {/* <td>{patient.hospitalNumber}</td> */}
              <td>{patient.firstName}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
              <td>{patient.contactNumber}</td>
              <td>
                <button className="create-appointment-btn" onClick={handleNewPatient}>Create Appointment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>1 to 20 of 200</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 1 of 10</span>
        <button>Next</button>
        <button>Last</button>
      </div>
    </div>
  );
};

export default BookingAppointment;
