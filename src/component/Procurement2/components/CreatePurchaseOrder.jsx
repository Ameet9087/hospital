import React, { useState } from 'react';
import axios from 'axios';
import './CreatePurchaseOrder.css';
import { API_BASE_URL } from '../../api/api';

const CreatePurchaseOrder = () => {
  const [purchaseOrder, setPurchaseOrder] = useState({
    vendorName: '',
    poDate: '',
    deliveryDate: '',
    currencyCode: '',
    referenceNo: '',
    invoicingAddress: '',
    deliveryAddress: '',
    contactPerson: '',
    contactEmail: '',
    paymentMode: 'Credit',
    remarks: '',
    subTotal: 0,
    vat: 0,
    totalAmount: 0,
    status: 'Pending',
    items: []
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPurchaseOrder((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleItemChange = (index, e) => {
    const { id, value } = e.target;
    const updatedItems = [...purchaseOrder.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [id]: value
    };
    setPurchaseOrder((prev) => ({
      ...prev,
      items: updatedItems
    }));
    calculateTotals(updatedItems);
  };

  const addItemRow = () => {
    setPurchaseOrder((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          category: '',
          itemName: '',
          vendorItemCode: '',
          mssNo: '',
          hsnCode: '',
          itemCode: '',
          unit: '',
          quantity: 0,
          standardRate: 0,
          vatPercentage: 0,
          totalAmount: 0,
          remarks: ''
        }
      ]
    }));
  };

  const removeItemRow = (index) => {
    const updatedItems = purchaseOrder.items.filter((_, i) => i !== index);
    setPurchaseOrder((prev) => ({
      ...prev,
      items: updatedItems
    }));
    calculateTotals(updatedItems);
  };

  const calculateTotals = (items) => {
    const subTotal = items.reduce((sum, item) => sum + (item.standardRate * item.quantity), 0);
    const vat = items.reduce((sum, item) => sum + ((item.standardRate * item.quantity) * (item.vatPercentage / 100)), 0);
    const totalAmount = subTotal + vat;
  
    setPurchaseOrder((prev) => ({
      ...prev,
      subTotal,
      vat,
      totalAmount
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/purchase-orders/savePurchaseOrder`, purchaseOrder);
      console.log('Purchase Order created:', response.data);
    } catch (error) {
      console.error('Error creating Purchase Order:', error.response?.data || error.message);
    }
  };

  return (
    <div className="CreatePurchaseOrder-purchase-order">
      <h2>Add Purchase Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="CreatePurchaseOrder-form-row">
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="vendorName">Vendor*:</label>
            <input type="text" id="vendorName" value={purchaseOrder.vendorName} onChange={handleChange} placeholder="Vendor Name" required />
          </div>
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="poDate">PO Date:</label>
            <input type="date" id="poDate" value={purchaseOrder.poDate} onChange={handleChange} />
          </div>
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="deliveryDate">Delivery Date:</label>
            <input type="date" id="deliveryDate" value={purchaseOrder.deliveryDate} onChange={handleChange} />
          </div>
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="currencyCode">Currency Code*:</label>
            <input type="text" id="currencyCode" value={purchaseOrder.currencyCode} onChange={handleChange} placeholder="Currency Code" required />
          </div>
        </div>
        <div className="CreatePurchaseOrder-form-row">
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="referenceNo">Reference No.</label>
            <input type="text" id="referenceNo" value={purchaseOrder.referenceNo} onChange={handleChange} />
          </div>
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="invoicingAddress">Invoicing Address</label>
            <input type="text" id="invoicingAddress" value={purchaseOrder.invoicingAddress} onChange={handleChange} />
          </div>
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="deliveryAddress">Delivery Address</label>
            <input type="text" id="deliveryAddress" value={purchaseOrder.deliveryAddress} onChange={handleChange} />
          </div>
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="contactPerson">Contact Person</label>
            <input type="text" id="contactPerson" value={purchaseOrder.contactPerson} onChange={handleChange} />
          </div>
          <div className="CreatePurchaseOrder-form-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input type="email" id="contactEmail" value={purchaseOrder.contactEmail} onChange={handleChange} />
          </div>
        </div>
        <table className="CreatePurchaseOrder-item-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Item Name</th>
              <th>Vendor's Item Code</th>
              <th>MSS No.</th>
              <th>HSN Code</th>
              <th>Item Code</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Standard Rate</th>
              <th>VAT %</th>
              <th>Total Amount</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrder.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <select id="category" value={item.category} onChange={(e) => handleItemChange(index, e)}>
                    <option>Consumables</option>
                    <option>ELectronics</option>
                    {/* Add more options as needed */}
                  </select>
                </td>
                <td><input type="text" id="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, e)} placeholder="Item Name" /></td>
                <td><input type="text" id="vendorItemCode" value={item.vendorItemCode} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="text" id="mssNo" value={item.mssNo} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="text" id="hsnCode" value={item.hsnCode} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="text" id="itemCode" value={item.itemCode} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="text" id="unit" value={item.unit} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="number" id="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="number" id="standardRate" value={item.standardRate} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="number" id="vatPercentage" value={item.vatPercentage} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="number" id="totalAmount" value={item.totalAmount} onChange={(e) => handleItemChange(index, e)} /></td>
                <td><input type="text" id="remarks" value={item.remarks} onChange={(e) => handleItemChange(index, e)} /></td>
                <td>
                  <button type="button" className="CreatePurchaseOrder-delete-btn" onClick={() => removeItemRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="CreatePurchaseOrder-add-row-btn" onClick={addItemRow}>+ Add New Row</button>
        <div className="CreatePurchaseOrder-items-count">Items Count: {purchaseOrder.items.length}</div>
        <div className="CreatePurchaseOrder-terms-conditions">
          <label>Select Terms & Conditions:</label>
          <textarea id="termsConditions" value={purchaseOrder.remarks} onChange={handleChange}></textarea>
        </div>
        <div className="CreatePurchaseOrder-totals">
          <div className="CreatePurchaseOrder-subtotal">
            <label>Sub Total:</label>
            <span>{purchaseOrder.subTotal}</span>
          </div>
          <div className="CreatePurchaseOrder-vat">
            <label>VAT:</label>
            <span>{purchaseOrder.vat}</span>
          </div>
          <div className="CreatePurchaseOrder-total-amount">
            <label>Total Amount:</label>
            <span>{purchaseOrder.totalAmount}</span>
          </div>
        </div>
        <button type="submit" className="CreatePurchaseOrder-submit-btn">Save</button>
      </form>
    </div>
  );
};

export default CreatePurchaseOrder;
