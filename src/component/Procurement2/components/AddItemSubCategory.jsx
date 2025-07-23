import React, { useState } from 'react';
import './AddItemSubCategory.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput, FloatingSelect } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const AddItemSubCategory = ({ onClose }) => {
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

    // Validate required fields
    if (
      !subCategoryName?.trim() ||
      // !itemSubCategoryName?.trim() ||
      !subCategoryCode?.trim() ||
      !accountingLedger?.trim() ||
      !description?.trim() ||
      !category?.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const newSubCategory = {
      subCategoryName,
      itemSubCategoryName,
      subCategoryCode,
      accountingLedger,
      description,
      category,
      active,
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

      // Show success toast
      toast.success('SubCategory added successfully!', {

      });

      // Reset form fields
      setSubCategoryName('');
      setItemSubCategoryName('');
      setSubCategoryCode('');
      setAccountingLedger('');
      setDescription('');
      setCategory('');
      setActive(true);
    } catch (error) {
      // Show error toast
      toast.error('Failed to add SubCategory: ' + error.message, {

      });
    }
  };


  return (
    <div className="ItemSub-AddItemSubcategory">
      <h2>Add Item SubCategory</h2>

      <form onSubmit={handleSubmit} className='AddItemSubcategory-form'>
        <div className="AddItemSubcategoryFormGroup">
          <FloatingInput
            label={"SubCategory Name"}
            type="text"
            placeholder="ItemSubCategory Name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            required
          />

        </div>
        <div className="AddItemSubcategoryFormGroup">
          <FloatingInput
            label={"SubCategory Code"}
            type="text"
            placeholder="Code"
            value={subCategoryCode}
            onChange={(e) => setSubCategoryCode(e.target.value)}
          />

        </div>
        <div className="AddItemSubcategoryFormGroup">
          <FloatingSelect
            label={"Accounting Ledger"}
            value={accountingLedger}
            onChange={(e) => setAccountingLedger(e.target.value)}

            options={[
              { value: "", label: "Select Accounting" },
              { value: "Pharmacy Ledger", label: "Pharmacy Ledger" },


            ]}
          />


        </div>
        <div className="AddItemSubcategoryFormGroup">
          <FloatingInput
            label={"Description"}
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </div>
        <div className="AddItemSubcategoryFormGroup">

          <FloatingSelect
            label={"Category"}
            value={category}
            onChange={(e) => setCategory(e.target.value)}

            required
            options={[
              { value: "", label: "Select " },
              { value: "Consumable ", label: "Consumable " },
              { value: "Capital ", label: "Capital " },


            ]}
          />

        </div>
        <div className="AddItemSubcategoryForm">
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
