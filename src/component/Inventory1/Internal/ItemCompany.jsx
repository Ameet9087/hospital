import React, { useState } from 'react';
import './ItemCompany.css';

const ItemCompany = ({onClose}) => {
  const [companyName, setCompanyName] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCompany = {
      companyName,
      code,
      address,
      email,
      contactNo,
      description
    };

    try {
      const response = await fetch(`${API_BASE_URL}/company/saveCompany`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCompany),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle success
      setSuccess('Company added successfully!');
      setCompanyName('');
      setCode('');
      setAddress('');
      setEmail('');
      setContactNo('');
      setDescription('');
    } catch (error) {
      // Handle error
      setError('Failed to add company: ' + error.message);
    }
  };

  return (
    <div className="itemmmAddItemSubcategory">
      <h2>Add Company</h2>
      <button className="vendddCloseButton" onClick={onClose}>
          &times;
        </button>
      <form onSubmit={handleSubmit}>
        <div className="itemmmFormGroup">
          <label>Company Name<span className="itemmmRequired">*</span></label>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="itemmmFormGroup">
          <label>Code</label>
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="itemmmFormGroup">
          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="itemmmFormGroup">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="itemmmFormGroup">
          <label>Contact No.</label>
          <input
            type="text"
            placeholder="Contact No."
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div className="itemmmFormGroup">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        {error && <p className="itemmmError">{error}</p>}
        {success && <p className="itemmmSuccess">{success}</p>}
        
        <button type="submit" className="itemmmBtnAdd">Add Company</button>
      </form>
    </div>
  );
}

export default ItemCompany;
