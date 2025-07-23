import React, { useState } from 'react';
import './AddPackagingType.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const AddPackagingType = ({onclose}) => {
  const [packagingTypeName, setPackagingTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
 // Validate all fields
 if (!packagingTypeName?.trim() || !description?.trim()) {
  toast.error("Please fill in all required fields.");
  return;
}
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
      toast.success('Packaging Type added successfully!');
      // alert('Packaging Type added successfully!');
      setPackagingTypeName('');
      setDescription('');
      setIsActive(true);
      // onclose();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('There was a problem with the fetch operation:', error);
      
    }
  };

  return (
    <div className="AddPackagingType-model">
      <h2>Add Packaging Type</h2>
      <form onSubmit={handleSubmit} className='AddPackagingType-form'>
        <div  className='AddPackagingType-formgroup'>
          <FloatingInput
          label={"Packaging Type Name"}
          type="text"
          placeholder="Packaging Type Name"
          value={packagingTypeName}
          onChange={(e) => setPackagingTypeName(e.target.value)}
          required
          />
         
        </div>
       
        <div className='AddPackagingType-formgroup'>
          <FloatingInput
          label={"Description"}
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

