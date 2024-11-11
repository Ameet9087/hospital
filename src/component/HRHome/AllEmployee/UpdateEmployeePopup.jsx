/* Ravindra_Sanap_UpdateEmployeepopup.jsx_07_10_2024_Start */

import React, { useState, useEffect } from 'react';
import './AddEmployeePopup.css';

function UpdateEmployeepopup({ onClose, onSubmit, employee }) {
    const [formData, setFormData] = useState({
        empName: '',
        email: '',
        position: '',
        department: '',
        mobile: '',
        dateOfJoining: '',
        schedulestart: '',
        scheduleend: '',
        salary: ''
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                empName: employee.empName || '',
                email: employee.email || '',
                position: employee.position || '',
                department: employee.department || '',
                mobile: employee.mobile || '',
                dateOfJoining: employee.dateOfJoining || '',
                schedulestart: employee.schedulestart || '',
                scheduleend: employee.scheduleend || '',
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
                        <label>Employee Name:</label>
                        <input type="text" name="empName" value={formData.empName} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Position:</label>
                        <input type="text" name="position" value={formData.position} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Department:</label>
                        <input type="text" name="department" value={formData.department} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Mobile:</label>
                        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Date of Joining:</label>
                        <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Schedule Start:</label>
                        <input type="time" name="schedulestart" value={formData.schedulestart} onChange={handleChange} required />

                    </div>
                    <div className="addemployeepopup__formGroup">
                        <label>Schedule End:</label>
                        <input type="time" name="scheduleend" value={formData.scheduleend} onChange={handleChange} required />

                    </div>
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
