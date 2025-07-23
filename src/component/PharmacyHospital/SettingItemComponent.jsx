/* Mohini_SettingItemComponent_WholePage_14/sep/2024 */
import React, { useState, useEffect,useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './SettingSupplier.css'; // Ensure this contains relevant styles
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';
import useCustomAlert from '../../alerts/useCustomAlert';
import * as XLSX from 'xlsx';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import AddItemMaster from './AddItemMaster';


const SettingItemComponent = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const { success, error, CustomAlerts } = useCustomAlert();
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await 
          axios.get(`${API_BASE_URL}/pharmacy-item-master`);

        console.log('Items Response:', itemsResponse.data);
    

        setItems(itemsResponse.data);
  
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showModal]);

  const filteredItems = items.filter(item =>
    item.genericNameDTO?.genericName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Search Term:', searchTerm);
  console.log('Items:', items);
  console.log('Filtered Items:', filteredItems);

  const handleShowModal = (item) => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
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
        <button
          className="setting-supplier-add-user-button"
          onClick={() => handleShowModal()}
        >
          + Add Item
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <div className="setting-supplier-span"> */}
    
          <div className='setting-supplier-span'>
          Showing {filteredItems.length} / {items.length} results
  <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
        
      {/* </div> */}
      <div className="table-container">
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {[ "Generic Name",
  "Medicine Name",
  "Company Name",
  "Item Type",
  "ReOrder Quantity",
  "MinStock Quantity",
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
            {items.length ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.genericNames?.genericName || 'N/A'}</td>
                  <td>{item.itemName || 'N/A'}</td>
                  <td>{item.manufactures?.companyName || 'N/A'}</td>
                  <td>{item.itemType?.itemType || 'N/A'}</td>
                  <td>{item.reOrderQuantity || 'N/A'}</td>
                  <td>{item.minStockQuantity || 'N/A'}</td>
                  <td className="setting-supplier-action-buttons">
                    {/* <button className="setting-supplier-action-button">
                      Add To Rack
                    </button> */}
                    <button
                      className="setting-supplier-action-button"
                      onClick={() => handleShowModal(item)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showModal} onClose={handleCloseModal}>
        <AddItemMaster onClose={handleCloseModal}/>
      </CustomModal>
      

    </div>
  );
};

export default SettingItemComponent;
