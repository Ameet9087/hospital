import React, { useState, useEffect } from 'react';
import './GoodsReceiptForm.css';
import AddSupplierForm from './AddSupplierForm';
import AddGRItemForm from './AddGRItemForm';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';
import CustomModal from '../../CustomModel/CustomModal';

const GoodsReceiptForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [totals, setTotals] = useState({
    taxableSubTotal: 0,
    nonTaxableSubTotal: 0,
    subTotal: 0,
    discountAmount: 0,
    vatTotal: 0,
    ccCharge: 0,
    totalAmount: 0,
  });
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  const [supplierBillDate, setSupplierBillDate] = useState('');
  const [goodsReceiptDate, setGoodsReceiptDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isAddSupplierModalOpen, setIsAddSupplierModalOpen] = useState(false);
  const [isAddGRItemFormOpen, setIsAddGRItemFormOpen] = useState(false);
  const [adjustment, setAdjustment] = useState(0); // State for adjustment

  useEffect(() => {
    axios.get(`${API_BASE_URL}/good-receipts`)
      .then(response => {
        setItems(response.data.items || []);
      })
      .catch(error => console.error('Error fetching goods receipts:', error));

    axios.get(`${API_BASE_URL}/suppliers`)
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);

  useEffect(() => {
    recalculateTotals();
  }, [items]);

  const recalculateTotals = () => {
    let taxableSubTotal = 0;
    let nonTaxableSubTotal = 0;
    let subTotal = 0;
    let discountAmount = 0;
    let vatTotal = 0;
    let ccCharge = 0;
    let totalAmount = 0;

    items.forEach(item => {
      const itemTotal = item.rate * item.itemQty;
      const itemDiscount = (item.discountPercentage / 100) * itemTotal;
      const itemVat = (item.vatPercentage / 100) * itemTotal;
      const itemCCCharge = (item.ccChargePercentage / 100) * itemTotal;

      subTotal += itemTotal;
      discountAmount += itemDiscount;
      vatTotal += itemVat;
      ccCharge += itemCCCharge;
      totalAmount += itemTotal - itemDiscount + itemVat + itemCCCharge;

      taxableSubTotal += itemTotal - itemDiscount + itemVat;
      nonTaxableSubTotal += itemTotal - itemDiscount;
    });

    setTotals({
      taxableSubTotal,
      nonTaxableSubTotal,
      subTotal,
      discountAmount,
      vatTotal,
      ccCharge,
      totalAmount,
    });
  };

  const handleSupplierChange = (e) => {
    setSelectedSupplierId(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      supplierBillDate: supplierBillDate || "0001-11-11",
      goodsReceiptDate: goodsReceiptDate || "0001-11-11",
      supplier: { suppliersId: Number(selectedSupplierId) },
      invoiceNumber: event.target.invoiceNumber.value || '',
      paymentMode: event.target.paymentMode.value || 'Credit',
      creditPeriod: Number(event.target.creditPeriod.value) || 0,
      grItems: items.map(item => ({
        addItem: { addItemId: Number(item.addItemId) },
        genericName: item.genericName || '',
        batchNumber: item.batchNo || '',
        rackNumber: item.rackNo || '',
        expiryDate: item.expDate || '',
        itemQuantity: Number(item.itemQty) || 0,
        freeQuantity: Number(item.freeQty) || 0,
        totalQuantity: Number(item.totalQty) || 0,
        standardRate: Number(item.rate) || 0,
        marginPercentage: Number(item.marginPercentage) || 0,
        salePrice: Number(item.salePrice) || 0,
        freeAmount: Number(item.freeAmount) || 0,
        ccChargePercentage: Number(item.ccChargePercentage) || 0,
        ccAmount: Number(item.ccAmount) || 0,
        subTotal: Number(item.subTotal) || 0,
        discountPercentage: Number(item.discountPercentage) || 0,
        discountAmount: Number(item.discountAmount) || 0,
        vatPercentage: Number(item.vatPercentage) || 0,
        vatAmount: Number(item.vatAmount) || 0,
        totalAmount: Number(item.totalAmount) || 0,
        remarks: item.remarks || '',
      })),
      taxableSubTotal: Number(totals.taxableSubTotal) || 0,
      nonTaxableSubTotal: Number(totals.nonTaxableSubTotal) || 0,
      subTotal: Number(totals.subTotal) || 0,
      discountPercent: Number(event.target.discountPercent.value) || 0,
      discountAmount: Number(totals.discountAmount) || 0,
      vatPercent: Number(event.target.vatPercent.value) || 0,
      vatTotal: Number(totals.vatTotal) || 0,
      ccCharge: Number(totals.ccCharge) || 0,
      adjustment: adjustment || 0,
      totalAmount: Number(totals.totalAmount) || 0,
      remarks: remarks || 'Order for medical supplies',
    };


    axios.post(`${API_BASE_URL}/good-receipts`, data)
      .then(response => {
        console.log('Good receipt added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding good receipt:', error.response ? error.response.data : error);
      });
  };








  return (
    <div className="goods-receipt-form-com">
      <button className="goods-receipt-close-btn" onClick={() => setIsFormOpen(false)}>×</button>
      <div className='div-add-good-receipt'>
        <h5 className='add-good-receipt'>Add Good Receipt</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="goods-receipt-form-row">
          <div className="goods-receipt-form-group">
            <label>Supplier Bill Date:</label>
            <input type="date" name="supplierBillDate" value={supplierBillDate} onChange={(e) => setSupplierBillDate(e.target.value)} />
          </div>
          <div className="goods-receipt-form-group" style={{ marginLeft: "10px" }}>
            <label>Goods Receipt Date:</label>
            <input type="date" name="goodsReceiptDate" value={goodsReceiptDate} onChange={(e) => setGoodsReceiptDate(e.target.value)} />
          </div>
        </div>

        <div className="goods-receipt-form-row">
          <div className="goods-receipt-form-group">
            <label>Supplier Name*:</label>
            <select name="supplier" value={selectedSupplierId} onChange={handleSupplierChange}>
              <option value="">Select Supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.suppliersId} value={supplier.suppliersId}>
                  {supplier.supplierName}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container-question-box">
            <input type="text" name="supplierName" />
            <span className="question-icon" onClick={() => setIsAddSupplierModalOpen(true)}>?</span>
          </div>

          <div className="goods-receipt-form-group">
            <label>Invoice*:</label>
            <input type="text" name="invoiceNumber" placeholder="Invoice No" />
          </div>

          <div className="goods-receipt-form-group">
            <label>Payment Mode*:</label>
            <select name="paymentMode">
              <option value="Credit">Credit</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          <div className="goods-receipt-form-group">
            <label>Credit Period:</label>
            <input type="number" name="creditPeriod" defaultValue="0" />
          </div>
        </div>

        <table className="goods-receipt-table">
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
              <th>CC Charge%</th>
              <th>CC Amt</th>
              <th>Sub Total</th>
              <th>Discount%</th>
              <th>Discount Amt</th>
              <th>VAT%</th>
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
              </tr>
            ))}
          </tbody>
        </table>

        <button type="button" className="goods-receipt-add-item-btn" onClick={() => setIsAddGRItemFormOpen(true)}>
          + Add New Item
        </button>

        <div className="goods-receipt-totals-section">
          <div className="goods-receipt-totals-column">
            <div className="goods-receipt-total-row">
              <label>Taxable Sub Total:</label>
              <input type="number" name="taxableSubTotal" value={totals.taxableSubTotal} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Non Taxable Sub Total:</label>
              <input type="number" name="nonTaxableSubTotal" value={totals.nonTaxableSubTotal} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Sub Total:</label>
              <input type="number" name="subTotal" value={totals.subTotal} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Discount Percent:</label>
              <input type="number" name="discountPercent" value={totals.discountAmount} readOnly />
            </div>
          </div>

          <div className="goods-receipt-totals-column">
            <div className="goods-receipt-total-row">
              <label>Discount Amount:</label>
              <input type="number" name="discountAmount" value={totals.discountAmount} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>VAT Percent:</label>
              <input type="number" name="vatPercent" value={totals.vatTotal} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>VAT Total:</label>
              <input type="number" name="vatTotal" value={totals.vatTotal} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>CC Charge:</label>
              <input type="number" name="ccCharge" value={totals.ccCharge} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Total Amount:</label>
              <input type="number" name="totalAmount" value={totals.totalAmount} readOnly />
            </div>
            <div className="goods-receipt-total-row">
              <label>Remarks:</label>
              <input type="text" name="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="goods-receipt-form-actions">
          {/* <button type="button" className="goods-receipt-add-item-btn">Print</button> */}
          <button type="submit" className="goods-receipt-add-item-btn">Submit</button>
        </div>
      </form>

      {/* Add Item Modal */}
      {isAddGRItemFormOpen && (
        <CustomModal
          title="Add GR Item"
          onClose={() => setIsAddGRItemFormOpen(false)}
          isOpen={isAddGRItemFormOpen}
        >
          <AddGRItemForm onSubmit={(item) => setItems([...items, item])} onClose={() => setIsAddGRItemFormOpen(false)} />
        </CustomModal>
      )}

      {/* Add Supplier Modal */}
      {isAddSupplierModalOpen && (
        <CustomModal
          title="Add Supplier"
          onClose={() => setIsAddSupplierModalOpen(false)}
          isOpen={isAddSupplierModalOpen}
        >
          <AddSupplierForm onClose={() => setIsAddSupplierModalOpen(false)} />
        </CustomModal>
      )}
    </div>
  );
};

export default GoodsReceiptForm;
