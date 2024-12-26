import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './CSSDKitCategory.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../api/api';

const CSSDItemMaster = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSave = async () => {
    const data = {
      description,
      status,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/kit-categories`, data);
      console.log('Save Successful:', response.data);
      alert('Kit category saved successfully!');
    } catch (error) {
      console.error('Error saving kit category:', error);
      alert('Failed to save kit category. Please try again.');
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="CSSDKitCategory-container">
      <div className="CSSDItemMaster-header">
        <div className="CSSDItemMaster-heading">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="back-icon"
            onClick={handleClose}
          />
          <h2>CSSD Category</h2>
        </div>
      </div>
      <div className="CSSDKitCategory-content">
        <div className="CSSDKitCategory-formContainer">
          <div className="CSSDKitCategory-formGroup">
            <label>Kit Category Type:</label>
            <input
              type="text"
              placeholder="Enter Category Type"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="CSSDKitCategory-formGroup">
            <label>Description:</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Status:</label>
            <div className="CSSDItemMaster-statusOptions">

              <input
                type="radio"
                value="Active"
                checked={status === 'Active'}
                onChange={() => setStatus('Active')}
              />
              Active

              <input
                type="radio"
                value="Inactive"
                checked={status === 'Inactive'}
                onChange={() => setStatus('Inactive')}
              />
              Inactive

            </div>
          </div>

          <div className="CSSDKitCategory-buttonContainer">

            <button onClick={handleSave}>Save</button>
          </div>
        </div>
        ''
      </div>
    </div>
  );
};

export default CSSDItemMaster;
