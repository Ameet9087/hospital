import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddPurchaseOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL } from '../../api/api';

const AddPurchaseOrderDraft = ({request}) => {
  console.log(request);
  
  const date=new Date();
  const [vendors, setVendors] = useState([]);
  const [currentDate,setCurrentDate]=useState(date)
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [items, setItems] = useState([]); // To store all items
const [filteredItems, setFilteredItems] = useState([]);
  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };
  const [formData, setFormData] = useState({
    vendorId:"",
    vendorName: "",
    currencyCode: "",
    vendorContactNo: "",
    vendorAddress: "",
    poDate: "",
    deliveryDate: "",
    referenceNo: "",
    invoicingAddress: "",
    deliveryAddress: "",
    contactPerson: "",
    contactEmail: "",
    paymentMode: "",
    remarks: "",
    items: [],
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      vendorId: request?.vendor.id,
      vendorName: request?.vendor.vendorName,
      vendorContactNo: request?.vendor.contactNumber,
      vendorAddress: request?.vendor.contactAddress,
      contactPerson: request?.vendor.contactPerson,
      contactEmail: request?.vendor.email,
      currencyCode: request?.vendor.currencyCode,
      items: request?.items.map((item) => ({
        itemId: item?.itemId?.invItemId || 0,
        itemName: item?.itemId?.itemName || "",
        vendorItemCode: "", // Default value
        mssNo: "", // Default value
        hsnCode: "", // Default value
        itemCode: item?.itemId?.itemCode || "",
        unit: item?.itemId?.unitOfMeasurement?.name || "",
        quantity: item?.requiredQty || 0,
        standardRate: item?.itemId?.standardRate || 0,
        vat: item?.itemId?.isVatApplicable ? 0 : 0, // Set to 0 as default
        totalAmount: 0, // Default value
        remarks: item?.itemRemark || "", // Default value
      })) || [], 
    }));
  }, [request]);
useEffect(() => {
  axios.get(`${API_BASE_URL}/items/getAllItem`)
    .then((response) => setItems(response.data))
    .catch((error) => console.error('Error fetching items:', error));
}, []);
console.log(items);


  // Fetch vendors and items on component mount
  useEffect(() => {
    axios.get(`${API_BASE_URL}/vendors/getAllVendors`)
      .then((response) => setVendors(response.data))
      .catch((error) => console.error('Error fetching vendors:', error));

    axios.get(`${API_BASE_URL}/items/getAllItem`)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

    const handleCategorySelect = (index, category) => {
    const filtered = items.filter((item) => item.category === category);
    setFilteredItems(filtered);

    const updatedItems = [...formData.items];
    updatedItems[index].category = category;
    updatedItems[index].itemId = null;
    updatedItems[index].itemName = '';
    updatedItems[index].standardRate = 0;
    updatedItems[index].totalAmount = 0;
    setFormData({ ...formData, items: updatedItems });
  };
  

  const handleItemSelect = (index, itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);

    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      itemId: selectedItem.invItemId,
      itemName: selectedItem.itemName,
      standardRate: selectedItem.standardRate,
      totalAmount: updatedItems[index].quantity * selectedItem.standardRate,
    };

    setFormData({ ...formData, items: updatedItems });
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...formData.items];
    updatedItems[index].quantity = quantity;
    updatedItems[index].totalAmount = quantity * updatedItems[index].standardRate;
    setFormData({ ...formData, items: updatedItems });
  };

  const handleVendorSelect = (vendorId) => {
    const vendor = vendors.find((v) => v.id === vendorId );
    setSelectedVendor(vendor);
    setFormData({
      ...formData,
      vendorId,
      vendorName: vendor.vendorName,
      vendorContactNo: vendor.contactNumber,
      vendorAddress: vendor.contactAddress,
      contactPerson: vendor.contactPerson,
      contactEmail: vendor.email,
      currecyCode:vendor.currencyCode,
    });
  };

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
          itemId:0,
          itemName: "",
          vendorItemCode: "",
          mssNo: "",
          hsnCode: "",
          itemCode: "",
          unit: "",
          quantity: 0,
          standardRate: 0,
          vat: 0,
          totalAmount: 0,
          remarks: "",
        },
      ],
    });
  };

  const removeRow = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = () => {
    // Calculate subTotal, vat, and totalAmount from formData.items
    const subTotal = formData.items.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );
    const vat = formData.items.reduce(
      (sum, item) => sum + Number(item.vat || 0),
      0
    );
    const totalAmount = formData.items.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );
  
    // Map items to only include itemId
    const cleanedItems = formData.items.map((item) => ({
      itemId: item.itemId,
    }));
  
    // Create the payload
    const payload = {
      poDate: formData.poDate,
      deliveryDate: formData.deliveryDate,
      currencyCode: selectedVendor?.currencyCode || "",
      referenceNo: formData.referenceNo || "",
      invoicingAddress: formData.invoicingAddress || "",
      deliveryAddress: formData.deliveryAddress || "",
      contactPerson: formData.contactPerson || "",
      contactEmail: formData.contactEmail || "",
      paymentMode: formData.paymentMode || "",
      remarks: formData.remarks || "",
      subTotal, // Calculated subTotal
      vat,      // Calculated VAT
      totalAmount, // Calculated totalAmount
      status: "Draft",
      vendorId: formData.vendorId,
      items: cleanedItems, // Only itemId included
    };
  
    console.log("Payload:", payload);
  
    // Send the payload to the server
    axios
      .post(`${API_BASE_URL}/purchase-orders/create`, payload)
      .then((response) => {
        alert("Purchase Order saved successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error saving purchase order:", error);
        alert("Failed to save purchase order.");
      });
  };
  

  return (
    <div className="AddPurchaseOrder-add-purchase-order">
      <h2>Add Purchase Order</h2>

      {/* Vendor Selection */}
      <div className="AddPurchaseOrder-form-row">
        <div className="AddPurchaseOrder-form-group">
          <label>Select Vendor:</label>
          <select
            onChange={(e) => handleVendorSelect(Number(e.target.value))}
            value={request?.vendor?.vendorId|| formData.vendorId || ''}
          >
            <option value="" disabled>Select a vendor</option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.vendorName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Autofill Vendor Data */}
        <div className="AddPurchaseOrder-form-row">
          <div className="AddPurchaseOrder-form-group">
            <label>Vendor Name:</label>
            <input type="text" value={formData.vendorName} disabled />
          </div>
          <div className="AddPurchaseOrder-form-group">
            <label>Currency Code:</label>
            <input type="text" value={formData.currecyCode} disabled />
          </div>
          <div className="AddPurchaseOrder-form-group">
            <label>Vendor Contact No:</label>
            <input type="text" value={formData.vendorContactNo} disabled />
          </div>

          <div className="AddPurchaseOrder-form-group">
            <label>Vendor Address:</label>
            <input type="text" value={formData.vendorAddress} disabled />
          </div>
          {/* <div className="AddPurchaseOrder-form-group">
            <label>Contact Person:</label>
            <input type="text" value={formData.contactPerson} disabled />
          </div> */}
        </div>

      {/* Additional Form Fields */}
      <div className="AddPurchaseOrder-form-row">
        <div className="AddPurchaseOrder-form-group">
          <label>PO Date:</label>
          <input type="date" name="poDate" value={formData.poDate} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Delivery Date:</label>
          <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Reference no:</label>
          <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Invoicing Address:</label>
          <input type="text" name="invoicingAddress" value={formData.invoicingAddress} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Contact Person:</label>
          <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} />
        </div>
        <div className="AddPurchaseOrder-form-group">
          <label>Contact Email:</label>
          <input type="text" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} />
        </div>
      </div>

      {/* Items Table */}
      <table className="AddPurchaseOrder-items-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Item Name</th>
      <th>Vendor's Item Code</th>
      <th>MSS No.</th>
      <th>HSN Code</th>
      <th>Item Code</th>
      <th>Unit</th>
      <th>Quantity</th>
      <th>Standard Rate</th>
      <th>VAT %</th>
      <th>Total Amount</th>
      <th>Remarks</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {formData.items.map((item, index) => (
    <tr key={index}>
      <td>
        <select
          value={item.category}
          className="purchaseorderItemSelect"
          onChange={(e) => handleItemChange(index, "category", e.target.value)}
        >
          <option value="Consumables">Consumables</option>
          <option value="Capital_goods">Capital Goods</option>
        </select>
      </td>
      <td>
      <select
  value={item.itemName}
  className="purchaseorderItemSelect"
  onChange={(e) => {
    const selectedItem = items.find(
      (itm) => itm.itemName === e.target.value
    );
    handleItemChange(index, "itemName", e.target.value);

    console.log(selectedItem);
    
    if (selectedItem) {
      handleItemChange(index, "itemId", selectedItem.invItemId);
      handleItemChange(index, "itemCode", selectedItem.itemCode);
      handleItemChange(index, "unit", selectedItem.unitOfMeasurement.unitOfMeasurementName);
      handleItemChange(index, "standardRate", selectedItem.standardRate);
      handleItemChange(index, "totalAmount", 0); // Reset total amount
    } else {
      console.warn("Selected item not found");
    }
  }}
>
  <option value="">Select Item</option>
  {items.map((itm, idx) => (
    <option key={idx} value={itm.itemName}>
      {itm.itemName}
    </option>
  ))}
</select>
      </td>
      <td>
        <input
          type="text"
          value={item.vendorItemCode || ""}
          className="purchaseorderItemInput"
          onChange={(e) => handleItemChange(index, "vendorItemCode", e.target.value)} // User input only
        />
      </td>
      <td>
        <input
          type="text"
          value={item.mssNo || ""}
          className="purchaseorderItemInput"
          onChange={(e) => handleItemChange(index, "mssNo", e.target.value)} // User input only
        />
      </td>
      <td>
        <input
          type="text"
          value={item.hsnCode || ""}
          className="purchaseorderItemInput"
          onChange={(e) => handleItemChange(index, "hsnCode", e.target.value)} // User input only
        />
      </td>
      <td>
        <input
          type="text"
          value={item.itemCode || ""}
          className="purchaseorderItemInput"
          readOnly
        />
      </td>
      <td>
        <input
          type="text"
          value={item.unit || ""}
          className="purchaseorderItemInput"
          readOnly
        />
      </td>
      <td>
        <input
          type="number"
          value={item.quantity || ""}
          className="purchaseorderItemInput"
          onChange={(e) => {
            const quantity = e.target.value;
            handleItemChange(index, "quantity", quantity);

            // Calculate total amount dynamically
            const totalAmount = quantity * (item.standardRate || 0);
            handleItemChange(index, "totalAmount", totalAmount.toFixed(2));
          }}
        />
      </td>
      <td>
        <input
          type="text"
          value={item.standardRate || ""}
          className="purchaseorderItemInput"
          readOnly
        />
      </td>
      <td>
        <input
          type="text"
          value={item.vat || ""}
          className="purchaseorderItemInput"
          onChange={(e) => handleItemChange(index, "vat", e.target.value)} // User input only
        />
      </td>
      <td>
        <input
          type="text"
          value={item.totalAmount || ""}
          className="purchaseorderItemInput"
          readOnly
        />
      </td>
      <td>
        <input
          type="text"
          value={item.remarks || ""}
          className="purchaseorderItemInput"
          onChange={(e) => handleItemChange(index, "remarks", e.target.value)} // User input only
        />
      </td>
      <td>
        <button
          className="Pro-Purchase-add-btn"
          onClick={() => removeRow(index)}
        >
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

</table>


      <button className='purchaseorder-add-btn' onClick={addNewRow}>+ Add New Row</button>


      {/* Submit Button */}
      <div className="AddPurchaseOrder-button-group">
        <button onClick={handleSubmit}>Save Purchase Order</button>
      </div>
    </div>
  );
};

export default AddPurchaseOrderDraft;
