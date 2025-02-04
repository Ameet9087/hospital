import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import AddItemSubCategory from "./AddItemSubCategory"; // Popup component for Item SubCategory
import UnitOfMeasurement from "./UnitOfMeasurement"; // Popup component for Unit of Measurement
import ItemCompany from "./AddCompany"; // Popup component for Item Company
import PackagingFile from "./PackagingType"; // Popup component for Packaging Type
import "./AddItem.css"; // Import the CSS file
import CustomModal from "../../../CustomModel/CustomModal";
import AddUnitOfMeasurement from "./AddUnitOfMeasurement";
import AddPackagingType from "./AddPackagingType";
import { API_BASE_URL } from "../../api/api";

const AddItem = ({ isOpen, onClose, terms }) => {

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
    availableQty:"",
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
  const [itemName, setItemName] = useState("");
  const [minStockQuantity, setMinStockQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [standardRate, setStandardRate] = useState(0.0);
  const [itemCode, setItemCode] = useState("");
  const [inventory, setInventory] = useState("");
  const [itemCompany, setItemCompany] = useState("");
  const [reOrderQuantity, setReOrderQuantity] = useState(0);
  const [unitQuantity, setUnitQuantity] = useState(0);
  const [availableQty, setAvailableQty] = useState(0);
  const [isVatApplicable, setIsVatApplicable] = useState(false);
  const [isCssdApplicable, setIsCssdApplicable] = useState(false);
  const [isColdStorageApplicable, setIsColdStorageApplicable] = useState(false);
  const [isPatientConsumptionApplicable, setIsPatientConsumptionApplicable] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
 useEffect(() => {
  if (terms) {
    setItemName(terms.itemName || "");
    setMinStockQuantity(Number(terms.minStockQuantity) || 0);
    setDescription(terms.description || "");
    setStandardRate(parseFloat(terms.standardRate) || 0.0);
    setItemCode(terms.itemCode || "");
    setInventory(terms.inventory || "");
    setItemCompany(terms.itemCompany?.name || ""); // If `itemCompany` includes the name
    setReOrderQuantity(Number(terms.reOrderQuantity) || 0);
    setUnitQuantity(Number(terms.unitQuantity) || 0);
    setAvailableQty(Number(terms.availableQty) || 0);
    setIsVatApplicable(terms.isVatApplicable || false);
    setIsCssdApplicable(terms.isCssdApplicable || false);
    setIsColdStorageApplicable(terms.isColdStorageApplicable || false);
    setIsPatientConsumptionApplicable(terms.isPatientConsumptionApplicable || false);
    setIsActive(terms.isActive || false);

    setIsEditing(true); // Set editing mode
  }
}, [terms]); // This effect runs whenever `terms` changes

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
        `${API_BASE_URL}/subcategories/fetchAll`
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
        `${API_BASE_URL}/unitofmeasurement/fetchAll`
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
        `${API_BASE_URL}/company/allCompany`
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
        `${API_BASE_URL}/packageType/getAllPackageType`
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
      const requestData = {
        itemName: formValues.itemName || "",
        minStockQuantity: Number(formValues.minStockQuantity) || 0,
        description: formValues.description || "",
        standardRate: parseFloat(formValues.standardRate) || 0.0,
        itemCode: formValues.itemCode || "",
        inventory: formValues.inventory || "",
        itemCompany: formValues.itemCompany.name || "", // If `itemCompany` includes the name
        reOrderQuantity: Number(formValues.reOrderQuantity) || 0,
        unitQuantity: Number(formValues.unitQuantity) || 0,
        availableQty: Number(formValues.availableQty) || 0,
        isVatApplicable: formValues.isVatApplicable || false,
        isCssdApplicable: formValues.isCssdApplicable || false,
        isColdStorageApplicable: formValues.isColdStorageApplicable || false,
        isPatientConsumptionApplicable: formValues.isPatientConsumptionApplicable || false,
        isActive: formValues.isActive || false,
        packagingType: {
            id: formValues.packagingType?.id || 0
        },
        unitOfMeasurement: {
          unitOfMeasurementId: formValues.unitOfMeasurement?.unitOfMeasurementId || 0
        },
        subCategory: {
            id: formValues.itemSubCategory?.id || 0
        },
        invCompany: {
            id: formValues.itemCompany?.id || 0
        }
    };
  
      console.log(requestData);
  
      try {
        const url = isEditing
          ? `${API_BASE_URL}/items/update/${terms.id}` // Update the existing item
          : `${API_BASE_URL}/items/addItem`; // Add new item
  
        const method = isEditing ? "PUT" : "POST"; // Use PUT if editing, POST if adding
  
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          alert(isEditing ? "Item updated successfully!" : "Item added successfully!");
          // Reset form values
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
            availableQuantity:"",
            isCssdApplicable: false,
            isColdStorageApplicable: false,
            isPatientConsumptionApplicable: false,
            isActive: true,
          });
          onClose();
        } else {
          const errorData = await response.json();
          console.error("Error adding/updating item:", errorData);
          alert("Failed to process item. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while processing the item.");
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
              value={formValues.unitOfMeasurement.name || ""}
              onChange={(e) =>
                handleDropdownChange(
                  "unitOfMeasurement",
                  unitMeasurements.find((unit) => unit.name === e.target.value)
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
              label="Standard Rate"
              name="standardRate"
              value={formValues.standardRate}
              onChange={handleInputChange}
              placeholder="rate Name"
              error={errors.vendorName}
            />
              <AadddFormRow
              label="Available Quantity"
              name="availableQty"
              value={formValues.availableQty}
              onChange={handleInputChange}
              placeholder="availableQuantity"
              error={errors.availableQuantity}
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
      <CustomModal isOpen={isSubCategoryModalOpen} onClose={() => setIsSubCategoryModalOpen(false)}>
        <AddItemSubCategory onClose={() => setIsSubCategoryModalOpen(false)} />
      </CustomModal>

      <CustomModal isOpen={isUnitModalOpen} onClose={() => setIsUnitModalOpen(false)}>
        <AddUnitOfMeasurement onClose={() => setIsUnitModalOpen(false)} />
      </CustomModal>

      <CustomModal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)}>
        <ItemCompany onClose={() => setIsCompanyModalOpen(false)} />
      </CustomModal>

      <CustomModal isOpen={isPackagingModalOpen} onClose={() => setIsPackagingModalOpen(false)}>
        <AddPackagingType onClose={() => setIsPackagingModalOpen(false)} />
      </CustomModal>
    </div>
  );
};

// Component to render form rows
const AadddFormRow = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder,
  required,
  elementType = "text",
  error,
  checked,
  onModalOpen,
}) => {
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
      ) : label === "Item Category" ? (
        <div className="aadddSelect">
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="aadddInput"
          >
            <option value="">{`Select ${label}`}</option>
            <option value="Consumable">Consumable</option>
            <option value="Capital Good">Capital Good</option>
          </select>
        </div>
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
              <option
                key={option.id}
                value={
                  option.subCategoryName ||
                  option.unitOfMeasurementName ||
                  option.companyName ||
                  option.packagingTypeName
                }
              >
                {option.subCategoryName ||
                  option.name ||
                  option.companyName ||
                  option.packagingTypeName}
              </option>
            ))}
          </select>
          <span className="aadddSelect-span" onClick={onModalOpen}>
            ?
          </span>
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
