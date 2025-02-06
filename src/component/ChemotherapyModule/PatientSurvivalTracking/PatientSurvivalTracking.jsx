import React, { useState, useRef } from 'react';
import './PatientSurvivalTracking.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const PatientSurvivalTracking = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        initialDiagnosisDate: '',
        treatmentPlan: '',
        followUpDates: '',
        survivalStatus: '',
        recurrenceDetails: '',
        qualityOfLife: '',
        followUpAppointments: '',
        attendingOncologist: '',
        longTermCarePlan: '',
        comments: '',
    });

    const [records, setRecords] = useState([]); // State to hold the submitted records
    const [isFormVisible, setIsFormVisible] = useState(false); // State to track form visibility

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the new formData to the records array
        setRecords([...records, formData]);
        console.log("Form Data Submitted: ", formData);
        // Reset form data after submission
        setFormData({
            patientId: '',
            patientName: '',
            initialDiagnosisDate: '',
            treatmentPlan: '',
            followUpDates: '',
            survivalStatus: '',
            recurrenceDetails: '',
            qualityOfLife: '',
            followUpAppointments: '',
            attendingOncologist: '',
            longTermCarePlan: '',
            comments: '',
        });
        setIsFormVisible(false); // Hide the form after submission
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible); // Toggle form visibility
    };

    return (
        <div className="patient-survival-tracking-container">
            {!isFormVisible ? (
                <>
                    <button className="patient-survival-tracking-submit-btn" type="button" onClick={toggleFormVisibility}>
                        Add Patient Details
                    </button>
                    <div className="table-container">
                        <table ref={tableRef}>
                            <thead>
                                <tr>
                                    {["Patient ID", "Patient Name", "Initial Diagnosis Date", "Treatment Plan", "Follow-Up Dates", "Survival Status", "Recurrence Details", "Quality of Life", "Follow-Up Appointments", "Attending Oncologist", "Long Term Care Plan", "Comments"].map((header, index) => (
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
                                        <td>{record.initialDiagnosisDate}</td>
                                        <td>{record.treatmentPlan}</td>
                                        <td>{record.followUpDates}</td>
                                        <td>{record.survivalStatus}</td>
                                        <td>{record.recurrenceDetails}</td>
                                        <td>{record.qualityOfLife}</td>
                                        <td>{record.followUpAppointments}</td>
                                        <td>{record.attendingOncologist}</td>
                                        <td>{record.longTermCarePlan}</td>
                                        <td>{record.comments}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <form className="patient-survival-tracking" onSubmit={handleSubmit}>
                    <div className="patient-survival-tracking-left">
                        {/* Left Side Inputs */}
                        <h3>Patient Details</h3>
                        <div className="patient-survival-tracking-group">
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
                        <div className="patient-survival-tracking-group">
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
                        <div className="patient-survival-tracking-group">
                            <label>Initial Diagnosis Date <span className="mandatory">*</span></label>
                            <input
                                type="date"
                                name="initialDiagnosisDate"
                                value={formData.initialDiagnosisDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <h3>Treatment Plan</h3>
                        <div className="patient-survival-tracking-group">
                            <label>Treatment Plan <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="treatmentPlan"
                                value={formData.treatmentPlan}
                                onChange={handleInputChange}
                                placeholder="Treatment Plan"
                                required
                            />
                        </div>
                        <div className="patient-survival-tracking-group">
                            <label>Follow-Up Dates <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="followUpDates"
                                value={formData.followUpDates}
                                onChange={handleInputChange}
                                placeholder="Follow-Up Dates"
                                required
                            />
                        </div>
                        <div className="patient-survival-tracking-group">
                            <label>Survival Status <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="survivalStatus"
                                value={formData.survivalStatus}
                                onChange={handleInputChange}
                                placeholder="Survival Status"
                                required
                            />
                        </div>
                        <div className="patient-survival-tracking-group">
                            <label>Recurrence Details</label>
                            <input
                                type="text"
                                name="recurrenceDetails"
                                value={formData.recurrenceDetails}
                                onChange={handleInputChange}
                                placeholder="Recurrence Details"
                            />
                        </div>
                    </div>
                    <div className="patient-survival-tracking-right">
                        <div className="patient-survival-tracking-group">
                            <label>Quality of Life</label>
                            <input
                                type="text"
                                name="qualityOfLife"
                                value={formData.qualityOfLife}
                                onChange={handleInputChange}
                                placeholder="Quality of Life"
                            />
                        </div>
                        <div className="patient-survival-tracking-group">
                            <label>Attending Oncologist</label>
                            <input
                                type="text"
                                name="attendingOncologist"
                                value={formData.attendingOncologist}
                                onChange={handleInputChange}
                                placeholder="Attending Oncologist"
                            />
                        </div>
                        <div className="patient-survival-tracking-group">
                            <label>Long Term Care Plan</label>
                            <input
                                type="text"
                                name="longTermCarePlan"
                                value={formData.longTermCarePlan}
                                onChange={handleInputChange}
                                placeholder="Long Term Care Plan"
                            />
                        </div>
                        <div className="patient-survival-tracking-group">
                            <label>Comments</label>
                            <textarea
                                name="comments"
                                value={formData.comments}
                                onChange={handleInputChange}
                                placeholder="Comments"
                            />
                        </div>
                        <div className="patient-survival-tracking-group">
                            <label>Follow-Up Appointments</label>
                            <input
                                type="text"
                                name="followUpAppointments"
                                value={formData.followUpAppointments}
                                onChange={handleInputChange}
                                placeholder="Follow-Up Appointments"
                            />
                        </div>
                        <div className='patient-survival-tracking-button'>
                            <button type="submit" className="patient-survival-tracking-submit-btn">Submit</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default PatientSurvivalTracking;
