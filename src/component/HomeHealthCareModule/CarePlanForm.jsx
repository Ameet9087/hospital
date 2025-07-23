/* Mohini_HomeHealthCareModule_CarePlanForm_27/sep/24 */
import React, { useState,useEffect } from 'react';
import './BillingAndInsuranceForm.css';

const CarePlanForm = ({sendCarePlanData,carePlanData}) => {
    const [formData, setFormData] = useState({
        carePlanID: '',
        caregiverName: '',
        startDate: '',
        endDate: '',
        medicalConditions: '',
        servicesRequired: '',
        frequencyOfVisits: '',
        emergencyInstructions: ''
    });

    useEffect(()=>{
        setFormData({
            carePlanID: carePlanData?.carePlanID,
        caregiverName:  carePlanData?.caregiverName,
        startDate:  carePlanData?.startDate,
        endDate:  carePlanData?.endDate,
        medicalConditions:  carePlanData?.medicalConditions,
        servicesRequired:  carePlanData?.servicesRequired,
        frequencyOfVisits:  carePlanData?.frequencyOfVisits,
        emergencyInstructions:  carePlanData?.emergencyInstructions,
        })
    },[carePlanData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendCarePlanData(formData);
        alert("Care plan Data Added Successfully");
        console.log("Care plan Data Added Successfully");
    };

    return (
        <form className="billing-and-insurance-form" onSubmit={handleSubmit}>
            <div className="billing-and-insurance-left">
                {/* Left Side Inputs */}
                {/* <div className="billing-and-insurance-group">
                    <label>Care Plan ID <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="carePlanID"
                        value={formData.carePlanID}
                        onChange={handleInputChange}
                        placeholder="Care Plan ID"
                        required
                    />
                </div> */}
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
                    <label>Caregiver Name <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="caregiverName"
                        value={formData.caregiverName}
                        onChange={handleInputChange}
                        placeholder="Caregiver Name"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Start Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>End Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Medical Conditions <span className="mandatory">*</span></label>
                    <textarea
                        name="medicalConditions"
                        value={formData.medicalConditions}
                        onChange={handleInputChange}
                        placeholder="List any medical conditions"
                        required
                    />
                </div>
            </div>

            <div className="billing-and-insurance-right">
                {/* Right Side Inputs */}
               
                <div className="billing-and-insurance-group">
                    <label>Services Required <span className="mandatory">*</span></label>
                    <textarea
                        name="servicesRequired"
                        value={formData.servicesRequired}
                        onChange={handleInputChange}
                        placeholder="Services Required"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Frequency of Visits <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="frequencyOfVisits"
                        value={formData.frequencyOfVisits}
                        onChange={handleInputChange}
                        placeholder="e.g., Weekly, Daily"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Emergency Instructions <span className="mandatory">*</span></label>
                    <textarea
                        name="emergencyInstructions"
                        value={formData.emergencyInstructions}
                        onChange={handleInputChange}
                        placeholder="Emergency Instructions"
                        required
                    />
                </div>
                <div className='billing-and-insurance-button'>
                    <button type="submit" className="billing-and-insurance-submit-btn">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default CarePlanForm;
/* Mohini_HomeHealthCareModule_CarePlanForm_27/sep/24 */
