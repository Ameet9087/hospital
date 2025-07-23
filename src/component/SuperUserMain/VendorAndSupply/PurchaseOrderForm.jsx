// Prachi Parab vendorSupplymgmt 27-7-2024 backend+frontend merging 
import React, { useState,useEffect } from 'react';
import './InvoiceForm.css';
import axios from 'axios';

const PurchaseOrderFormCom = () => {
  const [formData, setFormData] = useState({
    poNumber: '',
    hospitalId: '',
    vendorId: '',
    orderDate: '',
    requiredDeliveryDate: '',
    requestingDepartment: '',
    itemsOrdered: [
      {
        itemCode: '',
        itemDescription: '',
        quantityOrdered: 0,
        unitPrice: 0,
        totalPrice: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/purchase-orders/getOrder');
        const data = response.data;

        if (data) {
          // Assuming data structure matches formData structure
          setFormData({
            ...formData,
            poNumber: data.poNumber,
            hospitalId: data.hospitalId,
            vendorId: data.vendorId,
            orderDate: data.orderDate,
            requiredDeliveryDate: data.requiredDeliveryDate,
            requestingDepartment: data.requestingDepartment,
            // Initialize itemsOrdered with fetched data if applicable
            itemsOrdered: data.itemsOrdered || formData.itemsOrdered,
          });
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemOrderedChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.itemsOrdered];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setFormData({ ...formData, itemsOrdered: updatedItems });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      itemsOrdered: [
        ...formData.itemsOrdered,
        {
          itemCode: '',
          itemDescription: '',
          quantityOrdered: 0,
          unitPrice: 0,
          totalPrice: 0,
        },
      ],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = formData.itemsOrdered.filter((_, i) => i !== index);
    setFormData({ ...formData, itemsOrdered: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/purchase-orders/AddOrder', formData);
      console.log('Purchase Order Submitted:', response.data);
      alert('Purchase Order Submitted Successfully', response.data);
      // Optionally reset the form or show success message
    } catch (error) {
      console.error('Error submitting purchase order:', error);
    }
  };

  // Automatically calculate total payable amount (Optional)
  const calculateTotalPayableAmount = () => {
    return formData.itemsOrdered
      .reduce((acc, item) => acc + item.quantityOrdered * item.unitPrice, 0)
      .toFixed(2);
  };


 
  return (
    <form className="super-user-invoice-form" onSubmit={handleSubmit}>
      <h4>Item List Added by Vendor</h4>
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
              Hospital ID <span className="mandatory">*</span>
            </label>
            <input
              type="text"
              name="hospitalId"
              value={formData.hospitalId}
              onChange={handleInputChange}
              placeholder="Hospital ID"
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
              Order Date <span className="mandatory">*</span>
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

        {/* Second Half */}
        <div className="super-user-invoice-right">
          <div className="super-user-invoice-group">
            <label>
              Required Delivery Date <span className="mandatory">*</span>
            </label>
            <input
              type="date"
              name="requiredDeliveryDate"
              value={formData.requiredDeliveryDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="super-user-invoice-group">
            <label>Requesting Department</label>
            <input
              type="text"
              name="requestingDepartment"
              value={formData.requestingDepartment}
              onChange={handleInputChange}
              placeholder="Requesting Department"
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
      <div className="invoice-form-super-user-items-ordered">
        <h3>Items Ordered</h3>
        {formData.itemsOrdered.map((item, index) => (
          <div key={index} className="invoice-form-super-user-invoice-item">
            <div className="invoice-form-super-user-invoice-group">
              <label>Item Code</label>
              <input
                type="text"
                name="itemCode"
                value={item.itemCode}
                onChange={(e) => handleItemOrderedChange(index, e)}
                placeholder="Item Code"
              />
            </div>
            <div className="invoice-form-super-user-invoice-group">
              <label>Item Description</label>
              <input
                type="text"
                name="itemDescription"
                value={item.itemDescription}
                onChange={(e) => handleItemOrderedChange(index, e)}
                placeholder="Item Description"
              />
            </div>
            <div className="invoice-form-super-user-invoice-group">
              <label>Quantity Ordered</label>
              <input
                type="number"
                name="quantityOrdered"
                value={item.quantityOrdered}
                onChange={(e) => handleItemOrderedChange(index, e)}
                placeholder="Quantity"
              />
            </div>
            <div className="invoice-form-super-user-invoice-group">
              <label>Unit Price</label>
              <input
                type="number"
                name="unitPrice"
                value={item.unitPrice}
                onChange={(e) => handleItemOrderedChange(index, e)}
                placeholder="Unit Price"
              />
            </div>
            <div className="invoice-form-super-user-invoice-group">
              <label>Total Price</label>
              <input
                type="number"
                name="totalPrice"
                value={item.quantityOrdered * item.unitPrice}
                readOnly
              />
            </div>
            <div>
              <button
                className="super-user-invoice-submit-btn"
                type="button"
                onClick={() => handleRemoveItem(index)}
              >
                Remove Item
              </button>
            </div>
          </div>
        ))}
        <button
          className="super-user-invoice-submit-btn"
          type="button"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>

      {/* Submit Button */}
      <div className="super-user-invoice-button">
        <button type="submit" className="super-user-invoice-submit-btn">
          Send Purchase Order
        </button>
      </div>


      

    </form>

    
  );
};

export default PurchaseOrderFormCom;
