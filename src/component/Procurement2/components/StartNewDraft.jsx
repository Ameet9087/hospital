import React, { useState } from "react";
import "./AddPurchaseOrderDraft.css";

const AddPurchaseOrderDraft = () => {
  const [formData, setFormData] = useState({
    vendor: "SHIKAMED CHEMIST",
    poDate: "25-08-2024",
    deliveryDate: "01-09-2024",
    currencyCode: "INR",
    vendorContactNo: "1001",
    vendorAddress: "kenya",
    referenceNo: "",
    invoicingAddress: "",
    deliveryAddress: "",
    contactPerson: "",
    contactEmail: "",
    items: [
      {
        category: "Consumables",
        itemName: "catheter",
        vendorItemCode: "",
        mssNo: "",
        hsnCode: "",
        itemCode: "0007001",
        unit: "Piece",
        requestedQuantity: "10",
        pendingQty: "10",
        quantity: "",
        orderedQty: "",
        standardRate: "0",
        vat: "0",
        totalAmount: "0",
        remarks: "",
      },
    ],
    needVerification: false,
    termsAndConditions: "",
    paymentMode: "Credit",
    remarks: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  const addNewRow = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          category: "",
          itemName: "",
          vendorItemCode: "",
          mssNo: "",
          hsnCode: "",
          itemCode: "",
          unit: "",
          requestedQuantity: "",
          pendingQty: "",
          quantity: "",
          orderedQty: "",
          standardRate: "",
          vat: "",
          totalAmount: "",
          remarks: "",
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <div className="AddPurchaseOrderDraft-add-purchase-order">
      <h2>Add Purchase Order</h2>
      <div className="AddPurchaseOrderDraft-form-row">
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Vendor*:</label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>PO Date:</label>
          <input
            type="date"
            name="poDate"
            value={formData.poDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Delivery Date:</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Currency Code*:</label>
          <input
            type="text"
            name="currencyCode"
            value={formData.currencyCode}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="AddPurchaseOrderDraft-form-row">
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Vendor Contact No:</label>
          <input
            type="text"
            name="vendorContactNo"
            value={formData.vendorContactNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Vendor Address:</label>
          <input
            type="text"
            name="vendorAddress"
            value={formData.vendorAddress}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="AddPurchaseOrderDraft-form-row">
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Reference No:</label>
          <input
            type="text"
            name="referenceNo"
            value={formData.referenceNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Invoicing Address:</label>
          <input
            type="text"
            name="invoicingAddress"
            value={formData.invoicingAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Delivery Address:</label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Contact Person:</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
          />
        </div>
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Contact Email:</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <table className="AddPurchaseOrderDraft-items-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th>Vendor's Item Code</th>
            <th>MSS No.</th>
            <th>HSN Code</th>
            <th>Item Code</th>
            <th>Unit</th>
            <th>Requested Quantity</th>
            <th>Pending Qty</th>
            <th>Quantity</th>
            <th>Ordered Qty</th>
            <th>Standard Rate</th>
            <th>VAT %</th>
            <th>Total Amount</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.items.map((item, index) => (
            <tr key={index}>
              <td>
                <select
                  value={item.category}
                  onChange={(e) =>
                    handleItemChange(index, "category", e.target.value)
                  }
                >
                  <option value="Consumables">Consumables</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) =>
                    handleItemChange(index, "itemName", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="AddPurchaseOrderDraft-remove-button"
                  onClick={() => removeRow(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="AddPurchaseOrderDraft-add-row-button"
        onClick={addNewRow}
      >
        + Add New Row
      </button>

      <div className="AddPurchaseOrderDraft-form-row">
        <div className="AddPurchaseOrderDraft-form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.needVerification}
              onChange={(e) =>
                setFormData({ ...formData, needVerification: e.target.checked })
              }
            />
            Need Verification
          </label>
        </div>
      </div>

      <div className="AddPurchaseOrderDraft-form-row">
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Select Terms & Conditions:</label>
          <textarea
            name="termsAndConditions"
            value={formData.termsAndConditions}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="AddPurchaseOrderDraft-form-row">
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Payment Mode*:</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleInputChange}
          >
            <option value="Credit">Credit</option>
          </select>
        </div>
      </div>

      <div className="AddPurchaseOrderDraft-form-row">
        <div className="AddPurchaseOrderDraft-form-group">
          <label>Remarks:</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="AddPurchaseOrderDraft-form-actions">
        <button className="AddPurchaseOrderDraft-save-button">
          ADD Purchase Order
        </button>
        <button className="AddPurchaseOrderDraft-discard-button">
          Discard Changes
        </button>
      </div>
    </div>
  );
};

export default AddPurchaseOrderDraft;
