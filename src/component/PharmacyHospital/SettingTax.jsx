/* Mohini_SettingTax_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { FloatingInput } from '../../FloatingInputs';

const SettingTax = () => {
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
    // Fetch data from API
    axios.get(`${API_BASE_URL}/taxes/get-all-taxes`)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [showModal]);

  // Filtering users based on the search term
  const filteredUsers = suppliers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser({ name: '', percentage: '', description: '' });
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
    if (isEditMode) {
      // Update the existing item
      axios.put(`${API_BASE_URL}/taxes/update/${selectedUser.taxesId}`, selectedUser)
        .then(response => {
          setSuppliers(suppliers.map(supplier =>
            supplier.id === selectedUser.id ? response.data : supplier
          ));
          handleCloseModal();
          toast.success("Tax Added Successfully")
        })
        .catch(error => {
          toast.error("There was an error updating the data!", error);
        });
    } else {
      // Add a new item
      axios.post(`${API_BASE_URL}/taxes/create-tax`, selectedUser)
        .then(response => {
          handleCloseModal();
          toast.success("Tax Updated Successfully")
        })
        .catch(error => {
          toast.error("There was an error adding the data!", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({
      ...selectedUser,
      [name]: value
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
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };


  return (
    <div className="setting-supplier-container">
      <CustomAlerts/>
      <div className="setting-supplier-header">
        <button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>
          + Add Tax
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <div className='setting-supplier-span'>
        
      </div> */}
      <div className='setting-supplier-span'>
      <span>Showing {filteredUsers.length} / {suppliers.length} results</span>
        <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      <div className='table-container'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[ "Tax Name",
  "Tax Percentage",
  "Description",
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
                <td>{user.percentage}</td>
                <td>{user.description}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowModal(user)}>Edit</button>
                  {/* <button className="setting-supplier-action-button">Deactivate</button> */}
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
    <h5>{isEditMode ? `Edit Tax for ${selectedUser?.name}` : 'Add New Tax'}</h5>
    {/* <button className="close" onClick={handleCloseModal}>&times;</button> */}
  </div>
  <div className="supplier-setting-modal-body">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="taxName" className="supplier-setting-form-group">
        
        <FloatingInput
        label={"Tax Name"}
          type="text"
          name="name"
          value={selectedUser?.name || ''}
          onChange={handleInputChange}
          placeholder="Enter Tax Name"
          required
        />
      </Form.Group>

      <Form.Group controlId="taxPercentage" className="supplier-setting-form-group">
        <FloatingInput
        label={"Tax Percentage"}
          type="text"
          name="percentage"
          value={selectedUser?.percentage || ''}
          onChange={handleInputChange}
          placeholder="Enter Tax Percentage"
         
        />
      </Form.Group>

      <Form.Group controlId="description" className="supplier-setting-form-group">
        <FloatingInput
        label={"Description"}
          type="text"
          name="description"
          value={selectedUser?.description || ''}
          onChange={handleInputChange}
          placeholder="Enter Description"
          
        />
      </Form.Group>

      <div className="supplier-setting-text-right">
        <Button variant="primary" type="submit">Save</Button>
      </div>
    </Form>
  </div>
</CustomModal>

    </div>
  );
};

export default SettingTax;
/* Mohini_SettingTax_WholePage_14/sep/2024 */
