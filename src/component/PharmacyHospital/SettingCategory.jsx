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
import { toast } from 'react-toastify';
import { FloatingInput, FloatingSelect } from '../../FloatingInputs';

const SettingCategory = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [taxs, setTaxs] = useState();
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

  useEffect(() => {
    axios.get(`${API_BASE_URL}/taxes/get-all-taxes`)
      .then(response => {
        setTaxs(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

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
    const formData = {
      subCategoryName: selectedUser.subCategoryName,
      categoryName: selectedUser.categoryName,
      code: selectedUser.code,
      musting: selectedUser.musting,
      general: selectedUser.general,
      considerForMis: selectedUser.considerForMis,
      description: selectedUser.description,
      isActive: selectedUser.isActive,
      tax: {
        taxesId: isEditMode ? selectedUser.tax.taxesId : selectedUser.tax
      }
    }
    console.log(formData);


    event.preventDefault();
    const apiUrl = isEditMode
      ? `${API_BASE_URL}/categories/${selectedUser.categoryId}` // Assuming `id` is part of the user object for updates
      : `${API_BASE_URL}/categories`;
    const method = isEditMode ? 'put' : 'post';

    axios({
      method,
      url: apiUrl,
      data: formData
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
        toast.success(
          isEditMode
            ? "Category updated successfully!"
            : "Category added successfully!")
      })
      .catch(error => {
        toast.error('There was an error with the submission!', error);
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

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
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
        <button
          className="setting-supplier-add-user-button"
          onClick={() => handleShowEditModal()} // Open the form for adding a new category
        >
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
        <span>Showing {suppliers.length} results</span>
        <button className='item-wise-export-button' onClick={handleExport}>Export</button>
        <button className='item-wise-print-button' onClick={handlePrint}>Print</button>
      </div>
      <div className='table-container'>
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Category Name",
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
            {suppliers.map((user, index) => (
              <tr key={index}>
                <td>{user.categoryName}</td>
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
                <FloatingInput
                  label={"Sub Category Name"}
                  type="text"
                  placeholder="Enter Category Name"
                  name="subCategoryName"
                  required
                  value={selectedUser?.subCategoryName || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="categoryName" className="supplier-setting-form-group col-md-6">
                <FloatingInput
                  label={"Category Name"}
                  type="text"
                  placeholder="Enter Category Name"
                  name="categoryName"
                  required
                  value={selectedUser?.categoryName || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

            </div>
            <div className="supplier-setting-form-row">
              <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
                <FloatingInput
                  label={"Code"}
                  type="text"
                  placeholder="Enter Code"
                  name="code"
                  value={selectedUser?.code || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
                <FloatingInput
                  label={"Musting"}
                  type="text"
                  placeholder="Enter Musting"
                  name="musting"
                  value={selectedUser?.musting || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
            <div className="supplier-setting-form-row">
              <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
                <FloatingInput
                  label={"General"}
                  type="text"
                  placeholder="Enter General"
                  name="general"
                  value={selectedUser?.general || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
                <FloatingInput
                  label={"Consider For Mis"}
                  type="text"
                  name="considerForMis"
                  value={selectedUser?.considerForMis || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
            <div className="supplier-setting-form-row">
              <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
                <FloatingInput
                  label={"Description"}
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  value={selectedUser?.description || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
                <FloatingSelect
                  label="Tax"
                  name="tax"
                  value={selectedUser?.tax || ""}
                  onChange={handleInputChange}
                  options={[
                    { value: "", label: "" }, // Empty default option
                    ...(Array.isArray(taxs)
                      ? taxs.map((tax) => ({
                        value: tax.taxesId,
                        label: tax.name,
                      }))
                      : []), // Ensures safe fallback if `taxs` is undefined or not an array
                  ]}
                />


              </Form.Group>

            </div>
            <Form.Group controlId="isActive" className="supplier-setting-form-group col-md-6">
              <FloatingInput
                label={"isActive"}
                type="checkbox"
                name="isActive"
                value={selectedUser?.isActive || ''}
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
