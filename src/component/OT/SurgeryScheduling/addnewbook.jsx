import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addnewbook.css'; // Ensure you have this CSS file

const Addnewbook = ({ onAddSurgery }) => {
    if (typeof onAddSurgery !== 'function') {
        console.error('onAddSurgery is not a function');
    }
    
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [newPatient, setNewPatient] = useState({
        name: '',
        otDate: '',
        age: '',
        gender: '',
        diagnosis: '',
        anesthesia: '',
        status: '',
    });

    const [surgeryDetails, setSurgeryDetails] = useState({
        surgeonId: '',
        patientId: '',
        surgeonName: '',
        surgeryType: '',
        scheduledDate: '',
        time: '',
        duration: '',
        otNumber: ''
    });

console.log(selectedPatient)
    // Fetch Patients from API
    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8051/api/bookings');
                setPatients(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    // Handle input change for surgery details
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSurgeryDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Add new patient and post to the API
    const handleAddPatient = async () => {
        try {
            const response = await axios.post('http://localhost:8051/api/bookings', newPatient);
            setPatients([...patients, response.data]); // Update patients state with the newly added patient
            setShowAddPatientModal(false);
            setNewPatient({
                name: '',
                otDate: '',
                age: '',
                gender: '',
                diagnosis: '',
                anesthesia: '',
                status: '',
            });
        } catch (err) {
            console.error('Error adding new patient:', err.message);
        }
    };

    // Handle opening the action modal for surgery details
    const handleOpenActionModal = (patient) => {
        setSelectedPatient(patient);
        setSurgeryDetails({
            ...surgeryDetails,
            patientId: patient.patientId.id ,
            // Assuming patient ID is used here
        });
        setShowActionModal(true);
    };

    // Submit surgery details and post to the API
    const handleSubmitSurgeryDetails = async () => {
        try {
            const surgeryData = {
                ...surgeryDetails,
                operatingTheatreId: parseInt(surgeryDetails.otNumber, 10), 
                bookingID:selectedPatient.id  // Map the OT number to operatingTheatreId
            };
            
            console.log('Surgery details before submission', surgeryData);
            const response = await axios.post('http://localhost:8051/api/surgeries', surgeryData);
            console.log('Surgery details submitted:', response.data);
            
            setShowActionModal(false);
            // Reset form
            setSurgeryDetails({
                surgeonId: '',
                patientId: selectedPatient.patientId.id,
                surgeonName: '',
                surgeryType: '',
                scheduledDate: '',
                scheduledTime: '',
                duration: '',
                otNumber: ''
            });
        } catch (err) {
            console.error('Error submitting surgery details:', err.message);
        }
    };
    

    return (
        <div className="patient-ot-schedule">
            <h1>Patient OT Schedule</h1>
            <button className='otadd-new-schedule-book' onClick={() => setShowAddPatientModal(true)}>Add Patient</button>
            
            {/* Loading and error handling */}
            {loading ? (
                <p>Loading patients...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Otid</th>
                            <th>Patient Name</th>
                            <th>Date</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Diagnosis</th>
                            <th>Anaesthesia</th>
                             <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.id}</td>
                                <td>{patient.patientId.firstName}</td>
                                <td>{patient.otDate}</td>
                                <td>{patient.patientId.age}</td>
                                <td>{patient.patientId.gender}</td>
                                <td>{patient.diagnosis}</td>
                                <td>{patient.anesthesia}</td>
                               <td>{patient.status}</td>
                                <td>
                                    <button onClick={() => handleOpenActionModal(patient)}>Action</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Add Patient Modal */}
            {showAddPatientModal && (
                <div className="ot-addnew-book-modal-overlay" onClick={() => setShowAddPatientModal(false)}>
                    <div className="ot-addnew-book-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h5>Add Patient</h5>
                        <div className='otaddnewbook-modalform'>
                            <label>Name:</label>
                            <input 
                                type="text" 
                                value={newPatient.name} 
                                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} 
                            />
                        </div>
                        
                        <div className='otaddnewbook-modalform'>
                            <label>Date:</label>
                            <input 
                                type="date" 
                                value={newPatient.otDate} 
                                onChange={(e) => setNewPatient({ ...newPatient, otDate: e.target.value })} 
                            />
                        </div>
                        
                        <div className='otaddnewbook-modalform'>
                            <label>Age:</label>
                            <input 
                                type="number" 
                                value={newPatient.age} 
                                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} 
                            />
                        </div>
                        
                        <div className='otaddnewbook-modalform'>
                            <label>Gender:</label>
                            <select 
                                value={newPatient.gender} 
                                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        
                        <div className='otaddnewbook-modalform'>
                            <label>Diagnosis:</label>
                            <input 
                                type="text" 
                                value={newPatient.diagnosis} 
                                onChange={(e) => setNewPatient({ ...newPatient, diagnosis: e.target.value })} 
                            />
                        </div>
                        <div className='otaddnewbook-modalform'>
                            <label>Status:</label>
                            <input 
                                type="text" 
                                value={newPatient.status} 
                                onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })} 
                            />
                        </div>
                        
                        <div className='otaddnewbook-modalform'>
                            <label>Anaesthesia:</label>
                            <select 
                                value={newPatient.anesthesia} 
                                onChange={(e) => setNewPatient({ ...newPatient, anesthesia: e.target.value })}>
                                <option value="General">General</option>
                                <option value="Local">Local</option>
                            </select>
                        </div>
                        
                        <button className='otaddnewbook-modalformbtn' onClick={handleAddPatient}>Save</button>
                        <button className='otaddnewbook-modalformbtn' onClick={() => setShowAddPatientModal(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Action Modal */}
            {showActionModal && selectedPatient && (
    <div className="modal-overlay" onClick={() => setShowActionModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Surgery Details for {selectedPatient.patientId.firstName}</h2>
            <label>surgeonId ID:</label>
            <input 
                type="number" 
                value={surgeryDetails.surgeonId} 
                onChange={(e) => setSurgeryDetails({ ...surgeryDetails, surgeonId: e.target.value })} 
            />
            
            <label>Patient ID:</label>
            <input type="text" value={selectedPatient.patientId.id} readOnly />
            
            <label>Surgeon Name:</label>
            <input 
                type="text" 
                value={surgeryDetails.surgeonName} 
                onChange={handleInputChange} 
                name="surgeonName"
            />
            
            <label>Surgery Type:</label>
            <input 
                type="text" 
                value={surgeryDetails.surgeryType} 
                onChange={handleInputChange} 
                name="surgeryType"
            />
            
            <label>Schedule Date:</label>
            <input 
                type="date" 
                value={surgeryDetails.scheduledDate} 
                onChange={handleInputChange} 
                name="scheduledDate"
            />
            
            <label>Time:</label>
            <input 
                type="time" 
                value={surgeryDetails.scheduledTime} 
                onChange={handleInputChange} 
                name="scheduledTime"
            />
            
            <label>Duration:</label>
            <input 
                type="text" 
                value={surgeryDetails.duration} 
                onChange={handleInputChange} 
                name="duration"
            />
            
            <label>OT Number:</label>
            <input 
                type="number" 
                value={surgeryDetails.otNumber} 
                onChange={handleInputChange} 
                name="otNumber"
            />
            
            <button onClick={handleSubmitSurgeryDetails}>Submit</button>
            <button onClick={() => setShowActionModal(false)}>Close</button>
        </div>
    </div>
)}
        </div>
    );
};

export default Addnewbook;
