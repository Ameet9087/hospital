/* Mohini_SettingSupplier_WholePage_14/sep/2024 */
import React, { useState,useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
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
  additionalContact:"",
  isLedgerRequired:"",
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
      const response = await axios.get(`${API_BASE_URL}/suppliers/get-all-suppliers`);
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

  const filteredSuppliers = suppliers.filter((supplier) =>
  supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  supplier.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
  supplier.kraPin.toLowerCase().includes(searchTerm.toLowerCase()) ||
  supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
);












  

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
        {isEditMode ? 'Update Supplier' : 'Add Supplier'}
      
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="supplier-setting-form-row">
              <Form.Group controlId="supplierName" className="supplier-setting-form-group col-md-6">
                <Form.Label>Supplier Name<span className="supplier-setting-text-danger">*</span>:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Supplier Name"
                  name="supplierName"
                  required
                  value={selectedUser.supplierName || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="contact" className="supplier-setting-form-group col-md-6">
                <Form.Label>Contact<span className="supplier-setting-text-danger">*</span>:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact Number"
                  name="contactNumber"
                  required
                  value={selectedUser.contactNumber || ''}
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
                  value={selectedUser.description || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="city" className="supplier-setting-form-group col-md-6">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={selectedUser.city || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>

            <div className="supplier-setting-form-row">
              <Form.Group controlId="creditPeriod" className="supplier-setting-form-group col-md-6">
                <Form.Label>Credit Period:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Credit Period"
                  name="creditPeriod"
                  value={selectedUser.creditPeriod || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="kraPin" className="supplier-setting-form-group col-md-6">
                <Form.Label>KRA PIN<span className="supplier-setting-text-danger">*</span>:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter KRA PIN"
                  name="kraPin"
                  required
                  value={selectedUser.kraPin || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>

            <div className="supplier-setting-form-row">
              <Form.Group controlId="address" className="supplier-setting-form-group col-md-6">
                <Form.Label>Contact Address:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Address"
                  name="contactAddress"
                  value={selectedUser.contactAddress || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="dda" className="supplier-setting-form-group col-md-6">
                <Form.Label>DDA:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter DDA"
                  name="dda"
                  value={selectedUser.dda || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="email" className="supplier-setting-form-group col-md-6">
                <Form.Label>email:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={selectedUser.email || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>

            <div className="supplier-setting-form-row">
              <Form.Group controlId="isActive" className="supplier-setting-form-group col-md-6">
                <Form.Label>Status:</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Active"
                  name="isActive"
                  checked={selectedUser.isActive || false}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>

            <div className="supplier-setting-form-actions">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {isEditMode ? 'Update Supplier' : 'Add Supplier'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </CustomModal>

    </div>
  );
};

export default SettingSupplierComponent;
/* Mohini_SettingSupplier_WholePage_14/sep/2024 */
