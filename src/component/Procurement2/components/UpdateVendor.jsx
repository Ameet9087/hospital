import React, { useState } from 'react';
import './UpdateVendor.css'; // Import the CSS file
import { API_BASE_URL } from '../../api/api';

const UpdateVendor = ({vendor, onClose }) => {
  const [formValues, setFormValues] = useState({
    vendorName: vendor?.vendorName || '',
    contactAddress: vendor?.contactAddress || '',
    contactNumber: vendor?.contactNumber || '',
    currencyCode: vendor?.currencyCode || '',
    vendorCode: vendor?.vendorCode || '',
    vendorCountry: vendor?.vendorCountry || '',
    kraPin: vendor?.kraPin || '',
    bankDetails: vendor?.bankDetails || '',
    contactPerson: vendor?.contactPerson || '',
    email: vendor?.email || '',
    creditPeriod: vendor?.creditPeriod || '',
    govtRegDate: vendor?.govtRegDate || '',
    isActive: vendor?.isActive ?? true,
    receiveDonation: vendor?.receiveDonation ?? false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error when the user starts typing
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhoneNumber = (number) => /^\d{10}$/.test(number);

  const handleSubmit = async () => {
    const requiredFields = ['vendorName', 'contactAddress', 'contactNumber', 'currencyCode', 'vendorCode'];
    const newErrors = {};

    requiredFields.forEach(field => {
      if (!formValues[field]) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    if (formValues.email && !validateEmail(formValues.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formValues.contactNumber && !validatePhoneNumber(formValues.contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number';
    }

    console.log(formValues);
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/vendors/${vendor.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          alert('Vendor updated successfully!');
          onClose(); // Close the modal after successful update
        } else {
          alert('Failed to update vendor');
        }
      } catch (error) {
        console.error('Error updating vendor:', error);
        alert('An error occurred while updating the vendor');
      }
    }
  };

  return (
    <div className="vendddContainer">
      <h2 className="vendddHeading">Update Vendor</h2>
      <div className="vendddFormContainer">
        <div className="vendddColumn">
          <VendddFormRow
            label="Vendor Name"
            name="vendorName"
            required
            value={formValues.vendorName}
            onChange={handleInputChange}
            placeholder="Vendor Name"
            error={errors.vendorName}
          />
          <VendddFormRow
            label="Contact Address"
            name="contactAddress"
            required
            value={formValues.contactAddress}
            onChange={handleInputChange}
            placeholder="Contact Address"
            error={errors.contactAddress}
          />
          <VendddFormRow
            label="Contact Number"
            name="contactNumber"
            required
            value={formValues.contactNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            error={errors.contactNumber}
          />
          <VendddFormRow
            label="KRA PIN"
            name="kraPin"
            value={formValues.kraPin}
            onChange={handleInputChange}
            placeholder="KRA PIN"
          />
          <VendddFormRow
            label="Vendor Country"
            name="vendorCountry"
            elementType="select"
            options={[
              "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
              // Add more country options here
            ]}
            value={formValues.vendorCountry}
            onChange={handleInputChange}
          />
          <VendddFormRow
            label="Currency Code"
            name="currencyCode"
            required
            value={formValues.currencyCode}
            onChange={handleInputChange}
            placeholder="Currency Code"
            error={errors.currencyCode}
          />
          <VendddFormRow
            label="Bank Details"
            name="bankDetails"
            elementType="textarea"
            value={formValues.bankDetails}
            onChange={handleInputChange}
            placeholder="Bank details"
          />
        </div>
        <div className="vendddColumn">
          <VendddFormRow
            label="Vendor Code"
            name="vendorCode"
            required
            value={formValues.vendorCode}
            onChange={handleInputChange}
            placeholder="Vendor Code"
            error={errors.vendorCode}
          />
          <VendddFormRow
            label="Contact Person"
            name="contactPerson"
            value={formValues.contactPerson}
            onChange={handleInputChange}
            placeholder="Contact Person"
          />
          <VendddFormRow
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Email Address"
          />
          <VendddFormRow
            label="Credit Period (days)"
            name="creditPeriod"
            elementType="number"
            value={formValues.creditPeriod}
            onChange={handleInputChange}
          />
          <VendddFormRow
            label="Govt Reg Date"
            name="govtRegDate"
            elementType="date"
            value={formValues.govtRegDate}
            onChange={handleInputChange}
          />
          <VendddFormRow
            label="Is Active"
            name="isActive"
            elementType="checkbox"
            defaultChecked
            value={formValues.isActive}
            onChange={handleInputChange}
          />
          <VendddFormRow
            label="Receive Donation"
            name="receiveDonation"
            elementType="checkbox"
            value={formValues.receiveDonation}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className="vendddAddButton" onClick={handleSubmit}>
        Update Vendor
      </button>
    </div>
  );
};

const VendddFormRow = ({ label, name, required, elementType = 'input', options = [], defaultChecked, value, onChange, placeholder, error }) => (
  <div className="vendddFormRow">
    <label className="vendddLabel">
      {label}
      {required && <span className="vendddRequired">*</span>}
    </label>
    <div className="vendddColon">:</div>
    {elementType === 'input' && (
      <>
        <input className="vendddInput" type="text" name={name} value={value} onChange={onChange} placeholder={placeholder} />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === 'textarea' && (
      <>
        <textarea className="vendddTextarea" name={name} value={value} onChange={onChange} placeholder={placeholder} />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === 'select' && (
      <>
        <select className="vendddInput" name={name} value={value} onChange={onChange}>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === 'checkbox' && (
      <>
        <input className="vendddCheckbox" type="checkbox" name={name} checked={value} onChange={onChange} defaultChecked={defaultChecked} />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === 'date' && (
      <>
        <input className="vendddInput" type="date" name={name} value={value} onChange={onChange} />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
    {elementType === 'number' && (
      <>
        <input className="vendddInput" type="number" name={name} value={value} onChange={onChange} placeholder={placeholder} />
        {error && <div className="vendddError">{error}</div>}
      </>
    )}
  </div>
);

export default UpdateVendor;
