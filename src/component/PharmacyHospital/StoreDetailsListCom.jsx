/* Mohini_StoreDetailsListCom_WholePage_14/sep/2024 */
import React, { useState ,useRef} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SettingSupplier.css'; 
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import * as XLSX from 'xlsx';

const usersData = [
  {
      genericName: "Paracetamol",
      medicineName: "Panadol",
      batchNo: "B001",
      expiryDate: "2024-12-01",
      availableQty: 150,
      sales: 50,
      purchases: 200,
      store: "Store A"
    },
    {
      genericName: "Ibuprofen",
      medicineName: "Brufen",
      batchNo: "B002",
      expiryDate: "2025-06-15",
      availableQty: 100,
      sales: 30,
      purchases: 130,
      store: "Store B"
    },
    {
      genericName: "Amoxicillin",
      medicineName: "Amoxil",
      batchNo: "B003",
      expiryDate: "2024-08-20",
      availableQty: 80,
      sales: 40,
      purchases: 120,
      store: "Store C"
    },
    {
      genericName: "Cetirizine",
      medicineName: "Zyrtec",
      batchNo: "B004",
      expiryDate: "2023-11-10",
      availableQty: 200,
      sales: 100,
      purchases: 300,
      store: "Store D"
    },
    {
      genericName: "Ciprofloxacin",
      medicineName: "Cipro",
      batchNo: "B005",
      expiryDate: "2024-03-25",
      availableQty: 60,
      sales: 20,
      purchases: 80,
      store: "Store E"
    },
    {
      genericName: "Aspirin",
      medicineName: "Aspirin",
      batchNo: "B006",
      expiryDate: "2024-10-10",
      availableQty: 180,
      sales: 70,
      purchases: 250,
      store: "Store F"
    },
    {
      genericName: "Metformin",
      medicineName: "Glucophage",
      batchNo: "B007",
      expiryDate: "2024-09-30",
      availableQty: 90,
      sales: 40,
      purchases: 130,
      store: "Store G"
    },
    {
      genericName: "Amlodipine",
      medicineName: "Norvasc",
      batchNo: "B008",
      expiryDate: "2025-01-12",
      availableQty: 140,
      sales: 60,
      purchases: 200,
      store: "Store H"
    },
    {
      genericName: "Simvastatin",
      medicineName: "Zocor",
      batchNo: "B009",
      expiryDate: "2024-07-07",
      availableQty: 110,
      sales: 50,
      purchases: 160,
      store: "Store I"
    },
    {
      genericName: "Omeprazole",
      medicineName: "Prilosec",
      batchNo: "B010",
      expiryDate: "2024-05-05",
      availableQty: 130,
      sales: 60,
      purchases: 190,
      store: "Store J"
}
];

const StoreDetailsListCom = () => {
  const [suppliers, setSuppliers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showZeroQty, setShowZeroQty] = useState(false);
  const [selectedStore, setSelectedStore] = useState(''); // State for store filtering
  const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);


  const handleStoreFilterChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleShowZeroQtyChange = (e) => {
    setShowZeroQty(e.target.checked);
  };

  const filteredUsers = suppliers.filter(user => {
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
            {Array.from(new Set(suppliers.map(user => user.store))).map(store => (
              <option key={store} value={store}>{store}</option>
            ))}
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
    
        
      <div className='setting-supplier-span'>
      <span>Showing {filteredUsers.length} / {suppliers.length} results</span>
      <button className='item-wise-export-button'onClick={handleExport}>Export</button>
  <button className='item-wise-print-button'onClick={handlePrint}>Print</button>
</div>
      <div className='table-container'>
      <table ref={tableRef}>
                        <thead>
                            <tr>
                                {["Medicine Name",
  "Generic Name",
  "Batch No",
  "Expiry Date",
  "Available Qty",
  "Sales",
  "Purchases",
  "Store",
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
                <td>{user.medicineName}</td>
                <td>{user.genericName}</td>
                <td>{user.batchNo}</td>
                <td>{user.expiryDate}</td>
                <td>{user.availableQty}</td>
                <td>{user.sales}</td>
                <td>{user.purchases}</td>
                <td>{user.store}</td>
                <td className="setting-supplier-action-buttons">
                  <button className="setting-supplier-action-button" onClick={() => handleShowEditModal(user)}>Update SalePrice</button>
                  <button className="setting-supplier-action-button">Update Exp&Batch</button>
                  <button className="setting-supplier-action-button">Manage</button>

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

      {/* <Modal show={showEditModal} onHide={handleCloseModal} dialogClassName="manage-add-employee-role">
        <div className="manage-modal-dialog">
          <div className="manage-modal-modal-header">
            <div className="manage-modal-modal-title">Edit Details for {selectedUser?.medicineName}</div>
            <Button onClick={handleCloseModal} className="manage-modal-employee-role-btn">X</Button>
          </div>
          <div className="manage-modal-modal-body">
            <Form onSubmit={handleSubmit}>
              <Button type="submit" className="manage-modal-employee-btn">Save</Button>
              <Button type="button" onClick={handleCloseModal} className="manage-modal-employee-btn">Cancel</Button>
            </Form>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default StoreDetailsListCom;
/* Mohini_StoreDetailsListCom_WholePage_14/sep/2024 */
