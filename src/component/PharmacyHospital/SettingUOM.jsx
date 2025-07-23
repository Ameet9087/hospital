/* Mohini_SettingUOM_WholePage_14/sep/2024 */

import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; 
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import * as XLSX from 'xlsx';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { toast } from 'react-toastify';
import { FloatingInput } from '../../FloatingInputs';

const SettingUOM = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    description: "",
    isActive: true,
  });
  const { success, error, CustomAlerts } = useCustomAlert();
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  const apiUrl = `${API_BASE_URL}/unitofmeasurement`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/fetchAll`);
        setSuppliers(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = suppliers.filter((user) =>
    (user?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleShowModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setIsEditMode(true);
    } else {
      setSelectedUser({ name: "", description: "", isActive: true });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser({ name: "", description: "", isActive: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isEditMode) {
        await axios.put(`${apiUrl}/${selectedUser.id}`, selectedUser);

        setSuppliers(suppliers.map(u => (u.id === selectedUser.id ? selectedUser : u)));
        toast.success("Unit of Measurement updated successfully!")
      } else {
        const response = await axios.post(`${apiUrl}/add`, selectedUser);

        setSuppliers([...suppliers, response.data]);
        toast.success("Unit of Measurement added successfully!")
      }
      handleCloseModal();
    } catch (error) {
      toast.error('Error saving data:', error);
    }
  };
  

  // Function to export table to Excel
  const handleExport = () => {
    if (!tableRef.current) return;
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport");
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx");
  };

  const handlePrint = () => {
    if (!tableRef.current) return;
    const printContent = tableRef.current.outerHTML;
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
        <body>${printContent}</body>
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
          + Add Unit Of Measurement
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
            {suppliers.map((user, index) => (
              <tr key={index}>
                <td>{user?.name || "N/A"}</td>
                <td>{user?.description || "N/A"}</td>
                <td>{user?.isActive ? "Yes" : "No"}</td>
                <td className="setting-supplier-action-buttons">

                  <button className="setting-supplier-action-button" onClick={() => handleShowModal(user)}>Edit</button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          <FloatingInput
          label={"Unit of Measurement"}
            type="text"
            placeholder="Enter Unit of Measurement"
            required
            value={selectedUser?.name || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="description" className="supplier-setting-form-group col-md-6">
          <FloatingInput
          label={"Description"}
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
