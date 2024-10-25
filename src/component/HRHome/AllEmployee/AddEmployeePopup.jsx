/* Ravindra_Sanap_AddEmployeepopup.jsx_03_10_2024_Start */

import React, { useState } from 'react';
import './AddEmployeePopup.css'
function AddEmployeepopupforaddemp({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        empName: '',
        email: '',
        position: '',
        department: '',
        mobile: '',
        dateOfJoining: '',
        schedulestart: '',
        scheduleend: '',
    });

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
        <div className="popupforaddemp-overlay">
            <div className="popupforaddemp-content">
            <button className="addempclose-popup" onClick={onClose}>X</button>

                <h2>Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <label>Employee Name:</label>
                    <input type="text" name="empName" value={formData.empName} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>Position:</label>
                    <input type="text" name="position" value={formData.position} onChange={handleChange} required />

                    <label>Department:</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required />

                    <label>Mobile:</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />

                    <label>Date of Joining:</label>
                    <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />

                    <label>Schedule Start:</label>
                    <input type="time" name="schedulestart" value={formData.schedulestart} onChange={handleChange} required />

                    <label>Schedule End:</label>
                    <input type="time" name="scheduleend" value={formData.scheduleend} onChange={handleChange} required />

                  
                    <button className='actionbtns' type="submit">Add Employee</button>
                    <button className="actionbtns" type='button' onClick={onClose}>Cancel</button>

                </form>
            </div>
        </div>
    );
}

export default AddEmployeepopupforaddemp;


/* Ravindra_Sanap_AddEmployeepopup.jsx_03_10_2024_End */
