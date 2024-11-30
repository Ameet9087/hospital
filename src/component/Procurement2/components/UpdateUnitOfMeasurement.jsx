import React, { useState } from 'react';
import axios from 'axios';
import './UpdateUnitOfMeasurement.css';
import { API_BASE_URL } from '../../api/api';

const UpdateUnitOfMeasurement = ({ unit, closeModal }) => {
  console.log(unit);
  
  const [formData, setFormData] = useState({
    unitOfMeasurementName: unit.unitOfMeasurementName || '',
    description: unit.description || '',
    active: unit.active || false,
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
    try {
      const response = await axios.put(`${API_BASE_URL}/unitofmeasurement/update/${unit.id}`, formData);
      alert('Unit of Measurement updated successfully!');
      closeModal(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating unit of measurement:', error);
      alert('Failed to update Unit of Measurement. Please try again.');
    }
  };

  return (
    <div className="AddUnitOfMeasurement-model">
      <h2>Update Unit of Measurement</h2>
      <form className="AddUnitOfMeasurement-form" onSubmit={handleSubmit}>
        <div className="AddUnitOfMeasurement-formgroup">
          <label>
            Unit of Measurement Name<span className="MeasssRequired">*</span>
          </label>
          <input
            type="text"
            name="unitOfMeasurementName"
            placeholder="Unit of Measurement Name"
            value={formData.unitOfMeasurementName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="AddUnitOfMeasurement-formgroup">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="AddUnitOfMeasurement-formgroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="MeasssBtnAdd">
          Update Unit of Measurement
        </button>
      </form>
    </div>
  );
};

export default UpdateUnitOfMeasurement;
