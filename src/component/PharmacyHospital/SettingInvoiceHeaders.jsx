/* Mohini_SettingInvoiceHeaders_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css';
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import * as XLSX from 'xlsx';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';

const apiEndpoint = `${API_BASE_URL}/v1/invoice-headers`;

const SettingInvoiceHeaders = () => {
  const [invoiceHeaders, setInvoiceHeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetchInvoiceHeaders();
  }, []);

  const fetchInvoiceHeaders = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setInvoiceHeaders(response.data);
    } catch (error) {
      console.error('Error fetching invoice headers:', error);
    }
  };

  const filteredHeaders = invoiceHeaders.filter(header =>
    header.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    header.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    header.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    header.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (header = null) => {
    if (header) {
      setSelectedHeader(header);
      setIsEditMode(true);
    } else {
      setSelectedHeader({
        hospitalName: '',
        address: '',
        telephone: '',
        email: '',
        kraPin: '',
        dda: '',
        headerDescription: '',
        logoImagePath: '',
        isActive: true
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHeader(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invoiceHeaderDTO = {
      hospitalName: event.target.hospitalName.value,
      address: event.target.address.value,
      telephone: event.target.telephone.value,
      email: event.target.email.value,
      kraPin: event.target.kraPin.value,
      dda: event.target.dda.value,
      headerDescription: event.target.headerDescription.value,
      isActive: event.target.isActive.checked,
    };

    const formData = new FormData();
    formData.append('invoiceHeaderDTO', JSON.stringify(invoiceHeaderDTO)); // Send as a JSON string

    if (event.target.logoImage.files[0]) {
      formData.append('logoImage', event.target.logoImage.files[0]);
    }

    try {
      if (isEditMode) {
        await axios.put(`${apiEndpoint}/${selectedHeader.invoiceHeaderId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post(apiEndpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchInvoiceHeaders(); // Refresh data after successful submission
      handleCloseModal();
    } catch (error) {
      console.error('Error saving invoice header:', error);
      error && error.message && alert(`Error: ${error.message}`);
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
        <Button className="setting-supplier-add-user-button" onClick={() => handleShowModal()}>
          + Add Invoice
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
        <span>Showing {filteredHeaders.length} / {invoiceHeaders.length} results</span>
        <button className='item-wise-export-button' onClick={handleExport}>Export</button>
        <button className='item-wise-print-button' onClick={handlePrint}>Print</button>
      </div>

      <div className='table-container'>
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Hospital Name",
                "Address",
                "Telephone",
                "Email",
                "KRA PIN",
                "DDA",
                "Header Description",
                "Created Date",
                "Is Active",
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
            {filteredHeaders.map((header, index) => (
              <tr key={index}>
                <td>{header.hospitalName}</td>
                <td>{header.address}</td>
                <td>{header.telephone}</td>
                <td>{header.email}</td>
                <td>{header.kraPin}</td>
                <td>{header.dda}</td>
                <td>{header.headerDescription}</td>
                <td>{header.createdDate}</td>
                <td>{header.isActive ? 'Active' : 'Inactive'}</td>
                <td className="setting-supplier-action-buttons">
                  <Button
                    className="setting-supplier-action-button"
                    onClick={() => handleShowModal(header)}
                  >
                    Edit
                  </Button>
                  <Button className="setting-supplier-action-button">Deactivate</Button>
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
        <div className="supplier-setting-modal-header">
          <h5>{isEditMode ? 'Update Invoice Header' : 'Add New Invoice Header'}</h5>
        </div>
        <div className="supplier-setting-modal-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="hospitalName" className="supplier-setting-form-group">
              <Form.Label>
                Hospital Name<span className="supplier-setting-text-danger">*</span>:
              </Form.Label>
              <Form.Control
                type="text"
                name="hospitalName"
                placeholder="Enter Hospital Name"
                required
                defaultValue={selectedHeader?.hospitalName || ''}
              />
            </Form.Group>

            <Form.Group controlId="address" className="supplier-setting-form-group">
              <Form.Label>
                Address<span className="supplier-setting-text-danger">*</span>:
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Address"
                required
                defaultValue={selectedHeader?.address || ''}
              />
            </Form.Group>

            <Form.Group controlId="telephone" className="supplier-setting-form-group">
              <Form.Label>
                Telephone<span className="supplier-setting-text-danger">*</span>:
              </Form.Label>
              <Form.Control
                type="text"
                name="telephone"
                placeholder="Enter Telephone"
                required
                defaultValue={selectedHeader?.telephone || ''}
              />
            </Form.Group>

            <Form.Group controlId="email" className="supplier-setting-form-group">
              <Form.Label>
                Email<span className="supplier-setting-text-danger">*</span>:
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                required
                defaultValue={selectedHeader?.email || ''}
              />
            </Form.Group>

            <Form.Group controlId="kraPin" className="supplier-setting-form-group">
              <Form.Label>KRA PIN:</Form.Label>
              <Form.Control
                type="text"
                name="kraPin"
                placeholder="Enter KRA PIN"
                defaultValue={selectedHeader?.kraPin || ''}
              />
            </Form.Group>

            <Form.Group controlId="dda" className="supplier-setting-form-group">
              <Form.Label>DDA:</Form.Label>
              <Form.Control
                type="text"
                name="dda"
                placeholder="Enter DDA"
                defaultValue={selectedHeader?.dda || ''}
              />
            </Form.Group>

            <Form.Group controlId="headerDescription" className="supplier-setting-form-group">
              <Form.Label>Header Description:</Form.Label>
              <Form.Control
                type="text"
                name="headerDescription"
                placeholder="Enter Header Description"
                defaultValue={selectedHeader?.headerDescription || ''}
              />
            </Form.Group>

            <Form.Group controlId="logoImage" className="supplier-setting-form-group">
              <Form.Label>
                Choose Logo Image<span className="supplier-setting-text-danger">*</span>:
              </Form.Label>
              <Form.Control
                type="file"
                name="logoImage"
                accept="image/*"
              />
              <Form.Text className="text-muted">
                {selectedHeader?.logoImagePath ? `File: ${selectedHeader.logoImagePath}` : 'No file chosen'}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="isActive" className="supplier-setting-form-group">
              <Form.Check
                type="checkbox"
                label="Is Active"
                name="isActive"
                defaultChecked={selectedHeader?.isActive || false}
              />
            </Form.Group>

            <div className="modal-footer">
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              <Button type="submit" variant="primary">{isEditMode ? 'Update' : 'Save'}</Button>
            </div>
          </Form>
        </div>
      </CustomModal>
    </div>
  );
};

export default SettingInvoiceHeaders;
