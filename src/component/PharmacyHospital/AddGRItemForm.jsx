import React, { useEffect, useState } from 'react';
import './AddGRItemForm.css';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';

const AddGRItemForm = ({ onClose, onSubmit }) => {
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
          axios.get(`${API_BASE_URL}/generic-names`),
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

      // Recalculate dependent fields
      if (name === 'itemQty' || name === 'freeQty') {
        newFormData.totalQty = parseFloat(newFormData.itemQty || 0) + parseFloat(newFormData.freeQty || 0);
      }
      if (name === 'rate' || name === 'marginPercentage' || name === 'totalQty') {
        newFormData.salePrice = parseFloat(newFormData.rate || 0) * (1 + parseFloat(newFormData.marginPercentage || 0) / 100);
        newFormData.subTotal = parseFloat(newFormData.salePrice || 0) * parseFloat(newFormData.totalQty || 0);
      }
      if (name === 'ccChargePercentage') {
        newFormData.ccAmount = parseFloat(newFormData.subTotal || 0) * (parseFloat(newFormData.ccChargePercentage || 0) / 100);
      }
      if (name === 'discountPercentage') {
        newFormData.discountAmount = parseFloat(newFormData.subTotal || 0) * (parseFloat(newFormData.discountPercentage || 0) / 100);
      }
      if (name === 'vatPercentage') {
        newFormData.vatAmount = (parseFloat(newFormData.subTotal || 0) - parseFloat(newFormData.discountAmount || 0)) * (parseFloat(newFormData.vatPercentage || 0) / 100);
      }

      // Calculate total amount
      newFormData.totalAmount =
        parseFloat(newFormData.subTotal || 0) -
        parseFloat(newFormData.discountAmount || 0) +
        parseFloat(newFormData.ccAmount || 0) +
        parseFloat(newFormData.vatAmount || 0);

      return newFormData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // Send form data to parent
    onClose(); // Close the form
  };

  return (
    <div className="add-gr-item-modal-form-com">
      <div className="add-gr-item-modal-content">
        <button className="add-gr-item-close-btn" onClick={onClose}>
          ×
        </button>
        <h5>Add GR Item</h5>
        <form onSubmit={handleSubmit}>
          {/* Generic Name and Item Name */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Generic Name:</label>
              <select name="genericNameId" value={formData.genericNameId} onChange={handleChange} required>
                <option value="">Select Generic Name</option>
                {genericNames.map((genericName) => (
                  <option key={genericName.genericNameId} value={genericName.genericNameId}>
                    {genericName.genericName}
                  </option>
                ))}
              </select>
            </div>

            <div className="add-gritem-form-field">
              <label>Item Name*:</label>
              <select name="addItemId" value={formData.addItemId} onChange={handleChange} required>
                <option value="">Select Item</option>
                {items.map((item) => (
                  <option key={item.addItemId} value={item.addItemId}>
                    {item.itemName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Batch No, Rack No, and Expiry Date */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Batch No:</label>
              <input type="text" name="batchNo" value={formData.batchNo} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>Rack No:</label>
              <input type="text" name="rackNo" value={formData.rackNo} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>Exp. Date:</label>
              <input type="date" name="expDate" value={formData.expDate} onChange={handleChange} />
            </div>
          </div>

          {/* Quantities, Rate, and Margin */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Item Qty*:</label>
              <input type="number" name="itemQty" value={formData.itemQty} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>Free Qty:</label>
              <input type="number" name="freeQty" value={formData.freeQty} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>Total Qty:</label>
              <input type="number" name="totalQty" value={formData.totalQty} readOnly />
            </div>
            <div className="add-gritem-form-field">
              <label>Rate*:</label>
              <input type="number" name="rate" value={formData.rate} onChange={handleChange} />
            </div>
          </div>

          {/* Financial Fields */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Margin%:</label>
              <input type="number" name="marginPercentage" value={formData.marginPercentage} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>Sale Price:</label>
              <input type="number" name="salePrice" value={formData.salePrice} readOnly />
            </div>
            <div className="add-gritem-form-field">
              <label>Sub-Total:</label>
              <input type="number" name="subTotal" value={formData.subTotal} readOnly />
            </div>
          </div>

          {/* CC Charge, Discount, and VAT */}
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>CC Charge%:</label>
              <input type="number" name="ccChargePercentage" value={formData.ccChargePercentage} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>CC Amount:</label>
              <input type="number" name="ccAmount" value={formData.ccAmount} readOnly />
            </div>
            <div className="add-gritem-form-field">
              <label>Discount%:</label>
              <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>Discount Amount:</label>
              <input type="number" name="discountAmount" value={formData.discountAmount} readOnly />
            </div>
          </div>

          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>VAT%:</label>
              <input type="number" name="vatPercentage" value={formData.vatPercentage} onChange={handleChange} />
            </div>
            <div className="add-gritem-form-field">
              <label>VAT Amount:</label>
              <input type="number" name="vatAmount" value={formData.vatAmount} readOnly />
            </div>
            <div className="add-gritem-form-field">
              <label>Total Amount:</label>
              <input type="number" name="totalAmount" value={formData.totalAmount} readOnly />
            </div>
          </div>

          {/* Actions */}
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
