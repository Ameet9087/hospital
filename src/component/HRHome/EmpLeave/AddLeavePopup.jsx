/* Ravindra_Sanap_AddLeavepopup.jsx_03_10_2024_Start */

import React, { useState, useEffect } from 'react';
import './AddLeavePopup.css';
import { API_BASE_URL } from '../../api/api';

function AddLeavePopup({ onClose, onSubmit }) {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        leaveType: '',
        reason: '',
        employeeDTO: {
            employeeId: ''
        }
    });

    // Fetch employees from the API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEmployeeChange = (e) => {
        const employeeId = e.target.value;
        setFormData({
            ...formData,
            employeeDTO: {
                employeeId: Number(employeeId) // Convert to number if required by backend
            }
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
                        <label>Employee:</label>
                        <select
                            name="employeeId"
                            value={formData.employeeDTO.employeeId}
                            onChange={handleEmployeeChange}
                            required
                        >
                            <option value="" disabled>Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee.employeeId} value={employee.employeeId}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </select>
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
                    <div className="addemployeeleave__formGroup">
                        <label>Reason:</label>
                        <input
                            type="text"
                            name="reason"
                            value={formData.reason}
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
