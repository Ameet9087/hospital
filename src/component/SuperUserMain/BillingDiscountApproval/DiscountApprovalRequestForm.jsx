/* Mohini_DiscountApprovalRequestForm_WholePage_27/sep/24 */
import React, { useState } from 'react';
import './DiscountApprovalRequestForm.css';

const DiscountApprovalRequest = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        patientName: '',
        invoiceNumber: '',
        totalAmount: '',
        requestedDiscountPercentage: '',
        requestedDiscountAmount: '',
        reasonForDiscount: '',
        requestDate: '',
        staffName: '',
        staffId: '',
        
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <form className="discount-approval-request-form" onSubmit={handleSubmit}>
            <div className="discount-approval-request-form-left">
                {/* Left Side Inputs */}
                <div className="discount-approval-request-form-group">
                    <label>Patient ID <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleInputChange}
                        placeholder="Patient ID"
                        required
                    />
                </div>
                <div className="discount-approval-request-form-group">
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
                <div className="discount-approval-request-form-group">
                    <label>Invoice Number <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleInputChange}
                        placeholder="Invoice Number"
                        required
                    />
                </div>
                <div className="discount-approval-request-form-group">
                    <label>Total Amount <span className="mandatory">*</span></label>
                    <input
                        type="number"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleInputChange}
                        placeholder="Total Amount"
                        required
                    />
                </div>
                <div className="discount-approval-request-form-group">
                    <label>Requested Discount Percentage <span className="mandatory">*</span></label>
                    <input
                        type="number"
                        name="requestedDiscountPercentage"
                        value={formData.requestedDiscountPercentage}
                        onChange={handleInputChange}
                        placeholder="Requested Discount Percentage"
                        required
                    />
                </div>
               
            </div>
            <div className="discount-approval-request-form-right">
                {/* Right Side Inputs */}
                <div className="discount-approval-request-form-group">
                    <label>Requested Discount Amount <span className="mandatory">*</span></label>
                    <input
                        type="number"
                        name="requestedDiscountAmount"
                        value={formData.requestedDiscountAmount}
                        onChange={handleInputChange}
                        placeholder="Requested Discount Amount"
                        required
                    />
                </div>
                <div className="discount-approval-request-form-group">
                    <label>Reason for Discount <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="reasonForDiscount"
                        value={formData.reasonForDiscount}
                        onChange={handleInputChange}
                        placeholder="Reason for Discount"
                        required
                    />
                </div>
                <div className="discount-approval-request-form-group">
                    <label>Request Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="requestDate"
                        value={formData.requestDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="discount-approval-request-form-group">
                    <label>Staff Name <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="staffName"
                        value={formData.staffName}
                        onChange={handleInputChange}
                        placeholder="Staff Name"
                        required
                    />
                </div>
                <div className="discount-approval-request-form-group">
                    <label>Staff ID <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="staffId"
                        value={formData.staffId}
                        onChange={handleInputChange}
                        placeholder="Staff ID"
                        required
                    />
                </div>
                <div className='discount-approval-request-form-button'>
                    <button type="submit" className="discount-approval-request-form-submit-btn">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default DiscountApprovalRequest;
/* Mohini_DiscountApprovalRequestForm_WholePage_27/sep/24 */
