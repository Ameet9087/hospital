import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

import './ManageSubstore.css';
import CustomModal from '../CustomModel/CustomModal';
import { API_BASE_URL } from '../api/api';

const ManageSubstore = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubstore, setSelectedSubstore] = useState(null);
  const [substores, setSubstores] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch substores on component mount
  useEffect(() => {
    const fetchSubstores = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/substores`);
        setSubstores(response.data);
      } catch (error) {
        console.error('Error fetching substores:', error);
      }
    };
    fetchSubstores();
  }, []);

  const handleAddClick = () => {
    setSelectedSubstore(null); // Reset selected substore for "Add" mode
    setShowModal(true);
  };

  const handleEditClick = (substore) => {
    setSelectedSubstore(substore); // Set selected substore for "Edit" mode
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSubstore(null);
  };

  return (
    <div className="manage-substore-page">
      <div className="manage-substore-table-container">
        <div className="manage-substore-manage-section">
          <h1 className="manage-add-substore-btn" onClick={handleAddClick}>+ Add Substore</h1>
          <div className="manage-substore-results-info">Showing {substores.length} results</div>
        </div>
        <input type="text" placeholder="Search" className="manage-substore-search-input" />

        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Name",
                "Code",
                "Email",
                "Contact No",
                "Location",
                "Description",
                "Label",
                "Action"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {substores.map((substore, index) => (
              <tr key={index}>
                <td>{substore.subStoreName}</td>
                <td>{substore.code}</td>
                <td>{substore.email}</td>
                <td>{substore.contactNo}</td>
                <td>{substore.location}</td>
                <td>{substore.subStoreDescription}</td>
                <td>{substore.label}</td>
                <td>
                  <Button className="manage-store-edit-btn" onClick={() => handleEditClick(substore)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
<CustomModal isOpen={showModal} onClose={handleCloseModal}>
<UpdateSubStore substore={selectedSubstore} onClose={handleCloseModal}/>
</CustomModal>
    </div>
  );
};

const UpdateSubStore = ({ substore, onClose }) => {
  const [formData, setFormData] = useState({
    subStoreName: substore?.subStoreName || '',
    code: substore?.code || '',
    email: substore?.email || '',
    contactNo: substore?.contactNo || '',
    location: substore?.location || '',
    subStoreDescription: substore?.subStoreDescription || '',
    label: substore?.label || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (substore) {
        console.log(formData);
        
        await axios.put(`${API_BASE_URL}/substores/${substore.subStoreId}`, formData);
      } else {
        // Add new substore
        await axios.post(`${API_BASE_URL}/substores/save`, formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving substore:', error);
    }
  };

  return (
    <div className="update-substore-modal-container">
      <div className="update-substore-modal-header">
        <h2>{substore ? "Update SubStore" : "Add SubStore"}</h2>
      </div>
      <form className="update-substore-form-container" onSubmit={handleSubmit}>
        <div className="update-substore-form-group">
          <label>SubStore Name<span className="update-substore-required">*</span>:</label>
          <input type="text" name="subStoreName" value={formData.subStoreName} onChange={handleInputChange} className="update-substore-input-field" required />
        </div>
        <div className="update-substore-form-group">
          <label>Code :</label>
          <input type="text" name="code" value={formData.code} onChange={handleInputChange} className="update-substore-input-field" readOnly={!!substore} />
        </div>
        <div className="update-substore-form-group">
          <label>Email :</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="update-substore-input-field" />
        </div>
        <div className="update-substore-form-group">
          <label>Contact No :</label>
          <input type="text" name="contactNo" value={formData.contactNo} onChange={handleInputChange} className="update-substore-input-field" />
        </div>
        <div className="update-substore-form-group">
          <label>Location :</label>
          <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="update-substore-input-field" />
        </div>
        <div className="update-substore-form-group">
          <label>SubStore Description :</label>
          <textarea name="subStoreDescription" value={formData.subStoreDescription} onChange={handleInputChange} className="update-substore-textarea-field"></textarea>
        </div>
        <div className="update-substore-form-group">
          <label>Label :</label>
          <input type="text" name="label" value={formData.label} onChange={handleInputChange} className="update-substore-input-field" />
        </div>
        <button type="submit" className="update-substore-update-btn">{substore ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ManageSubstore;
