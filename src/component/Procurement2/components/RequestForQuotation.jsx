import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestForQuotation.css";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput, FloatingSelect,FloatingTextarea } from "../../../FloatingInputs";
import { toast } from "react-toastify";
function RequestForQuotation({ onClose }) {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    requestDate: "",
    requestCloseDate: "",
    vendorId: "",
    items: [
      {
        itemId: 0,
        quantity: 0,
        pricePerUnit: 0.0,
        description: "",
      },
    ],
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
    const { name, value } = e.target; // Use `name` instead of `dataset.name`

    if (index !== null) {
      // Update items array correctly
      const updatedItems = [...formData.items];
      updatedItems[index][name] = value; // Use `name` directly
      setFormData({ ...formData, items: updatedItems });
    } else {
      // Update other form fields
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
          description: "",
        },
      ],
    }));
  };

  // Remove item from the list
  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/rfq/create`, formData);
      console.log("RFQ Created:", response.data);
      toast.success('Proposal saved successfully!');

      onClose();
    } catch (error) {
      console.error("Error submitting RFQ:", error);
      toast.error('Failed to save proposal. Please try again.');

    }
  };

  return (
    <div className="RequestforQuotation-container">
      <h1>Request For Quotation</h1>
      <form onSubmit={handleSubmit}>
        <div className="RequestforQuotation-form-row">
          <div className="RequestforQuotation-form-group">
            <FloatingInput
              label="Subject:"
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
            <FloatingSelect
              label="Select Vendor"
              id="vendor"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              required
              options={[
                { value: "", label: "---Select Vendor---" },
                ...(Array.isArray(vendors)
                  ? vendors.map((vendor) => ({
                      value: vendor.id,
                      label: vendor.vendorName,
                    }))
                  : []),
              ]}
            />
          </div>
          <div className="RequestforQuotation-form-group">
            <FloatingInput
              label="Request Date:"
              type="date"
              id="requestDate"
              name="requestDate"
              value={formData.requestDate}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="RequestforQuotation-form-group">
            <FloatingInput
              label="Request Close Date:"
              type="date"
              id="closeDate"
              name="requestCloseDate"
              value={formData.requestCloseDate}
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="RequestforQuotation-table-container">
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
                  <FloatingSelect
                    value={String(item.itemId)}
                    name="itemId"
                    onChange={(e) => handleChange(e, index)}
                    options={[
                      { value: "", label: "---Select Item---" },
                      ...(Array.isArray(items)
                        ? items.map((itemOption) => ({
                            value: String(itemOption.invItemId),
                            label: itemOption.itemName,
                          }))
                        : []),
                    ]}
                  />
                </td>
                <td>
                  <FloatingInput
                    type="number"
                    value={item.quantity}
                    name="quantity"
                    onChange={(e) => handleChange(e, index)}
                    min="0"
                  />
                </td>
                <td>
                  <FloatingInput
                    type="number"
                    value={item.pricePerUnit}
                    name="pricePerUnit" // Use `name` instead of `data-name`
                    onChange={(e) => handleChange(e, index)}
                    min="0"
                  />
                </td>
                <td>
                  <FloatingInput
                    type="text"
                    value={item.description}
                    name="description" // Use `name` instead of `data-name`
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
      </div>
        <div className="RequestforQuotation-form-group">
          <FloatingTextarea
          label={"Description"}
           id="description"
           name="description"
           value={formData.description}
          
           required
           onChange={(e) => handleChange(e)}
          />
         
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
