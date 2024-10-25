import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './LabourEmergencyHandling.css';
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';


const LabourEmergencyHandling = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [emergencyList, setEmergencyList] = useState([]);
    const [newEmergency, setNewEmergency] = useState({
        emergencyId: null, // Add this to distinguish between adding and editing
        patientId: '',
        emergencyType: '',
        bloodBankRequestId: '',
        cSectionRequired: false,
        emergencyStartTime: '',
        emergencyNotes: '',
        emergencyEndTime: ''
    });

    const [showAddEmergencyModal, setShowAddEmergencyModal] = useState(false);

    // Fetch emergency data from API
    const fetchEmergencyData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/emergency-handling'); // Adjust the URL to your API endpoint
            setEmergencyList(response.data); // Set the state with the fetched data
        } catch (error) {
            console.error('Error fetching emergency data:', error);
        }
    };

    useEffect(() => {
        fetchEmergencyData(); // Fetch data when the component mounts
    }, []);

    const handleAddEmergency = async () => {
        try {
            // Check if we are editing an existing emergency
            if (newEmergency.emergencyId) {
                // Update existing emergency
                const response = await axios.put(`http://localhost:8080/api/emergency-handling/${newEmergency.emergencyId}`, newEmergency);
                setEmergencyList(emergencyList.map(emergency => (emergency.emergencyId === newEmergency.emergencyId ? response.data : emergency)));
            } else {
                // Add new emergency
                const response = await axios.post('http://localhost:8080/api/emergency-handling', newEmergency);
                setEmergencyList([...emergencyList, response.data]);
            }
            // Reset the form
            setNewEmergency({ emergencyId: null, patientId: '', emergencyType: '', bloodBankRequestId: '', cSectionRequired: false, emergencyStartTime: '', emergencyNotes: '', emergencyEndTime: '' });
            setShowAddEmergencyModal(false);
        } catch (error) {
            console.error('Error saving emergency data:', error);
        }
    };

    const handleEditEmergency = (emergency) => {
        setNewEmergency(emergency);
        setShowAddEmergencyModal(true);
    };

    return (
        <div className="labour-emergency-handling">
            <button className='leh-btn' onClick={() => setShowAddEmergencyModal(true)}>Add Emergency</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Emergency ID",
                            "Patient ID",
                            "Emergency Type",
                            "Blood Bank Request ID",
                            "C-Section Required",
                            "Emergency Start Time",
                            "Emergency End Time",
                            "Emergency Notes",
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
                    {emergencyList.map((emergency, index) => (
                        <tr key={index}>
                            <td>{emergency.emergencyId}</td>
                            <td>{emergency.patientId}</td>
                            <td>{emergency.emergencyType}</td>
                            <td>{emergency.bloodBankRequestId || 'N/A'}</td>
                            <td>{emergency.cSectionRequired ? 'Yes' : 'No'}</td>
                            <td>{emergency.emergencyStartTime}</td>
                            <td>{emergency.emergencyEndTime}</td>
                            <td>{emergency.emergencyNotes}</td>
                            <td>
                                <button className='leh-edit-btn' onClick={() => handleEditEmergency(emergency)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddEmergencyModal && (
                <div className="leh-modal" onClick={() => setShowAddEmergencyModal(false)}>
                    <div className="leh-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{newEmergency.emergencyId ? 'Edit Emergency' : 'Add New Emergency'}</h4>
                        <div className='leh-formmodal'>
                            <label>Patient ID:</label>
                            <input
                                type="number"
                                value={newEmergency.patientId}
                                onChange={(e) => setNewEmergency({ ...newEmergency, patientId: e.target.value })}
                            />
                        </div>
                        <div className='leh-formmodal'>
                            <label>Emergency Type:</label>
                            <input
                                type="text"
                                value={newEmergency.emergencyType}
                                onChange={(e) => setNewEmergency({ ...newEmergency, emergencyType: e.target.value })}
                            />
                        </div>
                        <div className='leh-formmodal'>
                            <label>Blood Bank Request ID:</label>
                            <input
                                type="number"
                                value={newEmergency.bloodBankRequestId || ''}
                                onChange={(e) => setNewEmergency({ ...newEmergency, bloodBankRequestId: e.target.value })}
                            />
                        </div>
                        <div className='leh-formmodal'>
                            <label>C-Section Required:</label>
                            <input
                                type="checkbox"
                                checked={newEmergency.cSectionRequired}
                                onChange={(e) => setNewEmergency({ ...newEmergency, cSectionRequired: e.target.checked })}
                            />
                        </div>
                        <div className='leh-formmodal'>
                            <label>Emergency Start Time:</label>
                            <input
                                type="time"
                                value={newEmergency.emergencyStartTime}
                                onChange={(e) => setNewEmergency({ ...newEmergency, emergencyStartTime: e.target.value })}
                            />
                        </div>
                        <div className='leh-formmodal'>
                            <label>Emergency End Time:</label>
                            <input
                                type="time"
                                value={newEmergency.emergencyEndTime}
                                onChange={(e) => setNewEmergency({ ...newEmergency, emergencyEndTime: e.target.value })}
                            />
                        </div>
                        <div className='leh-formmodal'>
                            <label>Emergency Notes:</label>
                            <textarea
                                value={newEmergency.emergencyNotes}
                                onChange={(e) => setNewEmergency({ ...newEmergency, emergencyNotes: e.target.value })}
                            />
                        </div>
                        <button className='leh-modalbtn' onClick={handleAddEmergency}>Save</button>
                        <button className='leh-modalbtn' onClick={() => setShowAddEmergencyModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabourEmergencyHandling;
