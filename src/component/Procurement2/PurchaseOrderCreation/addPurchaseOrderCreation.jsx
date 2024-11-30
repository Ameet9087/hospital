/* Ajhar Tamboli addPurchaseOrderCreation.jsx 11-10-24 */

import React, { useState, useEffect } from 'react';
import "./addPurchaseOrderCreation.css";

const AddPurchaseOrderCreation = ({ onClose, order, onSubmit }) => {
  const [purchaseOrder, setPurchaseOrder] = useState({
    order_id: '',
    vendorId: '',
    orderDate: '',
    status: '',
    itemName: '',
    itemQuantity: 1, // Initialize as 0 to handle integer format
    unitPrice: 0,    // Initialize as 0 to handle integer format
    deliveryDate: '',
    paymentTerms: '',
    approverName: '',
    remarks: '',
  });

  useEffect(() => {
    if (order) {
      const vendor_id = order.vendormanagement?.vendor_id || '';
      setPurchaseOrder(prev => ({
        ...prev,
        ...order,
        vendorId: vendor_id
      }));
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert itemQuantity and unitPrice to integers
    const parsedValue = (name === 'itemQuantity' || name === 'unitPrice') ? parseInt(value) || 0 : value;

    setPurchaseOrder(prev => {
      const updatedOrder = {
        ...prev,
        [name]: parsedValue,
      };

      // Calculate totalPrice if itemQuantity or unitPrice changes
      if (name === 'itemQuantity' || name === 'unitPrice') {
        updatedOrder.totalPrice = updatedOrder.itemQuantity * updatedOrder.unitPrice;
      }

      return updatedOrder;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Purchase Order:', purchaseOrder);
    onSubmit(purchaseOrder);
    onClose();
  };

  return (
    <div className="addPurchaseOrderCreation-container">
      <div className="addPurchaseOrderCreation-header">
        <h3>{order ? 'Edit Purchase Order' : 'Add Purchase Order Creation'}</h3>
        <button className="addPurchaseOrderCreation-close-btn" onClick={onClose}>x</button>
      </div>

      <form className="addPurchaseOrderCreation-form" onSubmit={handleSubmit}>
        <div className="addPurchaseOrderCreation-form-row">
          <div className="addPurchaseOrderCreation-form-group-1row">
            <div className="addPurchaseOrderCreation-form-group">
              <label>Purchase Order ID<span>*</span></label>
              <input type="number" name="order_id" value={purchaseOrder.order_id} onChange={handleChange} placeholder="Enter Purchase Order ID" />
            </div>
            <div className="addPurchaseOrderCreation-form-group">
              <label>Vendor ID<span>*</span></label>
              <input type="text" name="vendorId" value={purchaseOrder.vendorId} onChange={handleChange} placeholder="Enter Vendor ID" required />
            </div>
          </div>

          <div className="addPurchaseOrderCreation-form-group-1row">
            <div className="addPurchaseOrderCreation-form-group">
              <label>Purchase Order Date</label>
              <input type="date" name="orderDate" value={purchaseOrder.orderDate} onChange={handleChange} placeholder="Enter Purchase Order Date" />
            </div>
            <div className="addPurchaseOrderCreation-form-group">
              <label>Purchase Order Status<span>*</span></label>
              <input type="text" name="status" value={purchaseOrder.status} onChange={handleChange} placeholder='Enter Purchase Order Status' />
            </div>
          </div>

          <div className="addPurchaseOrderCreation-form-group-1row">
            <div className="addPurchaseOrderCreation-form-group">
              <label>Item Name/Description</label>
              <input type="text" name="itemName" value={purchaseOrder.itemName} onChange={handleChange} placeholder="Enter Item Name/Description" />
            </div>
            <div className="addPurchaseOrderCreation-form-group">
              <label>Item Quantity<span>*</span></label>
              <input type="number" name="itemQuantity" value={purchaseOrder.itemQuantity} onChange={handleChange} placeholder='Enter Item Quantity' />
            </div>
          </div>

          <div className="addPurchaseOrderCreation-form-group-1row">
            <div className="addPurchaseOrderCreation-form-group">
              <label>Unit Price</label>
              <input type="number" name="unitPrice" value={purchaseOrder.unitPrice} onChange={handleChange} placeholder="Enter Unit Price" required />
            </div>
            <div className="addPurchaseOrderCreation-form-group">
              <label>Total Price</label>
              <input type="number" name="totalPrice" value={purchaseOrder.totalPrice} readOnly placeholder="Total Price" />
            </div>
          </div>

          <div className="addPurchaseOrderCreation-form-group-1row">
            <div className="addPurchaseOrderCreation-form-group">
              <label>Delivery Date</label>
              <input type="date" name="deliveryDate" value={purchaseOrder.deliveryDate} onChange={handleChange} placeholder="Enter Delivery Date" />
            </div>
            <div className="addPurchaseOrderCreation-form-group">
              <label>Payment Terms</label>
              <input type="text" name="paymentTerms" value={purchaseOrder.paymentTerms} onChange={handleChange} placeholder="Enter Payment Terms" />
            </div>
          </div>

          <div className="addPurchaseOrderCreation-form-group-1row">
            <div className="addPurchaseOrderCreation-form-group">
              <label>Approver Name</label>
              <input type="text" name="approverName" value={purchaseOrder.approverName} onChange={handleChange} placeholder="Enter Approver Name" />
            </div>
            <div className="addPurchaseOrderCreation-form-group">
              <label>Remarks</label>
              <input type="text" name="remarks" value={purchaseOrder.remarks} onChange={handleChange} placeholder="Enter Remarks" />
            </div>
          </div>

          <div className="addPurchaseOrderCreation-form-group-1row">
            <div className="addPurchaseOrderCreation-form-group">
              <label>Status</label>
              <input type="text" name="status" value={purchaseOrder.status} onChange={handleChange} placeholder="Enter Status" />
            </div>
          </div>
        </div>

        <div className="addPurchaseOrderCreation-form-actions">
          <button className="addPurchaseOrderCreation-add-btn" type="submit">
            {order ? 'Update Purchase Order' : 'Add Purchase Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPurchaseOrderCreation;
