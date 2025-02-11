/* Mohini_SettingCategory_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css';
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';
import CustomModal from '../../CustomModel/CustomModal';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../alerts/useCustomAlert';

const SettingCategory = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [taxs, setTaxs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE_URL}/categories`)
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/taxes/get-all-taxes`)
      .then(response => setTaxs(response.data))
      .catch(error => console.error('Error fetching taxes:', error));
  }, []);

  const handleShowEditModal = (user = null) => {
    setSelectedUser(user ? user : { name: '', description: '', isActive: true });
    setIsEditMode(!!user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      subCategoryName: selectedUser.subCategoryName,
      categoryName: selectedUser.categoryName,
      code: selectedUser.code,
      musting: selectedUser.musting,
      general: selectedUser.general,
      considerForMis: selectedUser.considerForMis,
      description: selectedUser.description,
      tax: { taxesId: isEditMode ? selectedUser.tax.taxesId : selectedUser.tax }
    };

    const apiUrl = isEditMode
      ? `${API_BASE_URL}/categories/${selectedUser.categoryId}`
      : `${API_BASE_URL}/categories`;
    const method = isEditMode ? 'put' : 'post';

    axios({ method, url: apiUrl, data: formData })
      .then(response => {
        setSuppliers(isEditMode
          ? suppliers.map(supplier => (supplier.id === selectedUser.id ? response.data : supplier))
          : [...suppliers, response.data]
        );
        handleCloseModal();
      })
      .catch(error => console.error('Error submitting data:', error));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSelectedUser(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Categories Report');
    XLSX.writeFile(wb, 'CategoriesReport.xlsx');
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head><title>Print Table</title></head>
        <body>${printContent.outerHTML}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };



  
  // 🔹 **Filtering categories based on search term**
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="setting-supplier-container">
      <CustomAlerts />
      <div className="setting-supplier-header">
        <button className="setting-supplier-add-user-button" onClick={() => handleShowEditModal()}>
          + Add Category
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
        <span>Showing {filteredSuppliers.length} results</span>
        <button className='item-wise-export-button' onClick={handleExport}>Export</button>
        <button className='item-wise-print-button' onClick={handlePrint}>Print</button>
      </div>

      <div className='table-container'>
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Category Name", "Description", "Is Active", "Action"].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredSuppliers.map((user, index) => (
              <tr key={index}>
                <td>{user.categoryName}</td>
                <td>{user.description}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowEditModal(user)}>Edit</button>
                  <button className="setting-supplier-action-button" onClick={() => {
                    axios.delete(`${API_BASE_URL}/categories/${user.id}`)
                      .then(() => setSuppliers(suppliers.filter(s => s.id !== user.id)))
                      .catch(error => console.error('Error deactivating category:', error));
                  }}>
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showEditModal} onClose={handleCloseModal} className="supplier-setting-supplier-update-modal">
        <div className="supplier-setting-supplier-update-modal-header">
          <h5>{isEditMode ? 'Update Company Category' : 'Add Company Category'}</h5>
        </div>
        <div className="supplier-setting-supplier-update-modal-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="categoryName">
              <Form.Label>Category Name:</Form.Label>
              <Form.Control
                type="text"
                name="categoryName"
                value={selectedUser?.categoryName || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={selectedUser?.description || ''}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="supplier-setting-text-right">
              <Button variant="primary" type="submit">{isEditMode ? 'Update' : 'Add'}</Button>
            </div>
          </Form>
        </div>
      </CustomModal>
    </div>
  );
};

export default SettingCategory;
/* Mohini_SettingCategory_WholePage_14/sep/2024 */
