/* Mohini_EmergencyCodeResponse_ResponseLogForm_10/10/24 */
import React, { useState } from 'react';
import './EmergencyCodeResponseForm.css';

const ResponseLogForm = () => {
    const [formData, setFormData] = useState({
        responderNames: '',
        timeOfArrival: '',
        actionsTaken: '',
        medicalEquipment: '',
        outcome: '',
        furtherActionRequired: false,
        comments: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    };

    return (
        
        <form className="emergency-code-response" onSubmit={handleSubmit}>
            <div className="emergency-code-response-left">
                {/* Left Side Inputs */}
                <div className="emergency-code-response-group">
                    <label>Responder Name<span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="responderNames"
                        value={formData.responderNames}
                        onChange={handleInputChange}
                        placeholder="Responder Names"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Time of Arrival <span className="mandatory">*</span></label>
                    <input
                        type="datetime-local"
                        name="timeOfArrival"
                        value={formData.timeOfArrival}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Actions Taken <span className="mandatory">*</span></label>
                    <textarea
                        name="actionsTaken"
                        value={formData.actionsTaken}
                        onChange={handleInputChange}
                        placeholder="Actions Taken"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Medical Equipment Used</label>
                    <textarea
                        name="medicalEquipment"
                        value={formData.medicalEquipment}
                        onChange={handleInputChange}
                        placeholder="Medical Equipment Used"
                    />
                </div>
            </div>

            <div className="emergency-code-response-right">
                <div className="emergency-code-response-group">
                    <label>Outcome <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="outcome"
                        value={formData.outcome}
                        onChange={handleInputChange}
                        placeholder="Outcome"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Further Action Required</label>
                    <input
                        type="checkbox"
                        name="furtherActionRequired"
                        checked={formData.furtherActionRequired}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Comments</label>
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleInputChange}
                        placeholder="Comments"
                    />
                </div>

                <button type="submit" className="emergency-code-response-submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default ResponseLogForm;
/* Mohini_EmergencyCodeResponse_ResponseLogForm_10/10/24 */
