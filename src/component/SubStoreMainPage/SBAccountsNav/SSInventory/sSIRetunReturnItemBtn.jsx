/* Ajhar Tamboli sSIRetunReturnItemBtn.jsx 19-09-24 */


import React, { useState, useEffect, useRef } from 'react';
import '../SSInventory/sSIRetunReturnItemBtn.css';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api';
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';

const SSIRetunReturnItemBtn = ({ onBack }) => {
  const { store } = useParams();
  const [returnDate, setReturnDate] = useState('');
  const [items, setItems] = useState([]);
    const tableRef = useRef(null);

  const [columnWidths,setColumnWidths]=useState([])
  
  // State for the table row
  const [rowData, setRowData] = useState({
    itemCategory: '',
    itemName: '',
    vendorName: '',
    itemCode: '',
    batchNo: '',
    expiryDate: '',
    barcodeNumber: '',
    storeName: '',
    availableQty: 0,
    returnQty: 1,
  });

  const [remarks, setRemarks] = useState('');
  const [returnBy, setReturnBy] = useState(''); // Added state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/inventory-requisitions/getAll`);
        if (!response.ok) {
          throw new Error('Failed to fetch items.');
        }
        const data = await response.json();
        const completedItems = data.filter(item => item.status === 'completed');
        setItems(completedItems);
        console.log(completedItems);
        
      } catch (error) {
        console.error('Error fetching items:', error);
        alert('There was an error fetching the inventory items. Please try again later.');
      }
    };

    fetchItems();
  }, []);

  // Handle change for item selection
  const handleItemChange = (e) => {
    const selectedItemName = e.target.value;
    const selectedItemData = items.find(item => item.itemName === selectedItemName);

    if (selectedItemData) {
      setRowData({
        ...rowData,
        itemName: selectedItemName,
        availableQty: selectedItemData.availableQty,
        code: selectedItemData.code,
        // Reset other fields if necessary
      });
    } else {
      setRowData({
        ...rowData,
        itemName: '',
        availableQty: 0,
        code: '',
      });
    }
  };

  // Handle changes for editable fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setRowData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSave = async () => {
    // Basic validation
    if (!returnDate) {
      alert('Please select a return date.');
      return;
    }
    if (!rowData.itemName) {
      alert('Please select an item.');
      return;
    }
    if (!rowData.itemCategory) {
      alert('Please select an item category.');
      return;
    }
    if (!returnBy) {
      alert('Please enter the name of the person returning the item.');
      return;
    }
    // Add more validations as needed

    const returnData = {
      returnDate: returnDate,
      itemCategory: rowData.itemCategory,
      itemName: rowData.itemName,
      vendorName: rowData.vendorName,
      itemCode: rowData.code,
      batchNo: rowData.batchNo,
      expiryDate: rowData.expiryDate,
      barcodeNumber: rowData.barcodeNumber,
      storeName: rowData.storeName,
      availableQty: rowData.availableQty,
      returnQty: rowData.returnQty,
      remarks: remarks,
      returnBy: returnBy // Include returnedBy
    };

    try {
      const response = await fetch(`${API_BASE_URL}/inventory-return/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnData),
      });

      if (response.ok) {
        alert('Return successfully recorded!');
        // Reset form
        setReturnDate('');
        setRowData({
          itemCategory: '',
          itemName: '',
          vendorName: '',
          code: '',
          batchNo: '',
          expiryDate: '',
          barcodeNumber: '',
          storeName: '',
          availableQty: 0,
          returnQty: 1,
        });
        setRemarks('');
        setReturnBy(''); // Reset returnedBy
      } else {
        const errorData = await response.json();
        alert(`Failed to save return. ${errorData.message || ''}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the return. Please try again.');
    }
  };

  // Handle form discard/reset
  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard the changes?')) {
      // Reset form
      setReturnDate('');
      setRowData({
        itemCategory: '',
        itemName: '',
        vendorName: '',
        code: '',
        batchNo: '',
        expiryDate: '',
        barcodeNumber: '',
        storeName: '',
        availableQty: 0,
        returnQty: 1,
      });
      setRemarks('');
      setReturnBy(''); // Reset returnedBy
    }
  };

  return (
    <div className="">
      <h2 className="sSIRetunReturnItemBtn-title">
        <i className="fa-solid fa-star-of-life"></i> Add Return
      </h2>
      
      {/* Return Date Section */}
      <div className="sSIRetunReturnItemBtn-form-section">
        <label>Return Date*:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      {/* Inventory Selection */}
      <div >
        <label>Select Inventory:</label>
        <select value={rowData.itemName} onChange={handleItemChange}>
          <option value="">Select Item</option>
          {items.map(item => (
            <option key={item.id} value={item.itemName}>
              {item.itemName}
            </option>
          ))}
        </select>
      </div>

      {/* Return Items Table */}
      <div className="table-container">
  <table className="sSIReturnItem-table" ref={tableRef}>
    <thead>
      <tr>
          {[
        "Item Category*",
        "Item Name*",
        "Vendor Name*",
        "Code",
        "Batch No.*",
        "Expiry Date*",
        "Barcode No.*",
        "Store Name*",
        "Available Qty",
        "Return Qty*",
        "Returned By*",
        "Actions",
         ].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
                    className="resizable-th"
                  ><div className="header-content">
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
      <tr>
        {/* Item Category */}
        <td>
          <select
            name="itemCategory"
            value={rowData.itemCategory}
            onChange={handleFieldChange}
          >
            <option value="">Select Category</option>
            <option value="Consumable">Consumable</option>
            <option value="Capital Goods">Capital Goods</option>
            {/* Add more categories as needed */}
          </select>
        </td>

        {/* Item Name */}
        <td>
          <select
            name="itemName"
            value={rowData.itemName}
            onChange={handleItemChange}
          >
            <option value="">Select Item</option>
            {items.map(item => (
              <option key={item.id} value={item.itemName}>
                {item.itemName}
              </option>
            ))}
          </select>
        </td>

        {/* Vendor Name */}
        <td>
          <input
            type="text"
            name="vendorName"
            value={rowData.vendorName}
            onChange={handleFieldChange}
            placeholder="Enter Vendor Name"
          />
        </td>

        {/* Code */}
        <td>
          <input
            type="text"
            name="code"
            value={rowData.code}
            readOnly
            placeholder="Auto-filled Code"
          />
        </td>

        {/* Batch No. */}
        <td>
          <input
            type="text"
            name="batchNo"
            value={rowData.batchNo}
            onChange={handleFieldChange}
            placeholder="Enter Batch No."
          />
        </td>

        {/* Expiry Date */}
        <td>
          <input
            type="date"
            name="expiryDate"
            value={rowData.expiryDate}
            onChange={handleFieldChange}
          />
        </td>

        {/* Barcode No. */}
        <td>
          <input
            type="text"
            name="barcodeNumber"
            value={rowData.barcodeNumber}
            onChange={handleFieldChange}
            placeholder="Enter Barcode No."
          />
        </td>

        {/* Store Name */}
        <td>
          <input
            type="text"
            name="storeName"
            value={rowData.storeName}
            onChange={handleFieldChange}
            placeholder="Enter Store Name"
          />
        </td>

        {/* Available Qty */}
        <td>
          <input
            type="number"
            name="availableQty"
            value={rowData.availableQty}
            readOnly
          />
        </td>

        {/* Return Qty */}
        <td>
          <input
            type="number"
            name="returnQty"
            value={rowData.returnQty}
            onChange={handleFieldChange}
            min="1"
            placeholder="Enter Quantity"
          />
        </td>

        {/* Returned By */}
        <td>
          <input
            type="text"
            name="returnedBy"
            value={returnBy}
            onChange={(e) => setReturnBy(e.target.value)}
            placeholder="Enter Returner's Name"
          />
        </td>

        {/* Actions */}
        <td>
          <button
            className="sSIReturnItem-delete-btn"
            onClick={handleDiscard}
          >
            x
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>


      {/* Remark Section */}
      <div className="sSIRetunReturnItemBtn-remark-section">
        <div className="sSIRetunReturnItemBtn-remark">
          <label>Remark:</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter Remarks"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="sSIRetunReturnItemBtn-buttons">
<button
    className="sSIRetunReturnItemBtn-save-button"
    onClick={handleSave}
    disabled={!returnDate || !rowData.itemName || !rowData.itemCategory || !returnBy}
  > </button>  
       <button className="sSIRetunReturnItemBtn-discard-button" onClick={handleDiscard}>Discard</button>
      </div>
    </div>
  );
};

export default SSIRetunReturnItemBtn;
