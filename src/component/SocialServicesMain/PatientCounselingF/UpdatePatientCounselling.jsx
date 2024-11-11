import React, { useState, useEffect } from 'react';
import './addPatientCounseling.css';

const UpdatePatientCounselling = ({ onClose, onSubmit, counselingData }) => {
    const [councellingId, setCouncellingId] = useState('');
    const [patientId, setPatientId] = useState('');
    const [councelorName, setCouncelorName] = useState('');
    const [sessionDate, setSessionDate] = useState('');
    const [sessionNotes, setSessionNotes] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [typeOfCounselling, setTypeOfCounselling] = useState('');

    // Populate state with incoming counselingData when it changes
    useEffect(() => {
        if (counselingData) {
            setCouncellingId(counselingData.councellingId || '');
            setPatientId(counselingData.ngoPatient.patientId || '');
            setCouncelorName(counselingData.councelorName || '');
            setSessionDate(counselingData.sessionDate || '');
            setSessionNotes(counselingData.sessionNotes || '');
            setFollowUpDate(counselingData.followUpDate || '');
            setTypeOfCounselling(counselingData.typeOfCounselling || '');
        }
    }, [counselingData]);

    // Handle form submission
    const handleSubmit = () => {
        const formData = {
            councellingId,
            patientId,
            councelorName,
            sessionDate,
            sessionNotes,
            followUpDate,
            typeOfCounselling,
        };
        // Ensure onSubmit is passed as a prop
        if (onSubmit) {
            onSubmit(formData);  // Pass updated data back to the parent component
        }
    };

    return (
        <div className="addPatientCounseling-container">
            <div className="addPatientCounseling-header">
                <h3>Update Patient Counseling</h3>
                <button className="addPatientCounseling-close-btn" onClick={onClose}>x</button>
            </div>

            <div className="addPatientCounseling-form">
                <div className="addPatientCounseling-form-row">
                    <div className="addPatientCounseling-form-group-1row">
                        <div className="addPatientCounseling-form-group">
                            <label>Counseling ID<span>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Counseling ID"
                                value={councellingId}
                                onChange={(e) => setCouncellingId(e.target.value)}
                            />
                        </div>
                        <div className="addPatientCounseling-form-group">
                            <label>Patient ID<span>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Patient ID"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="addPatientCounseling-form-group-1row">
                        <div className="addPatientCounseling-form-group">
                            <label>Counselor Name</label>
                            <input
                                type="text"
                                placeholder="Enter Counselor Name"
                                value={councelorName}
                                onChange={(e) => setCouncelorName(e.target.value)}
                            />
                        </div>
                        <div className="addPatientCounseling-form-group">
                            <label>Session Date<span>*</span></label>
                            <input
                                type="date"
                                value={sessionDate}
                                onChange={(e) => setSessionDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="addPatientCounseling-form-group-1row">
                        <div className="addPatientCounseling-form-group">
                            <label>Session Notes</label>
                            <input
                                type="text"
                                placeholder="Enter Session Notes"
                                value={sessionNotes}
                                onChange={(e) => setSessionNotes(e.target.value)}
                            />
                        </div>
                        <div className="addPatientCounseling-form-group">
                            <label>Follow-up Date<span>*</span></label>
                            <input
                                type="date"
                                value={followUpDate}
                                onChange={(e) => setFollowUpDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="addPatientCounseling-form-group-1row">
                        <div className="addPatientCounseling-form-group">
                            <label>Type of Counseling</label>
                            <input
                                type="text"
                                placeholder="Enter Type of Counseling"
                                value={typeOfCounselling}
                                onChange={(e) => setTypeOfCounselling(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="addPatientCounseling-form-actions">
                <button className="addPatientCounseling-add-btn" onClick={handleSubmit}>Update</button>
            </div>
        </div>
    );
};

export default UpdatePatientCounselling;
