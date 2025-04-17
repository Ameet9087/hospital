import React, { useState } from "react";
import "./AddVendor.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const AddVendor = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    vendorName: "",
    contactAddress: "",
    contactNumber: "",
    currencyCode: "",
    vendorCode: "",
    vendorCountry: "",
    kraPin: "",
    adharnumber: "",
    gstNumber: "",
    pancardNumber: "",
    contractStartdate: "",
    contractEndDate: "",
    bankDetails: "",
    contactPerson: "",
    email: "",
    creditPeriod: "",
    govtRegDate: "",
    isActive: true,
    receiveDonation: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear the error when the user starts typing
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "vendorName",
      "contactAddress",
      "contactNumber",
      "currencyCode",
      "vendorCode",
      "kraPin",
      "adharnumber",
      "gstNumber",
      "pancardNumber",
      "contractStartdate",
      "contractEndDate",
      "bankDetails",
      "contactPerson",
      "email",
      "creditPeriod",
      "govtRegDate",
    ];

    const newErrors = {};

    // Validate required fields
    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields!", { autoClose: 2000 });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/vendors/createVendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        toast.success("Vendor added successfully!", { autoClose: 2000 });
        setSuccessMessage("Vendor added successfully!");
        setErrorMessage("");

        // Reset form fields
        setFormValues({
          vendorName: "",
          contactAddress: "",
          contactNumber: "",
          currencyCode: "",
          vendorCode: "",
          kraPin: "",
          adharnumber: "",
          gstNumber: "",
          pancardNumber: "",
          contractStartdate: "",
          contractEndDate: "",
          bankDetails: "",
          contactPerson: "",
          email: "",
          creditPeriod: "",
          govtRegDate: "",
          isActive: true,
          receiveDonation: false,
        });

        onClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add vendor");
        toast.error(errorData.message || "Failed to add vendor", {
          autoClose: 2000,
        });
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred while adding the vendor");
      toast.error("An error occurred while adding the vendor", {
        autoClose: 2000,
      });
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <div>
        <h2 className="vendddHeading">Add Vendor</h2>
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
              label={"Vendor Country"}
              name="vendorCountry"
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
                {
                  value: "United Arab Emirates",
                  label: "United Arab Emirates",
                },
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
              name="adharnumber"
              required
              value={formValues.adharnumber}
              onChange={handleInputChange}
              placeholder="Aadhar No"
              error={errors.adharnumber}
            />
            <FloatingInput
              label={"GST NO"}
              name="gstNumber"
              required
              value={formValues.gstNumber}
              onChange={handleInputChange}
              placeholder="GST NO"
              error={errors.gstNumber}
            />
            <FloatingInput
              label={"Pan Card"}
              name="pancardNumber"
              required
              value={formValues.pancardNumber}
              onChange={handleInputChange}
              placeholder="Pan Card"
              error={errors.pancardNumber}
            />
            <FloatingInput
              label={"Contract Start Date"}
              name="contractStartdate"
              type="date"
              required
              value={formValues.contractStartdate}
              onChange={handleInputChange}
              error={errors.contractStartdate}
            />
          </div>
          {/* <div className="vendddColumn">
            <FloatingInput
              label={"Contract End Date"}
              name="contractEndDate"
              type="date"
              required
              value={formValues.contractEndDate}
              onChange={handleInputChange}
              error={errors.contractEndDate}
            />
          </div> */}
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
              type="date"
              elementType="date"
              value={formValues.govtRegDate}
              onChange={handleInputChange}
            />
            <label className="vendddAddLabel">
              <input
                type="checkbox"
                name="isActive"
                checked={formValues.isActive}
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
        {successMessage && (
          <div className="vendddSuccess">{successMessage}</div>
        )}
        {errorMessage && <div className="vendddError">{errorMessage}</div>}
        <button className="vendddAddButton" onClick={handleSubmit}>
          Add Vendor
        </button>
      </div>
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
        />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
  </div>
);

export default AddVendor;
