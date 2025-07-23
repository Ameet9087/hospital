import React, { useEffect, useRef, useState } from "react";
import "./StockManage.css";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";

const StockManage = ({ item, onBack }) => {
  const [minStockQuantity, setMinStockQuantity] = useState(item.minStockQuantity || 0);
  const [modifiedQty, setModifiedQty] = useState(0);
  const [isInChecked, setIsInChecked] = useState(true);
  const [isOutChecked, setIsOutChecked] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [goodsReceipts, setGoodsReceipts] = useState([]);
  const [modifiedTotalAvailable, setModifiedTotalAvailable] = useState(0);
  const tableRef = useRef(null);

  // Fetch goods receipts
  useEffect(() => {
    const fetchGoodsReceipts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/goods-receipts/getAll-by-status`);
        if (response.ok) {
          const data = await response.json();
          setGoodsReceipts(data);
        } else {
          console.error("Failed to fetch goods receipts.");
        }
      } catch (error) {
        console.error("Error fetching goods receipts:", error);
      }
    };

    fetchGoodsReceipts();
  }, []);

  useEffect(() => {
    // Filter relevant goods receipt items after goodsReceipts are set
    const filteredReceipts = goodsReceipts.filter((receipt) =>
      receipt.items.some(
        (receiptItem) => receiptItem.item.invItemId === item.invItemId
      )
    );

    // Calculate the modified total available whenever filteredReceipts or item changes
    const updatedModifiedTotalAvailable = filteredReceipts.reduce((total, receipt) => {
      return (
        total +
        receipt.items.reduce((subtotal, receiptItem) => {
          const receivedQty = receiptItem.quantity || 0;
          return subtotal + receivedQty;
        }, 0)
      );
    }, 0);

    // Set the new modified total available value in state
    setModifiedTotalAvailable(updatedModifiedTotalAvailable);
  }, [goodsReceipts, item]); // This effect will run when goodsReceipts or item changes

  const handleSubmit = async () => {
    // Gather the selected goods receipt IDs from checkboxes
    const selectedGoodReceiptIds = goodsReceipts
      .filter((receipt) =>
        receipt.items.some((receiptItem) => receiptItem.item.invItemId === item.invItemId)
      )
      .map((receipt) => receipt.id);

    // Construct the request body
    const requestBody = {
      newQuantity: modifiedTotalAvailable, // Use the modified quantity value
      goodReceiptIds: selectedGoodReceiptIds,
    };
    console.log(requestBody);

    try {
      const response = await fetch(
        `${API_BASE_URL}/items/${item.invItemId}/update-quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
          body: JSON.stringify(requestBody), // Pass the request body as a JSON string
        }
      );

      if (response.ok) {
        alert("Item updated successfully!");
        onBack();
      } else {
        const errorData = await response.json();
        console.error("Error updating item:", errorData);
        alert("Failed to update item. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while updating the item.");
    }
  };

  const handleStockAdjustment = () => {
    if (isInChecked) {
      setMinStockQuantity((prevQty) => prevQty + Number(modifiedQty));
    } else if (isOutChecked) {
      setMinStockQuantity((prevQty) => prevQty - Number(modifiedQty));
    }
  };

  return (
    <div className="StockManage-container">
      <button onClick={onBack} className="StockManage-back-button">
        Back to List
      </button>
      <h2 className="StockManage-title">Stock Manage {item.itemName}</h2>
      <div className="StockManage-item-name">
        Item Name: <strong>{item.itemName}</strong>
      </div>
      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "",
              "GR No.",
              "Received Date",
              "Received Qty",
              "Current Qty",
              "Adjustment Type (In/Out)",
              "Modified Qty",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {goodsReceipts
            .filter((receipt) =>
              receipt.items.some(
                (receiptItem) => receiptItem.item.invItemId === item.invItemId
              )
            )
            .map((receipt) =>
              receipt.items.map((receiptItem) => (
                <tr key={receipt.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{receipt.id}</td>
                  <td>{new Date(receipt.goodsReceiptDate).toDateString()}</td>
                  <td>{receiptItem.quantity}</td>
                  <td>{receiptItem?.item?.availableQty}</td>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        checked={isInChecked}
                        onChange={(e) => {
                          setIsInChecked(e.target.checked);
                          setIsOutChecked(false);
                        }}
                      />
                      In
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={isOutChecked}
                        onChange={(e) => {
                          setIsOutChecked(e.target.checked);
                          setIsInChecked(false);
                        }}
                      />
                      Out
                    </label>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={modifiedQty}
                      min="0"
                      className="StockManage-input"
                      onChange={(e) => setModifiedQty(Number(e.target.value))}
                      onBlur={handleStockAdjustment}
                    />
                  </td>
                </tr>
              ))
            )}
        </tbody>
      </table>
      <div className="StockManage-totals">
        <div className="StockManage-item">
          <label>Current Total Available:</label>
          <input type="text" value={item.availableQty} readOnly />
        </div>
        <div className="StockManage-item">
          <label>Modified Total Available:</label>
          <input type="text" value={modifiedTotalAvailable} readOnly />
        </div>
      </div>
      <div className="StockManage-buttons">
        <button className="StockManage-update-button" onClick={handleSubmit}>
          Update Stock
        </button>
        <button className="StockManage-cancel-button" onClick={onBack}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StockManage;
