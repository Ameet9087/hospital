import React, { useState } from 'react';
import '../Appointment/AddNewPpointment.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AddNewAppointmentForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        age: 0,
        ageUnit: 'Yrs',
        reason: '',
        contactNumber: '',
        appointmentDate: '',
        appointmentTime: '',
        department: '',
        doctor: '',
        visitType: 'New Patient',
        employeeId: 0, // Added employeeId to the form data
    });

    const { id } = useParams(); // Use id if necessary

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiUrl = 'http://192.168.1.34:1415/api/appointments/save-new-appointment';


        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    middleName: formData.middleName,
                    lastName: formData.lastName,
                    gender: formData.gender,
                    age: parseInt(formData.age, 10),
                    ageUnit: formData.ageUnit,
                    reason: formData.reason,
                    contactNumber: formData.contactNumber,
                    appointmentDate: formData.appointmentDate,
                    appointmentTime: formData.appointmentTime,
                    department: formData.department,
                    // doctor: formData.doctor,
                    visitType: formData.visitType,
                    employee: {
                        employeeId: parseInt(formData.employeeId, 10), // Include employeeId under employee
                    },
                }),
            });

            if (response.ok) {
                alert('Appointment added successfully!');
                navigate('/book-appointment');
                setFormData({
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    gender: '',
                    age: '',
                    ageUnit: 'Yrs',
                    reason: '',
                    contactNumber: '',
                    appointmentDate: '',
                    appointmentTime: '',
                    department: '',
                    // doctor: '',
                    visitType: 'New Patient',
                    employeeId: '', // Reset employeeId as well
                });
            
                   
                
            } else {
                alert('Failed to add appointment. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form className="addnewaptmtpatient" onSubmit={handleSubmit}>
            <div className="addnewaptmtpatient-left">
                {/* Left Side Inputs */}
                <div className="addnewaptmtpatient-group">
                    <label>First Name *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Middle Name</label>
                    <input
                        type="text"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}
                        placeholder="Middle Name"
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Last Name *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Gender *</label>
                    <div className="addnewaptmtpatient-gender-options">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={formData.gender === 'Other'}
                                onChange={handleChange}
                            />
                            Other
                        </label>
                    </div>
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Age *</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                    />
                    <div className="addnewaptmtpatient-age-options">
                        <label>
                            <input
                                type="radio"
                                name="ageUnit"
                                value="Yrs"
                                checked={formData.ageUnit === 'Yrs'}
                                onChange={handleChange}
                            />
                            Yrs
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="ageUnit"
                                value="Months"
                                checked={formData.ageUnit === 'Months'}
                                onChange={handleChange}
                            />
                            Months
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="ageUnit"
                                value="Days"
                                checked={formData.ageUnit === 'Days'}
                                onChange={handleChange}
                            />
                            Days
                        </label>
                    </div>
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Reason</label>
                    <input
                        type="text"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Reason"
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Contact Number *</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        required
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Appointment Date *</label>
                    <input
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Appointment Time</label>
                    <input
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Employee ID *</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        placeholder="Employee ID"
                        required
                    />
                </div>
                <button className="addnewaptmtpatient-btn" type="submit">
                    Add Appointment
                </button>
            </div>
            <div className="addnewaptmtpatient-right">
                {/* Right Side Inputs */}
                <div className="addnewaptmtpatient-group">
                    <label>Department</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Department Name"
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Doctor</label>
                    <input
                        type="text"
                        name="doctor"
                        // value={formData.doctor}
                        // onChange={handleChange}
                        placeholder="Doctor's Name"
                    />
                </div>
                <div className="addnewaptmtpatient-group">
                    <label>Select Visit Type</label>
                    <select
                        name="visitType"
                        value={formData.visitType}
                        onChange={handleChange}
                    >
                        <option value="New Patient">New Patient</option>
                        <option value="Follow-Up Patient">Follow-Up Patient</option>
                    </select>
                </div>
            </div>
        </form>
    );
};

export default AddNewAppointmentForm;
