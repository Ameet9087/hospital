import React, { useState, useEffect, useRef } from "react";
import "./sSIRetunReturnItemBtn.css";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";

const SSIRetunReturnItemBtn = ({ onBack }) => {
  const { store } = useParams();
  const [returnDate, setReturnDate] = useState("");
  const [items, setItems] = useState([]);
  
  const tableRef = useRef(null);

  // State for the table row
  const [rowData, setRowData] = useState({
    itemCategory: "",
    itemName: "",
    inventory: "",
    itemCode: "",
    expiryDate: "",
    barcode: "",
    subCategoryName: "",
    availableQty: 0,
    returnQty: 0, // Initialize to 0 instead of undefined
  });
  

  const [remarks, setRemarks] = useState("");
  const [returnBy, setReturnBy] = useState("");
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/inventory-requisitions/received?subStoreId=${store}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch items.");
        }
        const data = await response.json();
        console.log(data);
        setItems(data); // Save fetched items
      } catch (error) {
        console.error("Error fetching items:", error);
        alert(
          "There was an error fetching the inventory items. Please try again later."
        );
      }
    };
  
    fetchItems();
  }, []);
  
  // Handle item selection
  const handleItemChange = (e) => {
    const selectedItemName = e.target.value;
    const selectedItemData = items.find(
      (item) => item.item.itemName === selectedItemName
    );
  
    setRowData((prevData) => ({
      ...prevData,
      itemName: selectedItemName || "",
      availableQty: selectedItemData?.item.availableQty || 0,
      itemCode: selectedItemData?.item.itemCode || "",
      inventory: selectedItemData?.item.inventory || "",
      code: selectedItemData?.item.invCompany?.code || "",
      subCategoryName: selectedItemData?.item.subCategory?.subCategoryName || "",
    }));
  };
  
  
 
  // Handle changes for editable fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSave = async () => {    
    
  
    // Construct the data in the required format
    const returnData = {
      returnDate,
      status: "Completed", // Assuming status is always "Completed"
      remarks,
      items: [
        {
          inventoryRequisitionItem: { id: rowData.id }, // Ensure rowData contains the 'id'
          returnQuantity: rowData.returnQty,
        }
      ]
    };
  
    console.log(returnData); // For debugging
  
    try {
      // Send the data to the API
      const response = await fetch(`${API_BASE_URL}/substore-return-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(returnData),
      });
  
      if (response.ok) {
        alert("Return successfully recorded!");
        handleDiscard(); // Reset the form after successful save
      } else {
        const errorData = await response.json();
        alert(`Failed to save return. ${errorData.message || ""}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the return. Please try again.");
    }
  };
  
  
 
  

  
  const handleDiscard = () => {
    setReturnDate("");
    setRowData({
      itemCategory: "",
      itemName: "",
      vendorName: "",
      code: "",
      batchNo: "",
      expiryDate: "",
      barcodeNumber: "",
      storeName: "",
      availableQty: 0,
      returnQty: 1,
    });
    setRemarks("");
    setReturnBy("");
  };
 

  return (
    <div className="sSIRetunReturnItemBtn-entry">
      <h2 className="sSIRetunReturnItemBtn-title">
        <i className="fa-solid fa-star-of-life"></i> Add Return
      </h2>

      <div className="sSIRetunReturnItemBtn-form-section">
        <label>Return Date*:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="sSIReturnItem-table">
          <thead>
            <tr>
              {[
                "Item Category*",
                "Item Name*",
                "Inventory*",
                "Code",
              
                "Expiry Date*",
                "Barcode No.*",
                "Category*",
                "Available Qty",
                "Return Qty*",
                "Status*",
                "Actions",
              ].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  name="itemCategory"
                  value={rowData.itemCategory}
                  onChange={handleFieldChange}
                >
                  <option value="">Select Category</option>
                  <option value="Consumable">Consumable</option>
                  <option value="Capital Goods">Capital Goods</option>
                </select>
              </td>
              <td>
              <select
                name="itemName"
                value={rowData.itemName}
                onChange={handleItemChange}
              >
                <option value="">Select Item</option>
                {items.map((item) => (
                  <option key={item.id} value={item.item.itemName}>
                    {item.item.itemName}
                  </option>
                ))}
              </select>
              </td>
              <td>
                <input
                  type="text"
                  name="vendorName"
                  value={rowData.inventory}
                  onChange={handleFieldChange}
                  placeholder="Enter Vendor Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="itemCode"
                  value={rowData.itemCode}
                  readOnly
                  placeholder="Auto-filled Code"
                />
              </td>
           
              <td>
                <input
                  type="date"
                  name="expiryDate"
                  value={rowData.expiryDate}
                  onChange={handleFieldChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="code"
                  value={rowData.code}
                  onChange={handleFieldChange}
                  placeholder="Enter Barcode No."
                />
              </td>

              {/* Store Name */}
              <td>
                <input
                  type="text"
                  name="Category"
                  value={rowData.subCategoryName}
                  onChange={handleFieldChange}
                  placeholder="Category"
                />
              </td>

              {/* Available Qty */}
              <td>
                <input
                  type="number"
                  name="availableQty"
                  value={rowData.availableQty}
                  readOnly
                />
              </td>

              {/* Return Qty */}
              <td>
                <input
                  type="number"
                  name="returnQty"
                  value={rowData.returnQty}
                  onChange={handleFieldChange}
                  min="1"
                  placeholder="Enter Quantity"
                />
              </td>

              {/* Returned By */}
              <td>
                <input
                  type="text"
                  name="Status"
                  value={returnBy}
                  onChange={(e) => setReturnBy(e.target.value)}
                  placeholder="status"
                />
              </td>

              {/* Actions */}
              <td>
                <button
                  className="sSIReturnItem-delete-btn"
                  onClick={handleDiscard}
                >
                  x
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Remark Section */}
      <div className="sSIRetunReturnItemBtn-remark-section">
        <div className="sSIRetunReturnItemBtn-remark">
          <label>Remark:</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter Remarks"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="sSIRetunReturnItemBtn-buttons">
      <button
  className="sSIRetunReturnItemBtn-save-button"
  onClick={handleSave}  // Ensure this is properly referencing handleSave function

>
  Save
</button>

        <button
          className="sSIRetunReturnItemBtn-discard-button"
          onClick={handleDiscard}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default SSIRetunReturnItemBtn;
