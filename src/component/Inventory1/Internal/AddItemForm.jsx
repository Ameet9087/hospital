import React, { useEffect, useState } from 'react';
import './AddItem.css';

const AddItemForm = ({ onClose }) => {
  const [subCategory, setSubCategory] = useState([]);
  const [uom, setUom] = useState([]);
  const [company, setCompany] = useState([]);
  const [packagingType, setPackagingType] = useState([]);
  
  const [formData, setFormData] = useState({
    itemCategory: '',
    itemName: '',
    subCategory: '',
    unitOfMeasurement: '',
    minStockQuantity: '',
    isVatApplicable: false,
    description: '',
    standardRate: '',
    itemCode: '',
    inventory: 'common',
    itemCompany: '',
    reOrderQuantity: '',
    unitQuantity: '',
    packagingType: '',
    isCssdApplicable: false,
    isColdStorageApplicable: false,
    isPatientConsumptionApplicable: false,
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
};

  useEffect(() => {
    fetchUmo();
    fetchCompany();
    fetchSubcategory();
    fetchPackageType();
  }, []);

  const fetchUmo = () => {
    fetch(`${API_BASE_URL}/unitofmeasurement/fetchAll`)
      .then((res) => res.json())
      .then((data) => setUom(data))
      .catch((err) => console.log(err));
  };

  const fetchCompany = () => {
    fetch(`${API_BASE_URL}/company/allCompany`)
      .then((res) => res.json())
      .then((data) => setCompany(data))
      .catch((err) => console.log(err));
  };

  const fetchSubcategory = () => {
    fetch(`${API_BASE_URL}/subcategories/fetchAll`)
      .then((res) => res.json())
      .then((data) => setSubCategory(data))
      .catch((err) => console.log(err));
  };

  const fetchPackageType = () => {
    fetch(`${API_BASE_URL}/packageType/getAllPackageType`)
      .then((res) => res.json())
      .then((data) => setPackagingType(data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {...formData,
      packagingType:{
        id:formData.packagingType
      },
      unitOfMeasurement:{
        unitOfMeasurementId:formData.unitOfMeasurement
      },
      subCategory:{
        id:formData.subCategory
      },
      invCompany:{
        id:formData.itemCompany
      }
    }
    console.log(data);
    
    fetch(`${API_BASE_URL}/items/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      onClose();
    })
    .catch(error => console.error("Error:", error));
  };

  return (
    <div className="AddItemForm">
      <div className='AddItemForm-header'>
      <h2>Add Item</h2>
      <button className="Add-Item-Modal-close" onClick={()=>onClose()}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="AddItemForm-form-sections">
          <div className="AddItemForm-section">
            <div className="AddItemForm-form-group">
              <label>Item Category*</label>
              <input
                type="text"
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group">
              <label>Item Name*</label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group">
              <label>Item Sub Category*</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                {subCategory.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.subCategoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="AddItemForm-form-group">
              <label>Unit of Measurement*</label>
              <select
                name="unitOfMeasurement"
                value={formData.unitOfMeasurement}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                {uom.map((item) => (
                  <option key={item.id} value={item.unitOfMeasurementId}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="AddItemForm-form-group">
              <label>MinStock Quantity*</label>
              <input
                type="number"
                name="minStockQuantity"
                value={formData.minStockQuantity}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group checkbox-group">
              <label>Is VAT Applicable</label>
              <input
                type="checkbox"
                name="isVatApplicable"
                checked={formData.isVatApplicable}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="AddItemForm-section">
            <div className="AddItemForm-form-group">
              <label>Standard Rate</label>
              <input
                type="number"
                name="standardRate"
                value={formData.standardRate}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group">
              <label>Item Code</label>
              <input
                type="text"
                name="itemCode"
                value={formData.itemCode}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group inventory-group">
              <label>Inventory</label>
              <div className="AddItemForm-radio-group">
                <input
                  type="radio"
                  name="inventory"
                  value="common"
                  checked={formData.inventory === 'common'}
                  onChange={handleChange}
                />
                <label>Common</label>
                <input
                  type="radio"
                  name="inventory"
                  value="general"
                  checked={formData.inventory === 'general'}
                  onChange={handleChange}
                />
                <label>General Inventory</label>
              </div>
            </div>
            <div className="AddItemForm-form-group">
              <label>Item Company*</label>
              <select
                name="itemCompany"
                value={formData.itemCompany}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                {company.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="AddItemForm-form-group">
              <label>ReOrder Quantity</label>
              <input
                type="number"
                name="reOrderQuantity"
                value={formData.reOrderQuantity}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group">
              <label>Unit Quantity</label>
              <input
                type="number"
                name="unitQuantity"
                value={formData.unitQuantity}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group">
              <label>Packaging Type</label>
              <select
                name="packagingType"
                value={formData.packagingType}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                {packagingType.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.packagingTypeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="AddItemForm-form-group checkbox-group">
              <label>Is CSSD Applicable</label>
              <input
                type="checkbox"
                name="isCssdApplicable"
                checked={formData.isCssdApplicable}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group checkbox-group">
              <label>Is Cold Storage Applicable</label>
              <input
                type="checkbox"
                name="isColdStorageApplicable"
                checked={formData.isColdStorageApplicable}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group checkbox-group">
              <label>Is Patient Consumption Applicable</label>
              <input
                type="checkbox"
                name="isPatientConsumptionApplicable"
                checked={formData.isPatientConsumptionApplicable}
                onChange={handleChange}
              />
            </div>
            <div className="AddItemForm-form-group checkbox-group">
              <label>Is Active</label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="AddItemForm-form-group">
          <button type="submit" className="AddItemForm-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
