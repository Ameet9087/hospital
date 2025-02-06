import React, { useState, useEffect, useRef } from 'react';
import './PhysiotherapySessionList.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';

const PhysiotherapySession = () => {
    const [sessions, setSessions] = useState([]);
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch('http://localhost:1415/api/physiotherapy/sessions');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSessions(data); // Assuming the API returns a JSON array of sessions
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:1415/api/physiotherapy/sessions/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Remove the deleted session from state
                setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
            } else {
                console.error('Error deleting session:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    const handleSelect = (session) => {
        // Handle session selection for editing
        console.log('Selected session for editing:', session);
        // You might want to open a form or modal to edit the session
    };

    return (
        <div className="physiotherapy-session-list">
            
            <h1>Physiotherapy Sessions</h1>
            <div className='physiotherapy-tab'>
                <div className="table-container">
                    <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Patient Name", "Physiotherapist Name", "Date", "Status", "Actions"].map((header, index) => (
                                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
                            {sessions.length > 0 ? (
                                sessions.map((session) => (
                                    <tr key={session.id}>
                                        <td>{session.patientName}</td>
                                        <td>{session.physiotherapistName}</td>
                                        <td>{session.sessionDate}</td>
                                        <td>{session.status}</td>
                                        <td>
                                            <button className='physiotherapy-session-list-edit' onClick={() => handleSelect(session)}>Edit</button>
                                            <button className='physiotherapy-session-list-edit' onClick={() => handleDelete(session.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className='physiotherapy-session-no-row' colSpan="5">No sessions available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PhysiotherapySession;
