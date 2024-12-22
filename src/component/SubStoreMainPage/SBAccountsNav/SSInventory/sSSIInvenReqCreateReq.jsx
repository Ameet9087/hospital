  /* Ajhar Tamboli sSSIInvenReqCreateReq.jsx 19-09-24 */


  import React, { useEffect, useState } from "react";
  import { Calendar } from "lucide-react";
  import "../SSInventory/sSSIInvenReqCreateReq.css";
  import { useParams } from "react-router-dom";
  import { API_BASE_URL } from "../../../api/api";

  const SSSIInvenReqCreateReq = ({ onClose }) => {
    const { store } = useParams();
  const [inventoryName, setInventoryName] = useState("");
  const [requisitionDate, setRequisitionDate] = useState("");
  const [issueNo, setIssueNo] = useState("");
  const [rows, setRows] = useState([
    {
      itemId:"",
      itemCategory: "",
      itemName: "",
      specification: "",
      unit: "",
      availableQty: "",
      code: "",
      requiredQuantity: "",
      remark: "",
    },
  ]);
  const [needVerification, setNeedVerification] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [checkedBy, setCheckedBy] = useState("Mr. admin admin");
  const [items, setItems] = useState([]); // Store fetched items here



  useEffect(() => {
    // Set the current date as the default requisition date
    const today = new Date().toISOString().split("T")[0];
    setRequisitionDate(today);

    // Fetch items from the API
   const fetchItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/items/getAllItem`);
        if (response.ok) {
          const data = await response.json();
          setItems(data); // Store the fetched items
        } else {
          console.error("Failed to fetch items.");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    // Fetch target inventory based on substoreId
    const fetchTargetInventory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/substores/${store}`);
        if (response.ok) {
          const data = await response.json();
          setInventoryName(data.subStoreName);
          console.log(inventoryName);
           // Set the fetched target inventory
        } else {
          console.error("Failed to fetch target inventory.");
        }
      } catch (error) {
        console.error("Error fetching target inventory:", error);
      }
    };

    fetchItems();
    fetchTargetInventory();
  }, [store]);


  const handleItemChange = (index, selectedItemName) => {
  // Find the selected item in the items array
  const selectedItem = items.find(item => item.itemName === selectedItemName);

  // Update the specific row with the selected item's details
  const updatedRows = rows.map((row, i) =>
    i === index
      ? {
          ...row,
          itemId:selectedItem.invItemId,
          itemName: selectedItemName,
          unit: selectedItem?.unitOfMeasurement?.unitOfMeasurementName || "",
          availableQty: selectedItem?.availableQty || "",
          code: selectedItem?.itemCode || "",
        }
      : row
  );

  setRows(updatedRows);
};


const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare the post body
  const postData = {
    issueNo: issueNo,
    requisitionDate: requisitionDate,
    withdrawRemark: remarks, // Assuming 'remarks' corresponds to this
    status: "Pending", // Default status
    verifyOrNot: needVerification,
    verifiedBy: "", // Adjust as per requirements
    checkedBy: checkedBy,
    remarks: remarks,
    subStoreId: store, // Using store as subStoreId
    requisitionItems: rows.map((row) => ({
      id: row.id || null, // Add ID if available
      requiredQuantity: row.requiredQuantity,
      dispatchQuantity: row.dispatchQuantity || 0, // Default to 0 if undefined
      remark: row.remark,
      item: {
        invItemId: row.itemId || null, // Replace with actual item ID if available
      },
    })),
  };
console.log(postData);

  try {
    const response = await fetch(`${API_BASE_URL}/inventory-requisitions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Requisition submitted successfully!");
      // Reset the form after successful submission
      setRows([
        {
          itemCategory: "",
          itemName: "",
          specification: "",
          unit: "",
          availableQty: "",
          code: "",
          requiredQuantity: "",
          remark: "",
        },
      ]);
    } else {
      console.error("Failed to submit requisition:", response.status);
      alert("Error submitting the requisition. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while submitting the requisition.");
  }
};


  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        itemId:"",
        itemCategory: "",
        itemName: "",
        specification: "",
        unit: "",
        availableQty: "",
        code: "",
        requiredQuantity: "",
        remark: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

    return (
      <div className="sSSIInvenReqCreateReq-form">
        {/* <button
          className="sSSIInvenReqCreateReq-close-button"
          onClick={onClose}
        >
          X
        </button>{" "} */}
        {/* Close button */}
        <h2 className="sSSIInvenReqCreateReq-form-title">Create Requisition</h2>
        <form onSubmit={handleSubmit}>
          <div className="sSSIInvenReqCreateReq-form-row">
            <div className="sSSIInvenReqCreateReq-form-group">
            <label htmlFor="targetInventory">Target Inventory: *</label>
            <input
              type="text"
              id="targetInventory"
              value={inventoryName}
              readOnly
            />
          </div>
            <div className="sSSIInvenReqCreateReq-form-group">
              <label htmlFor="requisitionDate">Requisition Date :</label>
              <div className="sSSIInvenReqCreateReq-date-input">
                <input
                  type="date"
                  id="requisitionDate"
                  value={requisitionDate}
                  onChange={(e) => setRequisitionDate(e.target.value)}
                  readOnly
                />
              </div>
            </div>
            <div className="sSSIInvenReqCreateReq-form-group">
              <label htmlFor="issueNo">Issue No :</label>
              <input
                type="text"
                id="issueNo"
                value={issueNo}
                onChange={(e) => setIssueNo(e.target.value)}
              />
            </div>
          </div>

        <table className="sSSIInvenReqCreateReq-inventory-table">
    <thead>
      <tr>
        <th>Item Category</th>
        <th>Item Name</th>
        <th>Specification</th>
        <th>Unit</th>
        <th>Available Qty</th>
        <th>Code</th>
        <th>Required Quantity</th>
        <th>Remark</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={index}>
           <td>
                  <select
                    className="sSSIInvenReqCreateReq-table-select"
                    value={row.itemCategory}
                    onChange={(e) =>
                      handleRowChange(index, "itemCategory", e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="Consumable">Consumable</option>
                    <option value="Capital Goods">Capital Goods</option>
                  </select>
                </td>
           <td>
  <select
    className="sSSIInvenReqCreateReq-table-select"
    value={row.itemName}
    onChange={(e) => handleItemChange(index, e.target.value)}
  >
    <option value="">Select Item</option>
    {items.map((item) => (
      <option key={item.id} value={item.itemName}>
        {item.itemName}
      </option>
    ))}
  </select>
</td>
          <td>
            <input
              className="sSSIInvenReqCreateReq-table-input"
              type="text"
              value={row.specification}
              onChange={(e) =>
                handleRowChange(index, "specification", e.target.value)
              }
            />
          </td>
          <td>
  <input
    className="sSSIInvenReqCreateReq-table-input"
    type="text"
    value={row.unit}
    readOnly
  />
</td>
          <td>
  <input
    className="sSSIInvenReqCreateReq-table-input"
    type="number"
    value={row.availableQty}
    readOnly
  />
</td>
          <td>
  <input
    className="sSSIInvenReqCreateReq-table-input"
    type="text"
    value={row.code}
    readOnly
  />
</td>
          <td>
            <input
              className="sSSIInvenReqCreateReq-table-input"
              type="number"
              value={row.requiredQuantity}
              onChange={(e) =>
                handleRowChange(index, "requiredQuantity", e.target.value)
              }
            />
          </td>
          <td>
            <input
              className="sSSIInvenReqCreateReq-table-input"
              type="text"
              value={row.remark}
              onChange={(e) => handleRowChange(index, "remark", e.target.value)}
            />
          </td>
          <td>
            <button
              className="sSSIInvenReqCreateReq-delete-row-button"
              type="button"
              onClick={() => removeRow(index)}
            >
              -
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className="sSSIInvenReqCreateReq-add-row-container">
    <button
      className="sSSIInvenReqCreateReq-add-row-button"
      type="button"
      onClick={addRow}
    >
      Add Row
    </button>
  </div>


          <div className="sSSIInvenReqCreateReq-form-group-needVerification-N-Remark">
          <div className="sSSIInvenReqCreateReq-form-group-needVerification">
          <div className="sSSIInvenReqCreateReq-form-group checkbox-group">
            <input
              type="checkbox"
              id="needVerification"
              checked={needVerification}
              onChange={(e) => setNeedVerification(e.target.checked)}
            />
            <label htmlFor="needVerification">Need Verification</label>
          </div>

          <div className="sSSIInvenReqCreateReq-checked-by">
            <button className="sSSIInvenReqCreateReq-btn-remove">-</button>
            <button className="sSSIInvenReqCreateReq-btn-checked">Checked By</button>
            <input type="text" value={checkedBy} readOnly />
            <button className="sSSIInvenReqCreateReq-btn-add">+</button>
          </div>
          </div>

          <div className="sSSIInvenReqCreateReq-form-group">
            <label htmlFor="remarks">Remarks:</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            ></textarea>
          </div>
          </div>

          <div className="sSSIInvenReqCreateReq-form-actions">
            <button type="submit" className="sSSIInvenReqCreateReq-btn-request">
              Request
            </button>
            <button type="button" className="sSSIInvenReqCreateReq-btn-discard">
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default SSSIInvenReqCreateReq;
