import React, { useState, useEffect } from 'react';
import "./AddNewrecrutier.css";

const Updaterecruiter = ({ onClose, onSubmit, recruiter }) => {
    const [formData, setFormData] = useState({
        recruitement_id: '',
        name: '',
        email: '',
        mobile: '',
        dateOfJoining: '',
        department: '',
        designation: '',
        typeofemployee: '',
        hiredBy: '',
        previousRole: '',
        status: '',
        remark: ''
    });

    // Prefill the form with recruiter data when available
    useEffect(() => {
        if (recruiter) {
            setFormData({
                recruitement_id: recruiter.recruitement_id || '',
                name: recruiter.name || '',
                email: recruiter.email || '',
                mobile: recruiter.mobile || '',
                dateOfJoining: recruiter.dateOfJoining || '',
                department: recruiter.department || '',
                designation: recruiter.designation || '',
                typeofemployee: recruiter.typeofemployee || '',
                hiredBy: recruiter.hiredBy || '',
                previousRole: recruiter.previousRole || '',
                status: recruiter.status || '',
                remark: recruiter.remark || ''
            });
        }
    }, [recruiter]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  // Send the updated data to parent component
    };

    return (
        <div className="addNewrecrutier-container">
            <div className="addNewrecrutier-header">
                <h3>Update Recruiter</h3>
                <button className="addNewrecrutier-close-btn" onClick={onClose}>x</button>
            </div>

            <form className="addNewrecrutier-form" onSubmit={handleSubmit}>
                <div className="addNewrecrutier-form-row">

                    <div className="addNewrecrutier-form-group-1row">
                        <div className="addNewrecrutier-form-group">
                            <label>Recruiter Id<span>*</span></label>
                            <input
                                type="text"
                                name="recruitement_id"
                                value={formData.recruitement_id}
                                onChange={handleInputChange}
                                placeholder="Recruiter Id"
                                disabled
                            />
                        </div>
                        <div className="addNewrecrutier-form-group">
                            <label>Recruiter Name<span>*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Recruiter Name"
                                required
                            />
                        </div>
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                        <div className="addNewrecrutier-form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="addNewrecrutier-form-group">
                            <label>Contact Number<span>*</span></label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                placeholder="Contact Number"
                                required
                            />
                        </div>
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                        <div className="addNewrecrutier-form-group">
                            <label>Date of Joining</label>
                            <input
                                type="date"
                                name="dateOfJoining"
                                value={formData.dateOfJoining}
                                onChange={handleInputChange}
                                placeholder="Date of Joining"
                            />
                        </div>
                        <div className="addNewrecrutier-form-group">
                            <label>Department<span>*</span></label>
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                placeholder='Department'
                                required
                            />
                        </div>
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                        <div className="addNewrecrutier-form-group">
                            <label>Designation</label>
                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleInputChange}
                                placeholder="Designation"
                            />
                        </div>
                        <div className="addNewrecrutier-form-group">
                            <label>Employee Type<span>*</span></label>
                            <input
                                type="text"
                                name="typeofemployee"
                                value={formData.typeofemployee}
                                onChange={handleInputChange}
                                placeholder='Employee Type'
                                required
                            />
                        </div>
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                        <div className="addNewrecrutier-form-group">
                            <label>Assigned Hiring Managers</label>
                            <input
                                type="text"
                                name="hiredBy"
                                value={formData.hiredBy}
                                onChange={handleInputChange}
                                placeholder="Assigned Hiring Managers"
                            />
                        </div>
                        <div className="addNewrecrutier-form-group">
                            <label>Previous Role<span>*</span></label>
                            <input
                                type="text"
                                name="previousRole"
                                value={formData.previousRole}
                                onChange={handleInputChange}
                                placeholder='Previous Role'
                                required
                            />
                        </div>
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                        <div className="addNewrecrutier-form-group">
                            <label>Status</label>
                            <input
                                type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                placeholder="Status"
                            />
                        </div>
                        <div className="addNewrecrutier-form-group">
                            <label>Remarks<span>*</span></label>
                            <input
                                type="text"
                                name="remark"
                                value={formData.remark}
                                onChange={handleInputChange}
                                placeholder='Remarks'
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="addNewrecrutier-form-actions">
                    <button type="submit" className="addNewrecrutier-add-btn">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Updaterecruiter;
