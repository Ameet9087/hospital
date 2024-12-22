/* Mohini_SettingCategory_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import * as XLSX from 'xlsx';

const initialUserData = {
  name: '',
  contactNumber: '',
  description: '',
  contactAddress: '',
  email: '',
  isActive: false,
};

const SettingCompany = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(initialUserData);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);



  useEffect(() => {
    // Fetch initial data from the API
    axios.get(`${API_BASE_URL}/companies`)
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);
const filteredUsers = suppliers.filter(user =>
  (user.name || '').toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleShowEditModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser(initialUserData);
      setIsEditMode(false);
    }
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(initialUserData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl = `${API_BASE_URL}/companies`;
    const apiMethod = isEditMode ? axios.put : axios.post;
    const apiData = {
      companyName: selectedUser.name,
      contactNumber: selectedUser.contactNo,
      description: selectedUser.description,
      contactAddress: selectedUser.contactAddress,
      email: selectedUser.email,
      isActive: selectedUser.isActive,
    };

    apiMethod(apiUrl, apiData)
      .then(response => {
        const updatedSuppliers = isEditMode
          ? suppliers.map(supplier =>
              supplier.id === response.data.id ? response.data : supplier
            )
          : [...suppliers, response.data];

        setSuppliers(updatedSuppliers);
        handleCloseModal();
      })
      .catch(error => console.error('Error submitting supplier data:', error));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setSelectedUser(prevState => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };


  return (
    <div className="setting-supplier-container">
      <CustomAlerts/>
      <div className="setting-supplier-header">
        <button
          className="setting-supplier-add-user-button"
          onClick={() => handleShowEditModal()}
        >
          + Add Company
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        <div className='setting-supplier-span'>
  <span>Showing {suppliers.length} results</span>
  <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      <div className='table-container'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[ "Company Name",
  "Contact No",
  "Description",
  "Contact Address",
  "Email",
  "Action"].map((header, index) => (
                                    <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
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
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.companyName}</td>
                <td>{user.contactNumber}</td>
                <td>{user.description}</td>
                <td>{user.contactAddress}</td>
                <td>{user.email}</td>
                <td className="setting-supplier-action-buttons">
                  <button
                    className="setting-supplier-action-button"
                    onClick={() => handleShowEditModal(user)}
                  >
                    Edit
                  </button>
                  <button className="setting-supplier-action-button">Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="setting-supplier-pagination">
          <div className="setting-supplier-pagination-controls">
            <button>First</button>
            <button>Previous</button>
            <button>1</button>
            <button>Next</button>
            <button>Last</button>
          </div>
        </div> */}
      </div>

      <CustomModal
  isOpen={showEditModal}
  onClose={handleCloseModal}
  className="supplier-setting-supplier-update-modal"
>
  <div className="supplier-setting-form">
    <div className="supplier-setting-header">
      <h2>{isEditMode ? 'Update Company' : 'Add Company'}</h2>
      <button className="close-btn" onClick={handleCloseModal}>×</button>
    </div>

    <div className="supplier-setting-form-content">
      <Form onSubmit={handleSubmit}>
        <div className="supplier-setting-form-row">
          <Form.Group controlId="companyName" className="supplier-setting-form-group col-md-6">
            <Form.Label>Company Name<span className="supplier-setting-text-danger">*</span>:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company Name"
              name="name"
              required
              value={selectedUser.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="contactNumber" className="supplier-setting-form-group col-md-6">
            <Form.Label>Contact Number<span className="supplier-setting-text-danger">*</span>:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Contact Number"
              name="contactNo"
              required
              value={selectedUser.contactNo}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <div className="supplier-setting-form-row">
          <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              name="description"
              value={selectedUser.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="contactAddress" className="supplier-setting-form-group col-md-6">
            <Form.Label>Contact Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Contact Address"
              name="contactAddress"
              value={selectedUser.contactAddress}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <div className="supplier-setting-form-row">
          <Form.Group controlId="email" className="supplier-setting-form-group col-md-6">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={selectedUser.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="isActive" className="supplier-setting-form-group col-md-6">
            <Form.Check
              type="checkbox"
              label="Is Active"
              name="isActive"
              checked={selectedUser.isActive}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>

        <div className="supplier-setting-footer">
          <Button variant="primary" type="submit">
            {isEditMode ? 'Update' : 'Add'}
          </Button>
        </div>
      </Form>
    </div>
  </div>
</CustomModal>

    </div>
  );
};

export default SettingCompany;
/* Mohini_SettingCategory_WholePage_14/sep/2024 */
