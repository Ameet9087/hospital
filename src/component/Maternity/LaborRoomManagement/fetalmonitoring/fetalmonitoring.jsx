import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './FetalMonitoringManagement.css'; 
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';

const FetalMonitoringManagement = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [monitoringList, setMonitoringList] = useState([]);
    const [newMonitoring, setNewMonitoring] = useState({
        fetalMonitoringId: '', fetalHeartRate: '', contractionIntensity: '', monitoringNotes: '', emergencyResponse: false, monitoringStartTime: '', monitoringEndTime: '', patientId: ''
    });

    const [showAddMonitoringModal, setShowAddMonitoringModal] = useState(false);

    // Fetch monitoring data from API
    const fetchMonitoringData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/fetal-monitoring`); // Adjust the URL to your API endpoint
            setMonitoringList(response.data); // Set the state with the fetched data
        } catch (error) {
            console.error('Error fetching fetal monitoring data:', error);
        }
    };

    useEffect(() => {
        fetchMonitoringData(); // Fetch data when the component mounts
    }, []);

    const handleAddMonitoring = async () => {
        try {
            if (newMonitoring.fetalMonitoringId) {
                // Update existing monitoring
                const response = await axios.put(`${API_BASE_URL}/fetal-monitoring/${newMonitoring.fetalMonitoringId}`, newMonitoring);
                const updatedMonitoring = response.data;
                setMonitoringList(monitoringList.map(monitoring => (monitoring.fetalMonitoringId === updatedMonitoring.fetalMonitoringId ? updatedMonitoring : monitoring)));
            } else {
                // Add new monitoring
                const response = await axios.post(`${API_BASE_URL}/fetal-monitoring`, newMonitoring);
                const createdMonitoring = response.data;
                setMonitoringList([...monitoringList, createdMonitoring]);
            }
            // Reset the form
            setNewMonitoring({ fetalMonitoringId: '', fetalHeartRate: '', contractionIntensity: '', monitoringNotes: '', emergencyResponse: false, monitoringStartTime: '', monitoringEndTime: '', patientId: '' });
            setShowAddMonitoringModal(false);
        } catch (error) {
            console.error('Error saving fetal monitoring data:', error);
        }
    };

    const handleEditMonitoring = (monitoring) => {
        setNewMonitoring({
            fetalMonitoringId: monitoring.fetalMonitoringId,
            fetalHeartRate: monitoring.fetalHeartRate,
            monitoringStartTime: monitoring.monitoringStartTime,
            monitoringEndTime: monitoring.monitoringEndTime,
            monitoringNotes: monitoring.monitoringNotes,
            emergencyResponse: monitoring.emergencyResponse,
            patientId: monitoring.patientId,
        });
        setShowAddMonitoringModal(true); 
    };

    return (
        <div className="fetal-monitoring">
            <button className='fetal-monitoring-btn' onClick={() => setShowAddMonitoringModal(true)}>Add Monitoring</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Monitoring ID",
                            "Fetal Heart Rate",
                            "Monitoring Start Time",
                            "Monitoring End Time",
                            "Monitoring Notes",
                            "Patient ID",
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
                    {monitoringList.map((monitoring, index) => (
                        <tr key={index}>
                            <td>{monitoring.fetalMonitoringId}</td>
                            <td>{monitoring.fetalHeartRate} bpm</td>
                            <td>{monitoring.monitoringStartTime}</td>
                            <td>{monitoring.monitoringEndTime}</td>
                            <td>{monitoring.monitoringNotes}</td>
                            <td>{monitoring.patientId}</td>
                            <td>
                                <button className='fetal-monitoring-edit-btn' onClick={() => handleEditMonitoring(monitoring)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddMonitoringModal && (
                <div className="fetal-monitoring-modal" onClick={() => setShowAddMonitoringModal(false)}>
                    <div className="fetal-monitoring-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{newMonitoring.fetalMonitoringId ? 'Edit Monitoring' : 'Add New Monitoring'}</h4>
                        <div className='fetal-monitoring-modalform'>
                            <label>Fetal Heart Rate:</label>
                            <input
                                type="text"
                                value={newMonitoring.fetalHeartRate}
                                onChange={(e) => setNewMonitoring({ ...newMonitoring, fetalHeartRate: e.target.value })}
                            />
                        </div>
                        <div className='fetal-monitoring-modalform'>
                            <label>Monitoring Start Time:</label>
                            <input
                                type="time"
                                value={newMonitoring.monitoringStartTime}
                                onChange={(e) => setNewMonitoring({ ...newMonitoring, monitoringStartTime: e.target.value })}
                            />
                        </div>
                        <div className='fetal-monitoring-modalform'>
                            <label>Monitoring End Time:</label>
                            <input
                                type="time"
                                value={newMonitoring.monitoringEndTime}
                                onChange={(e) => setNewMonitoring({ ...newMonitoring, monitoringEndTime: e.target.value })}
                            />
                        </div>
                        <div className='fetal-monitoring-modalform'>
                            <label>Monitoring Notes:</label>
                            <textarea
                                value={newMonitoring.monitoringNotes}
                                onChange={(e) => setNewMonitoring({ ...newMonitoring, monitoringNotes: e.target.value })}
                            />
                        </div>
                        <div className='fetal-monitoring-modalform'>
                            <label>Patient ID:</label>
                            <input
                                type="text"
                                value={newMonitoring.patientId}
                                onChange={(e) => setNewMonitoring({ ...newMonitoring, patientId: e.target.value })}
                            />
                        </div>
                        <div className='fetal-monitoring-modalform'>
                            <label>Emergency Response:</label>
                            <input
                                type="checkbox"
                                checked={newMonitoring.emergencyResponse}
                                onChange={(e) => setNewMonitoring({ ...newMonitoring, emergencyResponse: e.target.checked })}
                            />
                        </div>
                        <button className='fetal-monitoring-modalbtn' onClick={handleAddMonitoring}>Save</button>
                        <button className='fetal-monitoring-modalbtn' onClick={() => setShowAddMonitoringModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FetalMonitoringManagement;
