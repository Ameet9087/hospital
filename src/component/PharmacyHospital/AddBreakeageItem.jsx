import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBreakageItem.css';
import { API_BASE_URL } from '../api/api';

const BreakageItemPage = () => {
  const [items, setItems] = useState([{ id: 1, salePrice: 0, discountAmt: 0, vat: 0, totalAmt: 0 }]);
  const [availableItems, setAvailableItems] = useState([]);
  const [breakageDate, setBreakageDate] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
  axios.get(`${API_BASE_URL}/goods-receipt-items`)
    .then((response) => {
      console.log('API Response:', response.data); // Ensure correct data is logged
      setAvailableItems(response.data);
    })
    .catch((error) => {
      console.error('Error fetching items:', error);
    });
}, []);


  const handleAddItem = () => {
    setItems([...items, { id: items.length + 1, qty: 0, salePrice: 0, discountAmt: 0, vat: 0, totalAmt: 0 }]);
  };

  
  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
const handleChange = (id, field, value) => {
  if (field === 'itemName') {
    const selectedItem = availableItems.find((item) => item.itemName === value);

    if (selectedItem) {
      setItems(
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                goodReceiptItemId: selectedItem.goodReceiptItemId,
                itemName: selectedItem.itemName,
                avlQty: selectedItem.avlQty || 0,
                batch: selectedItem.batch || 'N/A',
                expDate: selectedItem.expDate || 'N/A',
              }
            : item
        )
      );
    }
  } else {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value, totalAmt: calculateTotal(item, field, value) } : item
      )
    );
  }
};



  const calculateTotal = (item, field, value) => {
    const updatedItem = { ...item, [field]: value };
    const subtotal = updatedItem.qty * updatedItem.salePrice;
    const discount = (subtotal * updatedItem.discountAmt) / 100;
    const vatAmount = ((subtotal - discount) * updatedItem.vat) / 100;
    return subtotal - discount + vatAmount;
  };

const handleSubmit = () => {
  const invalidItems = items.filter(item => !item.goodReceiptItemId);
  if (invalidItems.length > 0) {
    alert('Please select valid items before submitting.');
    return;
  }

  const payload = {
    breakageDate,
    remark,
    brekageItems: items.map(item => ({
      goodReceiptItemId: item.goodReceiptItemId,
    })),
  };

  console.log(payload);

  axios.post(`${API_BASE_URL}/breakage-items`, payload)
    .then((response) => {
      alert('Breakage data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving breakage data:', error);
    });
};




  return (
    <div className="breakageItem-container">
      <table className="breakageItem-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Avl Qty</th>
            <th>Batch</th>
            <th>Exp Date</th>
            <th>Qty</th>
            <th>SalePrice</th>
            <th>Sub Total</th>
            <th>Discount Amt</th>
            <th>VAT %</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
            {items.map((item) => (
    <tr key={item.goodReceiptItemId}>
      <td>
        <button
          className="breakageItem-remove-btn"
          onClick={() => handleRemoveItem(item.id)}
        >
          &#x2715;
        </button>
        <select
  className="breakageItem-select"
  value={item.itemName || ''}
  onChange={(e) => handleChange(item.id, 'itemName', e.target.value)} // Use item.id here
>
  <option value="">--Select Medicine--</option>
  {availableItems.map((availableItem) => (
    <option key={availableItem.goodReceiptItemId} value={availableItem.itemName}>
      {availableItem.itemName}
    </option>
  ))}
</select>

      </td>
      <td><input type="number" value={item.avlQty || 0} readOnly /></td>
      <td><input type="text" value={item.batch || 'Batch'} readOnly /></td>
      <td><input type="text" value={item.expDate || 'Exp Date'} readOnly /></td>
      <td>
        <input
          type="number"
          value={item.qty}
          onChange={(e) => handleChange(item.id, 'qty', +e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={item.salePrice}
          onChange={(e) => handleChange(item.id, 'salePrice', +e.target.value)}
        />
      </td>
      <td>{item.qty * item.salePrice}</td>
      <td>
        <input
          type="number"
          value={item.discountAmt}
          onChange={(e) => handleChange(item.id, 'discountAmt', +e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={item.vat}
          onChange={(e) => handleChange(item.id, 'vat', +e.target.value)}
        />
      </td>
      <td>{item.totalAmt}</td>
    </tr>
  ))}
  <tr>
    <td colSpan="10">
      <button className="breakageItem-add-btn" onClick={handleAddItem}>+</button>
    </td>
  </tr>
        </tbody>
      </table>
      <div className="breakageItem-summary">
        <label>
          Select Breakage Date: <input type="date" value={breakageDate} onChange={(e) => setBreakageDate(e.target.value)} />
        </label>
        <label>
          Remark: <textarea value={remark} onChange={(e) => setRemark(e.target.value)} />
        </label>
        <div>
          <p>SubTotal: {items.reduce((sum, item) => sum + item.qty * item.salePrice, 0)}</p>
          <p>Discounted Amount: {items.reduce((sum, item) => sum + (item.qty * item.salePrice * item.discountAmt) / 100, 0)}</p>
          <p>VAT Amount: {items.reduce((sum, item) => sum + ((item.qty * item.salePrice - (item.qty * item.salePrice * item.discountAmt) / 100) * item.vat) / 100, 0)}</p>
          <p>Total Amount: {items.reduce((sum, item) => sum + item.totalAmt, 0)}</p>
        </div>
      </div>
      <div className="breakageItem-actions">
        <button className="breakageItem-request-btn" onClick={handleSubmit}>Request</button>
        <button className="breakageItem-cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default BreakageItemPage;
