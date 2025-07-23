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
import axios from "axios";
import { FloatingInput, FloatingSelect, PopupTable } from "../../../FloatingInputs";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
const AddItem = ({ isOpen, onClose, terms }) => {
  if (!isOpen) return null;

  const [formValues, setFormValues] = useState({
    itemCategory: "",
    subCategoryName: "",
    name: "",
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
    availableQty: "",
    isCssdApplicable: false,
    isColdStorageApplicable: false,
    isPatientConsumptionApplicable: false,
    isActive: true,
    companyName: "",
    packSize: "",
    gst: "",
    locationMaster: {
      id: ""
    }
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
  const [isActive, setIsActive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [error, setError] = useState("");
  const [activePopup, setActivePopup] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);


  useEffect(() => {
    console.log("hhhhh", terms);
    if (terms) {
      setFormValues({
        itemName: terms.itemName,
        itemSubCategory: terms.subCategory?.itemSubCategoryName, // Map to itemSubCategoryName
        unitOfMeasurement: terms.unitOfMeasurement?.name, // Map to unit name
        minStockQuantity: Number(terms.minStockQuantity) || 0,
        isVatApplicable: terms.isVatApplicable,
        description: terms.description,
        standardRate: parseFloat(terms.standardRate) || 0.0,
        itemCode: terms.itemCode,
        inventory: terms.inventory || "GENERAL-INVENTORY",
        itemCompany: terms.invCompany?.companyName, // Map to company name
        reOrderQuantity: Number(terms.reOrderQuantity),
        unitQuantity: Number(terms.unitQuantity),
        availableQty: Number(terms.availableQty),
        packagingType: terms.packagingType?.packagingTypeName, // Map to packaging type name
        vendorName: terms.vendorName,
        isCssdApplicable: terms.isCssdApplicable,
        isColdStorageApplicable: terms.isColdStorageApplicable,
        isPatientConsumptionApplicable: terms.isPatientConsumptionApplicable,
        isActive: terms.isActive || true,
      });
      setItemId(terms.invItemId); // Assuming `invItemId` is the item ID
      setIsEditing(true); // Set editing mode
    }
  }, [terms]); // This effect runs whenever `terms` changes

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors({ ...errors, [name]: "" }); // Clear the error when the user starts typing
  };

  // Fetch functions for dropdown options
  useEffect(() => {
    fetchSubCategories();
    fetchUnitMeasurements();
    fetchCompanies();
    fetchPackagingTypes();
  }, []);


  useEffect(() => {
    fetch(`${API_BASE_URL}/location-masters`)
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => console.error("Error fetching Locations:", error));
  }, []);

  const getPopupData = () => {
    if (activePopup === "Location") {
      return {
        columns: ["id", "locationName"],
        data: locations,
      };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();


  const handleSelect = async (data) => {
    if (activePopup === "Location") {
      setSelectedLocation(data);
    }

    setActivePopup(null);
  };


  const fetchSubCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subcategories/fetchAll`);
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
      const response = await fetch(`${API_BASE_URL}/company/allCompany`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields only when adding a new item
    // Validate required fields only when adding a new item
    if (
      !isEditing && // Skip validation if updating
      (!formValues.itemName?.trim() ||
        !formValues.itemCompany?.id ||
        !formValues.itemSubCategory?.id)
    ) {
      toast.error("Please fill in all required fields before submitting.");
      return; // Stop execution and show an error message
    }


    // Ensure correct object structure before submitting
    const itemData = {
      invItemId: isEditing ? itemId : undefined, // Include `invItemId` only for updates
      itemName: formValues.itemName,
      minStockQuantity: Number(formValues.minStockQuantity) || 0,
      description: formValues.description,
      standardRate: parseFloat(formValues.standardRate) || 0.0,
      itemCode: formValues.itemCode,
      availableQty: Number(formValues.availableQty) || 0,
      inventory: formValues.inventory || "GENERAL-INVENTORY",
      reOrderQuantity: Number(formValues.reOrderQuantity) || 0,
      unitQuantity: Number(formValues.unitQuantity) || 0,
      isVatApplicable: formValues.isVatApplicable,
      isCssdApplicable: formValues.isCssdApplicable,
      isColdStorageApplicable: formValues.isColdStorageApplicable,
      isPatientConsumptionApplicable: formValues.isPatientConsumptionApplicable,
      isActive: formValues.isActive,
      packSize: formValues.packSize,
      gst: formValues.gst,
      locationMaster: {
        id: selectedLocation.id
      },

      // Ensure `id` is passed correctly in required fields
      packagingType: formValues.packagingType?.id
        ? { id: formValues.packagingType.id }
        : null,
      unitOfMeasurement: formValues.unitOfMeasurement?.unitOfMeasurementId
        ? {
          unitOfMeasurementId: formValues.unitOfMeasurement.unitOfMeasurementId,
        }
        : null,
      subCategory: formValues.itemSubCategory?.id
        ? {
          id: formValues.itemSubCategory.id,
          active: formValues.itemSubCategory.active || false,
        }
        : null,
      invCompany: formValues.itemCompany?.id
        ? { id: formValues.itemCompany.id }
        : null,
    };

    try {
      let response;
      if (isEditing && itemId) {
        // PUT request for updating existing item
        response = await axios.put(
          `${API_BASE_URL}/items/update/${itemId}`,
          itemData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        // POST request for adding a new item
        response = await axios.post(`${API_BASE_URL}/items/addItem`, itemData, {
          headers: { "Content-Type": "application/json" },
        });
      }

      console.log("API Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          isEditing ? "Item updated successfully!" : "Item added successfully!"
        );
        onClose();
      } else {
        toast.error(response.data.message || "Error saving item.");
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to save item.");
    }
  };

  return (
    <div>
      <div className="aadddContainer">
        <h2 className="aadddHeading">Add Item</h2>
        <div className="aadddFormContainer">
          <div className="aadddColumn">
            <div className="aadddColumn-part">
              <FloatingInput
                label={"Item Category"}
                name="itemCategory"
                required
                value={formValues.itemCategory}
                onChange={handleInputChange}
                placeholder="Item Category"
                error={errors.itemCategory}
              />
              <FloatingInput
                label={"Item Name"}
                name="itemName"
                required
                value={formValues.itemName}
                onChange={handleInputChange}
                placeholder="Item Name"
                error={errors.itemName}
              />

              <FloatingSelect
                label="Item Sub Category"
                name="itemSubCategory"
                required
                onChange={(e) =>
                  handleDropdownChange(
                    "itemSubCategory",
                    subCategories.find(
                      (sub) => sub.subCategoryName === e.target.value
                    )
                  )
                }
                value={formValues.itemSubCategory?.subCategoryName || ""}
                options={[
                  { value: "", label: "Select an Item Sub Category" },
                  ...(Array.isArray(subCategories)
                    ? subCategories.map((sub) => ({
                      value: sub.subCategoryName,
                      label: sub.subCategoryName,
                    }))
                    : []),
                ]}
                placeholder="Item Sub Category"
                error={errors.itemSubCategory}
              />

              <FloatingSelect
                label="Unit of Measurement"
                name="unitOfMeasurement"
                value={formValues.unitOfMeasurement?.name || ""}
                onChange={(e) =>
                  handleDropdownChange(
                    "unitOfMeasurement",
                    unitMeasurements.find(
                      (unit) => unit.name === e.target.value
                    )
                  )
                }
                options={[
                  { value: "", label: "Select a Unit of Measurement" },
                  ...(Array.isArray(unitMeasurements)
                    ? unitMeasurements.map((unit) => ({
                      value: unit.name,
                      label: unit.name,
                    }))
                    : []),
                ]}
                placeholder="Unit of Measurement"
              />
              <FloatingSelect
                label="Item Company"
                name="itemCompany"
                required
                value={formValues.itemCompany?.companyName || ""}
                onChange={(e) =>
                  handleDropdownChange(
                    "itemCompany",
                    companies.find(
                      (comp) => comp.companyName === e.target.value
                    )
                  )
                }
                options={[
                  { value: "", label: "Select an Item Company" },
                  ...(Array.isArray(companies)
                    ? companies.map((comp) => ({
                      value: comp.companyName,
                      label: comp.companyName,
                    }))
                    : []),
                ]}
                placeholder="Item Company"
                error={errors.itemCompany}
              />
              <FloatingSelect
                label="Packaging Type"
                name="packagingType"
                value={formValues.packagingType?.packagingTypeName || ""}
                onChange={(e) =>
                  handleDropdownChange(
                    "packagingType",
                    packagingTypes.find(
                      (pkg) => pkg.packagingTypeName === e.target.value
                    )
                  )
                }
                options={[
                  { value: "", label: "Select a Packaging Type" },
                  ...(Array.isArray(packagingTypes)
                    ? packagingTypes.map((pkg) => ({
                      value: pkg.packagingTypeName,
                      label: pkg.packagingTypeName,
                    }))
                    : []),
                ]}
                placeholder="Packaging Type"
              />
              <FloatingInput
                label={"Min Stock Quantity"}
                name="minStockQuantity"
                value={formValues.minStockQuantity}
                onChange={handleInputChange}
                placeholder="Min Stock Quantity"
              />

              <FloatingInput
                label={"Description"}
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                placeholder="Description"
              />
              <FloatingInput
                label={"GST"}
                name="gst"
                value={formValues.gst}
                onChange={handleInputChange}
                placeholder="gst"
              />
              <div>
                <FloatingInput
                  label="Location"
                  value={selectedLocation?.locationName}
                />
                <CiSearch onClick={() => setActivePopup("Location")} />

              </div>
            </div>
            <div className="aadddColumn-part">
              <FloatingInput
                label={"Item Code"}
                name="itemCode"
                value={formValues.itemCode}
                onChange={handleInputChange}
                placeholder="Item Code"
              />
              <FloatingInput
                label={"Re-Order Quantity"}
                name="reOrderQuantity"
                value={formValues.reOrderQuantity}
                onChange={handleInputChange}
                placeholder="Re-Order Quantity"
              />
              <FloatingInput
                label={"Unit Quantity"}
                name="unitQuantity"
                value={formValues.unitQuantity}
                onChange={handleInputChange}
                placeholder="Unit Quantity"
                error={errors.unitQuantity}
              />
              <FloatingInput
                label={"Standard Rate"}
                name="standardRate"
                value={formValues.standardRate}
                onChange={handleInputChange}
                placeholder="rate Name"
                error={errors.vendorName}
              />
              <FloatingInput
                label={"Available Quantity"}
                name="availableQty"
                value={formValues.availableQty}
                onChange={handleInputChange}
                placeholder="availableQuantity"
                error={errors.availableQuantity}
              />
              <FloatingInput
                label={"packSize"}
                name={"packSize"}
                value={formValues.packSize}
                onChange={handleInputChange}
                placeholder="packSize"
              />

              <div className="aadddHeading-checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    name="isVatApplicable"
                    checked={formValues.isVatApplicable}
                    onChange={handleInputChange}
                  />
                  Is VAT Applicable
                </label>
              </div>
              <div className="aadddHeading-checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    name="isCssdApplicable"
                    checked={formValues.isCssdApplicable || false}
                    onChange={(e) => handleInputChange(e)}
                  />
                  Is Cssd Applicable
                </label>
              </div>

              <div className="aadddHeading-checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    name="isColdStorageApplicable"
                    checked={formValues.isColdStorageApplicable || false}
                    onChange={(e) => handleInputChange(e)}
                  />
                  Is Cold Storage Applicable
                </label>
              </div>

              <div className="aadddHeading-checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    name="isPatientConsumptionApplicable"
                    checked={formValues.isPatientConsumptionApplicable || false}
                    onChange={(e) => handleInputChange(e)}
                  />
                  Is Patient Consumption Applicable
                </label>
              </div>

              <div className="aadddHeading-checkbox-container">
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formValues.isActive || false}
                    onChange={(e) => handleInputChange(e)}
                  />
                  Is Active
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="aadddFooter">
          <button className="aadddButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
      <CustomModal
        isOpen={isSubCategoryModalOpen}
        onClose={() => setIsSubCategoryModalOpen(false)}
      >
        <AddItemSubCategory onClose={() => setIsSubCategoryModalOpen(false)} />
      </CustomModal>

      <CustomModal
        isOpen={isUnitModalOpen}
        onClose={() => setIsUnitModalOpen(false)}
      >
        <AddUnitOfMeasurement onClose={() => setIsUnitModalOpen(false)} />
      </CustomModal>

      <CustomModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
      >
        <ItemCompany onClose={() => setIsCompanyModalOpen(false)} />
      </CustomModal>

      <CustomModal
        isOpen={isPackagingModalOpen}
        onClose={() => setIsPackagingModalOpen(false)}
      >
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
