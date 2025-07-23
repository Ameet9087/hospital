import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import './UpdateCurrency.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const UpdateCurrency = ({ currency, onClose }) => {
  const [currencyCode, setCurrencyCode] = useState(currency.currencyCode || '');
  const [description, setDescription] = useState(currency.description || '');
  const [isActive, setIsActive] = useState(currency.isActive || false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create an object with updated data
      const updatedCurrency = {
        currencyCode,
        description,
        isActive,
      };

      // Axios call to update the currency
      const response = await axios.put(
        `${API_BASE_URL}/currency-codes/${currency.currencyId}`,
        updatedCurrency
      );

      if (response.status === 200) {
        console.log("Currency Added Successfully");
        toast.success('Proposal saved successfully!');

        onClose();
      }
    } catch (error) {
      console.error('Error updating currency:', error);
      toast.error('Failed to save proposal. Please try again.');

    }
  };

  return (
    <div className="AddCurrency-model">
      <h2 className='AddCurrency-heading'>Update Currency</h2>
      <form onSubmit={handleSubmit}>
        <div className="AddCurrency-form-group">
          <FloatingInput
           label={" Currency Code"}
           type="text"
           value={currencyCode}
           onChange={(e) => setCurrencyCode(e.target.value)}
           required
          />
         
        </div>

        <div className="AddCurrency-form-group">
          <FloatingInput
          label={"Description"}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        
        </div>

        <div className="AddCurrency-form-group-checkbox">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>

        <button type="submit" className="MeasssBtnAdd">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCurrency;
