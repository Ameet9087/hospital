/* Mohini_HomeHealthCareModule_PatientRegistrationForm_27/sep/24 */
import React, { useState, useRef, useEffect } from 'react';
import './PatientRegistrationForm.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';

const PatientRegistrationForm = ({ sendpatientdata, patientdata }) => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [formData, setFormData] = useState({

        name: '',
        age: '',
        gender: '',
        address: '',
        contactInfo: '',
        emergencyContact: '',
        insuranceDetails: '',
        medicalHistory: '',
        currentMedications: '',
    });

    useEffect(() => {
        setFormData({
            name: patientdata?.name,
            age: patientdata?.age,
            gender: patientdata?.gender,
            address: patientdata?.address,
            contactInfo: patientdata?.contactInfo,
            emergencyContact: patientdata?.emergencyContact,
            insuranceDetails: patientdata?.insuranceDetails,
            medicalHistory: patientdata?.medicalHistory,
            currentMedications: patientdata?.currentMedications

        })
    }, [patientdata])

    const [submittedData, setSubmittedData] = useState([]); // State to hold submitted data

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        sendpatientdata(formData);
        alert("Registration details added successfully");
    };

    return (

        <>
            <div className='patient-health-care'>
                <form className="health-patient-registration-form" onSubmit={handleSubmit}>
                    <div className="health-patient-registration-left">
                        {/* Left Side Inputs */}
                        {/* <div className="health-patient-registration-group">
                        <label>Patient ID <span className="mandatory">*</span></label>
                        <input
                            type="text"
                            name="patientID"
                            value={formData.patientID}
                            onChange={handleInputChange}
                            placeholder="Patient ID"
                            required
                        />
                    </div> */}
                        <div className="health-patient-registration-group">
                            <label>Patient Name <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Patient Name"
                                required
                            />
                        </div>
                        <div className="health-patient-registration-group">
                            <label>Age <span className="mandatory">*</span></label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                placeholder="Age"
                                required
                            />
                        </div>
                        <div className="health-patient-registration-group">
                            <label>Gender <span className="mandatory">*</span></label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="health-patient-registration-group">
                            <label>Address <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                required
                            />
                        </div>
                        <div className="health-patient-registration-group">
                            <label>Contact Info <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="contactInfo"
                                value={formData.contactInfo}
                                onChange={handleInputChange}
                                placeholder="Contact Info"
                                required
                            />
                        </div>
                        <div className="health-patient-registration-group">
                            <label>Emergency Contact <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleInputChange}
                                placeholder="Emergency Contact"
                                required
                            />
                        </div>
                    </div>

                    <div className="health-patient-registration-right">
                        {/* Right Side Inputs */}
                        <div className="health-patient-registration-group">
                            <label>Insurance Details <span className="mandatory">*</span></label>
                            <input
                                type="text"
                                name="insuranceDetails"
                                value={formData.insuranceDetails}
                                onChange={handleInputChange}
                                placeholder="Insurance Details"
                                required
                            />
                        </div>
                        <div className="health-patient-registration-group">
                            <label>Medical History </label>
                            <textarea
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleInputChange}
                                placeholder="Medical History"
                            />
                        </div>
                        <div className="health-patient-registration-group">
                            <label>Current Medications </label>
                            <textarea
                                name="currentMedications"
                                value={formData.currentMedications}
                                onChange={handleInputChange}
                                placeholder="Current Medications"
                            />
                        </div>

                        <div className='health-patient-registration-button'>
                            <button type="submit" className="health-patient-registration-submit-btn">Submit</button>
                        </div>
                    </div>
                </form>

                {submittedData.length > 0 && (
                    <div className='table-container'>
                        <table ref={tableRef}>
                            <thead>
                                <tr>
                                    {["Patient ID", "Name", "Age", "Gender", "Address", "Contact Info", "Emergency Contact", "Insurance Details", "Medical History", "Current Medications"].map((header, index) => (
                                        <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                                            <div className="header-content">
                                                <span>{header}</span>
                                                <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {submittedData.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.patientID}</td>
                                        <td>{data.name}</td>
                                        <td>{data.age}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.address}</td>
                                        <td>{data.contactInfo}</td>
                                        <td>{data.emergencyContact}</td>
                                        <td>{data.insuranceDetails}</td>
                                        <td>{data.medicalHistory}</td>
                                        <td>{data.currentMedications}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default PatientRegistrationForm;
/* Mohini_HomeHealthCareModule_PatientRegistrationForm_27/sep/24 */
