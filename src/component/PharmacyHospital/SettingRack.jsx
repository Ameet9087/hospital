/* Mohini_SettingRack_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SettingSupplier.css';
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

const API_URL = `${API_BASE_URL}/racks`;

const SettingRack = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

 const filteredUsers = suppliers.filter(user =>
  (user.rackNo || '').toLowerCase().includes(searchTerm.toLowerCase())
);


  const handleShowModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser({
        store: '',
        rackNo: '',
        parentRack: '',
        description: ''
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      store: event.target.store.value,
      rackNo: event.target.rackNo.value,
      parentRack: event.target.parentRack.value,
      description: event.target.description.value
    };

    try {
      if (isEditMode) {
        // Update existing user
        await fetch(`${API_URL}/${selectedUser.rackNo}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setSuppliers(suppliers.map(user =>
          user.rackNo === selectedUser.rackNo ? formData : user
        ));
      } else {
        // Add new user
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setSuppliers([...suppliers, formData]);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }

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
      <CustomAlerts/>
      <div className="setting-supplier-header">
        <Button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>
          + Add Rack
        </Button>
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
                                {["Rack No",
  "Parent Rack No",
  "Description",
  "Store",
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
                <td>{user.rackNo}</td>
                <td>{user.parentRack || 'N/A'}</td>
                <td>{user.description || 'N/A'}</td>
                <td>{user.store || 'N/A'}</td>
                <td className="setting-supplier-action-buttons">
                  <Button
                    className="setting-supplier-action-button"
                    onClick={() => handleShowModal(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="setting-supplier-action-button"
                    onClick={async () => {
                      // Deactivate action
                      try {
                        await fetch(`${API_URL}/${user.rackNo}`, {
                          method: 'DELETE'
                        });
                        setSuppliers(suppliers.filter(u => u.rackNo !== user.rackNo));
                      } catch (error) {
                        console.error('Error deleting data:', error);
                      }
                    }}
                  >
                    Deactivate
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="setting-supplier-pagination">
          <div className="setting-supplier-pagination-controls">
            <Button>First</Button>
            <Button>Previous</Button>
            <Button>1</Button>
            <Button>Next</Button>
            <Button>Last</Button>
          </div>
        </div> */}
      </div>

      <CustomModal
  isOpen={showModal}
  onClose={handleCloseModal}
  className="supplier-setting-supplier-update-modal"
>
  <div className="supplier-setting-modal-header">
    <h5>{isEditMode ? 'Update Rack Details' : 'Add New Rack'}</h5>
    {/* <button className="close" onClick={handleCloseModal}>&times;</button> */}
  </div>
  <div className="supplier-setting-modal-body">
    <Form onSubmit={handleSubmit}>
      <div className="supplier-setting-form-row">
        <Form.Group controlId="store" className="supplier-setting-form-group col-md-6">
          <Form.Label>
            Store<span className="supplier-setting-text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            name="store"
            placeholder="Enter Store"
            required
            defaultValue={selectedUser?.store || ''}
          />
        </Form.Group>
        <Form.Group controlId="rackNo" className="supplier-setting-form-group col-md-6">
          <Form.Label>
            Rack No<span className="supplier-setting-text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            name="rackNo"
            placeholder="Enter Rack No"
            required
            defaultValue={selectedUser?.rackNo || ''}
          />
        </Form.Group>
      </div>

      <div className="supplier-setting-form-row">
        <Form.Group controlId="parentRack" className="supplier-setting-form-group col-md-6">
          <Form.Label>Parent Rack No:</Form.Label>
          <Form.Control
            type="text"
            name="parentRack"
            placeholder="Enter Parent Rack No"
            defaultValue={selectedUser?.parentRack || ''}
          />
        </Form.Group>
        <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter Description"
            defaultValue={selectedUser?.description || ''}
          />
        </Form.Group>
      </div>

      <div className="supplier-setting-text-right">
        <Button variant="primary" onClick={handleCloseModal}>Cancel</Button>&nbsp; &nbsp;
        <Button variant="primary" type="submit">{isEditMode ? 'Update' : 'Add'}</Button>
      </div>
    </Form>
  </div>
</CustomModal>

    </div>
  );
};

export default SettingRack;
/* Mohini_SettingRack_WholePage_14/sep/2024 */
