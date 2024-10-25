/* Mohini_EmergencyCodeResponse_EmergencyDrillReportForm_10/10/24 */
import React, { useState } from 'react';
import './EmergencyCodeResponseForm.css';

const EmergencyDrillReportForm = () => {
    const [formData, setFormData] = useState({
        codeTypeTested: '',
        dateTimeOfDrill: '',
        participants: '',
        responseTime: '',
        successCriteria: '',
        drillOutcome: '',
        suggestionsForImprovement: '',
    });

    // Array of participant options
    const participantsOptions = [
        'John Doe',
        'Jane Smith',
        'Michael Brown',
        'Emily Davis',
        'Other' // You can add more participants as needed
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
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
                    <label>Code Type Tested <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="codeTypeTested"
                        value={formData.codeTypeTested}
                        onChange={handleInputChange}
                        placeholder="Code Type Tested"
                        required
                    />
                </div>
               
                <div className="emergency-code-response-group">
                    <label>Date & Time of Drill <span className="mandatory">*</span></label>
                    <input
                        type="datetime-local"
                        name="dateTimeOfDrill"
                        value={formData.dateTimeOfDrill}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div className="emergency-code-response-group">
                    <label>Participants <span className="mandatory">*</span></label>
                    <select
                        name="participants"
                        value={formData.participants}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Participants</option>
                        {participantsOptions.map((participant, index) => (
                            <option key={index} value={participant}>
                                {participant}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="emergency-code-response-right">
                <div className="emergency-code-response-group">
                    <label>Response Time <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="responseTime"
                        value={formData.responseTime}
                        onChange={handleInputChange}
                        placeholder="Response Time"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Success Criteria </label>
                    <input
                        type="text"
                        name="successCriteria"
                        value={formData.successCriteria}
                        onChange={handleInputChange}
                        placeholder="Success Criteria"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Drill Outcome <span className="mandatory">*</span></label>
                    <textarea
                        name="drillOutcome"
                        value={formData.drillOutcome}
                        onChange={handleInputChange}
                        placeholder="Drill Outcome"
                        required
                    />
                </div>

                <div className="emergency-code-response-group">
                    <label>Suggestions for Improvement</label>
                    <textarea
                        name="suggestionsForImprovement"
                        value={formData.suggestionsForImprovement}
                        onChange={handleInputChange}
                        placeholder="Suggestions for Improvement"
                    />
                </div>

                <button type="submit" className="emergency-code-response-submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default EmergencyDrillReportForm;
/* Mohini_EmergencyCodeResponse_EmergencyDrillReportForm_10/10/24 */