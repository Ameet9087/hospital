import React, { useState, useEffect } from 'react';
import "./AddNewrecrutier.css";
import { FloatingInput } from '../../../FloatingInputs';

const Updaterecruiter = ({ onClose, onSubmit, recruiter }) => {
    const [formData, setFormData] = useState({
        recruitement_id:'',
        name: '',
        mobile: '',
        email: '',
        department: '',
        designation: '',
        dateOfJoining: '',
        typeOfEmployee: '',
        status: '',
        hiredBy: '',
        previousRole: '',
        remark: ''
    });

    // Prefill the form with recruiter data when available
    useEffect(() => {
        if (recruiter) {
            setFormData({
                recruitement_id: recruiter.recruitement_id || '',
                name: recruiter.name || '',
                mobile: recruiter.mobile || '',
                email: recruiter.email || '',
                department: recruiter.department || '',
                designation: recruiter.designation || '',
                dateOfJoining: recruiter.dateOfJoining || '',
                typeOfEmployee: recruiter.typeOfEmployee || '',
                status: recruiter.status || '',
                hiredBy: recruiter.hiredBy || '',
                previousRole: recruiter.previousRole || '',
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
        onSubmit(formData); // Send the updated data to parent component
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
                      
                            <FloatingInput
                            label={"Recruiter Name *"}
                            type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Recruiter Name"
                                required/>
                            
                       
                            <FloatingInput
                            label={"Contact Number *"}
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="Contact Number"
                            required/>
                            
                  
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                      
                            <FloatingInput
                            label={"Email Address"}
                            type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email Address"/>
                    
                            <FloatingInput
                            label={"Date of Joining"}
                            type="date"
                                name="dateOfJoining"
                                value={formData.dateOfJoining}
                                onChange={handleInputChange}
                                placeholder="Date of Joining"/>
                     
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                      
                            <FloatingInput
                            label={"Department"}
                            type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                                placeholder="Department"
                                required/>
                            
                        
                            <FloatingInput
                            label={"Designation"}
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            placeholder="Designation"/>
                   
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                      
                            <FloatingInput
                            label={"Employee Type *"}
                            type="text"
                                name="typeOfEmployee"
                                value={formData.typeOfEmployee}
                                onChange={handleInputChange}
                                placeholder="Employee Type"
                                required/>
                           
                     
                       
                            <FloatingInput
                            label={"Assigned Hiring Managers"}
                            type="text"
                            name="hiredBy"
                            value={formData.hiredBy}
                            onChange={handleInputChange}
                            placeholder="Assigned Hiring Managers"/>
                      
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                      
                            <FloatingInput
                            label={"Previous Role"}
                            type="text"
                            name="previousRole"
                            value={formData.previousRole}
                            onChange={handleInputChange}
                            placeholder="Previous Role"
                            required/>
                       
                        
                            <FloatingInput
                            label={"Status"}
                            type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                placeholder="Status"/>
                            
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                        <div className="addNewrecrutier-form-group">
                            <FloatingInput
                            label={"Remark"}
                            type="text"
                                name="remark"
                                value={formData.remark}
                                onChange={handleInputChange}
                                placeholder="Remarks"
                                required/>
                           
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
