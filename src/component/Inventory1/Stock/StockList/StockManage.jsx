import React, { useRef, useState } from "react";
import "./StockManage.css";
import { API_BASE_URL } from "../../../api/api";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";

const StockManage = ({ item, onBack }) => {
  console.log(item);
  
  const [minStockQuantity, setMinStockQuantity] = useState(item.minStockQuantity || 0);
  const [modifiedQty, setModifiedQty] = useState(0); // For input quantity
  const [isInChecked, setIsInChecked] = useState(false);
  const [isOutChecked, setIsOutChecked] = useState(false);
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const handleSubmit = async () => {
    let finalQuantity = minStockQuantity;

    if (isInChecked) {
        finalQuantity = minStockQuantity; 
    } else if (isOutChecked) {
        finalQuantity = minStockQuantity;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/items/updateStock/${item.id}?Quantity=${finalQuantity}`, {
            method: "PUT"
        });

        if (response.ok) {
            alert("Item updated successfully!");
            onBack(); // Close the modal after submission
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
    setMinStockQuantity((prevQty) => prevQty + Number(modifiedQty)); // Add quantity if "In"
  } else if (isOutChecked) {
    setMinStockQuantity((prevQty) => prevQty - Number(modifiedQty)); // Subtract quantity if "Out"
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
                 '',
                 'GR No.',
                 'Received Date',
                 'Batch No.',
                 'Updated Date',
                 'Remarks',
                 'Received Qty',
                 'Current Qty',
                 'Adjustment Type (In/Out)',
                 'Modified Qty'
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
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>{item.id}</td>
          <td>
            <input type="checkbox" /> Date (B.S.)?
          </td>
          <td></td>
          <td>{new Date().toDateString()}</td>
          <td></td>
          <td>{item.reOrderQuantity}</td>
          <td>{minStockQuantity}</td>
          <td>
            <label>
              <input
                type="checkbox"
                checked={isInChecked}
                onChange={(e) => {
                  setIsInChecked(e.target.checked);
                  setIsOutChecked(false); // Uncheck "Out" if "In" is checked
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
                  setIsInChecked(false); // Uncheck "In" if "Out" is checked
                }}
              />
              Out
            </label>
          </td>
          <td>
            <input
              type="number"
              value={modifiedQty}
              className="StockManage-input"
              onChange={(e) => setModifiedQty(Number(e.target.value))}
              onBlur={handleStockAdjustment} // Update stock when leaving the input field
            />
          </td>
        </tr>
      </tbody>
    </table>
      <div className="StockManage-totals">
  <div className="StockManage-item">
    <label>Current Total Available:</label>
    <input type="text" value={item.minStockQuantity} readOnly />
  </div>
  <div className="StockManage-item">
    <label>Modified Total Available:</label>
    <input
      type="text"
      value={minStockQuantity}
      onChange={(e) => setMinStockQuantity(Number(e.target.value))}
    />
  </div>
</div>

      <div className="StockManage-buttons">
        <button className="StockManage-update-button" onClick={handleSubmit}>Update Stock</button>
        <button className="StockManage-cancel-button" onClick={onBack}>Cancel</button>
      </div>
    </div>
  );
};

export default StockManage;
