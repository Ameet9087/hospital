import React, { useState, useEffect } from 'react';
import './UpdateSubCategory.css';
import { API_BASE_URL } from '../../api/api';

const UpdateSubCategory = ({ subCategory,onClose }) => {
  const [formData, setFormData] = useState({
    subCategoryName: '',
    subCategoryCode: '',
    accountingLedger: '',
    description: '',
    category: '',
    isActive: false,
  });

  // Pre-fill form with existing subcategory data
  useEffect(() => {
    if (subCategory) {
      setFormData({
        subCategoryName: subCategory.subCategoryName || '',
        subCategoryCode: subCategory.subCategoryCode || '',
        accountingLedger: subCategory.accountingLedger || '',
        description: subCategory.description || '',
        category: subCategory.category || '',
        isActive: subCategory.isActive || false,
      });
    }
  }, [subCategory]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subCategoryName) {
      alert('SubCategory Name is required!');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/subcategories/update/${subCategory.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('SubCategory updated successfully!');
        onClose();
        onUpdateSuccess(); // Notify parent to refresh data or close the modal
      } else {
        alert('Failed to update SubCategory');
      }
    } catch (error) {
      console.error('Error updating SubCategory:', error);
    }
  };

  return (
    <div className="ItemSub-AddItemSubcategory">
      <h2>Update Item SubCategory</h2>
      <form onSubmit={handleSubmit} className="AddItemSubcategory-form">
        <div className="AddItemSubcategoryFormGroup">
          <label>
            SubCategory Name<span className="MeasssRequired">*</span>
          </label>
          <input
            type="text"
            name="subCategoryName"
            value={formData.subCategoryName}
            onChange={handleInputChange}
            placeholder="Some Sub Category"
            required
          />
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <label>SubCategory Code</label>
          <input
            type="text"
            name="subCategoryCode"
            value={formData.subCategoryCode}
            onChange={handleInputChange}
            placeholder="0001"
          />
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <label>Accounting Ledger</label>
          <select
            name="accountingLedger"
            value={formData.accountingLedger}
            onChange={handleInputChange}
            className='AddItemSubcategory-select'
          >
            <option value="">---Select Ledger---</option>
            <option value="Assets">Assets</option>
            <option value="Liabilities">Liabilities</option>
            <option value="Revenue">Revenue</option>
            <option value="Expenses">Expenses</option>
            <option value="Equity">Equity</option>
          </select>
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className='AddItemSubcategory-select'
          >
            <option value="">---Select Category---</option>
            <option value="Capital">Capital</option>
            <option value="Inventory">Inventory</option>
            <option value="Office Supplies">Office Supplies</option>
          </select>
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="goryBtnAdd">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateSubCategory;
