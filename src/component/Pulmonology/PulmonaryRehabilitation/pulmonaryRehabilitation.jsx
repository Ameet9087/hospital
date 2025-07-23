import React, { useState, useRef, useEffect } from 'react';
import './PulmonaryRehabilitation.css';
import axios from 'axios';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const PulmonaryRehabilitation = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    sessionId: '', patientId: '', patientName: '', startDate: '', endDate: '', therapistId: ''
  });

  const [showAddSessionModal, setShowAddSessionModal] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Fetch patients from backend when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/patients');
        console.log(response.data);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Fetch sessions from backend when component mounts
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:8052/api/pulmonary-rehabilitations');
        console.log(response.data);
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
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

  const handleAddSession = async () => {
    console.log(newSession.sessionId);
    try {
      if (newSession.sessionId) {
        // If sessionId exists, update the existing session
        const response = await axios.put(`http://localhost:8052/api/pulmonary-rehabilitations/${newSession.sessionId}`, newSession);
        setSessions(sessions.map(session =>
          (session.sessionId === newSession.sessionId ? response.data : session) // Ensure to use the updated data
        ));
      } else {
        // If no sessionId, create a new session
        const response = await axios.post('http://localhost:8052/api/pulmonary-rehabilitations', newSession);
        setSessions([...sessions, response.data]);
      }

      // Reset newSession state
      setNewSession({
        sessionId: '', patientId: '', patientName: '', startDate: '', endDate: '', therapistId: ''
      });
      setShowAddSessionModal(false);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  const handleEditSession = (session) => {
    console.log("session", session)
    // Ensure the session being edited is correctly set
    setNewSession(session);
    setShowAddSessionModal(true);
  };
  const handleDeleteSession = async (sessionId) => {
    if (window.confirm("Are you sure you want to delete this session?")) {
      try {
        await axios.delete(`http://localhost:8052/api/pulmonary-rehabilitations/${sessionId}`);
        setSessions(sessions.filter(session => session.sessionId !== sessionId));
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  const handleAddSessionForPatient = (patient) => {
    setNewSession({
      sessionId: '',
      patientId: patient.patientId,
      patientName: `${patient.firstName} ${patient.lastName}`,
      startDate: '',
      endDate: '',
      therapistId: ''
    });
    setShowAddSessionModal(true);
  };

  return (
    <div className="PulmonaryRehabilitation-container">
      <input
        type="text"
        placeholder="Search Patient by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="PulmonaryRehabilitation-search"
      />
      <button className='PulmonaryRehabilitation-btn' onClick={() => setShowAddSessionModal(true)}>Add Session</button>

      {/* Show patients matching the search query */}
      {filteredPatients.length > 0 && (
        <div className="PulmonaryRehabilitation-patient-table">
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
                    <button onClick={() => handleAddSessionForPatient(patient)}>
                      Add Session
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <table ref={tableRef} className="PulmonaryRehabilitation-table">
        <thead>
          <tr>
            {["Session ID", "Patient ID", "Patient Name", "Start Date", "End Date", "Therapist ID", "Actions"].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, index) => (
            <tr key={index}>
              <td>{session.sessionId}</td>
              <td>{session.patientId}</td>
              <td>{session.patientName}</td>
              <td>{session.startDate}</td>
              <td>{session.endDate}</td>
              <td>{session.therapistId}</td>
              <td>
                <button className='PulmonaryRehabilitation-edit-btn' onClick={() => handleEditSession(session)}>Edit</button>
                <button className='PulmonaryRehabilitation-edit-btn' onClick={() => handleDeleteSession(session.sessionId)}>Delete</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddSessionModal && (
        <div className="PulmonaryRehabilitation-modal" onClick={() => setShowAddSessionModal(false)}>
          <div className="PulmonaryRehabilitation-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{newSession.sessionId ? 'Edit Session' : 'Add New Session'}</h2>
            <div className="PulmonaryRehabilitation-modal-contentform">
              <label>Patient ID:</label>
              <input
                type="text"
                value={newSession.patientId}
                onChange={(e) => setNewSession({ ...newSession, patientId: e.target.value })}
                readOnly
              />
            </div>
            <div className="PulmonaryRehabilitation-modal-contentform">
              <label>Patient Name:</label>
              <input
                type="text"
                value={newSession.patientName}
                onChange={(e) => setNewSession({ ...newSession, patientName: e.target.value })}
                readOnly
              />
            </div>
            <div className="PulmonaryRehabilitation-modal-contentform">
              <label>Start Date:</label>
              <input
                type="date"
                value={newSession.startDate}
                onChange={(e) => setNewSession({ ...newSession, startDate: e.target.value })}
              />
            </div>
            <div className="PulmonaryRehabilitation-modal-contentform">
              <label>End Date:</label>
              <input
                type="date"
                value={newSession.endDate}
                onChange={(e) => setNewSession({ ...newSession, endDate: e.target.value })}
              />
            </div>
            <div className="PulmonaryRehabilitation-modal-contentform">
              <label>Therapist ID:</label>
              <input
                type="text"
                value={newSession.therapistId}
                onChange={(e) => setNewSession({ ...newSession, therapistId: e.target.value })}
              />
            </div>
            <div className='PulmonaryRehabilitation-modal-btn'>
              <button onClick={handleAddSession}>Save</button>
              <button onClick={() => setShowAddSessionModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PulmonaryRehabilitation;
