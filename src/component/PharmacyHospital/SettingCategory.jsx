/* Mohini_SettingCategory_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css';
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';
import CustomModal from '../../CustomModel/CustomModal';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import useCustomAlert from '../../alerts/useCustomAlert';

const SettingCategory = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Track if it's edit or add mode
  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  useEffect(() => {

    axios.get(`${API_BASE_URL}/categories`)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const filteredUsers = (suppliers || []).filter(user =>
  user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  const handleShowEditModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true); // Set to edit mode
    } else {
      setSelectedUser({ name: '', description: '', isActive: true }); // Empty fields for new category
      setIsEditMode(false); // Set to add mode
    }
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = (event) => {
    console.log(selectedUser);
    
    event.preventDefault();
    const apiUrl = isEditMode
      ? `${API_BASE_URL}/categories/${selectedUser.id}` // Assuming `id` is part of the user object for updates
      : `${API_BASE_URL}/categories`;
    const method = isEditMode ? 'put' : 'post';

    axios({
      method,
      url: apiUrl,
      data: selectedUser
    })
      .then(response => {
        if (isEditMode) {
          setSuppliers(suppliers.map(supplier =>
            supplier.id === selectedUser.id ? response.data : supplier
          ));
        } else {
          setSuppliers([...suppliers, response.data]);
        }
        handleCloseModal();
      })
      .catch(error => {
        console.error('There was an error with the submission!', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setSelectedUser((prevState) => ({
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
          onClick={() => handleShowEditModal()} // Open the form for adding a new category
        >
          + Add Company Category
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
                                {[ "Category Name",
  "Description",
  "Is Active",
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
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td className="setting-supplier-action-buttons">
                  <button
                    className="setting-supplier-action-button"
                    onClick={() => handleShowEditModal(user)} // Open the form for editing the selected category
                  >
                    Edit
                  </button>
                  <button
                    className="setting-supplier-action-button"
                    onClick={() => {
                      // Handle deactivate action
                      axios.delete(`${API_BASE_URL}/categories/${user.id}`)
                        .then(() => {
                          setSuppliers(suppliers.filter(supplier => supplier.id !== user.id));
                        })
                        .catch(error => {
                          console.error('There was an error deactivating the category!', error);
                        });
                    }}
                  >
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
  <div className="supplier-setting-supplier-update-modal-header">
    <h5>{isEditMode ? 'Update Company Category' : 'Add Company Category'}</h5>
    {/* <button onClick={handleCloseModal} className="close-button">
      &times;
    </button> */}
  </div>
  <div className="supplier-setting-supplier-update-modal-body">
    <Form onSubmit={handleSubmit}>
      <div className="supplier-setting-form-row">
        <Form.Group controlId="categoryName" className="supplier-setting-form-group col-md-6">
          <Form.Label>
            Category Name<span className="supplier-setting-text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category Name"
            name="name"
            required
            value={selectedUser?.name || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            name="description"
            value={selectedUser?.description || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>
      <Form.Group controlId="isActive" className="supplier-setting-form-group col-md-6">
        <Form.Check
          type="checkbox"
          label="Is Active"
          name="isActive"
          checked={selectedUser?.isActive || false}
          onChange={handleInputChange}
        />
      </Form.Group>
      <div className="supplier-setting-text-right">
        <Button variant="primary" type="submit">
          {isEditMode ? 'Update' : 'Add'}
        </Button>
      </div>
    </Form>
  </div>
</CustomModal>

    </div>
  );
};

export default SettingCategory;
/* Mohini_SettingCategory_WholePage_14/sep/2024 */
