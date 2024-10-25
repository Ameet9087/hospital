/* PatientQueue_Mohini_4/9/2024/ */

// Ajhar Tamboli 09-10-2024 PatientQueue.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientQueue.css';
import PatientQueueDisplay from '../PatientQueueDisplay/patientQueueDisplay';
import QueuePrioritization from '../Queue Prioritization/queuePrioritization';
import RealTimeQueueMonitoring from '../real-TimeQueueMonitoring/real-TimeQueueMonitoring';
import ServiceTimeTracking from '../ServiceTimeTracking/serviceTimeTracking';
import PatientNotification from '../PatientNotification/patientNotification';
const PatientQueue = () => {
  const [data, setData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [doctors, setDoctors] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeComponent, setActiveComponent] = useState('patientQueue');

  useEffect(() => {
    fetch('http://localhost:1415/api/queues/employee/role')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const formattedDoctors = data.map((doctor) => ({
          id: doctor.employeeId,
          name: `${doctor.salutation} ${doctor.firstName} ${doctor.lastName}`,
        }));
        setDoctors(formattedDoctors);
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);

  const handleLoadData = () => {
    if (selectedDoctor) {
      const selectedDoctorId = selectedDoctor;
      if (selectedDoctorId) {
        fetch(`http://localhost:1415/api/queues/employee/${selectedDoctorId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setData(data);
            setShowTable(true);
          })
          .catch((error) => console.error('Error fetching patient data:', error));
      }
    } else {
      setShowTable(false);
    }
  };

  const filteredData = data.filter((row) =>
    (selectedStatus === 'all' || row.status === selectedStatus)
  );

  const handleStatusChange = (patientData, newStatus) => {
    const updatedData = {
      ...patientData,
      status: newStatus,
    };

    axios.put(`http://localhost:1415/api/queues/update/${patientData.patientQueueId}`, updatedData)
      .then((response) => {
        console.log('Data updated successfully', response.data);
        setData((prevData) =>
          prevData.map((item) =>
            item.patientQueueId === patientData.patientQueueId ? { ...item, status: newStatus } : item
          )
        );
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const renderContent = () => {
    switch (activeComponent) {
      case 'patientQueue':
        return (
          <>
            <h2 className="queue-management-title">
              <span role="img" aria-label="user">👤</span> Patient Queue List
            </h2>
            <div className="queue-management-form-container">
              <div className="queue-management-form-group">
                <label>Doctor :</label>
                <select
                  className="queue-management-select-doctor"
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
              <div className="queue-management-form-group status-group">
                <label>Status :</label>
                <div className="queue-management-status-options">
                  <input
                    type="radio"
                    id="all"
                    name="status"
                    checked={selectedStatus === 'all'}
                    onChange={() => setSelectedStatus('all')}
                  />
                  <label htmlFor="all">All</label>
                  <input
                    type="radio"
                    id="pending"
                    name="status"
                    checked={selectedStatus === 'pending'}
                    onChange={() => setSelectedStatus('pending')}
                  />
                  <label htmlFor="pending">Pending</label>
                  <input
                    type="radio"
                    id="completed"
                    name="status"
                    checked={selectedStatus === 'completed'}
                    onChange={() => setSelectedStatus('completed')}
                  />
                  <label htmlFor="completed">Completed</label>
                  <input
                    type="radio"
                    id="skipped"
                    name="status"
                    checked={selectedStatus === 'skipped'}
                    onChange={() => setSelectedStatus('skipped')}
                  />
                  <label htmlFor="skipped">Skipped</label>
                </div>
              </div>
              <button
                className="queue-management-load-data-button"
                onClick={handleLoadData}
              >
                Load Data
              </button>
            </div>

            {showTable && (
              <div className="queue-management-table-section">
                <div className="queue-management-search-container">
                  <input type="text" placeholder="Search" />
                  <button className="queue-management-search-button">🔍</button>
                </div>
                <div className="queue-management-results-info">Showing 0/ 0 results</div>

                <div className='queue-management-table-wrapper'>
                  <table className='queue-managemnt-table'>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Doctor</th>
                        <th>Visit Type</th>
                        <th>Appt. Type</th>
                        <th>Queue No.</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length === 0 ? (
                        <tr>
                          <td colSpan="11" className="queue-management-no-data">No Rows To Show</td>
                        </tr>
                      ) : (
                        filteredData.map((row, index) => (
                          <tr key={index}>
                            <td>{row.date}</td>
                            <td>{row.name}</td>
                            <td>{row.phone}</td>
                            <td>{row.ageSex}</td>
                            <td>{row.department}</td>
                            <td>{`${row.newPatientVisitDTO?.employeeDTO?.salutation} ${row.newPatientVisitDTO?.employeeDTO?.firstName} ${row.newPatientVisitDTO?.employeeDTO?.lastName}`}</td>
                            <td>{row.visitType}</td>
                            <td>{row.appointmentType}</td>
                            <td>{row.queueNumber}</td>
                            <td>{row.status}</td>
                            <td>
                              <button className="que-complete-button" onClick={() => handleStatusChange(row, 'completed')}>Complete</button>
                              <button className="que-skipped-button" onClick={() => handleStatusChange(row, 'skipped')}>Skipped</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        );
      case 'patientQueueDisplay':
        return <PatientQueueDisplay />;
      case 'QueuePrioritization':
        return <QueuePrioritization />;
      case 'RealTimeQueueMonitoring':
        return <RealTimeQueueMonitoring />;
      case 'ServiceTimeTracking':
        return <ServiceTimeTracking />;
      case 'PatientNotification':
        return <PatientNotification />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <div className="patient-queue-management-container">
      <div className='patient-queue-management-header'>
        <header className="queue-management-header">
          <button className="queue-management-header-button" onClick={() => setActiveComponent('patientQueue')}>OPD</button>
          <button className="queue-management-header-button" onClick={() => setActiveComponent('patientQueueDisplay')}>Patient Queue Display</button>
          <button className="queue-management-header-button" onClick={() => setActiveComponent('QueuePrioritization')}>Queue Prioritization</button>
          <button className="queue-management-header-button" onClick={() => setActiveComponent('RealTimeQueueMonitoring')}>Real-Time Queue Monitoring</button>
          <button className="queue-management-header-button" onClick={() => setActiveComponent('ServiceTimeTracking')}>Service Time Tracking</button>
          <button className="queue-management-header-button" onClick={() => setActiveComponent('PatientNotification')}>Patient Notification</button>
        </header>
      </div>
      <div className="queue-management-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default PatientQueue;
// Ajhar Tamboli 09-10-2024 PatientQueue.jsx

/* PatientQueue_Mohini_4/9/2024/css*/