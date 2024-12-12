import React, { useState } from 'react';
import axios from 'axios';
import './AddHeadCount.css';
import { API_BASE_URL } from '../../api/api';

const AddHeadCount = ({onClose}) => {
  const [accountHeadName, setHeadName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formGroup = {
      accountHeadName,
      description,
      active: isActive,
    };
    console.log(formGroup);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/account-heads`,
        formGroup);
      
      // Handle success
      setSuccess('Account head added successfully!');
  
      setHeadName('');
      setDescription('');
      setIsActive(true);
      onClose();
    } catch (error) {
      // Handle error
      setError('Failed to add account head. Please try again.');
      console.error('Error adding account head:', error);
    }
  };

  return (
    <div className="AddAccountHead-model">
      <h2>Add Account Head</h2>
      <form onSubmit={handleSubmit} className='AddAccountHead-form'>
        <div className="AddAccountHead-formgroup">
          <label>
            Add Head Name<span className="MeasssRequired">*</span>
          </label>
          <input
            type="text"
            placeholder="Add Head Name"
            value={accountHeadName}
            onChange={(e) => setHeadName(e.target.value)}
            required
          />
        </div>
       
        <div className="AddAccountHead-formgroup">
          <label>Description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
       
        <div className="AddAccountHead-formgroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
        </div>

        <button type="submit" className="MeasssBtnAdd">
          Add Account Head
        </button>

        {success && <div className="MeasssSuccessMessage">{success}</div>}
        {error && <div className="MeasssErrorMessage">{error}</div>}
      </form>
    </div>
  );
}

export default AddHeadCount;
