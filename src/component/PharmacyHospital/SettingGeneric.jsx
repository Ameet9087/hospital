/* Mohini_SettingGeneric_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
const genericApiUrl = `${API_BASE_URL}/generic-names`;
const categoryApiUrl = `${API_BASE_URL}/categories`;
import * as XLSX from 'xlsx';


const SettingGeneric = () => {
  const [suppliers, setSuppliers] = useState([]);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedGeneric, setSelectedGeneric] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  useEffect(() => {
    // Fetch initial data
    fetchSuppliers();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(genericApiUrl);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(categoryApiUrl);
      setCategories(response.data); // Store fetched categories in state
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const filteredUsers = suppliers.filter(item =>
    item.genericName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (generic = null) => {
    if (generic) {
      setSelectedGeneric(generic);
      setIsEditMode(true);
    } else {
      setSelectedGeneric({
        genericName: '',
        category: '',
        generalCategoryNumber: '',
        therapeuticCategoryNumber: '',
        counselingNumber: '',
        isActive: true
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGeneric(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditMode) {
        // Update existing item
        await axios.put(`${genericApiUrl}/${selectedGeneric.genericNameId}`, selectedGeneric);
      } else {
        // Add new item
        await axios.post(genericApiUrl, selectedGeneric);
      }
      fetchSuppliers(); // Refresh the list after adding or updating
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedGeneric({
      ...selectedGeneric,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  // Function to trigger print
  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };
  return (
    <div className="setting-supplier-container">
      <CustomAlerts/>
      <div className="setting-supplier-header">
        <button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>
          + Add Generic
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
      <span>Showing {filteredUsers.length} / {suppliers.length} results</span>
      <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      <div className='table-container'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Generic Name",
  "Generic Category",
  "Therapeutic Category",
  "Actions"
].map((header, index) => (
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
            {filteredUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.genericName}</td>
                <td>{item.category}</td>
                <td>{item.generalCategoryNumber}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowModal(item)}>Edit</button>
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
  isOpen={showModal}
  onClose={handleCloseModal}
  className="supplier-setting-supplier-update-modal"
>
  <div className="supplier-setting-modal-header">
    <h5>{isEditMode ? 'Edit Generic Details' : 'Add New Generic'}</h5>
    {/* <button className="close" onClick={handleCloseModal}>&times;</button> */}
  </div>
  <div className="supplier-setting-modal-body">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="genericName" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">
        Generic Name  <span className="supplier-setting-text-danger">*</span> :
        </Form.Label>
        <Form.Control
          type="text"
          name="genericName"
          value={selectedGeneric?.genericName || ''}
          onChange={handleInputChange}
          placeholder="Enter Generic Name"
          required
          className="supplier-setting-form-control"
        />
      </Form.Group>

      <Form.Group controlId="category" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">
          Category<span className="supplier-setting-text-danger">*</span> :
        </Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={selectedGeneric?.category || ''}
          onChange={handleInputChange}
          required
          className="supplier-setting-form-control"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.name} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="generalCategoryNumber" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">
          General Category Number:
        </Form.Label>
        <Form.Control
          type="text"
          name="generalCategoryNumber"
          value={selectedGeneric?.generalCategoryNumber || ''}
          onChange={handleInputChange}
          placeholder="Enter General Category Number"
          className="supplier-setting-form-control"
        />
      </Form.Group>

      <Form.Group controlId="therapeuticCategoryNumber" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">
          Therapeutic Category Number:
        </Form.Label>
        <Form.Control
          type="text"
          name="therapeuticCategoryNumber"
          value={selectedGeneric?.therapeuticCategoryNumber || ''}
          onChange={handleInputChange}
          placeholder="Enter Therapeutic Category Number"
          className="supplier-setting-form-control"
        />
      </Form.Group>

      <Form.Group controlId="counselingNumber" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">
          Counseling Number:
        </Form.Label>
        <Form.Control
          type="text"
          name="counselingNumber"
          value={selectedGeneric?.counselingNumber || ''}
          onChange={handleInputChange}
          placeholder="Enter Counseling Number"
          className="supplier-setting-form-control"
        />
      </Form.Group>

      <Form.Group controlId="isActive" className="supplier-setting-form-group">
        <Form.Check
          type="checkbox"
          name="isActive"
          label="Is Active"
          checked={selectedGeneric?.isActive || false}
          onChange={handleInputChange}
          className="supplier-setting-form-control"
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

export default SettingGeneric;
/* Mohini_SettingGeneric_WholePage_14/sep/2024 */
