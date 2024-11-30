import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import './AddPackagingType.css';
import { API_BASE_URL } from '../../api/api';

const UpdatePackagingType = ({ packagingType, onClose }) => {
  console.log(packagingType);
    
  const [name, setName] = useState(packagingType.packagingTypeName || '');
  const [description, setDescription] = useState(packagingType.description || '');
  const [isActive, setIsActive] = useState(packagingType.isActive || false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create an object with the updated packaging type data
      const updatedPackagingType = {
        packagingTypeName:name,
        description,
        isActive,
      };
      console.log(updatedPackagingType);
      
      const response = await axios.put(
        `${API_BASE_URL}/packageType/updatePackageType/${packagingType.id}`,
        updatedPackagingType
      );

      if (response.status === 200) {
        alert('Packaging type updated successfully!');
        onClose(); // Close the modal after successful update
      }
    } catch (error) {
      console.error('Error updating packaging type:', error);
    }
  };

  return (
    <div className="AddPackagingType-model">
      <h2>Update Packaging Type</h2>
      <form onSubmit={handleSubmit} className='AddPackagingType-form'>
        <div className="AddPackagingType-formgroup">
          <label>
            Packaging Type Name<span className="MeasssRequired">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Some Packaging Type"
          />
        </div>

        <div className="AddPackagingType-formgroup">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div className="AddPackagingType-formgroup">
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

export default UpdatePackagingType;

