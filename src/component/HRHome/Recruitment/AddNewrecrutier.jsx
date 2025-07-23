/* Ajhar Tamboli addNewrecrutier.jsx 07-10-24 */

import React, { useState } from 'react';
import "./AddNewrecrutier.css"
import { FloatingInput,FloatingSelect,FloatingTextarea } from '../../../FloatingInputs';
const AddNewrecrutier = ({ onClose, onSubmit }) => {
    const initialFormData = {
        name: '',
        email: '',
        mobile: '',
        dateOfJoining: '',
        department: '',
        designation: '',
        typeOfEmployee: '',
        hiredBy: '',
        previousRole: '',
        status: '',
        remark: ''
    };

    const [formData, setFormData] = useState(initialFormData);

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
        e.preventDefault(); // Prevent default form submission
        onSubmit(formData);
    };
    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <div className="addNewrecrutier-container">
            <div className="addNewrecrutier-header">
                <h3>Add New Recruiter</h3>
                <button className="addNewrecrutier-close-btn" onClick={onClose}>x</button>
            </div>

            <form className="addNewrecrutier-form" onSubmit={handleSubmit}>
                <div className="addNewrecrutier-form-row">

                    <div className="addNewrecrutier-form-group-1row">
                        {/* <div className="addNewrecrutier-form-group">
                            <label>Recruiter Id<span>*</span></label>
                            <input
                                type="text"
                                name="recruitement_id"
                                value={formData.recruitement_id}
                                onChange={handleInputChange}
                                placeholder="Recruiter Id"
                                required
                            />
                        </div> */}
                       
                            <FloatingInput
                            label={"Department *"}
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            placeholder='Department'
                            required/>
                            
                     
                            <FloatingInput
                            label={"Recruiter Name *"}
                            type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Recruiter Name"
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
                            label={"Date of Joining"}
                            type="date"
                            name="dateOfJoining"
                            value={formData.dateOfJoining}
                            onChange={handleInputChange}
                            placeholder="Date of Joining"/>
                            
                       
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
                            placeholder='Employee Type'
                            required/>
                            
                      
                            <FloatingInput
                            label={"Previous Role *"}
                            type="text"
                                name="previousRole"
                                value={formData.previousRole}
                                onChange={handleInputChange}
                                placeholder='Previous Role'
                                required/>
                            
                     
                    </div>

                    <div className="addNewrecrutier-form-group-1row">
                        
                            <FloatingInput
                            label={"Assigned Hiring Managers"}
                            type="text"
                            name="hiredBy"
                            value={formData.hiredBy}
                            onChange={handleInputChange}
                            placeholder="Assigned Hiring Managers"/>
                      
                            <FloatingInput
                            label={"Remarks"}
                             type="text"
                                name="remark"
                                value={formData.remark}
                                onChange={handleInputChange}
                                placeholder='Remarks'
                                required/>
                            
                  
                       
                    </div>

                 
                    
                           
                       
             
                </div>

                <FloatingInput
                            label={"Status"}
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            placeholder="Status"/>
                <div className="addNewrecrutier-form-actions">
                    <button type="submit" className="addNewrecrutier-add-btn">Add</button>
                    <button type="button" className="addNewrecrutier-add-btn" onClick={handleReset}>Reset</button>
                </div>
            </form>
        </div>
    );
};

export default AddNewrecrutier;
