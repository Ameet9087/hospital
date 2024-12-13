import React, { useState } from 'react';
import './DischargeClearence.css';

const DischargeClearance = () => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [formData, setFormData] = useState({
        ipNo: '',
        uhid: '',
        patientName: '',
        doa: '',
        address: '',
        dischargeSummaryPrepared: false
    });
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPopup(true);
    };

    const handleDelete = () => {
        setFormData({
            ipNo: '',
            uhid: '',
            patientName: '',
            doa: '',
            address: '',
            dischargeSummaryPrepared: false
        });
        setShowDeleteConfirmation(false); // Reset delete confirmation
        setShowPopup(false); // Close popup
        setShowDetails(false); // Hide details
    };
    

    return (
        <div className="discharge-clearance">
            <h2 className="discharge-clearance__title">
                <span 
                    className="discharge-clearance__close-icon" 
                    onClick={handleDelete}
                >
                    ×
                </span>
                Discharge Clearance
            </h2>

            {showDetails && (
                <div className="discharge-clearance__details-popup">
                    <div className="discharge-clearance__details-content">
                        <h3>Patient Details</h3>
                        <p><strong>IP No:</strong> {formData.ipNo}</p>
                        <p><strong>UHID:</strong> {formData.uhid}</p>
                        <p><strong>Patient Name:</strong> {formData.patientName}</p>
                        <p><strong>DOA:</strong> {formData.doa}</p>
                        <p><strong>Address:</strong> {formData.address}</p>
                        <p><strong>Discharge Summary:</strong> {formData.dischargeSummaryPrepared ? 'Prepared' : 'Not Prepared'}</p>
                        <button 
                            className="discharge-clearance__close-button"
                            onClick={() => setShowDetails(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="discharge-clearance__form">
                <div className="discharge-clearance__form-group">
                    <label className="discharge-clearance_label">IP No <span className="discharge-clearance_required">*</span></label>
                    <input
                        className="discharge-clearance__input"
                        type="text"
                        name="ipNo"
                        value={formData.ipNo}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="discharge-clearance__form-group">
                    <label className="discharge-clearance_label">UHID <span className="discharge-clearance_required">*</span></label>
                    <input
                        className="discharge-clearance__input"
                        type="text"
                        name="uhid"
                        value={formData.uhid}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="discharge-clearance__form-group">
                    <label className="discharge-clearance_label">Patient Name <span className="discharge-clearance_required">*</span></label>
                    <input
                        className="discharge-clearance__input"
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="discharge-clearance__form-group">
                    <label className="discharge-clearance__label">DOA</label>
                    <input
                        className="discharge-clearance__input"
                        type="date"
                        name="doa"
                        value={formData.doa}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="discharge-clearance__form-group">
                    <label className="discharge-clearance__label">Address</label>
                    <textarea
                        className="discharge-clearance__textarea"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="discharge-clearance_form-group discharge-clearance_form-group--checkbox">
                    <input
                        className="discharge-clearance__checkbox"
                        type="checkbox"
                        name="dischargeSummaryPrepared"
                        checked={formData.dischargeSummaryPrepared}
                        onChange={handleInputChange}
                    />
                    <label className="discharge-clearance__checkbox-label">
                        <span className="discharge-clearance__checkbox-text">Discharge Summary Prepared</span>
                    </label>
                </div>

                <button type="submit" className="discharge-clearance__submit">Submit</button>
            </form>

            {showPopup && (
                <div className="discharge-clearance__popup-overlay">
                    <div className="discharge-clearance__popup">
                        <h3 className="discharge-clearance__popup-title">Confirmation</h3>
                        <p className="discharge-clearance__popup-message">Discharge clearance submitted successfully!</p>
                        <button 
                            className="discharge-clearance__popup-close" 
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DischargeClearance;
