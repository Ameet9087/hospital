import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css';
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  useEffect(() => {
    setHasValue(!!value);
  }, [value]);
  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };
  return (
    <div className={`SettingSupplier-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="SettingSupplier-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="SettingSupplier-floating-label">{label}</label>
    </div>
  );
};
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);
  useEffect(() => {
    setHasValue(!!value);
  }, [value]);
  return (
    <div className={`SettingSupplier-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="SettingSupplier-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '');
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="SettingSupplier-floating-label">{label}</label>
    </div>
  );
};
const initialUser = {
  supplierName: '',
  contactNumber: '',
  description: '',
  city: '',
  kraPin: '',
  contactAddress: '',
  email: '',
  creditPeriod: '', // Ensure creditPeriod is correctly handled
  dda: '',
  additionalContact: "",
  isLedgerRequired: "",
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
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/suppliers`);
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error.response ? error.response.data : error.message);
    }
  };
  useEffect(() => {
    fetchSuppliers(); // Fetch data when the component is mounted
  }, []); // Empty dependency array means this effect runs only once
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
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      supplierName: selectedUser.supplierName || '',
      contactNumber: selectedUser.contactNumber || '',
      description: selectedUser.description || '',
      creditPeriod: selectedUser.creditPeriod ? Number(selectedUser.creditPeriod) : 0,
      contactAddress: selectedUser.contactAddress || '',
      email: selectedUser.email || '',
      isLedgerRequired: selectedUser.isLedgerRequired || 'No', // Adjust if applicable
      city: selectedUser.city || '',
      kraPin: selectedUser.kraPin || '',
      dda: selectedUser.dda || '',
      additionalContact: selectedUser.additionalContact || '',
      isActive: selectedUser.isActive || "", // Convert boolean to string if required
    };
    console.log(dataToSend)
    try {
      if (isEditMode) {
        const response = await axios.put(`${API_BASE_URL}/suppliers/${selectedUser.suppliersId}`, dataToSend);
        console.log('Update Response:', response.data);
      } else {
        const response = await axios.post(`${API_BASE_URL}/suppliers  `, dataToSend);
        console.log('Add Response:', response.data);
      }
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      fetchSuppliers();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving supplier data:', error.response ? error.response.data : error.message);
      alert('Error saving data. Please try again.');
    }
  };
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.kraPin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="setting-supplier-container">
      <CustomAlerts />
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
              {["Supplier Name",
                "Contact No",
                "Description",
                "City",
                "Pin Code",
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
            {filteredSuppliers.map((user, index) => (
              <tr key={index}>
                <td>{user.supplierName}</td>
                <td>{user.contactNumber}</td>
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
                  {/* <button className="setting-supplier-action-button">
          Deactivate
        </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CustomModal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        className="supplier-setting-supplier-update-modal"
      >
        <div className="SettingSupplier-container">
          <div className="SettingSupplier-section">
            <div className="SettingSupplier-header">{isEditMode ? 'Update Supplier' : 'Add Supplier'}</div>
            <div className="SettingSupplier-grid">
              <FloatingInput
                label={
                  <>
                    Supplier Name <span className="supplier-setting-text-danger">*</span>
                  </>
                }
                type="text"
                name="supplierName"
                required
                value={selectedUser.supplierName || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label=
                {
                  <>
                    Contact <span className="supplier-setting-text-danger">*</span>
                  </>
                }
                type="text"
                name="contactNumber"
                required
                value={selectedUser.contactNumber || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label="Description"
                type="text"
                name="description"
                value={selectedUser.description || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label="City"
                type="text"
                name="city"
                value={selectedUser.city || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label="Credit Period"
                type="text"
                name="creditPeriod"
                value={selectedUser.creditPeriod || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label=
                {
                  <>
                    Pin <span className="supplier-setting-text-danger">*</span>
                  </>
                }
                type="text"
                name="kraPin"
                required
                value={selectedUser.kraPin || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label="Contact Address"
                type="text"
                name="contactAddress"
                value={selectedUser.contactAddress || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label="DDA"
                type="text"
                name="dda"
                value={selectedUser.dda || ''}
                onChange={handleInputChange}
              />
              <FloatingInput
                label="Email"
                type="text"
                name="email"
                value={selectedUser.email || ''}
                onChange={handleInputChange}
              />
              <div className="SettingSupplier-row-chechbox">
                <input type="checkbox" id="allowMultiple" />
                <label htmlFor="allowMultiple" className="SettingSupplier-">
                  IsActive
                </label>
              </div>
            </div>
          </div>
          <div className="supplier-setting-form-actions">
            {/* <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button> */}
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              {isEditMode ? 'Update Supplier' : 'Add Supplier'}
            </Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
export default SettingSupplierComponent;
