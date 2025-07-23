import React, { useState } from 'react';
import './AddItemSubCategory.css';

const AddItemSubCategory = ({onClose}) => {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [itemSubCategoryName, setItemSubCategoryName] = useState('');
  const [subCategoryCode, setSubCategoryCode] = useState('');
  const [accountingLedger, setAccountingLedger] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSubCategory = {
      subCategoryName,
      itemSubCategoryName,
      subCategoryCode,
      accountingLedger,
      description,
      category,
      isActive
    };

    try {
      const response = await fetch(`${API_BASE_URL}/subcategories/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSubCategory),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success
      setSuccess('SubCategory added successfully!');
      // Reset form fields
      setSubCategoryName('');
      setItemSubCategoryName('');
      setSubCategoryCode('');
      setAccountingLedger('');
      setDescription('');
      setCategory('');
      setIsActive(true);
    } catch (error) {
      // Handle error
      setError('Failed to add SubCategory: ' + error.message);
    }
  };

  return (
    <div className="goryAddItemSubcategory">
      <h2>Add Item SubCategory</h2>
      <button className="vendddCloseButton" onClick={onClose}>
          &times;
        </button>
      <form onSubmit={handleSubmit}>
        <div className="goryFormGroup">
          <label>SubCategory Name<span className="goryRequired">*</span></label>
          <input
            type="text"
            placeholder="ItemSubCategory Name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="goryFormGroup">
          <label>SubCategory Code</label>
          <input
            type="text"
            placeholder="Code"
            value={subCategoryCode}
            onChange={(e) => setSubCategoryCode(e.target.value)}
          />
        </div>
        <div className="goryFormGroup">
          <label>Accounting Ledger</label>
          <select
            value={accountingLedger}
            onChange={(e) => setAccountingLedger(e.target.value)}
          >
            <option value="">-- Select Ledger --</option>
            <option value="Pharmacy Ledger">Pharmacy Ledger</option>
          </select>
          <a href="#" className="goryCreateLedger">Create new ledger for SubCategory</a>
        </div>
        <div className="goryFormGroup">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="goryFormGroup">
          <label>Category<span className="goryRequired">*</span></label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">--select--</option>
            <option value="Consumable">Consumable</option>
            <option value="Capital">Capital</option>
          </select>
        </div>
        <div className="goryFormGroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>
        
        {error && <p className="goryError">{error}</p>}
        {success && <p className="gorySuccess">{success}</p>}
        
        <button type="submit" className="goryBtnAdd">Add ItemSubCategory</button>
      </form>
    </div>
  );
}

export default AddItemSubCategory;
