/* Mohini_AddSupplierForm_WholePage_14/sep/2024 */
import React, { useState } from 'react';
import axios from 'axios';
import './AddSupplierForm.css';
import { API_BASE_URL } from '../api/api';
const AddSupplierForm = ({ onClose }) => {
   const [formData, setFormData] = useState({
    name: '',
    description: '',
    creditPeriod: '',
    contactAddress: '',
    email: '',
    contactNumber: '',
    city: '',
    kraPin: '',
    dda: '', // Initialize as an empty string
    additionalContact: '',
    isActive: false,
    isLedgerRequired: false,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value || '', // Ensure value is never undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/suppliers`, 
        formData, 
        {
          headers: {
            'Content-Type': 'application/json' // Specify content type
          }
        }
      );
      console.log('Response:', response); // Log the response
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
      onClose();
    } catch (error) {
      console.error('Error saving supplier data:', error);
      alert('Error saving data. Please try again.');
    }
  };
  
  console.log("Form Data "+formData);



  return (
    <div className="add-supplier-form-modal-form">
      <div className="add-supplier-form-add-supplier-modal-content">
        <button className="add-supplier-form-add-supplier-close-btn" onClick={onClose}>+</button>
        <h2>Add Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="add-supplier-form-form-group">
            <label>Supplier Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Supplier"
            />
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Description"
            />
          </div>
          
          <div className="add-supplier-form-form-group">
            <label>Credit Period:</label>
            <input
              type="text"
              name="creditPeriod"
              value={formData.creditPeriod}
              onChange={handleChange}
              placeholder="Enter Credit Period"
            />
            <label>Contact Address:</label>
            <input
              type="text"
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleChange}
              placeholder="Enter Contact Address"
            />
          </div>
          
          <div className="add-supplier-form-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter Contact Number"
            />
          </div>
      
          <div className="add-supplier-form-form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter City"
            />
            <label>KRA PIN:</label>
            <input
              type="text"
              name="kraPin"
              value={formData.kraPin}
              onChange={handleChange}
              placeholder="Enter KRA PIN"
            />
          </div>
          
          <div className="add-supplier-form-form-group">
             <label>DDA:</label>
            <input
              type="text"
              name="dda"
              value={formData.dda || ''} // Ensure value is never undefined
              onChange={handleChange}
              placeholder="Enter DDA"
            />
            <label>Additional Contact Information:</label>
            <input
              type="text"
              name="additionalContact"
              value={formData.additionalContact}
              onChange={handleChange}
              placeholder="Enter Additional Contact Information"
            />
          </div>
         
          <div className="add-supplier-form-form-group">
            <label>Is Active:</label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <label>Is Ledger Required:</label>
            <input
              type="checkbox"
              name="isLedgerRequired"
              checked={formData.isLedgerRequired}
              onChange={handleChange}
            />
          </div>
       
          <button type="submit" onClick={handleSubmit} className="add-supplier-form-save-btn">Save</button>
        </form>
        {showSuccessMessage && (
          <div className="add-supplier-form-success-message">
            Data saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSupplierForm;
/* Mohini_AddSupplierForm_WholePage_14/sep/2024 */
