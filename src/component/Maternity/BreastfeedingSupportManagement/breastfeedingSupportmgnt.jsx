import React, { useState, useRef, useEffect } from 'react';
import './BreastfeedingSupport.css'; 
import axios from 'axios'; // Import axios
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const BreastfeedingSupportManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({
        bfSupportId: '', sessionDate: '', latchSuccess: false, lactationConsultant: '', consultantNotes: '', patientId: ''
    });

    const [showAddSessionModal, setShowAddSessionModal] = useState(false);

    // Fetch breastfeeding sessions from API
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/breastfeeding-support`);
                console.log(response.data); // Replace with your API endpoint
                setSessions(response.data); // Assuming the data is in the correct format
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions(); // Call the fetch function when the component mounts
    }, []); // Empty dependency array ensures this runs once on mount

    // POST new session or PUT (update) an existing one
    const handleAddSession = async () => {
        if (newSession.bfSupportId) { 
            // If bfSupportId exists, update the existing session (PUT)
            try {
                await axios.put(`${API_BASE_URL}/breastfeeding-support/${newSession.bfSupportId}`, newSession);
                setSessions(sessions.map(session => (session.bfSupportId === newSession.bfSupportId ? newSession : session)));
            } catch (error) {
                console.error('Error updating session:', error);
            }
        } else { 
            // If no bfSupportId, add a new session (POST)
            try {
                const response = await axios.post(`${API_BASE_URL}/breastfeeding-support`, newSession);
                setSessions([...sessions, { ...response.data }]); // Append new session
            } catch (error) {
                console.error('Error adding session:', error);
            }
        }

        // Reset form
        setNewSession({ bfSupportId: '', sessionDate: '', latchSuccess: false, lactationConsultant: '', consultantNotes: '', patientId: '' });
        setShowAddSessionModal(false);
    };

    const handleEditSession = (session) => {
        setNewSession({
            bfSupportId: session.bfSupportId,
            sessionDate: session.sessionDate,
            latchSuccess: session.latchSuccess,
            lactationConsultant: session.lactationConsultant,
            consultantNotes: session.consultantNotes,
            patientId: session.patientId,
        });
        setShowAddSessionModal(true); 
    };

    return (
        <div className="bfeedingsupport-management">
            <button className='bfeedingsupport-btn' onClick={() => setShowAddSessionModal(true)}>Add Session</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Session ID",
                            "Patient ID", // New column for Patient ID
                            "Session Date",
                            "Latch Success",
                            "Lactation Consultant",
                            "Consultant's Notes",
                            "Actions"
                        ].map((header, index) => (
                            <th
                                key={index}
                                style={{ width: columnWidths[index] }}
                                className="resizable-th"
                            >
                                <div className="header-content">
                                    <span>{header}</span>
                                    <div
                                        className="resizer"
                                        onMouseDown={startResizing(
                                            tableRef,
                                            setColumnWidths
                                        )(index)}
                                    ></div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session, index) => (
                        <tr key={index}>
                            <td>{session.bfSupportId}</td>
                            <td>{session.patientId}</td> {/* Display Patient ID */}
                            <td>{session.sessionDate}</td>
                            <td>{session.latchSuccess ? 'Yes' : 'No'}</td>
                            <td>{session.lactationConsultant}</td>
                            <td>{session.consultantNotes}</td>
                            <td>
                                <button className='bfeedingsupport-edit-btn' onClick={() => handleEditSession(session)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddSessionModal && (
                <div className="bfeedingsupport-modal" onClick={() => setShowAddSessionModal(false)}>
                    <div className="bfeedingsupport-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{newSession.bfSupportId ? 'Edit Session' : 'Add New Session'}</h4>
                        <div className='beastfeeding-modalform'>
                        <label>Session Date:</label>
                        <input
                            type="date"
                            value={newSession.sessionDate}
                            onChange={(e) => setNewSession({ ...newSession, sessionDate: e.target.value })}/>
                        </div>
                        <div className='beastfeeding-modalform'>
                        <label>Patient ID:</label> {/* New input for Patient ID */}
                        <input
                            type="text"
                            value={newSession.patientId}
                            onChange={(e) => setNewSession({ ...newSession, patientId: e.target.value })}/>
                        </div>
                        <div className='beastfeeding-modalform'>
                        <label>Latch Success:</label>
                        <input
                            type="checkbox"
                            checked={newSession.latchSuccess}
                            onChange={(e) => setNewSession({ ...newSession, latchSuccess: e.target.checked })}/>
                        </div>
                        <div className='beastfeeding-modalform'>
                        <label>Lactation Consultant:</label>
                        <input
                            type="text"
                            value={newSession.lactationConsultant}
                            onChange={(e) => setNewSession({ ...newSession, lactationConsultant: e.target.value })}/>
                        </div>
                        <div className='beastfeeding-modalform'>
                        <label>Consultant's Notes:</label>
                        <textarea
                            value={newSession.consultantNotes}
                            onChange={(e) => setNewSession({ ...newSession, consultantNotes: e.target.value })}/>
                        </div>
                        <button onClick={handleAddSession}>Save</button>
                        <button onClick={() => setShowAddSessionModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BreastfeedingSupportManagement;
