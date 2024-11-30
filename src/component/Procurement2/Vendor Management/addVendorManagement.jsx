/* Ajhar Tamboli addUpdateVendorManagement.jsx 11-10-24 */

import React, { useState, useEffect } from 'react';
import "./addVendorManagement.css";

const AddUpdateVendorManagement = ({ onClose, vendorData, onSubmit }) => {
  // Initialize form state
  const [vendor, setVendor] = useState({
    vendor_id: '',
    vendorName: '',
    contactPerson: '',
    contactNumber: '',
    email: '',
    address: '',
    taxId: '',
    rating: '',
    vendorType: '',
    registeredDate: '',
    associatedContracts: '',
    paymentsTerms: '',
    status: ''
  });

  // Load vendor data into the form if it's available (for update)
  useEffect(() => {
    if (vendorData) {
      setVendor(vendorData);
    }
  }, [vendorData]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSubmit function passed from parent component with vendor data
    onSubmit(vendor);
    onClose(); // Close the form after submission
  };



  return (
    <div className="addVendorManagement-container">
      <div className="addVendorManagement-header">
        <h3>{vendorData ? 'Update Vendor Management' : 'Add Vendor Management'}</h3>
        <button className="addVendorManagement-close-btn" onClick={onClose}>x</button>
      </div>

      <form className="addVendorManagement-form" onSubmit={handleSubmit}>
        <div className="addVendorManagement-form-row">

          {/* First Row */}
          <div className="addVendorManagement-form-group-1row">
            <div className="addVendorManagement-form-group">
              <label>Vendor ID<span>*</span></label>
              <input
                type="text"
                name="vendor_id"
                value={vendor.vendor_id}
                onChange={handleInputChange}
                placeholder="Enter Vendor ID"
              />
            </div>
            <div className="addVendorManagement-form-group">
              <label>Vendor Name<span>*</span></label>
              <input
                type="text"
                name="vendorName"
                value={vendor.vendorName}
                onChange={handleInputChange}
                placeholder="Enter Vendor Name"
                

              />
            </div>
          </div>

          {/* Second Row */}
          <div className="addVendorManagement-form-group-1row">
            <div className="addVendorManagement-form-group">
              <label>Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={vendor.contactPerson}
                onChange={handleInputChange}
                placeholder="Enter Contact Person"
              />
            </div>
            <div className="addVendorManagement-form-group">
              <label>Contact Number<span>*</span></label>
              <input
                type="text"
                name="contactNumber"
                value={vendor.contactNumber}
                onChange={handleInputChange}
                placeholder="Enter Contact Number"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="addVendorManagement-form-group-1row">
            <div className="addVendorManagement-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={vendor.email}
                onChange={handleInputChange}
                placeholder="Enter Email Address"
              />
            </div>
            <div className="addVendorManagement-form-group">
              <label>Vendor Address<span>*</span></label>
              <input
                type="text"
                name="address"
                value={vendor.address}
                onChange={handleInputChange}
                placeholder="Enter Vendor Address"
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="addVendorManagement-form-group-1row">
            <div className="addVendorManagement-form-group">
              <label>Tax ID</label>
              <input
                type="text"
                name="taxId"
                value={vendor.taxId}
                onChange={handleInputChange}
                placeholder="Enter Tax ID"
              />
            </div>
            <div className="addVendorManagement-form-group">
              <label>Vendor Rating</label>
              <input
                type="text"
                name="rating"
                value={vendor.rating}
                onChange={handleInputChange}
                placeholder="Enter Vendor Rating"
              />
            </div>
          </div>

          {/* Fifth Row */}
          <div className="addVendorManagement-form-group-1row">
            <div className="addVendorManagement-form-group">
              <label>Vendor Type</label>
              <input
                type="text"
                name="vendorType"
                value={vendor.vendorType}
                onChange={handleInputChange}
                placeholder="Enter Vendor Type"
              />
            </div>
            <div className="addVendorManagement-form-group">
              <label>Registered Date</label>
              <input
                type="date" style={{marginLeft: '50px'}}
                name="registeredDate"
                value={vendor.registeredDate}
                onChange={handleInputChange}
                placeholder="Enter Registered Date"
              />
            </div>
          </div>

          {/* Sixth Row */}
          <div className="addVendorManagement-form-group-1row">
            <div className="addVendorManagement-form-group">
              <label>Associated Contracts</label>
              <input
                type="text"
                name="associatedContracts"
                value={vendor.associatedContracts}
                onChange={handleInputChange}
                placeholder="Enter Associated Contracts"
              />
            </div>
            <div className="addVendorManagement-form-group">
              <label>Payment Terms</label>
              <input
                type="text"
                name="paymentsTerms"
                value={vendor.paymentsTerms}
                onChange={handleInputChange}
                placeholder="Enter Payment Terms"
              />
            </div>
          </div>

          {/* Seventh Row */}
          <div className="addVendorManagement-form-group-1row">
            <div className="addVendorManagement-form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={vendor.status}
                onChange={handleInputChange}
                placeholder="Enter Status"
              />
            </div>
          </div>

        </div>

        {/* Form Actions */}
        <div className="addVendorManagement-form-actions">
          <button type="submit" className="addVendorManagement-add-btn">
            {vendorData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUpdateVendorManagement;
