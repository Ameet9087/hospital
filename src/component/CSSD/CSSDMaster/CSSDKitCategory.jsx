import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './CSSDKitCategory.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../api/api';
import FloatingInput from '../../../FloatingInputs/FloatingInput';
import FloatingSelect from '../../../FloatingInputs/FloatingSelect';
import FloatingTextarea from '../../../FloatingInputs/FloatingTextarea';
import { toast } from 'react-toastify';

const CSSDItemMaster = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Active');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/kit-categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleSave = async () => {
    const data = {
      description,
      status,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/kit-categories`, data);
      console.log('Save Successful:', response.data);
      toast.success('Kit category saved successfully!');
    } catch (error) {
      toast.error('Error saving kit category:', error);
      toast.error('Failed to save kit category. Please try again.');
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
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
            <FloatingInput
            label={"Kit Category Type"}
            type="text"
              placeholder="Enter Category Type"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              restrictions={{char:true}}/>
           
          </div>
          <div className="CSSDKitCategory-formGroup">
            <FloatingInput
            label={"Description"}
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
            
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

    <div className="CSSDKitCategory-tableContainer">
          <h3>All Categories</h3>
          <table className="CSSDKitCategory-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.kitCategoryId}>
                    <td>{category.kitCategoryId}</td>
                    <td>{category.description}</td>
                    <td>{category.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

    </>
  );
};

export default CSSDItemMaster;
