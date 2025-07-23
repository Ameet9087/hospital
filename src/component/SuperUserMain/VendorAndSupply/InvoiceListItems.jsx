// Prachi Parab vendorSupplymgmt 27-7-2024 backend+frontend merging 
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import './InvoiceForm.css';

const PrintReport = () => {
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
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            quantityOrdered: item.quantityOrdered, 
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        });
        calculateTotalPayableAmount(purchaseOrder.items);
      } catch (error) {
        console.error('Error fetching purchase order:', error);
      }
    };

    fetchPurchaseOrder();
  }, []);

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
          itemName: '',
          itemDescription: '',
          quantityOrdered: 0,
          unitPrice: 0,
          totalPrice: 0,
        },
      ],
    });
  };

  const calculateTotalPayableAmount = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.quantityOrdered * item.unitPrice,
      0
    );
    setTotalPayableAmount(total.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Invoice Form Data:', formData);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Purchase Order Details Report', 14, 22);

    // Add purchase order details
    doc.setFontSize(12);
    doc.text(`PO Number: ${formData.poNumber}`, 14, 30);
    doc.text(`Vendor ID: ${formData.vendorId}`, 14, 36);
    doc.text(`Vendor Rep Name: ${formData.vendorRepName}`, 14, 42);
    doc.text(`Order Date: ${formData.orderDate}`, 14, 48);
    doc.text(`Delivery Date: ${formData.deliveryDate}`, 14, 54);

    // Add table headers
    doc.autoTable({
      startY: 60,
      head: [['Item Code', 'Item Name', 'Description', 'Quantity Ordered', 'Unit Price', 'Total Price']],
      body: formData.itemsInvoiced.map(item => [
        item.itemCode,
        item.itemName,
        item.itemDescription,
        item.quantityOrdered,
        item.unitPrice,
        item.totalPrice,
      ]),
    });

    // Save the generated PDF
    doc.save('purchase-order-report.pdf');
  };

  return (
    <form className="super-user-invoice-form" onSubmit={handleSubmit}>
      <div className="super-user-invoice-flex">
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
              {/* <th>Action</th> */}
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
                {/* <td>
                  <button
                    className="super-user-invoice-submit-btn"
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove Item
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="super-user-invoice-group" style={{ width: '20%' }}>
          <label>Total Payable Amount</label>
          <input
            type="number"
            name="totalPayableAmount"
            value={totalPayableAmount}
            readOnly
          />
        </div>
      </div>

      <div className="super-user-invoice-button">
        <button type="submit" className="super-user-invoice-submit-btn">
          Send Back To Hospital
        </button>
        <button type="button" className="super-user-invoice-submit-btn" onClick={generatePDF}>
          Generate PDF Report
        </button>
      </div>
    </form>
  );
};

export default PrintReport;
