import React, { useState } from 'react';
import axios from 'axios';
import './AddCurrency.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput,FloatingSelect } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const AddCurrency = ({onClose}) => {
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
     // Validate all fields
  if (!formData.currencyCode?.trim() || !formData.description?.trim()) {
    toast.error("Please fill in all required fields.");
    return;
  }

    try {
      const response = await axios.post(`${API_BASE_URL}/currency-codes`, formData);
      console.log('Currency added successfully:', response.data);
      toast.success('Proposal saved successfully!');

      onClose();
      setFormData({ currencyCode: '', description: '', active: true });
    } catch (error) {
      console.error('Error adding currency:', error);
      toast.error('Failed to save proposal. Please try again.');

    }
  };

  return (
    <div className='AddCurrency-model'>
      <h2 className='AddCurrency-heading'>Add Currency</h2>
      <form onSubmit={handleSubmit}>
        <div className='AddCurrency-form-group'>
          <FloatingInput
          label={"Currency Code"}
          type="text"
          name="currencyCode"
          value={formData.currencyCode}
          onChange={handleInputChange}
          placeholder="NPR"
          required
          />
        
        </div>

        <div  className='AddCurrency-form-group'>
          <FloatingInput
          label={"Description"}
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
