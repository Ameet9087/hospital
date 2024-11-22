/* Mohini_SettingSupplier_WholePage_14/sep/2024 */
import React, { useState,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
const initialUser = {
  name: '',
  contactNo: '',
  description: '',
  city: '',
  kraPin: '',
  contactAddress: '',
  email: '',
  creditPeriod: '', // Ensure creditPeriod is correctly handled
  dda: '',
  isActive: false,
};
const SettingSupplierComponent = () => {
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(initialUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  const handleShowEditModal = (user = initialUser) => {
    setSelectedUser(user);
    setIsEditMode(Boolean(user && user.kraPin)); // Use kraPin for edit mode check
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(initialUser);
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
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



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure creditPeriod is a number
    const dataToSend = {
      ...selectedUser,
      creditPeriod: selectedUser.creditPeriod ? Number(selectedUser.creditPeriod) : 0,
    };

    try {
      if (isEditMode) {
        // Update existing supplier
        const response = await axios.put(`${API_BASE_URL}/suppliers/${selectedUser.kraPin}`, dataToSend);
        console.log('Update Response:', response.data);
      } else {
        // Add new supplier
        const response = await axios.post(`${API_BASE_URL}/suppliers/create-supplier`, dataToSend);
        console.log('Add Response:', response.data);
      }

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      handleCloseModal();
      // Optionally, refetch the suppliers list
      // fetchSuppliers();
    } catch (error) {
      console.error('Error saving supplier data:', error.response ? error.response.data : error.message);
      alert('Error saving data. Please try again.');
    }
  };











  

  return (
    <div className="setting-supplier-container">
      <CustomAlerts/>
      <div className="setting-supplier-header">
        <button
          className="setting-supplier-add-user-button"
          onClick={() => handleShowEditModal()}
        >
          + Add Supplier
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="setting-supplier-manage-users-search-input"
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
                                {["Supplier Name",
  "Contact No",
  "Description",
  "City",
  "KRA PIN",
  "Contact Address",
  "Email",
  "Credit Period",
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
            {suppliers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.contactNo}</td>
                <td>{user.description}</td>
                <td>{user.city}</td>
                <td>{user.kraPin}</td>
                <td>{user.contactAddress}</td>
                <td>{user.email}</td>
                <td>{user.creditPeriod}</td>
                <td className="setting-supplier-action-buttons">
                  <button
                    className="setting-supplier-action-button"
                    onClick={() => handleShowEditModal(user)}
                  >
                    Edit
                  </button>
                  <button className="setting-supplier-action-button">
                    Deactivate
                  </button>
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
  <div className="supplier-form-grid">
    <div className="supplier-form-grid1">
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Supplier Name</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter Supplier Name"
                name="name"
                required
                value={selectedUser.name || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Contact</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter Contact Number"
                name="contactNo"
                required
                value={selectedUser.contactNo || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                name="description"
                value={selectedUser.description || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>City</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter City"
                name="city"
                value={selectedUser.city || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Credit Period</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter Credit Period"
                name="creditPeriod"
                value={selectedUser.creditPeriod || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>KRA PIN</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter KRA PIN"
                name="kraPin"
                required
                value={selectedUser.kraPin || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Contact Address</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="contactAddress"
                value={selectedUser.contactAddress || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>DDA</td>
            <td>
              <Form.Control
                type="text"
                placeholder="Enter DDA"
                name="dda"
                value={selectedUser.dda || ''}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <Form.Check
                type="checkbox"
                label="Active"
                name="isActive"
                checked={selectedUser.isActive || false}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="supplier-form-grid2">
      <div className="supplier-setting-form-actions">
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button> &nbsp; &nbsp;
        <Button variant="primary" type="submit" className='btnAddSupplier'>
          {isEditMode ? 'Update Supplier' : 'Add Supplier'}
        </Button>
      </div>
    </div>
  </div>
</CustomModal>

    </div>
  );
};

export default SettingSupplierComponent;
/* Mohini_SettingSupplier_WholePage_14/sep/2024 */
