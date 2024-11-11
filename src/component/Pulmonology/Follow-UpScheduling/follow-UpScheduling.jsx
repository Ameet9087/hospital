import React, { useState, useRef, useEffect } from 'react';
import './FollowUpScheduling.css';
import axios from 'axios';

const FollowUpScheduling = () => {
  const tableRef = useRef(null);
  const [appointments, setAppointments] = useState([]); // Store appointment list
  const [newAppointment, setNewAppointment] = useState({
    followUpId: '', patientId: '', patientName: '', appointmentDate: '', doctorId: '', purpose: ''
  });

  const [patients, setPatients] = useState([]); // Store patient list
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered patients based on search

  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);

  // Fetch follow-up appointments from backend
  useEffect(() => {
    const fetchFollowUpAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/follow-ups');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching follow-up appointments:', error);
      }
    };
    fetchFollowUpAppointments();
  }, []);

  // Fetch patients from backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  // Filter patients based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = patients.filter(patient =>
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  }, [searchQuery, patients]);

  const handleAddAppointment = async () => {
    try {
      if (newAppointment.followUpId) {
        // Update existing appointment
        const response = await axios.put(`http://localhost:8052/api/follow-ups/${newAppointment.followUpId}`, newAppointment);
        setAppointments(appointments.map(appt => appt.followUpId === newAppointment.followUpId ? response.data : appt));
      } else {
        // Add new appointment
        const response = await axios.post('http://localhost:8052/api/follow-ups', newAppointment);
        setAppointments([...appointments, response.data]);
      }

      // Reset form and close modal
      setNewAppointment({
        followUpId: '', patientId: '', patientName: '', appointmentDate: '', doctorId: '', purpose: ''
      });
      setShowAddAppointmentModal(false);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  const handleEditAppointment = (appointment) => {
    setNewAppointment(appointment);
    setShowAddAppointmentModal(true);
  };

  const handleDeleteAppointment = async (followUpId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`http://localhost:8052/api/follow-ups/${followUpId}`);
        setAppointments(appointments.filter(appt => appt.followUpId !== followUpId));
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleAddAppointmentForPatient = (patient) => {
    setNewAppointment({
      followUpId: '',
      patientId: patient.patientId,
      patientName: `${patient.firstName} ${patient.lastName}`,
      appointmentDate: '',
      doctorId: '', // Now using doctorId
      purpose: ''
    });
    setShowAddAppointmentModal(true);
  };

  return (
    <div className="followup-scheduling-container">
      {/* Search bar for patients */}
      <input
        type="text"
        placeholder="Search Patient by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="followup-scheduling-search"
      />
      <button className="followup-scheduling-btn" onClick={() => setShowAddAppointmentModal(true)}>Add Appointment</button>

      {/* Display filtered patients based on search */}
      {filteredPatients.length > 0 && (
        <div className="followup-scheduling-patient-table">
          <h3>Patients matching "{searchQuery}":</h3>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.patientId}>
                  <td>{patient.patientId}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    <button onClick={() => handleAddAppointmentForPatient(patient)}>
                      Add Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Table to display all appointments */}
      <table ref={tableRef} className="followup-scheduling-table">
        <thead>
          <tr>
            {["Patient Name", "Appointment Date", "Doctor ID", "Purpose", "Actions"].map((header, index) => (
              <th key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.patientName}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.doctorId}</td> {/* Display doctorId instead of doctorName */}
              <td>{appointment.purpose}</td>
              <td>
                <button className ="followup-scheduling-edit-btn"onClick={() => handleEditAppointment(appointment)}>Edit</button>
                <button className ="followup-scheduling-edit-btn" onClick={() => handleDeleteAppointment(appointment.followUpId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to add or edit appointments */}
      {showAddAppointmentModal && (
        <div className="followup-scheduling-modal" onClick={() => setShowAddAppointmentModal(false)}>
          <div className="followup-scheduling-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{newAppointment.followUpId ? 'Edit Appointment' : 'Add New Appointment'}</h2>
            <div className="followup-scheduling-modal-contentform">
              <label>Patient ID:</label>
              <input
                type="text"
                value={newAppointment.patientId}
                readOnly
              />
            </div>
            <div className="followup-scheduling-modal-contentform">
              <label>Patient Name:</label>
              <input
                type="text"
                value={newAppointment.patientName}
                readOnly
              />
            </div>
            <div className="followup-scheduling-modal-contentform">
              <label>Appointment Date:</label>
              <input
                type="date"
                value={newAppointment.appointmentDate}
                onChange={(e) => setNewAppointment({ ...newAppointment, appointmentDate: e.target.value })}
              />
            </div>
            <div className="followup-scheduling-modal-contentform">
              <label>Doctor ID:</label> {/* Changed to doctorId */}
              <input
                type="number"
                value={newAppointment.doctorId}
                onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
              />
            </div>
            <div className="followup-scheduling-modal-contentform">
              <label>Purpose:</label>
              <input
                type="text"
                value={newAppointment.purpose}
                onChange={(e) => setNewAppointment({ ...newAppointment, purpose: e.target.value })}
              />
            </div>
            <button onClick={handleAddAppointment}>{newAppointment.followUpId ? 'Update Appointment' : 'Add Appointment'}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpScheduling;
