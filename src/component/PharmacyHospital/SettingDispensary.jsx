/* Mohini_SettingDispensary_WholePage_14/sep/2024 */
import React, { useState, useEffect ,useRef} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import * as XLSX from 'xlsx';

const SettingDispensary = () => {
  const [suppliers, setSuppliers] = useState([]); // Initialize with empty array to load from API
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  // Fetch suppliers from API when the component mounts
  useEffect(() => {
    fetch(`${API_BASE_URL}/dispensaries`)
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error('Error fetching dispensaries:', error));
  }, []);

  const filteredUsers = suppliers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser({
        name: '',
        type: 'Normal', // Default value
        contactNo: '',
        description: '',
        label: '',
        kraPin: '',
        address: '',
        email: '',
        defaultPaymentMode: 'Cash',
        isActive: true,
        printInvoiceHeader: false,
        useSeparateInvoiceHeader: false
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
      type: event.target.type.value,
      description: event.target.description.value,
      isActive: event.target.isActive.checked,
      printInvoiceHeader: event.target.printInvoiceHeader.checked,
      useSeparateInvoiceHeader: event.target.useSeparateInvoiceHeader.checked
    };

    if (isEditMode) {
      // Update existing user via API
      fetch(`${API_BASE_URL}/dispensaries/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        setSuppliers(suppliers.map(user => (user.id === data.id ? data : user)));
        handleCloseModal();
      })
      .catch(error => console.error('Error updating dispensary:', error));
    } else {
      // Add new user via API
      fetch(`${API_BASE_URL}/dispensaries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        setSuppliers([...suppliers, data]);
        handleCloseModal();
      })
      .catch(error => console.error('Error adding dispensary:', error));
    }
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
        <button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>
          + Add Dispensary
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
                                {[ "Name",
  "Type",
  "Contact No",
  "Description",
  "Label",
  "KRA PIN",
  "Address",
  "Email",
  "Default Payment Mode",
  "Actions"].map((header, index) => (
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
                <td>{user.type}</td>
                <td>{user.contactNo}</td>
                <td>{user.description}</td>
                <td>{user.label}</td>
                <td>{user.kraPin}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{user.defaultPaymentMode}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowModal(user)}>Edit</button>
                  <button className="setting-supplier-action-button">Deactivate</button>
                  <button className="setting-supplier-action-button">Payment Modes</button>
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
    <h5>{isEditMode ? 'Edit Dispensary Details' : 'Add New Dispensary'}</h5>
    {/* <button className="close" onClick={handleCloseModal}>&times;</button> */}
  </div>
  <div className="supplier-setting-modal-body">
    <Form onSubmit={handleSubmit}>
      {/* Dispensary Name Field */}
      <Form.Group controlId="name" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">
        Dispensary Name<span className="supplier-setting-text-danger">*</span>:
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Dispensary Name"
          required
          className="supplier-setting-form-control"
          defaultValue={selectedUser?.name || ''}
        />
      </Form.Group>

      {/* Dispensary Type Field */}
      <Form.Group controlId="type" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">
        Dispensary Type<span className="supplier-setting-text-danger">*</span>:
        </Form.Label>
        <Form.Control
          as="select"
          name="type"
          required
          className="supplier-setting-form-control"
          defaultValue={selectedUser?.type || ''}
        >
          <option value="Normal">Normal</option>
          <option value="Special">Special</option>
          {/* Add other options as needed */}
        </Form.Control>
      </Form.Group>

      {/* Description Field */}
      <Form.Group controlId="description" className="supplier-setting-form-group">
        <Form.Label className="supplier-setting-form-label">Description:</Form.Label>
        <Form.Control
          type="text"
          name="description"
          placeholder="Enter Description"
          className="supplier-setting-form-control"
          defaultValue={selectedUser?.description || ''}
        />
      </Form.Group>

      {/* IsActive Checkbox */}
      <Form.Group controlId="isActive" className="supplier-setting-form-group">
        <Form.Check
          type="checkbox"
          name="isActive"
          label="Is Active"
          defaultChecked={selectedUser?.isActive || false}
        />
      </Form.Group>

      {/* Print Invoice Header in DotMatrix Checkbox */}
      <Form.Group controlId="printInvoiceHeader" className="supplier-setting-form-group">
        <Form.Check
          type="checkbox"
          name="printInvoiceHeader"
          label="Print Invoice Header in DotMatrix"
          defaultChecked={selectedUser?.printInvoiceHeader || false}
        />
      </Form.Group>

      {/* Use Separate Invoice Header Checkbox */}
      <Form.Group controlId="useSeparateInvoiceHeader" className="supplier-setting-form-group">
        <Form.Check
          type="checkbox"
          name="useSeparateInvoiceHeader"
          label="Use separate invoice header"
          defaultChecked={selectedUser?.useSeparateInvoiceHeader || false}
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

export default SettingDispensary;
/* Mohini_SettingDispensary_WholePage_14/sep/2024 */
