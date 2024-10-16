import React, { useState, useEffect } from 'react';
import "./DirectDispatch.css";
import { API_BASE_URL } from '../../api/api';

const DirectDispatch = ({ setShowDirect }) => {
  const [storeName, setStoreName] = useState('');
  const [dispatchDate, setDispatchDate] = useState('');
  const [items, setItems] = useState([{
      itemCategory: 'Consumables',
      itemName: '',
      code: '',
      unit: '',
      availableQty: '',
      dispatchedQty: '',
      remark: ''
  }]);
  const [remarks, setRemarks] = useState('');
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    // Fetch items when the component mounts
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/items/all`);
        const data = await response.json();
        setAllItems(data); // Assuming data is an array of items
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleItemSelect = async (index, itemName) => {
    const selectedItem = allItems.find(item => item.itemName === itemName); // Adjust according to your item structure
    console.log(selectedItem);
    
    if (selectedItem) {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        itemName: selectedItem.itemName,
        code: selectedItem.itemCode,
        unit: selectedItem.unitOfMeasurement.name,
        availableQty: selectedItem.minStockQuantity,
      };
      setItems(newItems);
    }
  };

  const handleAddItem = () => {
    setItems([...items, {
      itemCategory: 'Consumables',
      itemName: '',
      code: '',
      unit: '',
      availableQty: '',
      dispatchedQty: '',
      remark: ''
    }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      storeName,
      dispatchDate,
      items,
      remarks,
    };
    console.log(payload);

    try {
      const response = await fetch(`${API_BASE_URL}/dispatch/savedispatch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Dispatch saved successfully');
        setShowDirect(false);
        // Handle success (e.g., show a success message, clear the form, etc.)
      } else {
        console.error('Error saving dispatch');
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network error
    }
  };

  const handleDiscard = () => {
    setStoreName('');
    setDispatchDate('2024-08-21');
    setItems([{
      itemCategory: 'Consumables',
      itemName: '',
      code: '',
      unit: '',
      availableQty: '',
      dispatchedQty: '',
      remark: ''
    }]);
    setRemarks('');
  };

  return (
    <div className="direct-dispatch-container">
      <form onSubmit={handleSubmit}>
        <div className="direct-dispatch-dispatch-date">
          <h1>Direct Dispatch</h1>
          <label>Dispatch Date: 
            <input 
              type="date" 
              value={dispatchDate} 
              onChange={(e) => setDispatchDate(e.target.value)} 
            />
          </label>
        </div>
        <div className="direct-dispatch-store-name">
          <label>Store*: 
            <select 
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
            >
              <option value="" disabled>Select Store</option>
              <option value="Accounts">Accounts</option>
              <option value="Brain Operations Store">Brain Operations Store</option>
              <option value="ICU Substore">ICU Substore</option>
              <option value="Male Ward Substore">Male Ward Substore</option>
              <option value="Maternity Substore">Maternity Substore</option>
              <option value="Operation Store">Operation Store</option>
              <option value="Private Sub Store">Private Sub Store</option>
              <option value="Substore1">Substore1</option>
              <option value="Substore2">Substore2</option>
            </select>
          </label>
        </div>
        <table className="direct-dispatch-dispatch-table">
          <thead>
            <tr>
              <th></th>
              <th>Item Category</th>
              <th>Item Name</th>
              <th>Code</th>
              <th>Unit</th>
              <th>Available Qty</th>
              <th>Dispatched Qty</th>
              <th>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <button type="button" className="direct-dispatch-buttons-direct-add" onClick={handleAddItem}>+</button>
                </td>
                <td>
                  <select 
                    name="itemCategory" 
                    value={item.itemCategory} 
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option>Consumables</option>
                    <option>Capital Goods</option>
                  </select>
                </td>
                <td>
                  <select 
                    name="itemName" 
                    value={item.itemName} 
                    onChange={(e) => {
                      handleItemSelect(index, e.target.value);
                    }}
                  >
                    <option value="" disabled>Select Item</option>
                    {allItems.map((allItem, idx) => (
                      <option key={idx} value={allItem.itemName}>{allItem.itemName}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input 
                    type="text" 
                    name="code" 
                    value={item.code} 
                    onChange={(e) => handleChange(index, e)}
                    readOnly // Optional: Make it read-only if auto-filled
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    name="unit" 
                    value={item.unit} 
                    onChange={(e) => handleChange(index, e)}
                    readOnly // Optional: Make it read-only if auto-filled
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    name="availableQty" 
                    value={item.availableQty} 
                    onChange={(e) => handleChange(index, e)} 
                    readOnly // Optional: Make it read-only if auto-filled
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    name="dispatchedQty" 
                    value={item.dispatchedQty} 
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    name="remark" 
                    value={item.remark} 
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <button type="button" className="direct-dispatch-buttons-remove" onClick={() => handleRemoveItem(index)}>X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="direct-dispatch-remarks">
          <label>Remarks*:</label>
          <textarea 
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>
        <div className="direct-dispatch-buttons">
          <button className="direct-dispatch-buttons-direct-dispatch" type="submit">Direct Dispatch</button>
          <button className="direct-dispatch-buttons-discard-change" type="button" onClick={handleDiscard}>Discard Changes</button>
        </div>
      </form>
    </div>
  );
};

export default DirectDispatch;
