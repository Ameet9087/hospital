import React, { useEffect, useState } from "react";
import "./AddInvoiceHeader.css";
import { API_BASE_URL } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../FloatingInputs";

const InvoiceHeaderForm = ({ closeModal, invoiceHeader }) => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    address: "",
    telephone: "",
    email: "",
    pinCode: "",
    headerDescription: "",
    isActive: true,
  });
  const [image, setImage] = useState(null);
  const [invoiceHeaderId, setInvoiceHeaderId] = useState(null);
  
  const isEditing = !!invoiceHeader;
  
  useEffect(() => {
    if (invoiceHeader) {
      setInvoiceHeaderId(invoiceHeader.id);
      setFormData({
        hospitalName: invoiceHeader.hospitalName,
        address: invoiceHeader.address,
        telephone: invoiceHeader.telephone,
        email: invoiceHeader.email,
        headerDescription: invoiceHeader.headerDescription,
        isActive: invoiceHeader.isActive,
        pinCode: invoiceHeader.pinCode,
        logoImage: invoiceHeader.logoImage,
      });
    }
  }, [invoiceHeader]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(
      "invoiceHeader",
      JSON.stringify({
        ...formData,
        isActive: formData.isActive ? "Y" : "N",
      })
    );
    
    if (image && typeof image !== "string") {
      form.append("logoImage", image);
    }

    try {
      const response = isEditing
        ? await fetch(`${API_BASE_URL}/invoice-headers/update/${invoiceHeaderId}`, {
            method: "PUT",
            body: form,
          })
        : await fetch(`${API_BASE_URL}/invoice-headers/add`, {
            method: "POST",
            body: form,
          });
      
      if (response.ok) {
        closeModal();
        toast.success(`Invoice Header ${isEditing ? "updated" : "added"} successfully!`);
      } else {
        toast.error(`Failed to ${isEditing ? "update" : "add"} Invoice Header. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} invoice header:`, error);
    }
  };

  return (
    <div className="AddInvoiceHeader-invoice-header-form">
      <h2 className="AddInvoiceHeader-heading">
        {isEditing ? "Edit Invoice Header" : "Add Invoice Header"}
      </h2>
      <form onSubmit={handleSubmit} className="AddInvoiceHeader-grid">
        <div className="AddInvoiceHeader-form-row">
          <FloatingInput
          label={"Hospital Name"}
          type="text" 
          name="hospitalName" 
          id="hospitalName" 
          value={formData.hospitalName} 
          onChange={handleChange} required
          restrictions={{char:true}} />
         
        </div>

        <div className="AddInvoiceHeader-form-row">
          <FloatingInput
          label={"Address"}
          type="text" name="address" 
          id="address" 
          value={formData.address} 
          onChange={handleChange} required/>
          
        </div>

        <div className="AddInvoiceHeader-form-row">
          <FloatingInput
          label={"Telephone"}
          type="text" 
          name="telephone" 
          id="telephone" 
          value={formData.telephone} 
          onChange={handleChange} required/>
          
        </div>

        <div className="AddInvoiceHeader-form-row">
          <FloatingInput
          label={"Email"}
          type="email" name="email" 
          id="email" 
          value={formData.email} 
          onChange={handleChange} required/>
         
        </div>

        <div className="AddInvoiceHeader-form-row">
          <FloatingInput
          label={"Pin Code"}
          type="text" 
          name="pinCode" 
          id="pinCode" 
          value={formData.pinCode} 
          onChange={handleChange} required/>
         
        </div>

        <div className="AddInvoiceHeader-form-row">
          <FloatingInput
          label={"Header Description"}
          type="text" 
          name="headerDescription" 
          id="headerDescription" 
          value={formData.headerDescription} 
          onChange={handleChange} required/>
          
        </div>

        <div className="AddInvoiceHeader-form-row">
          <label htmlFor="logoImage">Logo Image {!isEditing && <span>*</span>}</label>
          <input type="file" name="logoImage" id="logoImage" accept="image/*" onChange={handleFileChange} required={!isEditing} />
        </div>

        <div className="AddInvoiceHeader-form-row">
          <label htmlFor="isActive">Is Active</label>
          <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} />
        </div>

        <button type="submit" className="AddInvoiceHeader-save-button">
          {isEditing ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default InvoiceHeaderForm;
