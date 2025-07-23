import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API requests
import './AddCompany.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const AddCompany = ({ closeModal }) => { // Accept closeModal as a prop
  const [companyName, setCompanyName] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
// Validate all fields
if (!companyName?.trim() || !code?.trim() || !address?.trim() || !email?.trim() || !contactNo?.trim() || !description?.trim()) {
  toast.error("Please fill in all required fields.");
  return;
}

    const newCompany = {
      companyName,
      code,
      address,
      email,
      contactNo,
      description,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/company/saveCompany`, newCompany);
      console.log('Company saved:', response.data);
      toast.success('Proposal saved successfully!');

      closeModal();
    } catch (error) {
      console.error('Error saving company:', error);
      toast.error('Failed to save proposal. Please try again.');

    }
  };

  return (
    <div className="add-company-model">
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit} className='add-company-form'>
        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Company Name"}
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          />
         <FloatingInput
          label={"Code"}
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          />
        </div>

       
        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Address"}
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          />
         <FloatingInput
           label={"Email"}
           type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          
          />
        </div>

       

        <div className="add-companyFormGroup">
          <FloatingInput
          label={"Contact No"}
          type="text"
          placeholder="Contact No"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value)}
          />
          <FloatingInput
          label={"Description"}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        
        </div>

       

        <button type="submit" className="MeasssBtnAdd">Add Company</button>
      </form>
    </div>
  );
};

export default AddCompany;
