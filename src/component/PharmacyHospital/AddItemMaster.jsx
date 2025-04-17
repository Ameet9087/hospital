import React, { useState, useRef, useEffect } from "react";
import "./AddItemMaster.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect, PopupTable } from "../../FloatingInputs";
const AddItemMaster = ({ selectedItem, onClose }) => {
  console.log(selectedItem);

  const [activePopup, setActivePopup] = useState(null);
  const [generic, setGeneric] = useState([]);
  const [type, setType] = useState([]);
  const [tax, setTax] = useState([]);
  const [category, setCategory] = useState([]);
  const [manufacture, setManufacture] = useState([]);
  const [unit, setUnit] = useState([]);
  const [frequency, setFrequency] = useState([]);
  const [location, setLocation] = useState([]);
  const [substore, setSubstore] = useState([]);
  const [subStoreId, setSubstoreId] = useState([]);
  const [genericId, setGenericId] = useState([]);
  const [itemId, setItemId] = useState([]);
  const [taxId, setTaxId] = useState([]);
  const [categoryiId, setCategoryId] = useState([]);
  const [componyId, setComponyId] = useState([]);
  const [unitId, setUnitId] = useState([]);
  const [frequencyId, setFrequincyId] = useState([]);
  const [pharmacyId, setpharmacyId] = useState([]);
  const [dependStockId, setDependStockId] = useState([]);
  const [locationId, setLocationId] = useState([]);
  const [row, setRow] = useState([
    {
      sn: 1,
      rackNumber: "",
      rol: "",
      maxLevel: "",
      limitedOrder: "",
      maxCons30Days: "",
    },
  ]);
  const [formData, setFormData] = useState({
    itemGroup: "",
    itemName: "",
    scrapItem: "No",
    hsnCode: "",
    medCode: "",
    margin: "",
    packSize: "",
    expireNotRequired: "No",
    startDate: "",
    endDate: "",
    quantity: "",
    freeQuantity: "",
    itemClassification: "",
    potency: "",
    asset: "",
    infusion: "",
    schedule: "",
    drugType: "",
    drugRisk: "",
    dosage: "",
    reOrderQuantity: "",
    formula: "",
    nabhCategory: "",
    dosageType: "",
    strengthMg: "",
    ml: "",
    fixedDoes: "",
    numberOfTimes: "",
    doesInMgKg: "",
    numberOfDays: "",
    quantityInOneBottle: "",
    unit2: "",
    invMethod: "",
    purchaseExpiry: "",
    salesExpiryDays: "",
    allowsSalesLoose: "",
    checkForDoubleIssues: "",
    tds: "",
    nonStockItems: "",
    includeMusting: "",
    ipBillable: "",
    itemTypes: "",
    mrpDiscount: "",
    higherLower: "",
    formulation: "",
    route: "",
    packCalculation: "",
    supplyType: "",
    numberOfDaysPermitted: "",
    mrpDiscountOP: "",
    mrpDiscountIP: "",
    tcode: "",
    lastPoRate: "",
    disField: "",
    drugRequiredTagging: "",
    otherExpense: "",
    bloodBankItem: "",
    storageType: "",
    gradingExpiry: "",
    mrpItem: "",
    mrpForNonMrpItems: "",
    diet: "",
    genericNames: { genericNameId: 0, genericName: "" },
    itemType: { itemTypeId: 0, itemType: "" },
    taxes: { taxesId: 0, taxName: "" },
    itemCategories: { categoryId: 0, categoryName: "" },
    manufactures: { companyId: 0, companyName: "" },
    unitsOfMeasurement: { unitOfMeasurementId: 0, name: "" },
    unitsOfMeasurement2: { unitOfMeasurementId: 0, name: "" },
    pharmacyFrequencies: { pharmacyFrequencyId: 0, name: "" },
    pharmacyConstitutions: { pharmacyConstitutionId: 1 },
    dependentStocks: { pharmacyDependentStockId: 1 },
    locationMasterDTO: { id: "" },
    pharmacyDepartmentDetails: [
      {
        rackNumber: "",
        rol: "",
        maxLevel: "",
        limitedOrder: "",
        maxCons30Days: "",
        subStores: [
          {
            subStoreId: "",
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (selectedItem) {
      // Map received object (selectedItem) to the formData
      setFormData((prevState) => ({
        ...prevState,
        ...selectedItem,
        // Ensure nested objects are updated correctly
        genericNames: {
          ...prevState.genericNames,
          ...selectedItem.genericNames,
        },
        itemType: {
          ...prevState.itemType,
          ...selectedItem.itemType,
        },
        taxes: {
          ...prevState.taxes,
          ...selectedItem.taxes,
        },
        itemCategories: {
          ...prevState.itemCategories,
          ...selectedItem.itemCategories,
        },
        manufactures: {
          ...prevState.manufactures,
          ...selectedItem.manufactures,
        },
        unitsOfMeasurement: {
          ...prevState.unitsOfMeasurement,
          ...selectedItem.unitsOfMeasurement,
        },
        unitsOfMeasurement2: {
          ...prevState.unitsOfMeasurement2,
          ...selectedItem.unitsOfMeasurement2,
        },
        pharmacyFrequencies: {
          ...prevState.pharmacyFrequencies,
          ...selectedItem.pharmacyFrequencies,
        },
        pharmacyConstitutions: {
          ...prevState.pharmacyConstitutions,
          ...selectedItem.pharmacyConstitutions,
        },
        dependentStocks: {
          ...prevState.dependentStocks,
          ...selectedItem.dependentStocks,
        },
      }));
    }
  }, [selectedItem]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          genericResponse,
          typeResponse,
          taxResponse,
          categoryResponse,
          manufactureResponse,
          unitResponse,
          frequencyResponse,
          masterResponse,
          substoreResponse,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/generic-names`),
          axios.get(`${API_BASE_URL}/itemtypes`),
          axios.get(`${API_BASE_URL}/taxes/get-all-taxes`),
          axios.get(`${API_BASE_URL}/categories`),
          axios.get(`${API_BASE_URL}/companies`),
          axios.get(`${API_BASE_URL}/unitofmeasurement/fetchAll`),
          axios.get(`${API_BASE_URL}/frequencies`),
          axios.get(`${API_BASE_URL}/location-masters`),
          axios.get(`${API_BASE_URL}/substores/get-all-substores`),
        ]);

        setGeneric(genericResponse.data);
        setType(typeResponse.data);
        setTax(taxResponse.data);
        setCategory(categoryResponse.data);
        setManufacture(manufactureResponse.data);
        setUnit(unitResponse.data);
        setFrequency(frequencyResponse.data);
        setLocation(masterResponse.data);
        setSubstore(substoreResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      itemGroup: formData.itemGroup || "",
      itemName: formData.itemName || "",
      scrapItem: formData.scrapItem || "",
      hsnCode: formData.hsnCode || "",
      medCode: formData.medCode || "",
      margin: formData.margin || "",
      packSize: formData.packSize || "",
      expireNotRequired: formData.expireNotRequired || "",
      startDate: formData.startDate || "",
      endDate: formData.endDate || "",
      quantity: formData.quantity || "",
      freeQuantity: formData.freeQuantity || "",
      itemClassification: formData.itemClassification || "",
      potency: formData.potency || "",
      asset: formData.asset || "",
      infusion: formData.infusion || "",
      schedule: formData.schedule || "",
      drugType: formData.drugType || "",
      drugRisk: formData.drugRisk || "",
      dosage: formData.dosage || "",
      formula: formData.formula || "",
      nabhCategory: formData.nabhCategory || "",
      dosageType: formData.dosageType || "",
      strengthMg: formData.strengthMg || "",
      ml: formData.ml || "",
      fixedDoes: formData.fixedDoes || "",
      numberOfTimes: formData.numberOfTimes || "",
      doesInMgKg: formData.doesInMgKg || "",
      numberOfDays: formData.numberOfDays || "",
      quantityInOneBottle: formData.quantityInOneBottle || "",
      unit2: formData.unit2 || "",
      invMethod: formData.invMethod || "",
      purchaseExpiry: formData.purchaseExpiry || "",
      salesExpiryDays: formData.salesExpiryDays || "",
      allowsSalesLoose: formData.allowsSalesLoose || "",
      checkForDoubleIssues: formData.checkForDoubleIssues || "",
      tds: formData.tds || "",
      nonStockItems: formData.nonStockItems || "",
      includeMusting: formData.includeMusting || "",
      ipBillable: formData.ipBillable || "",
      itemTypes: formData.itemTypes || "",
      mrpDiscount: formData.mrpDiscount || "",
      higherLower: formData.higherLower || "",
      formulation: formData.formulation || "",
      route: formData.route || "",
      packCalculation: formData.packCalculation || "",
      supplyType: formData.supplyType || "",
      numberOfDaysPermitted: formData.numberOfDaysPermitted || "",
      mrpDiscountOP: formData.mrpDiscountOP || "",
      mrpDiscountIP: formData.mrpDiscountIP || "",
      tcode: formData.tcode || "",
      lastPoRate: formData.lastPoRate || "",
      disField: formData.disField || "",
      drugRequiredTagging: formData.drugRequiredTagging || "",
      otherExpense: formData.otherExpense || "",
      bloodBankItem: formData.bloodBankItem || "",
      storageType: formData.storageType || "",
      gradingExpiry: formData.gradingExpiry || "",
      mrpItem: formData.mrpItem || "",
      mrpForNonMrpItems: formData.mrpForNonMrpItems || "",
      diet: formData.diet || "",
      genericNames: { genericNameId: genericId?.genericNameId || "" },
      taxes: { taxesId: taxId?.taxesId || "" },
      itemCategories: { categoryId: categoryiId?.categoryId || "" },
      itemType: { itemTypeId: itemId?.itemTypesId },
      manufactures: { companyId: componyId?.companyId || "" },
      unitsOfMeasurement: {
        unitOfMeasurementId: unitId?.unitOfMeasurementId || "",
      },
      unitsOfMeasurement2: { unitOfMeasurementId: 2 },
      pharmacyFrequencies: {
        pharmacyFrequencyId: 1,
      },
      pharmacyConstitutions: { pharmacyConstitutionId: 1 },
      dependentStocks: { pharmacyDependentStockId: 1 },
      locationMasterDTO: { id: locationId?.id || "" },
      pharmacyDepartmentDetails: {
        rackNo: formData.departmentStores?.[0]?.rackNo || "",
        rol: formData.departmentStores?.[0]?.rol || "",
        maxLevel: formData.departmentStores?.[0]?.maxLevel || "",
        limitedOrder: formData.departmentStores?.[0]?.limitedOrder || "",
        maxCons: formData.departmentStores?.[0]?.maxCons30Days || "",
        // departmentName:
        //   formData.departmentStores?.[0]?.subStores?.map((sub) => ({
        //     subStoreId: sub.subStoreId || "",
        //   })) || [{}],
      },

    };

    console.log("hiiii", payload);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/pharmacy-item-master`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form submission success:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      alert("Failed to submit form data. Please try again.");
      // console.log(response.data, "wwww");

    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };
  const handleDepartmentStoreChange = (index, field, value) => {
    const updatedDepartmentStores = formData.departmentStores.map((store, i) =>
      i === index ? { ...store, [field]: value } : store
    );
    setFormData({ ...formData, departmentStores: updatedDepartmentStores });
  };

  const handleSelect = (data) => {
    console.log(data);

    // Check the selected popup and update formData accordingly
    if (activePopup === "genericName") {
      setGenericId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        genericNames: {
          genericNameId: data.genericNameId,
          genericName: data.genericName,
        }, // Keep it as an object
      }));
    } else if (activePopup === "type") {
      console.log(data, "aaaaa");
      setItemId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        itemType: {
          itemTypeId: data.itemTypeId,
          itemType: data.itemType,
        }, // Keep it as an object
      }));
    } else if (activePopup === "tax") {
      setTaxId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        taxes: {
          taxesId: data.taxesId,
          taxName: data.name,
        }, // Keep it as an object
      }));
    } else if (activePopup === "category") {
      console.log(data);
      setCategoryId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        itemCategories: {
          categoryId: data.categoryId,
          categoryName: data.categoryName,
        }, // Keep it as an object
      }));
    } else if (activePopup === "manufacturer") {
      setComponyId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        manufactures: {
          companyId: data.companyId,
          companyName: data.companyName,
        }, // Keep it as an object
      }));
    } else if (activePopup === "unit") {
      setUnitId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        unitsOfMeasurement: {
          unitOfMeasurementId: data.unitOfMeasurementId,
          name: data.name,
        }, // Keep it as an object
      }));
    } else if (activePopup === "frequency") {
      setFrequincyId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        pharmacyFrequencies: {
          pharmacyFrequencyId: data.pharmacyFrequencyId,
          name: data.frequency,
        }, // Keep it as an object
      }));
    } else if (activePopup === "pharmacyConstitutions") {
      setpharmacyId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        pharmacyConstitutions: {
          pharmacyConstitutionId: data.pharmacyConstitutionId,
        }, // Keep it as an object
      }));
    } else if (activePopup === "dependentStocks") {
      setDependStockId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        dependentStocks: {
          pharmacyDependentStockId: data.pharmacyDependentStockId,
        }, // Keep it as an object
      }));
    } else if (activePopup === "location") {
      setLocationId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        locationMaster: {
          locationName: data.locationName,
          id: data.id,
        },
      }));
    } else if (activePopup === "substore") {
      console.log("Data received:", data.subStoreName);
      setSubstoreId(data);
      setFormData((prevFormData) => ({
        ...prevFormData,
        subStoreName: data.subStoreName,
      }));
    }
    setActivePopup(null);
  };

  const getPopupData = () => {
    if (activePopup === "genericName") {
      const popupData = {
        columns: ["genericName"],
        data: generic,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "type") {
      const popupData = {
        columns: ["type"],
        data: type,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "tax") {
      const popupData = {
        columns: ["name", "percentage"],
        data: tax,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "category") {
      const popupData = {
        columns: ["categoryName", "subCategoryName"],
        data: category,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "manufacturer") {
      const popupData = {
        columns: ["companyName", "code"],
        data: manufacture,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "unit") {
      const popupData = {
        columns: ["name"],
        data: unit,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "frequency") {
      const popupData = {
        columns: ["frequency"],
        data: frequency,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "location") {
      const popupData = {
        columns: ["locationName"],
        data: location,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    if (activePopup === "substore") {
      const popupData = {
        columns: ["subStoreName"],
        data: substore,
      };
      console.log("Popup Data:", popupData);
      return popupData;
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();

  // const [, set] = useState(false);

  return (
    <>
      <div className="GCSSheetForm-container">
        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-header">Item Master</div>
        </div>

        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-grid">
            <div className="GCSSheetForm-header">Item Details </div>

            {/* <FloatingInput label="UH ID *"  type="text"name="uhId"  /> */}
            <FloatingInput
              label={"Item Name"}
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Item Group"}
              type="text"
              name="itemGroup"
              value={formData.itemGroup}
              onChange={handleChange}
            />

            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label={"Generic Name"}
                type="search"
                name="genericname"
                value={formData.genericNames?.genericName || ""}
                onIconClick={() => setActivePopup("genericName")}
              />
            </div>
            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label={"Type"}
                type="search"
                name="itemType"
                value={formData?.itemType?.itemType}
                onIconClick={() => setActivePopup("type")}
              />
            </div>
            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label="Tax Category"
                type="search"
                name="taxCategory"
                value={formData?.taxes?.taxName}
                onIconClick={() => setActivePopup("tax")}
              />
            </div>
            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label={" Category"}
                type="search"
                name="itemCategories"
                value={formData?.itemCategories?.categoryName}
                onIconClick={() => setActivePopup("category")}
              />
            </div>
            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label={"Manufacturer"}
                type="search"
                name="manufacturer"
                value={formData?.manufactures?.companyName}
                onIconClick={() => setActivePopup("manufacturer")}
              />
            </div>
            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label={"Unit"}
                type="search"
                name="unit"
                value={formData?.unitsOfMeasurement?.name}
                onIconClick={() => setActivePopup("unit")}
              />
            </div>
            <FloatingInput
              label={"HSN CODE"}
              type="text"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Med Code"}
              type="text"
              name="medCode"
              value={formData.medCode}
              onChange={handleChange}
            />
            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label="Location"
                type="text"
                name="unit"
                value={formData?.locationMaster?.locationName}
              />
              <button
                className="GCSSheetForm-search-icon"
                onClick={() => setActivePopup("location")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-grid">
            <div className="GCSSheetForm-header">Sale Policy</div>

            {/* <FloatingSelect
              label="Sale Policy *"
              name=""
              options={[
                { value: "", label: "Select" },
                { value: "reacts", label: "Reacts" },
                { value: "noReaction", label: "No Reaction" },
                { value: "eyesClosed", label: "Eyes Closed" },
              ]}
            /> */}
            <FloatingInput
              label={"Margin"}
              type="text"
              name="margin"
              value={formData.margin}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Pack Size"}
              type="text"
              name="packSize"
              value={formData.packSize}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-grid">
            <div className="GCSSheetForm-header">Scheme Details</div>
            <FloatingInput
              label={"Start Dt"}
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
            <FloatingInput
              label={"EndDt"}
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />

            <FloatingInput
              label={"Qty"}
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Free Qty"}
              type="text"
              name="freeQuantity"
              value={formData.freeQuantity}
              onChange={handleChange}
            />

            {/* <FloatingSelect
              label="Arms *"
              options={[
                { value: "", label: "Select" },
                { value: "normalPower", label: "Normal Power" },
                { value: "mildWeakness", label: "Mild Weakness" },
                { value: "severeWeakness", label: "Severe Weakness" },
                { value: "extension", label: "Extension" },
                { value: "noResponse", label: "No Response" },
              ]}
            />
            <FloatingSelect
              label="Legs *"
              options={[
                { value: "", label: "Select" },
                { value: "normalPower", label: "Normal Power" },
                { value: "mildWeakness", label: "Mild Weakness" },
                { value: "severeWeakness", label: "Severe Weakness" },
                { value: "extension", label: "Extension" },
                { value: "noResponse", label: "No Response" },
              ]}
            /> */}
          </div>
        </div>

        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-grid">
            <div className="GCSSheetForm-header">Other Details</div>

            <FloatingSelect
              label={"Item Classification"}
              name="itemClassification"
              options={[
                { value: "", label: "Select" },
                { value: "prescriptionDrugs", label: "Prescription Drugs" },
                {
                  value: "overTheCounter",
                  label: "Over-the-Counter (OTC) Drugs",
                },
                {
                  value: "controlledSubstances",
                  label: "Controlled Substances",
                },
                { value: "medicalEquipment", label: "Medical Equipment" },
                { value: "consumables", label: "Consumables" },
                { value: "herbalSupplements", label: "Herbal Supplements" },
                { value: "vitaminsMinerals", label: "Vitamins & Minerals" },
                { value: "diagnosticKits", label: "Diagnostic Kits" },
                { value: "surgicalInstruments", label: "Surgical Instruments" },
                { value: "biologics", label: "Biologics" },
              ]}
              value={formData.itemClassification}
              onChange={handleChange}
            />

            <FloatingInput
              label={"Free Qty"}
              type="text"
              name="othrFreeQty"
              value={formData.othrFreeQty}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Potency"}
              name="potency"
              options={[
                { value: "", label: "Select" },
                { value: "lowPotency", label: "Low Potency" },
                { value: "mediumPotency", label: "Medium Potency" },
                { value: "highPotency", label: "High Potency" },
                { value: "ultraHighPotency", label: "Ultra High Potency" },
                { value: "mildStrength", label: "Mild Strength" },
                { value: "moderateStrength", label: "Moderate Strength" },
                { value: "strongStrength", label: "Strong Strength" },
                { value: "veryStrongStrength", label: "Very Strong Strength" },
              ]}
              value={formData.potency}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Schedule"}
              name="schedule"
              options={[
                { value: "", label: "Select" },
                {
                  value: "scheduleI",
                  label: "Schedule I (High abuse potential, no medical use)",
                },
                {
                  value: "scheduleII",
                  label:
                    "Schedule II (High abuse potential, medical use with restrictions)",
                },
                {
                  value: "scheduleIII",
                  label:
                    "Schedule III (Moderate abuse potential, accepted medical use)",
                },
                {
                  value: "scheduleIV",
                  label:
                    "Schedule IV (Low abuse potential, accepted medical use)",
                },
                {
                  value: "scheduleV",
                  label:
                    "Schedule V (Lower abuse potential, accepted medical use)",
                },
                {
                  value: "nonScheduled",
                  label: "Non-scheduled (Not controlled)",
                },
              ]}
              value={formData.schedule}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Drug Type"}
              name="drugType"
              options={[
                { value: "", label: "Select" },
                { value: "antibiotic", label: "Antibiotic" },
                { value: "analgesic", label: "Analgesic" },
                { value: "antipyretic", label: "Antipyretic" },
                { value: "antiinflammatory", label: "Antiinflammatory" },
                { value: "antidepressant", label: "Antidepressant" },
                { value: "antihistamine", label: "Antihistamine" },
                { value: "antiviral", label: "Antiviral" },
                { value: "antifungal", label: "Antifungal" },
                { value: "anticancer", label: "Anticancer" },
                { value: "anxiolytic", label: "Anxiolytic" },
                { value: "sedative", label: "Sedative" },
                { value: "hypnotic", label: "Hypnotic" },
                { value: "vasodilator", label: "Vasodilator" },
                { value: "diuretic", label: "Diuretic" },
                { value: "betaBlocker", label: "Beta Blocker" },
                {
                  value: "calciumChannelBlocker",
                  label: "Calcium Channel Blocker",
                },
                { value: "insulin", label: "Insulin" },
                { value: "immunosuppressant", label: "Immunosuppressant" },
                { value: "vaccine", label: "Vaccine" },
                { value: "hrt", label: "Hormone Replacement Therapy (HRT)" },
                { value: "moodStabilizer", label: "Mood Stabilizer" },
                { value: "antipsychotic", label: "Antipsychotic" },
                { value: "stimulant", label: "Stimulant" },
                { value: "bronchodilator", label: "Bronchodilator" },
                {
                  value: "nutritionalSupplement",
                  label: "Nutritional Supplement",
                },
              ]}
              value={formData.drugType}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Drug Risk"}
              name="drugRisk"
              options={[
                { value: "", label: "Select" },
                { value: "lowRisk", label: "Low Risk" },
                { value: "moderateRisk", label: "Moderate Risk" },
                { value: "highRisk", label: "High Risk" },
                { value: "veryHighRisk", label: "Very High Risk" },
                { value: "controlledSubstance", label: "Controlled Substance" },
                { value: "nonPrescription", label: "Non-prescription" },
                { value: "prescriptionOnly", label: "Prescription Only" },
                { value: "addictivePotential", label: "Addictive Potential" },
                { value: "toxicRisk", label: "Toxic Risk" },
                { value: "cytotoxic", label: "Cytotoxic (Cancer-causing)" },
                { value: "immunosuppressive", label: "Immunosuppressive" },
                {
                  value: "teratogenic",
                  label: "Teratogenic (Harmful to fetus)",
                },
                { value: "photosensitive", label: "Photosensitive" },
                { value: "allergen", label: "Allergen" },
                {
                  value: "carcinogenic",
                  label: "Carcinogenic (Cancer-causing)",
                },
                { value: "explosive", label: "Explosive" },
                { value: "flammable", label: "Flammable" },
              ]}
              value={formData.drugRisk}
              onChange={handleChange}
            />

            <FloatingInput
              label={"Dosage"}
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Formula"}
              type="text"
              name="formula"
              value={formData.formula}
              onChange={handleChange}
            />
            <FloatingSelect
              label={"NABH Category"}
              name="nabhCategory"
              options={[
                { value: "", label: "Select" },
                { value: "lowRisk", label: "Low Risk" },
                { value: "moderateRisk", label: "Moderate Risk" },
                { value: "highRisk", label: "High Risk" },
                { value: "veryHighRisk", label: "Very High Risk" },
                { value: "criticalCare", label: "Critical Care" },
                { value: "emergencyCare", label: "Emergency Care" },
                { value: "surgicalCare", label: "Surgical Care" },
                { value: "postoperativeCare", label: "Postoperative Care" },
                { value: "rehabilitation", label: "Rehabilitation" },
                { value: "preventiveCare", label: "Preventive Care" },
                { value: "palliativeCare", label: "Palliative Care" },
                { value: "mentalHealthCare", label: "Mental Health Care" },
                { value: "maternalCare", label: "Maternal Care" },
                { value: "pediatricCare", label: "Pediatric Care" },
                { value: "geriatricCare", label: "Geriatric Care" },
                {
                  value: "chronicDiseaseManagement",
                  label: "Chronic Disease Management",
                },
              ]}
              value={formData.nabhCategory}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Dosage Type"}
              name="dosageType"
              options={[
                { value: "", label: "Select" },
                { value: "oral", label: "Oral" },
                { value: "topical", label: "Topical" },
                { value: "injection", label: "Injection" },
                { value: "sublingual", label: "Sublingual" },
                { value: "rectal", label: "Rectal" },
                { value: "iv", label: "Intravenous (IV)" },
                { value: "im", label: "Intramuscular (IM)" },
                { value: "subcutaneous", label: "Subcutaneous" },
                { value: "inhalation", label: "Inhalation" },
                { value: "ophthalmic", label: "Ophthalmic (Eye)" },
                { value: "otic", label: "Otic (Ear)" },
                { value: "vaginal", label: "Vaginal" },
                { value: "transdermal", label: "Transdermal" },
                { value: "nasal", label: "Nasal" },
                { value: "buccal", label: "Buccal" },
                { value: "intranasal", label: "Intranasal" },
                { value: "drops", label: "Drops" },
                { value: "lozenge", label: "Lozenge" },
              ]}
              value={formData.dosageType}
              onChange={handleChange}
            />

            <FloatingInput
              label={"Strengh/Mg"}
              type="text"
              name="strengthMg"
              value={formData.strengthMg}
              onChange={handleChange}
            />

            <FloatingInput
              label={"ML"}
              type="number"
              name="ml"
              value={formData.ml}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Fixed Dose"}
              type="text"
              name="fixedDoes"
              value={formData.fixedDoes}
              onChange={handleChange}
            />

            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label={"Frequency"}
                type="search"
                name="pharmacyFrequencies"
                value={formData.pharmacyFrequencies.name}
                onIconClick={() => setActivePopup("frequency")}
              />
            </div>
            <FloatingInput
              label={"No Of Times"}
              type="number"
              name="numberOfTimes"
              value={formData.numberOfTimes}
              onChange={handleChange}
            />

            <FloatingInput
              label={"Dose in Mg/Kg"}
              type="text"
              name="doesInMgKg"
              value={formData.doesInMgKg}
              onChange={handleChange}
            />
            <FloatingInput
              label={"No Of Days"}
              type="text"
              name="numberOfDays"
              value={formData.numberOfDays}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Qty in one bottle"}
              type="text"
              name="quantityInOneBottle"
              value={formData.quantityInOneBottle}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Unit2"}
              type="text"
              name="unit2"
              value={formData.unit2}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Inv Method"}
              name="invMethod"
              options={[
                { value: "", label: "Select" },
                { value: "fifo", label: "FIFO (First In, First Out)" },
                { value: "lifo", label: "LIFO (Last In, First Out)" },
                { value: "fefo", label: "FEFO (First Expired, First Out)" },
                { value: "standardCosting", label: "Standard Costing" },
                { value: "movingAverage", label: "Moving Average" },
                { value: "weightedAverage", label: "Weighted Average Cost" },
                { value: "batchTracking", label: "Batch Tracking" },
                {
                  value: "serialNumberTracking",
                  label: "Serial Number Tracking",
                },
                { value: "jit", label: "Just In Time (JIT)" },
                {
                  value: "consignmentInventory",
                  label: "Consignment Inventory",
                },
                { value: "reorderPoint", label: "Reorder Point Method" },
                { value: "kanban", label: "Kanban System" },
              ]}
              value={formData.invMethod}
              onChange={handleChange}
            />

            <FloatingInput
              label={"Purchase Expiry"}
              type="date"
              name="purchaseExpiry"
              value={formData.purchaseExpiry}
              onChange={handleChange}
            />

            <FloatingInput
              label={"sale Expiry Days"}
              type="date"
              name="salesExpiryDays"
              value={formData.salesExpiryDays}
              onChange={handleChange}
            />

            <label>
              <input
                type="checkbox"
                name="allowsSalesLoose"
                value={formData.allowsSalesLoose}
                onChange={handleChange}
              />
              Allow Sales Loose
            </label>

            <label>
              <input
                type="checkbox"
                name="checkForDoubleIssues"
                value={formData.checkForDoubleIssues}
                onChange={handleChange}
              />
              Check for Double Issue
            </label>

            <label>
              <input
                type="checkbox"
                name="nonStockItems"
                value={formData.nonStockItems}
                onChange={handleChange}
              />
              Non Stock Items
            </label>
            <label>
              <input
                type="checkbox"
                name="includeMusting"
                value={formData.includeMusting}
                onChange={handleChange}
              />
              include Musting
            </label>
            <label>
              <input
                type="checkbox"
                name="tds"
                value={formData.tds}
                onChange={handleChange}
              />
              TDS
            </label>
            <label>
              <input
                type="checkbox"
                name="ipBillable"
                value={formData.ipBillable}
                onChange={handleChange}
              />
              Ip Billable
            </label>

            <FloatingSelect
              label={"Item Types"}
              name="itemTypes"
              options={[
                { value: "", label: "Select" },
                { value: "prescription", label: "Prescription Medicine" },
                { value: "otc", label: "Over-the-Counter (OTC)" },
                { value: "controlledSubstance", label: "Controlled Substance" },
                { value: "generic", label: "Generic Medicine" },
                { value: "brandName", label: "Brand Name Medicine" },
                { value: "herbal", label: "Herbal Medicine" },
                { value: "vaccines", label: "Vaccines" },
                { value: "biologic", label: "Biologic Medicine" },
                { value: "dietarySupplement", label: "Dietary Supplement" },
                { value: "medicalDevices", label: "Medical Devices" },
                { value: "antibiotics", label: "Antibiotics" },
                { value: "painRelievers", label: "Pain Relievers" },
                {
                  value: "vitaminsSupplements",
                  label: "Vitamins & Supplements",
                },
                { value: "homeopathic", label: "Homeopathic Medicine" },
              ]}
              value={formData.itemTypes}
              onChange={handleChange}
            />

            <FloatingInput label={"MRP Discount"} type="text" name="mrpDiscount" value={formData.mrpDiscount} onChange={handleChange} />
            <label>
              Higher / Lower:
              <input
                type="radio"
                name="higherLower"
                value="Higher"
                checked={formData.higherLower === "Higher"} // Bind to state
                onChange={handleChange}
              />
              Higher
              <input
                type="radio"
                name="higherLower"
                value="Lower"
                checked={formData.higherLower === "Lower"} // Bind to state
                onChange={handleChange}
              />
              Lower
            </label>
            <FloatingSelect
              label={"Formulation"}
              name="formulation"
              options={[
                { value: "", label: "Select" },
                { value: "tablet", label: "Tablet" },
                { value: "capsule", label: "Capsule" },
                { value: "syrup", label: "Syrup" },
                { value: "injection", label: "Injection" },
                { value: "cream", label: "Cream" },
                { value: "ointment", label: "Ointment" },
                { value: "suspension", label: "Suspension" },
                { value: "solution", label: "Solution" },
                { value: "gel", label: "Gel" },
                { value: "powder", label: "Powder" },
                { value: "patches", label: "Patches" },
                { value: "suppository", label: "Suppository" },
                { value: "lozenge", label: "Lozenge" },
                { value: "emulsion", label: "Emulsion" },
              ]}
              value={formData.formulation}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Route"}
              name="route"
              value={formData.route}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "oral", label: "Oral" },
                { value: "iv", label: "Intravenous (IV)" },
                { value: "im", label: "Intramuscular (IM)" },
                { value: "subcutaneous", label: "Subcutaneous" },
                { value: "topical", label: "Topical" },
                { value: "sublingual", label: "Sublingual" },
                { value: "inhalation", label: "Inhalation" },
                { value: "rectal", label: "Rectal" },
                { value: "transdermal", label: "Transdermal" },
                { value: "ophthalmic", label: "Ophthalmic (Eye)" },
                { value: "otic", label: "Otic (Ear)" },
                { value: "nasal", label: "Nasal" },
                { value: "vaginal", label: "Vaginal" },
              ]}
            />

            <FloatingInput
              label={"Re Order Quantity"}
              type="text"
              name="reOrderQuantity"
              value={formData.reOrderQuantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="GCSSheetForm-section">
          <div className="GCSSheetForm-grid">
            <div className="GCSSheetForm-header">Auto PO Pack Calculation</div>
            <FloatingInput
              label={"Pack Calculation"}
              type="text"
              name="packCalculation"
              value={formData.packCalculation}
              onChange={handleChange}
            />

            <FloatingSelect
              label={"Supply Type"}
              name="supplyType"
              value={formData.supplyType}
              onChange={handleChange}
              options={[
                { value: "", label: "Select" },
                { value: "directSupply", label: "Direct Supply" },
                { value: "distributorSupply", label: "Distributor Supply" },
                { value: "emergencySupply", label: "Emergency Supply" },
                { value: "pharmacySupply", label: "Pharmacy Supply" },
                { value: "hospitalSupply", label: "Hospital Supply" },
                { value: "importSupply", label: "Import Supply" },
                {
                  value: "prescriptionSupply",
                  label: "Prescription-Based Supply",
                },
                { value: "bulkSupply", label: "Bulk Supply" },
                { value: "onDemandSupply", label: "On-Demand Supply" },
                { value: "governmentSupply", label: "Government Supply" },
                { value: "privateSupply", label: "Private Supply" },
                {
                  value: "clinicalTrialSupply",
                  label: "Clinical Trial Supply",
                },
              ]}
            />

            <FloatingInput
              label={"Number Of Days Permitted"}
              type="text"
              name="numberOfDaysPermitted"
              value={formData.numberOfDaysPermitted}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Mrp Discount Op"}
              type="text"
              name="mrpDiscountOP"
              value={formData.mrpDiscountOP}
              onChange={handleChange}
            />
            <FloatingInput
              label={"Mrp Discount Ip"}
              type="text"
              name="mrpDiscountIP"
              value={formData.mrpDiscountIP}
              onChange={handleChange}
            />
            <FloatingInput
              label={"TCODE"}
              type="text"
              name="tcode"
              value={formData.tcode}
              onChange={handleChange}
            />
            <FloatingInput
              label={"lAST PO Rate"}
              type="text"
              name="lastPoRate"
              value={formData.lastPoRate}
              onChange={handleChange}
            />
            <FloatingInput
              label={"DISFIELD"}
              type="text"
              name="disField"
              value={formData.disField}
              onChange={handleChange}
            />

            <div className="GCSSheetForm-search-field">
              <FloatingInput
                label={"Drug req taggi"}
                type="text"
                name="drugRequiredTagging"
                value={formData.drugRequiredTagging}
                onChange={handleChange}
              />
              {/* <button
                className="GCSSheetForm-search-icon"
                onClick={() => setActivePopup("MrNo")}
              >
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                  />
                </svg>
              </button> */}
            </div>

            <label>
              <input
                type="checkbox"
                name="otherExpense"
                value={formData.otherExpense}
                onChange={handleChange}
              />
              Other Expanse
            </label>
            <label>
              <input
                type="checkbox"
                name="bloodBankItem"
                value={formData.bloodBankItem}
                onChange={handleChange}
              />
              Blood Bank Item
            </label>

            <FloatingSelect
              label={"Storage Type"}
              name="storageType"
              value={formData.storageType}
              onChange={handleChange}
              options={[
                { value: "roomTemperature", label: "Room Temperature" },
                { value: "coldStorage", label: "Cold Storage" },
                { value: "frozenStorage", label: "Frozen Storage" },
                { value: "refrigeratedStorage", label: "Refrigerated Storage" },
                {
                  value: "controlledRoomTemperature",
                  label: "Controlled Room Temperature",
                },
                { value: "humidityControl", label: "Under Humidity Control" },
                { value: "specializedStorage", label: "Specialized Storage" },
                { value: "lightSensitive", label: "Light Sensitive Storage" },
              ]}
            />

            <FloatingSelect
              label={"Grading Expiry"}
              name="gradingExpiry"
              value={formData.gradingExpiry}
              onChange={handleChange}
              options={[
                { value: "fifo", label: "FIFO (First In, First Out)" },
                { value: "lifo", label: "LIFO (Last In, First Out)" },
                { value: "useByDate", label: "Use By Date" },
                { value: "bestBeforeDate", label: "Best Before Date" },
                { value: "manufactureDate", label: "Manufacture Date" },
                { value: "expiryDate", label: "Expiry Date" },
                { value: "batchExpiry", label: "Batch Expiry" },
                { value: "shelfLifeExpiry", label: "Shelf Life Expiry" },
                { value: "openDate", label: "Open Date" },
                { value: "stabilityExpiry", label: "Stability Expiry" },
              ]}
            />

            <label>
              Mrp Items:
              <input
                type="radio"
                name="mrpItem"
                value="Yes"
                checked={formData.mrpItem === "Yes"} // Bind to state
                onChange={handleChange}
              />
              Yes
              <input
                type="radio"
                name="mrpItem"
                value="No"
                checked={formData.mrpItem === "No"} // Bind to state
                onChange={handleChange}
              />
              No
            </label>

            <FloatingInput
              label={"MPR For Non"}
              type="text"
              name="mrpForNonMrpItems"
              value={formData.mrpForNonMrpItems}
              onChange={handleChange}
            />

            <label>
              <input
                type="checkbox"
                name="diet"
                value={formData.diet}
                onChange={handleChange}
              />
              Diet Item
            </label>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Department</th>
                <th>Rack No</th>
                <th>ROL</th>
                <th>Max Level</th>
                <th>Limited Order</th>
                <th>Max Cons (30 Days)</th>
              </tr>
            </thead>
            <tbody>
              {formData.pharmacyDepartmentDetails?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="GCSSheetForm-search-field">
                      <FloatingInput
                        label="Sub Store Name"
                        type="text"
                        name="subStoreName"
                        value={formData.subStoreName || ""}
                        onChange={(e) =>
                          handleDepartmentStoreChange(
                            index,
                            "subStoreId",
                            e.target.value
                          )
                        }
                      />
                      <button
                        type="button"
                        className="GCSSheetForm-search-icon"
                        onClick={() => setActivePopup("substore")}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            fill="currentColor"
                            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>
                    <FloatingInput
                      label="Rack No"
                      name="rackNumber"
                      value={item.rackNumber}
                      onChange={(e) =>
                        handleDepartmentStoreChange(
                          index,
                          "rackNumber",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="ROL"
                      name="rol"
                      value={item.rol}
                      onChange={(e) =>
                        handleDepartmentStoreChange(
                          index,
                          "rol",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Max Level"
                      name="maxLevel"
                      value={item.maxLevel}
                      onChange={(e) =>
                        handleDepartmentStoreChange(
                          index,
                          "maxLevel",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Limited Order"
                      name="limitedOrder"
                      value={item.limitedOrder}
                      onChange={(e) =>
                        handleDepartmentStoreChange(
                          index,
                          "limitedOrder",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Max Cons"
                      name="maxCons30Days"
                      value={item.maxCons30Days}
                      onChange={(e) =>
                        handleDepartmentStoreChange(
                          index,
                          "maxCons30Days",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="GCSSheetForm-section">
          <button className="btn-blue" onClick={handleSubmit}>
            Save
          </button>
          <button className="btn-red">Close</button>
        </div>

        {activePopup && (
          <PopupTable
            columns={columns}
            data={data}
            onSelect={handleSelect}
            onClose={() => setActivePopup(null)}
          />
        )}
      </div>
    </>
  );
};
export default AddItemMaster;
