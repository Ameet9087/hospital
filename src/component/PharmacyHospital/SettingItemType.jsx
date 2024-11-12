/* Mohini_SettingItemType_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; // Make sure this contains relevant styles
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import * as XLSX from 'xlsx';
import useCustomAlert from '../../alerts/useCustomAlert';
import { startResizing } from '../TableHeadingResizing/resizableColumns';
const SettingItemType = () => {
  const [itemTypes, setItemTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState('Add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [openStickerPopup, setOpenStickerPopup] = useState(false);
  const { success, error, CustomAlerts } = useCustomAlert();
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  // Fetch item types from API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/itemtypes`)
      .then(response => {
        console.log('Data fetched successfully:', response.data); // Debugging line
        setItemTypes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the item types!', error);
      });
  }, []);

  // Filtered item types based on search term
  const filteredItemTypes = itemTypes.filter(item =>
    item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (mode, item = null) => {
    setFormMode(mode);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemTypeData = {
      type: event.target.itemType.value,
      category: event.target.selectCategory.value,
      description: event.target.description.value,
      isActive: event.target.isActive.checked
    };

    if (formMode === 'Add') {
      axios.post(`${API_BASE_URL}/itemtypes`, itemTypeData)
        .then(response => {
          setItemTypes([...itemTypes, response.data]);
          handleCloseModal();
        })
        .catch(error => {
          console.error('There was an error adding the item type!', error);
        });
    } else if (formMode === 'Edit') {
      axios.put(`${API_BASE_URL}/itemtypes/${selectedItem.id}`, itemTypeData)
        .then(response => {
          const updatedItemTypes = itemTypes.map(item =>
            item.id === selectedItem.id ? response.data : item
          );
          setItemTypes(updatedItemTypes);
          handleCloseModal();
        })
        .catch(error => {
          console.error('There was an error updating the item type!', error);
        });
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
        <button className="setting-supplier-add-user-button" onClick={() => handleShowModal('Add')}>+ Add Item Type</button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <div className='setting-supplier-span'> */}
        <div className='setting-supplier-span'>
        <span>Showing {filteredItemTypes.length} / {itemTypes.length} results</span>
  <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      {/* </div> */}
      <div className='setting-supplier-tab'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[  "Item Type",
  "Category",
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
            {filteredItemTypes.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td>{item.category}</td>
                <td>{item.description || 'N/A'}</td>
                <td>{item.isActive ? 'true' : 'false'}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowModal('Edit', item)}>Edit</button>
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
  <div className="supplier-setting-modal-header">
    <h5>{formMode === 'Add' ? 'Add Item Type' : 'Update Item Type'}</h5>
    {/* <button className="close" onClick={handleCloseModal}>&times;</button> */}
  </div>
  <div className="supplier-setting-modal-body">
    <Form onSubmit={handleSubmit}>
      <div className="supplier-setting-form-row">
        <Form.Group controlId="itemType" className="supplier-setting-form-group col-md-6">
          <Form.Label>Type of Item<span className="supplier-setting-text-danger">*</span>:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Item Type"
            required
            defaultValue={formMode === 'Edit' ? selectedItem?.type : ''}
          />
        </Form.Group>
        <Form.Group controlId="selectCategory" className="supplier-setting-form-group col-md-6">
          <Form.Label>Select Category<span className="supplier-setting-text-danger">*</span>:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            required
            defaultValue={formMode === 'Edit' ? selectedItem?.category : ''}
          />
        </Form.Group>
      </div>
      <Form.Group controlId="description" className="supplier-setting-form-group">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Description"
          defaultValue={formMode === 'Edit' ? selectedItem?.description : ''}
        />
      </Form.Group>
      <Form.Group controlId="isActive" className="supplier-setting-form-group">
        <Form.Check
          type="checkbox"
          label="Is Active"
          defaultChecked={formMode === 'Edit' ? selectedItem?.isActive : false}
        />
      </Form.Group>
      <div className="supplier-setting-text-right">
        <Button variant="primary" type="submit">
          {formMode === 'Add' ? 'Add' : 'Update'}
        </Button>
      </div>
    </Form>
  </div>
</CustomModal>

    </div>
  );
};

export default SettingItemType;
/* Mohini_SettingItemType_WholePage_14/sep/2024 */
