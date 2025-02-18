import React, { useState } from "react";
import "./UpdateVendor.css"; // Import the CSS file
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const UpdateVendor = ({ vendor, onClose }) => {
  const [formValues, setFormValues] = useState({
    vendorName: vendor?.vendorName || "",
    contactAddress: vendor?.contactAddress || "",
    contactNumber: vendor?.contactNumber || "",
    currencyCode: vendor?.currencyCode || "",
    vendorCode: vendor?.vendorCode || "",
    vendorCountry: vendor?.vendorCountry || "",
    kraPin: vendor?.kraPin || "",
    gstNo: vendor?.gstNo || "",
    aadharNo: vendor?.aadharNo || "",
    panNo: vendor?.panNo || "",
    contractStartDate:vendor?.contractStartDate|| "",
    contractEndDate:vendor?.contractEndDate||"",
    bankDetails: vendor?.bankDetails || "",
    contactPerson: vendor?.contactPerson || "",
    email: vendor?.email || "",
    creditPeriod: vendor?.creditPeriod || "",
    govtRegDate: vendor?.govtRegDate || "",
    isActive: vendor?.isActive ?? true,
    receiveDonation: vendor?.receiveDonation ?? false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear the error when the user starts typing
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const handleSubmit = async () => {
    const requiredFields = [
      "vendorName",
      "contactAddress",
      "contactNumber",
      "currencyCode",
      "vendorCode",
    ];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (formValues.email && !validateEmail(formValues.email)) {
      newErrors.email = "Invalid email format";
    }

    if (
      formValues.contactNumber &&
      !validatePhoneNumber(formValues.contactNumber)
    ) {
      newErrors.contactNumber = "Invalid contact number";
    }

    console.log(formValues);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields correctly!", {
        autoClose: 2000,
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/vendors/${vendor.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        toast.success("Vendor updated successfully!", { autoClose: 2000 });
        // alert("Vendor updated successfully!");
        onClose(); // Close the modal after successful update
      } else {
        toast.error("Failed to update vendor", { autoClose: 2000 });
        alert("Failed to update vendor");
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
      toast.error("An error occurred while updating the vendor", {
        autoClose: 2000,
      });
      alert("An error occurred while updating the vendor");
    }
  };

  return (
    <div className="vendddContainer">
      <h2 className="vendddHeading">Update Vendor</h2>
      <div className="vendddFormContainer">
        <div className="vendddColumn">
          <FloatingInput
            label={"Vendor Name"}
            name="vendorName"
            required
            value={formValues.vendorName}
            onChange={handleInputChange}
            placeholder="Vendor Name"
            error={errors.vendorName}
          />
          <FloatingInput
            label={"Contact Address"}
            name="contactAddress"
            required
            value={formValues.contactAddress}
            onChange={handleInputChange}
            placeholder="Contact Address"
            error={errors.contactAddress}
          />
          <FloatingInput
            label={"Contact Number"}
            name="contactNumber"
            required
            value={formValues.contactNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            error={errors.contactNumber}
          />
          <FloatingInput
            label={"KRA PIN"}
            name="kraPin"
            value={formValues.kraPin}
            onChange={handleInputChange}
            placeholder="KRA PIN"
          />
          <FloatingSelect
            value={formValues.vendorCountry}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select a Country" },
              { value: "Afghanistan", label: "Afghanistan" },
              { value: "Albania", label: "Albania" },
              { value: "Argentina", label: "Argentina" },
              { value: "Australia", label: "Australia" },
              { value: "Bangladesh", label: "Bangladesh" },
              { value: "Brazil", label: "Brazil" },
              { value: "Canada", label: "Canada" },
              { value: "China", label: "China" },
              { value: "Denmark", label: "Denmark" },
              { value: "Egypt", label: "Egypt" },
              { value: "France", label: "France" },
              { value: "Germany", label: "Germany" },
              { value: "India", label: "India" },
              { value: "Indonesia", label: "Indonesia" },
              { value: "Italy", label: "Italy" },
              { value: "Japan", label: "Japan" },
              { value: "Mexico", label: "Mexico" },
              { value: "Netherlands", label: "Netherlands" },
              { value: "New Zealand", label: "New Zealand" },
              { value: "Pakistan", label: "Pakistan" },
              { value: "Russia", label: "Russia" },
              { value: "Saudi Arabia", label: "Saudi Arabia" },
              { value: "South Africa", label: "South Africa" },
              { value: "South Korea", label: "South Korea" },
              { value: "Spain", label: "Spain" },
              { value: "Sweden", label: "Sweden" },
              { value: "Switzerland", label: "Switzerland" },
              { value: "Turkey", label: "Turkey" },
              { value: "United Arab Emirates", label: "United Arab Emirates" },
              { value: "United Kingdom", label: "United Kingdom" },
              { value: "United States", label: "United States" },
            ]}
          />

          <FloatingInput
            label={"Currency Code"}
            name="currencyCode"
            required
            value={formValues.currencyCode}
            onChange={handleInputChange}
            placeholder="Currency Code"
            error={errors.currencyCode}
          />
          <FloatingInput
            label={"Aadhar No"}
            name="aadharNo"
            required
            value={formValues.aadharNo}
            onChange={handleInputChange}
            placeholder="Aadhar No"
            error={errors.aadharNo}
          />
          <FloatingInput
            label={"GST NO"}
            name="gstNo"
            required
            value={formValues.gstNo}
            onChange={handleInputChange}
            placeholder="GST NO"
            error={errors.gstNo}
          />
          <FloatingInput
            label={"Pan Card"}
            name="panCard"
            required
            value={formValues.panCard}
            onChange={handleInputChange}
            placeholder="Pan Card"
            error={errors.panCard}
          />
           <FloatingInput
            label={"Contract Start Date"}
            name="contractStartDate"
            type="date"
            required
            value={formValues.contractStartDate}
            onChange={handleInputChange}
            error={errors.contractStartDate}
          />
        </div>
        <div className="vendddColumn">
        <FloatingInput
            label={"Contract End Date"}
            name="contractEndDate"
            type="date"
            required
            value={formValues.contractEndDate}
            onChange={handleInputChange}
            error={errors.contractEndDate}
          />
          <FloatingInput
            label={"Bank Details"}
            name="bankDetails"
            elementType="textarea"
            value={formValues.bankDetails}
            onChange={handleInputChange}
            placeholder="Bank details"
          />
          <FloatingInput
            label={"Vendor Code"}
            name="vendorCode"
            required
            value={formValues.vendorCode}
            onChange={handleInputChange}
            placeholder="Vendor Code"
            error={errors.vendorCode}
          />
          <FloatingInput
            label={"Contact Person"}
            name="contactPerson"
            value={formValues.contactPerson}
            onChange={handleInputChange}
            placeholder="Contact Person"
          />
          <FloatingInput
            label={"Email"}
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Email Address"
          />
          <FloatingInput
            label={"Credit Period (days)"}
            name="creditPeriod"
            elementType="number"
            value={formValues.creditPeriod}
            onChange={handleInputChange}
          />
          <FloatingInput
            label={"Govt Reg Date"}
            name="govtRegDate"
            elementType="date"
            value={formValues.govtRegDate}
            onChange={handleInputChange}
          />

          <label className="vendddAddLabel">
            <input
              type="checkbox"
              name="receiveDonation"
              checked={formValues.receiveDonation}
              onChange={handleInputChange}
            />
            Is Active
          </label>

          <label className="vendddAddLabel">
            <input
              type="checkbox"
              name="receiveDonation"
              checked={formValues.receiveDonation}
              onChange={handleInputChange}
            />
            Receive Donation
          </label>
        </div>
      </div>
      <button className="vendddAddButton" onClick={handleSubmit}>
        Update Vendor
      </button>
    </div>
  );
};

const VendddFormRow = ({
  label,
  name,
  required,
  elementType = "input",
  options = [],
  defaultChecked,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="vendddFormRow">
    <label className="vendddLabel">
      {label}
      {required && <span className="vendddRequired">*</span>}
    </label>
    <div className="vendddColon">:</div>
    {elementType === "input" && (
      <>
        <input
          className="vendddInput"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === "textarea" && (
      <>
        <textarea
          className="vendddTextarea"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === "select" && (
      <>
        <select
          className="vendddInput"
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === "checkbox" && (
      <>
        <input
          className="vendddCheckbox"
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === "date" && (
      <>
        <input
          className="vendddInput"
          type="date"
          name={name}
          value={value}
          onChange={onChange}
        />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === "number" && (
      <>
        <input
          className="vendddInput"
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
  </div>
);

export default UpdateVendor;
