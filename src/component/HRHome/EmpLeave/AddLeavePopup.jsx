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
        <div className="addleave-overlay">
            <div className="popup">
            <button className="addleaveclose-popup" onClick={onClose}>X</button>

                <h2>Add Leave Details</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Employee ID:</label>
                        <input
                            type="number"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Leave Type:</label>
                        <input
                            type="text"
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className='actionbtns' type="submit">Submit</button>
                    <button className='actionbtns' type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default AddLeavePopup;


/* Ravindra_Sanap_AddLeavepopup.jsx_03_10_2024_End */