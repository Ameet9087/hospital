  /* Mohini_ExpiryManagement_DrugExpiryReportingForm_7/10/2024*/
import React, { useState } from 'react';
import './DrugRegistrationForm.css';

const DrugExpiryReportingForm = () => {
    const [formData, setFormData] = useState({
        reportType: '',
        startDate: '',
        endDate: '',
        drugCategory: '',
        supplier: '',
        includeStockQuantity: false,
        exportOption: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
    };

    return (
        <form className="drug-registration-form" onSubmit={handleSubmit}>
            {/* Left side fields */}
            <div className="drug-registration-left">
                <div className="drug-registration-group">
                    <label>Report Type <span className="mandatory">*</span></label>
                    <select
                        name="reportType"
                        value={formData.reportType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Report Type</option>
                        <option value="expiryReport">Expiry Report</option>
                        <option value="stockReport">Stock Report</option>
                    </select>
                </div>
                <div className="drug-registration-group">
                    <label>Start Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="drug-registration-group">
                    <label>End Date <span className="mandatory">*</span></label>
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>

            {/* Right side fields */}
            <div className="drug-registration-right">
                <div className="drug-registration-group">
                    <label>Drug Category <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="drugCategory"
                        value={formData.drugCategory}
                        onChange={handleInputChange}
                        placeholder="Drug Category"
                        required
                    />
                </div>
                <div className="drug-registration-group">
                    <label>Supplier <span className="mandatory">*</span></label>
                    <input
                        type="text"
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleInputChange}
                        placeholder="Supplier"
                        required
                    />
                </div>
               
                <div className="drug-registration-group">
                    <label>Export Option <span className="mandatory">*</span></label>
                    <select
                        name="exportOption"
                        value={formData.exportOption}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Export Option</option>
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                    </select>
                </div>
                <div className="drug-registration-group-checkbox">
                    <label>
                    Include Stock Quantity  
                        <input
                            type="checkbox"
                            name="includeStockQuantity"
                            checked={formData.includeStockQuantity}
                            onChange={handleInputChange}
                        />
                       
                    </label>
                </div>

                <button type="submit" className="drug-registration-submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default DrugExpiryReportingForm;
  /* Mohini_ExpiryManagement_DrugExpiryReportingForm_7/10/2024*/