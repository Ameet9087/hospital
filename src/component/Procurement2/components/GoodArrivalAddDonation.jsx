import React, { useState } from 'react';
import './GoodArrivalAddDonnation.css';

function AddDonation() {
  const [items, setItems] = useState([
    {
      category: 'Consumables',
      itemName: '',
      batchNo: '',
      expiryDate: '',
      quantity: 0,
      freeQty: 0,
      rate: 0,
      discount: 0,
      vat: 0,
      ccCharge: 0,
      otherCharge: 0,
      totalAmount: 0,
      remarks: ''
    }
  ]);

  const addItemRow = () => {
    setItems([
      ...items,
      {
        category: 'Consumables',
        itemName: '',
        batchNo: '',
        expiryDate: '',
        quantity: 0,
        freeQty: 0,
        rate: 0,
        discount: 0,
        vat: 0,
        ccCharge: 0,
        otherCharge: 0,
        totalAmount: 0,
        remarks: ''
      }
    ]);
  };

  const deleteItemRow = (index) => {
    const updatedItems = items.filter((item, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div className="donn-container">
      <h2>Add Donation</h2>
      <form>
        <div className="donn-vendor-details">
          <label htmlFor="vendorName">Vendor Name<span>*</span>:</label>
          <input type="text" id="vendorName" placeholder="Search Vendor Name" />
          
          <label htmlFor="billNo">Bill No<span>*</span>:</label>
          <input type="text" id="billNo" />
          
          <label htmlFor="paymentMode">Payment Mode<span>*</span>:</label>
          <select id="paymentMode">
            <option>Credit</option>
            <option>Cash</option>
          </select>
          
          <label htmlFor="creditPeriod">Credit Period:</label>
          <input type="number" id="creditPeriod" value="0" />
          
          <label htmlFor="vendorBillDate">Vendor Bill Date:</label>
          <input type="date" id="vendorBillDate" />
          
          <label htmlFor="goodsReceiptDate">Goods Receipt Date:</label>
          <input type="date" id="goodsReceiptDate" />
        </div>

        <div className="donn-item-details">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Category</th>
                <th>ItemName</th>
                <th>BatchNo</th>
                <th>Expiry Date</th>
                <th>Quantity</th>
                <th>FreeQty</th>
                <th>Rate</th>
                <th>Dis(%)</th>
                <th>VAT(%)</th>
                <th>CcCharge(%)</th>
                <th>Other Charge</th>
                <th>Total Amount</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td><button type="button" className="donn-delete-row" onClick={() => deleteItemRow(index)}>X</button></td>
                  <td>
                    <select value={item.category}>
                      <option>Consumables</option>
                      <option>Non-Consumables</option>
                    </select>
                  </td>
                  <td><input type="text" placeholder="Item Name" /></td>
                  <td><input type="text" /></td>
                  <td><input type="date" /></td>
                  <td><input type="number" value={item.quantity} /></td>
                  <td><input type="number" value={item.freeQty} /></td>
                  <td><input type="number" value={item.rate} /></td>
                  <td><input type="number" value={item.discount} /></td>
                  <td><input type="number" value={item.vat} /></td>
                  <td><input type="number" value={item.ccCharge} /></td>
                  <td><input type="number" value={item.otherCharge} /></td>
                  <td><input type="number" value={item.totalAmount} /></td>
                  <td><input type="text" value={item.remarks} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="donn-add-row" onClick={addItemRow}>+ Add New Row</button>
          <span className="donn-item-count">Items Count: {items.length}</span>
        </div>

        <div className="donn-inspection-details">
          <label>
            <input type="checkbox" id="qualityInspection" />
            Add Quality Inspection
          </label>

          <div className="donn-checked-by">
            <button type="button" className="donn-remove-checked">-</button>
            <label htmlFor="checkedBy">Checked By:</label>
            <input type="text" id="checkedBy" value="Mr. admin admin" />
            <button type="button" className="donn-add-checked">+</button>
          </div>
        </div>

        <div className="donn-summary-details">
          <div className="donn-summary-fields">
            <label>SubTotal:</label>
            <input type="text" value="0" />

            <label>CcCharge:</label>
            <input type="text" value="0" />

            <label>Discount Amount:</label>
            <input type="text" value="0" />

            <label>VAT:</label>
            <input type="text" value="0" />

            <label>Other Charges (if any):</label>
            <input type="text" value="0" />

            <label>Total Amount:</label>
            <input type="text" value="0" />
          </div>
          <div className="donn-remarks-section">
            <label htmlFor="remarks">Remarks:</label>
            <input type="text" id="remarks" />
            <label>In Words:</label>
            <input type="text" value="Only." />
          </div>
        </div>

        <div className="donn-footer-notes">
          <span>Note: Adding donation will automatically create goods arrival note.</span>
        </div>

        <div className="donn-form-actions">
          <button type="button" className="donn-receipt-btn">Receipt</button>
          <button type="button" className="donn-discard-btn">Discard Changes</button>
        </div>
      </form>
    </div>
  );
}

export default AddDonation;
