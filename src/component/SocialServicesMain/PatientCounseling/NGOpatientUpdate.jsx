/* Ajhar Tamboli addNewNGOPatientRegistration.jsx 07-10-24 */

import React, { useState, useEffect } from 'react';
import "./addNewNGOPatientRegistration.css";

const NGOPatientUpdate = ({ onClose, onSubmit, patient }) => {
    const [formData, setFormData] = useState({
        patientId: "",
        patientName: "",
        age: "",
        gender: "",
        contactNumber: "",
        department: "",
        disease: "",
    });

    // Pre-fill the form if patient is passed
    useEffect(() => {
        if (patient) {
            setFormData(patient);
        }
    }, [patient]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        console.log("Updated Form Data: ", formData);
        onSubmit(formData);
        onClose();
    };

    return (
        <div className="addNewNGOPatientRegistration-container">
            <div className="addNewNGOPatientRegistration-header">
                <h3>Update NGO Patient Registration</h3>
                <button className="addNewNGOPatientRegistration-close-btn" onClick={onClose}>x</button>
            </div>

            <div className="addNewNGOPatientRegistration-form">
                <div className="addNewNGOPatientRegistration-form-row">
                    <div className="addNewNGOPatientRegistration-form-group-1row">
                        <div className="addNewNGOPatientRegistration-form-group">
                            <label>Patient ID<span>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Patient ID"
                                name="patientId"
                                value={formData.patientId} // Display current value
                                onChange={handleInputChange}
                                readOnly // Optional: Make it read-only if you don't want to allow editing of the Patient ID
                            />
                        </div>
                        <div className="addNewNGOPatientRegistration-form-group">
                            <label>Patient Name<span>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Patient Name"
                                name="patientName"
                                value={formData.patientName} // Display current value
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="addNewNGOPatientRegistration-form-group-1row">
                        <div className="addNewNGOPatientRegistration-form-group">
                            <label>Age</label>
                            <input
                                type="text"
                                placeholder="Enter Patient Age"
                                name="age"
                                value={formData.age} // Display current value
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="addNewNGOPatientRegistration-form-group">
                            <label>Gender<span>*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Patient Gender"
                                name="gender"
                                value={formData.gender} // Display current value
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="addNewNGOPatientRegistration-form-group-1row">
                        <div className="addNewNGOPatientRegistration-form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                placeholder="Contact Number"
                                name="contactNumber"
                                value={formData.contactNumber} // Display current value
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="addNewNGOPatientRegistration-form-group">
                            <label>Department<span>*</span></label>
                            <input
                                type="text"
                                placeholder="Department"
                                name="department"
                                value={formData.department} // Display current value
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="addNewNGOPatientRegistration-form-group-1row">
                        <div className="addNewNGOPatientRegistration-form-group">
                            <label>Disease</label>
                            <input
                                type="text"
                                placeholder="Enter Patient Disease"
                                name="disease"
                                value={formData.disease} // Display current value
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="addNewNGOPatientRegistration-form-actions">
                <button className="addNewNGOPatientRegistration-add-btn" onClick={handleUpdate}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default NGOPatientUpdate;
