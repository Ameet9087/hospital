/* Mohini_HomeHealthCareModule_HealthMonitoringForm_27/sep/24 */
import React, { useState,useEffect } from 'react';
import './BillingAndInsuranceForm.css';

const HealthMonitoringForm = ({sendMonitorData,MonitorData}) => {
    const [formData, setFormData] = useState({
        observationDate: '',
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        symptomNotes: '',
        medicationAdministered: '',
        doctorComments: ''
    });


    useEffect(()=>{
        if (MonitorData) {
        setFormData({
            observationDate: MonitorData?.observationDate,
            temperature: MonitorData?.temperature,
            bloodPressure: MonitorData?.bloodPressure,
            heartRate: MonitorData?.heartRate,
            symptomNotes: MonitorData?.symptomNotes,
            medicationAdministered: MonitorData?.medicationAdministered,
            doctorComments: MonitorData?.doctorComments
        })
    }

    },[MonitorData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name in formData.vitalSigns) {
            // Update vital signs separately
            setFormData({
                ...formData,
                vitalSigns: {
                    ...formData.vitalSigns,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMonitorData(formData);
        console.log("Health Monitor Data Added ");
    };

    return (
        <form className="billing-and-insurance-form" onSubmit={handleSubmit}>
            <div className="billing-and-insurance-left">
                {/* Left Side Inputs */}
                {/* <div className="billing-and-insurance-group">
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
                <div className="billing-and-insurance-group">
                    <label>Observation Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="observationDate"
                        value={formData.observationDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Temperature (°C) <span className="mandatory">*</span></label>
                    <input
                        type="number"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleInputChange}
                        placeholder="Temperature"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Blood Pressure (mmHg) <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="bloodPressure"
                        value={formData.bloodPressure}
                        onChange={handleInputChange}
                        placeholder="Blood Pressure"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Heart Rate (bpm) <span className="mandatory">*</span></label>
                    <input
                        type="number"
                        name="heartRate"
                        value={formData.heartRate}
                        onChange={handleInputChange}
                        placeholder="Heart Rate"
                        required
                    />
                </div>
            </div>

            <div className="billing-and-insurance-right">
                {/* Right Side Inputs */}
                <div className="billing-and-insurance-group">
                    <label>Symptom Notes</label>
                    <textarea
                        name="symptomNotes"
                        value={formData.symptomNotes}
                        onChange={handleInputChange}
                        placeholder="Notes on patient's symptoms"
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Medication Administered</label>
                    <textarea
                        name="medicationAdministered"
                        value={formData.medicationAdministered}
                        onChange={handleInputChange}
                        placeholder="Details of medication administered"
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Doctor's Comments</label>
                    <textarea
                        name="doctorComments"
                        value={formData.doctorComments}
                        onChange={handleInputChange}
                        placeholder="Doctor's comments"
                    />
                </div>
                <div className="billing-and-insurance-button">
                    <button type="submit" className="billing-and-insurance-submit-btn">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default HealthMonitoringForm;
/* Mohini_HomeHealthCareModule_HealthMonitoringForm_27/sep/24 */
