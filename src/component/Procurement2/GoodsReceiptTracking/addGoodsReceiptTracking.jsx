/* Ajhar Tamboli addContractManagement.jsx 11-10-24 */

import React, { useState } from 'react';
import "./addGoodsReceiptTracking.css";

const AddGoodsReceiptTracking = ({ onClose, selectedData, onSubmit }) => {
  console.log(selectedData);
  
  const [formData, setFormData] = useState({
    reciept_id: selectedData?.reciept_id || '',
    purchaseOrderID: selectedData?.purchaseOrder?.order_id || '',
    vendorID: selectedData?.purchaseOrder?.vendormanagement?.vendor_id || '',
    receiptDate: selectedData?.receiptDate || '',
    itemName: selectedData?.itemName || '',
    quantityOrdered: selectedData?.quantityOrdered || '',
    quantityRecieved: selectedData?.quantityRecieved || '',
    unitPrice: selectedData?.unitPrice || '',
    totalAmount: selectedData?.totalAmount || '',
    goodsInspectionStatus: selectedData?.goodsInspectionStatus || '',
    deliveryStatus: selectedData?.deliveryStatus || '',
    remarks: selectedData?.remarks || '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const formattedData = {
      reciept_id: formData.reciept_id,
      purchaseOrderId: formData.purchaseOrderID, // Convert to number if needed
      receiptDate: formData.receiptDate,
      itemName: formData.itemName,
      quantityRecieved: formData.quantityRecieved, // Convert to number if needed
      goodsInspectionStatus: formData.goodsInspectionStatus,
      deliveryStatus: formData.deliveryStatus,
      remarks: formData.remarks,
    };
    onSubmit(formattedData); // Submit the formatted data
    onClose();
  };


  return (
    <div className="addGoodsReceiptTracking-container">
      <div className="addGoodsReceiptTracking-header">
        <h3>{selectedData ? 'Edit Goods Receipt Tracking' : 'Add Goods Receipt Tracking'}</h3>
        <button className="addGoodsReceiptTracking-close-btn" onClick={onClose}>x</button>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="addGoodsReceiptTracking-form">
          <div className="addGoodsReceiptTracking-form-row">
            <div className="addGoodsReceiptTracking-form-group-1row">
              <div className="addGoodsReceiptTracking-form-group">
                <label>Goods Receipt ID<span>*</span></label>
                <input
                  type="text"
                  name="reciept_id"
                  value={formData.reciept_id}
                  onChange={handleInputChange}
                  placeholder="Enter Goods Receipt ID"
                />
              </div>
              <div className="addGoodsReceiptTracking-form-group">
                <label>Purchase Order ID<span>*</span></label>
                <input
                  type="number"
                  name="purchaseOrderID"
                  value={formData.purchaseOrderID}
                  onChange={handleInputChange}
                  placeholder="Enter Purchase Order ID"
                  required
                />
              </div>
            </div>

            <div className="addGoodsReceiptTracking-form-group-1row">
              <div className="addGoodsReceiptTracking-form-group">
                <label>Vendor ID</label>
                <input
                  type="text"
                  name="vendorID"
                  value={formData.vendorID}
                  onChange={handleInputChange}
                  placeholder="Enter Vendor ID"
                />
              </div>
              <div className="addGoodsReceiptTracking-form-group">
                <label>Receipt Date<span>*</span></label>
                <input
                  type="date"
                  name="receiptDate"
                  value={formData.receiptDate}
                  onChange={handleInputChange}
                  placeholder="Enter Receipt Date"
                />
              </div>
            </div>

            <div className="addGoodsReceiptTracking-form-group-1row">
              <div className="addGoodsReceiptTracking-form-group">
                <label>Item Name/Description</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  placeholder="Enter Item Name/Description"
                />
              </div>
              <div className="addGoodsReceiptTracking-form-group">
                <label>Quantity Ordered<span>*</span></label>
                <input
                  type="number"
                  name="quantityOrdered"
                  value={formData.quantityOrdered}
                  onChange={handleInputChange}
                  placeholder="Enter Quantity Ordered"
                />
              </div>
            </div>

            <div className="addGoodsReceiptTracking-form-group-1row">
              <div className="addGoodsReceiptTracking-form-group">
                <label>Quantity Received</label>
                <input
                  type="number"
                  name="quantityRecieved"
                  value={formData.quantityRecieved}
                  onChange={handleInputChange}
                  placeholder="Enter Quantity Received"
                />
              </div>
              <div className="addGoodsReceiptTracking-form-group">
                <label>Unit Price</label>
                <input
                  type="text"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  readOnly
                  placeholder="Enter Unit Price"
                />
              </div>
            </div>

            <div className="addGoodsReceiptTracking-form-group-1row">
              <div className="addGoodsReceiptTracking-form-group">
                <label>Total Amount</label>
                <input
                  type="text"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  placeholder="Enter Total Amount"
                />
              </div>
              <div className="addGoodsReceiptTracking-form-group">
                <label>Goods Inspection Status</label>
                <input
                  type="text"
                  name="goodsInspectionStatus"
                  value={formData.goodsInspectionStatus}
                  onChange={handleInputChange}
                  placeholder="Enter Goods Inspection Status"
                />
              </div>
            </div>

            <div className="addGoodsReceiptTracking-form-group-1row">
              <div className="addGoodsReceiptTracking-form-group">
                <label>Delivery Status</label>
                <input
                  type="text"
                  name="deliveryStatus"
                  value={formData.deliveryStatus}
                  onChange={handleInputChange}
                  placeholder="Enter Delivery Status"
                />
              </div>
              <div className="addGoodsReceiptTracking-form-group">
                <label>Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter Remarks"
                />
              </div>
            </div>


          </div>
        </div>

        <div className="addGoodsReceiptTracking-form-actions">
          <button className="addGoodsReceiptTracking-add-btn" type='submit'>
            {selectedData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoodsReceiptTracking;
