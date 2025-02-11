import React, { useState, useRef, useEffect } from 'react';
import './FamilyPlanningSupport.css'; 
import axios from 'axios'; // Import Axios
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const FamilyPlanningSupportManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [sessions, setSessions] = useState([]);
    const [newSession, setNewSession] = useState({
        fpServiceId: '',
        counselingDate: '',
        chosenMethod: '',
        priorContraceptiveHistory: '',
        sideEffectsDiscussed: '',
        patientConsent: false,
        doctorNotes: '',
        nextFollowupDate: '',
        patientId: '' // Initialize patientId
    });
    const [showAddSessionModal, setShowAddSessionModal] = useState(false);

    // Assuming patientId is managed appropriately, replace this with the actual patientId
   // const patientId = 1; // Example of hardcoding patientId for now

    // Fetch family planning sessions for the specific patient from the API
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/family-planning`);
                console.log(response.data); // Log the fetched data to verify it
                if (Array.isArray(response.data)) {
                    setSessions(response.data); // Set the fetched data into state
                } else {
                    console.error('Expected an array of sessions');
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions(); // Call the fetch function
    }, []); // Empty dependency array ensures this runs once on mount

    const handleAddSession = async () => {
        try {
            if (newSession.fpServiceId) {
                // If fpServiceId exists, update (PUT request)
                await axios.put(`${API_BASE_URL}/family-planning/${newSession.fpServiceId}`, {
                    ...newSession,
                });
                setSessions(sessions.map(session => (session.fpServiceId === newSession.fpServiceId ? newSession : session)));
            } else {
                // If no fpServiceId, add new session (POST request)
                const response = await axios.post(`${API_BASE_URL}/family-planning`, {
                    ...newSession,
                   
                });
                setSessions([...sessions, response.data]);
            }

            // Reset form
            setNewSession({
                fpServiceId: '',
                counselingDate: '',
                chosenMethod: '',
                priorContraceptiveHistory: '',
                sideEffectsDiscussed: '',
                patientConsent: false,
                doctorNotes: '',
                nextFollowupDate: '',
                patientId: '' // Reset patientId
            });
            setShowAddSessionModal(false);

        } catch (error) {
            console.error('Error adding/updating session:', error);
        }
    };

    const handleEditSession = (session) => {
        setNewSession({
            fpServiceId: session.fpServiceId,
            counselingDate: session.counselingDate,
            chosenMethod: session.chosenMethod,
            priorContraceptiveHistory: session.priorContraceptiveHistory,
            sideEffectsDiscussed: session.sideEffectsDiscussed,
            patientConsent: session.patientConsent,
            doctorNotes: session.doctorNotes,
            nextFollowupDate: session.nextFollowupDate,
            patientId: session.patientId // Include patientId for editing
        });
        setShowAddSessionModal(true);
    };

    return (
        <div className="family-planning-support-management">
            <button className='fps-btn' onClick={() => setShowAddSessionModal(true)}>Add Session</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "FP Service ID",
                            "Counseling Date",
                            "Chosen Method",
                            "Prior Contraceptive History",
                            "Side Effects Discussed",
                            "Patient Consent",
                            "Doctor's Notes",
                            "Next Follow-up Date",
                            "Patient ID", // Add header for Patient ID
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
                            <td>{session.fpServiceId}</td>
                            <td>{session.counselingDate}</td>
                            <td>{session.chosenMethod}</td>
                            <td>{session.priorContraceptiveHistory}</td>
                            <td>{session.sideEffectsDiscussed}</td>
                            <td>{session.patientConsent ? 'Yes' : 'No'}</td>
                            <td>{session.doctorNotes}</td>
                            <td>{session.nextFollowupDate}</td>
                            <td>{session.patientId}</td> {/* Display Patient ID */}
                            <td>
                                <button className='fps-edit-btn' onClick={() => handleEditSession(session)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddSessionModal && (
                <div className="fps-modal" onClick={() => setShowAddSessionModal(false)}>
                    <div className="fps-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{newSession.fpServiceId ? 'Edit Session' : 'Add New Session'}</h4>
                        <div className='fps-formmodal'>
                            <label>Patient ID:</label>
                            <input
                                type="text"
                                value={newSession.patientId} // Bind to patientId in state
                                onChange={(e) => setNewSession({ ...newSession, patientId: e.target.value })} // Update patientId in state
                            />
                        </div>
                        <div className='fps-formmodal'>
                            <label>Counseling Date:</label>
                            <input
                                type="date"
                                value={newSession.counselingDate}
                                onChange={(e) => setNewSession({ ...newSession, counselingDate: e.target.value })}/>
                        </div>
                        <div className='fps-formmodal'>
                            <label>Chosen Method:</label>
                            <input
                                type="text"
                                value={newSession.chosenMethod}
                                onChange={(e) => setNewSession({ ...newSession, chosenMethod: e.target.value })}/>
                        </div>
                        <div className='fps-formmodal'>
                            <label>Prior Contraceptive History:</label>
                            <textarea
                                value={newSession.priorContraceptiveHistory}
                                onChange={(e) => setNewSession({ ...newSession, priorContraceptiveHistory: e.target.value })}/>
                        </div>
                        <div className='fps-formmodal'>
                            <label>Side Effects Discussed:</label>
                            <textarea
                                value={newSession.sideEffectsDiscussed}
                                onChange={(e) => setNewSession({ ...newSession, sideEffectsDiscussed: e.target.value })}/>
                        </div>
                        <div className='fps-formmodal'>
                            <label>Patient Consent:</label>
                            <input
                                type="checkbox"
                                checked={newSession.patientConsent}
                                onChange={(e) => setNewSession({ ...newSession, patientConsent: e.target.checked })}/>
                        </div>
                        <div className='fps-formmodal'>
                            <label>Doctor's Notes:</label>
                            <textarea
                                value={newSession.doctorNotes}
                                onChange={(e) => setNewSession({ ...newSession, doctorNotes: e.target.value })}/>
                        </div>
                        <div className='fps-formmodal'>
                            <label>Next Follow-up Date:</label>
                            <input
                                type="date"
                                value={newSession.nextFollowupDate}
                                onChange={(e) => setNewSession({ ...newSession, nextFollowupDate: e.target.value })}/>
                        </div>
                        <button className='fps-modal-button' onClick={handleAddSession}>Save</button>
                        <button className='fps-modal-button' onClick={() => setShowAddSessionModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FamilyPlanningSupportManagement;
