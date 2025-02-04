import React, { useState } from 'react';
import axios from 'axios';
import './EmergencyRequest.css';
import { API_BASE_URL } from '../../api/api';

const EmergencyRequest = () => {
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            emergencyId: 0, // This can be auto-generated or set by the backend
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
            const response = await axios.post(`${API_BASE_URL}/emergency/create`, formattedData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form className="emergency-request-com-module-form" onSubmit={handleSubmit}>
            <div className="emergency-request-com-module-left">
                {/* Input fields */}
                {/* Patient ID */}
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

                {/* Other fields remain the same */}

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
    );
};

export default EmergencyRequest;
