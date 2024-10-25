/* Mohini_EmergencyCodeResponse_EmergencyCodeResponseForm_10/10/24 */
import React, { useState, useEffect } from 'react';
import './EmergencyCodeResponseForm.css';

const EmergencyCodeResponseForm = () => {
    const [formData, setFormData] = useState({
        codeType: '',
        dateTime: '',
        location: '',
        reportedBy: '',
        description: '',
        responseTeam: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // To control the visibility of the popup

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all mandatory fields are filled
        if (!formData.codeType || !formData.location || !formData.dateTime || !formData.reportedBy || !formData.responseTeam) {
            setSuccessMessage("⚠️ Please fill all the mandatory fields.");
        } else {
            // Display custom success message
            setSuccessMessage(
                `🚨 Emergency Code "${formData.codeType}" reported by ${formData.reportedBy} at ${formData.location}. 🕒 Date/Time: ${formData.dateTime}. 📅\nResponse Team: ${formData.responseTeam} 🛡️`
            );
            setShowPopup(true); // Show the popup on form submission
            console.log("Form Data Submitted: ", formData);
        }
    };

    // Hide the popup automatically after 3 seconds
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000); // 3 seconds delay

            return () => clearTimeout(timer); // Cleanup timer on component unmount or re-render
        }
    }, [showPopup]);

    return (
        <div>
            <form className="emergency-code-response" onSubmit={handleSubmit}>
                <div className="emergency-code-response-left">
                    {/* Left Side Inputs */}
                    <div className="emergency-code-response-group">
                        <label>Code Type <span className="mandatory">*</span></label>
                        <select
                            name="codeType"
                            value={formData.codeType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Code Type</option>
                            <option value="Code Red">Code Red</option>
                            <option value="Code Blue">Code Blue</option>
                            <option value="Code Yellow">Code Yellow</option>
                            <option value="Code Black">Code Black</option>
                        </select>
                    </div>
                    <div className="emergency-code-response-group">
                        <label>Location <span className="mandatory">*</span></label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            required
                        />
                    </div>
                    <div className="emergency-code-response-group">
                        <label>Date & Time <span className="mandatory">*</span></label>
                        <input
                            type="datetime-local"
                            name="dateTime"
                            value={formData.dateTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="emergency-code-response-right">
                    <div className="emergency-code-response-group">
                        <label>Reported By <span className="mandatory">*</span></label>
                        <input
                            type="text"
                            name="reportedBy"
                            value={formData.reportedBy}
                            onChange={handleInputChange}
                            placeholder="Reported By"
                            required
                        />
                    </div>
                    <div className="emergency-code-response-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                    </div>
                    <div className="emergency-code-response-group">
                        <label>Response Team <span className="mandatory">*</span></label>
                        <input
                            type="text"
                            name="responseTeam"
                            value={formData.responseTeam}
                            onChange={handleInputChange}
                            placeholder="Response Team"
                            required
                        />
                    </div>

                    <button type="submit" className="emergency-code-response-submit-btn">Submit</button>
                </div>
            </form>

            {showPopup && (
                <div className="emergency-cose-custom-popup">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default EmergencyCodeResponseForm;
/* Mohini_EmergencyCodeResponse_EmergencyCodeResponseForm_10/10/24 */
