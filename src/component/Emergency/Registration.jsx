 /* Dhanashree_EmergencyPatientRegistration_19/09 */

import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import { API_BASE_URL } from '../api/api';

const EmergencyPatientRegistration = () => {
    const [formData, setFormData] = useState({
        membership: "",
        priceCategory: "",
        firstName: "",
        middleName: "",
        lastName: "",
        religion: "",
        gender: "",
        haveDOB: false,
        age: "",
        ageUnit: "Years",
        country: "",
        county: "",
        address: "",
        contactNumber: "",
        referredBy: "",
        conditionDuringArrival: "",
        modeOfArrival: "",
        careOfPerson: "",
        careOfPersonNumber: "",
        broughtBy: "",
        relationWithPatient: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        axios.post(`${API_BASE_URL}/emergency-patients/register`, formData)
            .then(response => {
                console.log('Success:', response.data);
            
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="PatientRegistration-container">
            <header className="PatientRegistration-header">
                <h1>Emergency Patient Registration</h1>
                <button className="PatientRegistration-close-button">✖</button>
            </header>
            <form className="PatientRegistration-form" onSubmit={handleSubmit}>
                <div className="PatientRegistration-form-group">
                    <label htmlFor="membership">Membership <span className="PatientRegistration-required">*</span>:</label>
                    <select id="membership" name="membership" value={formData.membership} onChange={handleChange}>
                        <option value="">Select Membership</option>
                        <option value="General">General</option>
                        <option value="Premium">Premium</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>
                <div className="PatientRegistration-form-group">
                    <label htmlFor="priceCategory">Price Category:</label>
                    <select id="priceCategory" name="priceCategory" value={formData.priceCategory} onChange={handleChange}>
                        <option value="">Select Price Category</option>
                        <option value="Normal">Normal</option>
                        <option value="Discounted">Discounted</option>
                        <option value="Free">Free</option>
                    </select>
                </div>
                <div className="PatientRegistration-form-section">
                    <div className="PatientRegistration-form-left">
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="firstName">First Name <span className="PatientRegistration-required">*</span>:</label>
                            <input type="text" id="firstName" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="middleName">Middle Name:</label>
                            <input type="text" id="middleName" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="lastName">Last Name <span className="PatientRegistration-required">*</span>:</label>
                            <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="religion">Religion <span className="PatientRegistration-required">*</span>:</label>
                            <select id="religion" name="religion" value={formData.religion} onChange={handleChange}>
                                <option value="">Select Religion</option>
                                <option value="Christianity">Christianity</option>
                                <option value="Islam">Islam</option>
                                <option value="Hinduism">Hinduism</option>
                                <option value="Buddhism">Buddhism</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="gender">Gender <span className="PatientRegistration-required">*</span>:</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="haveDOB">Have DOB?</label>
                            <input type="checkbox" id="haveDOB" name="haveDOB" checked={formData.haveDOB} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="age">Age:</label>
                            <div className="PatientRegistration-age-group">
                                <input type="number" id="age" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
                                <select id="ageUnit" name="ageUnit" value={formData.ageUnit} onChange={handleChange}>
                                    <option value="Years">Years</option>
                                    <option value="Months">Months</option>
                                    <option value="Days">Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="county">County:</label>
                            <input type="text" id="county" name="county" placeholder="County" value={formData.county} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="address">Address:</label>
                            <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="caseType">Case Type:</label>
                            <select id="caseType" name="caseType" value={formData.caseType} onChange={handleChange}>
                                <option value="">Select Case Type</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Dog Bite">Dog Bite</option>
                                <option value="Snake Bite">Snake Bite</option>
                                <option value="Animal Bite">Animal Bite</option>
                                <option value="Emergency Labour">Emergency Labour</option>
                                <option value="Medico-Legal">Medico-Legal</option>
                            </select>
                        </div>
                        {/* Conditionally render fields based on Dog Bite, Snake Bite, and Animal Bite case types */}
                        {["Dog Bite", "Snake Bite", "Animal Bite"].includes(formData.caseType) && (
                            <>
                                <div className="PatientRegistration-form-group">
                                    <label htmlFor="bitingAddress">Biting Address:</label>
                                    <input type="text" id="bitingAddress" name="bitingAddress" placeholder="Biting Address" value={formData.bitingAddress} onChange={handleChange} />
                                </div>
                                <div className="PatientRegistration-form-group">
                                    <label htmlFor="dateOfBite">Date of Bite:</label>
                                    <input type="date" id="dateOfBite" name="dateOfBite" value={formData.dateOfBite} onChange={handleChange} />
                                </div>
                                <div className="PatientRegistration-form-group">
                                    <label htmlFor="bittenOn">Bitten On:</label>
                                    <input type="text" id="bittenOn" name="bittenOn" placeholder="Bitten On (e.g., arm, leg)" value={formData.bittenOn} onChange={handleChange} />
                                </div>
                                <div className="PatientRegistration-form-group">
                                    <label htmlFor="firstAidGiven">First Aid Given Immediately:</label>
                                    <input type="checkbox" id="firstAidGiven" name="firstAidGiven" checked={formData.firstAidGiven} onChange={handleChange} />
                                </div>
                            </>
                        )}
                        {/* Conditionally render fields based on Medico-Legal case type */}
                        {formData.caseType === "Medico-Legal" && (
                            <div className="PatientRegistration-form-group">
                                <select id="medicoLegalType" name="medicoLegalType" value={formData.medicoLegalType} onChange={handleChange}>
                                    <option value="">Select Type</option>
                                    <option value="Assault">Assault</option>
                                    <option value="RTA">RTA</option>
                                    <option value="Burn">Burn</option>
                                    <option value="Poisoning">Poisoning</option>
                                    <option value="Hanging">Hanging</option>
                                    <option value="Snake Bite">Snake Bite</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="PatientRegistration-form-right">
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="contactNumber">Contact Number:</label>
                            <input type="tel" id="contactNumber" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="referredBy">Referred By:</label>
                            <input type="text" id="referredBy" name="referredBy" placeholder="Referred By" value={formData.referredBy} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="conditionDuringArrival">Condition During Arrival:</label>
                            <select id="conditionDuringArrival" name="conditionDuringArrival" value={formData.conditionDuringArrival} onChange={handleChange}>
                                <option value="">Select Condition</option>
                                <option value="Stable">Stable</option>
                                <option value="Critical">Critical</option>
                                <option value="Deceased">Deceased</option>
                            </select>
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="modeOfArrival">Mode of Arrival:</label>
                            <select id="modeOfArrival" name="modeOfArrival" value={formData.modeOfArrival} onChange={handleChange}>
                                <option value="">Select Mode</option>
                                <option value="Ambulance">Ambulance</option>
                                <option value="Private Vehicle">Private Vehicle</option>
                                <option value="Walk-In">Walk-In</option>
                            </select>
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="careOfPerson">Care of Person:</label>
                            <input type="text" id="careOfPerson" name="careOfPerson" placeholder="Care of Person" value={formData.careOfPerson} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="careOfPersonNumber">Care of Person Number:</label>
                            <input type="tel" id="careOfPersonNumber" name="careOfPersonNumber" placeholder="Care of Person Number" value={formData.careOfPersonNumber} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="broughtBy">Brought By:</label>
                            <input type="text" id="broughtBy" name="broughtBy" placeholder="Brought By" value={formData.broughtBy} onChange={handleChange} />
                        </div>
                        <div className="PatientRegistration-form-group">
                            <label htmlFor="relationWithPatient">Relation With Patient:</label>
                            <input type="text" id="relationWithPatient" name="relationWithPatient" placeholder="Relation With Patient" value={formData.relationWithPatient} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="PatientRegistration-button-container">
                    <button type="submit" className="PatientRegistration-submit-button">Register</button>
                </div>
            </form>
        </div>
    );
};

export default EmergencyPatientRegistration;

 /* Dhanashree_EmergencyPatientRegistration_19/09 */
