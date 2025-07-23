
import React, { useState } from "react";
import { API_BASE_URL } from "../../../api/api";
import "./assetCategoryMasterPopUp.css";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../../FloatingInputs";

const AssetCategoryMasterPopUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    assetCategory: "",
    underCategory: "",
    depreciation: "",
    salvage: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;


    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      assetCategory: "",
      underCategory: "",
      depreciation: "",
      salvage: "",
      status: "Active",
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/asset-categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const textResponse = await response.text();

      if (response.ok) {
          toast.success("Form Data Saved Successfully");
          onClose();
      } else {
        toast.error(`Failed to save data: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving the data.");
    }
  };

  const handleSearch = () => {
    if (formData.assetCategory) {
      alert(`Searching for: ${formData.assetCategory}`);
      console.log("Search Data:", formData);
    } else {
      alert("Please enter an Asset Category to search.");
    }
  };

  const handleClose = () => {
    alert("Form Closed!");
    handleClear();
  };

  const handleDelete = () => {
    alert("Delete functionality not implemented yet.");
  };

  const handleTracking = () => {
    alert("Tracking functionality not implemented yet.");
  };

  const handlePrint = () => {
    alert("Print functionality not implemented yet.");
  };

  const handleVersionComparison = () => {
    alert("Version Comparison functionality not implemented yet.");
  };

  const handleSDC = () => {
    alert("SDC functionality not implemented yet.");
  };

  const handleTesting = () => {
    alert("Testing functionality not implemented yet.");
  };

  const handleInfo = () => {
    alert("Info functionality not implemented yet.");
  };

  return (
    <div className="assetCategoryMasterPopUp-container">
      <div className="assetCategoryMasterPopUp-header">
        <h4>Asset Category Master</h4>
      </div>

      <div className="assetCategoryMasterPopUp-form">
        <div className="assetCategoryMasterPopUp-form-row">
          <div className="assetCategoryMasterPopUp-form-group-1row">
            <div className="assetCategoryMasterPopUp-form-group">
              <FloatingInput
              label={"Asset Category"}
               type="text"
               name="assetCategory"
               placeholder="Enter Asset Category"
               value={formData.assetCategory}
               onChange={handleChange}
               restrictions={{char:true}}
               required
              />
            </div>
            <div className="assetCategoryMasterPopUp-form-group">
              <FloatingInput
              label={"Under Category"}
              type="text"
              name="underCategory"
              placeholder="Enter Under Category"
              value={formData.underCategory}
              onChange={handleChange}
              required
              />
            </div>
          </div>

          <div className="assetCategoryMasterPopUp-form-group-1row">
            <div className="assetCategoryMasterPopUp-form-group">
              <FloatingInput
              label={"Depreciation"}
               type="text"
               name="depreciation"
               placeholder="Enter Depreciation (%)"
               value={formData.depreciation}
               onChange={handleChange}
              />
            </div>
            <div className="assetCategoryMasterPopUp-form-group">
              <FloatingInput
              label={"Salvage"}
              type="text"
              name="salvage"
              placeholder="Enter Salvage (%)"
              value={formData.salvage}
              onChange={handleChange}
              />
            </div>
          </div>

          <div className="assetCategoryMasterPopUp-form-group-1row">
            <div className="assetCategoryMasterPopUp-form-group">
              <label htmlFor="status">Status:</label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="assetCategoryMasterPopUp-form-actions">
        <button
          className="assetCategoryMasterPopUp-add-btn"
          onClick={handleSave}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AssetCategoryMasterPopUp;
