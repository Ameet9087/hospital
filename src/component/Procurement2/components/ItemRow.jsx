import React from "react";

const ItemRow = ({ item, index, handleItemChange }) => {
  return (
    <div className="item-row">
      <select
        value={item.category}
        onChange={(e) => handleItemChange(index, "category", e.target.value)}
      >
        <option value="Consumables">Consumables</option>
        <option value="Non-Consumables">Non-Consumables</option>
      </select>
      <input
        type="text"
        placeholder="Item Name"
        value={item.itemName}
        onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Batch No"
        value={item.batchNo}
        onChange={(e) => handleItemChange(index, "batchNo", e.target.value)}
      />
      <input
        type="date"
        placeholder="Expiry Date"
        value={item.expiryDate}
        onChange={(e) => handleItemChange(index, "expiryDate", e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={item.quantity}
        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
      />
      <input
        type="number"
        placeholder="Free Quantity"
        value={item.freeQuantity}
        onChange={(e) =>
          handleItemChange(index, "freeQuantity", e.target.value)
        }
      />
      <input
        type="number"
        placeholder="Rate"
        value={item.rate}
        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
      />
      <input
        type="number"
        placeholder="Discount (%)"
        value={item.discountPercentage}
        onChange={(e) =>
          handleItemChange(index, "discountPercentage", e.target.value)
        }
      />
      <input
        type="number"
        placeholder="VAT (%)"
        value={item.vatPercentage}
        onChange={(e) =>
          handleItemChange(index, "vatPercentage", e.target.value)
        }
      />
      <input
        type="number"
        placeholder="CC Charge (%)"
        value={item.ccChargePercentage}
        onChange={(e) =>
          handleItemChange(index, "ccChargePercentage", e.target.value)
        }
      />
      <input
        type="number"
        placeholder="Other Charge"
        value={item.otherCharge}
        onChange={(e) => handleItemChange(index, "otherCharge", e.target.value)}
      />
      <input
        type="number"
        placeholder="Total Amount"
        value={item.totalAmount}
        onChange={(e) => handleItemChange(index, "totalAmount", e.target.value)}
      />
      <input
        type="text"
        placeholder="Remarks"
        value={item.remarks}
        onChange={(e) => handleItemChange(index, "remarks", e.target.value)}
      />
    </div>
  );
};

export default ItemRow;
