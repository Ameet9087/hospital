/* Mohini_SupplierHeaderCom_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SettingSupplier.css'; 
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import * as XLSX from 'xlsx';

const usersData = [

    {
      name: 'Naynesh',
      contactNo: '123456',
      description: '',
      city: 'Kenya',
      kraPin: '123456789',
      contactAddress: 'Kenya',
      email: '',
      creditPeriod: 0,
      isActive: false,
    },
    {
      name: 'Vishal',
      contactNo: '785623',
      description: '',
      city: 'Dubai',
      kraPin: '4125896',
      contactAddress: 'Dubai',
      email: '',
      creditPeriod: 0,
      isActive: false,
    },
    {
      name: 'MEDS',
      contactNo: '0788989876',
      description: 'MEDS',
      city: 'Nairobi',
      kraPin: 'P051097618A',
      contactAddress: 'Nairobi',
      email: '',
      creditPeriod: 30,
      isActive: true,
    },
    {
      name: 'Temporibus voluptatum et est aut',
      contactNo: '551681257',
      description: 'Ipsum consectetur...',
      city: 'Non cumque culpa',
      kraPin: 'Est dolorem ipsa...',
      contactAddress: 'Sit itaque quo ea',
      email: 'sa@a.com',
      creditPeriod: 80,
      isActive: true,
    },
];

const SettingSupplierComponent = () => {
  const [suppliers, setSuppliers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  const filteredUsers = suppliers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement save functionality here
    handleCloseModal();
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
      {/* <div className="setting-supplier-header">
        <button className="setting-supplier-add-user-button">+ Add User</button>
      </div> */}
      <input
        type="text"
        placeholder="Search"
        className="setting-supplier-manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    

      <div className='setting-supplier-span'>
      <span>Showing {filteredUsers.length} / {suppliers.length} results</span>
      <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      <div className='table-container'>
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "Supplier Name",
                "Contact No",
                "Description",
                "City",
                "KRA PIN",
                "Contact Address",
                "Email",
                "Credit Period",
                "Action"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
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
                <td>{user.contactNo}</td>
                <td>{user.description}</td>
                <td>{user.city}</td>
                <td>{user.kraPin}</td>
                <td>{user.contactAddress}</td>
                <td>{user.email}</td>
                <td>{user.creditPeriod}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowEditModal(user)}>Edit</button>
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
{/* 
      <Modal show={showEditModal} onHide={handleCloseModal} className="supplier-setting-supplier-update-modal">
  <Modal.Header closeButton>
    <Modal.Title>Update Supplier</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <div className="supplier-setting-form-row">
        <Form.Group controlId="supplierName" className="supplier-setting-form-group col-md-6">
          <Form.Label>Supplier Name<span className="supplier-settingtext-danger">*</span>:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Supplier Name"
            required
            defaultValue="MEDS"
          />
        </Form.Group>
        <Form.Group controlId="contact" className="supplier-setting-form-group col-md-6">
          <Form.Label>Contact<span className="supplier-setting-text-danger">*</span>:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Contact Number"
            required
            defaultValue="0788989876"
          />
        </Form.Group>
      </div>

      <div className="supplier-setting-form-row">
        <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            defaultValue="MEDS"
          />
        </Form.Group>
        <Form.Group controlId="city" className="supplier-setting-form-group col-md-6">
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
          />
        </Form.Group>
      </div>

      <div className="supplier-setting-form-row">
        <Form.Group controlId="creditPeriod" className="supplier-setting-form-group col-md-6">
          <Form.Label>Credit Period:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Credit Period"
            defaultValue="30"
          />
        </Form.Group>
        <Form.Group controlId="kraPin" className="supplier-setting-form-group col-md-6">
          <Form.Label>KRA PIN<span className="supplier-setting-text-danger">*</span>:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter KRA PIN"
            required
            defaultValue="P051097618A"
          />
        </Form.Group>
      </div>

      <div className="supplier-setting-form-row">
        <Form.Group controlId="address" className="supplier-setting-form-group col-md-6">
          <Form.Label>Contact Address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            defaultValue="NAIROBI"
          />
        </Form.Group>
        <Form.Group controlId="dda" className="supplier-setting-form-group col-md-6">
          <Form.Label>DDA:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter DDA"
          />
        </Form.Group>
      </div>

      <div className="supplier-settingform-row">
        <Form.Group controlId="email" className="supplier-setting-form-group col-md-6">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group controlId="additionalContact" className="supplier-setting-form-group col-md-6">
          <Form.Label>Additional Contact:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Additional Contact Information"
          />
        </Form.Group>
      </div>

      <div className="supplier-setting-form-row">
        <Form.Group controlId="isActive" className="supplier-setting-form-group col-md-6">
          <Form.Check
            type="checkbox"
            label="Is Active"
            defaultChecked={true}
          />
        </Form.Group>
        <Form.Group controlId="isLedgerRequired" className="supplier-setting-form-group col-md-6">
          <Form.Check
            type="checkbox"
            label="Is Ledger Required"
            defaultChecked={true}
          />
        </Form.Group>
      </div>

      <div className="supplier-setting-text-right">
        <Button variant="secondary" onClick={handleCloseModal} className="supplier-setting-mr-2">Cancel</Button>
        <Button variant="primary" type="submit">Update</Button>
      </div>
    </Form>
  </Modal.Body>
</Modal> */}
    </div>
  );
};

export default SettingSupplierComponent;
/* Mohini_SupplierHeaderCom_WholePage_14/sep/2024 */
