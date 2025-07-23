/* Mohini_HomeHealthCareModule_MedicationManagementForm_27/sep/24 */
import React, { useState,useEffect } from 'react';
import './MedicationManagementForm.css';

const MedicationManagementForm = ({sendMedicationData,medicationData}) => {
    const [formData, setFormData] = useState({
       
        medicationName: '',
        dosage: '',
        frequency: '',
        startDate: '',
        endDate: '',
        administeredBy: '',
        notes: '',
    });

    useEffect(()=>{
        setFormData({
            medicationName: medicationData?.medicationName,
        dosage:medicationData?.dosage,
        frequency:medicationData?.frequency,
        startDate:medicationData?.startDate,
        endDate: medicationData?.endDate,
        administeredBy:medicationData?.administeredBy,
        notes:medicationData?.notes,
        })
    },[medicationData])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendMedicationData(formData);
        alert("Medication Data Added successfully" );
        console.log("Medication Data Added successfully" );
    };

    return (
        <form className="medication-management-form" onSubmit={handleSubmit}>
            <div className="medication-management-left">
                {/* <div className="medication-management-group">
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
                <div className="medication-management-group">
                    <label>Medication Name <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="medicationName"
                        value={formData.medicationName}
                        onChange={handleInputChange}
                        placeholder="Medication Name"
                        required
                    />
                </div>
                <div className="medication-management-group">
                    <label>Dosage <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="dosage"
                        value={formData.dosage}
                        onChange={handleInputChange}
                        placeholder="Dosage"
                        required
                    />
                </div>
                <div className="medication-management-group">
                    <label>Frequency <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleInputChange}
                        placeholder="Frequency (e.g., 2 times/day)"
                        required
                    />
                </div>
            </div>

            <div className="medication-management-right">
                <div className="medication-management-group">
                    <label>Start Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="medication-management-group">
                    <label>End Date</label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="medication-management-group">
                    <label>Administered By <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="administeredBy"
                        value={formData.administeredBy}
                        onChange={handleInputChange}
                        placeholder="Administered By"
                        required
                    />
                </div>
                <div className="medication-management-group">
                    <label>Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Additional Notes"
                    />
                </div>
            </div>
            
            <div className='medication-management-button'>
                <button type="submit" className="medication-management-submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default MedicationManagementForm;
/* Mohini_HomeHealthCareModule_MedicationManagementForm_27/sep/24 */
