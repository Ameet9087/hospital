import React, { useState, useEffect, useRef } from 'react';
import './DispatchForm.css';
import axios from 'axios';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../api/api';

const DispatchForm = () => {
    const [showForm, setShowForm] = useState(false); // Add showForm state
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [emergencyData, setEmergencyData] = useState([]);
    const [formData, setFormData] = useState({
        requestId: '',
        emergencyType: '',
        patientName: '',
        patientLocation: '',
        destination: '',
        ambulanceType: '',
        ambulanceId: '',
        driverName: '',
        driverContactNumber: '',
        dispatchTime: '',
        estimatedArrivalTime: '',
        priorityLevel: '',
        notes: '',
        confirmDispatch: false,
    });

    useEffect(() => {
        // Fetch emergency data to populate the table and select options
        fetch(`${API_BASE_URL}/emergency-requests`)
            .then((response) => response.json())
            .then((data) => setEmergencyData(data))
            .catch((error) => console.error("Error fetching emergency data:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleEmergencySelect = (e) => {
        const emergencyId = e.target.value;
        const selectedEmergency = emergencyData.find((emergency) => emergency.medicalRecordNumber === emergencyId);

        // Populate the form with selected emergency data
        if (selectedEmergency) {
            setFormData({
                ...formData,
                requestId: selectedEmergency.medicalRecordNumber,
                emergencyType: selectedEmergency.emergencyType,
                patientName: selectedEmergency.outSidePatientDTO
                    ? `${selectedEmergency.outSidePatientDTO.firstName} ${selectedEmergency.outSidePatientDTO.lastName}`
                    : 'Unknown Patient',
                patientLocation: selectedEmergency.pickUpLocation,
                destination: selectedEmergency.destinationLocation,
                priorityLevel: selectedEmergency.priorityLevel,
                ambulanceType: selectedEmergency.ambulanceType || '',
                driverName: selectedEmergency.driverName || '',
                driverContactNumber: selectedEmergency.driverContactNumber || '',
                dispatchTime: selectedEmergency.dispatchTime || '',
                estimatedArrivalTime: selectedEmergency.estimatedArrivalTime || '',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            requestId: formData.requestId,
            emergencyType: formData.emergencyType,
            patientLocation: formData.patientLocation,
            destination: formData.destination,
            ambulanceType: formData.ambulanceType,
            driverName: formData.driverName,
            driverContactNumber: formData.driverContactNumber,
            dispatchTime: new Date(`2025-01-25T${formData.dispatchTime}:00`).toISOString(),
            estimatedArrivalTime: new Date(`2025-01-25T${formData.estimatedArrivalTime}:00`).toISOString(),
            priorityLevel: formData.priorityLevel,
            notes: formData.notes,
            confirmDispatch: formData.confirmDispatch.toString(),
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/dispatches`, formattedData);
            console.log("API Response: ", response.data);
            alert("Dispatch submitted successfully.");
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("Error submitting dispatch.");
        }
    };

    return (
        <div className='dispatch-form-module-container'>
            {/* Add Dispatch Button */}
            <button className="dispatch-form-module-com-submit-button" onClick={() => setShowForm(true)}>
                Add Dispatch
            </button>

            {/* Table Displaying Emergency Requests */}
            <div className='table-container'>
                <table ref={tableRef}>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Emergency Type</th>
                            <th>Patient Name</th>
                            <th>Location</th>
                            <th>Destination</th>
                            <th>Priority Level</th>
                        </tr>
                    </thead>

                    <tbody>
                        {emergencyData.map((emergency, index) => (
                            <tr key={index} onClick={() => handleEmergencySelect({ target: { value: emergency.medicalRecordNumber } })}>
                                <td>{emergency.medicalRecordNumber}</td>
                                <td>{emergency.emergencyType}</td>
                                <td>{emergency.outSidePatientDTO ? `${emergency.outSidePatientDTO.firstName} ${emergency.outSidePatientDTO.lastName}` : "Unknown Patient"}</td>
                                <td>{emergency.pickUpLocation}</td>
                                <td>{emergency.destinationLocation}</td>
                                <td>{emergency.priorityLevel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Conditionally render the Dispatch Form */}
            {showForm && (
                <form className="dispatch-form-module-com" onSubmit={handleSubmit}>
                    <div className="dispatch-form-module-com-left">
                        {/* Emergency ID Select Dropdown */}
                        <div className="dispatch-form-module-com-group">
                            <label>Emergency ID <span className="mandatory">*</span></label>
                            <select name="emergencyId" onChange={handleEmergencySelect} required>
                                <option value="">Select Emergency Request</option>
                                {emergencyData.map((emergency) => (
                                    <option key={emergency.medicalRecordNumber} value={emergency.medicalRecordNumber}>
                                        {emergency.medicalRecordNumber}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Left Form Elements */}
                        <div className="dispatch-form-module-com-group">
                            <label>Request ID <span className="mandatory">*</span></label>
                            <input type="text" name="requestId" value={formData.requestId} onChange={handleInputChange} placeholder="Request ID" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Emergency Type <span className="mandatory">*</span></label>
                            <input type="text" name="emergencyType" value={formData.emergencyType} onChange={handleInputChange} placeholder="Emergency Type" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Patient Name <span className="mandatory">*</span></label>
                            <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} placeholder="Patient Name" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Patient Location <span className="mandatory">*</span></label>
                            <input type="text" name="patientLocation" value={formData.patientLocation} onChange={handleInputChange} placeholder="Patient Location" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Destination <span className="mandatory">*</span></label>
                            <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} placeholder="Destination" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Ambulance Type <span className="mandatory">*</span></label>
                            <input type="text" name="ambulanceType" value={formData.ambulanceType} onChange={handleInputChange} placeholder="Ambulance Type" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Driver Name <span className="mandatory">*</span></label>
                            <input type="text" name="driverName" value={formData.driverName} onChange={handleInputChange} placeholder="Driver Name" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Driver Contact Number <span className="mandatory">*</span></label>
                            <input type="text" name="driverContactNumber" value={formData.driverContactNumber} onChange={handleInputChange} placeholder="Driver Contact Number" required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Dispatch Time <span className="mandatory">*</span></label>
                            <input type="time" name="dispatchTime" value={formData.dispatchTime} onChange={handleInputChange} required />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Estimated Arrival Time <span className="mandatory">*</span></label>
                            <input type="time" name="estimatedArrivalTime" value={formData.estimatedArrivalTime} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="dispatch-form-module-com-right">
                        {/* Right Form Elements */}
                        <div className="dispatch-form-module-com-group">
                            <label>Priority Level <span className="mandatory">*</span></label>
                            <select name="priorityLevel" value={formData.priorityLevel} onChange={handleInputChange} required>
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Notes</label>
                            <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Additional Notes" />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Confirm Dispatch <span className="mandatory">*</span></label>
                            <input type="checkbox" name="confirmDispatch" checked={formData.confirmDispatch} onChange={handleInputChange} required />
                        </div>
                        <div className="dispatch-form-submit-container">
                            <button type="submit" className="dispatch-form-module-com-submit-button">Submit</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default DispatchForm;
