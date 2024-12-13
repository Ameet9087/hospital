import React, { useState } from 'react';
import './ReceptionClearance.css';

const ReceptionClearance = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const handleClose = () => {
        // Set the popup to be closed
        setIsPopupOpen(false);
    };
    const [formData, setFormData] = useState({
        ipNo: '',
        patientName: '',
        uhid: '',
        doa: '',
        address: '',
        billHasPrepared: false,
        billHasSettled: false,
        ipBlocked: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };
    if (!isPopupOpen) {
        return null;
    }

    return (
        <div className="reception-clearance-container">
            <div className='receptionclearence-popup'>
            <div className="reception-clearance-header">
            <button className="reception-clearance-close-btn" onClick={handleClose}>
                        <span>×</span>
                    </button>
                <h2 className="reception-clearance-title">Reception Clearance</h2>
            </div>
            
            <form className="reception-clearance-form" onSubmit={handleSubmit}>
                <div className="reception-clearance-form-group">
                    <label className="reception-clearance-label">IP No</label>
                    <input
                        type="text"
                        name="ipNo"
                        value={formData.ipNo}
                        onChange={handleInputChange}
                        className="reception-clearance-input"
                        required
                    />
                </div>

                <div className="reception-clearance-form-group">
                    <label className="reception-clearance-label">Patient Name</label>
                    <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        className="reception-clearance-input"
                        required
                    />
                </div>

                <div className="reception-clearance-form-group">
                    <label className="reception-clearance-label">UHID</label>
                    <input
                        type="text"
                        name="uhid"
                        value={formData.uhid}
                        onChange={handleInputChange}
                        className="reception-clearance-input"
                        required
                    />
                </div>

                <div className="reception-clearance-form-group">
                    <label className="reception-clearance-label">DOA</label>
                    <input
                        type="date"
                        name="doa"
                        value={formData.doa}
                        onChange={handleInputChange}
                        className="reception-clearance-input"
                    />
                </div>

                <div className="reception-clearance-divider"></div>

                <div className="reception-clearance-form-group">
                    <label className="reception-clearance-label">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="reception-clearance-input"
                    />
                </div>

                <div className="reception-clearance-divider"></div>

                <div className="reception-clearance-checkbox-group">
                    <label className="reception-clearance-checkbox-label">
                        <input
                            type="checkbox"
                            name="billHasPrepared"
                            checked={formData.billHasPrepared}
                            onChange={handleInputChange}
                            className="reception-clearance-checkbox"
                        />
                        Bill Has Prepared
                    </label>

                    <label className="reception-clearance-checkbox-label">
                        <input
                            type="checkbox"
                            name="billHasSettled"
                            checked={formData.billHasSettled}
                            onChange={handleInputChange}
                            className="reception-clearance-checkbox"
                        />
                        Bill Has Settled
                    </label>

                    <label className="reception-clearance-checkbox-label">
                        <input
                            type="checkbox"
                            name="ipBlocked"
                            checked={formData.ipBlocked}
                            onChange={handleInputChange}
                            className="reception-clearance-checkbox"
                        />
                        IP Blocked
                    </label>
                </div>
            </form>
            </div>
        </div>
    );
};

export default ReceptionClearance;
