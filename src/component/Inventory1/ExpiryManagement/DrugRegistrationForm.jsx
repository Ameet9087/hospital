  /* Mohini_ExpiryManagement_DrugRegistrationForm_7/10/2024*/
import React, { useState } from 'react';
import './DrugRegistrationForm.css';
import axios from 'axios';

const DrugRegistrationForm = () => {
    const [formData, setFormData] = useState({
        drugName: '',
        drugCode: '',
        drugCategory: '', // You may want to provide options for this in a dropdown
        manufacturer: '',
        dosageForm: '',
        strength: '',
        pricePerUnit: '',
        purchaseDate: '',
        expiryDate: '',
        storageCondition: '',
        supplierName: 'Supplier',
        quantity:''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data to match the API requirements
        const drugData = {
            
            drugName: formData.drugName,
            drugCode: formData.drugCode,
            drugCategory: formData.drugCategory,
            manufacturer: formData.manufacturer,
            dosageForm: formData.dosageForm,
            strength: formData.strength,
            pricePerUnit: parseFloat(formData.pricePerUnit), // Convert to number
            purchaseDate: formData.purchaseDate,
            expiryDate: formData.expiryDate,
            storageCondition: formData.storageCondition,
            supplierName: formData.supplierName,
            quantity:formData.quantity
        };

        try {
            const response = await axios.post('http://localhost:8000/api/drugs/addDrugs', drugData);
            alert("Data Added Successfully");
            console.log("Response:", response.data);
           
            // Handle successful response (e.g., reset form, show success message)
        } catch (error) {
            console.error("Error submitting form data:", error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <form className="drug-registration-form" onSubmit={handleSubmit}>
        {/* Left side fields */}
        <div className="drug-registration-left">
            <div className="drug-registration-group">
                <label>Drug Name <span className="mandatory">*</span></label>
                <input
                    type="text"
                    name="drugName"
                    value={formData.drugName}
                    onChange={handleInputChange}
                    placeholder="Drug Name"
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Drug Code <span className="mandatory">*</span></label>
                <input
                    type="text"
                    name="drugCode"
                    value={formData.drugCode}
                    onChange={handleInputChange}
                    placeholder="Drug Code"
                    required
                />
            </div>
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
                <label>Manufacturer <span className="mandatory">*</span></label>
                <input
                    type="text"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleInputChange}
                    placeholder="Manufacturer"
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Batch Number <span className="mandatory">*</span></label>
                <input
                    type="text"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    placeholder="Batch Number"
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Dosage Form <span className="mandatory">*</span></label>
                <input
                    type="text"
                    name="dosageForm"
                    value={formData.dosageForm}
                    onChange={handleInputChange}
                    placeholder="Dosage Form"
                    required
                />
            </div>
        </div>
    
        {/* Right side fields */}
        <div className="drug-registration-right">
            <div className="drug-registration-group">
                <label>Strength <span className="mandatory">*</span></label>
                <input
                    type="text"
                    name="strength"
                    value={formData.strength}
                    onChange={handleInputChange}
                    placeholder="Strength"
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Quantity <span className="mandatory">*</span></label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Purchase Date <span className="mandatory">*</span></label>
                <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Expiry Date <span className="mandatory">*</span></label>
                <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Storage Condition</label>
                <input
                    type="text"
                    name="storageCondition"
                    value={formData.storageCondition}
                    onChange={handleInputChange}
                    placeholder="Storage Condition"
                    required
                />
            </div>
            <div className="drug-registration-group">
                <label>Supplier Name <span className="mandatory">*</span></label>
                <input
                    type="text"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleInputChange}
                    placeholder="Supplier Name"
                    required
                />
            </div>
            <button type="submit" className="drug-registration-submit-btn">Submit</button>

        </div>
    
        {/* Submit button */}
    </form>
    
    );
};

export default DrugRegistrationForm;
  /* Mohini_ExpiryManagement_DrugRegistrationForm_7/10/2024*/