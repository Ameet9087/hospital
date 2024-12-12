/* Mohini_PurchaseOrderForm_WholePage_14/sep/2024 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PurchaseOrderForm.css';
import { API_BASE_URL } from '../api/api';

const PurchaseOrderForm = () => {
  const [formVisible, setFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    supplier: '',
    poDate: '2024-08-24',
    deliveryDate: '2024-08-24',
    referenceNo: '',
    deliveryAddress: '',
    contact: '',
    deliveryDays: '0',
    invoicingAddress: '',
    subtotal: 0,
    discountPercentage: 0,
    discount: 0,
    taxableAmount: 0,
    nonTaxableAmount: 0,
    vatAmount: 0,
    ccCharge: 0,
    adjustment: 0,
    totalAmount: 0,
    remarks: '',
    inWords: '',
  });

  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/suppliers/get-all-suppliers`)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the suppliers!', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, {
      genericName: '',
      itemName: '',
      quantity: '0',
      freeQty: '0',
      totalQty: '0',
      rate: '0',
      subtotal: '0',
      ccChargePercentage: '0',
      ccChargeAmount: '0',
      discountPercentage: '0',
      discountAmount: '0',
      vatPercentage: '0',
      vatAmount: '0',
      totalAmount: '0',
      remarks: ''
    }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      items: items.map(item => ({
        genericName: item.genericName,
        itemName: item.itemName,
        quantity: parseFloat(item.quantity),
        freeQty: parseFloat(item.freeQty),
        totalQty: parseFloat(item.totalQty),
        rate: parseFloat(item.rate),
        subtotal: parseFloat(item.subtotal),
        ccChargePercentage: parseFloat(item.ccChargePercentage),
        ccChargeAmount: parseFloat(item.ccChargeAmount),
        discountPercentage: parseFloat(item.discountPercentage),
        discountAmount: parseFloat(item.discountAmount),
        vatPercentage: parseFloat(item.vatPercentage),
        vatAmount: parseFloat(item.vatAmount),
        totalAmount: parseFloat(item.totalAmount),
        remarks: item.remarks,
      }))
    };

    axios.post(`${API_BASE_URL}/order-purchase-orders`, data)
      .then(response => {
        alert('Purchase order saved successfully!');
      })
      .catch(error => {
        console.error('There was an error saving the purchase order!', error);
        alert('Failed to save purchase order.');
      });
  };

  if (!formVisible) {
    return null;
  }

  return (
    <form className="purchase-order-form-component" onSubmit={handleSubmit}>
     
      <button className="purchase-order-close-button" onClick={handleCloseForm}>
        &times;
      </button>
      <div className='div-add-good-purchase'>
          <h5 >Add Purchase Order</h5>
      </div>
      <div className="purchase-order-form-form-row">
        <div className="purchase-order-form-form-group">
          <label>Supplier:*</label>
          <select name="supplier" value={formData.supplier} onChange={handleInputChange}>
            <option value="">Select Supplier</option>
            {suppliers.map(supplier => (
              <option key={supplier.suppliersId} value={supplier.supplierName}>{supplier.supplierName}</option>
            ))}
          </select>
        </div>
        <div className="purchase-order-form-form-group">
          <label>PO Date:*</label>
          <input type="date" name="poDate" value={formData.poDate} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-form-group">
          <label>Delivery Days:</label>
          <input type="number" name="deliveryDays" value={formData.deliveryDays} onChange={handleInputChange} />
        </div>
      </div>

      <div className="purchase-order-form-form-row">
        <div className="purchase-order-form-form-group">
          <label>Delivery Date:</label>
          <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-form-group">
          <label>Reference No.:</label>
          <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleInputChange} />
        </div>

        <div className="purchase-order-form-form-group">
          <label>Contact:</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
        </div>
       
      </div>

      <div className="purchase-order-form-form-row">
        <div className="purchase-order-form-form-group">
          <label>Delivery Address:</label>
          <textarea className="purchase-order-textare" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange}></textarea>
        </div>

        <div className="purchase-order-form-form-group">
          <label>Invoicing Address:</label>
          <textarea className="purchase-order-textare" name="invoicingAddress" value={formData.invoicingAddress} onChange={handleInputChange}></textarea>
        </div>


       
        <div className="purchase-order-form-form-group">
         
        </div>
      </div>

      <table className="purchase-order-form-items-table">
        <thead>
          <tr>
            <th>Generic Name</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Free Qty</th>
            <th>Total Qty</th>
            <th>Standard Rate</th>
            <th>SubTotal</th>
            <th>CCCharge %</th>
            <th>Dis %</th>
            <th>VAT %</th>
            <th>Total Amt</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td><input type="text" name="genericName" value={item.genericName} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="text" name="itemName" value={item.itemName} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="freeQty" value={item.freeQty} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="totalQty" value={item.totalQty} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="rate" value={item.rate} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="subtotal" value={item.subtotal} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="ccChargePercentage" value={item.ccChargePercentage} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="discountPercentage" value={item.discountPercentage} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="vatPercentage" value={item.vatPercentage} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="number" name="totalAmount" value={item.totalAmount} onChange={(e) => handleItemChange(index, e)} /></td>
              <td><input type="text" name="remarks" value={item.remarks} onChange={(e) => handleItemChange(index, e)} /></td>
              <td>
                <button type="button" onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

   
      <div className="purchase-order-form-summary-buttons" style={{textAlign:"right"}}>
      <button type="button" className='purchase-btn-order' onClick={addItem}>Add Item</button>
      </div><br></br>
      <div className='goods-receipt-totals-section'>

  
      <div className="purchase-order-form-summary">
        <div className="purchase-order-form-summary-item">
          <label>Sub Total:</label>
          <input type="text" name="subtotal" value={formData.subtotal} readOnly />
        {/* </div> */}
        {/* <div className="purchase-order-form-summary-item"> */}
          <label>Discount %:</label>
          <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-summary-item">
          <label>Taxable Amount:</label>
          <input type="number" name="taxableAmount" value={formData.taxableAmount} onChange={handleInputChange} />
        {/* </div>
        <div className="purchase-order-form-summary-item"> */}
          <label>Non-Taxable Amount:</label>
          <input type="number" name="nonTaxableAmount" value={formData.nonTaxableAmount} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-summary-item">
          <label>VAT Amount:</label>
          <input type="number" name="vatAmount" value={formData.vatAmount} onChange={handleInputChange} />
        {/* </div>
        <div className="purchase-order-form-summary-item"> */}
          <label>CC Charge:</label>
          <input type="number" name="ccCharge" value={formData.ccCharge} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-summary-item">
          <label>Adjustment:</label>
          <input type="number" name="adjustment" value={formData.adjustment} onChange={handleInputChange} />
        {/* </div>
        <div className="purchase-order-form-summary-item"> */}
          <label>Total Amount:</label>
          <input type="text" name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} />
        </div>
        <div className="purchase-order-form-summary-item">
          <label>In Words:</label>
          <input type="text" name="inWords" value={formData.inWords} onChange={handleInputChange} />
        </div>
      </div>

      <div className="purchase-order-form-summary-buttons" style={{textAlign:"right"}}>
        <button type="submit" className="purchase-btn-order">Submit</button>
      </div>
      </div>
    </form>
  );
};

export default PurchaseOrderForm;
/* Mohini_PurchaseOrderForm_WholePage_14/sep/2024 */
