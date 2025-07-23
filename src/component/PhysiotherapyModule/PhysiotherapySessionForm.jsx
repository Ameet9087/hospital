import React, { useState } from "react";
import axios from "axios"; // Import axios
import './PhysiotherapySessionForm.css';


const PhysiotherapySessionForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        patientName: '',
        physiotherapistName: '',
        sessionDate: '',
        treatmentDescription: '',
        status: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to save the session
            const response = await axios.post('http://localhost:1415/api/physiotherapy/sessions', formData);
            console.log('Session saved:', response.data);

            // Call the onSubmit prop if necessary
            if (onSubmit) {
                onSubmit(response.data); // Pass the saved session data to the parent component
            }

            // Reset form data
            setFormData({
                patientName: '',
                physiotherapistName: '',
                sessionDate: '',
                treatmentDescription: '',
                status: ''
            });
        } catch (error) {
            console.error('Error saving session:', error);
            // Handle error appropriately (e.g., show a notification)
        }
    };

    return (
        <form className="physiotherapy-session-form" onSubmit={handleSubmit}>
            {/* Left Section */}
            <div className="physiotherapy-session-form-left">
                <div className="physiotherapy-form-group">
                    <label className="physiotherapy-label">
                        Patient Name<span className="mandatory">*</span>
                    </label>
                    <input
                        type="text"
                        name="patientName"
                        className="physiotherapy-input"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="physiotherapy-form-group">
                    <label className="physiotherapy-label">
                        Session Date<span className="mandatory">*</span>
                    </label>
                    <input
                        type="date"
                        name="sessionDate"
                        className="physiotherapy-input"
                        value={formData.sessionDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            
            {/* Right Section */}
            <div className="physiotherapy-session-form-right">
                <div className="physiotherapy-form-group">
                    <label className="physiotherapy-label">
                        Physiotherapist Name<span className="mandatory">*</span>
                    </label>
                    <input
                        type="text"
                        name="physiotherapistName"
                        className="physiotherapy-input"
                        value={formData.physiotherapistName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="physiotherapy-form-group">
                    <label className="physiotherapy-label">
                        Treatment Description
                    </label>
                    <textarea
                        name="treatmentDescription"
                        className="physiotherapy-textarea"
                        value={formData.treatmentDescription}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="physiotherapy-form-group">
                    <label className="physiotherapy-label">
                        Status<span className="mandatory">*</span>
                    </label>
                    <select
                        name="status"
                        className="physiotherapy-select"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <button type="submit" className="physiotherapy-submit-btn">Save Session</button>
            </div>
        </form>
    );
};

export default PhysiotherapySessionForm;
