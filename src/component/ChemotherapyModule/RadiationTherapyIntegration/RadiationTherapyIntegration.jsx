import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './RadiationTherapyIntegration.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const RadiationTherapyIntegration = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        age: '',
        therapyPlan: '',
        therapyType: '',
        radiationDose: '',
        numberOfSessions: '',
        startDate: '',
        endDate: '',
        equipmentUsed: '',
        technicianName: '',
        medicalTeam: '',
        attendingOncologist: '',
        followUpDates: '',
        comments: ''
    });

    const [records, setRecords] = useState([]); // State to hold the submitted records
    const [isFormVisible, setIsFormVisible] = useState(false); // State to track form visibility

    // Fetch existing therapy plans from the API
    useEffect(() => {
        const fetchTherapyPlans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/therapy-plans');
                setRecords(response.data); // Set the records with fetched data
            } catch (error) {
                console.error('Error fetching therapy plans:', error);
            }
        };

        fetchTherapyPlans();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/therapy-plans', formData);
            console.log("Form Data Submitted: ", response.data);

            // Update records with the newly submitted data
            setRecords([...records, response.data]);

            setFormData({ // Reset the form data after submission
                patientId: '',
                patientName: '',
                age: '',
                therapyPlan: '',
                therapyType: '',
                radiationDose: '',
                numberOfSessions: '',
                startDate: '',
                endDate: '',
                equipmentUsed: '',
                technicianName: '',
                medicalTeam: '',
                attendingOncologist: '',
                followUpDates: '',
                comments: ''
            });
            setIsFormVisible(false); // Hide the form after submission
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible); // Toggle form visibility
    };

    return (
        <div className='radiation-therapy-integration-container'>
            {!isFormVisible ? (
                <>
                    <button className='radiation-therapy-integration-submit-btn' type="button" onClick={toggleFormVisibility}>
                        Add Radiation
                    </button>
                    <div className='table-container'>
                        <table ref={tableRef}>
                            <thead>
                                <tr>
                                    {["Patient ID", "Patient Name", "Age", "Therapy Plan", "Therapy Type", "Radiation Dose", "Number of Sessions", "Start Date", "End Date", "Equipment Used", "Technician Name", "Attending Oncologist", "Follow-Up Dates", "Comments"].map((header, index) => (
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
                                {records.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.patientId}</td>
                                        <td>{record.patientName}</td>
                                        <td>{record.age}</td>
                                        <td>{record.therapyPlan}</td>
                                        <td>{record.therapyType}</td>
                                        <td>{record.radiationDose}</td>
                                        <td>{record.numberOfSessions}</td>
                                        <td>{record.startDate}</td>
                                        <td>{record.endDate}</td>
                                        <td>{record.equipmentUsed}</td>
                                        <td>{record.technicianName}</td>
                                        <td>{record.attendingOncologist}</td>
                                        <td>{record.followUpDates}</td>
                                        <td>{record.comments}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <form className="radiation-therapy-integration" onSubmit={handleSubmit}>
                    <div className="radiation-therapy-integration-left">
                        <h3>Patient Details</h3>
                        <div className="radiation-therapy-integration-group">
                            <label>Patient ID <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="patientId"
                                value={formData.patientId}
                                onChange={handleInputChange}
                                placeholder="Patient ID"
                                required
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Patient Name <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                placeholder="Patient Name"
                                required
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Age <span className="mandatory">*</span></label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                required
                            />
                        </div>
                        <h3>Therapy Plan</h3>
                        <div className="radiation-therapy-integration-group">
                            <label>Therapy Plan <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="therapyPlan"
                                value={formData.therapyPlan}
                                onChange={handleInputChange}
                                placeholder="Therapy Plan"
                                required
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Therapy Type <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="therapyType"
                                value={formData.therapyType}
                                onChange={handleInputChange}
                                placeholder="Therapy Type"
                                required
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Radiation Dose <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="radiationDose"
                                value={formData.radiationDose}
                                onChange={handleInputChange}
                                placeholder="Radiation Dose"
                                required
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Number of Sessions <span className="mandatory">*</span></label>
                            <input
                                type="number"
                                name="numberOfSessions"
                                value={formData.numberOfSessions}
                                onChange={handleInputChange}
                                placeholder="Number of Sessions"
                                required
                            />
                        </div>
                        <h3>Session Scheduling</h3>
                        <div className="radiation-therapy-integration-group">
                            <label>Start Date <span className="mandatory">*</span></label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>End Date <span className="mandatory">*</span></label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="radiation-therapy-integration-right">
                        <div className="radiation-therapy-integration-group">
                            <label>Equipment Used</label>
                            <input
                                type="text"
                                name="equipmentUsed"
                                value={formData.equipmentUsed}
                                onChange={handleInputChange}
                                placeholder="Equipment Used"
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Technician Name</label>
                            <input
                                type="text"
                                name="technicianName"
                                value={formData.technicianName}
                                onChange={handleInputChange}
                                placeholder="Technician Name"
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Medical Team</label>
                            <input
                                type="text"
                                name="medicalTeam"
                                value={formData.medicalTeam}
                                onChange={handleInputChange}
                                placeholder="Medical Team"
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Attending Oncologist</label>
                            <input
                                type="text"
                                name="attendingOncologist"
                                value={formData.attendingOncologist}
                                onChange={handleInputChange}
                                placeholder="Attending Oncologist"
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Follow-Up Dates</label>
                            <input
                                type="text"
                                name="followUpDates"
                                value={formData.followUpDates}
                                onChange={handleInputChange}
                                placeholder="Follow-Up Dates"
                            />
                        </div>
                        <div className="radiation-therapy-integration-group">
                            <label>Comments</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleInputChange}
                                placeholder="Comments"
                            />
                        </div>

                        <button type="submit" className='radiation-therapy-integration-submit-btn'>Submit</button>
                        <button type="button" className='radiation-therapy-integration-submit-btn' onClick={toggleFormVisibility}>Cancel</button>
                    </div>

                </form>
            )}
        </div>
    );
};

export default RadiationTherapyIntegration;
