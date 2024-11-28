import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientQueue.css';

const PatientQueue = () => {
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeComponent, setActiveComponent] = useState('patientQueue');

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/queues/employee/role`)
      .then((response) => {
        const formattedDoctors = response.data.map((doctor) => ({
          id: doctor.employeeId,
          name: `${doctor.salutation} ${doctor.firstName} ${doctor.lastName}`,
        }));
        setDoctors(formattedDoctors);
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleLoadData = () => {
    if (selectedDoctor) {
      axios
        .get(`${API_BASE_URL}/queues/employee/${selectedDoctor}`)
        .then((response) => {
          setData(response.data);
          setShowTable(true);
        })
        .catch((error) => console.error('Error fetching patient data:', error));
    } else {
      setShowTable(false);
    }
  };

  const filteredData = data.filter(
    (row) => selectedStatus === 'all' || row.status === selectedStatus
  );

  const handleStatusChange = (patientData, newStatus) => {
    const updatedData = { ...patientData, status: newStatus };

    axios
      .put(`${API_BASE_URL}/queues/update/${patientData.patientQueueId}`, updatedData)
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item.patientQueueId === patientData.patientQueueId ? { ...item, status: newStatus } : item
          )
        );
      })
      .catch((error) => console.error('Error updating data:', error));
  };

  return (
    <div className="patient-queue-management-container">
      <header className="queue-management-header">
        <button
          className={`queue-management-header-button ${
            activeComponent === 'patientQueue' ? 'active' : ''
          }`}
          onClick={() => setActiveComponent('patientQueue')}
        >
          OPD
        </button>
        {/* Add other tabs/buttons */}
      </header>
      <div className="queue-management-content">
        {activeComponent === 'patientQueue' && (
          <>
            <h2 className="queue-management-title">Patient Queue List</h2>
            <div className="queue-management-form-container">
              <div className="queue-management-form-group">
                <label>Doctor:</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleLoadData}>Load Data</button>
            </div>

            {showTable && (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="4">No Data</td>
                    </tr>
                  ) : (
                    filteredData.map((row) => (
                      <tr key={row.patientQueueId}>
                        <td>{row.date}</td>
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        <td>
                          <button onClick={() => handleStatusChange(row, 'completed')}>
                            Complete
                          </button>
                          <button onClick={() => handleStatusChange(row, 'skipped')}>
                            Skip
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PatientQueue;
