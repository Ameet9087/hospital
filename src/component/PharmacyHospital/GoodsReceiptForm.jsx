/* Mohini_GoodsReceiptForm_WholePage_14/sep/2024 */
import React, { useState, useEffect } from 'react';
import './GoodsReceiptForm.css';
import AddSupplierForm from './AddSupplierForm';
import AddGRItemForm from './AddGRItemForm';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';

const GoodsReceiptForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isAddGRItemFormOpen, setIsAddGRItemFormOpen] = useState(false);
  const [goodsReceipt, setGoodsReceipt] = useState({});
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/good-receipts/good-receipts`)
      .then(response => {
        setGoodsReceipt(response.data);
        setItems(response.data.items || []);
      })
      .catch(error => console.error('Error fetching data:', error));

    axios.get(`${API_BASE_URL}/suppliers`)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  const handleClose = () => {
    setIsFormOpen(false);
  };

  const handleOpenSupplierModal = () => {
    setIsAddSupplierModalOpen(true);
  };

  const handleCloseSupplierModal = () => {
    setIsAddSupplierModalOpen(false);
  };

  const handleOpenAddGRItemForm = () => {
    setItemToUpdate(null); // Clear itemToUpdate when adding a new item
    setIsAddGRItemFormOpen(true);
  };

  const handleCloseAddGRItemForm = () => {
    setIsAddGRItemFormOpen(false);
  };

  const handleAddItem = (item) => {
    console.log('Adding item:', item); // Debugging line
    setItems([...items, item]);
  };

  const handleUpdateItem = (itemId, updatedItem) => {
    axios.put(`${API_BASE_URL}/gr-items/${itemId}`, updatedItem)
      .then(response => {
        setItems(prevItems => prevItems.map(item => 
          item.id === itemId ? response.data : item
        ));
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const handleDeleteItem = (itemId) => {
    axios.delete(`${API_BASE_URL}/gr-items/${itemId}`)
      .then(() => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        setItemCount(prevCount => prevCount - 1);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      supplierBillDate: event.target.supplierBillDate.value,
      goodsReceiptDate: event.target.goodsReceiptDate.value,
      supplier: { id: event.target.supplier.value },
      invoiceNumber: event.target.invoiceNumber.value,
      paymentMode: event.target.paymentMode.value,
      creditPeriod: event.target.creditPeriod.value,
      remarks: event.target.remarks.value,
      taxableSubTotal: event.target.taxableSubTotal.value,
      nonTaxableSubTotal: event.target.nonTaxableSubTotal.value,
      subTotal: event.target.subTotal.value,
      discountPercent: event.target.discountPercent.value,
      discountAmount: event.target.discountAmount.value,
      vatPercent: event.target.vatPercent.value,
      vatTotal: event.target.vatTotal.value,
      ccCharge: event.target.ccCharge.value,
      adjustment: event.target.adjustment.value,
      totalAmount: event.target.totalAmount.value,
      items: items
    };
    axios.post(`${API_BASE_URL}/good-receipts`, formData)
      .then(response => {
        console.log('Good receipt added:', response.data);
      })
      .catch(error => console.error('Error adding good receipt:', error));
  };

  if (!isFormOpen) {
    return null;
  }

  return (
    <div className="goods-receipt-form-com">
      <button className="goods-receipt-close-btn" onClick={handleClose}>×</button>
      <div className='div-add-good-receipt'>
        <h5 className='add-good-receipt'>Add Good Receipt</h5>
      </div>
     
      <form onSubmit={handleSubmit}>
        <div className="goods-receipt-form-row">
          <div className="goods-receipt-form-group">
            <label>Supplier Bill Date:</label>
            <input type="date" name="supplierBillDate" defaultValue="2024-08-24" />
          </div>
          <div className="goods-receipt-form-group" style={{ marginLeft: "10px" }}>
            <label>Goods Receipt Date:</label>
            <input type="date" name="goodsReceiptDate" defaultValue="2024-08-24" />
          </div>
        </div>
        <div className="goods-receipt-form-row">
          <div className="goods-receipt-form-group">
            <label>Supplier Name*:</label>
            <select name="supplier">
              <option value="">Select Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container-question-box">
            <input type="text" name="supplierName" />
            <span className="question-icon" onClick={handleOpenSupplierModal}>?</span>
          </div>
          <div className="goods-receipt-form-group">
            <label>Invoice*:</label>
            <input type="text" name="invoiceNumber" placeholder="Invoice No" />
          </div>
          <div className="goods-receipt-form-group">
            <label>Payment Mode*:</label>
            <select name="paymentMode">
              <option>Credit</option>
              <option>Cash</option> {/* Add more payment modes as needed */}
            </select>
          </div>
          <div className="goods-receipt-form-group">
            <label>Credit Period:</label>
            <input type="number" name="creditPeriod" defaultValue="0" />
          </div>
        </div>
        <table className='goods-receipt-table'>
          <thead>
            <tr>
              <th>Generic Name</th>
              <th>Item Name</th>
              <th>Batch No</th>
              <th>Rack No</th>
              <th>Exp Date</th>
              <th>Item Qty</th>
              <th>Free Qty</th>
              <th>Total Qty</th>
              <th>Rate</th>
              <th>Margin%</th>
              <th>cCCharge%</th>
              <th>ccAmt</th>
              <th>Sub Total</th>
              <th>Discount%</th>
              <th>Discount Amt</th>
              <th>Vat%</th>
              <th>VAT Amt</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.grItemId}>
                <td>{item.genericNameId}</td>
                <td>{item.addItemId}</td>
                <td>{item.batchNo}</td>
                <td>{item.rackNo}</td>
                <td>{item.expDate}</td>
                <td>{item.itemQty}</td>
                <td>{item.freeQty}</td>
                <td>{item.totalQty}</td>
                <td>{item.rate}</td>
                <td>{item.marginPercentage}</td>
                <td>{item.ccChargePercentage}</td>
                <td>{item.ccAmount}</td>
                <td>{item.subTotal}</td>
                <td>{item.discountPercentage}</td>
                <td>{item.discountAmount}</td>
                <td>{item.vatPercentage}</td>
                <td>{item.vatAmount}</td>
                <td>{item.totalAmount}</td>
                <td>
                  <button onClick={() => handleUpdateItem(item.id, item)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="goods-receipt-add-item-btn"
          onClick={handleOpenAddGRItemForm}
        >
          + Add New Item
        </button>

        <p>Items Count: {itemCount}</p>
        <div className="goods-receipt-totals-section">
          <div className="goods-receipt-totals-column">
            <div className="goods-receipt-total-row">
              <label>Taxable Sub Total:</label>
              <input type="number" name="taxableSubTotal" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Non Taxable Sub Total:</label>
              <input type="number" name="nonTaxableSubTotal" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Sub Total:</label>
              <input type="number" name="subTotal" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Discount Percent:</label>
              <input type="number" name="discountPercent" defaultValue="0" readOnly />
            </div>
          </div>
          <div className="goods-receipt-totals-column">
            <div className="goods-receipt-total-row">
              <label>Discount Amount:</label>
              <input type="number" name="discountAmount" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>VAT Percent:</label>
              <input type="number" name="vatPercent" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>VAT Total:</label>
              <input type="number" name="vatTotal" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>CC Charge:</label>
              <input type="number" name="ccCharge" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Total Amount:</label>
              <input type="number" name="ccCharge" defaultValue="0" readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Remarks:</label>
              <input type="number" name="ccCharge" defaultValue="0" readOnly />
            </div>
          </div>
        </div>

        <div className="goods-receipt-form-actions">
          <button type="submit" className="submit-btn">Print</button>
          <button type="submit" className="submit-btn">Submit</button>
        </div>
        
      </form>

      {/* Add Item Modal */}
      {isAddGRItemFormOpen && (
        <CustomModal
          title="Add GR Item"
          onClose={handleCloseAddGRItemForm}
          isOpen={isAddGRItemFormOpen}
        >
          <AddGRItemForm onSubmit={handleAddItem}  onClose={handleCloseAddGRItemForm}/>
        </CustomModal>
      )}

      {/* Add Supplier Modal */}
      {isAddSupplierModalOpen && (
        <CustomModal
          title="Add Supplier"
          onClose={handleCloseSupplierModal}
          isOpen={isAddSupplierModalOpen}
        >
          <AddSupplierForm />
        </CustomModal>
      )}
    </div>
  );
};

export default GoodsReceiptForm;
