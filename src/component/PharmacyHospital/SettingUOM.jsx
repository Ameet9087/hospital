/* Mohini_SettingUOM_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import * as XLSX from 'xlsx';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const SettingUOM = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ name: '', description: '', isActive: true });
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  const apiUrl = `${API_BASE_URL}/unitofmeasurement`;

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/fetchAll`);
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = suppliers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      // Reset form for adding a new UOM
      setSelectedUser({ name: '', description: '', isActive: true });
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

    try {
      if (isEditMode) {
        // Update existing UOM
        await axios.put(`${apiUrl}/${selectedUser.id}`, selectedUser);
        setSuppliers(suppliers.map(u => (u.id === selectedUser.id ? selectedUser : u)));
      } else {
        // Add new UOM
        const response = await axios.post(`${apiUrl}/add`, selectedUser);
        setSuppliers([...suppliers, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving data:', error);
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
        <button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>+ Add Unit Of Measurement</button>
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
  <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      <div className='table-container'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Unit Name",
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
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.description}</td>
                <td>{user.isActive ? 'Yes' : 'No'}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowModal(user)}>Edit</button>
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
  <div className="supplier-setting-supplier-update-modal-header">
    <h5>{isEditMode ? 'Update Unit of Measurement' : 'Add Unit of Measurement'}</h5>
    {/* <button onClick={handleCloseModal} className="close-button">
      &times;
    </button> */}
  </div>
  <div className="supplier-setting-supplier-update-modal-body">
    <Form onSubmit={handleSubmit}>
      <div className="supplier-setting-form-row">
        <Form.Group controlId="categoryName" className="supplier-setting-form-group col-md-6">
          <Form.Label>
            Unit of Measurement<span className="supplier-setting-text-danger">*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Unit of Measurement"
            required
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={selectedUser?.description || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, description: e.target.value })}
          />
        </Form.Group>
      </div>
      <Form.Group controlId="isActive" className="supplier-setting-form-group col-md-6">
        <Form.Check
          type="checkbox"
          label="Is Active"
          checked={selectedUser?.isActive || false}
          onChange={(e) => setSelectedUser({ ...selectedUser, isActive: e.target.checked })}
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

export default SettingUOM;
/* Mohini_SettingUOM_WholePage_14/sep/2024 */
