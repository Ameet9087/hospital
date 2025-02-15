/* Ajhar Tamboli dispenStockRequisitionCreateReq.jsx 19-09-24 */
import "../DisStocks/dispenStockRequisitionCreateReq.css";
import { API_BASE_URL } from "../../api/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

function DispenStockRequisitionCreateReq({ onClose }) {
  const [requisitionDate, setRequisitionDate] = useState("");
  const [items, setItems] = useState([]);

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/add-item`);
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          console.error("Failed to fetch items:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const [selectedItems, setSelectedItems] = useState([
    {
      addItemId: "",
      requestingQuantity: 1,
      remark: "",
    },
  ]);

  // Add item
  const addItem = () => {
    setSelectedItems([
      ...selectedItems,
      { addItemId: "", requestingQuantity: 1, remark: "" },
    ]);
  };

  // Remove item
  const removeItem = (index) => {
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newSelectedItems);
  };

  // Handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index][name] = value;
    setSelectedItems(newSelectedItems);
  };

  // Validate form inputs
  const validateForm = () => {
    return selectedItems.every(
      (item) => item.addItemId && item.requestingQuantity
    );
  };

  // Handle form submission to post data
  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields for each item.");
      return;
    }

    try {
      const payload = {
        requiredQuantity: selectedItems.reduce(
          (acc, item) => acc + parseInt(item.requestingQuantity || 0),
          0
        ),
        requestedBy: "John Doe", // Replace with dynamic user if needed
        remark: "Urgent Requisition", // Update as necessary
        requestedDate: requisitionDate,
        storeName: "Main Store", // Replace with dynamic store name if available
        batchNo: "BATCH1234", // Replace with dynamic batch number if available
        expiryDate: "2025-12-31", // Replace with dynamic expiry date if applicable
        isVerify: "Yes", // Replace based on logic
        verifiedBy: "Admin", // Replace with dynamic verification user
        needsVerification: "No", // Replace based on logic
        status: "Pending", // Adjust status if needed
        dispatchQty: 50, // Replace with calculated dispatch quantity
        issueNo: "ISSUE123", // Replace with dynamic issue number
        recieveditem: "Item XYZ", // Replace with dynamic received item

        // Add Requisition Detail DTOs
        requisitionDetailDTOs: selectedItems.map((item) => ({
          requestingQuantity: parseInt(item.requestingQuantity),
          date: requisitionDate,
          time: new Date().toLocaleTimeString(), // Capture current time
          status: "Pending", // Adjust status if required
          remark: item.remark || "",
          addItemDTO: {
            addItemId: parseInt(item.addItemId),
          },
        })),
      };

      console.log(payload);
      const response = await fetch(`${API_BASE_URL}/pharmacyRequisitions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Requisition created successfully:", result);
        toast.success("Requisition created successfully!");
        onClose();
      } else {
        console.error("Error creating requisition:", response.statusText);
        toast.error("Failed to create requisition.");
      }
    } catch (error) {
      console.error("Error creating requisition:", error);
      toast.error("Error creating requisition. Please try again.");
    }
  };

  return (
    <div className="dispenStockRequisitionCreateReq-form">
      <h3>* Add Requisition</h3>
      <div className="dispenStockRequisitionCreateReq-date-input">
       
        <FloatingInput
        label={"Requisition Date"}
        type="date"
          value={requisitionDate}
          onChange={(e) => setRequisitionDate(e.target.value)}
          required
        />
      </div>
      <table >
        <thead>
          <tr>
            <th></th>
            <th>Item Name</th>
            <th>Requesting Quantity</th>
            <th>Remark</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item, index) => (
            <tr key={index}>
              <td>
                <button
                  className="dispenStockRequisitionCreateReq-remove-btn"
                  onClick={() => removeItem(index)}
                >
                  X
                </button>
              </td>
              <td>
                <FloatingSelect
                  label="Select Item"
                  name="addItemId"
                  value={item.addItemId}
                  onChange={(e) => handleInputChange(index, e)}
                  options={[
                    { value: "", label: "--Select Item--" },
                    ...items.map(({ addItemId, itemMaster }) => ({
                      value: addItemId,
                      label: itemMaster?.itemName,
                    })),
                  ]}
                />
              </td>
             
              <td>
                <FloatingInput
                  label="Requesting Quantity"
                  type="number"
                  name="requestingQuantity"
                  value={item.requestingQuantity}
                  onChange={(e) => handleInputChange(index, e)}
                  min="1"
                />
              </td>
              <td>
                <FloatingInput
                  label="Remark"
                  type="text"
                  name="remark"
                  value={item.remark}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>

              <td>
                {index === selectedItems.length - 1 && (
                  <button
                    className="dispenStockRequisitionCreateReq-add-btn"
                    onClick={addItem}
                  >
                    +
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="dispenStockRequisitionCreateReq-button-group">
        <button
          className="dispenStockRequisitionCreateReq-request-btn"
          onClick={handleSubmit}
        >
          Request
        </button>
        <button
          className="dispenStockRequisitionCreateReq-cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DispenStockRequisitionCreateReq;
