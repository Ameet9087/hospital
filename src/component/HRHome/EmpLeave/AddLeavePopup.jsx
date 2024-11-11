/* Ravindra_Sanap_AddLeavepopup.jsx_03_10_2024_Start */


import React, { useState } from 'react';
import './AddLeavePopup.css';

function AddLeavePopup({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        startDate: '',
        endDate: '',
        leaveType: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();


    };

    return (
      
        <div className="addemployeeleave__overlay">
            <div className="addemployeeleave__popup">
                <div className="addemployeeleave__header">
                    <h2>Add Leave Details</h2>
                    <button
                        onClick={onClose}
                        className="addemployeeleave__closeButton"
                    >
                        X
                    </button>
                </div>
                <form className="addemployeeleave__form" onSubmit={handleSubmit}>
                    <div className="addemployeeleave__formGroup">
                        <label>Employee ID:</label>
                        <input
                            type="number"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="addemployeeleave__formGroup">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="addemployeeleave__formGroup">
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="addemployeeleave__formGroup">
                        <label>Leave Type:</label>
                        <input
                            type="text"
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="addemployeeleave__formActions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Register</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default AddLeavePopup;


/* Ravindra_Sanap_AddLeavepopup.jsx_03_10_2024_End */