import React, { useState } from 'react';
import axios from 'axios';
import './AddHeadCount.css';
import { API_BASE_URL } from '../../api/api';
import { FloatingInput } from '../../../FloatingInputs';
import { toast } from 'react-toastify';
const AddHeadCount = ({onClose}) => {
  const [accountHeadName, setHeadName] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Validation check: Ensure all fields are filled
    if (!accountHeadName || !description) {
      toast.error('Please fill in all required fields.', { autoClose: 2000 });
      return;
    }
  
    const formGroup = {
      accountHeadName,
      description,
      active: isActive,
    };
  
    console.log(formGroup);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/account-heads`, formGroup);
      
      toast.success('Account head added successfully', { autoClose: 2000 });
      setSuccess('Account head added successfully!');
  
      // Reset the form
      setHeadName('');
      setDescription('');
      setIsActive(true);
      
      onClose();
    } catch (error) {
      toast.error('Failed to add account head. Please try again.');
      setError('Failed to add account head. Please try again.');
      console.error('Error adding account head:', error);
    }
  };
  
  

  return (
    <div className="AddAccountHead-model">
      <h2>Add Account Head</h2>
      <form onSubmit={handleSubmit} className='AddAccountHead-form'>
        <div className="AddAccountHead-formgroup">
         <FloatingInput
         label={"Add Head Name"}
         type="text"
         placeholder="Add Head Name"
         value={accountHeadName}
         onChange={(e) => setHeadName(e.target.value)}
         required
         />

       
        </div>
       
        <div className="AddAccountHead-formgroup">
          <FloatingInput
          label={"Description"}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          />
         
        </div>
       
        <div className="AddAccountHead-formgroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            required
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
