/* Mohini_HomeHealthCareModule_VisitSchedulingForm_27/sep/24 */
import React, { useState,useEffect } from 'react';
import './BillingAndInsuranceForm.css';

const VisitSchedulingForm = ({sendVisitData,VisitData}) => {
    const [formData, setFormData] = useState({
   
        caregiverAssigned: '',
        visitDateTime: '',
        typeOfVisit: '',
        notesFromPreviousVisits: ''
    });

    useEffect(()=>{
        setFormData({
            caregiverAssigned: VisitData?.caregiverAssigned,
            visitDateTime: VisitData?.typeOfVisit,
            typeOfVisit:VisitData?.typeOfVisit,
            notesFromPreviousVisits:VisitData?.notesFromPreviousVisits
        })
    },[VisitData])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendVisitData(formData);
        alert("Visit Schedule Added Successfully");
        console.log("Visit Schedule Added Successfully");
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
                    <label>Caregiver Assigned <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="caregiverAssigned"
                        value={formData.caregiverAssigned}
                        onChange={handleInputChange}
                        placeholder="Caregiver Name"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Visit Date & Time <span className="mandatory">*</span></label>
                    <input
                        type="datetime-local"
                        name="visitDateTime"
                        value={formData.visitDateTime}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Type of Visit <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="typeOfVisit"
                        value={formData.typeOfVisit}
                        onChange={handleInputChange}
                        placeholder="Type of Visit"
                        required
                    />
                </div>
            </div>

            <div className="billing-and-insurance-right">
                {/* Right Side Inputs */}
                <div className="billing-and-insurance-group">
                    <label>Notes from Previous Visits</label>
                    <textarea
                        name="notesFromPreviousVisits"
                        value={formData.notesFromPreviousVisits}
                        onChange={handleInputChange}
                        placeholder="Notes from Previous Visits"
                    />
                </div>
                <div className='billing-and-insurance-button'>
                    <button type="submit" className="billing-and-insurance-submit-btn">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default VisitSchedulingForm;
/* Mohini_HomeHealthCareModule_VisitSchedulingForm_27/sep/24 */
