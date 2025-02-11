import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../LabSetting/labTestComponentsAddNewLTC.css";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../../FloatingInputs";

const FormInput = ({
  name,
  value,
  placeholder,
  onChange,
  type = "text",
  disabled = false,
  label,
}) => (
  <div className="lab-test-form-group">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      type={type}
      name={name}
      id={name} // Added an ID for label association
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="labTestInput"
      disabled={disabled}
    />
  </div>
);

const FormTextarea = ({ name, value, placeholder, onChange, label }) => (
  <div className="lab-test-form-group">
    {label && <label htmlFor={name}>{label}</label>}
    <textarea
      name={name}
      id={name} // Added an ID for label association
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="labTestTextarea"
    />
  </div>
);

const LabTestComponentsAddNewLTC = ({ onClose, initialData, isDataUpdate }) => {
  const [lookupData, setLookupData] = useState([]);
  const [componentsArray, setComponentsArray] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    console.log(initialData);

    const fetchInitialData = () => {
      if (initialData) {
        // Set formData with initialData values (for editing)
        setFormData({
          componentName: initialData.componentName || "",
          unit: initialData.unit || "",
          valueType: initialData.valueType || "text",
          controlType: initialData.controlType || "TextBox",
          rangeDescription: initialData.rangeDescription || "",
          method: initialData.method || "",
          componentRange: initialData.componentRange || "",
          lookupId: initialData.valueLookup?.labLookupId || null,
          displayName: initialData.displayName || "",
          valuePrecision: initialData.valuePrecision || "",
          maleRange: initialData.maleRange || "",
          femaleRange: initialData.femaleRange || "",
          childRange: initialData.childRange || "",
          minValue: initialData.minValue || "",
          maxValue: initialData.maxValue || "",
          createdOn: initialData.createdOn || new Date().toISOString(),
        });
      }
    };
    fetchInitialData();
  }, [initialData]); // Runs only when initialData changes

  const [formData, setFormData] = useState({
    componentName: "",
    unit: "",
    valueType: "text",
    controlType: "TextBox",
    rangeDescription: "",
    method: "",
    componentRange: "",
    lookupId: null,
    displayName: "",
    valuePrecision: "",
    maleRange: "",
    femaleRange: "",
    childRange: "",
    minValue: "",
    maxValue: "",
    createdOn: new Date().toISOString(),
  });

  useEffect(() => {
    const fetchLookupData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/lab-lookups/getAll-lookup`
        );
        setLookupData(response.data);
      } catch (error) {
        console.error("Error fetching lookup data:", error);
      }
    };

    fetchLookupData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "lookupId" ? parseInt(value) : value,
    }));
    if (e.target.type === "number") {
      if (value === "" || /^\d+(\.\d+)?$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddComponent = () => {
    const newComponent = { ...formData };

    // Remove range-related fields if not a number
    if (newComponent.valueType !== "number") {
      delete newComponent.maleRange;
      delete newComponent.femaleRange;
      delete newComponent.childRange;
      delete newComponent.minValue;
      delete newComponent.maxValue;
    }

    if (isEditing) {
      const updatedArray = componentsArray.map((component, index) =>
        index === editIndex ? newComponent : component
      );
      setComponentsArray(updatedArray);
      resetForm();
    } else {
      setComponentsArray((prevArray) => [...prevArray, newComponent]);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      componentName: "",
      unit: "",
      valueType: "text",
      controlType: "TextBox",
      rangeDescription: "",
      method: "",
      componentRange: "",
      lookupId: null,
      displayName: "",
      valuePrecision: "",
      maleRange: "",
      femaleRange: "",
      childRange: "",
      minValue: "",
      maxValue: "",
      createdOn: new Date().toISOString(),
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (componentsArray.length === 0) {
      toast.error("Add Component First");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/lab-components/save-components`,
        componentsArray
      );
      toast.success("Lab Components Added Successfully");
      onClose();
    } catch (error) {
      toast.error("Error posting data:", error);
    }
  };

  const handleEdit = async (id) => {
    console.log(formData);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/lab-components/${id}`,
        formData
      );
      toast.success("Lab Components Updated Successfully");
      onClose();
    } catch (error) {
      toast.log(error);
    }
  };
  const handleEditClick = (index) => {
    const componentToEdit = componentsArray[index];
    setFormData({ ...componentToEdit });
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="labTestComponentsAddNewLTC-container">
      <div className="labTestComponentsAddNewLTC-header">
        <h3>{isEditing ? "Edit Component" : "Add Components"}</h3>
        <button
          className="labTestComponentsAddNewLTC-close-btn"
          onClick={onClose}
        >
          x
        </button>
      </div>

      <form className="labTestComponentsAddNewLTC-form">
        <FloatingInput
          name="componentName"
          value={formData.componentName}
          placeholder="Component Name"
          onChange={handleChange}
          label={"Component Name"}
        />
        <FloatingInput
          name="unit"
          value={formData.unit}
          placeholder="Unit"
          onChange={handleChange}
          label={"Unit"}
        />
        <div className="lab-test-form-group">
          <FloatingSelect
            label={"Value Type"}
            name="valueType"
            value={formData.valueType}
            onChange={handleChange}
            options={[{value:"text",label:"Text"},
              {value:"number",label:"Number"}
            ]}
          />
        </div>
        <div className="lab-test-form-group">
        <FloatingSelect
         name="controlType"
         id="controlType"
         value={formData.controlType}
         onChange={handleChange}
         className="labTestSelect"
            options={[{value:"TextBox",label:"TextBox"},
              {value:"Dropdown",label:"Dropdown"},
              {value:"Checkbox",label:"Checkbox"}
            ]}
          />
        </div>
        <FloatingTextarea
          name="componentRange"
          value={formData.componentRange}
          onChange={handleChange}
          label={"Component Range"}
        />
        <FloatingTextarea
          name="rangeDescription"
          value={formData.rangeDescription}
          onChange={handleChange}
          label={"Range Description"}
        />
        <FloatingInput
          name="method"
          value={formData.method}
          placeholder="Method"
          onChange={handleChange}
          label={"Method"}
        />
        <div className="lab-test-form-group">
        <FloatingSelect
        label={"Look Up"}
         name="lookupId"
         id="lookupId"
         value={formData.lookupId}
         onChange={handleChange}
            options={[{value:"",label:""},
              ...(Array.isArray(lookupData)?lookupData.map((lookup)=>({
                value:lookup.labLookupId,
                label:lookup.lookupName
              })):[])
             
            ]}
          />
        </div>
        <FloatingInput
          name="displayName"
          value={formData.displayName}
          placeholder="Display Name"
          onChange={handleChange}
          label={"Display Name"}
        />
        <FloatingInput
          name="valuePrecision"
          value={formData.valuePrecision}
          placeholder="Value Precision"
          onChange={handleChange}
          label={"Value Precision"}
        />

        {formData.valueType === "number" && (
          <>
            <FloatingInput
              name="maleRange"
              value={formData.maleRange}
              placeholder="Male Range"
              onChange={handleChange}
              label={"Male Range"}
              type="number"
              min="0"
            />
            <FloatingInput
              name="femaleRange"
              value={formData.femaleRange}
              placeholder="Female Range"
              onChange={handleChange}
              label={"Female Range"}
              type="number"
              min="0"
            />
            <FloatingInput
              name="childRange"
              value={formData.childRange}
              placeholder="Child Range"
              onChange={handleChange}
              label={"Child Range"}
              type="number"
              min="0"
            />
            <FloatingInput
              name="minValue"
              value={formData.minValue}
              placeholder="Min Value"
              onChange={handleChange}
              label={"Min Value"}
              type="number"
            />
            <FloatingInput
              name="maxValue"
              value={formData.maxValue}
              placeholder="Max Value"
              onChange={handleChange}
              label={"Max Value"}
              type="number"
            />
          </>
        )}
      </form>
      {isDataUpdate ? (
        <button
          type="button"
          onClick={() => handleEdit(initialData?.componentId)}
          className="labTestComponentsAddNewLTC-add-footer-button"
        >
          Update
        </button>
      ) : (
        <>
          <button
            type="button"
            className="labTestComponentsAddNewLTC-add-button"
            onClick={handleAddComponent}
          >
            {isEditing ? "Update" : <i className="fa-solid fa-plus"></i>}
          </button>

          <div className="labTestComponentPreview">
            <h4>Preview:</h4>
            {componentsArray.length > 0 && (
              <table className="labTestComponentTable">
                <thead>
                  <tr>
                    <th>Component Name</th>
                    <th>Unit</th>
                    <th>Value Type</th>
                    <th>Control Type</th>
                    <th>Range Description</th>
                    <th>Component Range</th>
                    <th>Method</th>
                    <th>Lookup ID</th>
                    <th>Display Name</th>
                    <th>Value Precision</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {componentsArray.map((component, index) => (
                    <tr key={index}>
                      <td>{component.componentName}</td>
                      <td>{component.unit}</td>
                      <td>{component.valueType}</td>
                      <td>{component.controlType}</td>
                      <td>{component.rangeDescription}</td>
                      <td>{component.componentRange}</td>
                      <td>{component.method}</td>
                      <td>{component.lookupId}</td>
                      <td>{component.displayName}</td>
                      <td>{component.valuePrecision}</td>
                      <td>
                        <button
                          className="labTestComponentAddedUpdateBTN"
                          onClick={() => handleEditClick(index)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="labTestComponentsAddNewLTC-footer">
            <button
              type="button"
              onClick={handleSubmit}
              className="labTestComponentsAddNewLTC-add-footer-button"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

LabTestComponentsAddNewLTC.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LabTestComponentsAddNewLTC;
