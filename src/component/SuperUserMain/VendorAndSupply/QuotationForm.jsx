
// Prachi Parab vendorSupplymgmt 27-7-2024 backend+frontend merging 

import React, { useState,useEffect } from 'react';
import './InvoiceForm.css';
import axios from 'axios';

const SupplyDeliveryFormCom = () => {
  const [formData, setFormData] = useState({
    poNumber: '',
    vendorId: '',
    orderDate: '',
    vendorRepName: '',
    deliveryDate: '',
    itemsInvoiced: [],
  });
  const [totalPayableAmount, setTotalPayableAmount] = useState(0);
  
  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/purchase-orders/1');
        const purchaseOrder = response.data;

        setFormData({
          poNumber: purchaseOrder.poNumber,
          vendorId: purchaseOrder.vendorId,
          orderDate: '', // Set your default or fetched date
          vendorRepName: '', // Set your default or fetched vendor rep name
          deliveryDate: '', // Set your default or fetched delivery date
          itemsInvoiced: purchaseOrder.items.map(item => ({
            itemCode: item.itemCode,
            itemName:item.itemName,
            itemDescription: item.itemDescription,
            quantityOrdered: item.quantityOrdered, // Initialize quantity invoiced
            unitPrice: item.unitPrice,
            totalPrice:item.totalPrice
          })),
        });
        calculateTotalPayableAmount(items);
      } catch (error) {
        console.error('Error fetching purchase order:', error);
      }
    };

    fetchPurchaseOrder();
  }, []);


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
          itemName:'',
          itemDescription: '',
          quantityOrdered: 0,
          unitPrice: 0,
          totalPrice:0
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
      (acc, item) => acc + item.quantityOrdered * item.unitPrice,
      0
    );
    setTotalPayableAmount(total.toFixed(2));
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
            <label>
              Acknowledgment Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleInputChange}
              required
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
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Quantity Ordered</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData.itemsInvoiced.map((item, index) => (
            <tr key={index}>
              <td>{item.itemCode}</td>
              <td>{item.itemName}</td>
              <td>{item.itemDescription}</td>
              <td>{item.quantityOrdered}</td>
              <td>{item.unitPrice}</td>
              <td>{item.totalPrice}</td>
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
      <br></br>
      <div className="super-user-invoice-group"></div>
      <div className="super-user-invoice-group" style={{ width: '20%' }}>
            <label>Total Payable Amount</label>
            <input
              type="number"
              name="totalPayableAmount"
              value={calculateTotalPayableAmount()}
              readOnly

            />
          </div>
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
          Send Back To Hospital
        </button>
      </div>
    </form>
  );
};

export default SupplyDeliveryFormCom;
