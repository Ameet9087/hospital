import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import axios from 'axios';

const SettingDispensary = () => {
  const [suppliers, setSuppliers] = useState([]); // Initialize with empty array to load from API
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [dispensaries, setDispensaries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    isActive: "",
    printInvoiceHeaderInDotMatrix: "",
    useSeparateInvoiceHeader: "",
    contactNo: "",
    address: "",
    email: "",
    kraPin: "",
    defaultPaymentMode: ""
  });
  const [editingId, setEditingId] = useState(null);

  const tableRef = useRef(null);

  // Fetch dispensaries from API when the component mounts
  useEffect(() => {
    fetchDispensaries();
  }, []);

  const fetchDispensaries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dispensaries`);
      setDispensaries(response.data);
    } catch (error) {
      console.error("Error fetching dispensaries", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        // Update existing dispensary
        await axios.put(`${API_BASE_URL}/dispensaries/${editingId}`, formData);
      } else {
        // Create new dispensary
        await axios.post(`${API_BASE_URL}/dispensaries`, formData);
      }
      fetchDispensaries();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving dispensary", error);
    }
  };

  const filteredDispensaries = dispensaries.filter((dispensary) =>
    dispensary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser({
        name: "",
        type: "",
        description: "",
        isActive: "",
        printInvoiceHeaderInDotMatrix: "",
        useSeparateInvoiceHeader: "",
        contactNo: "",
        address: "",
        email: "",
        kraPin: "",
        defaultPaymentMode: ""
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/dispensaries/${id}`);
      fetchDispensaries();
    } catch (error) {
      console.error("Error deleting dispensary", error);
    }
  };

  const handleEdit = (dispensary) => {
    setFormData(dispensary);
    setEditingId(dispensary.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
    ...formData,
    isActive: formData.isActive, // Ensure this is being correctly set and passed
  };

    if (isEditMode) {
      // Update existing user via API
      fetch(`${API_BASE_URL}/dispensaries/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
        body: JSON.stringify(data)
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
      <CustomAlerts />
      <div className="setting-supplier-header">
        <button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>
          + Add Dispensary
        </button>
      </div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="setting-supplier-span">
        <span>Showing {filteredDispensaries.length} / {suppliers.length} results</span>
        <button className="item-wise-export-button" onClick={handleExport}>Export</button>
        <button className="item-wise-print-button" onClick={handlePrint}>Print</button>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Name", "Type", "Contact No", "Description", "Label", "KRA PIN", "Address", "Email", "Default Payment Mode", "Actions"].map((header, index) => (
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
            {filteredDispensaries.map((dispensary, index) => (
              <tr key={index}>
                <td>{dispensary.name}</td>
                <td>{dispensary.type}</td>
                <td>{dispensary.contactNo}</td>
                <td>{dispensary.description}</td>
                <td>{dispensary.label}</td>
                <td>{dispensary.kraPin}</td>
                <td>{dispensary.address}</td>
                <td>{dispensary.email}</td>
                <td>{dispensary.defaultPaymentMode}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowModal(dispensary)}>Edit</button>
                  <button className="setting-supplier-action-button" onClick={() => handleDelete(dispensary.id)}>Deactivate</button>
                  <button className="setting-supplier-action-button">Payment Modes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showModal} onClose={handleCloseModal} className="supplier-setting-supplier-update-modal">
        <div className="supplier-setting-modal-header">
          <h5>{isEditMode ? 'Edit Dispensary Details' : 'Add New Dispensary'}</h5>
        </div>
        <div className="supplier-setting-modal-body">
          <Form onSubmit={handleSubmit} className='supplier-setting-despensaryForm'>
            <div>
            <Form.Group className="mb-3" controlId="dispensaryName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dispensaryType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dispensaryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="isActive">
              <Form.Check
                type="checkbox"
                label="Active"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Form.Group>
            </div>
            <div>
            <Form.Group className="mb-3" controlId="dispensaryContactNo">
              <Form.Label>Contact No</Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dispensaryAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dispensaryEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            </div>
            <div>
            <Form.Group className="mb-3" controlId="dispensaryKraPin">
              <Form.Label>KRA PIN</Form.Label>
              <Form.Control
                type="text"
                name="kraPin"
                value={formData.kraPin}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="dispensaryDefaultPaymentMode">
              <Form.Label>Default Payment Mode</Form.Label>
              <Form.Control
                type="text"
                name="defaultPaymentMode"
                value={formData.defaultPaymentMode}
                onChange={handleChange}
              />
            </Form.Group>
            </div>
            <Button variant="primary" type="submit">
              {isEditMode ? 'Save Changes' : 'Add Dispensary'}
            </Button>
          </Form>
        </div>
      </CustomModal>
    </div>
  );
};

export default SettingDispensary;
