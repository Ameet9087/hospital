import React, { useEffect, useState } from 'react';
import './AddGRItemForm.css';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';

const AddGRItemForm = ({ onClose,onSubmit }) => {
  const [genericNames, setGenericNames] = useState([]);
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    genericNameId: '',
    addItemId: '',
    batchNo: '',
    rackNo: '',
    expDate: '',
    itemQty: '',
    freeQty: '',
    totalQty: '',
    rate: '',
    marginPercentage: '',
    salePrice: '',
    mrp: '',
    ccChargePercentage: '',
    ccAmount: '',
    subTotal: '',
    discountPercentage: '',
    discountAmount: '',
    vatPercentage: '',
    vatAmount: '',
    totalAmount: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, genericNamesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/add-items`),
          axios.get(`${API_BASE_URL}/generic-names`), // Fetch generic names
        ]);

        setItems(itemsResponse.data);
        setGenericNames(genericNamesResponse.data);
      } catch (error) {
        alert('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };

      // Calculate fields after any relevant changes
      if (name === 'itemQty' || name === 'freeQty') {
        // Auto calculate total quantity
        newFormData.totalQty = parseFloat(newFormData.itemQty) + parseFloat(newFormData.freeQty);
      }
      if (name === 'rate' || name === 'itemQty' || name === 'freeQty' || name === 'marginPercentage') {
        // Auto calculate sale price and subtotal
        newFormData.salePrice = newFormData.rate * (1 + (parseFloat(newFormData.marginPercentage || 0) / 100));
        newFormData.subTotal = newFormData.salePrice * parseFloat(newFormData.totalQty || 0);
      }
      if (name === 'ccChargePercentage') {
        // Auto calculate cc amount
        newFormData.ccAmount = newFormData.subTotal * (parseFloat(newFormData.ccChargePercentage || 0) / 100);
      }
      if (name === 'discountPercentage') {
        // Auto calculate discount amount
        newFormData.discountAmount = newFormData.subTotal * (parseFloat(newFormData.discountPercentage || 0) / 100);
        newFormData.totalAmount = newFormData.subTotal - newFormData.discountAmount + (parseFloat(newFormData.ccAmount || 0) || 0);
      }
      if (name === 'vatPercentage') {
        // Auto calculate VAT amount
        newFormData.vatAmount = newFormData.totalAmount * (parseFloat(newFormData.vatPercentage || 0) / 100);
        newFormData.totalAmount += newFormData.vatAmount;
      }

      // Recalculate the total amount by including CC amount and VAT
      if (!newFormData.totalAmount) {
        newFormData.totalAmount = newFormData.subTotal + (newFormData.ccAmount || 0) - (newFormData.discountAmount || 0) + (newFormData.vatAmount || 0);
      }

      return newFormData;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9999/api/gr-items', formData);
      onSubmit(response.data);
      console.log('Data saved successfully:', response.data);
      onClose(); // Close the form after successful submission
      
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="add-gr-item-modal-form-com">
      <div className="add-gr-item-modal-content">
        <button className="add-gr-item-close-btn" onClick={onClose}>×</button>
        <h5>Add GR Item</h5>
        <form onSubmit={handleSubmit}>
          {/* Generic Name */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Generic Name:</label>
              <select
                name="genericNameId"
                value={formData.genericNameId || ''}
                onChange={handleChange}
                required
              >
                <option value="">Select Generic Name</option>
                {genericNames.map((genericName) => (
                  <option key={genericName.genericNameId} value={genericName.genericNameId}>
                    {genericName.genericName}
                  </option>
                ))}
              </select>
            </div>

            {/* Item Name */}
            <div className="add-gritem-form-field">
              <label>Item Name*:</label>
              <select
                name="addItemId"
                value={formData.addItemId || ''}
                onChange={handleChange}
                required
              >
                <option>Select an Item</option>
                {items.map((item) => (
                  <option key={item.addItemId} value={item.addItemId}>
                    {item.itemName}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch No */}
            <div className="add-gritem-form-field">
              <label>Batch No:</label>
              <input
                type="text"
                name="batchNo"
                placeholder="Enter Batch No"
                value={formData.batchNo}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Rack No, Exp. Date, Qty, Free Qty */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Rack No:</label>
              <input
                type="text"
                name="rackNo"
                placeholder="Enter Rack No"
                value={formData.rackNo}
                onChange={handleChange}
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Exp. Date:</label>
              <input
                type="date"
                name="expDate"
                value={formData.expDate}
                onChange={handleChange}
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Item Qty*:</label>
              <input
                type="number"
                name="itemQty"
                placeholder="Enter Item Quantity"
                value={formData.itemQty}
                onChange={handleChange}
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Free Qty:</label>
              <input
                type="number"
                name="freeQty"
                placeholder="Enter Free Quantity"
                value={formData.freeQty}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Other fields for Rate, Margin %, MRP, Sale Price, etc. */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Total Qty:</label>
              <input
                type="number"
                name="totalQty"
                placeholder="Total Quantity"
                value={formData.totalQty}
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Rate*:</label>
              <input
                type="number"
                name="rate"
                placeholder="Enter Rate"
                value={formData.rate}
                onChange={handleChange}
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Margin%:</label>
              <input
                type="number"
                name="marginPercentage"
                placeholder="Enter Margin Percentage"
                value={formData.marginPercentage}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Additional fields */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Sale Price:</label>
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                disabled
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Sub-Total:</label>
              <input
                type="number"
                name="subTotal"
                value={formData.subTotal}
                disabled
              />
            </div>

            <div className="add-gritem-form-field">
              <label>CC Charge%:</label>
              <input
                type="number"
                name="ccChargePercentage"
                placeholder="Enter CC Charge Percentage"
                value={formData.ccChargePercentage}
                onChange={handleChange}
              />
            </div>

            <div className="add-gritem-form-field">
              <label>CC Amount:</label>
              <input
                type="number"
                name="ccAmount"
                value={formData.ccAmount}
                disabled
              />
            </div>
          </div>

          {/* Discount & VAT */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Discount%:</label>
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Discount Amount:</label>
              <input
                type="number"
                name="discountAmount"
                value={formData.discountAmount}
                disabled
              />
            </div>

            <div className="add-gritem-form-field">
              <label>VAT%:</label>
              <input
                type="number"
                name="vatPercentage"
                value={formData.vatPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="add-gritem-form-field">
              <label>VAT Amount:</label>
              <input
                type="number"
                name="vatAmount"
                value={formData.vatAmount}
                disabled
              />
            </div>

            <div className="add-gritem-form-field">
              <label>Total Amount:</label>
              <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                disabled
              />
            </div>
          </div>

          <div className="add-gritem-form-actions">
            <button type="submit" className="add-gritem-submit-btn">Add Item</button>
            <button type="button" className="add-gritem-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGRItemForm;
