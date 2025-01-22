import React, { useState, useEffect } from "react";
import "./DirectDispatch.css";
import { API_BASE_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

const DirectDispatch = ({ onClose,request }) => {
  console.log(request);
  
  const [storeName, setStoreName] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      itemCategory: "",
      itemName: "",
      code: "",
      unit: "",
      availableQty: "",
      dispatchedQty: "",
      remark: "",
    },
  ]);
  const [remarks, setRemarks] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [subStore, setSubStore] = useState([]);

  useEffect(() => {
    if (request) {
      setStoreName(request?.subStore?.subStoreId);
      setDispatchDate("");
  
      // Map the data from request and assign it to items
      const mappedItems = request.items?.map(item => ({
        itemCategory: item.item.subCategory.category,
        itemName: item.item.itemName,
        code: item.item.itemCode,
        unit: item.item.unitOfMeasurement.name,
        availableQty: item.item.availableQty,
        dispatchedQty: item.dispatchQuantity,
        remark: item.remark,
      })) || [
        {
          itemCategory: "",
          itemName: "",
          code: "",
          unit: "",
          availableQty: "",
          dispatchedQty: "",
          remark: "",
        },
      ];
  
      setItems(mappedItems);
      setRemarks("");
    }
  }, [request]);
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/items/getAllItem`);
        const data = await response.json();
        setAllItems(data); // Assuming data is an array of items
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchSubstore = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/substores/get-all-substores`);
        const data = await response.json();
        console.log(data);
        setSubStore(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchSubstore();
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [name]: value,
    };
    setItems(newItems);
  };

  const handleItemSelect = (index, itemId) => {
    const selectedItem = allItems.find(item => item.invItemId === parseInt(itemId)); // Match by itemId
    
    if (selectedItem) {
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        itemId: selectedItem.invItemId, // Store the itemId
        itemName: selectedItem.itemName, // Update the item name
        code: selectedItem.itemCode, // Update the item code
        unit: selectedItem.unitOfMeasurement.name, // Update the unit
        availableQty: selectedItem.availableQty // Update available quantity
      };
      setItems(newItems);
    }
  };
  

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        itemCategory: "",
        itemName: "",
        code: "",
        unit: "",
        availableQty: "",
        dispatchedQty: "",
        remark: "",
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(items);
    const payload = {
      issueNo: "REQ123", // You can dynamically generate or fetch this value if needed
      requisitionDate: dispatchDate,
      withdrawRemark: remarks,
      status: "Dispatch", // You can change this based on form input if needed
      verifyOrNot:"Yes",
      verifiedBy:"General Inventory",
      checkedBy:"General Inventory",
      subStore:{ subStoreId:storeName}, // Assuming storeName contains subStoreId
      requisitionItems: items.map((item) => ({
        item: {
        invItemId:item.itemId},
        dispatchQuantity: item.dispatchedQty,
        requiredQuantity: item.dispatchedQty,
        remark: item.remark,
      })),
    };

    console.log(payload);

    try {
      const response = await fetch(
        `${API_BASE_URL}/inventory-requisitions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Dispatch to substore saved successfully");
        onClose();
      } else {
        console.error("Error saving dispatch");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDiscard = () => {
    setStoreName("");
    setDispatchDate("");
    setItems([
      {
        itemCategory: "Consumables",
        itemName: "",
        code: "",
        unit: "",
        availableQty: "",
        dispatchedQty: "",
        remark: "",
      },
    ]);
    setRemarks("");
  };

  return (
    <div className="direct-dispatch-container">
      <form onSubmit={handleSubmit}>
        <div className="direct-dispatch-dispatch-date">
          <h1>Direct Dispatch</h1>
          <label>
            Dispatch Date:
            <input
              type="date"
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
            />
          </label>
        </div>
        <div className="direct-dispatch-store-name">
          <label>
            Store*:
            <select
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Store
              </option>
              {subStore.map((item, index) => (
                <option key={index} value={item.subStoreId}>
                  {item.subStoreName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <table className="direct-dispatch-dispatch-table">
          <thead>
            <tr>
              <th></th>
              <th>Item Category</th>
              <th>Item Name</th>
              <th>Code</th>
              <th>Unit</th>
              <th>Available Qty</th>
              <th>Dispatched Qty</th>
              <th>Remark</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>
                  <button
                    type="button"
                    className="direct-dispatch-buttons-direct-add"
                    onClick={handleAddItem}
                  >
                    +
                  </button>
                </td>
                <td>
                  <select
                    name="itemCategory"
                    value={item.itemCategory}
                    onChange={(e) => handleChange(index, e)}
                  >
                    <option>Consumables</option>
                    <option>Capital Goods</option>
                  </select>
                </td>
                <td>
                  <select
                    name="itemId"
                    value={item.itemId} // Bind to itemId instead of itemName
                    onChange={(e) => {
                      handleItemSelect(index, e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      Select Item
                    </option>
                    {allItems.map((allItem, idx) => (
                      <option key={idx} value={allItem.invItemId}>
                        {allItem.itemName}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    type="text"
                    name="code"
                    value={item.code}
                    onChange={(e) => handleChange(index, e)}
                    readOnly // Optional: Make it read-only if auto-filled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="unit"
                    value={item.unit}
                    onChange={(e) => handleChange(index, e)}
                    readOnly // Optional: Make it read-only if auto-filled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="availableQty"
                    value={item.availableQty}
                    onChange={(e) => handleChange(index, e)}
                    readOnly // Optional: Make it read-only if auto-filled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="dispatchedQty"
                    value={item.dispatchedQty}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="remark"
                    value={item.remark}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="direct-dispatch-buttons-remove"
                    onClick={() => handleRemoveItem(index)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="direct-dispatch-remarks">
          <label>Remarks*:</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>
        <div className="direct-dispatch-buttons">
          <button
            className="direct-dispatch-buttons-direct-dispatch"
            type="submit"
          >
            Direct Dispatch
          </button>
          <button
            className="direct-dispatch-buttons-discard-change"
            type="button"
            onClick={handleDiscard}
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default DirectDispatch;
