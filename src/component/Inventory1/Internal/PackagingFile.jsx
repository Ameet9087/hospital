import React, { useState } from 'react';
import './PackagingFile.css';

const PackagingFile = ({onClose}) => {
  const [packagingTypeName, setPackagingTypeName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new packaging type object
    const newPackagingType = {
      packagingTypeName,
      description,
      isActive: isActive.toString() // Convert boolean to string as in your example JSON
    };

    try {
      // Send POST request to the backend API
      const response = await fetch(`${API_BASE_URL}/packageType/savePackageType`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPackagingType),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success
      alert('Packaging Type added successfully!');
      setPackagingTypeName('');
      setDescription('');
      setIsActive(true);
    } catch (error) {
      // Handle error
      setError('Failed to add Packaging Type: ' + error.message);
    }
  };

  return (
    <div className="pkgingAddItemSubcategory">
      <h2>Add Packaging Type</h2>
      <button className="vendddCloseButton" onClick={onClose}>
          &times;
        </button>
      <form onSubmit={handleSubmit}>
        <div className="pkgingFormGroup">
          <label>Packaging Type Name<span className="pkgingRequired">*</span></label>
          <input
            type="text"
            placeholder="Packaging Type Name"
            value={packagingTypeName}
            onChange={(e) => setPackagingTypeName(e.target.value)}
            required
          />
        </div>
       
        <div className="pkgingFormGroup">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
     
        <div className="pkgingFormGroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        
        {error && <p className="pkgingError">{error}</p>}
        
        <button type="submit" className="pkgingBtnAdd">Add Packaging Type</button>
      </form>
    </div>
  );
}

export default PackagingFile;

