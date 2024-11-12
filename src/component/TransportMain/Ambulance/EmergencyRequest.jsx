import React, { useState,useRef } from 'react';
import './EmergencyRequest.css';
import axios from 'axios';
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

const EmergencyRequest = () => {
const [columnWidths, setColumnWidths] = useState({});
const tableRef = useRef(null);
    const [formData, setFormData] = useState({
        patientID: '',
        patientName: '',
        dateOfBirth: '',
        patientAge: '',
        patientGender: '',
        medicalRecordNumber: '',
        contactPersonName: '',
        contactPhoneNumber: '',
        relationshipToPatient: '',
        emergencyType: '',
        bloodType: '',
        diagnosticTestsOrdered: '',
        requestingFacility: '',
        facilityAddress: '',
        pickUpLocation: '',
        destinationLocation: '',
        patientCondition: '',
        specialEquipmentNeeded: '',
        medicationAdministered: '',
        dispatchDate: '',
        dispatchTime: '',
        priorityLevel: '',
        additionalNotes: '',
    });

    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            emergencyId: 0,
            patientId: formData.patientID,
            patientName: formData.patientName,
            patientAge: formData.patientAge,
            gender: formData.patientGender,
            medicalRecordNumber: formData.medicalRecordNumber,
            contactPersonName: formData.contactPersonName,
            contactPhoneNumber: formData.contactPhoneNumber,
            relationshipToPatient: formData.relationshipToPatient,
            emergencyType: formData.emergencyType,
            requestingFacility: formData.requestingFacility,
            facilityAddress: formData.facilityAddress,
            pickUpLocation: formData.pickUpLocation,
            destinationLocation: formData.destinationLocation,
            patientCondition: formData.patientCondition,
            specialEquipmentNeeded: formData.specialEquipmentNeeded,
            medicationAdministered: formData.medicationAdministered,
            priorityLevel: formData.priorityLevel,
            additionalNotes: formData.additionalNotes,
            dispatchDate: formData.dispatchDate || null,
            dispatchDateTime: formData.dispatchDate && formData.dispatchTime
                ? `${formData.dispatchDate}T${formData.dispatchTime}:00`
                : null,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/emergency/create', formattedData);
            console.log('Form submitted successfully:', response.data);
            alert('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='emergency-request-com-module-form-container'>
        {!showForm && (
            <button
                onClick={() => setShowForm(true)}
                className="emergency-request-com-module-submit-button"
            >
                Add New Emergency Request
            </button>
        )}

        {!showForm ? (
            <>
               <div className='table-container'>
               <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[ "Patient ID",
        "Patient Name",
        "Age",
        "Gender",
        "Contact",
        "Emergency Type"].map((header, index) => (
                                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                                        <div className="header-content">
                                            <span>{header}</span>
                                            <div
                                                className="resizer"
                                                onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                            ></div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                    <tbody>
                        <tr>
                            <td>12345</td>
                            <td>John Doe</td>
                            <td>30</td>
                            <td>Male</td>
                            <td>555-555-5555</td>
                            <td>Cardiac Arrest</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
               </div>
                   
                </>
            ) : (
                <form className="emergency-request-com-module-form" onSubmit={handleSubmit}>
                <div className="emergency-request-com-module-left">
                    <div className="emergency-request-com-module-group">
                        <label>Patient ID <span className="mandatory">*</span></label>
                        <input
                            type="text"
                            name="patientID"
                            value={formData.patientID}
                            onChange={handleInputChange}
                            placeholder="Patient ID"
                            required
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Patient Name <span className="mandatory">*</span></label>
                        <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            placeholder="Patient Name"
                            required
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Patient Age <span className="mandatory">*</span></label>
                        <input
                            type="number"
                            name="patientAge"
                            value={formData.patientAge}
                            onChange={handleInputChange}
                            placeholder="Patient Age"
                            required
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
        <label>Gender <span className="mandatory">*</span></label>
        <div className="emergency-request-com-module-gender-options">
            <label>
                <input
                    type="radio"
                    name="patientGender"
                    value="Male"
                    checked={formData.patientGender === 'Male'}
                    onChange={handleInputChange}
                    required
                />
                Male
            </label>
            <label>
                <input
                    type="radio"
                    name="patientGender"
                    value="Female"
                    checked={formData.patientGender === 'Female'}
                    onChange={handleInputChange}
                    required
                />
                Female
            </label>
            <label>
                <input
                    type="radio"
                    name="patientGender"
                    value="Other"
                    checked={formData.patientGender === 'Other'}
                    onChange={handleInputChange}
                    required
                />
                Other
            </label>
        </div>
    </div>
    
                    <div className="emergency-request-com-module-group">
                        <label>Medical Record Number</label>
                        <input
                            type="text"
                            name="medicalRecordNumber"
                            value={formData.medicalRecordNumber}
                            onChange={handleInputChange}
                            placeholder="Medical Record Number"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Contact Person Name</label>
                        <input
                            type="text"
                            name="contactPersonName"
                            value={formData.contactPersonName}
                            onChange={handleInputChange}
                            placeholder="Contact Person Name"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Contact Phone Number</label>
                        <input
                            type="text"
                            name="contactPhoneNumber"
                            value={formData.contactPhoneNumber}
                            onChange={handleInputChange}
                            placeholder="Contact Phone Number"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Relationship to Patient</label>
                        <input
                            type="text"
                            name="relationshipToPatient"
                            value={formData.relationshipToPatient}
                            onChange={handleInputChange}
                            placeholder="Relationship to Patient"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Emergency Type</label>
                        <input
                            type="text"
                            name="emergencyType"
                            value={formData.emergencyType}
                            onChange={handleInputChange}
                            placeholder="Emergency Type"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Requesting Facility</label>
                        <input
                            type="text"
                            name="requestingFacility"
                            value={formData.requestingFacility}
                            onChange={handleInputChange}
                            placeholder="Requesting Facility"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Facility Address</label>
                        <input
                            type="text"
                            name="facilityAddress"
                            value={formData.facilityAddress}
                            onChange={handleInputChange}
                            placeholder="Facility Address"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Pick-Up Location</label>
                        <input
                            type="text"
                            name="pickUpLocation"
                            value={formData.pickUpLocation}
                            onChange={handleInputChange}
                            placeholder="Pick-Up Location"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Destination Location</label>
                        <input
                            type="text"
                            name="destinationLocation"
                            value={formData.destinationLocation}
                            onChange={handleInputChange}
                            placeholder="Destination Location"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Patient Condition</label>
                        <input
                            type="text"
                            name="patientCondition"
                            value={formData.patientCondition}
                            onChange={handleInputChange}
                            placeholder="Patient Condition"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
      <label>Special Equipment Needed</label>
      <div className="special-equipment-options">
        {['Stretcher', 'Oxygen', 'IV Equipment'].map((equipment) => (
          <label key={equipment} className="special-equipment-label">
            <input
              type="radio"
              name="specialEquipmentNeeded"
              value={equipment}
              checked={formData.specialEquipmentNeeded === equipment}
              onChange={(e) => setFormData({ ...formData, specialEquipmentNeeded: equipment })}
            />
            {equipment}
          </label>
        ))}
      </div>
    </div>
    
    
                    <div className="emergency-request-com-module-group">
                        <label>Medication Administered</label>
                        <input
                            type="text"
                            name="medicationAdministered"
                            value={formData.medicationAdministered}
                            onChange={handleInputChange}
                            placeholder="Medication Administered"
                        />
                    </div>
                   
                </div>
                <div className="emergency-request-com-module-right">
                <div className="emergency-request-com-module-group">
                        <label>Priority Level</label>
                        <input
                            type="text"
                            name="priorityLevel"
                            value={formData.priorityLevel}
                            onChange={handleInputChange}
                            placeholder="Priority Level"
                        />
                    </div>
                  
                <div className="emergency-request-com-module-group">
                        <label>Additional Notes</label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleInputChange}
                            placeholder="Additional Notes"
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
                        <label>Dispatch Date</label>
                        <input
                            type="date"
                            name="dispatchDate"
                            value={formData.dispatchDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="emergency-request-com-module-group">
        <label>Dispatch Date and Time</label>
        <div className="emergency-request-com-module-dispatch-date-time">
            <input
                type="date"
                name="dispatchDate"
                value={formData.dispatchDate}
                onChange={handleInputChange}
                required
            />
            <input
                type="time"
                name="dispatchTime"
                value={formData.dispatchTime}
                onChange={handleInputChange}
                required
            />
        </div>
    </div>
    
                    <button type="submit" className="emergency-request-com-module-submit-button">Submit</button>
                </div>
            </form>
    
            )}
        </div>
    );
};

export default EmergencyRequest;
