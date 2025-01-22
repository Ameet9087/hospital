import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestForQuotation.css";
import { API_BASE_URL } from "../../api/api";

function RequestForQuotation({onClose}) {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    requestDate: "",
    requestCloseDate: "",
    vendorId: "",
    items: [
      {
        itemId: "",
        quantity: 0,
        pricePerUnit: 0.0,
        description: ""
      }
    ]
  });

  const [vendors, setVendors] = useState([]); // State to store vendor data
  const [items, setItems] = useState([]); // State to store item data

  // Fetch vendors and items on component mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/vendors/getAllVendors`)
      .then((response) => setVendors(response.data))
      .catch((error) => console.error("Error fetching vendors:", error));

    axios
      .get(`${API_BASE_URL}/items/getAllItem`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  // Handle input changes
  const handleChange = (e, index = null) => {
    const { name, value, dataset } = e.target;
  
    if (name === "items") {
      const updatedItems = [...formData.items];
      updatedItems[index][dataset.name] = value;
      setFormData({ ...formData, items: updatedItems });
    } else if (index !== null) {
      // For items, when index is provided
      const updatedItems = [...formData.items];
      updatedItems[index][dataset.name] = value;
      setFormData({ ...formData, items: updatedItems });
    } else {
      // For other fields
      setFormData({ ...formData, [name]: value });
    }
  };
  

  // Add new item to the list
  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          itemId: "",
          quantity: 0,
          pricePerUnit: 0.0,
          description: ""
        }
      ]
    }));
  };

  // Remove item from the list
  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      const response = await axios.post(`${API_BASE_URL}/rfq/create`, formData);
      console.log("RFQ Created:", response.data);
      onClose();
    } catch (error) {
      console.error("Error submitting RFQ:", error);
    }
  };

  return (
    <div className="RequestforQuotation-container">
      <h1>Request For Quotation</h1>
      <form onSubmit={handleSubmit}>
        <div className="RequestforQuotation-form-row">
          <div className="RequestforQuotation-form-group">
            <label htmlFor="subject">Subject * :</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              placeholder="Subject"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="RequestforQuotation-form-group">
            <label htmlFor="vendor">Select Vendor * :</label>
            <select
              id="vendor"
              name="vendorId"
              value={formData.vendorId}
              required
              onChange={(e) => handleChange(e)}
            >
              <option value="">---Select Vendor---</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.vendorName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="RequestforQuotation-form-row">
          <div className="RequestforQuotation-form-group">
            <label htmlFor="requestDate">Request Date *</label>
            <input
              type="date"
              id="requestDate"
              name="requestDate"
              value={formData.requestDate}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="RequestforQuotation-form-group">
            <label htmlFor="closeDate">Request Close Date *</label>
            <input
              type="date"
              id="closeDate"
              name="requestCloseDate"
              value={formData.requestCloseDate}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        
        <table className="RequestforQuotation-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.items.map((item, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={item.itemId}
                    data-name="itemId"
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">---Select Item---</option>
                    {items.map((itemOption) => (
                      <option key={itemOption.id} value={itemOption.invItemId}>
                        {itemOption.itemName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    data-name="quantity"
                    onChange={(e) => handleChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.pricePerUnit}
                    data-name="pricePerUnit"
                    onChange={(e) => handleChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.description}
                    data-name="description"
                    onChange={(e) => handleChange(e, index)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="RequestforQuotation-btn-remove"
                    onClick={() => handleRemoveItem(index)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="RequestforQuotation-btn-add"
                    onClick={handleAddItem}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="RequestforQuotation-form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              placeholder="Description"
              required
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
        <div className="RequestforQuotation-form-actions">
          <button type="submit" className="RequestforQuotation-btn-request">
            Request
          </button>
          <button type="button" className="RequestforQuotation-btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default RequestForQuotation;
