import React, { useState } from 'react';
import './AddItemSubCategory.css';
import { API_BASE_URL } from '../../api/api';


const AddItemSubCategory = ({onClose}) => {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [itemSubCategoryName, setItemSubCategoryName] = useState('');
  const [subCategoryCode, setSubCategoryCode] = useState('');
  const [accountingLedger, setAccountingLedger] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [active, setActive] = useState(true);
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
      active
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
      setActive(true);
    } catch (error) {
      // Handle error
      setError('Failed to add SubCategory: ' + error.message);
    }
  };

  return (
    <div className="ItemSub-AddItemSubcategory">
      <h2>Add Item SubCategory</h2>
    
      <form onSubmit={handleSubmit} className='AddItemSubcategory-form'>
        <div className="AddItemSubcategoryFormGroup">
          <label>SubCategory Name<span className="goryRequired">*</span></label>
          <input
            type="text"
            placeholder="ItemSubCategory Name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            required
          />
        </div>
        <div className="AddItemSubcategoryFormGroup">
          <label>SubCategory Code</label>
          <input
            type="text"
            placeholder="Code"
            value={subCategoryCode}
            onChange={(e) => setSubCategoryCode(e.target.value)}
          />
        </div>
        <div className="AddItemSubcategoryFormGroup">
          <label>Accounting Ledger</label>
          <select
            value={accountingLedger}
            onChange={(e) => setAccountingLedger(e.target.value)}
            className='AddItemSubcategory-select'
          >
            <option value="">-- Select Ledger --</option>
            <option value="Pharmacy Ledger">Pharmacy Ledger</option>
            {/* Add more options here */}
          </select>
        </div>
        <div className="AddItemSubcategoryFormGroup">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="AddItemSubcategoryFormGroup">
          <label>Category<span className="goryRequired">*</span></label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='AddItemSubcategory-select'
            required
          >
            <option value="">--select--</option>
            <option value="Consumable">Consumable</option>
            <option value="Capital">Capital</option>
          </select>
        </div>
        <div className="AddItemSubcategoryFormGroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            value={active}
            onChange={() => setActive(e.target.check)}
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
