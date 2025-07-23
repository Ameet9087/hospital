import React, { useState } from 'react';
import axios from 'axios';
import './UpdateUnitOfMeasurement.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const UpdateUnitOfMeasurement = ({ unit, closeModal }) => {
  console.log(unit);
  
  const [formData, setFormData] = useState({
    name: unit.name || '',
    description: unit.description || '',
    isActive: unit.isActive || false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`${API_BASE_URL}/unitofmeasurement/update/${unit.id}`, formData);
  //     alert('Unit of Measurement updated successfully!');
  //     closeModal(); // Close the modal after successful update
  //   } catch (error) {
  //     console.error('Error updating unit of measurement:', error);
  //     alert('Failed to update Unit of Measurement. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const unitId = unit?.unitOfMeasurementId || unit?.id; // Ensure correct ID property
    if (!unitId) {
      toast.error("Error: Unit ID is undefined!");
      return;
    }
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/unitofmeasurement/update/${unitId}`, 
        formData
      );
      if (response.status === 200) {
        toast.success("Unit of Measurement updated successfully!");
        closeModal(); // Close modal on success
      }
    } catch (error) {
      console.error("Error updating unit of measurement:", error);
      toast.error("Failed to update Unit of Measurement. Please try again.");
    }
  };
  
  return (
    <div className="AddUnitOfMeasurement-model">
      <h2>Update Unit of Measurement</h2>
      <form className="AddUnitOfMeasurement-form" onSubmit={handleSubmit}>
        <div className="AddUnitOfMeasurement-formgroup">
          <FloatingInput
          label={"Unit of Measurement Name"}
          type="text"
          name="name"
          placeholder="Unit of Measurement Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          />
        
        </div>

        <div className="AddUnitOfMeasurement-formgroup">
          <FloatingInput
          label={"Description"}
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
            name="isActive"
            checked={formData.isActive}
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
