/* Ravindra_Sanap_UpdateEmployeepopup.jsx_07_10_2024_Start */

import React, { useState, useEffect } from 'react';
import './AddEmployeePopup.css';

function UpdateEmployeepopup({ onClose, onSubmit, employee }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        contactNumber: '',
        dateOfJoining: '',

    });

    useEffect(() => {
        if (employee) {
            setFormData({
                firstName: employee.firstName || '',
                lastName: employee.lastName || '',
                emailId: employee.emailId || '',
                contactNumber: employee.contactNumber || '',
                dateOfJoining: employee.dateOfJoining || '',

            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (

        <div className="addemployeepopup__overlay">
            <div className="addemployeepopup__popup">
                <div className="addemployeepopup__header">
                    <h2>Update Employee</h2>
                    <button
                        onClick={onClose}
                        className="addemployeepopup__closeButton"
                    >
                        X
                    </button>
                </div>
                <form className="addemployeepopup__form" onSubmit={handleSubmit}>
                    <div className="addemployeepopup__formGroup">
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Last Name:</label>
                        <input type="text" name="firstName" value={formData.lastName} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>emailId:</label>
                        <input type="emailId" name="emailId" value={formData.emailId} onChange={handleChange} required />

                    </div>

                    <div className="addemployeepopup__formGroup">
                        <label>contactNumber:</label>
                        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Date of Joining:</label>
                        <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />

                    </div>
                    {/* <div className="addemployeepopup__formGroup">
                        <label>Schedule Start:</label>
                        <input type="time" name="schedulestart" value={formData.schedulestart} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Schedule End:</label>
                        <input type="time" name="scheduleend" value={formData.scheduleend} onChange={handleChange} required />

                    </div> */}
                    <div className="addemployeepopup__formActions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Update</button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default UpdateEmployeepopup;

/* Ravindra_Sanap_UpdateEmployeepopup.jsx_07_10_2024_End */
