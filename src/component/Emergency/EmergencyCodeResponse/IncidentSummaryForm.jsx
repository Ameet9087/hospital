/* Mohini_EmergencyCodeResponse_IncidentSummaryForm_10/10/24 */
import React, { useState } from 'react';
import './EmergencyCodeResponseForm.css';

const IncidentSummaryForm = () => {
    const [formData, setFormData] = useState({});

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
                    <label>Code Type <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="codeType"
                        value={formData.codeType}
                        onChange={handleInputChange}
                        placeholder="Code Type"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Follow-Up Actions <span className="mandatory">*</span></label>
                    <textarea
                        name="followUpActions"
                        value={formData.followUpActions}
                        onChange={handleInputChange}
                        placeholder="Follow-Up Actions"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Responsible Department <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="responsibleDepartment"
                        value={formData.responsibleDepartment}
                        onChange={handleInputChange}
                        placeholder="Responsible Department"
                        required
                    />
                </div>
            </div>

            <div className="emergency-code-response-right">
                <div className="emergency-code-response-group">
                    <label>Outcome of Follow-Up </label>
                    <textarea
                        name="outcomeOfFollowUp"
                        value={formData.outcomeOfFollowUp}
                        onChange={handleInputChange}
                        placeholder="Outcome of Follow-Up"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Incident Closed Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="incidentClosedDate"
                        value={formData.incidentClosedDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Supervisor Signature <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="supervisorSignature"
                        value={formData.supervisorSignature}
                        onChange={handleInputChange}
                        placeholder="Supervisor Signature"
                        required
                    />
                </div>

                <button type="submit" className="emergency-code-response-submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default IncidentSummaryForm;
/* Mohini_EmergencyCodeResponse_IncidentSummaryForm_10/10/24 */