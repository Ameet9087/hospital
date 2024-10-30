/* Mohini_HomeHealthCareModule_BillingAndInsurance_27/sep/24 */
import React, { useState,useEffect } from 'react';
import jsPDF from 'jspdf';
import './BillingAndInsuranceForm.css';

const BillingAndInsuranceForm = ({sendBillingInsurance, billingandInsuranceData}) => {
    const [formData, setFormData] = useState({
        serviceType: '',
        dateOfService: '',
        costOfService: '',
        insuranceProvider: '',
        claimStatus: '',
    });

    useEffect(() => {
        if (billingandInsuranceData) {
            setFormData({
                serviceType: billingandInsuranceData.serviceType || '',
                dateOfService: billingandInsuranceData.dateOfService || '',
                costOfService: billingandInsuranceData.costOfService || '',
                insuranceProvider: billingandInsuranceData.insuranceProvider || '',
                claimStatus: billingandInsuranceData.claimStatus || '',
            });
        }
    }, [billingandInsuranceData]);
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendBillingInsurance(formData);
        alert('Billing Data Added');
        console.log("Billing Data Added ", formData);
    };

    // Function to handle PDF generation
    const handleGeneratePDF = () => {
        const doc = new jsPDF();

        // Add text and form data to the PDF
        doc.text("Billing and Insurance Form", 10, 10);
        doc.text(`Patient ID: ${formData.patientID}`, 10, 20);
        doc.text(`Service Type: ${formData.serviceType}`, 10, 30);
        doc.text(`Date of Service: ${formData.dateOfService}`, 10, 40);
        doc.text(`Cost of Service: ${formData.costOfService}`, 10, 50);
        doc.text(`Insurance Provider: ${formData.insuranceProvider}`, 10, 60);
        doc.text(`Claim Status: ${formData.claimStatus}`, 10, 70);

        // Save the PDF
        doc.save('billing_and_insurance_form.pdf');
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
                    <label>Service Type <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        placeholder="Service Type"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Date of Service <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="dateOfService"
                        value={formData.dateOfService}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Cost of Service <span className="mandatory">*</span></label>
                    <input
                        type="number"
                        name="costOfService"
                        value={formData.costOfService}
                        onChange={handleInputChange}
                        placeholder="Cost of Service"
                        required
                    />
                </div>
                <div className="billing-and-insurance-group">
                    <label>Insurance Provider </label>
                    <input
                        type="text"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleInputChange}
                        placeholder="Insurance Provider"
                        required
                    />
                </div>
            </div>

            <div className="billing-and-insurance-right">
                <div className="billing-and-insurance-group">
                    <label>Claim Status </label>
                    <input
                        type="text"
                        name="claimStatus"
                        value={formData.claimStatus}
                        onChange={handleInputChange} // Allow editing
                        placeholder="Claim Status"
                    />
                </div>
                <div className='billing-and-insurance-button'>
                    <button type="submit" className="billing-and-insurance-submit-btn">Submit</button>
                    <button 
                        type="button" 
                        className="billing-and-insurance-submit-btn"
                        onClick={handleGeneratePDF} // Call the function on click
                    >
                        Generate PDF
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BillingAndInsuranceForm;
/* Mohini_HomeHealthCareModule_BillingAndInsurance_27/sep/24 */
