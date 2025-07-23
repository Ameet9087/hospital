import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './DrugRegistrationForm.css';

const DrugInventoryManagementForm = () => {
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
        supplierName: 'Supplier' // Optional field, can be set to null
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
            drugsId: 4, // Assuming this is static; otherwise manage its generation
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
            supplierName: formData.supplierName // Can be null
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
                    <label>Price Per Unit <span className="mandatory">*</span></label>
                    <input
                        type="number"
                        name="pricePerUnit"
                        value={formData.pricePerUnit}
                        onChange={handleInputChange}
                        placeholder="Price Per Unit"
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
                    <label>Storage Condition <span className="mandatory">*</span></label>
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
                    <label>Supplier Name</label>
                    <input
                        type="text"
                        name="supplierName"
                        value={formData.supplierName || ''}
                        onChange={handleInputChange}
                        placeholder="Supplier Name"
                    />
                </div>
                <button type="submit" className="drug-registration-submit-btn">Submit</button>
            </div>
        </form>
    );
};

export default DrugInventoryManagementForm;
