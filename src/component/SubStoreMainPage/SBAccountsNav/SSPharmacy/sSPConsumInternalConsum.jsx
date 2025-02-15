import React, { useState, useEffect } from "react";
import "../SSPharmacy/sSPConsumInternalConsum.css";
import { API_BASE_URL } from "../../../api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
function SSPConsumInternalConsum({ onClose }) {
  const { store } = useParams();
  const [consumedBy, setConsumedBy] = useState();
  const [remark, setRemark] = useState();
  const [formData, setFormData] = useState([
    {
      itemName: "",
      availableQuantity: 0,
      quantity: 0,
      batchNo: "",
      expiryDate: "",
      salePrice: 0.0,
      totalAmount: 0.0,
    },
  ]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/subpharm-requisitions/requisition-items?subStoreId=${store}`
        );
        const data = await response.json();
        setItems(data); // Adjust based on actual API response structure
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [store]);

  const addRow = () => {
    setFormData([
      ...formData,
      {
        itemName: "",
        availableQuantity: 0,
        quantity: 0,
        batchNo: "",
        expiryDate: "",
        salePrice: 0.0,
        totalAmount: 0.0,
      },
    ]);
  };

  const removeRow = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedData = [...formData];
    updatedData[index][name] = value;

    // Recalculate totalAmount if 'quantity' or 'salePrice' changes
    if (name === "quantity" || name === "salePrice") {
      const quantity =
        name === "quantity" ? value : updatedData[index].quantity;
      const salePrice =
        name === "salePrice" ? value : updatedData[index].salePrice;

      updatedData[index].totalAmount = quantity * salePrice;
    }

    setFormData(updatedData);
  };

  const handleItemChange = (index, e) => {
    const selectedItem = items.find(
      (item) => item.subPharmRequisitionItemId == e.target.value
    );

    const updatedData = [...formData];
    updatedData[index] = {
      ...updatedData[index],
      itemName: e.target.value,
      availableQuantity: selectedItem?.dispatchQuantity || 0,
      salePrice: selectedItem?.items?.salePrice || 0.0,
      batchNo: selectedItem?.items?.batchNo || "",
      expiryDate: selectedItem?.items?.expiryDate || "",
    };

    setFormData(updatedData);
  };
  const totalAmount = formData.reduce((sum, item) => sum + item.totalAmount, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemsData = formData.map((data) => ({
      subPharmRequisitionItemId: { subPharmRequisitionItemId: data.itemName },
      consumedQty: data.quantity,
      totalAmount: data.totalAmount,
    }));

    // Prepare the request body based on the provided structure
    const requestData = {
      consumedDate: new Date().toISOString(), // Current date for consumedDate
      totalAmount: totalAmount, // Sum up all total amounts
      consumedBy: consumedBy, // Assuming consumedBy is part of formData
      remark: remark, // Assuming remark is part of formData
      storeName: {
        subStoreId: store, // Using store param from URL
      },
      items: itemsData,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/subPharmConsumption`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Internal Consumption entry saved successfully.");
        onClose();
      } else {
        alert("Failed to save entry. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Calculate total amount of all items

  return (
    <div className="sSPConsumInternalConsum-container">
      <div className="sSPConsumInternalConsum-header">
        <i className="fa fa-shopping-cart"></i> New Internal Consumption
        <button
          className="sSPConsumInternalConsum-close-button"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className="sSPConsumInternalConsum-content">
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>AvlQty</th>
                <th>Qty</th>
                <th>Batch No</th>
                <th>Expiry Date</th>
                <th>Sale Price</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>
                    <FloatingSelect
                      label="Select Item"
                      name="itemName"
                      value={data.itemName}
                      onChange={(e) => handleItemChange(index, e)}
                      options={[
                        { value: "", label: "--Select Item--" },
                        ...items.map((item) => ({
                          value: item.subPharmRequisitionItemId,
                          label: item.items?.itemMaster?.itemName,
                        })),
                      ]}
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label={"AvlQty"}
                      type="number"
                      name="availableQuantity"
                      value={data.availableQuantity}
                      readOnly
                      min="0"
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Quantity"
                      type="number"
                      name="quantity"
                      value={data.quantity}
                      onChange={(e) => handleChange(index, e)}
                      className="sSPConsumInternalConsum-input"
                      min="0"
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Batch No"
                      type="text"
                      name="batchNo"
                      value={data.batchNo}
                      onChange={(e) => handleChange(index, e)}
                      className="sSPConsumInternalConsum-input"
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Expiry Date"
                      type="date"
                      name="expiryDate"
                      value={data.expiryDate}
                      onChange={(e) => handleChange(index, e)}
                      className="sSPConsumInternalConsum-input"
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Sale Price"
                      type="number"
                      name="salePrice"
                      value={data.salePrice}
                      readOnly
                      className="sSPConsumInternalConsum-input"
                      min="0"
                    />
                  </td>
                  <td>
                    <FloatingInput
                      label="Total Amount"
                      type="number"
                      name="totalAmount"
                      value={data.totalAmount}
                      readOnly
                      className="sSPConsumInternalConsum-input"
                      min="0"
                    />
                  </td>

                  <td>
                    <button
                      type="button"
                      className="sSPConsumInternalConsum-button"
                      onClick={() => removeRow(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            className="sSPConsumInternalConsum-button"
            onClick={addRow}
          >
            Add Row
          </button>

          <div className="sSPConsumInternalConsum-details">
            <div className="sSPConsumInternalConsum-total-amount">
              <FloatingInput
                label="Total Amount"
                type="number"
                value={totalAmount}
                readOnly
                className="sSPConsumInternalConsum-total-input"
              />
            </div>

            <div className="sSPConsumInternalConsum-total-amount">
              <FloatingInput
                label="Consumed By"
                type="text"
                name="consumedBy"
                value={consumedBy}
                onChange={(e) => setConsumedBy(e.target.value)}
                className="sSPConsumInternalConsum-total-input"
              />
            </div>

            <div className="sSPConsumInternalConsum-total-amount">
              <FloatingTextarea
                label="Remark"
                name="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="sSPConsumInternalConsum-total-input"
              />
            </div>

            <div className="sSPConsumInternalConsum-footer">
              <button
                type="submit"
                className="sSPConsumInternalConsum-save-button"
              >
                Save
              </button>
              <button
                type="button"
                className="sSPConsumInternalConsum-cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SSPConsumInternalConsum;
