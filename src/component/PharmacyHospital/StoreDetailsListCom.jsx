import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // For API calls
import { Modal, Button, Form } from 'react-bootstrap';
import './SettingSupplier.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import CustomModal from '../../CustomModel/CustomModal';
import { API_BASE_URL } from '../api/api';

const StoreDetailsListCom = () => {
  const [suppliers, setSuppliers] = useState([]); // Updated to fetch data dynamically
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditExpiry, setShowEditExpiry] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showZeroQty, setShowZeroQty] = useState(false);
  const [selectedStore, setSelectedStore] = useState(''); // State for store filtering
  const [columnWidths, setColumnWidths] = useState({});
  const [salePrice, setSalePrice] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [batchNumber,setBatchNumber]=useState();
  const tableRef = useRef(null);

  // Fetch data from API
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/add-item`)
      .then((response) => {
        const data = response.data.map((item) => ({
          goodReceiptItemId: item.goodReceiptItemId || 0,
          itemId:item.addItemId,
          itemName: item.itemMaster.itemName || 'N/A',
          genericName: item.itemMaster.genericNames.genericName || 'N/A',
          medicineName: item.addItem || 'N/A',
          batchNo: item.batchNo || 'N/A',
          expiryDate: item.expiryDate || 'N/A',
          availableQty: item.totalQty || 0,
          salePrice: item.salePrice || 0, // Assuming no sales data in API, you can modify as needed
          purchases: item.totalQuantity || 0,
          store: 'Store Unknown', // Default value if store data is unavailable
        }));
        console.log(response.data);
        
        setSuppliers(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [showEditExpiry,showEditModal]);

  const handleStoreFilterChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleShowZeroQtyChange = (e) => {
    setShowZeroQty(e.target.checked);
  };

  const filteredUsers = suppliers.filter((user) => {
    const matchesSearch =
      user.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.store.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStore = selectedStore === '' || user.store === selectedStore;
    const matchesZeroQty = !showZeroQty || user.availableQty === 0;

    return matchesSearch && matchesStore && matchesZeroQty;
  });

  const handleShowEditModal = (user) => {
    console.log(user);
    
    setSelectedUser(user);
    
    setShowEditModal(true);
  };
  const handleShowEditExpiry = (user) => {
    setSelectedUser(user);
    setShowEditExpiry(true);
  };

 


  const handleCloseModal = () => {
    setShowEditModal(false);
    setShowEditExpiry(false);
    setSelectedUser(null);
  };

  const handleSalePriceSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_BASE_URL}/add-item/${selectedUser.itemId}/salePrice`, null, {
        params: { salePrice },
      });
      setShowEditModal(false); // Close the modal
      setSalePrice();

    } catch (error) {
      console.error("Error updating sale price:", error);
    }
  };
  
  const handleExpirySubmit = async (e) => {
    e.preventDefault();
    console.log(batchNumber +"" +expiryDate);
    
    try {
      await axios.patch(`${API_BASE_URL}/add-item/${selectedUser.itemId}/batch`, null, {
        params: { batchNo:batchNumber, expiryDate },
      })
      setShowEditExpiry(false); // Close the modal
      setBatchNumber();
      setExpiryDate();
    } catch (error) {
      console.error("Error updating expiry date:", error);
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
      <span className="store-setting-incoming-stock-title">Incoming Stock List</span>

      <div className="store-setting-incoming-stock-list-header">
        <div className="store-setting-show-zero-quantity">
          <input
            type="checkbox"
            id="showZeroQty"
            checked={showZeroQty}
            onChange={handleShowZeroQtyChange}
          />
          <label htmlFor="showZeroQty">Show Zero Quantity</label>
        </div>
        <div className="store-setting-filter-by-store">
          <label htmlFor="storeFilter">Filter by Store:</label>
          <select
            id="storeFilter"
            value={selectedStore}
            onChange={handleStoreFilterChange}
          >
            <option value="">All Stores</option>
            {Array.from(new Set(suppliers.map((user) => user.store))).map(
              (store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="manage-users-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="setting-supplier-span">
        <span>
          Showing {filteredUsers.length} / {suppliers.length} results
        </span>
        <button className="item-wise-export-button" onClick={handleExport}>
          Export
        </button>
        <button className="item-wise-print-button" onClick={handlePrint}>
          Print
        </button>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                'Medicine Name',
                'Generic Name',
                'Batch No',
                'Expiry Date',
                'Available Qty',
                'Sales',
                'Purchases',
                'Store',
                'Action',
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(
                        index
                      )}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.itemName}</td>
                <td>{user.genericName}</td>
                <td>{user.batchNo}</td>
                <td>{user.expiryDate}</td>
                <td>{user.availableQty}</td>
                <td>{user.salePrice}</td>
                <td>{user.purchases}</td>
                <td>{user.store}</td>
                <td className="setting-supplier-action-buttons">
                  <button
                    className="setting-supplier-action-button"
                    onClick={() => handleShowEditModal(user)}
                  >
                    Update SalePrice
                  </button>
                  <button className="setting-supplier-action-button"
                    onClick={() => handleShowEditExpiry(user)}>
                    Update Exp&Batch
                  </button>
                  {/* <button className="setting-supplier-action-button">
                    Manage
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        dialogClassName="manage-add-employee-role"
      >
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">
              Edit Details for {selectedUser?.itemName}
            </div>
            <div>
              <label>Enter New Sale Price: </label>
              <input
                type="number"
                name="salePrice"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
            </div>
          </div>
          <div className="manage-modal-modal-body">
              <Button type="submit" className="manage-modal-employee-btn" onClick={handleSalePriceSubmit}>
                Update
              </Button>
          </div>
        </div>
      </CustomModal>

      <CustomModal
        isOpen={showEditExpiry}
        onClose={handleCloseModal}
        dialogClassName="manage-add-employee-role"
      >
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">
              Edit Details for {selectedUser?.itemName}
            </div>
            <div>
              <label>Enter New Expiry Date:</label>
              <input
                type="date"
                name="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div>
              <label>Enter New Batch Number:</label>
              <input
                type="text"
                name="batchNumber"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="manage-modal-modal-body">
              <Button type="submit" className="manage-modal-employee-btn" onClick={handleExpirySubmit}>
                Update
              </Button>
          </div>
        </div>
      </CustomModal>

    </div>
  );
};

export default StoreDetailsListCom;
