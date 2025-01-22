import React, { useState } from 'react';
import './AddPackagingType.css';
import { API_BASE_URL } from '../../api/api';

const AddPackagingType = ({onclose}) => {
  const [packagingTypeName, setPackagingTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const packagingType = {
      packagingTypeName,
      description,
      isActive
    };

    try {
      const response = await fetch(`${API_BASE_URL}/packageType/savePackageType`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packagingType),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Packaging Type added successfully!');
      setPackagingTypeName('');
      setDescription('');
      setIsActive(true);
      onclose();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="AddPackagingType-model">
      <h2>Add Packaging Type</h2>
      <form onSubmit={handleSubmit} className='AddPackagingType-form'>
        <div  className='AddPackagingType-formgroup'>
          <label>Packaging Type Name<span className="MeasssRequired">*</span></label>
          <input
            type="text"
            placeholder="Packaging Type Name"
            value={packagingTypeName}
            onChange={(e) => setPackagingTypeName(e.target.value)}
            required
          />
        </div>
       
        <div className='AddPackagingType-formgroup'>
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
       
        <div className='AddPackagingType-formgroup'>
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        <button type="submit" className="MeasssBtnAdd">Add Packaging Type</button>
      </form>
    </div>
  );
}

export default AddPackagingType;

