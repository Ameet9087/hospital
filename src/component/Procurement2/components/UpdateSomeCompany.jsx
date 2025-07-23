import React, { useState, useEffect } from 'react';
import './UpdateSomeCompany.css';
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const UpdateSomeCompany = ({ company, closeModal }) => {
  // Set initial state for the company fields using the passed `company` prop
  const [companyData, setCompanyData] = useState({
    companyName: company?.companyName || '',
    code: company?.code || '',
    address: company?.address || '',
    email: company?.email || '',
    contactNo: company?.contactNo || '',
    description: company?.description || ''
  });

  // Update the form fields as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make an API request to update the company data
      console.log(companyData)
      await axios.put(`${API_BASE_URL}/company/updateCompany/${company.id}`, companyData);
      // alert('Company updated successfully!');
      toast.success('Proposal saved successfully!');

      closeModal(); // Close the modal after successful update
    } catch (error) {
      toast.error('Failed to save proposal. Please try again.');

      // alert('Failed to update company: ' + error.message);
    }
  };

  return (
    <div className="add-company-model">
      <h2>Update Some Company</h2>
      <form onSubmit={handleSubmit} className='add-company-form'>
        <div className="add-companyFormGroup">
          <FloatingInput
           label={"Company Name"}
           type="text"
           name="companyName"
           value={companyData.companyName}
           onChange={handleInputChange}
           placeholder="Some Company"
           required
          />
        
        </div>

        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Code"}
          type="text"
          name="code"
          value={companyData.code}
          onChange={handleInputChange}
          placeholder="Code"
          required
          />
         
        </div>

        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Address"}
          type="text"
          name="address"
          value={companyData.address}
          onChange={handleInputChange}
          placeholder="Address"
          />
         
        </div>

        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Email"}
          type="email"
          name="email"
          value={companyData.email}
          onChange={handleInputChange}
          placeholder="Email"
          />
         
        </div>

        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Contact No"}
          type="text"
          name="contactNo"
          value={companyData.contactNo}
          onChange={handleInputChange}
          placeholder="Contact No"
          />
       
        </div>

        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Description"}
          type="text"
          name="description"
          value={companyData.description}
          onChange={handleInputChange}
          placeholder="Description"
          />
       
        </div>

        <button type="submit" className="MeasssBtnAdd">Update</button>
      </form>
    </div>
  );
};

export default UpdateSomeCompany;
