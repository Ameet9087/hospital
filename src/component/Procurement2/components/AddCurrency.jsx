import React, { useState } from 'react';
import axios from 'axios';
import './AddCurrency.css';
import { API_BASE_URL } from '../../api/api';

const AddCurrency = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    currencyCode: '',
    description: '',
    isActive: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/currency-codes`, formData);
      console.log('Currency added successfully:', response.data);
      // Clear form or show success message if needed
      setFormData({ currencyCode: '', description: '', active: true });
    } catch (error) {
      console.error('Error adding currency:', error);
    }
  };

  return (
    <div className='AddCurrency-model'>
      <h2 className='AddCurrency-heading'>Add Currency</h2>
      <form onSubmit={handleSubmit}>
        <div className='AddCurrency-form-group'>
          <label>Currency Code<span className="MeasssRequired">*</span></label>
          <input
            type="text"
            name="currencyCode"
            value={formData.currencyCode}
            onChange={handleInputChange}
            placeholder="NPR"
            required
          />
        </div>

        <div  className='AddCurrency-form-group'>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>

        <div className='AddCurrency-form-group-checkbox'>
          <label>Is Active
            </label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit" className="MeasssBtnAdd">Add</button>
      </form>
    </div>
  );
};

export default AddCurrency;
