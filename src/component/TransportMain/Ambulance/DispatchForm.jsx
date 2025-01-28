import React, { useState, useEffect } from 'react';
import './DispatchForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api/api';
const DispatchForm = ({ patientData }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        patientName: '',
        patientAge: '',
        gender: '',
        transportMode: '',
        contactPersonName: '',
        contactPhoneNumber: '',
        emergencyType: '',
        requestingFacility: '',
        facilityAddress: '',
        pickUpLocation: '',
        destinationLocation: '',
        patientCondition: '',
        specialEquipmentNeeded: '',
        medicationAdministered: '',
        priorityLevel: '',
        additionalNotes: '',
        dispatchDate: '',
        dispatchDateTime: '',
        status: '',
        transportInfoDTO: {
            id: null,
        },
    });

    useEffect(() => {
        if (patientData) {
            setFormData({
                id: patientData?.id || '',
                patientName: patientData?.emergencyRequest?.patientName || '',
                patientAge: patientData?.emergencyRequest?.patientAge || '',
                gender: patientData?.emergencyRequest?.gender || '',
                transportMode: patientData?.modeOfTransport || '',
                contactPersonName: patientData?.emergencyRequest?.contactPersonName || '',
                contactPhoneNumber: patientData?.emergencyRequest?.contactPhoneNumber || '',
                emergencyType: patientData?.emergencyRequest?.emergencyType || '',
                requestingFacility: patientData.requestingFacility || '',
                pickUpLocation: patientData?.fromLocation || '',
                destinationLocation: patientData?.toLocation || '',
                patientCondition: patientData?.emergencyRequest?.patientCondition || '',
                specialEquipmentNeeded: patientData?.emergencyRequest?.specialEquipmentNeeded || '',
                medicationAdministered: patientData?.emergencyRequest?.medicationAdministered || '',
                priorityLevel: patientData.priorityLevel || '',
                additionalNotes: patientData.additionalNotes || '',
                dispatchDate: patientData.dispatchDate || '',
                dispatchDateTime: patientData.dispatchDateTime || '',
                transportStaffAssigned:patientData.transportStaffAssigned || '',

                status: patientData.status || '',
                transportInfoDTO: {
                    id: patientData?.transportInfoDTO?.id || null,
                },
            });
        }
    }, [patientData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            emergencyType: formData.emergencyType,
            patientName: formData.patientName,
            patientLocation: formData.pickUpLocation,
            destination: formData.destinationLocation,
            ambulanceType: formData.transportMode,
            driverName: formData.contactPersonName, // Adjust if the actual field is different
            driverContactNumber: formData.contactPhoneNumber,
            dispatchTime: formData.dispatchDateTime
                ? new Date(formData.dispatchDateTime).toISOString()
                : null,
            estimatedArrivalTime: null, // Update with actual data if available
            priorityLevel: formData.priorityLevel,
            notes: formData.additionalNotes,
            confirmDispatch: "Yes",
            transportInfoDTO: {
                id: formData.id,
            },
        };

        console.log("Formatted Data:", formattedData);

        try {
            const response = await axios.post(`${API_BASE_URL}/dispatch`, formattedData);
            console.log("API Response: ", response.data);
            alert("Dispatch submitted successfully.");
            navigate(-1);
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("Failed to submit dispatch form. Please try again.");
        }
    };

    return (
        <div className='dispatch-form-module-container'>
            <h5>Dispatch Form</h5>
            <form className="dispatch-form-module-com" onSubmit={handleSubmit}>
                <div className="dispatch-form-module-com-left">
                    <div className='first-div-dispatch-form'>
                        <div className="dispatch-form-module-com-group">
                            <label>Transport ID</label>
                            <input type="text" name="id" value={formData.id} onChange={handleInputChange} placeholder=" ID" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Patient Name</label>
                            <input type="text" name="patientName" value={formData.patientName} onChange={handleInputChange} placeholder="Patient Name" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Patient Age</label>
                            <input type="text" name="patientAge" value={formData.patientAge} onChange={handleInputChange} placeholder="Patient Age" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Gender</label>
                            <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Gender" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Emergency Type</label>
                            <input type="text" name="emergencyType" value={formData.emergencyType} onChange={handleInputChange} placeholder="Emergency Type" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Transport Mode</label>
                            <input type="text" name="transportMode" value={formData.transportMode} onChange={handleInputChange} placeholder="Transport Mode" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Transport Staff Assigned</label>
                            <input type="text" name="medicalRecordNumber" value={formData.transportStaffAssigned} onChange={handleInputChange} placeholder="Transport Staff Assigned" readOnly />
                        </div>
                    </div>
                </div>

                <div className="dispatch-form-module-com-right">
                    <div className='second-div-dispatch-form'>
                        <div className="dispatch-form-module-com-group">
                            <label>Contact Person Name</label>
                            <input type="text" name="contactPersonName" value={formData.contactPersonName} onChange={handleInputChange} placeholder="Contact Person Name" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Contact Phone Number</label>
                            <input type="text" name="contactPhoneNumber" value={formData.contactPhoneNumber} onChange={handleInputChange} placeholder="Contact Phone Number" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Pick Up Location</label>
                            <input type="text" name="pickUpLocation" value={formData.pickUpLocation} onChange={handleInputChange} placeholder="Pick Up Location" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Destination Location</label>
                            <input type="text" name="destinationLocation" value={formData.destinationLocation} onChange={handleInputChange} placeholder="Destination Location" readOnly />
                        </div>
                        <div className="dispatch-form-module-com-group">
                            <label>Medication Administered</label>
                            <input type="text" name="medicationAdministered" value={formData.medicationAdministered} onChange={handleInputChange} placeholder="Medication Administered" readOnly />
                        </div>
                    </div>
                    <button type="submit" className="dispatch-form-module-com-submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default DispatchForm;
