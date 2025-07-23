// Prachi Parab vendorSupplymgmt 27-7-2024 backend+frontend merging 
import React, { useState } from 'react';
import './InvoiceForm.css';

const PurchaseOrderAcknowledgmentFormCom = () => {
  const [formData, setFormData] = useState({
    poNumber: 'PO12345',
    vendorId: 'V001',
    acknowledgmentDate: '2024-09-01',
    vendorRepName: 'John Doe',
    deliveryDate: '2024-09-15',
    itemsInvoiced: [
      {
        itemCode: 'ITEM001',
        itemDescription: 'Product A',
        quantityInvoiced: 5,
        unitPrice: 50.0,
      },
      {
        itemCode: 'ITEM002',
        itemDescription: 'Product B',
        quantityInvoiced: 3,
        unitPrice: 30.0,
      },
    ],
  });

  // Remove item handler
  const handleRemoveItem = (index) => {
    const newItems = formData.itemsInvoiced.filter((_, i) => i !== index);
    setFormData({ ...formData, itemsInvoiced: newItems });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemInvoicedChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.itemsInvoiced];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setFormData({ ...formData, itemsInvoiced: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      itemsInvoiced: [
        ...formData.itemsInvoiced,
        {
          itemCode: '',
          itemDescription: '',
          quantityInvoiced: 0,
          unitPrice: 0,
        },
      ],
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Invoice Form Data:', formData);
  };

  // Automatically calculate total payable amount (Optional)
  const calculateTotalPayableAmount = () => {
    return formData.itemsInvoiced.reduce(
      (acc, item) => acc + item.quantityInvoiced * item.unitPrice,
      0
    ).toFixed(2);
  };

  return (
    <form className="super-user-invoice-form" onSubmit={handleSubmit}>
      <div className="super-user-invoice-flex">
        {/* First Half */}
        <div className="super-user-invoice-left">
          <div className="super-user-invoice-group">
            <label>
              PO Number <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              name="poNumber"
              value={formData.poNumber}
              onChange={handleInputChange}
              placeholder="PO Number"
              required
            />
          </div>
          <div className="super-user-invoice-group">
            <label>
              Vendor ID <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleInputChange}
              placeholder="Vendor ID"
              required
            />
          </div>
          <div className="super-user-invoice-group">
            <label>
              Acknowledgment Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              name="acknowledgmentDate"
              value={formData.acknowledgmentDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="super-user-invoice-group">
            <label>Vendor Representative Name</label>
            <input
              type="text"
              name="vendorRepName"
              value={formData.vendorRepName}
              onChange={handleInputChange}
              placeholder="Vendor Representative Name"
            />
          </div>
        </div>

        {/* Second Half */}
        <div className="super-user-invoice-right">
          <div className="super-user-invoice-group">
            <label>
              Delivery Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="super-user-invoice-group">
            <label>Total Payable Amount</label>
            <input
              type="number"
              name="totalPayableAmount"
              value={calculateTotalPayableAmount()}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="invoice-form-super-user-items-invoiced">
        <h3>Items Purchase Order Details</h3>
        <table border="1" className="invoice-table">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Item Description</th>
            <th>Quantity Invoiced</th>
            <th>Unit Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.itemsInvoiced.map((item, index) => (
            <tr key={index}>
              <td>{item.itemCode}</td>
              <td>{item.itemDescription}</td>
              <td>{item.quantityInvoiced}</td>
              <td>{item.unitPrice}</td>
              <td>
                <button
                  className="super-user-invoice-submit-btn"
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {/* <button
          className="super-user-invoice-submit-btn"
          type="button"
          onClick={handleAddItem}
        >
          Add Item
        </button> */}
      </div>

      {/* Submit Button */}
      <div className="super-user-invoice-button">
        <button type="submit" className="super-user-invoice-submit-btn">
          Submit Acknowledgment
        </button>
      </div>
    </form>
  );
};

export default PurchaseOrderAcknowledgmentFormCom;
