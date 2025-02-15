import React, { useState, useEffect } from "react";
import "./UpdateSubCategory.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const UpdateSubCategory = ({ subCategory, onClose }) => {
  const [formData, setFormData] = useState({
    subCategoryName: "",
    subCategoryCode: "",
    accountingLedger: "",
    description: "",
    category: "",
    active: false,
  });

  // Pre-fill form with existing subcategory data
  useEffect(() => {
    if (subCategory) {
      setFormData({
        subCategoryName: subCategory.subCategoryName || "",
        subCategoryCode: subCategory.subCategoryCode || "",
        accountingLedger: subCategory.accountingLedger || "",
        description: subCategory.description || "",
        category: subCategory.category || "",
        active: subCategory.isActive || false,
      });
    }
  }, [subCategory]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subCategoryName) {
      toast.error("SubCategory Name is required!");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/subcategories/update/${subCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("SubCategory updated successfully!");
        // onClose();
        // onUpdateSuccess();
      } else {
        toast.error("Failed to update SubCategory");
      }
    } catch (error) {
      console.error("Error updating SubCategory:", error);
    }
  };

  return (
    <div className="ItemSub-AddItemSubcategory">
      <h2>Update Item SubCategory</h2>
      <form onSubmit={handleSubmit} className="AddItemSubcategory-form">
        <div className="AddItemSubcategoryFormGroup">
          <FloatingInput
            label={" SubCategory Name"}
            type="text"
            name="subCategoryName"
            value={formData.subCategoryName}
            onChange={handleInputChange}
            placeholder="Some Sub Category"
            required
          />
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <FloatingInput
            label={"SubCategory Code"}
            type="text"
            name="subCategoryCode"
            value={formData.subCategoryCode}
            onChange={handleInputChange}
            placeholder="0001"
          />
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <FloatingSelect
            label={"Accounting Ledger"}
            name="accountingLedger"
            value={formData.accountingLedger}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select " },
              { value: "Assets ", label: "Assets " },
              { value: "Liabilities ", label: "Liabilities " },
              { value: "Revenue ", label: "Revenue " },
              { value: "Expenses ", label: "Expenses " },
            ]}
          />
        </div>

        <div className="AddItemSubcategoryFormGroup">
          <FloatingInput
            label={"Description"}
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </div>

        <div className="AddItemSubcategoryFormGroup">
        <FloatingSelect
            label={"Category"}
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select " },
              { value: "Capital ", label: "Capital " },
              { value: "Inventory ", label: "Inventory " },
              { value: "Office Supplies ", label: "Office Supplies " },
           
            ]}
          />
         
        </div>

        <div className="AddItemSubcategoryForm">
          <label>Is Active</label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
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
