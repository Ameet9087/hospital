import React, { useState } from 'react';
import './PurchaseOrderStartNewDraft.css'; // Assuming the CSS is in this file

const PurchaseOrderStartNewDraft = () => {
  const [vendor, setVendor] = useState('');
  const [reference, setReference] = useState('');
  const [invoicing, setInvoicing] = useState('');
  const [delivery, setDelivery] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [items, setItems] = useState([
    {
      category: 'Consumables',
      itemName: '',
      itemCode: '',
      unit: '',
      quantity: 1,
      rate: 0,
      vat: 0,
      totalAmount: 0,
      remarks: '',
    },
  ]);
  const [remarks, setRemarks] = useState('');

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    updateTotals();
  };

  const updateTotals = () => {
    // Implement logic to calculate totals based on items
  };

  const addNewRow = () => {
    setItems([
      ...items,
      {
        category: 'Consumables',
        itemName: '',
        itemCode: '',
        unit: '',
        quantity: 1,
        rate: 0,
        vat: 0,
        totalAmount: 0,
        remarks: '',
      },
    ]);
  };

  const removeRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    updateTotals();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement save logic
  };

  const discardChanges = () => {
    // Implement discard logic
  };

  return (
    <div className="StartPurchaseOrderDraftNewList-container">
      {/* <h1><i className="fas fa-shopping-cart"></i> Add Purchase Order Draft</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="StartPurchaseOrderDraftNewList-form-group">
          <label htmlFor="vendor">Vendor:</label>
          <input
            type="text"
            id="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            placeholder="Vendor Name"
          />
          <button type="button" className="StartPurchaseOrderDraftNewList-info-btn">?</button>
        </div>
        
        <div className="StartPurchaseOrderDraftNewList-form-row">
          <div className="StartPurchaseOrderDraftNewList-form-group">
            <label htmlFor="reference">Reference No.:</label>
            <textarea
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            ></textarea>
          </div>
          <div className="StartPurchaseOrderDraftNewList-form-group">
            <label htmlFor="invoicing">Invoicing Address:</label>
            <textarea
              id="invoicing"
              value={invoicing}
              onChange={(e) => setInvoicing(e.target.value)}
            ></textarea>
          </div>
          <div className="StartPurchaseOrderDraftNewList-form-group">
            <label htmlFor="delivery">Delivery Address:</label>
            <textarea
              id="delivery"
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
            ></textarea>
          </div>
          <div className="StartPurchaseOrderDraftNewList-form-group">
            <label htmlFor="contact-person">Contact Person:</label>
            <textarea
              id="contact-person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            ></textarea>
          </div>
          <div className="StartPurchaseOrderDraftNewList-form-group">
            <label htmlFor="contact-email">Contact Email:</label>
            <textarea
              id="contact-email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            ></textarea>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Item Name</th>
              <th>Item Code</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>VAT %</th>
              <th>Total Amount</th>
              <th>Remarks</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={item.category}
                    onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                  >
                    <option>Consumables</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={item.itemName}
                    onChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
                  />
                  <button type="button" className="StartPurchaseOrderDraftNewList-info-btn">?</button>
                </td>
                <td>
                  <input
                    type="text"
                    value={item.itemCode}
                    onChange={(e) => handleInputChange(index, 'itemCode', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleInputChange(index, 'rate', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.vat}
                    onChange={(e) => handleInputChange(index, 'vat', e.target.value)}
                  />
                </td>
                <td>{item.quantity * item.rate * (1 + item.vat / 100)}</td>
                <td>
                  <textarea
                    value={item.remarks}
                    onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
                  ></textarea>
                </td>
                <td>
                  <button type="button" className="StartPurchaseOrderDraftNewList-remove-btn" onClick={() => removeRow(index)}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <button type="button" className="StartPurchaseOrderDraftNewList-add-row-btn" onClick={addNewRow}>+ Add New Row</button>
        <span className="StartPurchaseOrderDraftNewList-items-count">Items Count: {items.length}</span>
        
        <div className="StartPurchaseOrderDraftNewList-totals">
          <div className="StartPurchaseOrderDraftNewList-total-row">
            <span>SubTotal:</span>
            <span>/* Calculate SubTotal */</span>
          </div>
          <div className="StartPurchaseOrderDraftNewList-total-row">
            <span>VAT:</span>
            <span>/* Calculate VAT */</span>
          </div>
          <div className="StartPurchaseOrderDraftNewList-total-row">
            <span>Total Amount:</span>
            <span>/* Calculate Total Amount */</span>
          </div>
          <div className="StartPurchaseOrderDraftNewList-total-row">
            <span>In Words:</span>
            <span>Only.</span>
          </div>
        </div>
        
        {/* <div className="StartPurchaseOrderDraftNewList-form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div> */}
        
        <div className="StartPurchaseOrderDraftNewList-form-actions">
          <button type="submit" className="StartPurchaseOrderDraftNewList-save-btn">Save As Draft</button>
          <button type="button" className="StartPurchaseOrderDraftNewList-discard-btn" onClick={discardChanges}>Discard Changes</button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrderStartNewDraft;
