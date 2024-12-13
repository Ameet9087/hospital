import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddPurchaseOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const AddPurchaseOrderDraft = () => {
  const date=new Date();
  const [vendors, setVendors] = useState([]);
  const [currentDate,setCurrentDate]=useState(date)
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [items, setItems] = useState([]); // To store all items
const [filteredItems, setFilteredItems] = useState([]);
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };
  const [formData, setFormData] = useState({
    vendorId: null,
    poDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [
      {
        category: '',
        itemId: null,
        itemName: '',
        quantity: 1,
        standardRate: 0,
        totalAmount: 0,
        remarks: '',
      },
    ],
  });


useEffect(() => {
  axios.get('http://localhost:8080/api/items/getAllItem')
    .then((response) => setItems(response.data))
    .catch((error) => console.error('Error fetching items:', error));
}, []);

  // Fetch vendors and items on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/vendors/getAllVendors')
      .then((response) => setVendors(response.data))
      .catch((error) => console.error('Error fetching vendors:', error));

    axios.get('http://localhost:8080/api/items/getAllItem')
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

    const handleCategorySelect = (index, category) => {
    const filtered = items.filter((item) => item.category === category);
    setFilteredItems(filtered);

    const updatedItems = [...formData.items];
    updatedItems[index].category = category;
    updatedItems[index].itemId = null;
    updatedItems[index].itemName = '';
    updatedItems[index].standardRate = 0;
    updatedItems[index].totalAmount = 0;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleItemSelect = (index, itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);

    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      itemId: selectedItem.id,
      itemName: selectedItem.itemName,
      standardRate: selectedItem.standardRate,
      totalAmount: updatedItems[index].quantity * selectedItem.standardRate,
    };

    setFormData({ ...formData, items: updatedItems });
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...formData.items];
    updatedItems[index].quantity = quantity;
    updatedItems[index].totalAmount = quantity * updatedItems[index].standardRate;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleVendorSelect = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    setSelectedVendor(vendor);
    setFormData({
      ...formData,
      vendor: vendor.vendorName,
      vendorContactNo: vendor.contactNumber,
      vendorAddress: vendor.contactAddress,
      contactPerson: vendor.contactPerson,
      contactEmail: vendor.email,
      currecyCode:vendor.currencyCode,
      vendorId: vendor.id
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addNewRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { /* Initialize with default values */ }]
    });
  };

  const removeRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:8080/api/purchase-orders/create', formData)
      .then(response => {
        alert('Purchase Order saved successfully!');
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error saving purchase order:', error);
        alert('Failed to save purchase order.');
      });
  };

  return (
    <div className="AddPurchaseOrder-add-purchase-order">
      <h2>Add Purchase Order</h2>

      {/* Vendor Selection */}
      <div className="AddPurchaseOrder-form-row">
        <div className="AddPurchaseOrder-form-group">
          <label>Select Vendor:</label>
          <select
            onChange={(e) => handleVendorSelect(Number(e.target.value))}
            value={formData.vendorId || ''}
          >
            <option value="" disabled>Select a vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.vendorName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Autofill Vendor Data */}
      {selectedVendor && (
        <div className="AddPurchaseOrder-form-row">
          <div className="AddPurchaseOrder-form-group">
            <label>Vendor Name:</label>
            <input type="text" value={formData.vendorName} disabled />
          </div>
          <div className="AddPurchaseOrder-form-group">
            <label>Currency Code:</label>
            <input type="text" value={formData.currecyCode} disabled />
          </div>
          <div className="AddPurchaseOrder-form-group">
            <label>Vendor Contact No:</label>
            <input type="text" value={formData.vendorContactNo} disabled />
          </div>

          <div className="AddPurchaseOrder-form-group">
            <label>Vendor Address:</label>
            <input type="text" value={formData.vendorAddress} disabled />
          </div>
          {/* <div className="AddPurchaseOrder-form-group">
            <label>Contact Person:</label>
            <input type="text" value={formData.contactPerson} disabled />
          </div> */}
        </div>
      )}

      {/* Additional Form Fields */}
      <div className="AddPurchaseOrder-form-row">
        <div className="AddPurchaseOrder-form-group">
          <label>PO Date:</label>
          <input type="date" name="poDate" value={formData.poDate} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Delivery Date:</label>
          <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Reference no:</label>
          <input type="text" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Invoicing Address:</label>
          <input type="text" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Contact Person:</label>
          <input type="text" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Contact Email:</label>
          <input type="text" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
      </div>

      {/* Items Table */}
      <table className="AddPurchaseOrder-items-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th>Vendor's Item Code</th>
            <th>MSS No.</th>
            <th>HSN Code</th>
            <th>item Code</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Standard Rate</th>
            <th>VAT %</th>
            <th>Total Amount</th>
            <th>Remarks</th>
            <th>Action</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index}>
              <td>
                <select
                  value={item.category}
                  className='purchaseorderItemSelect'
                  onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                >
                  <option value="Consumables">Consumables</option>
                  <option value="Capital_goods">Capital Goods</option>
                  {/* Add more options */}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className='purchaseorderItemInput'
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                />
              </td>
              <td><button className='Pro-Purchase-add-btn' onClick={() => removeRow(index)}><FontAwesomeIcon icon={faTrashAlt} size="lg" /></button>
             </td>
              {/* Add more cells */}
            </tr>
          ))}
        </tbody>
      </table>

      <button className='purchaseorder-add-btn' onClick={addNewRow}>+ Add New Row</button>


      {/* Submit Button */}
      <div className="AddPurchaseOrder-button-group">
        <button onClick={handleSubmit}>Save Purchase Order</button>
      </div>
    </div>
  );
};

export default AddPurchaseOrderDraft;
