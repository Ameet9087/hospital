/* Mohini_AddGRItemForm_WholePage_14/sep/2024 */
import React, { useEffect, useState } from 'react';
import './AddGRItemForm.css';
import axios from 'axios';
import { API_BASE_URL } from '../api/api';

const AddGRItemForm = ({ onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [genericNames, setGenericNames] = useState([]);
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    genericNameId: '',
    addItemId: '',
    batchNo: '',
    rackNo: '',
    expDate: '',
    itemQty: "",
    totalQty: "",
    rate: '',
    marginPercentage: 0.0,
    mrp: '',
    ccChargePercentage: '',
    ccAmount: "",
    subTotal: '',
    discountPercentage: '',
    discountAmount: '',
    vatPercentage: '',
    vatAmount: '',
    totalAmount:'',
  });

   useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse,genericNamesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/add-items`),
          axios.get(`${API_BASE_URL}/generic-names`), // Fetch generic names
        ]);

        console.log('Items Response:', itemsResponse.data);
        console.log('Generic Names Response:', genericNamesResponse.data);

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
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9999/api/gr-items', formData);
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
          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
  <label>Generic Name:</label>
  <select
    name="genericNameId"
    value={formData.genericNameId || ''}
    onChange={(e) => handleChange(e)} // Correct function reference
    required
  >
    <option value="">Select Generic Name</option>
    {genericNames.map((genericName) => (
  <option key={genericName.genericNameId} value={genericName.genericNameId}>
    {genericName.genericName}
  </option>
))}
  </select>
  <span className="add-supplier-help-icon">?</span>
</div>
            <div className="add-gritem-form-field">
              <label>Item Name*:</label>
              <select
               name="addItemId"
    value={formData.addItemId || ''}
    onChange={(e) => handleChange(e)} // Correct function reference
    required
              >
                <option>Select an Item</option>
                {items.map((item) => (
  <option key={item.addItemId} value={item.addItemId}>
    {item.itemName}
  </option>))}
              </select>
              <span className="add-supplier-help-icon">?</span>

            </div>
            <div className="add-gritem-form-field">
              <label>Batch No:</label>
              <input type="text" placeholder="Enter Batch No" />
            </div>
          </div>

          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Rack No:</label>
              <input type="text" placeholder="Enter Rack No" />
            </div>
            <div className="add-gritem-form-field">
              <label>Exp. Date:</label>
              <input type="date" />
            </div>
            <div className="add-gritem-form-field">
              <label>Item Qty*:</label>
              <input type="number" placeholder="Enter Item Quantity" />
            </div>
          </div>

          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Total Qty:</label>
              <input type="number" placeholder="Enter Total Quantity" />
            </div>
            <div className="add-gritem-form-field">
              <label>Rate*:</label>
              <input type="number" placeholder="Enter Rate" />
            </div>
            <div className="add-gritem-form-field">
              <label>Margin%:</label>
              <input type="number" placeholder="Enter Margin Percentage" />
            </div>
          </div>

          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>MRP:</label>
              <input type="number" placeholder="Enter MRP" />
            </div>
            <div className="add-gritem-form-field">
              <label>CC Charge%:</label>
              <input type="number" placeholder="Enter CC Charge Percentage" />
            </div>
            <div className="add-gritem-form-field">
              <label>CC Amount:</label>
              <input type="number" placeholder="Enter CC Amount" />
            </div>
          </div>

          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>Sub-Total:</label>
              <input type="number" placeholder="Enter Sub-Total" />
            </div>
            <div className="add-gritem-form-field">
              <label>Discount%:</label>
              <input type="number" placeholder="Enter Discount Percentage" />
            </div>
            <div className="add-gritem-form-field">
              <label>Discount Amount:</label>
              <input type="number" placeholder="Enter Discount Amount" />
            </div>
          </div>

          <div className="add-gritem-form-row">
            <div className="add-gritem-form-field">
              <label>VAT%:</label>
              <input type="number" placeholder="Enter VAT Percentage" />
            </div>
            <div className="add-gritem-form-field">
              <label>VAT Amount:</label>
              <input type="number" placeholder="Enter VAT Amount" />
            </div>
            <div className="add-gritem-form-field">
              <label>Total Amount:</label>
              <input type="number" placeholder="Enter Total Amount" />
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
/* Mohini_AddGRItemForm_WholePage_14/sep/2024 */
