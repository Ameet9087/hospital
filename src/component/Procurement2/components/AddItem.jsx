import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import AddItemSubCategory from "./AddItemSubCategory"; // Popup component for Item SubCategory
import UnitOfMeasurement from "./UnitOfMeasurement"; // Popup component for Unit of Measurement
import ItemCompany from "./AddCompany"; // Popup component for Item Company
import PackagingFile from "./PackagingType"; // Popup component for Packaging Type
import "./AddItem.css"; // Import the CSS file

const AddItem = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formValues, setFormValues] = useState({
    itemCategory: "",
    itemName: "",
    itemSubCategory: "",
    unitOfMeasurement: "",
    minStockQuantity: "",
    isVatApplicable: false,
    description: "",
    standardRate: 0,
    itemCode: "",
    inventory: "GENERAL-INVENTORY",
    itemCompany: "",
    reOrderQuantity: "",
    unitQuantity: 0,
    packagingType: "",
    vendorName: "",
    isCssdApplicable: false,
    isColdStorageApplicable: false,
    isPatientConsumptionApplicable: false,
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [unitMeasurements, setUnitMeasurements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [packagingTypes, setPackagingTypes] = useState([]);

  // Modal visibility state
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isPackagingModalOpen, setIsPackagingModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear the error when the user starts typing
  };

  // Fetch functions for dropdown options
  useEffect(() => {
    fetchSubCategories();
    fetchUnitMeasurements();
    fetchCompanies();
    fetchPackagingTypes();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/subcategories/fetchAll"
      );
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const fetchUnitMeasurements = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/unitofmeasurement/fetchAll"
      );
      const data = await response.json();
      setUnitMeasurements(data);
    } catch (error) {
      console.error("Error fetching unit measurements:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/company/allCompany"
      );
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchPackagingTypes = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/packageType/getAllPackageType"
      );
      const data = await response.json();
      setPackagingTypes(data);
    } catch (error) {
      console.error("Error fetching packaging types:", error);
    }
  };

  const handleDropdownChange = (name, selectedOption) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
    setErrors({ ...errors, [name]: "" }); // Clear the error on selection
  };

  const handleSubmit = async () => {
    const requiredFields = ["itemCategory", "itemName", "itemSubCategory", "itemCompany"];
    const newErrors = {};
  
    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Prepare the data object in the required format
      const requestData = { // Assuming id might be provided
        itemName: formValues.itemName,
        minStockQuantity: Number(formValues.minStockQuantity),
        description: formValues.description,
        standardRate: parseFloat(formValues.standardRate),
        itemCode: formValues.itemCode,
        inventory: formValues.inventory,
        itemCompany: formValues.itemCompany.companyName || "",
        reOrderQuantity: Number(formValues.reOrderQuantity),
        unitQuantity: Number(formValues.unitQuantity),
        isVatApplicable: formValues.isVatApplicable,
        isCssdApplicable: formValues.isCssdApplicable,
        isColdStorageApplicable: formValues.isColdStorageApplicable,
        isPatientConsumptionApplicable: formValues.isPatientConsumptionApplicable,
        isActive: formValues.isActive,
        packagingType: formValues.packagingType.packagingTypeName || "",
        unitOfMeasurement: formValues.unitOfMeasurement.unitOfMeasurementName || "",
        subCategory: formValues.itemSubCategory.subCategoryName || "",
        company: formValues.itemCompany.companyName || "",
      };
      console.log(requestData);
      
      try {
        const response = await fetch("http://localhost:8080/api/items/addItem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          alert("Item added successfully!");
          setFormValues({
            itemCategory: "",
            itemName: "",
            itemSubCategory: "",
            unitOfMeasurement: "",
            minStockQuantity: "",
            isVatApplicable: false,
            description: "",
            standardRate: 0,
            itemCode: "",
            inventory: "GENERAL-INVENTORY",
            itemCompany: "",
            reOrderQuantity: "",
            unitQuantity: 0,
            packagingType: "",
            vendorName: "",
            isCssdApplicable: false,
            isColdStorageApplicable: false,
            isPatientConsumptionApplicable: false,
            isActive: true,
          });
          onClose(); // Close the modal after submission
        } else {
          const errorData = await response.json();
          console.error("Error adding item:", errorData);
          alert("Failed to add item. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while adding the item.");
      }
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="aadddContainer">
        <button className="aadddCloseButton" onClick={onClose}>
          &times;
        </button>
        <h2 className="aadddHeading">Add Item</h2>
        <div className="aadddFormContainer">
          <div className="aadddColumn">
            <div className="aadddColumn-part">
            <AadddFormRow
              label="Item Category"
              name="itemCategory"
              required
              value={formValues.itemCategory}
              onChange={handleInputChange}
              placeholder="Item Category"
              error={errors.itemCategory}
            />
            <AadddFormRow
              label="Item Name"
              name="itemName"
              required
              value={formValues.itemName}
              onChange={handleInputChange}
              placeholder="Item Name"
              error={errors.itemName}
            />
            <AadddFormRow
              label="Item Sub Category"
              name="itemSubCategory"
              required
              value={formValues.itemSubCategory.subCategoryName || ""}
              onChange={(e) =>
                handleDropdownChange(
                  "itemSubCategory",
                  subCategories.find((sub) => sub.subCategoryName === e.target.value)
                )
              }
              options={subCategories}
              placeholder="Item Sub Category"
              error={errors.itemSubCategory}
              popupComponent={AddItemSubCategory}
              onModalOpen={() => setIsSubCategoryModalOpen(true)} // Open modal
            />
            <AadddFormRow
              label="Unit of Measurement"
              name="unitOfMeasurement"
              value={formValues.unitOfMeasurement.unitOfMeasurementName || ""}
              onChange={(e) =>
                handleDropdownChange(
                  "unitOfMeasurement",
                  unitMeasurements.find((unit) => unit.unitOfMeasurementName === e.target.value)
                )
              }
              options={unitMeasurements}
              placeholder="Unit of Measurement"
              popupComponent={UnitOfMeasurement}
              onModalOpen={() => setIsUnitModalOpen(true)}
            />
            <AadddFormRow
              label="Item Company"
              name="itemCompany"
              required
              value={formValues.itemCompany.companyName || ""}
              onChange={(e) =>
                handleDropdownChange(
                  "itemCompany",
                  companies.find((comp) => comp.companyName === e.target.value)
                )
              }
              options={companies}
              placeholder="Item Company"
              error={errors.itemCompany}
              popupComponent={ItemCompany}
              onModalOpen={() => setIsCompanyModalOpen(true)}
            />
            <AadddFormRow
              label="Packaging Type"
              name="packagingType"
              value={formValues.packagingType.packagingTypeName || ""}
              onChange={(e) =>
                handleDropdownChange(
                  "packagingType",
                  packagingTypes.find((pkg) => pkg.packagingTypeName === e.target.value)
                )
              }
              options={packagingTypes}
              placeholder="Packaging Type"
              popupComponent={PackagingFile}
              onModalOpen={() => setIsPackagingModalOpen(true)}
            />
            <AadddFormRow
              label="Min Stock Quantity"
              name="minStockQuantity"
              value={formValues.minStockQuantity}
              onChange={handleInputChange}
              placeholder="Min Stock Quantity"
            />
            <AadddFormRow
              label="Is VAT Applicable"
              name="isVatApplicable"
              elementType="checkbox"
              checked={formValues.isVatApplicable}
              onChange={handleInputChange}
            />
            <AadddFormRow
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            </div>
            <div className="aadddColumn-part">
            <AadddFormRow
              label="Item Code"
              name="itemCode"
              value={formValues.itemCode}
              onChange={handleInputChange}
              placeholder="Item Code"
            />
            <AadddFormRow
              label="Re-Order Quantity"
              name="reOrderQuantity"
              value={formValues.reOrderQuantity}
              onChange={handleInputChange}
              placeholder="Re-Order Quantity"
            />
            <AadddFormRow
              label="Unit Quantity"
              name="unitQuantity"
              value={formValues.unitQuantity}
              onChange={handleInputChange}
              placeholder="Unit Quantity"
              error={errors.unitQuantity}
            />
            <AadddFormRow
              label="Vendor Name"
              name="vendorName"
              value={formValues.vendorName}
              onChange={handleInputChange}
              placeholder="Vendor Name"
              error={errors.vendorName}
            />
            <AadddFormRow
              label="Is Cssd Applicable"
              name="isCssdApplicable"
              elementType="checkbox"
              checked={formValues.isCssdApplicable}
              onChange={handleInputChange}
            />
            <AadddFormRow
              label="Is Cold Storage Applicable"
              name="isColdStorageApplicable"
              elementType="checkbox"
              checked={formValues.isColdStorageApplicable}
              onChange={handleInputChange}
            />
            <AadddFormRow
              label="Is Patient Consumption Applicable"
              name="isPatientConsumptionApplicable"
              elementType="checkbox"
              checked={formValues.isPatientConsumptionApplicable}
              onChange={handleInputChange}
            />
            <AadddFormRow
              label="Is Active"
              name="isActive"
              elementType="checkbox"
              checked={formValues.isActive}
              onChange={handleInputChange}
            />
            </div>
          </div>
        </div>
        <div className="aadddFooter">
          <button className="aadddButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <Popup open={isSubCategoryModalOpen} onClose={() => setIsSubCategoryModalOpen(false)}>
        <AddItemSubCategory onClose={() => setIsSubCategoryModalOpen(false)} />
      </Popup>

      <Popup open={isUnitModalOpen} onClose={() => setIsUnitModalOpen(false)}>
        <UnitOfMeasurement onClose={() => setIsUnitModalOpen(false)} />
      </Popup>

      <Popup open={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)}>
        <ItemCompany onClose={() => setIsCompanyModalOpen(false)} />
      </Popup>

      <Popup open={isPackagingModalOpen} onClose={() => setIsPackagingModalOpen(false)}>
        <PackagingFile onClose={() => setIsPackagingModalOpen(false)} />
      </Popup>
    </div>
  );
};

// Component to render form rows
const AadddFormRow = ({ label, name, value, onChange, options = [], placeholder, required, elementType = "text", error, checked,onModalOpen }) => {
  return (
    <div className="aadddFormRow">
      <label className="aadddLabel">
        {label} {required && <span className="required">*</span>}
      </label>
      {elementType === "checkbox" ? (
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="aadddCheckbox"
        />
      ) : options.length > 0 ? (
        <div className="aadddSelect">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="aadddInput"
        >
          <option value="">{`Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.id} value={option.subCategoryName || option.unitOfMeasurementName || option.companyName || option.packagingTypeName}>
              {option.subCategoryName || option.unitOfMeasurementName || option.companyName || option.packagingTypeName}
            </option>
          ))}
        </select>
        <span className="aadddSelect-span" onClick={onModalOpen}>?</span>
        </div>
      ) : (
        <input
          type={elementType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="aadddInput"
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddItem;
