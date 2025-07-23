import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddSupplierForm.css";
import { API_BASE_URL } from "../api/api";
import { FloatingInput } from "../../FloatingInputs";
import { toast } from "react-toastify";
const AddSupplierForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    creditPeriod: "",
    contactAddress: "",
    email: "",
    contactNumber: "",
    city: "",
    kraPin: "",
    dda: "", // Initialize as an empty string
    additionalContact: "",
    isActive: false,
    isLedgerRequired: false,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value || "", // Ensure value is never undefined
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post(`${API_BASE_URL}/suppliers`, formData, {
        headers: {
          "Content-Type": "application/json", // Specify content type
        },
      });
      console.log("Response:", response);  // Hide after 3 seconds
      toast.success("saving supplier data")
      onClose();
    } catch (error) {
      console.error("Error saving supplier data:", error);
      toast.error("Error saving data. Please try again.");
    }
  };
  console.log("Form Data " + formData);
  return (
    <div className="add-supplier-form-modal-form">
      <div className="add-supplier-form-add-supplier-modal-content">
        <div className="SettingSupplier-container">
          <div className="SettingSupplier-section">
            <div className="SettingSupplier-header">Add Supplier</div>
            <form onSubmit={handleSubmit}>
              <div className="SettingSupplier-grid">
                <FloatingInput
                  label="Supplier Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  restrictions={{ char: true }} // Corrected restrictions object
                />

                <FloatingInput
                  label={"Description"}
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                />
                <FloatingInput
                  label={"Credit Period"}
                  type="text"
                  name="creditPeriod"
                  value={formData.creditPeriod}
                  onChange={handleChange}
                />
                <FloatingInput
                  label={"Contact Address"}
                  type="text"
                  name="contactAddress"
                  value={formData.contactAddress}
                  onChange={handleChange}
                  
                />
                <FloatingInput
                  label={"Email"}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FloatingInput
                  label={"Contact Number"}
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  restrictions={{ max: 10 }}
                  onChange={handleChange}
                />
                <FloatingInput
                  label={"City"}
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <FloatingInput
                  label={"Pin Code"}
                  type="text"
                  name="pin"
                  value={formData.kraPin}
                  onChange={handleChange}
                />
                <FloatingInput
                  label={"DDA"}
                  type="text"
                  name="dda"
                  value={formData.dda || ""} // Ensure value is never undefined
                  onChange={handleChange}
                />
                <FloatingInput
                  label={"Additional Contact Information"}
                  type="text"
                  name="additionalContact"
                  value={formData.additionalContact}
                  onChange={handleChange}
                />
                <FloatingInput label="Supplier" />
                <div className="AddSupplierForm-row-chechbox">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="iPBilling-checkbox-label"
                  >
                    Is Active
                  </label>
                </div>

                <div className="AddSupplierForm-row-chechbox">
                  <input
                    type="checkbox"
                    name="isLedgerRequired"
                    checked={formData.isLedgerRequired}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="allowMultiple"
                    className="iPBilling-checkbox-label"
                  >
                    Is Ledger Required
                  </label>
                </div>
              </div>
            </form>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="AddSupplierForm-Upload"
          >
            Save
          </button>
        </div>
        {showSuccessMessage && (
          <div className="add-supplier-form-success-message">
            Data saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};
export default AddSupplierForm;
